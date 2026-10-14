"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQItem } from "@/data/faqs";

interface FAQItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQAccordionItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  const id = `faq-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-[var(--border)]">
      <button
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] group"
      >
        <span className="flex items-start gap-4">
          <span className="font-mono text-[10px] text-[var(--text-3)] pt-0.5 tracking-widest shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] font-sans text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
            {item.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 mt-0.5 text-[var(--text-3)] group-hover:text-[var(--accent)] transition-colors duration-200"
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-10 text-[14px] text-[var(--text-2)] leading-relaxed max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
