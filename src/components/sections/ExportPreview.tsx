import { sampleRecords } from "@/data/sample-records";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Left side: scanned page preview */
function ScannedPagePreview() {
  return (
    <div className="border border-[var(--border)] bg-[#F5F4F0] p-4 aspect-[3/4] flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[8px] tracking-widest uppercase text-[#888]">SCANNED DOCUMENT</span>
        <span className="font-mono text-[8px] text-[#888]">Page 1 of 1</span>
      </div>
      <div className="flex-1 bg-white border border-[#ddd] p-4 flex flex-col gap-3">
        <div className="text-center font-sans text-[11px] font-bold text-[#222] border-b border-[#ddd] pb-2">
          MARKSHEET
        </div>
        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="border border-[#FF7847] bg-[rgba(255,120,71,0.05)] px-1.5 py-1">
            <div className="text-[#888]">Student Name</div>
            <div className="text-[#333] font-semibold">Rahul Sharma</div>
          </div>
          <div className="border border-[#FF7847] bg-[rgba(255,120,71,0.05)] px-1.5 py-1">
            <div className="text-[#888]">Roll Number</div>
            <div className="text-[#333] font-semibold">00125</div>
          </div>
        </div>
        <table className="w-full text-[8px] border-collapse">
          <thead>
            <tr className="border-b border-[#ddd]">
              {["Subject","Max","Obtained","Grade"].map(h => (
                <th key={h} className="text-left py-1 text-[#777] font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[["Mathematics","100","85","A"],["Science","100","78","A"],["English","100","82","A"]].map(row => (
              <tr key={row[0]} className="border-b border-[#eee]">
                {row.map((cell, i) => (
                  <td key={i} className="py-1 text-[#333]">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Right side: structured data table */
function CSVPreviewTable() {
  return (
    <div className="flex flex-col gap-2">
      {/* Format badges */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[9px] tracking-widest uppercase border border-[var(--accent)] text-[var(--accent)] px-2 py-1">CSV</span>
        <span className="font-mono text-[9px] tracking-widest uppercase border border-[var(--border)] text-[var(--text-3)] px-2 py-1">TXT</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="font-mono text-[9px] text-[var(--text-3)]">{sampleRecords.length} rows</span>
      </div>

      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse border border-[var(--border)] text-[11px]">
          <thead>
            <tr className="bg-[var(--surface)]">
              {["Student Name","Roll No.","Subject","Max Marks","Obtained","Review"].map(h => (
                <th
                  key={h}
                  className="text-left px-3 py-2 font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)] border-b border-r border-[var(--border)] last:border-r-0 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleRecords.map((rec, i) => (
              <tr
                key={i}
                className={`border-b border-[var(--border)] ${
                  rec.reviewStatus === "needs-review"
                    ? "bg-[rgba(255,120,71,0.04)]"
                    : "hover:bg-[var(--bg-2)]"
                } transition-colors`}
              >
                <td className="px-3 py-2 border-r border-[var(--border)] text-[var(--text)] font-sans">{rec.studentName}</td>
                <td className="px-3 py-2 border-r border-[var(--border)] font-mono text-[var(--text-2)]">{rec.rollNumber}</td>
                <td className="px-3 py-2 border-r border-[var(--border)] text-[var(--text-2)] font-sans">{rec.subject}</td>
                <td className="px-3 py-2 border-r border-[var(--border)] font-mono text-[var(--text-2)] text-center">{rec.maxMarks}</td>
                <td className="px-3 py-2 border-r border-[var(--border)] font-mono text-[var(--text)] text-center font-semibold">{rec.obtainedMarks}</td>
                <td className="px-3 py-2 last:border-r-0">
                  {rec.reviewStatus === "needs-review" ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[var(--accent)] border border-[var(--accent)] px-1.5 py-0.5 whitespace-nowrap">
                      ⚑ Needs review
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[var(--text-3)] border border-[var(--border)] px-1.5 py-0.5">
                      ✓ OK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExportPreview() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--bg)] border-t border-[var(--border)]"
      aria-labelledby="export-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 mb-14 max-w-xl">
          <Eyebrow>Structured Output</Eyebrow>
          <SectionHeading id="export-heading">
            From scanned pages
            <br />
            to usable records.
          </SectionHeading>
          <p className="text-[var(--text-2)] text-[15px] leading-relaxed max-w-[46ch] mt-1">
            Every field you defined in your template becomes a column in the
            output. Rows flagged during review are marked before you export.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
          {/* Scanned page */}
          <Reveal>
            <ScannedPagePreview />
          </Reveal>

          {/* Connector arrow + CSV table */}
          <Reveal delay={0.12} className="flex flex-col gap-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)]">→ Extracted data</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <CSVPreviewTable />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
