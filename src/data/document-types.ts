export interface DocumentType {
  title: string;
  description: string;
  /** SVG symbol identifier — rendered inline in the illustration component */
  symbol: "marksheet" | "answer-sheet" | "invoice" | "certificate" | "application-form" | "receipt" | "attendance" | "custom";
}

export const documentTypes: DocumentType[] = [
  {
    title: "Marksheets",
    description: "Extract student name, roll number, subject marks and totals.",
    symbol: "marksheet",
  },
  {
    title: "Structured Answer Sheets",
    description: "Read question numbers, marks and OMR bubble selections.",
    symbol: "answer-sheet",
  },
  {
    title: "Invoices & Bills",
    description: "Extract invoice number, line items, quantities and totals.",
    symbol: "invoice",
  },
  {
    title: "Certificates",
    description: "Digitize key details from award and completion certificates.",
    symbol: "certificate",
  },
  {
    title: "Application Forms",
    description: "Extract structured fields from any application or enrolment form.",
    symbol: "application-form",
  },
  {
    title: "Receipts",
    description: "Read payment details, transaction dates and amounts.",
    symbol: "receipt",
  },
  {
    title: "Attendance Sheets",
    description: "Convert attendance records to a searchable digital format.",
    symbol: "attendance",
  },
  {
    title: "Custom Documents",
    description: "Define your own template for any consistently formatted document.",
    symbol: "custom",
  },
];
