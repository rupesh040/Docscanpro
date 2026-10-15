"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navSections, scrollToSection } from "@/config/nav";
import { Button, WindowsMark } from "@/components/ui/Button";
import site from "@/config/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Escape closes, and focus moves into the panel when it opens. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (id: string) => {
    onClose();
    // Let the panel unmount before scrolling, so the measurement is correct.
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[var(--graphite)]/95 backdrop-blur-md min-[860px]:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div ref={panelRef} className="flex h-full flex-col px-6 py-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">
            DocScan<span className="text-[var(--signal)]">Pro</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-2 p-2 text-[var(--chalk-2)] hover:text-[var(--chalk)]"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mt-10 flex flex-col">
          {navSections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => go(section.id)}
                aria-current={active === section.id ? "true" : undefined}
                className={`w-full border-b border-[var(--rule)] py-4 text-left text-[19px] ${
                  active === section.id ? "text-[var(--signal)]" : "text-[var(--chalk)]"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            as="a"
            href={site.downloadUrl ?? "#download"}
            disabled={!site.downloadUrl}
            disabledReason="The download link has not been configured yet."
            className="w-full"
            onClick={onClose}
          >
            <WindowsMark />
            Download for Windows
          </Button>
        </div>
      </div>
    </div>
  );
}
