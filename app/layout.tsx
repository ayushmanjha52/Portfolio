import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/site/Providers";
import { modeScript } from "@/lib/mode";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  themeColor: "#0d0e10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-mode="engineer"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Applies the saved Recruiter / Engineer mode before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded bg-signal px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
