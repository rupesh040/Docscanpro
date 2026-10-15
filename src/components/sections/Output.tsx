import { sampleRecords } from "@/data/sample-records";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * What lands in the file. Formats are described by what the operator does
 * with them, and the review column is shown because carrying the flag into
 * the export is the part that saves someone else a second pass.
 */

const FORMATS = [
  {
    ext: ".csv",
    title: "Comma separated",
    description:
      "Opens anywhere — Excel, Sheets, Tally, or your school's own software.",
  },
  {
    ext: ".txt",
    title: "Plain text",
    description: "The reading line by line, when you only need the words.",
  },
];

export function Output() {
  return (
    <section
      id="output"
      className="border-t border-[var(--rule)] py-[84px] lg:py-[104px]"
      aria-labelledby="output-heading"
    >
      <div className="wrap">
        <div className="mb-[46px] flex max-w-[620px] flex-col gap-[14px]">
          <SectionHeading id="output-heading">
            Every field you named becomes a column.
          </SectionHeading>
          <p className="max-w-[62ch] text-[0.9375rem] leading-[1.65] text-[var(--chalk-2)]">
            Rows you flagged during the check stay flagged in the file, so
            whoever opens it next knows exactly what to look at.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          {/* the exported table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse border border-[var(--rule)] text-[12.5px]">
              <caption className="sr-only">
                A sample of exported rows, with the review column carried over
                from the check step.
              </caption>
              <thead>
                <tr className="bg-[var(--graphite-2)]">
                  {["Candidate", "Roll no.", "Subject", "Max", "Obtained", "Review"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="whitespace-nowrap border-b border-r border-[var(--rule)] px-3 py-[9px] text-left text-[11.5px] font-semibold text-[var(--chalk-2)] last:border-r-0"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {sampleRecords.map((record) => {
                  const flagged = record.reviewStatus === "needs-review";
                  return (
                    <tr
                      key={record.rollNumber}
                      className={`border-b border-[var(--rule)] ${
                        flagged ? "bg-[var(--flag-dim)]" : ""
                      }`}
                    >
                      <td className="border-r border-[var(--rule)] px-3 py-[9px] text-[var(--chalk)]">
                        {record.studentName}
                      </td>
                      <td className="border-r border-[var(--rule)] px-3 py-[9px] font-mono text-[var(--chalk-2)]">
                        {record.rollNumber}
                      </td>
                      <td className="border-r border-[var(--rule)] px-3 py-[9px] text-[var(--chalk-2)]">
                        {record.subject}
                      </td>
                      <td className="border-r border-[var(--rule)] px-3 py-[9px] text-center font-mono text-[var(--chalk-3)]">
                        {record.maxMarks}
                      </td>
                      <td className="border-r border-[var(--rule)] px-3 py-[9px] text-center font-mono font-semibold text-[var(--chalk)]">
                        {record.obtainedMarks}
                      </td>
                      <td className="px-3 py-[9px]">
                        {flagged ? (
                          <span className="whitespace-nowrap font-mono text-[11px] text-[var(--flag)]">
                            check
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-[var(--chalk-3)]">
                            ok
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* formats */}
          <div className="flex flex-col gap-3">
            {FORMATS.map((format) => (
              <div
                key={format.ext}
                className="rounded-[4px] border border-[var(--rule)] bg-[var(--graphite-2)] px-[18px] py-[17px]"
              >
                <span className="mb-[9px] block font-mono text-[11px] text-[var(--signal)]">
                  {format.ext}
                </span>
                <h3 className="mb-[6px] text-[15px]" style={{ fontStretch: "100%" }}>
                  {format.title}
                </h3>
                <p className="text-[13px] leading-[1.55] text-[var(--chalk-2)]">
                  {format.description}
                </p>
              </div>
            ))}
            <p className="mt-1 text-[12.5px] leading-[1.6] text-[var(--chalk-3)]">
              CSV is the structured format — open it straight into Excel or
              Sheets and the columns match the field names from your template.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
