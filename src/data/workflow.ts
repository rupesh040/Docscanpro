/**
 * The four steps of a working session. Numbered markers are used here, and
 * only here, because this content genuinely is a sequence.
 */

export interface WorkflowStep {
  title: string;
  description: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Load the page",
    description:
      "Open a photo or a scan. Add the whole stack at once when the sheets share a layout.",
  },
  {
    title: "Mark the fields",
    description:
      "Box the areas you want and name them. Straighten and sharpen the page if it came in crooked.",
  },
  {
    title: "Check the reading",
    description:
      "Anything doubtful is flagged. Correct it in place, before it reaches your spreadsheet.",
  },
  {
    title: "Save the sheet",
    description:
      "Write out CSV or text, and keep the template ready for the next batch.",
  },
];
