import Link from "next/link";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/legal/LegalPage";

// VERIFY: the full Terms & Conditions must be supplied/approved by BankFin before launch.
export const metadata = pageMeta({
  title: "Terms & Conditions | BankFin",
  description: "Terms and conditions for using the BankFin website.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalPage title={["Terms & Conditions"]} path="/terms" eyebrow="Legal">
      <p>BankFin&apos;s Terms &amp; Conditions are being finalised and will be published on this page.</p>
      <p>
        Information on this website is for general informational purposes. Please read our{" "}
        <Link href="/disclaimer">Disclaimer</Link>, and contact us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> with any questions.
      </p>
    </LegalPage>
  );
}
