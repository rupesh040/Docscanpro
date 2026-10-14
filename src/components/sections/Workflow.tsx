"use client";

import { motion, useReducedMotion } from "framer-motion";
import { workflowSteps } from "@/data/workflow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Workflow() {
  const reduced = useReducedMotion();

  return (
    <section
      id="workflow"
      className="py-20 lg:py-28 bg-[var(--bg-2)] border-t border-[var(--border)]"
      aria-labelledby="workflow-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 mb-16 max-w-xl">
          <Eyebrow>The Workflow</Eyebrow>
          <SectionHeading id="workflow-heading">
            From document image
            <br />
            to structured data.
          </SectionHeading>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-[var(--border)] z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0 relative z-10">
            {workflowSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1} className="flex flex-col gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                {/* Step indicator */}
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: reduced ? 1 : 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                    className="w-8 h-8 border border-[var(--accent)] flex items-center justify-center shrink-0 bg-[var(--bg-2)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--accent)] font-bold">
                      {step.number}
                    </span>
                  </motion.div>
                  {/* Connector (desktop only, between steps) */}
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-semibold text-[17px] text-[var(--text)]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[var(--text-2)] leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-1 inline-block border border-[var(--border)] px-2 py-1">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)]">
                      {step.annotation}
                    </span>
                  </div>
                </div>

                {/* Vertical connector (mobile) */}
                {i < workflowSteps.length - 1 && (
                  <div className="lg:hidden w-px h-6 bg-[var(--border)] ml-4" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
