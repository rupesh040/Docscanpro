"use client";

import site from "@/config/site";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Service", href: "/service" },
  { label: "How It Works", href: "#workflow" },
  { label: "Templates", href: "#templates" },
  { label: "FAQ", href: "#faq" },
];

function FooterLogoMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
        stroke="#FF7847"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M11 12h10M11 16h10M11 20h6"
        stroke="#FF7847"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <FooterLogoMark />
              <span className="font-sans font-semibold text-[15px] text-[var(--text)]">
                DocScan<span className="text-[var(--accent)]">Pro</span>
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-3)] max-w-[220px]">
              Document Scanner &amp; Data Extraction System
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-3)] hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {site.docsUrl && (
                <li>
                  <a
                    href={site.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-3)] hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    Documentation
                  </a>
                </li>
              )}
              {site.githubUrl && (
                <li>
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-3)] hover:text-[var(--text)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4 flex-wrap">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-3)]">
            © {year} DocScanPro. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-3)]">
            Local processing · No cloud dependency
          </p>
        </div>
      </div>
    </footer>
  );
}
