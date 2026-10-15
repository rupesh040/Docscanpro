import { sheetFamilies, type ThumbKind } from "@/data/document-types";
import { Kicker, SectionHeading } from "@/components/ui/SectionHeading";

/**
 * A paper band. The page alternates graphite "machine" sections with warm
 * paper ones, so it reads like a sheet travelling under a scan head rather
 * than ten identical dark panels.
 *
 * Thumbnails are drawn from each family's real structure — a ruled table, a
 * block of OMR bubbles, an invoice total, a stack of form rows — with one
 * region box shown where you would actually draw it.
 */

const RULE = "#CFC9B8";
const FILL = "#EDE9DD";
const HEAVY = "#9E9686";

function RegionBox({ style }: { style: React.CSSProperties }) {
  return (
    <span
      className="absolute border-[1.5px] border-[var(--signal)] bg-[var(--signal-dim)]"
      style={style}
    />
  );
}

function Line({ width = "100%", heavy = false }: { width?: string; heavy?: boolean }) {
  return (
    <span
      className="block rounded-[1px]"
      style={{ width, height: heavy ? 4 : 2, background: heavy ? HEAVY : RULE }}
    />
  );
}

function Thumb({ kind }: { kind: ThumbKind }) {
  return (
    <div
      className="relative flex h-[112px] flex-col gap-[5px] overflow-hidden border p-[9px]"
      style={{ background: "#FDFCF8", borderColor: RULE }}
    >
      {kind === "table" && (
        <>
          <span
            className="mx-auto mb-1 block"
            style={{ width: "58%", height: 4, background: HEAVY }}
          />
          <Line />
          <Line width="80%" />
          <div className="mt-[3px] grid flex-1 grid-cols-4 gap-[3px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={{ background: FILL, border: `1px solid #E2DDCF` }} />
            ))}
          </div>
          <RegionBox style={{ left: 9, right: 9, top: 46, height: 30 }} />
        </>
      )}

      {kind === "bubbles" && (
        <>
          <span
            className="mx-auto block"
            style={{ width: "44%", height: 4, background: HEAVY }}
          />
          <Line width="40%" />
          <div className="mt-[3px] grid flex-1 grid-cols-8 gap-[3px]">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  aspectRatio: "1",
                  border: `1px solid ${i % 5 === 0 ? "#44403A" : RULE}`,
                  background: i % 5 === 0 ? "#44403A" : "transparent",
                }}
              />
            ))}
          </div>
          <RegionBox style={{ left: 9, right: 9, top: 32, bottom: 9 }} />
        </>
      )}

      {kind === "invoice" && (
        <>
          <Line width="34%" heavy />
          <Line width="52%" />
          <div
            className="mt-[3px] grid flex-1 gap-[3px]"
            style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} style={{ background: FILL, border: `1px solid #E2DDCF` }} />
            ))}
          </div>
          <span
            className="ml-auto block"
            style={{ width: "30%", height: 3, background: HEAVY }}
          />
          <RegionBox style={{ right: 9, bottom: 9, width: 44, height: 14 }} />
        </>
      )}

      {kind === "form" && (
        <>
          <span
            className="block"
            style={{ width: "40%", height: 4, background: HEAVY }}
          />
          <div className="mt-1 flex flex-1 flex-col gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                style={{ height: 11, background: FILL, border: `1px solid #E2DDCF` }}
              />
            ))}
          </div>
          <RegionBox style={{ left: 44, right: 9, top: 28, height: 13 }} />
        </>
      )}
    </div>
  );
}

export function DocumentTypes() {
  return (
    <section
      id="sheets"
      className="bg-[var(--paper)] py-[84px] text-[var(--ink)] lg:py-[104px]"
      aria-labelledby="sheets-heading"
    >
      <div className="wrap">
        <div className="mb-[46px] flex max-w-[620px] flex-col gap-[14px]">
          <Kicker tone="paper">Templates included</Kicker>
          <SectionHeading id="sheets-heading">
            Sheets it already knows.
          </SectionHeading>
          <p className="max-w-[62ch] text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">
            Start from a ready template, or box your own fields on any form you
            have and save it as a new one.
          </p>
        </div>

        <div
          className="grid gap-px border sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "var(--paper-rule)", borderColor: "var(--paper-rule)" }}
        >
          {sheetFamilies.map((family) => (
            <article
              key={family.title}
              className="flex flex-col gap-[13px] bg-[var(--paper)] px-[18px] pb-5 pt-[18px]"
            >
              <Thumb kind={family.thumb} />
              <div>
                <h3 className="mb-[5px] text-[15px]" style={{ fontStretch: "100%" }}>
                  {family.title}
                </h3>
                <p className="text-[12.5px] leading-[1.55] text-[var(--ink-2)]">
                  {family.description}
                </p>
              </div>
              <span className="mt-auto font-mono text-[10.5px] text-[#8A8477]">
                {family.meta}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
