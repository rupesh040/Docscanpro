import {
  Crop,
  Layers,
  FileCode2,
  Image,
  ShieldCheck,
  Download,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Crop,
    title: "Adjustable Extraction Regions",
    description:
      "Draw and resize extraction boxes directly on the document preview. Each region maps to a named field in your output.",
  },
  {
    icon: Layers,
    title: "Reusable Templates",
    description:
      "Save field layouts and OCR settings as named templates. Apply the same template to every document of the same format.",
  },
  {
    icon: Image,
    title: "Image Processing",
    description:
      "Auto-crop, deskew, rotate and improve contrast before extraction. Better input images produce more accurate text output.",
  },
  {
    icon: FileCode2,
    title: "Text Recognition",
    description:
      "Extract printed text using Tesseract OCR. Configure language, character sets and confidence thresholds per field region.",
  },
  {
    icon: ShieldCheck,
    title: "Data Validation",
    description:
      "Define rules for required fields, numeric ranges, totals and duplicate checks. Non-conforming values are flagged automatically.",
  },
  {
    icon: Download,
    title: "Export",
    description:
      "Export structured data as CSV or plain text as TXT. Column order matches your template field definitions.",
  },
];
