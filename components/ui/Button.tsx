"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { createAnimatable } from "animejs";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "inverse" | "dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: "right" | "up-right" | false;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
};

const styles: Record<Variant, string> = {
  primary: "bg-red-strong text-white shadow-[var(--shadow-red)] hover:bg-red-deep",
  secondary: "bg-white text-ink shadow-[var(--shadow-card)] hover:bg-ink hover:text-white",
  ghost: "text-ink",
  light: "bg-white text-ink hover:bg-bg",
  inverse: "bg-white text-ink hover:bg-ink hover:text-white",
  dark: "bg-ink text-white hover:bg-red-strong",
};

/**
 * Pill CTA with an Anime.js magnetic pull (createAnimatable) and an arrow
 * bubble that swaps on hover.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = "right",
  magnetic = true,
  className = "",
  ariaLabel,
  fullWidth = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || variant === "ghost") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = createAnimatable(el, { x: 500, y: 500, ease: "out(3)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      anim.x((e.clientX - (r.left + r.width / 2)) * 0.22);
      anim.y((e.clientY - (r.top + r.height / 2)) * 0.32);
    };
    const leave = () => {
      anim.x(0);
      anim.y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      anim.revert();
    };
  }, [magnetic, variant]);

  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  if (variant === "ghost") {
    return (
      <Link href={href} aria-label={ariaLabel} className={`group inline-flex items-center gap-2 font-medium text-ink ${className}`}>
        <span className="link">{children}</span>
        {arrow ? (
          <Icon className="h-4 w-4 text-red-strong transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        ) : null}
      </Link>
    );
  }

  const pad = size === "lg" ? "h-14 pl-7 pr-2 text-[1rem]" : "h-12 pl-6 pr-1.5 text-[0.95rem]";
  const bubble = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const bubbleTone =
    variant === "primary" ? "bg-white text-red-strong" : variant === "dark" ? "bg-white text-ink" : "bg-ink text-white";

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center justify-between gap-4 rounded-full font-medium transition-colors duration-300 ${pad} ${
        styles[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      {arrow ? (
        <span aria-hidden className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${bubble} ${bubbleTone}`}>
          <Icon className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[200%]" />
          <Icon className="absolute h-4 w-4 -translate-x-[200%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
        </span>
      ) : (
        <span className="w-3" />
      )}
    </Link>
  );
}
