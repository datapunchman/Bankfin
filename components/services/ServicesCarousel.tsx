"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { animate } from "animejs";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { services } from "@/lib/content";
import ServiceGlyph from "@/components/services/ServiceGlyph";

const N = services.length;
const AUTOPLAY_MS = 5200;

type Geometry = {
  cardW: number;
  cardH: number;
  R: number;
  step: number; // degrees between positions
  visible: number; // max |offset| that is shown
  tilt: number; // rotation factor
  height: number; // stage height
};

function geometryFor(rawWidth: number): Geometry {
  const width = Math.max(280, rawWidth || 0);
  if (width >= 960) {
    const cardW = Math.min(310, Math.round(width * 0.25));
    const cardH = 440;
    const R = width * 0.9;
    // place the second neighbour at ~39% of the stage width
    const step = (Math.asin(Math.min(0.95, (0.39 * width) / R)) * 180) / Math.PI / 2;
    return { cardW, cardH, R, step, visible: 2, tilt: 0.42, height: cardH + 150 };
  }
  if (width >= 600) {
    const cardW = 290;
    const cardH = 420;
    const R = width * 1.05;
    const step = (Math.asin(Math.min(0.95, (0.4 * width) / R)) * 180) / Math.PI;
    return { cardW, cardH, R, step, visible: 1, tilt: 0.5, height: cardH + 150 };
  }
  const cardW = Math.min(300, Math.round(width * 0.8));
  const cardH = 410;
  const R = width * 1.7;
  const step = (Math.asin(Math.min(0.95, (0.74 * width) / R)) * 180) / Math.PI;
  return { cardW, cardH, R, step, visible: 1, tilt: 0.45, height: cardH + 140 };
}

/** Angle (deg) of a card at ring offset d; first neighbours get extra breathing room. */
const angleOf = (d: number, g: Geometry) => {
  const ad = Math.abs(d);
  const f = ad === 0 ? 0 : ad === 1 ? 1.12 : ad;
  return Math.sign(d) * f * g.step;
};

/** Signed shortest offset on the ring, in [-N/2, N/2). */
const offsetOf = (i: number, active: number) => ((i - active + N + N / 2) % N) - N / 2;

/**
 * Signature curved services carousel.
 * Cards travel along a circular arc: x = R·sin(θ), y = R·(1−cos θ),
 * with scale, opacity, tilt and z-index driven by distance from the active card.
 * Motion is Framer Motion springs; the hub counter roll is Anime.js.
 */
export default function ServicesCarousel() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(1200);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // Reduced-motion is only known on the client; render motion-only UI after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const g = useMemo(() => geometryFor(width), [width]);
  const playing = !reduce && !userPaused && !hovered && !focused && inView;

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e.contentRect.width > 0 && setWidth(e.contentRect.width));
    ro.observe(el);
    const w0 = el.getBoundingClientRect().width;
    if (w0 > 0) setWidth(w0);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, active]);

  // Anime.js: roll the hub counter whenever the active service changes
  useEffect(() => {
    const el = counterRef.current;
    if (!el || reduce) return;
    const a = animate(el, {
      translateY: { from: "70%", to: "0%" },
      opacity: { from: 0, to: 1 },
      duration: 650,
      ease: "out(4)",
    });
    return () => {
      a.cancel();
    };
  }, [active, reduce]);

  const go = useCallback((dir: number) => {
    setInteracted(true);
    setActive((a) => (a + dir + N) % N);
  }, []);
  const goTo = useCallback((i: number) => {
    setInteracted(true);
    setActive(i);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(N - 1);
    }
  };

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
    go(info.offset.x < 0 ? 1 : -1);
  };

  const current = services[active];
  const pad = (n: number) => String(n).padStart(2, "0");

  // Geometry of the ring the card centres sit on (for the decorative track)
  const cardCenterY = g.cardH / 2;
  const ringCY = cardCenterY + g.R;
  const trackAngle = Math.min(80, g.step * (g.visible + 1.4));
  const ta = (trackAngle * Math.PI) / 180;
  const trackPath = `M ${width / 2 - g.R * Math.sin(ta)} ${ringCY - g.R * Math.cos(ta)} A ${g.R} ${g.R} 0 0 1 ${
    width / 2 + g.R * Math.sin(ta)
  } ${ringCY - g.R * Math.cos(ta)}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="BankFin financing solutions"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      className="relative"
    >
      <motion.div
        ref={stageRef}
        onPanEnd={onPanEnd}
        className="relative mx-auto w-full touch-pan-y select-none"
        style={{ height: g.height }}
      >
        {/* Decorative ring track */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${width} ${g.height}`}
          preserveAspectRatio="none"
        >
          <path d={trackPath} fill="none" stroke="#111014" strokeOpacity="0.12" strokeDasharray="3 8" />
          {Array.from({ length: g.visible * 2 + 1 }, (_, k) => {
            const d = k - g.visible;
            const a = (angleOf(d, g) * Math.PI) / 180;
            const x = width / 2 + g.R * Math.sin(a);
            const y = ringCY - g.R * Math.cos(a);
            return (
              <circle key={k} cx={x} cy={y} r={d === 0 ? 4 : 2.5} fill={d === 0 ? "#ed1c24" : "#a39b90"} />
            );
          })}
        </svg>

        {services.map((s, i) => {
          const d = offsetOf(i, active);
          const ad = Math.abs(d);
          const shown = ad <= g.visible;
          const a = (angleOf(d, g) * Math.PI) / 180;
          const x = g.R * Math.sin(a);
          const y = g.R * (1 - Math.cos(a));
          const isActive = d === 0;
          return (
            <motion.div
              key={s.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${N}: ${s.name}`}
              aria-hidden={!shown}
              initial={false}
              animate={{
                x,
                y,
                rotate: angleOf(d, g) * g.tilt,
                scale: isActive ? 1 : Math.max(0.7, 1 - ad * 0.14),
                opacity: shown ? 1 : 0,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 90, damping: 19, mass: 0.9 }
              }
              style={{
                width: g.cardW,
                height: g.cardH,
                marginLeft: -g.cardW / 2,
                zIndex: 20 - ad,
                pointerEvents: shown ? "auto" : "none",
              }}
              className="absolute left-1/2 top-0 origin-center will-change-transform"
            >
              <article
                onClick={() => !isActive && goTo(i)}
                className={`group/card relative flex h-full flex-col overflow-hidden rounded-[30px] bg-white p-5 transition-shadow duration-500 md:p-6 ${
                  isActive ? "cursor-default shadow-[var(--shadow-float)]" : "cursor-pointer shadow-[var(--shadow-card)]"
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 bg-bg transition-opacity duration-700"
                  style={{ opacity: isActive ? 0 : ad === 1 ? 0.45 : 0.65 }}
                />
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-[22px] transition-colors duration-500 ${
                    isActive ? "bg-red-soft" : "bg-bg"
                  }`}
                >
                  <ServiceGlyph icon={s.icon} className="absolute inset-[10%] h-[80%] w-[80%]" />
                  <span
                    className={`absolute left-3 top-3 inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-serif text-[0.9rem] font-semibold transition-colors ${
                      isActive ? "bg-red-strong text-white" : "bg-white text-ink"
                    }`}
                  >
                    {s.index}
                  </span>
                </div>
                <div className="mt-auto pt-5">
                  <h3 className="font-serif text-[1.55rem] font-semibold lowercase leading-[1] tracking-[-0.035em] text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-snug text-muted">{s.tagline}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        goTo(i);
                      }
                    }}
                    className={`mt-5 inline-flex h-11 items-center gap-3 rounded-full pl-5 pr-1.5 text-[0.88rem] font-medium transition-colors ${
                      isActive ? "bg-ink text-white hover:bg-red-strong" : "bg-bg text-faint"
                    }`}
                  >
                    Explore
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </article>
            </motion.div>
          );
        })}

        {/* Hub: active index and category */}
        <div
          className="pointer-events-none absolute left-1/2 z-30 w-60 -translate-x-1/2 text-center"
          style={{ top: g.cardH + 28 }}
          aria-hidden
        >
          <div className="flex items-baseline justify-center gap-2 overflow-hidden">
            <span ref={counterRef} className="inline-block font-serif text-[3.2rem] font-semibold leading-none tracking-[-0.04em] text-ink">
              {current.index}
            </span>
            <span className="text-[0.8rem] text-muted">of {pad(N)}</span>
          </div>
          <p className="kicker kicker-red mt-2">{current.navName}</p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous service"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-4 text-[0.88rem] font-medium text-ink shadow-[var(--shadow-card)] transition-colors hover:bg-ink hover:text-white"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center" role="group" aria-label="Choose a service">
          {services.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${s.name}`}
              aria-current={i === active ? "true" : undefined}
              className="group inline-flex h-10 items-center justify-center px-1 sm:px-1.5"
            >
              <span
                className={`block transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  i === active ? "h-2 w-6 rounded-full bg-red" : "h-2 w-2 rounded-full bg-faint/50 group-hover:bg-ink"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next service"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-4 text-[0.88rem] font-medium text-ink shadow-[var(--shadow-card)] transition-colors hover:bg-ink hover:text-white"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        {mounted && !reduce && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
            className="inline-flex h-10 items-center gap-2 text-[0.8rem] text-muted transition-colors hover:text-ink"
          >
            {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{userPaused ? "Play" : "Pause"}</span>
          </button>
        )}
      </div>

      <p className="sr-only" aria-live={playing || !interacted ? "off" : "polite"} aria-atomic="true">
        {current.name}, {active + 1} of {N}
      </p>
    </div>
  );
}
