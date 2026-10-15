import { faqs } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * A ruled register on paper. Built on native <details> so it opens without
 * JavaScript, is keyboard operable for free, and is findable by the browser's
 * own in-page search.
 *
 * The numbers here are reference marks for a register, not a sequence — they
 * let someone point at "question 3" rather than implying an order.
 */
export function FAQ() {
  return (
    <section
      id="questions"
      className="bg-[var(--paper)] py-[84px] text-[var(--ink)] lg:py-[104px]"
      aria-labelledby="faq-heading"
    >
      <div className="wrap max-w-[860px]">
        <div className="mb-[38px] max-w-[560px]">
          <SectionHeading id="faq-heading">
            Questions people ask first.
          </SectionHeading>
        </div>

        <div className="border-t-[1.5px] border-[var(--paper-ink)]">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              open={i === 0}
              className="group border-b border-[var(--paper-rule)]"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-4 py-[17px] text-[15.5px] font-medium text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                <span className="w-[22px] flex-none font-mono text-[11px] text-[#8A8477]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex-none text-[19px] leading-none text-[var(--ink-accent)]"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p className="max-w-[70ch] pb-[18px] pl-[38px] text-[13.5px] leading-[1.68] text-[var(--ink-2)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
