import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Render as h1 for the page's single top-level heading. */
  as?: "h1" | "h2";
}

/**
 * Section headings use Archivo's width axis rather than a contrasting serif.
 * Set wide and tight, they read like a blown-up form header — which is the
 * vernacular this product lives in.
 *
 * Headings carry no accented word, no eyebrow and no trailing glyph. Emphasis
 * comes from size and from where the line breaks.
 */
export function SectionHeading({
  children,
  className = "",
  id,
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={cn(
        "text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] tracking-[-0.02em]",
        className,
      )}
      style={{ fontStretch: "112%" }}
    >
      {children}
    </Tag>
  );
}

interface KickerProps {
  children: ReactNode;
  className?: string;
  /** Paper bands need a darker accent to stay legible. */
  tone?: "machine" | "paper";
}

/**
 * A short sentence-case line above a heading, used only where it adds
 * information the heading does not already carry. Not tracked, not uppercase,
 * and deliberately rare.
 */
export function Kicker({ children, className = "", tone = "machine" }: KickerProps) {
  return (
    <p
      className={cn(
        "text-[13px] font-medium",
        tone === "paper" ? "text-[var(--ink-accent)]" : "text-[var(--signal)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SpecRow {
  label: string;
  value: string;
}

/**
 * Replaces the meta string of middle-dot-joined phrases. The same facts, but
 * in a form you can actually scan and compare.
 */
export function SpecTable({
  rows,
  caption,
  className = "",
}: {
  rows: SpecRow[];
  caption: string;
  className?: string;
}) {
  return (
    <table className={cn("w-full max-w-[420px] border-collapse", className)}>
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th
              scope="row"
              className="w-[96px] border-t border-[var(--rule)] py-[7px] text-left align-baseline text-[12.5px] font-normal text-[var(--chalk-3)]"
            >
              {row.label}
            </th>
            <td className="border-t border-[var(--rule)] py-[7px] align-baseline font-mono text-[12px] text-[var(--chalk-2)]">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
