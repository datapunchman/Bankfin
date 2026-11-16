"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { audiences, serviceBySlug } from "@/lib/content";
import SplitHeading from "@/components/animations/SplitHeading";

const N = audiences.length;

/**
 * Who we serve as an orbit: seven audiences circle a centre card (Anime.js
 * rotation, counter-rotated labels). Hover/focus/tap picks one; the centre
 * swaps with an Anime.js transition. Small screens get selectable chips.
 */
export default function Orbit() {
  const ringRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const spinCtl = useRef<((paused: boolean) => void) | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spin = animate(ring, { rotate: "1turn", duration: 60000, ease: "linear", loop: true });
    const labels = ring.querySelectorAll<HTMLElement>("[data-upright]");
    const counter = animate(labels, { rotate: "-1turn", duration: 60000, ease: "linear", loop: true });
    const set = (paused: boolean) => {
      if (paused) {
        spin.pause();
        counter.pause();
      } else {
        spin.play();
        counter.play();
      }
    };
    spinCtl.current = set;
    return () => {
      spinCtl.current = null;
      spin.revert();
      counter.revert();
    };
  }, []);

  useEffect(() => {
    spinCtl.current?.(hold);
  }, [hold]);

  // auto-advance when idle
  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), 3200);
    return () => window.clearInterval(id);
  }, [hold]);

  useEffect(() => {
    const c = centerRef.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = animate(c.querySelectorAll("[data-swap]"), {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 600,
      delay: stagger(70),
      ease: "out(4)",
    });
    return () => {
      a.cancel();
    };
  }, [active]);

  const a = audiences[active];

  return (
    <section aria-labelledby="serve-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x text-center">
        <p className="kicker kicker-red">Who we serve</p>
        <SplitHeading id="serve-title" className="title mx-auto mt-5 lowercase text-ink" lines={["different goals.", "every stage."]} />
      </div>

      {/* chips (mobile) */}
      <div className="container-x mt-10 flex flex-wrap justify-center gap-2 md:hidden">
        {audiences.map((x, i) => (
          <button
            key={x.key}
            type="button"
            onClick={() => {
              setActive(i);
              setHold(true);
            }}
            aria-pressed={i === active}
            className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors ${
              i === active ? "bg-ink text-white" : "bg-white text-ink shadow-[var(--shadow-card)]"
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div
        className="relative mx-auto mt-10 flex aspect-square w-full max-w-[680px] items-center justify-center md:mt-16"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
      >
        {/* rings */}
        <div aria-hidden className="absolute inset-[6%] hidden rounded-full border border-line md:block" />
        <div aria-hidden className="absolute inset-[22%] hidden rounded-full border border-dashed border-line md:block" />

        {/* orbiting audiences (desktop) */}
        <div ref={ringRef} className="absolute inset-[6%] hidden md:block">
          {audiences.map((x, i) => {
            const ang = (i / N) * Math.PI * 2 - Math.PI / 2;
            const on = i === active;
            return (
              <div
                key={x.key}
                className="absolute"
                style={{ left: `${50 + 50 * Math.cos(ang)}%`, top: `${50 + 50 * Math.sin(ang)}%`, transform: "translate(-50%,-50%)" }}
              >
                <div data-upright>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => {
                      setActive(i);
                      setHold(true);
                    }}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`whitespace-nowrap rounded-full px-5 py-3 text-[0.92rem] font-medium transition-[background-color,color,transform,box-shadow] duration-300 ${
                      on ? "scale-110 bg-red-strong text-white shadow-[var(--shadow-red)]" : "bg-white text-ink shadow-[var(--shadow-card)] hover:scale-105"
                    }`}
                  >
                    {x.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* centre */}
        <div
          ref={centerRef}
          aria-live="polite"
          className="relative z-10 flex aspect-square w-[78%] max-w-[300px] flex-col items-center justify-center rounded-full bg-white p-8 text-center shadow-[var(--shadow-float)] md:w-[44%]"
        >
          <p data-swap className="font-serif text-[1.9rem] font-semibold lowercase leading-[0.95] tracking-[-0.035em] text-ink">
            {a.name}
          </p>
          <p data-swap className="mt-3 text-[0.85rem] leading-snug text-muted">
            {a.body}
          </p>
          <div data-swap className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {a.services.map((slug) => (
              <Link key={slug} href={`/services/${slug}`} className="text-[0.82rem] font-medium text-red-strong underline-offset-4 hover:underline">
                {serviceBySlug(slug)?.navName} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
