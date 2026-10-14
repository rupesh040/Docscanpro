import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Large serif heading for section titles */
export function SectionHeading({ children, className = "", id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text)] ${className}`}
    >
      {children}
    </h2>
  );
}
