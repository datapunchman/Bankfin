"use client";

import { useEffect, useRef } from "react";
import { animate, createAnimatable, createTimeline, stagger, utils } from "animejs";
import { services } from "@/lib/content";
import Button from "@/components/ui/Button";
import PhoneMock from "./PhoneMock";

// Positions for the floating solution cards around the phone (% of stage).
const floaters = [
  { i: 0, x: "6%", y: "18%", r: -8, d: 1.2, hideSm: true },
  { i: 1, x: "14%", y: "58%", r: 6, d: 0.7, hideSm: true },
  { i: 2, x: "2%", y: "84%", r: -4, d: 1.5, hideSm: true },
  { i: 3, x: "74%", y: "10%", r: 7, d: 1, hideSm: true },
  { i: 4, x: "82%", y: "46%", r: -6, d: 1.4, hideSm: true },
  { i: 5, x: "70%", y: "80%", r: 5, d: 0.8, hideSm: true },
  { i: 6, x: "15%", y: "40%", r: 3, d: 0.5, hideSm: true },
  { i: 7, x: "66%", y: "30%", r: -3, d: 0.6, hideSm: true },
];

/**
 * Hero: CRED-style serif headline over a ProftFlow-style product stage.
 * Anime.js runs the intro timeline, a gentle float loop on the cards, and
 * pointer parallax through createAnimatable.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));

    utils.set(q("[data-float]"), { opacity: 0, scale: 0.6 });
    const tl = createTimeline({ defaults: { ease: "out(4)" }, delay: 200 });
    tl.add(q("[data-hero='kicker']"), { opacity: [0, 1], translateY: [12, 0], duration: 600 })
      .add(q("h1 .line-inner"), { translateY: ["110%", "0%"], duration: 1200, delay: stagger(120) }, "-=350")
      .add(q("[data-hero='sub']"), { opacity: [0, 1], translateY: [16, 0], duration: 800, delay: stagger(100) }, "-=800")
      .add(q("[data-hero='phone']"), { opacity: [0, 1], translateY: [140, 0], rotate: [-6, 0], duration: 1400, ease: "out(5)" }, "-=700")
      .add(q("[data-float]"), { opacity: [0, 1], scale: [0.6, 1], duration: 900, delay: stagger(70, { from: "center" }), ease: "outBack(1.6)" }, "-=1000");

    // idle float
    const floats = q("[data-float-inner]").map((f, i) =>
      animate(f, {
        translateY: [{ to: -10 }, { to: 8 }],
        rotate: [{ to: i % 2 ? 2 : -2 }, { to: 0 }],
        duration: 3200 + i * 260,
        loop: true,
        alternate: true,
        ease: "inOut(2)",
        delay: 1800,
      })
    );

    // pointer parallax
    const fine = window.matchMedia("(pointer: fine)").matches;
    const layers = q("[data-depth]").map((l) => ({
      d: Number(l.dataset.depth),
      a: createAnimatable(l, { x: 900, y: 900, ease: "out(3)" }),
    }));
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(({ d, a }) => {
        a.x(nx * d * 40);
        a.y(ny * d * 30);
      });
    };
    if (fine) el.addEventListener("pointermove", onMove);

    return () => {
      tl.revert();
      floats.forEach((f) => f.revert());
      layers.forEach(({ a }) => a.revert());
      if (fine) el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container-x relative z-10 text-center">
        <p data-hero="kicker" className="kicker kicker-red">
          Financing made simpler
        </p>
        <h1 id="hero-title" data-split className="display mx-auto mt-6 lowercase text-ink">
          <span className="line">
            <span className="line-inner">financial solutions.</span>
          </span>{" "}
          <span className="line">
            <span className="line-inner">
              clearer <em className="font-medium text-red-strong">decisions.</em>
            </span>
          </span>
        </h1>
        <p data-hero="sub" className="sub mx-auto mt-7 max-w-md">
          Explore financing options for your personal, home, and business goals with BankFin.
        </p>
        <div data-hero="sub" className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/services" size="lg">
            Explore Loan Solutions
          </Button>
          <Button href="/contact" size="lg" variant="secondary" arrow="up-right">
            Talk to an Advisor
          </Button>
        </div>
      </div>

      {/* Product stage */}
      <div className="relative mx-auto mt-16 h-[560px] max-w-[1100px] md:mt-20 md:h-[640px]">
        {/* halo */}
        <div
          aria-hidden
          className="absolute left-1/2 top-16 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#ffffff_35%,rgb(237_28_36/0.10)_55%,transparent_70%)] md:h-[1100px] md:w-[1100px]"
        />
        <div aria-hidden className="absolute left-1/2 top-24 h-[760px] w-[760px] -translate-x-1/2 rounded-full border border-line" />
        <div aria-hidden className="absolute left-1/2 top-48 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-dashed border-line" />

        {floaters.map((f) => {
          const s = services[f.i];
          return (
            <div
              key={s.slug}
              data-depth={f.d}
              className={`absolute z-20 ${f.hideSm ? "hidden md:block" : ""}`}
              style={{ left: f.x, top: f.y }}
            >
              <div data-float>
                <div data-float-inner style={{ rotate: `${f.r}deg` }}>
                  <a
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[var(--shadow-float)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-bg font-serif text-[0.9rem] font-semibold text-red-strong transition-colors group-hover:bg-red-strong group-hover:text-white">
                      {s.index}
                    </span>
                    <span className="text-[0.85rem] font-medium text-ink">{s.navName}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <div data-hero="phone">
            <div data-depth="0.35">
              <PhoneMock />
            </div>
          </div>
        </div>

        {/* fade into page */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>
    </section>
  );
}
