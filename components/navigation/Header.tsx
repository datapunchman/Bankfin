"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate } from "animejs";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { nav, services, site } from "@/lib/content";
import { getLenis } from "@/components/animations/SmoothScroll";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const svcRef = useRef<HTMLLIElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Navigation enters first in the page intro (Anime.js).
  useEffect(() => {
    const el = headerRef.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;
    const a = animate(el, {
      opacity: { from: 0, to: 1 },
      translateY: { from: -12, to: 0 },
      duration: 800,
      ease: "out(4)",
    });
    return () => {
      a.revert();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSvcOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!svcOpen) return;
    const onDown = (e: PointerEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [svcOpen]);

  const openSvc = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const closeSvcSoon = () => {
    closeTimer.current = window.setTimeout(() => setSvcOpen(false), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <header
        ref={headerRef}
        data-nav
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-6 rounded-full pl-5 pr-2 transition-[background-color,box-shadow] duration-500 lg:h-16 lg:pl-7 ${
            scrolled || menuOpen ? "bg-white/85 shadow-[var(--shadow-card)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <Link href="/" aria-label="BankFin home" className="relative z-10 shrink-0">
            <Image
              src="/assets/bankfin-logo-horizontal.png"
              alt="BankFin"
              width={738}
              height={241}
              priority
              className="h-6 w-auto lg:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              const isSvc = item.label === "Services";
              return (
                <li
                  key={item.href}
                  ref={isSvc ? svcRef : undefined}
                  className="relative"
                  onMouseEnter={isSvc ? openSvc : undefined}
                  onMouseLeave={isSvc ? closeSvcSoon : undefined}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex h-10 items-center rounded-full px-4 text-[0.92rem] font-medium transition-colors ${
                        active ? "bg-ink text-white" : "text-ink-soft hover:bg-white hover:text-ink"
                      }`}
                    >
                      {item.label}

                    </Link>
                    {isSvc && (
                      <button
                        type="button"
                        aria-expanded={svcOpen}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={() => setSvcOpen((v) => !v)}
                        className="inline-flex h-7 w-5 items-center justify-center text-muted hover:text-ink"
                      >
                        <span
                          aria-hidden
                          className={`block h-[5px] w-[5px] border-b border-r border-current transition-transform duration-300 ${
                            svcOpen ? "-rotate-[135deg] translate-y-[1px]" : "rotate-45 -translate-y-[1px]"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {isSvc && (
                    <AnimatePresence>
                      {svcOpen && (
                        <motion.div
                          id="services-menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full z-20 w-[640px] -translate-x-1/2 pt-4"
                          onFocus={openSvc}
                        >
                          <div className="overflow-hidden rounded-[28px] bg-white p-3 shadow-[var(--shadow-float)]">
                            <div className="flex items-baseline justify-between px-4 pb-3 pt-2">
                              <p className="kicker text-muted">Financing solutions</p>
                              <Link href="/services" className="text-[0.82rem] text-muted hover:text-ink">
                                All services
                              </Link>
                            </div>
                            <ul className="grid grid-cols-2 gap-1">
                              {services.map((s, i) => {
                                const here = pathname === `/services/${s.slug}`;
                                return (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/services/${s.slug}`}
                                      aria-current={here ? "page" : undefined}
                                      className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-bg"
                                    >
                                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg font-serif text-[0.95rem] font-semibold text-red-strong transition-colors group-hover:bg-red-strong group-hover:text-white">{s.index}</span>
                                      <span className="flex-1">
                                        <span className={`block text-[0.95rem] font-medium ${here ? "text-red-strong" : "text-ink"}`}>
                                          {s.navName}
                                        </span>
                                        <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">
                                          {s.tagline}
                                        </span>
                                      </span>
                                      <ArrowUpRight className="h-3.5 w-3.5 self-center text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden h-11 items-center gap-3 rounded-full bg-red-strong pl-5 pr-1.5 text-[0.9rem] font-medium text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-deep lg:inline-flex"
            >
              Start an Enquiry
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-strong"><ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" /></span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-10 inline-flex h-10 items-center gap-3 rounded-full bg-ink px-4 text-[0.88rem] font-medium text-white lg:hidden"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-transform duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-transform duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} />
    </>
  );
}

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 overflow-y-auto bg-bg pt-20 lg:hidden"
          data-lenis-prevent
        >
          <div className="container-x flex min-h-full flex-col pb-10 pt-6">
            <ul>
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-5 py-4"
                    >
                      <span className="numeral w-6 text-[0.95rem] text-red-strong">{i + 1}</span>
                      <span
                        className={`font-serif text-[2.4rem] font-semibold lowercase leading-none tracking-[-0.04em] ${
                          active ? "text-red-strong" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10"
            >
              <p className="kicker">Financing solutions</p>
              <ul className="mt-3 grid grid-cols-1 min-[420px]:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-baseline gap-3 py-2 text-[0.95rem] text-ink-soft"
                    >
                      <span className="numeral text-[0.85rem] text-faint">{s.index}</span>
                      {s.navName}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-auto flex flex-col gap-4 pt-10"
            >
              <Link
                href="/contact"
                className="flex h-14 items-center justify-between rounded-full bg-red-strong px-6 font-medium text-white shadow-[var(--shadow-red)]"
              >
                Start an Enquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={site.contact.phoneHref} className="text-center text-[0.9rem] text-muted">
                {site.contact.phone}
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
