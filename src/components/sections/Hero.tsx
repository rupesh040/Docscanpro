import { ExtractionBench } from "./ExtractionBench";
import { Button, WindowsMark } from "@/components/ui/Button";
import { SectionHeading, SpecTable } from "@/components/ui/SectionHeading";
import site from "@/config/site";

const SPECS = [
  { label: "Runs on", value: "Windows 10 & 11" },
  { label: "Reads", value: "JPG, JPEG, PNG" },
  { label: "Writes", value: "CSV and plain text" },
  { label: "Needs", value: "No internet, no sign-in" },
];

/**
 * The hero opens with the most characteristic thing in this product's world: a
 * sheet with regions drawn on it and data coming out the other side. The
 * visitor can drag those regions straight away, so the proof is the hero
 * rather than a screenshot of the proof.
 */
export function Hero() {
  return (
    <section
      id="bench"
      className="border-b border-[var(--rule)] pb-[72px] pt-[112px] lg:pb-[88px] lg:pt-[128px]"
      aria-labelledby="hero-heading"
    >
      <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
        <div>
          <SectionHeading
            as="h1"
            id="hero-heading"
            className="text-[clamp(2.5rem,5.4vw,3.8rem)]"
          >
            Stop retyping
            <br />
            marksheets by hand.
          </SectionHeading>

          <p className="mt-[22px] max-w-[44ch] text-[1.0625rem] leading-[1.62] text-[var(--chalk-2)]">
            Draw a box around the fields you need. DocScanPro reads what is
            inside it and hands you a spreadsheet. It runs on your own machine —
            no account, no upload, no model to train.
          </p>

          <div className="mt-7 flex flex-wrap gap-[10px]">
            <Button
              as="a"
              href={site.downloadUrl ?? "#download"}
              disabled={!site.downloadUrl}
              disabledReason="The download link has not been configured yet."
            >
              <WindowsMark />
              Download for Windows
            </Button>
            <Button as="a" href="#workflow" variant="secondary">
              See how it works
            </Button>
          </div>

          <SpecTable
            rows={SPECS}
            caption="What DocScanPro runs on and what it reads and writes"
            className="mt-9"
          />
        </div>

        <ExtractionBench />
      </div>
    </section>
  );
}
