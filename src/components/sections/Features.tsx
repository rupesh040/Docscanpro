import { features } from "@/data/features";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { LucideIcon } from "lucide-react";

function FeatureBlock({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-5 py-6 border-b border-[var(--border)] last:border-b-0 hover:bg-[rgba(255,120,71,0.02)] transition-colors duration-300 px-2 -mx-2">
      <div className="shrink-0 mt-0.5">
        <div className="w-8 h-8 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
          <Icon size={18} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-sans font-semibold text-[clamp(1rem,1.5vw,1.15rem)] text-[var(--text)] leading-snug">
          {title}
        </h3>
        <p className="font-sans text-[13px] text-[var(--text-2)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Features() {
  const left = features.slice(0, 3);
  const right = features.slice(3);

  return (
    <section
      id="capabilities"
      className="py-20 lg:py-28 bg-[var(--bg)]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 mb-16 max-w-2xl">
          <Eyebrow>Capabilities</Eyebrow>
          <SectionHeading id="features-heading">
            Everything essential.
            <br />
            Nothing unnecessary.
          </SectionHeading>
          <p className="text-[var(--text-2)] text-[15px] leading-relaxed max-w-[52ch] mt-2">
            A practical document-processing workflow built around configurable
            extraction, image preparation, validation, and export.
          </p>
        </Reveal>

        {/* Two-column feature list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-x-16">
          <Stagger>
            {left.map((f) => (
              <StaggerItem key={f.title}>
                <FeatureBlock icon={f.icon} title={f.title} description={f.description} />
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger>
            {right.map((f) => (
              <StaggerItem key={f.title}>
                <FeatureBlock icon={f.icon} title={f.title} description={f.description} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
