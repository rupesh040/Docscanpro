"use client";

import { useState, useCallback, useRef } from "react";
import { faqs } from "@/data/faqs";
import { FAQAccordionItem } from "@/components/ui/FAQItem";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  /** Arrow key navigation between FAQ headers */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (!containerRef.current) return;
      const buttons = Array.from(
        containerRef.current.querySelectorAll<HTMLButtonElement>("button[aria-expanded]")
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        buttons[(index + 1) % buttons.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        buttons[(index - 1 + buttons.length) % buttons.length]?.focus();
      }
    },
    []
  );

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-[var(--bg)] border-t border-[var(--border)]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left: heading */}
          <Reveal>
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <Eyebrow>Questions &amp; Answers</Eyebrow>
              <SectionHeading id="faq-heading">
                A few things
                <br />
                worth knowing.
              </SectionHeading>
            </div>
          </Reveal>

          {/* Right: accordion */}
          <Reveal delay={0.1}>
            <div
              ref={containerRef}
              className="flex flex-col border-t border-[var(--border)]"
              role="list"
            >
              {faqs.map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  onKeyDown={(e) => handleKeyDown(e, i)}
                >
                  <FAQAccordionItem
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
