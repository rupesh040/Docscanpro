"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { stripItems } from "@/data/strip";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { LucideIcon } from "lucide-react";

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-14 h-14 border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors duration-300">
      {/* Corner ticks */}
      {["tl", "tr", "bl", "br"].map((corner) => (
        <div
          key={corner}
          className={`absolute w-1.5 h-1.5 pointer-events-none ${
            corner === "tl" ? "-top-px -left-px" :
            corner === "tr" ? "-top-px -right-px" :
            corner === "bl" ? "-bottom-px -left-px" :
            "-bottom-px -right-px"
          }`}
        >
          <svg viewBox="0 0 6 6" fill="none" className="w-full h-full">
            <path
              d={
                corner === "tl" ? "M0 3V0H3" :
                corner === "tr" ? "M6 3V0H3" :
                corner === "bl" ? "M0 3V6H3" :
                "M6 3V6H3"
              }
              stroke="#FF7847"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
      <Icon size={22} className="text-[var(--accent)] group-hover:-translate-y-0.5 transition-transform duration-300" />
    </div>
  );
}

export function FeatureStrip() {
  return (
    <section
      id="features"
      className="border-t border-[var(--border)] bg-[var(--bg-2)]"
      aria-label="Features overview"
    >
      <Stagger className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[var(--border)]">
        {stripItems.map((item) => (
          <StaggerItem key={item.number}>
            <motion.div
              className="group relative p-6 flex flex-col gap-4 min-h-[220px] hover:bg-[rgba(255,120,71,0.03)] transition-colors duration-300 border-b sm:border-b-0 border-[var(--border)] cursor-default"
              whileHover={{ backgroundColor: "rgba(255,120,71,0.04)" }}
            >
              {/* Number tab */}
              <div className="absolute top-0 left-0 border-r border-b border-[var(--border)] px-2 py-0.5">
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)]">
                  {item.number}
                </span>
              </div>

              <div className="mt-6">
                <IconBox Icon={item.icon} />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-[clamp(1rem,1.5vw,1.2rem)] text-[var(--text)] leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-[13px] text-[var(--text-2)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <motion.div
                className="text-[var(--text-3)] group-hover:text-[var(--accent)] transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
