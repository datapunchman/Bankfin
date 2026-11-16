import type { MetadataRoute } from "next";
import { services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/how-it-works", priority: 0.7 },
    { path: "/faqs", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/disclaimer", priority: 0.3 },
  ];
  return [
    ...pages.map((p) => ({ url: `${base}${p.path}`, lastModified: now, priority: p.priority })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      priority: 0.85,
    })),
  ];
}
