"use client";

import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

interface BaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** When true renders a visually disabled state with aria-disabled */
  disabled?: boolean;
  /** Tooltip text shown when the button is disabled */
  disabledTooltip?: string;
}

type ButtonProps = BaseProps &
  (
    | ({ as?: "button" } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>)
    | ({ as: "a" } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>)
  );

const base =
  "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] relative";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[#0B0B0A] px-5 py-3 rounded-sm hover:bg-[var(--accent-hover)] active:scale-[0.98]",
  secondary:
    "border border-[var(--border)] text-[var(--text)] px-5 py-3 rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98]",
  outline:
    "border border-[var(--border)] text-[var(--text)] px-4 py-2 rounded-sm hover:border-[var(--text-2)] active:scale-[0.98]",
};

const disabledClass =
  "opacity-40 cursor-not-allowed pointer-events-none";

export function Button({
  variant = "primary",
  children,
  className,
  disabled,
  disabledTooltip,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], disabled && disabledClass, className);

  if ((rest as { as?: string }).as === "a") {
    const anchorRest = { ...(rest as { as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>) };
    delete (anchorRest as { as?: string }).as;
    return (
      <a
        {...anchorRest}
        className={classes}
        aria-disabled={disabled}
        title={disabled && disabledTooltip ? disabledTooltip : undefined}
      >
        {children}
      </a>
    );
  }

  const buttonRest = { ...(rest as { as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>) };
  delete (buttonRest as { as?: string }).as;
  return (
    <button
      {...buttonRest}
      className={classes}
      aria-disabled={disabled}
      disabled={disabled}
      title={disabled && disabledTooltip ? disabledTooltip : undefined}
    >
      {children}
    </button>
  );
}
