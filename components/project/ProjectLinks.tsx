import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/site/BrandIcons";
import type { Project } from "@/data/projects";

export function ProjectLinks({ project, caseStudy = true }: { project: Project; caseStudy?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.14em]">
      {caseStudy && (
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-paper hover:text-signal"
          aria-label={`${project.title} case study`}
        >
          Case study
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      )}
      {project.repos.map((r) => (
        <a
          key={r.name}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-mute hover:text-paper"
          aria-label={`GitHub repository ${r.name} (opens in a new tab)`}
        >
          <GitHubIcon className="size-3.5" />
          {project.repos.length > 1 ? r.name : "GitHub"}
        </a>
      ))}
      {project.live && (
        <a
          href={project.live.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-signal hover:text-paper"
          aria-label={`${project.title} live demo (opens in a new tab)`}
        >
          Live demo
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      )}
    </div>
  );
}
