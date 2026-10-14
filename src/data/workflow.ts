export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  annotation: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    title: "Upload",
    description:
      "Import a JPG, JPEG or PNG image of your document. Single page or a batch of pages.",
    annotation: "Accepted: JPG · JPEG · PNG",
  },
  {
    number: "02",
    title: "Adjust",
    description:
      "Correct the image orientation, select or create a template, and define the extraction regions for each field.",
    annotation: "Crop · Deskew · Rotate",
  },
  {
    number: "03",
    title: "Extract & Verify",
    description:
      "Tesseract OCR recognizes the text in each region. Inspect the results and correct any uncertain or flagged values.",
    annotation: "OCR · Field review · Corrections",
  },
  {
    number: "04",
    title: "Export",
    description:
      "Save the structured results as a CSV table or readable plain text. Your template is saved for future documents.",
    annotation: "CSV · TXT · Save template",
  },
];
