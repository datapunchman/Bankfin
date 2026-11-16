# BankFin Light — Client Verification Checklist

Everything on the site comes from `source_materials/BankFin_SEO_Content_Master.md`.
The site makes **no** claims about interest rates, loan amounts, approval times, fees,
lenders, statistics, testimonials, awards or approval guarantees.

Please confirm or supply the items below before launch.

## Company & contact
- [ ] Exact legal / company name (the site currently uses "BankFin")
- [ ] Business model: lender, DSA, broker, advisor, aggregator, or other intermediary
- [ ] Office address: NIRMALYAM KADAMPOYIL, PO, Chevayoor, Kozhikode, Kerala 673017
- [ ] Email: info@bankfin.com
- [ ] Phone: +91-98765-43210 (looks like a placeholder number; please confirm)
- [ ] Production domain (the site assumes `https://bankfin.in`; set `NEXT_PUBLIC_SITE_URL`)
- [ ] Whether WhatsApp enquiries are supported (not shown on the site)

## Content held back or written conservatively
- [ ] **FAQ "Does BankFin provide the loan directly?"** is left out until the business model is confirmed.
- [ ] **FAQ "How long does loan approval take?"**: only the general answer is shown; no timeframe.
- [ ] **Car Loans** (approved addition): the content master has no product detail for it. The copy is general,
      covering new and pre-owned vehicles, eligibility, documentation and the application process.
      Please confirm the scope (new or used vehicles, two-wheelers, commercial vehicles?) and any
      approved product wording. File: `lib/content.ts` → `car-loans`.
- [ ] Car Loans tagline "Drive your next purchase forward." is new copy; please approve it.
- [ ] Vehicle Buyers audience copy ("For financing the purchase of a new or pre-owned vehicle.") is new; please approve it.
- [ ] The FAQ answer listing BankFin's services now includes car loans.
- [ ] Mission and Vision on `/about` use the content master's suggested wording; replace them if official statements exist.
- [ ] "How BankFin Can Help" copy for Home, Business, Overdraft, LAP and Car pages paraphrases
      the approved intro and help copy; please review.
- [ ] Employment type options in the enquiry form: Salaried, Self-employed professional,
      Business owner / Proprietor, Partnership / Company, MSME, Other.

## Legal
- [ ] Privacy Policy: placeholder page (set to noindex) at `/privacy-policy`
- [ ] Terms & Conditions: placeholder page (set to noindex) at `/terms`
- [ ] Disclaimer: uses the approved footer disclaimer and process disclaimer
- [ ] Wording of the consent checkbox on the enquiry form
- [ ] Regulatory registrations, if any are required to be shown

## Not on the site (confirm before adding)
Lender, bank or NBFC relationships · interest rates · loan amount ranges · tenure ranges ·
processing fees · customer numbers · years of experience · testimonials · awards · certifications.

## Design
- [ ] Fonts: the CRED-style look uses Outfit + Fraunces (free). If BankFin wants CRED's exact fonts (Gilroy, Cirka), they must be licensed first.
- [ ] Hero phone screen and bento chat are illustrative UI only (no real app, no figures). Confirm BankFin is comfortable with the app-style presentation.

## Technical items needing the client
- [ ] **Enquiry form backend**: `/api/enquiry` validates every submission but has no destination yet.
      Set `ENQUIRY_WEBHOOK_URL` (CRM, email relay or automation endpoint) to turn on delivery.
      Until then the form tells visitors their enquiry was **not** sent and offers email and phone instead.
- [ ] Analytics / consent tooling (none installed)
- [ ] LocalBusiness schema is left out until the address and business type are verified
      (Organization, WebSite, BreadcrumbList, Service and FAQPage schema are in place).
