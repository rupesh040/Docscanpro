import { workflowSteps } from "@/data/workflow";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The only numbered list on the page. Numbers are kept because this content
 * really is a sequence — the steps happen in this order, once per batch.
 */
export function Workflow() {
  return (
    <section
      id="workflow"
      className="bg-[var(--graphite-2)] py-[84px] lg:py-[104px]"
      aria-labelledby="workflow-heading"
    >
      <div className="wrap">
        <div className="mb-[46px] flex max-w-[620px] flex-col gap-[14px]">
          <SectionHeading id="workflow-heading">
            Four steps, then you are done for the day.
          </SectionHeading>
          <p className="max-w-[62ch] text-[0.9375rem] leading-[1.65] text-[var(--chalk-2)]">
            The same template works for every sheet in the stack, so you set it
            up once and feed the rest of the pile through it.
          </p>
        </div>

        <ol className="m-0 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, i) => (
            <li
              key={step.title}
              className={`border-t-2 px-0 pb-6 pt-5 lg:pr-6 ${
                i === 0 ? "border-[var(--signal)]" : "border-[var(--rule)]"
              }`}
            >
              <span className="mb-3 block font-mono text-[11px] text-[var(--signal)]">
                Step {i + 1}
              </span>
              <h3 className="mb-[7px] text-[16px]" style={{ fontStretch: "100%" }}>
                {step.title}
              </h3>
              <p className="max-w-[34ch] text-[13.5px] leading-[1.6] text-[var(--chalk-2)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
