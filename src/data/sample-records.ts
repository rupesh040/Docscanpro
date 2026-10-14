export interface SampleRecord {
  studentName: string;
  rollNumber: string;
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  reviewStatus: "ok" | "needs-review";
}

export const sampleRecords: SampleRecord[] = [
  {
    studentName: "Rahul Sharma",
    rollNumber: "00125",
    subject: "Mathematics",
    maxMarks: 100,
    obtainedMarks: 85,
    reviewStatus: "ok",
  },
  {
    studentName: "Priya Singh",
    rollNumber: "00126",
    subject: "Science",
    maxMarks: 100,
    obtainedMarks: 78,
    reviewStatus: "ok",
  },
  {
    studentName: "Amit Kumar",
    rollNumber: "00127",
    subject: "English",
    maxMarks: 100,
    obtainedMarks: 82,
    reviewStatus: "needs-review",
  },
  {
    studentName: "Sneha Patel",
    rollNumber: "00128",
    subject: "Social Studies",
    maxMarks: 100,
    obtainedMarks: 75,
    reviewStatus: "ok",
  },
  {
    studentName: "Rohan Verma",
    rollNumber: "00129",
    subject: "Computer Science",
    maxMarks: 100,
    obtainedMarks: 90,
    reviewStatus: "needs-review",
  },
];
