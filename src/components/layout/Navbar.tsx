"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import site from "@/config/site";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Service", href: "/service" },
  { label: "Templates", href: "#templates" },
  { label: "How It Works", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
];

function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
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

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth anchor scroll
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--accent)] focus:text-[#0B0B0A] focus:px-4 focus:py-2 focus:rounded-sm focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] border-b border-[var(--border)] transition-colors duration-300 ${
          scrolled ? "bg-[#0B0B0A]/95 backdrop-blur-md" : "bg-[#0B0B0A]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-sm"
            aria-label="DocScanPro – back to top"
          >
            <LogoMark />
            <span className="font-sans font-semibold text-[15px] text-[var(--text)] leading-none">
              DocScan<span className="text-[var(--accent)]">Pro</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            <motion.ul
              className="flex items-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-2)] hover:text-[var(--text)]"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Download button */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.downloadUrl ? (
                <a
                  href={site.downloadUrl}
                  className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text)] px-4 py-2 rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  Download ↓
                </a>
              ) : (
                <button
                  aria-disabled="true"
                  disabled
                  title="Download link not configured"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text-3)] px-4 py-2 rounded-sm opacity-50 cursor-not-allowed"
                >
                  Download ↓
                </button>
              )}
            </motion.div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] p-2 -mr-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        activeSection={activeSection}
        onLinkClick={handleAnchorClick}
      />
    </>
  );
}
