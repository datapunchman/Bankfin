"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, utils } from "animejs";
import { services, values } from "@/lib/content";
import SplitHeading from "@/components/animations/SplitHeading";

// Illustrative conversation — demonstrates the guidance style, not a real chat or testimonial.
const chat = [
  { me: true, t: "I'm planning to buy a home." },
  { me: false, t: "Let's understand your requirement first." },
  { me: true, t: "What will I need?" },
  { me: false, t: "We'll guide you on documentation." },
];
const checklist = ["Eligibility considerations", "Documentation", "Next steps"];
const journey = ["Enquiry", "Review", "Options", "Prepare", "Apply"];

/** Why BankFin as a bento of four tiny, looping product interfaces (Anime.js). */
export default function Bento() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const loops: { play: () => unknown; pause: () => unknown; revert: () => unknown }[] = [];

    // 1. chat bubbles
    const bubbles = q("[data-bubble]");
    utils.set(bubbles, { opacity: 0, translateY: 14, scale: 0.92 });
    const chatTl = createTimeline({ loop: true, autoplay: false, loopDelay: 1200 });
    bubbles.forEach((b) =>
      chatTl.add(b, { opacity: [0, 1], translateY: [14, 0], scale: [0.92, 1], duration: 500, ease: "outBack(1.4)" }, "+=550")
    );
    chatTl.add(bubbles, { opacity: 0, duration: 400, delay: stagger(40) }, "+=1600");
    loops.push(chatTl);

    // 2. hopping highlight across the eight solutions
    const tiles = q("[data-mini-tile]");
    let hop = 0;
    const hopTimer = { id: 0 };
    const hopOnce = () => {
      tiles.forEach((t, i) => t.classList.toggle("is-on", i === hop));
      animate(tiles[hop], { scale: [{ to: 1.12, duration: 160 }, { to: 1, duration: 420 }], ease: "out(3)" });
      hop = (hop + 3) % tiles.length;
    };
    loops.push({
      play: () => {
        hopOnce();
        hopTimer.id = window.setInterval(hopOnce, 900);
      },
      pause: () => window.clearInterval(hopTimer.id),
      revert: () => window.clearInterval(hopTimer.id),
    });

    // 3. checklist ticking
    const ticks = q("[data-tick]");
    const rows = q("[data-check-row]");
    utils.set(ticks, { scale: 0 });
    utils.set(rows, { opacity: 0.45 });
    const checkTl = createTimeline({ loop: true, autoplay: false, loopDelay: 1400 });
    ticks.forEach((t, i) => {
      checkTl
        .add(t, { scale: [0, 1], rotate: [-90, 0], duration: 500, ease: "outBack(2)" }, i ? "+=350" : 0)
        .add(rows[i], { opacity: [0.45, 1], duration: 300 }, "<<");
    });
    checkTl.add(ticks, { scale: 0, duration: 300, delay: stagger(60) }, "+=1600").add(rows, { opacity: 0.45, duration: 300 }, "<<");
    loops.push(checkTl);

    // 4. journey dot travelling along the track
    const dot = el.querySelector<HTMLElement>("[data-journey-dot]");
    const fill = el.querySelector<HTMLElement>("[data-journey-fill]");
    const stops = q("[data-stop]");
    const jTl = createTimeline({ loop: true, autoplay: false, loopDelay: 800 });
    if (dot && fill) {
      jTl
        .add(dot, { left: ["0%", "100%"], duration: 3600, ease: "inOut(2)" })
        .add(fill, { width: ["0%", "100%"], duration: 3600, ease: "inOut(2)" }, "<<")
        .add(stops, { backgroundColor: ["#e4dfd8", "#ed1c24"], scale: [{ to: 1.35, duration: 180 }, { to: 1, duration: 300 }], delay: stagger(820) }, "<<");
      loops.push(jTl);
    }

    // run only while visible
    const io = new IntersectionObserver(([e]) => loops.forEach((l) => (e.isIntersecting ? l.play() : l.pause())), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => {
      io.disconnect();
      loops.forEach((l) => l.revert());
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="why-title" className="container-x py-24 md:py-36">
      <div className="text-center">
        <p className="kicker kicker-red">Why BankFin</p>
        <SplitHeading id="why-title" className="title mx-auto mt-5 lowercase text-ink" lines={["more than a loan.", "a clearer way forward."]} />
      </div>

      <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-6">
        {/* 1. guidance */}
        <article className="card flex flex-col overflow-hidden p-7 md:col-span-4 md:p-9" data-reveal>
          <div className="flex min-h-[230px] flex-col justify-end gap-2.5 rounded-[22px] bg-bg p-5" aria-hidden>
            {chat.map((m, i) => (
              <span
                key={i}
                data-bubble
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[0.88rem] ${
                  m.me ? "self-end rounded-br-md bg-ink text-white" : "self-start rounded-bl-md bg-white text-ink shadow-[var(--shadow-card)]"
                }`}
              >
                {m.t}
              </span>
            ))}
          </div>
          <Tile title={values[0].title} line={values[0].tagline} />
        </article>

        {/* 2. multiple solutions */}
        <article className="card flex flex-col overflow-hidden p-7 md:col-span-2 md:p-9" data-reveal>
          <div className="grid min-h-[230px] grid-cols-4 content-center gap-2 rounded-[22px] bg-bg p-5" aria-hidden>
            {services.map((s) => (
              <span
                key={s.slug}
                data-mini-tile
                className="flex aspect-square items-center justify-center rounded-xl bg-white font-serif text-[0.95rem] font-semibold text-ink transition-colors duration-300 [&.is-on]:bg-red-strong [&.is-on]:text-white"
              >
                {s.index}
              </span>
            ))}
          </div>
          <Tile title={values[1].title} line={values[1].tagline} />
        </article>

        {/* 3. clear communication */}
        <article className="card flex flex-col overflow-hidden p-7 md:col-span-2 md:p-9" data-reveal>
          <ul className="flex min-h-[230px] flex-col justify-center gap-3 rounded-[22px] bg-bg p-5" aria-hidden>
            {checklist.map((c) => (
              <li key={c} data-check-row className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[0.88rem] text-ink">
                <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-line">
                  <span data-tick className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-red-strong text-[0.7rem] text-white">
                    ✓
                  </span>
                </span>
                {c}
              </li>
            ))}
          </ul>
          <Tile title={values[2].title} line={values[2].tagline} />
        </article>

        {/* 4. end-to-end */}
        <article className="card flex flex-col overflow-hidden p-7 md:col-span-4 md:p-9" data-reveal>
          <div className="flex min-h-[230px] flex-col justify-center rounded-[22px] bg-bg px-6 py-8 md:px-10" aria-hidden>
            <div className="relative h-1.5 rounded-full bg-line">
              <span data-journey-fill className="absolute inset-y-0 left-0 w-0 rounded-full bg-red" />
              <span data-journey-dot className="absolute top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-red-strong shadow-[var(--shadow-red)]" style={{ left: "0%" }} />
              {journey.map((j, i) => (
                <span
                  key={j}
                  data-stop
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line"
                  style={{ left: `${(i / (journey.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-between text-[0.75rem] font-medium text-muted">
              {journey.map((j) => (
                <span key={j}>{j}</span>
              ))}
            </div>
          </div>
          <Tile title={values[3].title} line={values[3].tagline} />
        </article>
      </div>
    </section>
  );
}

function Tile({ title, line }: { title: string; line: string }) {
  return (
    <div className="mt-6">
      <h3 className="font-serif text-[1.6rem] font-semibold lowercase leading-[1] tracking-[-0.035em] text-ink">{title}</h3>
      <p className="mt-2 text-[0.95rem] text-muted">{line}</p>
    </div>
  );
}
