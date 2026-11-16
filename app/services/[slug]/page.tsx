import { notFound } from "next/navigation";
import Link from "next/link";
import { faqsForService, serviceBySlug, services, steps } from "@/lib/content";
import { breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";
import { splitTitle } from "@/lib/text";
import PageHero from "@/components/sections/PageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import Button from "@/components/ui/Button";
import Accordion from "@/components/faq/Accordion";
import SectionHead from "@/components/ui/SectionHead";
import ServiceGlyph from "@/components/services/ServiceGlyph";
import JsonLd from "@/components/seo/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const related = s.related.map((r) => serviceBySlug(r)!).filter(Boolean);
  const enquiryHref = `/contact?service=${encodeURIComponent(s.enquiryValue)}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.navName, path: `/services/${s.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(s)]} />

      <PageHero
        eyebrow={`${s.index} · ${s.name}`}
        titleLines={splitTitle(s.h1)}
        intro={<p>{s.short}</p>}
        crumbs={crumbs}
        aside={
          <div className="relative mx-auto grid max-w-5xl items-center gap-4 md:grid-cols-5">
            <div className="card relative aspect-[4/3] overflow-hidden md:col-span-3">
              <div className="absolute inset-4 rounded-[22px] bg-red-soft" />
              <ServiceGlyph icon={s.icon} className="absolute inset-[12%] h-[76%] w-[76%]" />
            </div>
            <div className="card flex h-full flex-col justify-between p-7 md:col-span-2">
              <span className="font-serif text-[4rem] font-semibold leading-none tracking-[-0.05em] text-red-strong">{s.index}</span>
              <div>
                <p className="font-serif text-[1.6rem] font-semibold lowercase leading-[1.02] tracking-[-0.03em] text-ink">{s.tagline}</p>
                <div className="mt-6">
                  <Button href={enquiryHref}>{s.cta}</Button>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Use cases */}
      <section aria-labelledby="uses-title" className="container-x py-24 md:py-32">
        <SectionHead label="Use cases" id="uses-title" title={[s.useCases.title]} intro={<p className="text-[0.98rem]">{s.intro[0]}</p>} />
        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {s.useCases.items.map((item, i) => (
            <li key={item} data-reveal className="chip !px-5 !py-3 !text-[0.95rem]">
              <span className="font-serif font-semibold text-red-strong">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Key considerations + how BankFin helps */}
      <section aria-label="Considerations and how BankFin helps" className="container-x">
        <div className="grid gap-4 md:grid-cols-2">
          {s.considerations ? (
            <div className="card p-8 md:p-10" data-reveal>
              <p className="kicker kicker-red">Key considerations</p>
              <h2 className="title-sm mt-4 lowercase text-ink">{s.considerations.title}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.considerations.items.map((c) => (
                  <li key={c} className="rounded-full bg-bg px-4 py-2 text-[0.88rem] text-ink-soft">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className={`card p-8 md:p-10 ${s.considerations ? "" : "md:col-span-2"}`} data-reveal>
            <p className="kicker kicker-red">How BankFin helps</p>
            <h2 className="title-sm mt-4 lowercase text-ink">{s.help.title}</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{s.help.body}</p>
            <ol className="mt-6 flex items-center gap-2" aria-label="The process in brief">
              {steps.map((st, i) => (
                <li key={st.n} className="flex items-center gap-2" title={st.title}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-serif text-[0.85rem] font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="sr-only">{st.title}</span>
                  {i < steps.length - 1 && <span aria-hidden className="h-px w-4 bg-line md:w-6" />}
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="link mt-5 inline-block text-[0.9rem] font-medium text-ink">
              How it works
            </Link>
          </div>
        </div>
        {s.important && (
          <p className="mx-auto mt-6 max-w-3xl text-center text-[0.82rem] leading-relaxed text-faint" data-reveal>
            {s.important}
          </p>
        )}
      </section>

      {/* FAQ */}
      <section aria-labelledby="sfaq-title" className="container-x py-24 md:py-32">
        <SectionHead label="FAQs" id="sfaq-title" title={["Questions? Answered."]} />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqsForService(s.slug).slice(0, 4)} />
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="container-x pb-24 md:pb-32">
        <SectionHead label="Related" id="related-title" title={["You may also explore"]} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} data-reveal>
              <Link href={`/services/${r.slug}`} className="card group flex h-full flex-col p-5 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-bg transition-colors duration-500 group-hover:bg-red-soft">
                  <ServiceGlyph icon={r.icon} className="absolute inset-[12%] h-[76%] w-[76%]" />
                </div>
                <h3 className="mt-5 font-serif text-[1.5rem] font-semibold lowercase leading-none tracking-[-0.03em] text-ink">{r.name}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{r.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCTA lines={["not sure which", "option fits?"]} accent="let's talk." copy="Speak with the BankFin team about your requirement." cta="Start Your Enquiry" href={enquiryHref} />
    </>
  );
}
