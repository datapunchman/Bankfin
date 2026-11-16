import { about, approach, site } from "@/lib/content";
import { breadcrumbSchema, organizationSchema, pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Statement from "@/components/sections/Statement";
import Bento from "@/components/sections/Bento";
import SectionHead from "@/components/ui/SectionHead";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMeta({
  title: "About BankFin | Personalized Loan & Financial Solutions",
  description:
    "Learn about BankFin and our approach to helping individuals, entrepreneurs, MSMEs and businesses explore suitable loan and financing solutions.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), organizationSchema()]} />
      <PageHero
        eyebrow="About BankFin"
        titleLines={["making financing", "easier to understand."]}
        intro={<p>{about.opening[1]}</p>}
        crumbs={crumbs}
      />

      <Statement />

      {/* Approach */}
      <section aria-labelledby="approach-title" className="container-x pb-24 md:pb-32">
        <SectionHead label="Our approach" id="approach-title" title={["understanding first.", "products second."]} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {approach.map((a, i) => (
            <li key={a} data-reveal className="card flex min-h-[200px] flex-col p-6">
              <span className="font-serif text-[2.8rem] font-semibold leading-none tracking-[-0.05em] text-red-strong">{i + 1}</span>
              <span className="mt-auto font-serif text-[1.25rem] font-semibold lowercase leading-[1.05] tracking-[-0.025em] text-ink">{a}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="container-x">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[32px] bg-red-strong p-9 text-white md:p-12" data-reveal>
            <h2 className="kicker !text-white/80">Our mission</h2>
            <p className="mt-6 font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold lowercase leading-[1.05] tracking-[-0.03em]">
              {about.mission}
            </p>
          </div>
          <div className="card p-9 md:p-12" data-reveal>
            <h2 className="kicker kicker-red">Our vision</h2>
            <p className="mt-6 font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold lowercase leading-[1.05] tracking-[-0.03em] text-ink">
              {about.vision}
            </p>
          </div>
        </div>
      </section>

      <Bento />

      {/* Office */}
      <section aria-labelledby="office-title" className="container-x pb-24 md:pb-32">
        <div className="card grid items-center gap-8 p-8 md:grid-cols-2 md:p-12" data-reveal>
          <div>
            <p className="kicker kicker-red">Visit us</p>
            <h2 id="office-title" className="title-sm mt-4 lowercase text-ink">
              kozhikode, kerala.
            </h2>
            <address className="mt-5 text-[0.98rem] not-italic leading-relaxed text-muted">
              {site.contact.addressLines.map((l) => (
                <span className="block" key={l}>
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a href={`mailto:${site.contact.email}`} className="chip !px-5 !py-3 hover:bg-ink hover:text-white">
              {site.contact.email}
            </a>
            <a href={site.contact.phoneHref} className="chip !px-5 !py-3 hover:bg-ink hover:text-white">
              {site.contact.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Chevayoor, Kozhikode, Kerala 673017")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="chip !px-5 !py-3 hover:bg-ink hover:text-white"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
