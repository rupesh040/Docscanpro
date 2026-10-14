import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small mono uppercase label used as section eyebrow */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] ${className}`}
    >
      {children}
    </p>
  );
}
