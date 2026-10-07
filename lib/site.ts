// Absolute site URL for metadata, sitemap and OG images.
// Set NEXT_PUBLIC_SITE_URL in production; Vercel's production URL is used as a fallback.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Ayushman Jha";
export const siteDescription =
  "Ayushman Jha — Electrical Engineering × AI/ML × Data × Software. Case studies of intelligent systems for energy, industrial maintenance, radar, AI infrastructure and data, verified against their public repositories.";
