"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Exploded isometric diagram: 4 stacked diamond-shaped layers */
export function DocumentProcessingDiagram() {
  const reduced = useReducedMotion();

  const layerVariants = (i: number) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: reduced ? 0 : i * 0.15,
      },
    },
  });

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="relative w-full aspect-[1.1/1] max-w-[560px]">
      {/* Frame */}
      <div className="absolute inset-0 border border-[var(--border)] rounded-sm">
        {/* Corner marks */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <div
            key={pos}
            className={`absolute w-3 h-3 ${
              pos === "top-left" ? "-top-px -left-px" :
              pos === "top-right" ? "-top-px -right-px" :
              pos === "bottom-left" ? "-bottom-px -left-px" :
              "-bottom-px -right-px"
            }`}
          >
            <svg viewBox="0 0 12 12" fill="none" className="w-full h-full">
              <path
                d={
                  pos === "top-left" ? "M0 6V0H6" :
                  pos === "top-right" ? "M12 6V0H6" :
                  pos === "bottom-left" ? "M0 6V12H6" :
                  "M12 6V12H6"
                }
                stroke="#FF7847"
                strokeWidth="1"
              />
            </svg>
          </div>
        ))}

        {/* Caption bar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-[var(--border)] flex items-center justify-between px-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)]">
            FIG. 01 · DOCUMENT TO DIGITAL
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-3)]">
            4 LAYERS · 1 PROCESS
          </span>
        </div>

        {/* SVG diagram content */}
        <div className="absolute inset-0 bottom-8 flex items-center justify-start pl-4 pr-36 pt-4">
          <svg
            viewBox="0 0 240 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="Exploded diagram showing four document processing layers"
            role="img"
          >
            <motion.g
              variants={layerVariants(3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Dark diamond */}
              <path d="M120 270 L220 240 L120 210 L20 240 Z" fill="#111110" stroke="#2A2926" strokeWidth="0.8" />
              {/* CSV rows */}
              <line x1="60" y1="228" x2="180" y2="228" stroke="#2A2926" strokeWidth="0.5" />
              <line x1="60" y1="234" x2="180" y2="234" stroke="#2A2926" strokeWidth="0.5" />
              <line x1="60" y1="240" x2="180" y2="240" stroke="#2A2926" strokeWidth="0.5" />
              <line x1="60" y1="246" x2="180" y2="246" stroke="#2A2926" strokeWidth="0.5" />
              <line x1="100" y1="222" x2="100" y2="252" stroke="#2A2926" strokeWidth="0.5" />
              <line x1="140" y1="222" x2="140" y2="252" stroke="#2A2926" strokeWidth="0.5" />
              <text x="120" y="218" textAnchor="middle" fill="#77746F" fontSize="5" fontFamily="monospace">MARKSHEET</text>
            </motion.g>

            {/* Layer 3: OCR */}
            <motion.g
              variants={layerVariants(2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <path d="M120 210 L220 180 L120 150 L20 180 Z" fill="#0F0F0E" stroke="#FF7847" strokeWidth="1" />
              {/* Orange highlighted cells */}
              <rect x="85" y="168" width="30" height="8" fill="#FF7847" opacity="0.9" rx="0.5" />
              <rect x="120" y="168" width="30" height="8" fill="#FF7847" opacity="0.7" rx="0.5" />
              <rect x="85" y="180" width="30" height="8" fill="#FF7847" opacity="0.4" rx="0.5" />
              <line x1="60" y1="168" x2="180" y2="168" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
              <line x1="60" y1="176" x2="180" y2="176" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
              <line x1="60" y1="184" x2="180" y2="184" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
              <line x1="85" y1="162" x2="85" y2="194" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
              <line x1="120" y1="162" x2="120" y2="194" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
              <line x1="155" y1="162" x2="155" y2="194" stroke="#FF7847" strokeWidth="0.4" opacity="0.4" />
            </motion.g>

            {/* Layer 2: Processing */}
            <motion.g
              variants={layerVariants(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <path d="M120 150 L220 120 L120 90 L20 120 Z" fill="#0D0D0C" stroke="#2A2926" strokeWidth="0.8" />
              {/* Grid */}
              {[100, 108, 116, 124, 132, 140].map((y, i) => (
                <line key={i} x1="40" y1={y} x2="200" y2={y} stroke="#2A2926" strokeWidth="0.4" />
              ))}
              {[70, 100, 130, 160].map((x, i) => (
                <line key={i} x1={x} y1="95" x2={x} y2="145" stroke="#2A2926" strokeWidth="0.4" />
              ))}
              {/* Alignment marks */}
              <path d="M50 98 L58 98 M50 98 L50 106" stroke="#FF7847" strokeWidth="0.8" opacity="0.6" />
              <path d="M190 142 L182 142 M190 142 L190 134" stroke="#FF7847" strokeWidth="0.8" opacity="0.6" />
            </motion.g>

            {/* Layer 1 (top): Scanned document */}
            <motion.g
              variants={layerVariants(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <path d="M120 90 L220 60 L120 30 L20 60 Z" fill="#E8E8E2" stroke="#CCCCCC" strokeWidth="0.8" />
              {/* Orange corner brackets */}
              <path d="M55 38 L47 38 L47 46" stroke="#FF7847" strokeWidth="1.2" />
              <path d="M185 38 L193 38 L193 46" stroke="#FF7847" strokeWidth="1.2" />
              <path d="M55 82 L47 82 L47 74" stroke="#FF7847" strokeWidth="1.2" />
              <path d="M185 82 L193 82 L193 74" stroke="#FF7847" strokeWidth="1.2" />
              {/* Document content */}
              <text x="120" y="48" textAnchor="middle" fill="#333" fontSize="6" fontFamily="sans-serif" fontWeight="bold">MARKSHEET</text>
              <line x1="60" y1="52" x2="180" y2="52" stroke="#999" strokeWidth="0.5" />
              <line x1="60" y1="58" x2="180" y2="58" stroke="#ddd" strokeWidth="0.5" />
              <line x1="60" y1="64" x2="180" y2="64" stroke="#ddd" strokeWidth="0.5" />
              <line x1="60" y1="70" x2="180" y2="70" stroke="#ddd" strokeWidth="0.5" />
              <line x1="60" y1="76" x2="180" y2="76" stroke="#ddd" strokeWidth="0.5" />
              <line x1="100" y1="50" x2="100" y2="82" stroke="#ddd" strokeWidth="0.5" />
              <line x1="140" y1="50" x2="140" y2="82" stroke="#ddd" strokeWidth="0.5" />
            </motion.g>

            {/* Leader lines – drawn on scroll */}
            {!reduced && (
              <>
                <motion.line
                  x1="193" y1="60" x2="230" y2="50"
                  stroke="#FF7847" strokeWidth="0.8"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <motion.line
                  x1="193" y1="120" x2="230" y2="110"
                  stroke="#FF7847" strokeWidth="0.8"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <motion.line
                  x1="193" y1="180" x2="230" y2="170"
                  stroke="#FF7847" strokeWidth="0.8"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <motion.line
                  x1="193" y1="240" x2="230" y2="230"
                  stroke="#FF7847" strokeWidth="0.8"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </>
            )}

            {/* Orange dots */}
            <circle cx="193" cy="60" r="2.5" fill="#FF7847" />
            <circle cx="193" cy="120" r="2.5" fill="#FF7847" />
            <circle cx="193" cy="180" r="2.5" fill="#FF7847" />
            <circle cx="193" cy="240" r="2.5" fill="#FF7847" />
          </svg>
        </div>

        {/* Callouts – right panel */}
        <div className="absolute right-0 top-4 bottom-8 w-32 flex flex-col justify-around pr-3 pl-1">
          {[
            {
              num: "01",
              label: "SCAN IMAGE",
              bullets: ["Auto crop", "Remove background", "Enhance quality"],
            },
            {
              num: "02",
              label: "IMAGE PROCESSING",
              bullets: ["Deskew", "Noise removal", "Improve clarity"],
            },
            {
              num: "03",
              label: "OCR & EXTRACTION",
              bullets: ["Detect text", "Recognize fields", "Review uncertain fields"],
            },
            {
              num: "04",
              label: "STRUCTURED DATA",
              bullets: ["Clean & organized", "Ready to export", "Editable results"],
            },
          ].map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduced ? 0 : 0.2 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-mono text-[9px] font-bold text-[var(--accent)]">{c.num}</span>
                <span className="font-mono text-[8px] tracking-widest uppercase text-[var(--text)] leading-tight">{c.label}</span>
              </div>
              {c.bullets.map((b) => (
                <div key={b} className="flex items-center gap-1">
                  <span className="text-[var(--text-3)] text-[7px]">–</span>
                  <span className="font-mono text-[7px] text-[var(--text-3)] leading-snug">{b}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
