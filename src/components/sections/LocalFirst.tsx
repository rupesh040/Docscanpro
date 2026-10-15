import { Kicker, SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The real differentiator, so it gets its own paper band and a comparison
 * register rather than a bullet in a feature grid.
 *
 * Framed around the operator's actual exposure — these sheets carry named
 * students' results — rather than around abstract privacy language.
 */

interface Row {
  aspect: string;
  ours: string;
  theirs: string;
}

const ROWS: Row[] = [
  {
    aspect: "Where pages are read",
    ours: "On the computer in front of you",
    theirs: "Uploaded to someone else's server",
  },
  { aspect: "Needs internet", ours: "No", theirs: "Yes, for every page" },
  {
    aspect: "Account required",
    ours: "No",
    theirs: "Usually, with a page quota",
  },
  { aspect: "Cost per page", ours: "None", theirs: "Metered" },
  {
    aspect: "Control over fields",
    ours: "You box and name every field",
    theirs: "Whatever the model returns",
  },
  {
    aspect: "Runs on an old office PC",
    ours: "Yes, no graphics card needed",
    theirs: "Depends on the connection",
  },
];

export function LocalFirst() {
  return (
    <section
      id="local"
      className="bg-[var(--paper)] py-[84px] text-[var(--ink)] lg:py-[104px]"
      aria-labelledby="local-heading"
    >
      <div className="wrap">
        <div className="mb-[38px] flex max-w-[640px] flex-col gap-[14px]">
          <Kicker tone="paper">Why offline matters here</Kicker>
          <SectionHeading id="local-heading">
            Student records never leave the room.
          </SectionHeading>
          <p className="max-w-[64ch] text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">
            Marksheets carry names, roll numbers and results. A cloud scanner
            moves all of that onto hardware you do not control. DocScanPro does
            the reading on the machine in front of you.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13.5px]">
            <caption className="pb-3 text-left text-[12.5px] text-[var(--ink-2)]">
              How DocScanPro compares with a typical cloud OCR service.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[26%] border-b-[1.5px] border-[var(--paper-ink)] px-[14px] pb-[9px] text-left text-[11.5px] font-semibold">
                  <span className="sr-only">Aspect</span>
                </th>
                <th
                  scope="col"
                  className="border-b-[1.5px] border-[var(--paper-ink)] bg-[#E3DDCB] px-[14px] pb-[9px] pt-[9px] text-left text-[11.5px] font-semibold"
                >
                  DocScanPro
                </th>
                <th
                  scope="col"
                  className="border-b-[1.5px] border-[var(--paper-ink)] px-[14px] pb-[9px] text-left text-[11.5px] font-semibold"
                >
                  Cloud OCR service
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.aspect}>
                  <th
                    scope="row"
                    className="border-b border-[var(--paper-rule)] px-[14px] py-[13px] text-left align-top text-[12.5px] font-normal text-[var(--ink-2)]"
                  >
                    {row.aspect}
                  </th>
                  <td className="border-b border-[var(--paper-rule)] bg-[var(--paper-2)] px-[14px] py-[13px] align-top font-medium">
                    {row.ours}
                  </td>
                  <td className="border-b border-[var(--paper-rule)] px-[14px] py-[13px] align-top">
                    {row.theirs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
