"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { services } from "@/lib/content";

/** Infinite service ticker (Anime.js loop). Slows on hover. */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = animate(el, { translateX: ["0%", "-50%"], duration: 38000, ease: "linear", loop: true });
    const slow = () => (a.speed = 0.25);
    const fast = () => (a.speed = 1);
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", fast);
    return () => {
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", fast);
      a.revert();
    };
  }, []);

  const row = [...services, ...services];
  return (
    <section aria-label="Financing solutions" className="relative overflow-hidden py-8 md:py-12">
      <div ref={track} className="marquee-track">
        {row.map((s, i) => (
          <Link
            key={`${s.slug}-${i}`}
            href={`/services/${s.slug}`}
            tabIndex={i >= services.length ? -1 : 0}
            aria-hidden={i >= services.length}
            className="group flex shrink-0 items-center gap-6 px-6 md:gap-10 md:px-10"
          >
            <span className="font-serif text-[2.4rem] font-semibold lowercase tracking-[-0.04em] text-ink/15 transition-colors duration-500 group-hover:text-ink md:text-[4.2rem]">
              {s.navName}
            </span>
            <span className="h-3 w-3 rounded-full bg-red" aria-hidden />
          </Link>
        ))}
      </div>
    </section>
  );
}
