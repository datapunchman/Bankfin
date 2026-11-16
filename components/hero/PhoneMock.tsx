"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { services } from "@/lib/content";

const stages = ["Requirement", "Options", "Application"];

/**
 * Illustrative BankFin enquiry screen inside a phone frame.
 * Anime.js slides a red selector between the eight solutions on a loop and
 * fills the journey bar — a living demo, not a real app or real figures.
 */
export default function PhoneMock({ className = "" }: { className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const selRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(1);
  const [stage, setStage] = useState(0);

  // auto-cycle selection
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % services.length);
      setStage((s) => (s + 1) % stages.length);
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  // move selector to the active tile
  useEffect(() => {
    const grid = gridRef.current;
    const sel = selRef.current;
    if (!grid || !sel) return;
    const tile = grid.querySelector<HTMLElement>(`[data-tile="${active}"]`);
    if (!tile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = animate(sel, {
      translateX: tile.offsetLeft,
      translateY: tile.offsetTop,
      width: tile.offsetWidth,
      height: tile.offsetHeight,
      duration: reduce ? 0 : 650,
      ease: "out(4)",
    });
    const pulse = reduce
      ? null
      : animate(tile, { scale: [{ to: 0.94, duration: 120 }, { to: 1, duration: 420 }], ease: "out(3)" });
    return () => {
      a.pause();
      pulse?.pause();
    };
  }, [active]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const a = animate(bar, { width: `${((stage + 1) / stages.length) * 100}%`, duration: 900, ease: "inOut(3)" });
    return () => {
      a.pause();
    };
  }, [stage]);

  const current = services[active];

  return (
    <div
      className={`relative aspect-[9/19] w-[270px] rounded-[46px] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgb(17_16_20/0.55)] md:w-[300px] ${className}`}
      aria-hidden
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[37px] bg-bg">
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
        {/* status */}
        <div className="flex items-center justify-between px-6 pt-3.5 text-[0.62rem] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] border border-ink" />
          </span>
        </div>

        <div className="px-4 pt-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-strong font-serif text-[0.8rem] font-bold text-white">
                B
              </span>
              <span className="text-[0.72rem] font-semibold">BankFin</span>
            </span>
            <span className="rounded-full bg-white px-2 py-1 text-[0.58rem] font-medium text-muted">Enquiry</span>
          </div>
          <p className="mt-4 font-serif text-[1.35rem] font-semibold lowercase leading-[1] tracking-[-0.03em]">
            what are you
            <br />
            planning?
          </p>
        </div>

        <div ref={gridRef} className="relative mt-4 grid grid-cols-2 gap-1.5 px-4">
          <span
            ref={selRef}
            className="pointer-events-none absolute left-0 top-0 rounded-2xl bg-red-strong shadow-[var(--shadow-red)]"
            style={{ width: 0, height: 0 }}
          />
          {services.map((s, i) => (
            <div
              key={s.slug}
              data-tile={i}
              className={`relative z-[1] rounded-2xl px-2.5 py-2 transition-colors duration-300 ${
                i === active ? "text-white" : "bg-white text-ink"
              }`}
            >
              <span className={`block font-serif text-[0.68rem] font-semibold ${i === active ? "text-white/80" : "text-red-strong"}`}>
                {s.index}
              </span>
              <span className="mt-0.5 block text-[0.66rem] font-medium leading-tight">{s.navName}</span>
            </div>
          ))}
        </div>

        <div className="mx-4 mt-3 rounded-2xl bg-white p-3">
          <div className="flex items-center justify-between text-[0.6rem] font-medium text-muted">
            <span>Your path</span>
            <span className="text-ink">{stages[stage]}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg">
            <span ref={barRef} className="block h-full w-1/3 rounded-full bg-red" />
          </div>
        </div>

        <div className="mt-auto px-4 pb-5">
          <div className="flex h-11 items-center justify-between rounded-full bg-ink pl-4 pr-1.5 text-[0.7rem] font-medium text-white">
            <span className="truncate">Continue with {current.navName}</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
