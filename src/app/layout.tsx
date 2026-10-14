import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ─── SEO metadata ─── */
export const metadata: Metadata = {
  title: "DocScanPro — Document Scanner & Data Extraction",
  description:
    "Turn marksheets, invoices, forms and other documents into clean, structured digital data. Configurable OCR extraction, reusable templates, CSV and TXT export.",
  keywords: [
    "document scanner",
    "OCR",
    "data extraction",
    "CSV export",
    "Tesseract",
    "marksheet digitizer",
    "invoice scanner",
    "offline document processing",
  ],
  openGraph: {
    title: "DocScanPro — Document Scanner & Data Extraction",
    description:
      "Scan, extract, review and export document data through a configurable workflow. No cloud dependency.",
    type: "website",
    locale: "en_US",
    siteName: "DocScanPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocScanPro — Document Scanner & Data Extraction",
    description:
      "Turn scanned documents into structured data with configurable OCR and CSV export.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0A",
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
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
