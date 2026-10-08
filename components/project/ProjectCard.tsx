import Link from "next/link";
import type { Project } from "@/data/projects";
import { LiveBadge, MaturityBadge, StackList } from "@/components/ui/Badges";
import { Metrics } from "@/components/ui/Metrics";
import { FlowChips, FlowDiagram } from "@/components/ui/FlowDiagram";
import { ProjectLinks } from "./ProjectLinks";

const rank = (n: number) => String(n).padStart(2, "0");

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{rank(project.rank)}</span>
      <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{project.period}</span>
      {project.live && <LiveBadge />}
      <MaturityBadge maturity={project.maturity} />
    </div>
  );
}

/** First honesty column on a card: the headline number next to the optimistic one. */
function HonestyStrip({ project }: { project: Project }) {
  const col = project.honesty!.columns[0];
  const headline = col.rows.find((r) => r.headline);
  const other = col.rows.find((r) => !r.headline);
  return (
    <div className="mt-5 rounded-md border border-line bg-ink p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Model honesty · {col.heading}</p>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {headline && (
          <p>
            <span className="block font-serif text-[2.2rem] leading-none text-signal">{headline.value}</span>
            <span className="mt-1.5 block text-[12.5px] leading-snug text-mute">{headline.label}</span>
            <span className="mt-0.5 block text-[12px] text-signal">Headline</span>
          </p>
        )}
        {other && (
          <p>
            <span className="block font-serif text-[2.2rem] leading-none text-faint">{other.value}</span>
            <span className="mt-1.5 block text-[12.5px] leading-snug text-faint">{other.label}</span>
            <span className="mt-0.5 block text-[12px] text-faint">Optimistic</span>
          </p>
        )}
      </div>
    </div>
  );
}

/** Summary for engineers, one-liner for recruiters; both server-rendered, CSS picks one. */
function Summary({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <>
      <p className={`eng-only ${className}`}>{project.summary}</p>
      <p className={`rec-only ${className}`}>{project.recruiterLine}</p>
    </>
  );
}

export function LargeProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`card-${project.slug}`}
      className="reveal ticks flex flex-col gap-10 rounded-md border border-line bg-ink-2/70 p-6 sm:p-8 lg:flex-row lg:gap-12"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <Meta project={project} />
        <h3 id={`card-${project.slug}`} className="display mt-5 text-[2.7rem] leading-none text-paper sm:text-[3.4rem]">
          <Link href={`/projects/${project.slug}`} className="hover:text-signal">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-[17px] text-signal">{project.subtitle}</p>
        <Summary project={project} className="mt-5 max-w-2xl text-[16px] leading-relaxed text-paper/90" />
        {project.callout && (
          <p className="mt-4 max-w-2xl border-l-2 border-signal-line pl-3 text-[13px] leading-relaxed text-mute">
            {project.callout}
          </p>
        )}
        <div className="mt-7">
          <Metrics metrics={project.metrics} />
        </div>
        <div className="mt-6">
          <StackList items={project.stack} limit={9} />
        </div>
        <div className="mt-auto pt-7">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div className="eng-only lg:w-[40%] lg:max-w-md lg:shrink-0 lg:border-l lg:border-line lg:pl-10">
        <FlowDiagram flow={project.architecture} />
      </div>
    </article>
  );
}

export function MediumProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <article
      aria-labelledby={`card-${project.slug}`}
      className={`reveal flex flex-col rounded-md border border-line bg-ink-2/70 p-6 transition-colors hover:border-line-strong sm:p-7 ${className}`}
    >
      <Meta project={project} />
      <h3 id={`card-${project.slug}`} className="display mt-4 text-[2.2rem] leading-none text-paper">
        <Link href={`/projects/${project.slug}`} className="hover:text-signal">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-[15.5px] text-signal">{project.subtitle}</p>
      <Summary project={project} className="mt-4 text-[15px] leading-relaxed text-paper/90" />

      {project.honesty ? (
        <HonestyStrip project={project} />
      ) : (
        <div className="mt-5">
          <Metrics metrics={project.metrics.slice(0, 2)} size="sm" />
        </div>
      )}

      <FlowChips flow={project.architecture} className="eng-only mt-5" />
      <div className="mt-5">
        <StackList items={project.stack} limit={6} />
      </div>
      <div className="mt-auto pt-6">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function SmallProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`card-${project.slug}`}
      className="reveal flex flex-col rounded-md border border-line bg-ink-2/50 p-5 transition-colors hover:border-line-strong"
    >
      <Meta project={project} />
      <h3 id={`card-${project.slug}`} className="display mt-3.5 text-[1.7rem] leading-none text-paper">
        <Link href={`/projects/${project.slug}`} className="hover:text-signal">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 text-[13px] text-mute">{project.subtitle}</p>
      <Summary project={project} className="mt-3 text-[14px] leading-relaxed text-paper/85" />
      <div className="mt-4">
        <StackList items={project.stack} limit={4} />
      </div>
      <div className="mt-auto pt-5">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
