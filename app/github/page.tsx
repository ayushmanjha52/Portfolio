import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { GitHubIcon } from "@/components/site/BrandIcons";
import { repoGroups, repoUrl, repos } from "@/data/repos";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "GitHub repositories",
  description: "Verified public repositories of Ayushman Jha on GitHub, grouped by what they show: featured systems, engineering, ML, data, software and experiments.",
  alternates: { canonical: "/github" },
};

export default function GitHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="GitHub"
        title={
          <>
            Public repositories.
            <span className="block text-mute">Grouped, not flattened.</span>
          </>
        }
        intro={
          <>
            {repos.length} public repositories, checked in October 2026 and grouped by what they demonstrate.
            Repositories that hold the same project link to one case study.
          </>
        }
      />

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[14.5px] font-medium text-paper hover:border-paper"
      >
        <GitHubIcon className="size-4" />
        github.com/{profile.githubHandle}
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </a>

      <div className="mt-12 space-y-12">
        {repoGroups.map((g) => {
          const items = repos.filter((r) => r.group === g.id);
          if (items.length === 0) return null;
          return (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                <h2 id={`group-${g.id}`} className="display text-[2.1rem] leading-none text-paper">
                  {g.id} <span className="text-faint">· {items.length}</span>
                </h2>
                <p className="text-[13px] text-faint">{g.blurb}</p>
              </div>
              <ul className="divide-y divide-line">
                {items.map((r) => (
                  <li key={r.name} className="grid gap-2 py-4 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-6">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <a
                        href={repoUrl(r.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[14px] text-paper hover:text-signal"
                      >
                        {r.name}
                      </a>
                      {r.note && <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">{r.note}</span>}
                    </div>
                    <p className="text-[14px] leading-relaxed text-mute">
                      {r.description} <span className="font-mono text-[11px] text-faint">· {r.language}</span>
                    </p>
                    <div className="flex items-center gap-4 text-[14px] font-medium">
                      {r.project && (
                        <Link href={`/projects/${r.project}`} className="inline-flex items-center gap-1.5 text-paper hover:text-signal">
                          Case study <ArrowRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      )}
                      <a
                        href={repoUrl(r.name)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${r.name} on GitHub (opens in a new tab)`}
                        className="inline-flex items-center gap-1.5 text-mute hover:text-paper"
                      >
                        <GitHubIcon className="size-3.5" />
                        Repo
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
