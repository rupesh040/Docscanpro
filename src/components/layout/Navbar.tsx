"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { navSections, scrollToSection, sectionIds } from "@/config/nav";
import { useActiveSection } from "@/lib/use-scroll";
import { Button, WindowsMark } from "@/components/ui/Button";
import site from "@/config/site";

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Parked off-screen with a transform rather than toggled through
          sr-only, so revealing it cannot reflow the page. */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[200] -translate-y-[200%] rounded-[3px] bg-[var(--signal)] px-4 py-2 text-[13px] font-medium text-[#17110D] transition-transform focus-visible:translate-y-0"
      >
        Skip to main content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[60] h-[62px] border-b transition-colors ${
          lifted
            ? "border-[var(--rule)] bg-[var(--graphite)]/92 backdrop-blur-[10px]"
            : "border-transparent bg-[var(--graphite)]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6 lg:pl-[84px] lg:pr-6">
          <a
            href="#main-content"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-[9px] rounded-[2px] text-[15px] font-semibold tracking-[-0.01em]"
            aria-label="DocScanPro, back to top"
          >
            <LogoMark />
            DocScan<span className="text-[var(--signal)]">Pro</span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-[26px] min-[860px]:flex">
            {navSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={active === section.id ? "true" : undefined}
                className={`text-[13.5px] transition-colors ${
                  active === section.id
                    ? "text-[var(--chalk)]"
                    : "text-[var(--chalk-2)] hover:text-[var(--chalk)]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="hidden min-[860px]:block">
            <Button
              as="a"
              href={site.downloadUrl ?? "#download"}
              size="sm"
              disabled={!site.downloadUrl}
              disabledReason="The download link has not been configured yet."
            >
              <WindowsMark size={12} />
              Download
            </Button>
          </div>

          <button
            type="button"
            className="-mr-2 p-2 text-[var(--chalk)] min-[860px]:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
