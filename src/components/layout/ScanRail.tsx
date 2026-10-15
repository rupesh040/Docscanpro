"use client";

import { pageSections, scrollToSection, sectionIds } from "@/config/nav";
import { useActiveSection, useScrollProgress } from "@/lib/use-scroll";
import { cn } from "@/lib/utils";

/**
 * The scan rail: a hairline down the left edge with a tick per section and a
 * marker that travels with the scroll, like a scan head crossing a page.
 *
 * It earns its place by doing three jobs at once — it is the page's signature
 * device, its progress indicator, and its section navigation.
 */
export function ScanRail() {
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const lastIndex = Math.max(1, pageSections.length - 1);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-[38px] top-0 z-40 hidden h-full w-px bg-[var(--rule)] lg:block"
    >
      <span
        aria-hidden="true"
        className="absolute -left-1 h-[34px] w-[9px] rounded-[1px] bg-[var(--signal)] shadow-[0_0_18px_2px_var(--signal-dim)]"
        style={{ top: `calc(${(progress * 100).toFixed(2)}% - ${(progress * 34).toFixed(0)}px)` }}
      />

      {pageSections.map((section, i) => {
        const isActive = active === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "group pointer-events-auto absolute left-0 h-px cursor-pointer transition-all",
              isActive ? "w-[15px] bg-[var(--signal)]" : "w-[9px] bg-[var(--rule)]",
            )}
            style={{ top: `${12 + (i * 76) / lastIndex}%` }}
          >
            <span
              className={cn(
                "absolute left-[19px] top-1/2 whitespace-nowrap text-[9.5px] tracking-[0.06em] transition-opacity",
                isActive
                  ? "text-[var(--chalk)] opacity-100"
                  : "text-[var(--chalk-3)] opacity-0 group-hover:opacity-100",
              )}
              style={{
                writingMode: "vertical-rl",
                transform: "translateY(-50%) rotate(180deg)",
              }}
            >
              {section.rail}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
