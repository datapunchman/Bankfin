import { employmentOptions, enquiryOptions } from "./content";

export type EnquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  employment: string;
  requirement: string;
  amount: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  company?: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry: EnquiryInput = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  employment: "",
  requirement: "",
  amount: "",
  message: "",
  consent: false,
  company: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Indian mobile numbers, with optional +91 / 0 prefix.
const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export function normalizePhone(v: string) {
  return v.replace(/[\s\-().]/g, "");
}

/** Shared client + server validation. Returns an empty object when valid. */
export function validateEnquiry(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = "Please enter your full name.";
  else if (name.length < 2 || name.length > 80) e.fullName = "Please enter a valid name.";

  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!PHONE.test(normalizePhone(v.phone))) e.phone = "Please enter a valid 10-digit Indian mobile number.";

  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > 120) e.email = "Please enter a valid email address.";

  if (!v.city.trim()) e.city = "Please enter your city.";
  else if (v.city.trim().length > 60) e.city = "Please shorten the city name.";

  if (!v.employment) e.employment = "Please select an option.";
  else if (!(employmentOptions as readonly string[]).includes(v.employment)) e.employment = "Please select a valid option.";

  if (!v.requirement) e.requirement = "Please select a financing requirement.";
  else if (!(enquiryOptions as readonly string[]).includes(v.requirement)) e.requirement = "Please select a valid option.";

  if (v.amount.length > 40) e.amount = "Please keep this short, for example “10 lakh”.";
  if (v.message.length > 1000) e.message = "Please keep your message under 1,000 characters.";
  if (!v.consent) e.consent = "Please confirm your consent so we can contact you.";
  return e;
}
