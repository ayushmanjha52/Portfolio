import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/github", "/resume", "/interview"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: p.tier === "large" ? 0.9 : p.tier === "medium" ? 0.7 : 0.5,
  }));
  return [...pages, ...caseStudies];
}
