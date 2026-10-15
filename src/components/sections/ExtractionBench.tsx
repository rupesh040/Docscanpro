"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SHEET_H,
  SHEET_W,
  defaultRegions,
  sheetRules,
  sheetTokens,
  type Region,
  type TokenStyle,
} from "@/data/sample-sheet";
import {
  CSV_HEADER,
  buildCsvRows,
  clamp,
  crossCheckTotal,
  readRegion,
  type FieldState,
  type Reading,
} from "@/lib/extract";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Token rendering. Styles are explicit rather than utility
   classes so the rendered glyph size matches the advance widths
   the hit-testing assumes.
   ───────────────────────────────────────────────────────────── */

const TOKEN_STYLE: Record<TokenStyle, React.CSSProperties> = {
  title: {
    fontSize: 12.5,
    fontWeight: 700,
    fontStretch: "105%",
    letterSpacing: "0.01em",
    color: "#15181C",
  },
  sub: { fontSize: 9, color: "#5E584C", letterSpacing: "0.06em" },
  label: { fontSize: 8, color: "#7A7468", letterSpacing: "0.03em" },
  value: {
    fontSize: 11,
    fontWeight: 500,
    color: "#15181C",
    fontFamily: "var(--font-plex-mono)",
  },
  cell: { fontSize: 10, color: "#22262B", fontFamily: "var(--font-plex-mono)" },
  head: {
    fontSize: 8,
    fontWeight: 600,
    color: "#5E584C",
    letterSpacing: "0.04em",
  },
  tiny: {
    fontSize: 7.5,
    color: "#8A8477",
    fontFamily: "var(--font-plex-mono)",
  },
};

/* Region colours carry meaning: orange is live, red is doubtful, grey is empty. */
const REGION_COLOUR: Record<FieldState, { line: string; fill: string; tagText: string; dashed?: boolean }> = {
  ok: { line: "var(--signal)", fill: "var(--signal-dim)", tagText: "#17110D" },
  flag: { line: "var(--flag)", fill: "var(--flag-dim)", tagText: "#FFFFFF" },
  empty: { line: "var(--chalk-3)", fill: "transparent", tagText: "#15181C", dashed: true },
};

const MIN_W = 24;
const MIN_H = 18;
const NUDGE = 3;

type Handle = "e" | "s" | "se";

interface DragState {
  id: string;
  handle: Handle | null;
  startX: number;
  startY: number;
  origin: Region;
  scale: number;
}

export function ExtractionBench() {
  const [regions, setRegions] = useState<Region[]>(() =>
    defaultRegions.map((r) => ({ ...r })),
  );
  const [activeId, setActiveId] = useState<string>("marks_table");
  const [scale, setScale] = useState(1);
  const [announcement, setAnnouncement] = useState("");
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  /* The sheet is scaled as a whole so one coordinate space serves both
     rendering and hit-testing. Pointer deltas are divided by the measured
     scale, so dragging stays accurate at any size. */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const measure = () => {
      const available = el.clientWidth - 40;
      setScale(clamp(available / SHEET_W, 0.52, 1));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const readings = useMemo(() => {
    const out: Record<string, Reading> = {};
    for (const r of regions) out[r.id] = readRegion(r);
    return out;
  }, [regions]);

  const cross = useMemo(
    () => crossCheckTotal(readings.marks_table, readings.total_obtained),
    [readings],
  );

  const csvRows = useMemo(() => buildCsvRows(readings), [readings]);

  const announce = useCallback((region: Region) => {
    const reading = readRegion(region);
    setAnnouncement(
      `${region.label}: ${reading.value}, ${reading.confidence}% confidence.`,
    );
  }, []);

  /* Mirrors the committed regions so the drag-end announcement describes
     where the box actually ended up, not where it was when the drag began. */
  const regionsRef = useRef(regions);
  useEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  /* ── pointer drag and resize ── */

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, region: Region) => {
    const handle = ((e.target as HTMLElement).dataset.handle ?? null) as Handle | null;
    const rect = sheetRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragRef.current = {
      id: region.id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      origin: { ...region },
      scale: rect.width / SHEET_W,
    };

    setActiveId(region.id);
    /* Focus explicitly: preventDefault below suppresses the browser's own
       focus, and the arrow-key nudging documented in the panel depends on the
       region being focused. */
    e.currentTarget.focus();
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = (e.clientX - drag.startX) / drag.scale;
    const dy = (e.clientY - drag.startY) / drag.scale;

    setRegions((prev) =>
      prev.map((r) => {
        if (r.id !== drag.id) return r;

        if (!drag.handle) {
          return {
            ...r,
            x: clamp(Math.round(drag.origin.x + dx), 0, SHEET_W - r.w),
            y: clamp(Math.round(drag.origin.y + dy), 0, SHEET_H - r.h),
          };
        }

        const w =
          drag.handle === "e" || drag.handle === "se"
            ? clamp(Math.round(drag.origin.w + dx), MIN_W, SHEET_W - r.x)
            : r.w;
        const h =
          drag.handle === "s" || drag.handle === "se"
            ? clamp(Math.round(drag.origin.h + dy), MIN_H, SHEET_H - r.y)
            : r.h;

        return { ...r, w, h };
      }),
    );
  };

  const onPointerUp = (region: Region) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    const settled = regionsRef.current.find((r) => r.id === region.id);
    announce(settled ?? region);
  };

  /* A cancelled pointer (touch turning into a scroll, window losing focus)
     must clear the drag. Otherwise onPointerMove — which also fires on a
     plain hover — would resume the drag from the old start point. */
  const endDrag = () => {
    dragRef.current = null;
  };

  /* ── keyboard: arrows nudge, shift+arrows resize ── */

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, region: Region) => {
    const delta: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    const d = delta[e.key];
    if (!d) return;

    e.preventDefault();
    setActiveId(region.id);

    const next: Region = e.shiftKey
      ? {
          ...region,
          w: clamp(region.w + d[0] * NUDGE, MIN_W, SHEET_W - region.x),
          h: clamp(region.h + d[1] * NUDGE, MIN_H, SHEET_H - region.y),
        }
      : {
          ...region,
          x: clamp(region.x + d[0] * NUDGE, 0, SHEET_W - region.w),
          y: clamp(region.y + d[1] * NUDGE, 0, SHEET_H - region.h),
        };

    setRegions((prev) => prev.map((r) => (r.id === region.id ? next : r)));
    announce(next);
  };

  /* ── toolbar actions ── */

  const reset = () => {
    setRegions(defaultRegions.map((r) => ({ ...r })));
    setActiveId("marks_table");
    setAnnouncement("Regions reset to the saved template.");
  };

  const showMisread = () => {
    setRegions((prev) =>
      prev.map((r) => (r.id === "marks_table" ? { ...r, h: 128 } : r)),
    );
    setActiveId("marks_table");
    setAnnouncement(
      "The marks region now stops short of the last rows, so the total check fails.",
    );
  };

  const copyCsv = async () => {
    const text = [CSV_HEADER, ...csvRows].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setAnnouncement("Copying is blocked in this browser.");
    }
  };

  /* One message at a time, worst news first: a failing total check beats a
     single bad field, which beats the all-clear. */
  const notice = useMemo(() => {
    if (cross.state === "flag" && cross.note) {
      return { tone: "flag" as const, text: cross.note };
    }
    const fieldNote = regions
      .map((r) => readings[r.id]?.note)
      .find((note): note is string => Boolean(note));
    if (fieldNote) return { tone: "flag" as const, text: fieldNote };
    if (cross.state === "ok" && cross.note) {
      return { tone: "ok" as const, text: cross.note };
    }
    return null;
  }, [cross, regions, readings]);

  return (
    <div className="overflow-hidden rounded-[5px] border border-[var(--rule)] bg-[var(--graphite-2)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
      {/* ── window bar ── */}
      <div className="flex h-[38px] items-center gap-3 border-b border-[var(--rule)] bg-[var(--graphite-3)] px-3">
        <span className="h-[7px] w-[7px] flex-none rounded-full bg-[var(--verified)]" />
        <span className="truncate font-mono text-[11.5px] text-[var(--chalk-2)]">
          marksheet_XII-B_014.jpg
        </span>
        <div className="ml-auto flex flex-none items-center gap-2">
          <button
            type="button"
            onClick={showMisread}
            className="rounded-[3px] border border-[var(--rule)] px-[9px] py-[5px] text-[12px] text-[var(--chalk-2)] transition-colors hover:border-[var(--chalk-3)] hover:text-[var(--chalk)]"
          >
            Show a misread
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-[3px] border border-[var(--rule)] px-[9px] py-[5px] text-[12px] text-[var(--chalk-2)] transition-colors hover:border-[var(--chalk-3)] hover:text-[var(--chalk)]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_262px]">
        {/* ── the sheet ── */}
        <div
          ref={canvasRef}
          className="flex justify-center overflow-auto bg-[var(--graphite-2)] px-5 py-6"
          style={{
            backgroundImage:
              "radial-gradient(120% 70% at 50% -10%, rgba(255,255,255,0.035), transparent 70%)",
          }}
        >
          <div
            className="relative flex-none"
            style={{ width: SHEET_W * scale, height: SHEET_H * scale }}
          >
            <div
              ref={sheetRef}
              className="relative select-none border border-[#CFC9B8] bg-[var(--paper)] shadow-[0_10px_34px_-12px_rgba(0,0,0,0.65)]"
              style={{
                width: SHEET_W,
                height: SHEET_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {/* one orchestrated load moment: the scan head crossing the page */}
              <div
                aria-hidden="true"
                className="scan-sweep pointer-events-none absolute inset-x-0 z-[5] h-[130px] border-b border-[var(--signal)]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(242,104,60,0.16) 60%, rgba(242,104,60,0.5))",
                }}
              />

              {/* printed rules */}
              {sheetRules.map((rule, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: rule.x,
                    top: rule.y,
                    width: rule.w,
                    height: rule.h,
                    background: rule.heavy ? "#8E8878" : "var(--paper-rule)",
                  }}
                />
              ))}

              {/* school seal */}
              <div
                aria-hidden="true"
                className="absolute grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-[var(--paper-ink)] text-center text-[6px] leading-[1.15] tracking-[0.04em] text-[var(--paper-ink)] opacity-85"
                style={{ left: 28, top: 22, transform: "rotate(-9deg)" }}
              >
                SCHOOL
                <br />
                SEAL
              </div>

              {/* the sheet's text */}
              {sheetTokens.map((t) => (
                <span
                  key={t.id}
                  className="absolute whitespace-nowrap leading-none"
                  style={{ left: t.x, top: t.y, ...TOKEN_STYLE[t.style] }}
                >
                  {t.text}
                </span>
              ))}

              {/* extraction regions */}
              {regions.map((region) => {
                const reading = readings[region.id];
                const colour = REGION_COLOUR[reading.state];
                const isActive = activeId === region.id;

                return (
                  <div
                    key={region.id}
                    role="application"
                    tabIndex={0}
                    aria-label={`${region.label} region, ${region.w} by ${region.h} pixels, reads ${reading.value}. Arrow keys move it, shift and arrow keys resize it.`}
                    onPointerDown={(e) => onPointerDown(e, region)}
                    onPointerMove={onPointerMove}
                    onPointerUp={() => onPointerUp(region)}
                    onPointerCancel={endDrag}
                    onLostPointerCapture={endDrag}
                    onKeyDown={(e) => onKeyDown(e, region)}
                    onFocus={() => setActiveId(region.id)}
                    className={cn(
                      "group absolute cursor-grab rounded-[1px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white",
                      isActive && "z-10",
                    )}
                    style={{
                      left: region.x,
                      top: region.y,
                      width: region.w,
                      height: region.h,
                      /* Without this a touch drag scrolls the canvas instead
                         of moving the region, and fires pointercancel. */
                      touchAction: "none",
                      border: `1.5px ${colour.dashed ? "dashed" : "solid"} ${colour.line}`,
                      background: colour.fill,
                      boxShadow: isActive
                        ? `0 0 0 1px ${colour.line}, 0 6px 18px -6px rgba(0,0,0,0.5)`
                        : undefined,
                    }}
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute -left-[1.5px] -top-[17px] flex h-4 items-center whitespace-nowrap rounded-t-[1px] px-[5px] text-[9px] font-semibold transition-opacity",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                      )}
                      style={{ background: colour.line, color: colour.tagText }}
                    >
                      {region.label}
                    </span>

                    {(["e", "s", "se"] as Handle[]).map((h) => (
                      <span
                        key={h}
                        data-handle={h}
                        className={cn(
                          "absolute border border-black/35 transition-opacity",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                          h === "e" && "-right-1 top-1/2 -mt-[7px] h-[15px] w-[7px] cursor-ew-resize",
                          h === "s" && "-bottom-1 left-1/2 -ml-[7px] h-[7px] w-[15px] cursor-ns-resize",
                          h === "se" && "-bottom-1 -right-1 h-[9px] w-[9px] cursor-nwse-resize",
                        )}
                        style={{ background: colour.line }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── field panel ── */}
        <div className="flex flex-col border-t border-[var(--rule)] bg-[var(--graphite)] md:border-l md:border-t-0">
          <div className="flex items-baseline justify-between gap-2 border-b border-[var(--rule)] px-[14px] py-[11px]">
            <span className="text-[12.5px] font-semibold">Extracted fields</span>
            <span className="font-mono text-[10.5px] text-[var(--chalk-3)]">
              {regions.length} mapped
            </span>
          </div>

          <ul className="m-0 list-none p-0">
            {regions.map((region) => {
              const reading = readings[region.id];
              const isActive = activeId === region.id;

              return (
                <li key={region.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(region.id)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] gap-x-2 gap-y-[3px] border-b border-[var(--rule)] px-[14px] py-[9px] text-left transition-colors hover:bg-[var(--graphite-2)]",
                      isActive &&
                        "bg-[var(--graphite-2)] shadow-[inset_2px_0_0_var(--signal)]",
                    )}
                  >
                    <span className="text-[11px] text-[var(--chalk-3)]">
                      {region.label}
                    </span>
                    <span
                      className={cn(
                        "text-right font-mono text-[10px]",
                        reading.state === "ok" && "text-[var(--verified)]",
                        reading.state === "flag" && "text-[var(--flag)]",
                        reading.state === "empty" && "text-[var(--chalk-3)]",
                      )}
                    >
                      {reading.confidence ? `${reading.confidence}%` : "—"}
                    </span>
                    <span
                      className={cn(
                        "col-span-2 truncate font-mono text-[12px]",
                        reading.state === "flag"
                          ? "text-[var(--flag)]"
                          : reading.state === "empty"
                            ? "text-[var(--chalk-3)]"
                            : "text-[var(--chalk)]",
                      )}
                    >
                      {reading.value}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {notice && (
            <p
              className={cn(
                "border-b border-[var(--rule)] px-[14px] py-[10px] text-[11.5px] leading-[1.5]",
                notice.tone === "flag"
                  ? "bg-[var(--flag-dim)] text-[var(--flag-text)]"
                  : "bg-[rgba(47,158,110,0.1)] text-[var(--verified-text)]",
              )}
            >
              {notice.text}
            </p>
          )}

          <div className="mt-auto px-[14px] py-3">
            <p className="text-[10.5px] leading-[1.55] text-[var(--chalk-3)]">
              Drag a box to move it, or pull an edge to resize. With a box
              selected,{" "}
              <kbd className="rounded-[2px] border border-[var(--rule)] bg-[var(--graphite-3)] px-1 font-mono text-[9.5px] text-[var(--chalk-2)]">
                ↑↓←→
              </kbd>{" "}
              nudges and{" "}
              <kbd className="rounded-[2px] border border-[var(--rule)] bg-[var(--graphite-3)] px-1 font-mono text-[9.5px] text-[var(--chalk-2)]">
                Shift
              </kbd>
              {" + "}
              <kbd className="rounded-[2px] border border-[var(--rule)] bg-[var(--graphite-3)] px-1 font-mono text-[9.5px] text-[var(--chalk-2)]">
                ↑↓←→
              </kbd>{" "}
              resizes.
            </p>
          </div>
        </div>
      </div>

      {/* ── output ── */}
      <div className="flex flex-col border-t border-[var(--rule)] bg-[#101316]">
        <div className="flex items-center gap-[10px] border-b border-[var(--rule)] px-[14px] py-[9px]">
          <strong className="text-[12px] font-semibold">Output</strong>
          <span className="font-mono text-[10.5px] text-[var(--chalk-3)]">
            extract.csv · {csvRows.length} rows
          </span>
          <button
            type="button"
            onClick={copyCsv}
            className="ml-auto flex-none rounded-[3px] border border-[var(--rule)] px-[9px] py-[5px] text-[12px] text-[var(--chalk-2)] transition-colors hover:border-[var(--chalk-3)] hover:text-[var(--chalk)]"
          >
            {copied ? "Copied" : "Copy CSV"}
          </button>
        </div>
        <pre className="m-0 max-h-[150px] overflow-x-auto px-[14px] py-3 font-mono text-[11px] leading-[1.75] text-[var(--chalk-2)]">
          <b className="font-medium text-[var(--chalk)]">{CSV_HEADER}</b>
          {"\n"}
          {csvRows.length
            ? csvRows.join("\n")
            : "— no table rows inside the marks region —"}
        </pre>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
