/**
 * What the operator can change. Framed as controls they hold rather than
 * features the product has, because the page's argument is that nothing is
 * guessed on their behalf.
 */

export type ControlIcon =
  | "region"
  | "table"
  | "template"
  | "image"
  | "validate"
  | "export";

export interface Control {
  title: string;
  description: string;
  icon: ControlIcon;
}

export const controls: Control[] = [
  {
    title: "Adjustable regions",
    description:
      "Move and resize the box over any field. The reading updates as you drag it.",
    icon: "region",
  },
  {
    title: "Table recognition",
    description:
      "Mark a table once and every printed row becomes a row in your spreadsheet.",
    icon: "table",
  },
  {
    title: "Saved templates",
    description:
      "Keep a layout per sheet type and reuse it across the whole stack.",
    icon: "template",
  },
  {
    title: "Straighten and sharpen",
    description:
      "Crop, deskew, lift contrast and clear speckle so faint photocopies still read.",
    icon: "image",
  },
  {
    title: "Range and total checks",
    description:
      "Marks above the maximum, duplicate roll numbers and totals that do not add up get flagged.",
    icon: "validate",
  },
  {
    title: "Plain export formats",
    description:
      "CSV opens in Excel, Sheets or your school's own software. Text when you only need the words.",
    icon: "export",
  },
];
