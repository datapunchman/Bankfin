"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/lib/content";
import { serviceBySlug } from "@/lib/content";

type Props = {
  items: FaqItem[];
  defaultOpen?: number | null;
  headingLevel?: "h3" | "h2";
  showServiceLinks?: boolean;
};

/** Numbered, keyboard-accessible accordion (WAI-ARIA disclosure pattern). */
export default function Accordion({
  items,
  defaultOpen = 0,
  headingLevel = "h3",
  showServiceLinks = false,
}: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  const reduce = useReducedMotion();
  const H = headingLevel;

  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b-${i}`;
        const panelId = `${uid}-p-${i}`;
        return (
          <li key={item.q} className="card relative overflow-hidden !rounded-[24px]" data-reveal>
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-5 py-5 text-left md:grid-cols-[3rem_1fr_auto] md:px-7 md:py-6"
              >
                <span
                  className={`font-serif text-[1rem] font-semibold transition-colors ${
                    isOpen ? "text-red-strong" : "text-faint"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[1.02rem] font-medium leading-snug transition-colors md:text-[1.15rem] ${
                    isOpen ? "text-ink" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {item.q}
                </span>
                <span aria-hidden className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-red-strong" : "bg-bg"}`}>
                  <span className={`absolute h-[1.5px] w-3.5 ${isOpen ? "bg-white" : "bg-ink"}`} />
                  <span
                    className={`absolute h-3.5 w-[1.5px] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      isOpen ? "scale-y-0 bg-white" : "scale-y-100 bg-ink"
                    }`}
                  />
                </span>
              </button>
            </H>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-[2.25rem_1fr] gap-3 px-5 pb-6 pr-14 md:grid-cols-[3rem_1fr] md:px-7">
                    <span />
                    <div>
                      <p className="body max-w-2xl">{item.a}</p>
                      {showServiceLinks && item.services && (
                        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.85rem]">
                          <span className="text-faint">Related:</span>
                          {item.services.map((slug) => (
                            <Link
                              key={slug}
                              href={`/services/${slug}`}
                              className="link text-ink"
                            >
                              {serviceBySlug(slug)?.navName}
                            </Link>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
