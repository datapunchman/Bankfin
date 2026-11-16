import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pb-24 pt-32 text-center">
      <p className="kicker kicker-red">Error 404</p>
      <h1 className="display mt-6 lowercase text-ink">
        page not <em className="font-medium text-red-strong">found.</em>
      </h1>
      <p className="sub mt-6 max-w-md">The page may have moved. Explore our financing solutions instead.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/services">Explore Loan Solutions</Button>
        <Button href="/contact" variant="secondary">
          Contact BankFin
        </Button>
      </div>
    </section>
  );
}
