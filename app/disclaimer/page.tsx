import Link from "next/link";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/legal/LegalPage";

export const metadata = pageMeta({
  title: "Disclaimer | BankFin",
  description:
    "Important information about BankFin's services: financing options are subject to lender eligibility criteria, policies, verification and approval.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title={["Disclaimer"]} path="/disclaimer" eyebrow="Legal">
      <p>{site.disclaimer}</p>
      <h2>Lender decisions</h2>
      <p>{site.processDisclaimer}</p>
      <h2>No guarantee of approval</h2>
      <p>
        BankFin cannot guarantee loan approval. Final approval is determined by the respective lender
        based on its eligibility, credit, income, documentation, verification, and risk-assessment
        criteria.
      </p>
      <h2>Questions</h2>
      <p>
        If you have a question about this disclaimer, please <Link href="/contact">contact BankFin</Link>.
      </p>
    </LegalPage>
  );
}
