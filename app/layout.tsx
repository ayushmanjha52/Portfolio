import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/site/Providers";
import { modeScript } from "@/lib/mode";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

// Editorial serif for display, a warm grotesk for reading, a mono only for technical labels.
const serif = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = Hanken_Grotesk({ variable: "--font-text", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-code", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Engineering Intelligent Systems`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Ayushman Jha",
    "software engineer",
    "machine learning",
    "electrical engineering",
    "industrial AI",
    "predictive maintenance",
    "energy systems",
    "radar signal processing",
    "BIT Sindri",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} — Engineering Intelligent Systems`,
    description: siteDescription,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Engineering Intelligent Systems`,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-mode="engineer"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/* Applies the saved Recruiter / Engineer mode before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded bg-signal px-3 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
