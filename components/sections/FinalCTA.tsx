"use client";

import { useEffect, useRef } from "react";
import { animate, createAnimatable, stagger } from "animejs";
import { services } from "@/lib/content";
import Button from "@/components/ui/Button";

type Props = {
  lines?: string[];
  accent?: string;
  copy?: string;
  cta?: string;
  href?: string;
};

/**
 * Closing CTA: a slowly turning ring of the eight solution cards around the
 * headline (Anime.js), tilting toward the pointer.
 */
export default function FinalCTA({
  lines = ["have a financial", "goal in mind?"],
  accent = "let's talk.",
  copy = "Tell us what you need and let BankFin help you explore the right financing path.",
  cta = "Start an Enquiry",
  href = "/contact",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spin = animate(ring.current!, { rotate: "1turn", duration: 70000, ease: "linear", loop: true });
    const inners = el.querySelectorAll(".line-inner");
    let played = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) {
          played = true;
          animate(inners, { translateY: ["110%", "0%"], duration: 1200, delay: stagger(110), ease: "out(4)" });
          animate(el.querySelectorAll("[data-ring-card]"), {
            scale: [0.4, 1],
            opacity: [0, 1],
            duration: 1100,
            delay: stagger(70),
            ease: "outBack(1.4)",
          });
        }
        if (e.isIntersecting) spin.play();
        else spin.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    const t = createAnimatable(tilt.current!, { rotateX: 800, rotateY: 800, ease: "out(3)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      t.rotateY(((e.clientX - r.left) / r.width - 0.5) * 14);
      t.rotateX(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    if (window.matchMedia("(pointer: fine)").matches) el.addEventListener("pointermove", move);
    return () => {
      io.disconnect();
      spin.revert();
      t.revert();
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="cta-title" className="px-3 pb-6 md:px-5">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px] bg-white py-24 [perspective:1200px] md:py-32">
        <div ref={tilt} className="pointer-events-none absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]" aria-hidden>
          <div ref={ring} className="relative h-0 w-0 [--r:300px] md:[--r:470px]">
            {services.map((s, i) => (
              <div
                key={s.slug}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${(i / services.length) * 360}deg) translateY(calc(-1 * var(--r)))` }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <div data-ring-card className="rounded-2xl bg-bg px-4 py-3 shadow-[var(--shadow-card)] md:px-5 md:py-4">
                    <span className="block font-serif text-[1rem] font-semibold text-red-strong">{s.index}</span>
                    <span className="block whitespace-nowrap text-[0.8rem] font-medium text-ink md:text-[0.9rem]">{s.navName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="kicker kicker-red">Start the conversation</p>
          <h2 id="cta-title" data-split className="display mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] lowercase text-ink">
            {lines.map((l) => (
              <span className="line" key={l}>
                <span className="line-inner">{l}</span>{" "}
              </span>
            ))}
            <span className="line">
              <span className="line-inner text-red-strong">{accent}</span>
            </span>
          </h2>
          <p className="sub mx-auto mt-6 max-w-md">{copy}</p>
          <div className="mt-9">
            <Button href={href} size="lg">
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
