import Button from "@/components/ui/Button";
import SplitHeading from "@/components/animations/SplitHeading";
import ServicesCarousel from "@/components/services/ServicesCarousel";

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-x-clip py-20 md:py-28">
      <p aria-hidden className="ghost absolute inset-x-0 top-6 text-center lowercase md:top-0">
        solutions
      </p>
      <div className="container-x relative text-center">
        <p className="kicker kicker-red" data-reveal>
          Eight ways forward
        </p>
        <SplitHeading
          id="services-title"
          className="title mx-auto mt-5 max-w-3xl lowercase text-ink"
          lines={["financing built", "around your needs."]}
        />
        <div className="mt-14 text-left md:mt-20">
          <ServicesCarousel />
        </div>
        <div className="mt-10">
          <Button href="/services" variant="secondary">
            See all solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
