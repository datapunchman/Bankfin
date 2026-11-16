import Link from "next/link";
import { services } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import StepsStack from "@/components/sections/StepsStack";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHead from "@/components/ui/SectionHead";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMeta({
  title: "How It Works | A Simpler Way to Explore Financing | BankFin",
  description:
    "See how BankFin helps you explore financing: share your requirement, understand your options, prepare your application and move forward with the lender's process.",
  path: "/how-it-works",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
];

const notes = [
  { title: "Clear communication", body: "Documentation, eligibility and next steps — explained before you proceed." },
  { title: "Documents vary", body: "By product, profile, lender and purpose. We guide you on what is generally needed." },
  { title: "The lender decides", body: "Final approval and terms are set by the respective lender." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="pt-16">
        <StepsStack showLink={false} titleAs="h1" />
      </div>

      <section aria-labelledby="notes-title" className="container-x py-24 md:py-32">
        <SectionHead label="Good to know" id="notes-title" title={["before you proceed."]} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {notes.map((n, i) => (
            <li key={n.title} data-reveal className="card p-8">
              <span className="font-serif text-[3rem] font-semibold leading-none tracking-[-0.05em] text-red-strong">{i + 1}</span>
              <h3 className="mt-8 font-serif text-[1.5rem] font-semibold lowercase leading-none tracking-[-0.03em] text-ink">{n.title}</h3>
              <p className="mt-3 text-[0.92rem] text-muted">{n.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="start-title" className="container-x pb-24 md:pb-32">
        <SectionHead label="Where to begin" id="start-title" title={["start with what fits."]} />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="chip !px-5 !py-3 transition-colors hover:bg-ink hover:text-white">
                <span className="font-serif font-semibold text-red-strong">{s.index}</span>
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
