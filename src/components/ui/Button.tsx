"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "sm";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Renders a visibly inert control and sets aria-disabled. */
  disabled?: boolean;
  /** Explains why the control is inert, e.g. a download URL is not configured. */
  disabledReason?: string;
}

type ButtonProps = BaseProps &
  (
    | ({ as?: "button" } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>)
    | ({ as: "a" } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>)
  );

/* Labels are sentence case and name the action. No tracked uppercase, and no
   arrow glyph appended to the text — the label says what happens. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] border border-transparent " +
  "font-medium transition-colors select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal)] " +
  "active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-[18px] py-[11px] text-[14.5px]",
  sm: "min-h-[32px] px-[11px] py-[6px] text-[12.5px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-[var(--signal)] text-[#17110D] hover:bg-[var(--signal-hi)]",
  secondary:
    "border-[var(--rule)] text-[var(--chalk)] hover:border-[var(--chalk-3)] hover:bg-[var(--graphite-2)]",
  quiet: "text-[var(--chalk-2)] hover:text-[var(--chalk)] hover:bg-[var(--graphite-2)]",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  disabledReason,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    disabled && "pointer-events-none opacity-40",
    className,
  );

  const title = disabled && disabledReason ? disabledReason : undefined;

  if ((rest as { as?: string }).as === "a") {
    const anchorProps = { ...(rest as AnchorHTMLAttributes<HTMLAnchorElement> & { as?: string }) };
    delete anchorProps.as;

    /* pointer-events: none does not stop Enter, so an inert link also loses
       its href and its place in the tab order. Otherwise a keyboard user can
       reach and activate a button that looks plainly dead. */
    if (disabled) {
      delete anchorProps.href;
      anchorProps.tabIndex = -1;
    }

    return (
      <a {...anchorProps} className={classes} aria-disabled={disabled} title={title}>
        {children}
      </a>
    );
  }

  const buttonProps = { ...(rest as ButtonHTMLAttributes<HTMLButtonElement> & { as?: string }) };
  delete buttonProps.as;
  return (
    <button
      {...buttonProps}
      className={classes}
      aria-disabled={disabled}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

/** The Windows mark, drawn inline so no icon font or brand pack is needed. */
export function WindowsMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M0 1.5L5.75.75v5.5H0V1.5Z" />
      <path d="M6.5.65 14 0v6.25H6.5V.65Z" />
      <path d="M0 7.75h5.75v5.5L0 12.5V7.75Z" />
      <path d="M6.5 7.75H14V14l-7.5-.65V7.75Z" />
    </svg>
  );
}
