import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocScanPro — turn scanned marksheets and forms into spreadsheets",
  description:
    "Draw a box around the fields you need and DocScanPro reads them into a spreadsheet. Marksheets, answer sheets, invoices and forms, read on your own machine with no account and no upload.",
  keywords: [
    "document scanner",
    "OCR",
    "marksheet to Excel",
    "data extraction",
    "CSV export",
    "Tesseract",
    "offline OCR",
    "invoice scanner",
    "answer sheet reader",
  ],
  openGraph: {
    title: "DocScanPro — turn scanned marksheets and forms into spreadsheets",
    description:
      "Box the fields you need, check the reading, export a spreadsheet. Runs entirely on your own machine.",
    type: "website",
    locale: "en_US",
    siteName: "DocScanPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocScanPro — turn scanned marksheets and forms into spreadsheets",
    description:
      "Box the fields you need, check the reading, export a spreadsheet. No account, no upload.",
  },
};

export const viewport: Viewport = {
  themeColor: "#15181C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[var(--graphite)] text-[var(--chalk)] antialiased">
        {children}
      </body>
    </html>
  );
}
