import type { ReactNode } from "react";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export default function LegalPage({
  title,
  path,
  eyebrow,
  children,
}: {
  title: string[];
  path: string;
  eyebrow: string;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title.join(" "), path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero eyebrow={eyebrow} titleLines={title} crumbs={crumbs} />
      <section className="container-x py-16 md:py-24">
        <div className="card mx-auto max-w-3xl space-y-6 p-8 text-[1.02rem] leading-[1.8] text-ink-soft md:p-12 [&_a]:text-red-strong [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-[1.6rem] [&_h2]:font-semibold [&_h2]:lowercase [&_h2]:tracking-[-0.03em] [&_h2]:text-ink">
          {children}
        </div>
      </section>
    </>
  );
}
