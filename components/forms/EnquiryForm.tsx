"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Loader2, Mail, Phone } from "lucide-react";
import { employmentOptions, enquiryOptions, site } from "@/lib/content";
import { emptyEnquiry, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "not-configured" }
  | { kind: "error" };

export default function EnquiryForm() {
  const params = useSearchParams();
  const formId = useId();
  const [values, setValues] = useState<EnquiryInput>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect the requirement from ?service=
  useEffect(() => {
    const s = params.get("service");
    if (s && (enquiryOptions as readonly string[]).includes(s)) {
      setValues((v) => ({ ...v, requirement: s }));
    }
  }, [params]);

  const set = <K extends keyof EnquiryInput>(k: K, v: EnquiryInput[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validateEnquiry(next));
  };
  const blur = (k: keyof EnquiryInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateEnquiry(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus({ kind: "success" });
      else if (data.code === "NOT_CONFIGURED") setStatus({ kind: "not-configured" });
      else if (data.code === "INVALID" && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else setStatus({ kind: "error" });
    } catch {
      setStatus({ kind: "error" });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const err = (k: keyof EnquiryInput) => (touched[k] ? errors[k] : undefined);

  const mailtoHref = () => {
    const body = [
      `Name: ${values.fullName}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `City: ${values.city}`,
      `Employment / Business type: ${values.employment}`,
      `Financing requirement: ${values.requirement}`,
      values.amount ? `Approximate amount: ${values.amount}` : "",
      values.message ? `\nMessage:\n${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `Enquiry: ${values.requirement || "Financing"}`
    )}&body=${encodeURIComponent(body)}`;
  };

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card p-8 outline-none md:p-12">
        <p className="kicker kicker-red">Enquiry received</p>
        <h2 className="title-sm mt-4 lowercase text-ink">thank you. your enquiry has been sent.</h2>
        <p className="body mt-4">Our team will review your requirement and get in touch to discuss the next steps.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${formId}-title`}
      className="card relative p-6 sm:p-8 md:p-12"
    >
      <p className="kicker kicker-red">Enquiry form</p>
      <h2 id={`${formId}-title`} className="title-sm mt-4 lowercase text-ink">
        Start Your Enquiry
      </h2>
      <p className="mt-3 text-[0.9rem] text-muted">
        Fields marked <span className="text-red-strong">*</span> are required.
      </p>

      <div className="mt-8 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <Field id={`${formId}-fullName`} label="Full Name" required error={err("fullName")}>
          <input
            id={`${formId}-fullName`}
            className="field"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            onBlur={() => blur("fullName")}
            aria-invalid={!!err("fullName")}
            aria-describedby={err("fullName") ? `${formId}-fullName-err` : undefined}
            required
          />
        </Field>
        <Field id={`${formId}-phone`} label="Phone Number" required error={err("phone")}>
          <input
            id={`${formId}-phone`}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!err("phone")}
            aria-describedby={err("phone") ? `${formId}-phone-err` : undefined}
            required
          />
        </Field>
        <Field id={`${formId}-email`} label="Email" required error={err("email")}>
          <input
            id={`${formId}-email`}
            className="field"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!err("email")}
            aria-describedby={err("email") ? `${formId}-email-err` : undefined}
            required
          />
        </Field>
        <Field id={`${formId}-city`} label="City" required error={err("city")}>
          <input
            id={`${formId}-city`}
            className="field"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            onBlur={() => blur("city")}
            aria-invalid={!!err("city")}
            aria-describedby={err("city") ? `${formId}-city-err` : undefined}
            required
          />
        </Field>
        <Field id={`${formId}-employment`} label="Employment Type / Business Type" required error={err("employment")}>
          <select
            id={`${formId}-employment`}
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b655d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
            value={values.employment}
            onChange={(e) => set("employment", e.target.value)}
            onBlur={() => blur("employment")}
            aria-invalid={!!err("employment")}
            aria-describedby={err("employment") ? `${formId}-employment-err` : undefined}
            required
          >
            <option value="">Select…</option>
            {employmentOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id={`${formId}-requirement`} label="Financing Requirement" required error={err("requirement")}>
          <select
            id={`${formId}-requirement`}
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b655d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
            value={values.requirement}
            onChange={(e) => set("requirement", e.target.value)}
            onBlur={() => blur("requirement")}
            aria-invalid={!!err("requirement")}
            aria-describedby={err("requirement") ? `${formId}-requirement-err` : undefined}
            required
          >
            <option value="">Select…</option>
            {enquiryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id={`${formId}-amount`} label="Approximate Amount" hint="Optional" error={err("amount")}>
          <input
            id={`${formId}-amount`}
            className="field"
            placeholder="e.g. 10 lakh"
            value={values.amount}
            onChange={(e) => set("amount", e.target.value)}
            onBlur={() => blur("amount")}
            aria-invalid={!!err("amount")}
            aria-describedby={err("amount") ? `${formId}-amount-err` : undefined}
          />
        </Field>
        <div className="hidden sm:block" />
        <div className="sm:col-span-2">
          <Field id={`${formId}-message`} label="Message" hint="Optional" error={err("message")}>
            <textarea
              id={`${formId}-message`}
              className="field min-h-[132px] resize-y"
              placeholder="Tell us briefly about your requirement"
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => blur("message")}
              aria-invalid={!!err("message")}
              aria-describedby={err("message") ? `${formId}-message-err` : undefined}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      <div className="mt-6">
        <label className="group flex cursor-pointer items-start gap-3">
          <input
            id={`${formId}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              setTouched((t) => ({ ...t, consent: true }));
              setErrors(validateEnquiry({ ...values, consent: e.target.checked }));
            }}
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? `${formId}-consent-err` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border border-faint bg-white transition-colors checked:border-red-strong checked:bg-red-strong checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22><path d=%22M5 12l5 5L20 7%22/></svg>')] bg-[length:14px] bg-center bg-no-repeat"
          />
          <span className="text-[0.88rem] leading-relaxed text-ink-soft">
            I agree to be contacted by BankFin about this enquiry and have read the{" "}
            <Link href="/privacy-policy" className="text-red-strong underline underline-offset-2">
              Privacy Policy
            </Link>
            . <span className="text-red-strong">*</span>
          </span>
        </label>
        <ErrorText id={`${formId}-consent-err`} msg={err("consent")} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="group inline-flex h-14 items-center justify-between gap-6 rounded-full bg-red-strong pl-7 pr-2 font-medium text-white shadow-[var(--shadow-red)] transition-colors hover:bg-red-deep disabled:opacity-70"
        >
          {status.kind === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Submit Enquiry
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-strong">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </>
          )}
        </button>
        <p className="max-w-xs text-[0.78rem] leading-relaxed text-faint">
          Submitting an enquiry does not constitute a loan application or guarantee approval.
        </p>
      </div>

      <AnimatePresence>
        {(status.kind === "not-configured" || status.kind === "error") && (
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-[22px] bg-red-soft p-5 outline-none"
          >
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-strong" strokeWidth={1.7} />
              <div>
                <p className="font-medium text-ink">
                  {status.kind === "not-configured"
                    ? "Online submission isn’t available yet — your enquiry was not sent."
                    : "Something went wrong — your enquiry was not sent."}
                </p>
                <p className="mt-1 text-[0.9rem] text-ink-soft">
                  Please contact BankFin directly. Your details are still in the form.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={mailtoHref()}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[0.88rem] font-medium text-white hover:bg-red-strong"
                  >
                    <Mail className="h-4 w-4" /> Email this enquiry
                  </a>
                  <a
                    href={site.contact.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.88rem] font-medium text-ink hover:bg-ink hover:text-white"
                  >
                    <Phone className="h-4 w-4" /> {site.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.85rem] font-medium text-ink">
        <span>
          {label}
          {required && <span className="ml-0.5 text-red-strong">*</span>}
        </span>
        {hint && <span className="text-[0.75rem] font-normal text-faint">{hint}</span>}
      </label>
      {children}
      <ErrorText id={`${id}-err`} msg={error} />
    </div>
  );
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence initial={false}>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden pt-1.5 text-[0.8rem] text-red-deep"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
