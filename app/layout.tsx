import type { Metadata, Viewport } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import { site } from "@/lib/content";
import { ogImage } from "@/lib/seo";

/*
 * CRED sets its UI in Gilroy and its headlines in Cirka. Both are commercial
 * typefaces, so the site ships their closest open-licence equivalents:
 * Outfit (geometric, Gilroy-like) and Fraunces (soft high-contrast serif,
 * Cirka-like). If BankFin licenses Gilroy/Cirka, load them with next/font/local
 * under the same CSS variables and nothing else needs to change.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | BankFin" },
  description: site.description,
  applicationName: "BankFin",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: "BankFin",
    locale: "en_IN",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [ogImage.url] },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
};

// Adds `motion` to <html> before paint unless the visitor prefers reduced motion.
// Initial (hidden) animation states in globals.css only apply under this class.
const motionScript = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
