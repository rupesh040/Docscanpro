import { controls, type ControlIcon } from "@/data/features";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * A two-column definition list rather than six identical rounded cards. The
 * content is a set of parallel short definitions, which is what a list is
 * for; boxing each one adds a border and takes away the ability to scan down
 * the column.
 */

const ICON_PATHS: Record<ControlIcon, React.ReactNode> = {
  region: <path d="M3 8V4h4M21 8V4h-4M3 16v4h4M21 16v4h-4" />,
  table: <path d="M4 5h16M4 12h16M4 19h16M9 2v20M15 2v20" />,
  template: <path d="M12 3l9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" />,
  image: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  validate: (
    <>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  export: <path d="M12 15V3M7 10l5 5 5-5M4 17v3h16v-3" />,
};

export function Features() {
  return (
    <section
      id="controls"
      className="py-[84px] lg:py-[104px]"
      aria-labelledby="controls-heading"
    >
      <div className="wrap">
        <div className="mb-[46px] flex max-w-[620px] flex-col gap-[14px]">
          <SectionHeading id="controls-heading">
            You decide what gets read.
          </SectionHeading>
          <p className="max-w-[62ch] text-[0.9375rem] leading-[1.65] text-[var(--chalk-2)]">
            Nothing is guessed on your behalf. Every part of the reading is a
            setting you can see, change and save.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-14">
          {controls.map((control) => (
            <div
              key={control.title}
              className="border-b border-[var(--rule)] py-[18px]"
            >
              {/* A div inside a dl may only hold dt and dd, so the icon lives
                  inside the dt rather than in a wrapper alongside it. */}
              <dt
                className="mb-[5px] grid grid-cols-[22px_1fr] gap-[14px] text-[15px] font-semibold"
                style={{ fontStretch: "100%" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-[2px] h-[17px] w-[17px] flex-none"
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICON_PATHS[control.icon]}
                </svg>
                <span>{control.title}</span>
              </dt>
              <dd className="ml-[36px] max-w-[46ch] text-[13.5px] leading-[1.6] text-[var(--chalk-2)]">
                {control.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
