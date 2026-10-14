"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { DocumentProcessingDiagram } from "@/components/illustrations/DocumentProcessingDiagram";
import site from "@/config/site";

/** Windows logo inline SVG (no lucide brand icon) */
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

export function Hero() {
  const reduced = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  const line = (i: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: i * 0.05 } } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.4 + i * 0.1 } },
        };

  return (
    <section
      className="relative pt-[70px] min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 lg:gap-8 items-center">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow tag */}
            <motion.div
              {...line(0)}
              className="self-start"
            >
              <span className="inline-block border border-[var(--accent)] px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--accent)]">
                Document Digitization System
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-[clamp(3rem,6.5vw,5.5rem)] leading-[1.0] tracking-[-0.025em]">
              <motion.span {...line(1)} className="block text-[var(--text)]">
                Documents,
              </motion.span>
              <motion.span {...line(2)} className="block italic text-[var(--accent)]">
                reimagined
              </motion.span>
              <motion.span {...line(3)} className="block text-[var(--text)]">
                for the modern world.
              </motion.span>
            </h1>

            {/* Body */}
            <motion.p
              {...line(4)}
              className="text-[var(--text-2)] text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed max-w-[42ch]"
            >
              Turn marksheets, answer sheets, invoices and forms into clean,
              structured digital data. Scan, extract, review and export through
              a configurable workflow.
            </motion.p>

            {/* Buttons */}
            <motion.div {...line(5)} className="flex flex-wrap gap-3 mt-1">
              {/* Primary: Download */}
              {site.downloadUrl ? (
                <a
                  id="hero-download-btn"
                  href={site.downloadUrl}
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase bg-[var(--accent)] text-[#0B0B0A] px-5 py-3.5 rounded-sm hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <WindowsLogo />
                  Download for Windows
                </a>
              ) : (
                <button
                  id="hero-download-btn"
                  disabled
                  aria-disabled="true"
                  title="Download link not yet configured"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase bg-[var(--accent)] text-[#0B0B0A] px-5 py-3.5 rounded-sm opacity-60 cursor-not-allowed min-h-[44px]"
                >
                  <WindowsLogo />
                  Download for Windows
                </button>
              )}

              {/* Secondary: Explore */}
              <a
                id="hero-explore-btn"
                href="#workflow"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("workflow");
                  if (el) {
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text)] px-5 py-3.5 rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98] transition-all duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <PlayCircle size={14} />
                Explore How It Works
              </a>
            </motion.div>

            {/* Metadata */}
            <motion.div {...line(6)} className="flex flex-wrap items-center gap-2 mt-1">
              <div className="w-6 h-px bg-[var(--border)]" />
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--text-3)] flex flex-wrap gap-2 items-center">
                <span>Local Processing</span>
                <span className="text-[var(--border)]">·</span>
                <span>Custom Templates</span>
                <span className="text-[var(--border)]">·</span>
                <span>CSV Export</span>
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Figure frame ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <DocumentProcessingDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
