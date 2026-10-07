import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { LargeProjectCard, MediumProjectCard, SmallProjectCard } from "@/components/project/ProjectCard";
import { featuredLayout, getProject } from "@/data/projects";

const resolve = (slugs: readonly string[]) => slugs.map((s) => getProject(s)!);

export function FeaturedWork() {
  const large = resolve(featuredLayout.large);
  const medium = resolve(featuredLayout.medium);
  const small = resolve(featuredLayout.small);

  return (
    <Section
      id="work"
      index="03"
      eyebrow="Featured work"
      title={
        <>
          Systems, not screenshots.
          <span className="block text-mute">Ranked by engineering depth.</span>
        </>
      }
      intro="Each case study covers the problem, the architecture, the decisions, what was measured, and what the system cannot do yet. Numbers are quoted exactly as the repositories report them."
    >
      <div className="space-y-6">
        {large.map((p) => (
          <LargeProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {medium.map((p, i) => (
          <MediumProjectCard
            key={p.slug}
            project={p}
            // Odd count: the last card spans the two-column tablet row instead of leaving a gap.
            className={medium.length % 2 === 1 && i === medium.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}
          />
        ))}
      </div>

      <div className="eng-only mt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">More systems</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {small.map((p) => (
            <SmallProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px] uppercase tracking-[0.16em]">
        <Link href="/projects" className="inline-flex items-center gap-2 text-paper hover:text-signal">
          All projects
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
        <Link href="/github" className="inline-flex items-center gap-2 text-mute hover:text-paper">
          Repository index
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </Section>
  );
}
