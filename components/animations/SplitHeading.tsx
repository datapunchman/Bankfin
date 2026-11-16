"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

type Props = {
  as?: Tag;
  /** Each entry renders as its own masked line. */
  lines: ReactNode[];
  className?: string;
  id?: string;
  /** "view" animates when scrolled into view, "mount" on first paint. */
  trigger?: "view" | "mount";
  delay?: number;
};

/**
 * Editorial line-by-line heading reveal (Anime.js).
 * Lines are authored explicitly so the semantic text is always complete
 * for screen readers and crawlers; only the visual masks are animated.
 */
export default function SplitHeading({
  as = "h2",
  lines,
  className,
  id,
  trigger = "view",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;
    const inners = el.querySelectorAll<HTMLElement>(".line-inner");

    const run = () =>
      animate(inners, {
        translateY: { from: "110%", to: "0%" },
        duration: 1100,
        delay: stagger(90, { start: delay }),
        ease: "out(4)",
      });

    if (trigger === "mount") {
      const a = run();
      return () => {
        a.revert();
      };
    }

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played) {
          played = true;
          run();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, delay]);

  return createElement(
    as,
    { ref, className, id, "data-split": "" },
    lines.map((line, i) => (
      <span className="line" key={i}>
        <span className="line-inner">{line}</span>
        {i < lines.length - 1 ? " " : null}
      </span>
    ))
  );
}
