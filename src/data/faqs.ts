export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Which image formats are supported?",
    answer:
      "DocScanPro accepts JPG, JPEG and PNG images. For best results, use images with at least 150 DPI and good contrast between text and background.",
  },
  {
    question: "Can I scan different document layouts?",
    answer:
      "Yes. Each document type can have its own saved template. You define the extraction regions and field names for each layout, then reuse the template across all documents of that type.",
  },
  {
    question: "How do custom templates work?",
    answer:
      "You open a sample document, draw extraction boxes over each field you want to capture, name the fields, and set per-field OCR options. Save the template and apply it to every subsequent document of the same format.",
  },
  {
    question: "Does the software use AI or machine learning?",
    answer:
      "No. DocScanPro uses classical image processing (deskewing, contrast enhancement, noise reduction) combined with Tesseract OCR for text recognition and rule-based validation for data checking. It does not use generative AI or any neural-network model.",
  },
  {
    question: "Can I export data to CSV?",
    answer:
      "Yes. CSV export is the primary structured format. Each row corresponds to one extracted document; columns match your template field names. TXT export writes a readable plain-text version of the same data.",
  },
  {
    question: "Can it recognize handwritten answers?",
    answer:
      "Reliable handwriting recognition is not currently supported. Tesseract OCR performs best on clearly printed text. Handwritten or cursive content may produce inaccurate results and should be reviewed manually.",
  },
  {
    question: "What happens when a field cannot be read?",
    answer:
      "Fields where the OCR confidence falls below the configured threshold are flagged with a 'Needs review' status. You can inspect each flagged field in the review panel and enter the correct value before exporting.",
  },
];
