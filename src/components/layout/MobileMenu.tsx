"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import site from "@/config/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  activeSection: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  links,
  activeSection,
  onLinkClick,
}: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            id="mobile-menu"
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[var(--bg-2)] border-l border-[var(--border)] flex flex-col md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 h-[70px] border-b border-[var(--border)]">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--text-3)]">
                Menu
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="text-[var(--text-2)] hover:text-[var(--text)] p-2 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto">
              <ul className="py-4">
                {links.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.06,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          onLinkClick(e, link.href);
                          onClose();
                        }}
                        className={`block px-6 py-4 font-mono text-[12px] tracking-[0.18em] uppercase border-b border-[var(--border)] transition-colors min-h-[56px] flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
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
              </ul>
            </nav>

            <div className="p-6 border-t border-[var(--border)]">
              {site.downloadUrl ? (
                <a
                  href={site.downloadUrl}
                  className="flex items-center justify-center gap-2 w-full font-mono text-[11px] tracking-[0.14em] uppercase bg-[var(--accent)] text-[#0B0B0A] px-5 py-3.5 rounded-sm hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                >
                  Download ↓
                </a>
              ) : (
                <button
                  disabled
                  aria-disabled="true"
                  title="Download link not configured"
                  className="flex items-center justify-center gap-2 w-full font-mono text-[11px] tracking-[0.14em] uppercase border border-[var(--border)] text-[var(--text-3)] px-5 py-3.5 rounded-sm opacity-50 cursor-not-allowed min-h-[44px]"
                >
                  Download ↓
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
