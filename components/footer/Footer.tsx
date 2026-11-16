import Image from "next/image";
import Link from "next/link";
import { legalLinks, nav, services, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto max-w-[1240px] rounded-[32px] bg-white px-6 pb-8 pt-12 md:px-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="BankFin home" className="inline-block">
              <Image src="/assets/bankfin-logo-horizontal.png" alt="BankFin" width={738} height={241} className="h-8 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs font-serif text-[1.6rem] font-semibold lowercase leading-[1.05] tracking-[-0.03em] text-ink">
              smart financing. clear guidance.
            </p>
            <div className="mt-6 space-y-1 text-[0.92rem] text-muted">
              <p>
                <a href={`mailto:${site.contact.email}`} className="hover:text-ink">{site.contact.email}</a>
              </p>
              <p>
                <a href={site.contact.phoneHref} className="hover:text-ink">{site.contact.phone}</a>
              </p>
              <p>{site.contact.addressLines.join(", ")}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 lg:col-span-6 lg:col-start-7">
            <div>
              <h2 className="kicker text-muted">Company</h2>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-[0.95rem] text-ink-soft transition-colors hover:text-red-strong">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="kicker text-muted">Services</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-[0.95rem] text-ink-soft transition-colors hover:text-red-strong">
                      {s.navName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-[0.78rem] leading-relaxed text-faint">{site.disclaimer}</p>

        <div className="mt-6 flex flex-col gap-3 text-[0.8rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} BankFin</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
