import Link from "next/link";
import type { ReactNode } from "react";
import SplitHeading from "@/components/animations/SplitHeading";

type Crumb = { name: string; path: string };

type Props = {
  eyebrow: string;
  titleLines: string[];
  intro?: ReactNode;
  crumbs: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
  num?: string;
};

/** Inner-page hero: breadcrumb pill, kicker, big lowercase serif title, one line, optional visual. */
export default function PageHero({ eyebrow, titleLines, intro, crumbs, aside, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="pt-32 md:pt-40">
      <div className="container-x text-center">
        <nav aria-label="Breadcrumb" className="inline-flex">
          <ol className="flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.78rem] text-muted shadow-[var(--shadow-card)]">
            {crumbs.map((c, i) => (
              <li key={c.path} className="inline-flex items-center gap-1.5">
                {i < crumbs.length - 1 ? (
                  <>
                    <Link href={c.path} className="hover:text-ink">
                      {c.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                ) : (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="kicker kicker-red mt-10">{eyebrow}</p>
        <SplitHeading
          as="h1"
          id="page-title"
          trigger="mount"
          delay={100}
          className="display mx-auto mt-5 max-w-5xl text-[clamp(2.8rem,7.4vw,6.4rem)] lowercase text-ink"
          lines={titleLines.map((t) => t.toLowerCase())}
        />
        {intro ? <div className="sub mx-auto mt-7 max-w-xl" data-reveal>{intro}</div> : null}
        {children ? <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>{children}</div> : null}
      </div>
      {aside ? (
        <div className="container-x mt-14 md:mt-20" data-reveal>
          {aside}
        </div>
      ) : null}
    </section>
  );
}
