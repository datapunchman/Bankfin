"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";
import Button from "@/components/ui/Button";

const text =
  "every financial requirement is different. bankfin helps you understand your options and move forward with clarity.";

/**
 * CRED-style statement: each word lights up as it scrolls through the
 * viewport (Anime.js animation synced to an onScroll observer).
 */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const a = animate(words, {
      opacity: [0.14, 1],
      delay: stagger(60),
      duration: 400,
      ease: "linear",
      autoplay: onScroll({
        target: el,
        enter: { container: "85%", target: "start" },
        leave: { container: "35%", target: "end" },
        sync: 0.4,
      }),
    });
    return () => {
      a.revert();
    };
  }, []);

  return (
    <section aria-labelledby="statement-kicker" className="container-x py-24 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p id="statement-kicker" className="kicker kicker-red">
          About BankFin
        </p>
        <p
          ref={ref}
          className="mt-8 font-serif text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink"
        >
          {text.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>
        <div className="mt-10">
          <Button href="/about" variant="ghost">
            Learn About BankFin
          </Button>
        </div>
      </div>
    </section>
  );
}
