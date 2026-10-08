"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { categoryLabels, type Category, type Project } from "@/data/projects";
import { LiveBadge, MaturityBadge, StackList } from "@/components/ui/Badges";
import { GitHubIcon } from "@/components/site/BrandIcons";

/** Only what the list renders, so full case-study data is not serialised into the page. */
export type ProjectListItem = Pick<
  Project,
  "slug" | "title" | "subtitle" | "rank" | "maturity" | "categories" | "summary" | "stack" | "repos" | "live"
>;

const order: Category[] = ["featured", "industrial", "energy", "ai-ml", "data", "software", "engineering", "experimental"];

export function ProjectsExplorer({ projects }: { projects: ProjectListItem[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const count = (c: Category) => projects.filter((p) => p.categories.includes(c)).length;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {(["all", ...order] as const).map((c) => {
          const on = filter === c;
          const label = c === "all" ? "All" : categoryLabels[c];
          const n = c === "all" ? projects.length : count(c);
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-[14px] transition-colors ${
                on ? "border-signal bg-signal-soft text-signal" : "border-line text-mute hover:border-line-strong hover:text-paper"
              }`}
            >
              {label} <span className="text-faint">{n}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>

      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-md border border-line">
        {shown.map((p) => (
          <li key={p.slug} className="grid gap-4 bg-ink-2/60 p-5 transition-colors hover:bg-ink-3 sm:p-6 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-start">
            <span className="font-mono text-[12px] tracking-[0.18em] text-faint">{String(p.rank).padStart(2, "0")}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="display text-[1.9rem] leading-none text-paper">
                  <Link href={`/projects/${p.slug}`} className="hover:text-signal">
                    {p.title}
                  </Link>
                </h2>
                {p.live && <LiveBadge />}
                <MaturityBadge maturity={p.maturity} />
              </div>
              <p className="mt-0.5 text-[15px] text-signal">{p.subtitle}</p>
              <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-mute">{p.summary}</p>
              <div className="mt-3">
                <StackList items={p.stack} limit={6} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium md:flex-col md:items-end">
              <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1.5 text-paper hover:text-signal">
                Case study <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
              {p.repos.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-mute hover:text-paper"
                  aria-label={`GitHub repository ${r.name} (opens in a new tab)`}
                >
                  <GitHubIcon className="size-3.5" />
                  {p.repos.length > 1 ? r.name : "GitHub"}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
