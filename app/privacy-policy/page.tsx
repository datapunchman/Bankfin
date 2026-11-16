import Link from "next/link";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/legal/LegalPage";

// VERIFY: the full Privacy Policy must be supplied/approved by BankFin before launch.
export const metadata = pageMeta({
  title: "Privacy Policy | BankFin",
  description: "BankFin's Privacy Policy.",
  path: "/privacy-policy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title={["Privacy Policy"]} path="/privacy-policy" eyebrow="Legal">
      <p>
        BankFin&apos;s Privacy Policy is being finalised and will be published on this page.
      </p>
      <p>
        If you have a question about how information you share with BankFin is handled, please
        contact us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call{" "}
        <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
      </p>
      <p>
        Return to the <Link href="/">homepage</Link>.
      </p>
    </LegalPage>
  );
}
