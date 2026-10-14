"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override y distance in pixels */
  distance?: number;
}

/**
 * Wraps children in a motion.div that fades and slides up on scroll.
 * Respects prefers-reduced-motion: uses opacity-only transition.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: distance }}
      whileInView={
        reduced
          ? { opacity: 1, transition: { duration: 0.4, delay } }
          : {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay,
              },
            }
      }
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
