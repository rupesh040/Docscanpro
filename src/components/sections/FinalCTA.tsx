import { Button, WindowsMark } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import site from "@/config/site";

/**
 * The page's one centred moment. The claims here are the three objections a
 * school office actually raises, answered in their own terms.
 */

const NOTES = [
  { title: "Works offline", detail: "No connection needed" },
  { title: "No machine learning", detail: "Image processing and OCR" },
  { title: "Windows 10 & 11", detail: "No graphics card required" },
];

export function FinalCTA() {
  return (
    <section
      id="download"
      className="bg-[var(--graphite-2)] py-[84px] lg:py-[104px]"
      aria-labelledby="download-heading"
    >
      <div className="wrap flex flex-col items-center gap-[18px] text-center">
        <SectionHeading id="download-heading" className="max-w-[18ch]">
          Clear the stack before results day.
        </SectionHeading>

        <p className="max-w-[52ch] text-[1.0625rem] leading-[1.62] text-[var(--chalk-2)]">
          Install it, box the fields on one sheet, then run the rest of the pile
          through the same template.
        </p>

        <div className="mt-[6px] flex flex-wrap justify-center gap-[10px]">
          <Button
            as="a"
            href={site.downloadUrl ?? undefined}
            disabled={!site.downloadUrl}
            disabledReason="The download link has not been configured yet."
          >
            <WindowsMark />
            Download for Windows
          </Button>
          <Button
            as="a"
            href={site.docsUrl ?? undefined}
            variant="secondary"
            disabled={!site.docsUrl}
            disabledReason="The setup guide has not been published yet."
          >
            Read the setup guide
          </Button>
        </div>

        <dl className="mt-[26px] grid w-full max-w-[620px] grid-cols-1 gap-x-7 gap-y-4 border-t border-[var(--rule)] pt-[22px] sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.title}>
              <dt className="text-[12.5px] font-medium text-[var(--chalk-2)]">
                {note.title}
              </dt>
              <dd className="text-[12px] text-[var(--chalk-3)]">{note.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
