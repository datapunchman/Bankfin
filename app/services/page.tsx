import Link from "next/link";
import { services } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import ServiceGlyph from "@/components/services/ServiceGlyph";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMeta({
  title: "Loan Services | Personal, Home, Business & Car Loans | BankFin",
  description:
    "Explore BankFin's financing solutions: personal loans, home loans, unsecured business loans, MSME loans, overdraft facilities, project finance, loans against property and car loans.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Eight ways forward"
        titleLines={["financing built", "around your needs."]}
        intro={<p>For individuals, professionals, entrepreneurs, MSMEs and businesses.</p>}
        crumbs={crumbs}
      />

      <section aria-label="All services" className="container-x py-20 md:py-28">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug} data-reveal>
              <Link
                href={`/services/${s.slug}`}
                className="card group flex h-full flex-col p-5 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <div className="relative aspect-square overflow-hidden rounded-[22px] bg-bg transition-colors duration-500 group-hover:bg-red-soft">
                  <ServiceGlyph icon={s.icon} className="absolute inset-[14%] h-[72%] w-[72%]" />
                  <span className="absolute left-3 top-3 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-white px-2 font-serif text-[0.9rem] font-semibold text-red-strong">
                    {s.index}
                  </span>
                </div>
                <h2 className="mt-5 font-serif text-[1.55rem] font-semibold lowercase leading-none tracking-[-0.035em] text-ink">
                  {s.name}
                </h2>
                <p className="mt-2 text-[0.9rem] text-muted">{s.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-medium text-ink">
                  <span className="link">{s.cta}</span>
                  <span aria-hidden className="text-red-strong transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCTA lines={["not sure which", "option fits?"]} accent="let's talk." copy="Speak with the BankFin team about your requirement." cta="Start Your Enquiry" />
    </>
  );
}
