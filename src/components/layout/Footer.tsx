import { navSections } from "@/config/nav";
import site from "@/config/site";

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="2.5"
        width="17"
        height="19"
        rx="1.5"
        stroke="var(--signal)"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5"
        stroke="var(--signal)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The year is a constant, not `new Date().getFullYear()`. `cacheComponents`
 * is enabled in next.config.ts, and Next 16 aborts the prerender when a
 * server component reads the clock synchronously. Bump this once a year, or
 * move it into a component with the "use cache" directive.
 */
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] py-[34px] pb-[90px] min-[860px]:pb-[34px]">
      <div className="wrap flex flex-wrap items-start justify-between gap-8">
        <div>
          <div className="mb-[7px] flex items-center gap-[9px] text-[15px] font-semibold">
            <LogoMark />
            DocScan<span className="text-[var(--signal)]">Pro</span>
          </div>
          <p className="max-w-[40ch] text-[12px] leading-[1.6] text-[var(--chalk-3)]">
            Document scanner and data extraction for Windows. Reads your pages
            where they already are.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-[7px]">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-[12.5px] text-[var(--chalk-2)] transition-colors hover:text-[var(--chalk)]"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3">
          {/* Named text links rather than brand glyphs: the labels say where
              they go, and lucide has since dropped its brand icon set. */}
          {site.githubUrl && (
            <a
              href={site.githubUrl}
              className="text-[12.5px] text-[var(--chalk-2)] transition-colors hover:text-[var(--chalk)]"
            >
              Source on GitHub
            </a>
          )}
          {site.docsUrl && (
            <a
              href={site.docsUrl}
              className="text-[12.5px] text-[var(--chalk-2)] transition-colors hover:text-[var(--chalk)]"
            >
              Setup guide
            </a>
          )}
          <p className="text-[12px] text-[var(--chalk-3)]">
            © {COPYRIGHT_YEAR} DocScanPro
          </p>
        </div>
      </div>
    </footer>
  );
}
