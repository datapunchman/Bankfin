"use client";

import { useEffect, useRef } from "react";
import { createTimeline, onScroll, stagger, utils } from "animejs";
import { site, steps } from "@/lib/content";
import SplitHeading from "@/components/animations/SplitHeading";
import Button from "@/components/ui/Button";

const GAP = 22;
/** Card width that lets the fanned row of five fit the viewport. */
const cardWidth = () => Math.min(250, Math.floor((window.innerWidth - 96 - GAP * 4) / 5));

/**
 * How it works as a deck of five cards. On desktop the section is tall and
 * sticky; an Anime.js timeline synced to scroll fans the deck out into a row,
 * then lights each step in turn. Smaller screens get a simple vertical deck.
 */
export default function StepsStack({ showLink = true, titleAs = "h2" }: { showLink?: boolean; titleAs?: "h1" | "h2" }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tl: ReturnType<typeof createTimeline> | null = null;

    const setup = () => {
      tl?.revert();
      tl = null;
      if (!mq.matches) {
        el.querySelectorAll<HTMLElement>("[data-card], [data-card-num], [data-steps-bar]").forEach((n) => n.removeAttribute("style"));
        el.querySelectorAll<HTMLElement>("[data-card]").forEach((c, i) => (c.style.zIndex = String(20 - i)));
        return;
      }
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-card-num]"));
      const bar = el.querySelector<HTMLElement>("[data-steps-bar]");
      const mid = (cards.length - 1) / 2;
      const W = cardWidth();
      cards.forEach((c) => {
        c.style.width = `${W}px`;
        c.style.marginLeft = `${-W / 2}px`;
      });
      const spread = (i: number) => ({ x: (i - mid) * (W + GAP), y: Math.abs(i - mid) * 26, rotate: (i - mid) * 3, scale: 1 });
      if (reduce) {
        // No scroll choreography: lay the deck out in its final row.
        cards.forEach((c, i) => utils.set(c, spread(i)));
        nums.forEach((n) => utils.set(n, { color: "#d7141c" }));
        if (bar) utils.set(bar, { scaleX: 1 });
        return;
      }
      // stacked start
      cards.forEach((c, i) => {
        utils.set(c, { x: (i - mid) * 6, y: i * 6, rotate: (i - mid) * 4, scale: 1 - (cards.length - 1 - i) * 0.02 });
      });
      tl = createTimeline({
        defaults: { ease: "inOut(3)" },
        autoplay: onScroll({
          target: el,
          enter: { container: "start", target: "start" },
          leave: { container: "end", target: "end" },
          sync: 0.25,
        }),
      });
      const order = cards.map((_, i) => Math.abs(i - mid));
      cards.forEach((c, i) => tl!.add(c, { ...spread(i), duration: 1000 }, order[i] * 60));
      tl
        .add(nums, { color: ["#c9c4bd", "#d7141c"], duration: 200, delay: stagger(180) }, "+=100")
        .add(bar ?? [], { scaleX: [0, 1], duration: 900, ease: "linear" }, "<<");
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      tl?.revert();
    };
  }, []);

  return (
    <section ref={section} aria-labelledby="how-title" className="relative motion-safe:lg:h-[260vh]">
      <div className="motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:flex-col motion-safe:lg:justify-center lg:overflow-hidden">
        <div className="container-x pt-20 text-center lg:pt-16">
          <p className="kicker kicker-red">How it works</p>
          <SplitHeading
            as={titleAs}
            id="how-title"
            trigger={titleAs === "h1" ? "mount" : "view"}
            className="title mx-auto mt-5 lowercase text-ink"
            lines={["five steps.", "no guesswork."]}
          />
        </div>

        <div className="container-x mt-12 lg:mt-16">
          <ol className="grid gap-4 sm:grid-cols-2 lg:relative lg:block lg:h-[300px]">
            {steps.map((s, i) => (
              <li
                key={s.n}
                data-card
                style={{ zIndex: 20 - i }}
                className="card flex min-h-[220px] flex-col p-6 lg:absolute lg:left-1/2 lg:top-0 lg:h-[280px] lg:w-[220px] lg:-ml-[110px]"
              >
                <span data-card-num className="font-serif text-[4rem] font-semibold leading-[0.8] tracking-[-0.05em] text-red-strong lg:text-[#c9c4bd]">
                  {i + 1}
                </span>
                <h3 className="mt-auto font-serif text-[1.45rem] font-semibold lowercase leading-[1] tracking-[-0.03em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.88rem] text-muted">{s.short}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-14 hidden h-1 max-w-md overflow-hidden rounded-full bg-line lg:block" aria-hidden>
            <span data-steps-bar className="block h-full origin-left scale-x-0 bg-red" />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-[0.78rem] leading-relaxed text-faint lg:mt-6">
            {site.processDisclaimer}
          </p>
          {showLink && (
            <div className="mt-6 text-center">
              <Button href="/how-it-works" variant="ghost">
                The process in detail
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
