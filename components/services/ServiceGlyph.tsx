"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";
import type { IconKey } from "@/lib/content";

const G = "#cfc8bd"; // neutral line
const R = "#ed1c24"; // brand red

type Shape = { d: string; red?: boolean; w?: number; dash?: string };

/** Original abstract line compositions, one per service (400×400). */
const shapes: Record<IconKey, Shape[]> = {
  personal: [
    { d: "M200 60 a140 140 0 1 1 -0.1 0" },
    { d: "M200 110 a90 90 0 1 1 -0.1 0" },
    { d: "M200 160 a40 40 0 1 1 -0.1 0", red: true, w: 2.5 },
    { d: "M60 200 H340 M200 60 V340", dash: "2 6" },
    { d: "M200 60 A140 140 0 0 1 340 200", red: true, w: 2.5 },
  ],
  home: [
    { d: "M60 340 V190 L200 70 L340 190 V340 Z" },
    { d: "M100 340 V210 L200 124 L300 210 V340" },
    { d: "M140 340 V230 L200 178 L260 230 V340" },
    { d: "M60 190 L200 70 L340 190", red: true, w: 2.5 },
    { d: "M20 340 H380", dash: "2 6" },
  ],
  business: [
    { d: "M70 340 V260 H130 V340" },
    { d: "M150 340 V210 H210 V340" },
    { d: "M230 340 V150 H290 V340" },
    { d: "M310 340 V90 H370 V340" },
    { d: "M40 300 L120 240 L200 200 L280 130 L360 70", red: true, w: 2.5 },
    { d: "M20 340 H380", dash: "2 6" },
  ],
  msme: [
    ...[0, 1, 2].flatMap((r) =>
      [0, 1, 2].map((c) => ({
        d: `M${80 + c * 90} ${80 + r * 90} h60 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-60 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10 z`,
        red: r + c === 2 || (r === 2 && c === 2),
        w: r + c === 2 ? 2 : 1,
      }))
    ),
    { d: "M110 340 V370 M200 340 V370 M290 340 V370", dash: "2 4" },
  ],
  overdraft: [
    { d: "M30 130 H370", dash: "4 6" },
    { d: "M30 290 H370" },
    { d: "M30 210 C 80 150, 120 150, 160 210 S 240 270, 280 210 S 340 150, 370 190", red: true, w: 2.5 },
    { d: "M30 330 H370 M30 90 H370", dash: "2 8" },
    { d: "M200 110 V310", dash: "2 5" },
  ],
  project: [
    { d: "M200 60 L330 135 V285 L200 360 L70 285 V135 Z" },
    { d: "M70 135 L200 210 L330 135 M200 210 V360" },
    { d: "M135 97 L265 172 V322 M265 97 L135 172 V322", dash: "2 6" },
    { d: "M200 60 L330 135 V285", red: true, w: 2.5 },
  ],
  property: [
    { d: "M70 340 V120 H200 V340" },
    { d: "M200 340 V180 H330 V340" },
    { d: "M100 160 H170 M100 200 H170 M100 240 H170 M230 220 H300 M230 260 H300", dash: "3 5" },
    { d: "M300 90 a36 36 0 1 1 -0.1 0", red: true, w: 2.5 },
    { d: "M300 162 V230 M300 200 H322", red: true, w: 2.5 },
    { d: "M30 340 H370" },
  ],
  car: [
    { d: "M40 360 L170 120 M360 360 L230 120" },
    { d: "M200 360 V320 M200 290 V260 M200 230 V205 M200 182 V165 M200 148 V136", red: true, w: 2.5 },
    { d: "M20 120 H380", dash: "2 6" },
    { d: "M300 60 a46 46 0 1 1 -0.1 0" },
    { d: "M300 92 a14 14 0 1 1 -0.1 0", red: true, w: 2 },
  ],
};

export default function ServiceGlyph({ icon, className = "" }: { icon: IconKey; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;
    // Solid strokes draw in; dashed guide lines fade in (drawing would replace their dash pattern).
    const solid = Array.from(el.querySelectorAll<SVGPathElement>("path:not([stroke-dasharray])"));
    const dashed = Array.from(el.querySelectorAll<SVGPathElement>("path[stroke-dasharray]"));
    if (!solid.length) return;
    // Draw-in via normalised dash offset (pathLength = 1).
    solid.forEach((p) => {
      p.setAttribute("pathLength", "1");
      p.setAttribute("stroke-dasharray", "1");
      p.setAttribute("stroke-dashoffset", "1");
    });
    if (dashed.length) utils.set(dashed, { opacity: 0 });
    const a = animate(solid, {
      strokeDashoffset: [1, 0],
      duration: 1600,
      delay: stagger(90, { start: 350 }),
      ease: "inOut(3)",
    });
    const b = dashed.length
      ? animate(dashed, { opacity: [0, 1], duration: 900, delay: stagger(80, { start: 700 }) })
      : null;
    return () => {
      a.pause();
      b?.pause();
      solid.forEach((p) => {
        p.removeAttribute("pathLength");
        p.removeAttribute("stroke-dasharray");
        p.removeAttribute("stroke-dashoffset");
        p.style.strokeDashoffset = "";
      });
      dashed.forEach((p) => (p.style.opacity = ""));
    };
  }, [icon]);

  return (
    <svg ref={ref} viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {shapes[icon].map((s, i) => (
        <path
          key={i}
          d={s.d}
          stroke={s.red ? R : G}
          strokeWidth={s.w ?? 1.25}
          strokeDasharray={s.dash}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
