import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { site, steps } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMeta({
  title: "Contact BankFin | Enquire About Loan & Financing Solutions",
  description:
    "Contact BankFin to discuss personal, home, business, MSME, project finance, overdraft, loan against property and car loan requirements.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Contact / Apply"
        titleLines={["let's talk about", "your requirement."]}
        intro={<p>Tell us what you are looking for. We&apos;ll help you understand the next steps.</p>}
        crumbs={crumbs}
      />

      <section aria-label="Enquiry and contact details" className="container-x py-16 md:py-24">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="card h-[900px]" />}>
              <EnquiryForm />
            </Suspense>
          </div>
          <aside className="flex flex-col gap-4 lg:col-span-4">
            <div className="rounded-[28px] bg-ink p-8 text-white">
              <p className="kicker !text-white/60">Reach us</p>
              <ul className="mt-6 space-y-5 text-[0.95rem]">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red" strokeWidth={1.6} />
                  <address className="not-italic leading-relaxed text-white/85">
                    {site.contact.addressLines.map((l) => (
                      <span className="block" key={l}>
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-red">
                    <Mail className="h-5 w-5 text-red" strokeWidth={1.6} /> {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-red">
                    <Phone className="h-5 w-5 text-red" strokeWidth={1.6} /> {site.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="card p-8">
              <p className="kicker kicker-red">What happens next</p>
              <ol className="mt-5 space-y-3">
                {steps.slice(0, 3).map((s, i) => (
                  <li key={s.n} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg font-serif text-[0.9rem] font-semibold text-red-strong">
                      {i + 1}
                    </span>
                    <span className="text-[0.95rem] text-ink">{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="px-2 text-[0.78rem] leading-relaxed text-faint">{site.processDisclaimer}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
