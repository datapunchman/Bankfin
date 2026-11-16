import { faqs } from "@/lib/content";
import Accordion from "@/components/faq/Accordion";
import SplitHeading from "@/components/animations/SplitHeading";
import Button from "@/components/ui/Button";

export default function HomeFAQ() {
  return (
    <section aria-labelledby="faq-title" className="container-x py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker kicker-red">FAQs</p>
          <SplitHeading id="faq-title" className="title mt-5 lowercase text-ink" lines={["questions?", "answered."]} />
          <div className="mt-8">
            <Button href="/faqs" variant="ghost">
              All questions
            </Button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={[faqs[1], faqs[3], faqs[4], faqs[2], faqs[9]]} />
        </div>
      </div>
    </section>
  );
}
