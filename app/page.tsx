import Hero from "@/components/hero/Hero";
import Marquee from "@/components/sections/Marquee";
import Statement from "@/components/sections/Statement";
import ServicesSection from "@/components/sections/ServicesSection";
import StepsStack from "@/components/sections/StepsStack";
import Bento from "@/components/sections/Bento";
import Orbit from "@/components/sections/Orbit";
import HomeFAQ from "@/components/sections/HomeFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import JsonLd from "@/components/seo/JsonLd";
import { pageMeta, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "BankFin | Personal, Home & Business Loan Solutions",
  description:
    "Find financing solutions for personal, home and business needs with BankFin. Explore loan options and get personalized assistance through a simple, transparent process.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <Marquee />
      <Statement />
      <ServicesSection />
      <StepsStack />
      <Bento />
      <Orbit />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
