/**
 * Sheet families, grouped into four rather than listed as eight near-identical
 * cards. Each has a paper thumbnail drawn from its real structure — a ruled
 * table, OMR bubbles, an invoice total block, a stack of form rows.
 */

export type ThumbKind = "table" | "bubbles" | "invoice" | "form";

export interface SheetFamily {
  title: string;
  description: string;
  meta: string;
  thumb: ThumbKind;
}

export const sheetFamilies: SheetFamily[] = [
  {
    title: "Marksheets",
    description:
      "Candidate names, roll numbers, subject rows, totals and grades.",
    meta: "ruled table",
    thumb: "table",
  },
  {
    title: "Answer sheets",
    description:
      "Question numbers, filled bubbles and the marks written beside them.",
    meta: "OMR + marks",
    thumb: "bubbles",
  },
  {
    title: "Invoices and bills",
    description:
      "Invoice number, date, line items, quantities, tax and payable total.",
    meta: "line items",
    thumb: "invoice",
  },
  {
    title: "Forms and registers",
    description:
      "Application forms, attendance registers, receipts and certificates.",
    meta: "build your own",
    thumb: "form",
  },
];
