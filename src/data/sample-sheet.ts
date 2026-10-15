/**
 * The sample marksheet used by the extraction bench.
 *
 * Every piece of text on the sheet is declared here as a positioned box.
 * The sheet is RENDERED from these boxes and extraction regions are
 * HIT-TESTED against the same boxes, so what a region reports is genuinely
 * what it covers — including the printed labels, if you draw a sloppy box.
 *
 * Coordinates are in sheet space (460 x 540). The rendered sheet is scaled
 * as a whole, never re-laid-out, so one coordinate space serves both jobs.
 */

export const SHEET_W = 460;
export const SHEET_H = 540;

export type TokenStyle =
  | "title"
  | "sub"
  | "label"
  | "value"
  | "cell"
  | "head"
  | "tiny";

export interface SheetToken {
  id: string;
  text: string;
  x: number;
  y: number;
  w: number;
  h: number;
  style: TokenStyle;
}

/* Advance widths per style, matched to the rendered font size. Values are
   monospace-derived where the rendered text is monospace, so the hit box
   and the glyphs agree closely. */
const ADVANCE: Record<TokenStyle, number> = {
  title: 7.1,
  sub: 5.6,
  label: 4.35,
  value: 6.62,
  cell: 6.02,
  head: 4.35,
  tiny: 4.7,
};

const HEIGHT: Record<TokenStyle, number> = {
  title: 15,
  sub: 11,
  label: 11,
  value: 15,
  cell: 13,
  head: 11,
  tiny: 10,
};

const tokens: SheetToken[] = [];
let seq = 0;

function put(text: string, x: number, y: number, style: TokenStyle): string {
  const id = `t${seq++}`;
  tokens.push({
    id,
    text,
    x,
    y,
    w: text.length * ADVANCE[style],
    h: HEIGHT[style],
    style,
  });
  return id;
}

function putCentered(text: string, y: number, style: TokenStyle): string {
  const w = text.length * ADVANCE[style];
  return put(text, (SHEET_W - w) / 2, y, style);
}

/* ── masthead ── */
putCentered("GOVT. MODEL HIGHER SECONDARY SCHOOL", 26, "title");
putCentered("STATEMENT OF MARKS", 48, "sub");
putCentered("ANNUAL EXAMINATION 2026", 62, "sub");
put("FORM XII-M", 372, 14, "tiny");

/* ── candidate block ── */
const LEFT = 30;
const RIGHT = 252;

put("Candidate name", LEFT, 108, "label");
put("Aarav Mehta", LEFT, 126, "value");
put("Roll no.", RIGHT, 108, "label");
put("2304117", RIGHT, 126, "value");
put("Class & section", LEFT, 150, "label");
put("XII - B", LEFT, 168, "value");
put("Examination", RIGHT, 150, "label");
put("Annual 2026", RIGHT, 168, "value");

/* ── marks table ── */
const COL = { code: 30, subject: 84, max: 258, obtained: 310, grade: 374 };
const HEAD_Y = 194;
const ROW_0 = 216;
const ROW_H = 25;
const TOTAL_Y = 372;

put("CODE", COL.code, HEAD_Y, "head");
put("SUBJECT", COL.subject, HEAD_Y, "head");
put("MAX", COL.max, HEAD_Y, "head");
put("OBTAINED", COL.obtained, HEAD_Y, "head");
put("GRADE", COL.grade, HEAD_Y, "head");

const MARKS: Array<[string, string, number, number, string]> = [
  ["CS401", "Data Structures", 100, 86, "A"],
  ["CS402", "Operating Systems", 100, 79, "B+"],
  ["CS403", "Database Systems", 100, 91, "A+"],
  ["MA404", "Discrete Mathematics", 100, 74, "B+"],
  ["CS405", "Computer Networks", 100, 83, "A"],
  ["CS406", "Software Engineering", 100, 88, "A"],
];

export interface RowTokenIds {
  code: string;
  subject: string;
  max: string;
  obtained: string;
  grade: string;
}

/** One entry per printed table row, pointing at the tokens that make it up. */
export const rowTokenIds: RowTokenIds[] = MARKS.map((row, i) => {
  const y = ROW_0 + i * ROW_H;
  return {
    code: put(row[0], COL.code, y, "cell"),
    subject: put(row[1], COL.subject, y, "cell"),
    max: put(String(row[2]), COL.max, y, "cell"),
    obtained: put(String(row[3]), COL.obtained, y, "cell"),
    grade: put(row[4], COL.grade, y, "cell"),
  };
});

put("TOTAL", COL.code, TOTAL_Y, "head");
put("600", COL.max, TOTAL_Y, "value");
put("501", COL.obtained, TOTAL_Y, "value");
put("A", COL.grade, TOTAL_Y, "value");

/* ── result block and attestation ── */
put("Result", LEFT, 410, "label");
put("PASS", LEFT, 428, "value");
put("Percentage", RIGHT, 410, "label");
put("83.50", RIGHT, 428, "value");
put("Controller of Examinations", 300, 478, "label");
put("Checked against office copy. Not valid without seal.", LEFT, 506, "tiny");

export const sheetTokens: readonly SheetToken[] = tokens;

/* ── printed rules: decoration on the sheet, never extractable ── */
export interface SheetRule {
  x: number;
  y: number;
  w: number;
  h: number;
  heavy?: boolean;
}

export const sheetRules: readonly SheetRule[] = [
  { x: 24, y: 86, w: 412, h: 1 },
  { x: 24, y: 186, w: 412, h: 1 },
  { x: 24, y: 212, w: 412, h: 1.6, heavy: true },
  ...MARKS.map((_, i) => ({
    x: 24,
    y: ROW_0 + (i + 1) * ROW_H - 4,
    w: 412,
    h: 1,
  })),
  { x: 24, y: 366, w: 412, h: 1.6, heavy: true },
  { x: 24, y: 394, w: 412, h: 1 },
  { x: 300, y: 470, w: 136, h: 1, heavy: true },
  /* column rules */
  { x: 78, y: 194, w: 1, h: 200 },
  { x: 254, y: 194, w: 1, h: 200 },
  { x: 304, y: 194, w: 1, h: 200 },
  { x: 368, y: 194, w: 1, h: 200 },
];

/* ── the template's saved regions ── */
export type RegionKind = "text" | "digits" | "number" | "table";

export interface Region {
  id: string;
  label: string;
  kind: RegionKind;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const defaultRegions: readonly Region[] = [
  { id: "candidate_name", label: "Candidate name", kind: "text", x: 24, y: 120, w: 150, h: 24 },
  { id: "roll_no", label: "Roll no.", kind: "digits", x: 246, y: 120, w: 116, h: 24 },
  { id: "marks_table", label: "Marks table", kind: "table", x: 24, y: 190, w: 412, h: 178 },
  { id: "total_obtained", label: "Total obtained", kind: "number", x: 304, y: 366, w: 62, h: 24 },
];

/** The printed total, used for the cross-field check. */
export const PRINTED_TOTAL = 501;
