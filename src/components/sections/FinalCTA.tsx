import { BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import site from "@/config/site";

function WindowsLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M0 1.5L5.75 0.75V6.25H0V1.5Z" />
      <path d="M6.5 0.65L14 0V6.25H6.5V0.65Z" />
      <path d="M0 7.75H5.75V13.25L0 12.5V7.75Z" />
      <path d="M6.5 7.75H14V14L6.5 13.35V7.75Z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--bg-2)] border-t border-[var(--border)] relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[var(--accent)]" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--accent)]">
            Get Started
          </p>

          <h2
            id="cta-heading"
            className="font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text)] max-w-[18ch]"
          >
            Make every document
            <br />
            easier to work with.
          </h2>

          <p className="text-[var(--text-2)] text-[15px] leading-relaxed max-w-[46ch]">
            Scan, extract, verify and organize your documents in one focused
            workflow.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {/* Primary: Download */}
            {site.downloadUrl ? (
              <a
                id="cta-download-btn"
                href={site.downloadUrl}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase bg-[var(--accent)] text-[#0B0B0A] px-6 py-3.5 rounded-sm hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <WindowsLogo />
                Download for Windows
              </a>
            ) : (
              <button
                id="cta-download-btn"
                disabled
                aria-disabled="true"
                title="Download link not yet configured"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase bg-[var(--accent)] text-[#0B0B0A] px-6 py-3.5 rounded-sm opacity-60 cursor-not-allowed min-h-[44px]"
              >
                <WindowsLogo />
                Download for Windows
              </button>
            )}

            {/* Secondary: Documentation */}
            {site.docsUrl ? (
              <a
                id="cta-docs-btn"
                href={site.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text)] px-6 py-3.5 rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98] transition-all duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <BookOpen size={14} />
                View Documentation
              </a>
            ) : (
              <button
                id="cta-docs-btn"
                disabled
                aria-disabled="true"
                title="Documentation not yet available"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text-3)] px-6 py-3.5 rounded-sm opacity-50 cursor-not-allowed min-h-[44px]"
              >
                <BookOpen size={14} />
                View Documentation
              </button>
            )}
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {["Local Processing", "No AI / No Machine Learning", "Configurable Templates", "Windows Support"].map(
              (chip) => (
                <span
                  key={chip}
                  className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)] border border-[var(--border)] px-2.5 py-1"
                >
                  {chip}
                </span>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
