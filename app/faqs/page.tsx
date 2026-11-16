import Link from "next/link";
import { faqs, services } from "@/lib/content";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import Accordion from "@/components/faq/Accordion";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMeta({
  title: "Loan & Financing FAQs | BankFin",
  description:
    "Get answers to common questions about personal loans, home loans, business loans, MSME finance, overdrafts, project finance, loans against property and car loans.",
  path: "/faqs",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQs", path: "/faqs" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <PageHero
        eyebrow="Frequently asked questions"
        titleLines={["questions?", "answered."]}
        intro={<p>Rates, amounts, fees and approval are always set by the respective lender.</p>}
        crumbs={crumbs}
      />
      <section aria-label="Questions and answers" className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} headingLevel="h2" showServiceLinks />
        </div>
        <ul className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="chip transition-colors hover:bg-ink hover:text-white">
                {s.navName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCTA />
    </>
  );
}
