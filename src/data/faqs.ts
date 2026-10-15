export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Answers are deliberately plain about what the software does not do —
 * handwriting in particular. Overstating it here is how a results-week
 * operator ends up not trusting anything else on the page.
 */
export const faqs: FAQItem[] = [
  {
    question: "Does my data go anywhere?",
    answer:
      "No. The reading happens in the app on your own machine. There is no account, no sync and no upload step, and the software works with the network switched off.",
  },
  {
    question: "Can it read handwriting?",
    answer:
      "Not reliably, and it does not pretend to. The OCR is built for clearly printed and typed text. Handwritten or cursive entries may read incorrectly, so treat them as something to check by hand rather than something to trust.",
  },
  {
    question: "Which image formats can I open?",
    answer:
      "JPG, JPEG and PNG. Aim for at least 150 DPI with good contrast between the text and the paper — a flatbed scan beats a phone photo taken at an angle.",
  },
  {
    question: "Do I have to set up every sheet again?",
    answer:
      "Only the first one. Save it as a template and the rest of the stack reuses the same regions, field names and checks.",
  },
  {
    question: "What happens when a field cannot be read?",
    answer:
      "Any field whose confidence falls below your threshold is marked for review rather than written out silently. You see it in the field panel, correct it in place, and the correction goes into the export.",
  },
  {
    question: "Does it use AI?",
    answer:
      "No. It is classical image processing — deskew, contrast, noise removal — with Tesseract OCR for recognition and rule-based checks for validation. There is no neural network and no model to train.",
  },
  {
    question: "Will it run on an old office computer?",
    answer:
      "Yes. It needs no graphics card and no internet connection, so a machine that runs Windows 10 comfortably will run this.",
  },
];
