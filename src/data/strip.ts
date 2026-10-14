import { ScanLine, Type, FileText, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StripItem {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const stripItems: StripItem[] = [
  {
    number: "01",
    icon: ScanLine,
    title: "Scan Any Document",
    description:
      "Upload JPG, JPEG or PNG images with automatic crop detection and image enhancement for cleaner extraction.",
  },
  {
    number: "02",
    icon: Type,
    title: "Extract & Verify",
    description:
      "Tesseract OCR with configurable field regions. Uncertain values are flagged so you can correct them before export.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Use Templates",
    description:
      "Reusable extraction layouts for marksheets, invoices, certificates and more. Define once, reuse across batches.",
  },
  {
    number: "04",
    icon: Upload,
    title: "Export Your Data",
    description:
      "Save structured results as CSV or readable plain text as TXT. Each export preserves your column definitions.",
  },
];
