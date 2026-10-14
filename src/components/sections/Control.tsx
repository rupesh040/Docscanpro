import { HardDrive, ShieldCheck, Eye } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const columns = [
  {
    icon: HardDrive,
    title: "Local Processing",
    description:
      "All image processing and text extraction runs on your machine. No document data is sent to cloud services or external APIs.",
  },
  {
    icon: ShieldCheck,
    title: "Rule-Based Validation",
    description:
      "Define rules for required fields, numeric ranges, column totals and duplicate detection. Non-conforming values are flagged before export.",
  },
  {
    icon: Eye,
    title: "Review Before Export",
    description:
      "Uncertain extraction results are marked for review. You inspect and correct each flagged field in the review panel before the data is written to file.",
  },
];

export function Control() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--bg-2)] border-t border-[var(--border)]"
      aria-labelledby="control-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 mb-14 max-w-xl">
          <Eyebrow>Built for Control</Eyebrow>
          <SectionHeading id="control-heading">
            Transparent processing.
            <br />
            Human-verified results.
          </SectionHeading>
        </Reveal>

        {/* Three columns */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <StaggerItem key={col.title}>
                <div className="flex flex-col gap-5 p-6 md:first:pl-0 md:last:pr-0">
                  <div className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans font-semibold text-[17px] text-[var(--text)]">
                      {col.title}
                    </h3>
                    <p className="font-sans text-[13px] text-[var(--text-2)] leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
