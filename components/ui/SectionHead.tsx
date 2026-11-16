import type { ReactNode } from "react";
import SplitHeading from "@/components/animations/SplitHeading";

type Props = {
  num?: string;
  label: string;
  id: string;
  title: string[];
  as?: "h1" | "h2";
  intro?: ReactNode;
  aside?: ReactNode;
  align?: "center" | "left";
  /** kept for API compatibility */
  heavy?: boolean;
  tone?: "ink" | "paper";
};

/** Section opener: tracked red kicker + lowercase serif title, one optional line. */
export default function SectionHead({ label, id, title, as = "h2", intro, aside, align = "center" }: Props) {
  const c = align === "center";
  return (
    <header className={c ? "text-center" : ""}>
      <p className="kicker kicker-red" data-reveal>
        {label}
      </p>
      <SplitHeading
        as={as}
        id={id}
        trigger={as === "h1" ? "mount" : "view"}
        className={`${as === "h1" ? "display text-[clamp(2.8rem,7vw,6rem)]" : "title"} mt-5 lowercase text-ink ${c ? "mx-auto" : ""}`}
        lines={title.map((t) => t.toLowerCase())}
      />
      {intro ? (
        <div className={`sub mt-5 max-w-lg ${c ? "mx-auto" : ""}`} data-reveal>
          {intro}
        </div>
      ) : null}
      {aside ? (
        <div className="mt-7" data-reveal>
          {aside}
        </div>
      ) : null}
    </header>
  );
}
