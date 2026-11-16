"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one RAF loop. Also owns the generic `[data-reveal]` scroll entrances
 * (GSAP ScrollTrigger.batch) so no other library animates those elements.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  // Lenis lifecycle
  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Route changes: reset scroll and (re)bind reveal triggers for the new page.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true, force: true });

    if (!document.documentElement.classList.contains("motion")) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-revealed])");
    const triggers = ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => el.setAttribute("data-revealed", ""));
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform",
          });
        },
      });

    // Hairline rules draw across as their section arrives.
    const rules = gsap.utils.toArray<HTMLElement>("[data-rule]:not([data-drawn])");
    const ruleTriggers = ScrollTrigger.batch(rules, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((el) => el.setAttribute("data-drawn", ""));
        gsap.to(batch, { scaleX: 1, duration: 1.4, ease: "expo.inOut", stagger: 0.06, overwrite: true });
      },
    });

    // Layout may shift once fonts/images settle.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      triggers.forEach((t) => t.kill());
      ruleTriggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
