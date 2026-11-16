# BankFin — Light Edition

An independent Next.js website for BankFin. It is separate from the existing dark-theme project
(`Surface/Bankfin`) and shares no code with it.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: production URL, used for canonicals, the sitemap and Open Graph
- `ENQUIRY_WEBHOOK_URL`: where validated enquiries are POSTed as JSON (**required for the form to deliver**)

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Anime.js 4 · GSAP 3
(ScrollTrigger) · Framer Motion 12 · Lenis · Lucide React · IBM Plex Sans / Mono (via `next/font`).

## Structure

```
app/                     routes, metadata, sitemap.ts, robots.ts, api/enquiry
components/
  animations/            SmoothScroll (Lenis + GSAP reveals), SplitHeading (Anime.js)
  navigation/ footer/    shell
  hero/                  homepage hero + animated PhoneMock
  services/              curved ServicesCarousel, ServiceGlyph line art
  sections/              homepage & shared sections
  faq/ forms/ legal/ seo/ ui/
lib/content.ts           ALL copy (from the SEO Content Master); edit content here
lib/seo.ts               metadata + JSON-LD helpers
source_materials/        official logo + content master (source of truth)
```

## Design system

Light, CRED-inspired: warm off-white `#F5F3EF`, white rounded cards, near-black ink, and one red from the logo.
Headlines are lowercase in a tight, bold display serif; UI text uses a geometric sans. Copy is kept to a
headline plus one line, and the visuals are animated product-style interfaces (phone enquiry screen, bento
mini-UIs, card stack, orbit, card ring) rather than paragraphs.

**Fonts.** CRED uses Gilroy (UI) and Cirka/Denton (display). These are commercial typefaces and are not
bundled. The site ships the closest open-licence equivalents through `next/font/google`: **Outfit**
(Gilroy-like) and **Fraunces** (Cirka-like). If BankFin licenses Gilroy/Cirka, load them with
`next/font/local` under the same `--font-outfit` / `--font-fraunces` variables in `app/layout.tsx`.

## Which library animates what

Each element is animated by only one library.

| Library | Used for |
|---|---|
| Anime.js | hero timeline + phone demo + floating cards (pointer parallax via `createAnimatable`), service marquee, scroll-synced statement and card-stack (`onScroll`), bento mini-UIs, audience orbit, CTA card ring, magnetic buttons, heading reveals, line drawings, counter rolls |
| GSAP + ScrollTrigger | generic `[data-reveal]` scroll entrances |
| Framer Motion | curved carousel springs and swipe, nav dropdown / mobile menu, accordions, form feedback |
| Lenis | smooth scrolling, driven by GSAP's ticker so it stays in sync with ScrollTrigger |

`prefers-reduced-motion` turns off Lenis, autoplay and all entrance animations. Content never
depends on JS to be visible: the hidden start states only apply under `html.motion`, a class set
before first paint.

See `CLIENT_VERIFICATION.md` for everything that needs client sign-off before launch.
