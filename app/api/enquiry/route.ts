import { NextResponse } from "next/server";
import { emptyEnquiry, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 *
 * BACKEND INTEGRATION REQUIRED: no CRM / email service is connected yet.
 * Set ENQUIRY_WEBHOOK_URL (see .env.example) to forward validated enquiries
 * as JSON to a CRM, email relay or automation endpoint. Until then this route
 * answers 503 so the form never pretends a submission was received.
 */
export async function POST(req: Request) {
  let body: Partial<EnquiryInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST" }, { status: 400 });
  }

  const input: EnquiryInput = {
    ...emptyEnquiry,
    ...Object.fromEntries(
      Object.entries(body).map(([k, v]) => [k, typeof v === "string" ? v.slice(0, 2000) : v])
    ),
    consent: body.consent === true,
  };

  // Honeypot: silently reject bots without signalling success.
  if (input.company) {
    return NextResponse.json({ ok: false, code: "REJECTED" }, { status: 400 });
  }

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "INVALID", errors }, { status: 422 });
  }

  const target = process.env.ENQUIRY_WEBHOOK_URL;
  if (!target) {
    return NextResponse.json({ ok: false, code: "NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    const { company: _hp, ...payload } = input;
    void _hp;
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString(), source: "bankfin-website" }),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "UPSTREAM_ERROR" }, { status: 502 });
  }
}
