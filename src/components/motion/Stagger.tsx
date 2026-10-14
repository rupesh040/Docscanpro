"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay between items in seconds */
  stagger?: number;
  /** Delay before first item in seconds */
  delayChildren?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
}: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={
        reduced
          ? {
              hidden: { opacity: 1 },
              visible: { opacity: 1 },
            }
          : {
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: stagger,
                  delayChildren,
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }
          : {
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
