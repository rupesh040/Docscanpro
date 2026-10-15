/**
 * Reading extraction regions off the sample sheet.
 *
 * These are pure functions over the token boxes in @/data/sample-sheet, with
 * no DOM involved: a region reports the tokens whose centres fall inside it,
 * and confidence falls as the region clips the glyphs it is reading. That
 * makes the bench honest — a badly placed box really does produce a bad
 * reading, which is the whole point the page is trying to make.
 */

import {
  PRINTED_TOTAL,
  rowTokenIds,
  sheetTokens,
  type Region,
  type SheetToken,
} from "@/data/sample-sheet";

export type FieldState = "ok" | "flag" | "empty";

export interface TableRow {
  code: string;
  subject: string;
  max: number;
  obtained: number;
  grade: string;
}

export interface Reading {
  state: FieldState;
  /** What the region reports, formatted for display. */
  value: string;
  confidence: number;
  /** Operator-facing explanation when something is wrong. */
  note: string | null;
  /** Present only for table regions. */
  rows?: TableRow[];
  sum?: number;
}

const byId = new Map<string, SheetToken>(sheetTokens.map((t) => [t.id, t]));

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function intersectionArea(a: Box, b: Box): number {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
}

function centreInside(t: SheetToken, r: Box): boolean {
  const cx = t.x + t.w / 2;
  const cy = t.y + t.h / 2;
  return cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h;
}

/** Tokens the region covers, in reading order. */
export function tokensInside(r: Box): SheetToken[] {
  return sheetTokens
    .filter((t) => centreInside(t, r))
    .sort((a, b) => a.y - b.y || a.x - b.x);
}

/** Confidence drops in proportion to how badly the region clips its worst token. */
function scoreConfidence(r: Box, hits: SheetToken[]): number {
  if (hits.length === 0) return 0;

  let worstCoverage = 1;
  for (const t of hits) {
    const coverage = intersectionArea(t, r) / (t.w * t.h);
    if (coverage < worstCoverage) worstCoverage = coverage;
  }

  // Slight deterministic variation so readings do not all show the same number.
  const ceiling = 99 - (hits.length % 3);
  return Math.max(11, Math.round(ceiling * (0.46 + 0.54 * worstCoverage)));
}

function readTable(r: Region, confidence: number): Reading {
  const covered = rowTokenIds.filter((ids) => {
    const t = byId.get(ids.obtained);
    return t ? centreInside(t, r) : false;
  });

  const rows: TableRow[] = covered.map((ids) => {
    const text = (key: keyof typeof ids) => byId.get(ids[key])!.text;
    return {
      code: text("code"),
      subject: text("subject"),
      max: Number(text("max")),
      obtained: Number(text("obtained")),
      grade: text("grade"),
    };
  });

  const sum = rows.reduce((total, row) => total + row.obtained, 0);
  const overMax = rows.find((row) => row.obtained > row.max);

  if (rows.length === 0) {
    return {
      state: "empty",
      value: "no rows found",
      confidence: 0,
      note: "No table rows fall inside this region.",
      rows,
      sum,
    };
  }

  return {
    state: overMax ? "flag" : "ok",
    value: `${rows.length} row${rows.length === 1 ? "" : "s"} · ${rows
      .map((row) => row.obtained)
      .join(", ")}`,
    confidence,
    note: overMax
      ? `${overMax.code} reads ${overMax.obtained} out of ${overMax.max}.`
      : null,
    rows,
    sum,
  };
}

const LABEL_WORDS = /name|roll|class|section|examination|percentage|result|total|code|subject|max|obtained|grade/i;

export function readRegion(r: Region): Reading {
  const hits = tokensInside(r);
  const confidence = scoreConfidence(r, hits);

  if (hits.length === 0) {
    return {
      state: "empty",
      value: "not found",
      confidence: 0,
      note: "This region is empty. Move it over a field.",
    };
  }

  if (r.kind === "table") return readTable(r, confidence);

  const value = hits.map((t) => t.text).join(" ");

  if (r.kind === "digits" && !/^\d+$/.test(value)) {
    return {
      state: "flag",
      value,
      confidence,
      note: "This field expects digits only — the region is picking up extra text.",
    };
  }

  if (r.kind === "number" && !/^[\d.]+$/.test(value)) {
    return {
      state: "flag",
      value,
      confidence,
      note: "This field expects a number — the region is picking up extra text.",
    };
  }

  if (hits.length > 1 && hits.some((t) => t.style === "label" || t.style === "head")) {
    return {
      state: "flag",
      value,
      confidence,
      note: "The region includes the sheet's printed label. Pull its top edge down.",
    };
  }

  if (r.kind === "text" && hits.length > 1 && LABEL_WORDS.test(value)) {
    return {
      state: "flag",
      value,
      confidence,
      note: "The region is reading more than one field. Tighten it.",
    };
  }

  if (confidence < 70) {
    return {
      state: "flag",
      value,
      confidence,
      note: "The region clips the text it is reading. Widen it slightly.",
    };
  }

  return { state: "ok", value, confidence, note: null };
}

/**
 * The check that makes the demo land: do the rows actually inside the marks
 * region add up to the total printed on the sheet? Shrink the region and this
 * is what tells you a row went missing.
 */
export function crossCheckTotal(
  table: Reading | undefined,
  total: Reading | undefined,
): { state: "ok" | "flag" | "none"; note: string | null } {
  if (!table?.rows?.length || !total || !/^\d+$/.test(total.value)) {
    return { state: "none", note: null };
  }

  const printed = Number(total.value);
  const sum = table.sum ?? 0;

  if (sum === printed) {
    return {
      state: "ok",
      note: `All ${table.rows.length} rows add up to the printed total of ${printed}.`,
    };
  }

  const gap = printed - sum;
  return {
    state: "flag",
    note:
      `Rows inside the region add up to ${sum}, but the sheet's total reads ` +
      `${printed} — ${Math.abs(gap)} ${gap > 0 ? "short" : "over"}. ` +
      `Check the region covers every row.`,
  };
}

export const CSV_HEADER =
  "candidate_name,roll_no,code,subject,max,obtained,grade,review";

/** Build the export exactly as the app would write it. */
export function buildCsvRows(readings: Record<string, Reading>): string[] {
  const name = readings.candidate_name?.value ?? "";
  const roll = readings.roll_no?.value ?? "";
  const rows = readings.marks_table?.rows ?? [];

  return rows.map((row) => {
    const review = row.obtained > row.max ? "check" : "ok";
    return `"${name}",${roll},${row.code},"${row.subject}",${row.max},${row.obtained},${row.grade},${review}`;
  });
}

export { PRINTED_TOTAL };
