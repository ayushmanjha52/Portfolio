import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";
import { LiveBadge, MaturityBadge, StackList } from "@/components/ui/Badges";
import { Metrics } from "@/components/ui/Metrics";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { InterviewQA } from "@/components/project/InterviewQA";
import { ModelHonesty } from "@/components/project/ModelHonesty";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { GitHubIcon } from "@/components/site/BrandIcons";
import { EngineerModeButton } from "@/components/site/EngineerModeButton";

// Case studies are pure data: keep the whole route static. This also makes an unknown slug
// resolve notFound() before streaming starts, so it returns a real 404 rather than a soft one.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title} — ${p.subtitle}`, description: p.summary, url: `/projects/${p.slug}`, type: "article" },
  };
}

type TocItem = { id: string; label: string; engineerOnly?: boolean };

function tocFor(p: Project): TocItem[] {
  const items: TocItem[] = [
    { id: "problem", label: "Problem" },
    { id: "why", label: "Why it matters" },
    { id: "system", label: "System" },
    { id: "architecture", label: "Architecture", engineerOnly: true },
    { id: "decisions", label: "Technical decisions", engineerOnly: true },
    { id: "data-flow", label: "Data flow", engineerOnly: true },
  ];
  if (p.honesty) items.push({ id: "honesty", label: "Model honesty" });
  items.push({ id: "results", label: "Results" });
  items.push({ id: "limitations", label: "Limitations", engineerOnly: true });
  items.push({ id: "stack", label: "Tech stack" });
  if (p.interview.length) items.push({ id: "interview", label: "Interview mode", engineerOnly: true });
  return items.filter((t) => !(t.id === "decisions" && p.decisions.length === 0));
}

function Block({
  id,
  label,
  engineerOnly,
  children,
}: {
  id: string;
  label: string;
  engineerOnly?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`border-t border-line py-10 ${engineerOnly ? "eng-only" : ""}`}>
      <h2 id={`${id}-h`} className="font-mono text-[11.5px] uppercase tracking-[0.22em] text-signal">
        {label}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const ordered = [...projects].sort((a, b) => a.rank - b.rank);
  const idx = ordered.findIndex((x) => x.slug === p.slug);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];
  const toc = tocFor(p);

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16">
          <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/#work" className="hover:text-paper">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-paper">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-mute">
                {p.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{String(p.rank).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{p.period}</span>
            {p.live && <LiveBadge />}
            <MaturityBadge maturity={p.maturity} />
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-paper sm:text-5xl lg:text-6xl">{p.title}</h1>
          <p className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-signal">{p.subtitle}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/90">{p.summary}</p>
          {p.maturityNote && <p className="mt-3 max-w-3xl text-[14px] text-mute">{p.maturityNote}</p>}
          {p.callout && (
            <p className="mt-5 max-w-3xl border-l-2 border-signal-line pl-4 text-[14.5px] leading-relaxed text-mute">{p.callout}</p>
          )}

          {p.metrics.length > 0 && (
            <div className="mt-9 max-w-4xl">
              <Metrics metrics={p.metrics} size="lg" />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {p.repos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper"
              >
                <GitHubIcon className="size-4" />
                {r.name}
                {r.note && <span className="normal-case tracking-normal text-faint">· {r.note}</span>}
              </a>
            ))}
            {p.live && (
              <a
                href={p.live.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink"
              >
                Live demo
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>
          {p.live?.note && <p className="mt-3 text-[13px] text-faint">{p.live.note}</p>}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:px-8">
        {/* Table of contents */}
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24 py-10">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">On this page</p>
            <ol className="mt-4 space-y-2 border-l border-line">
              {toc.map((t) => (
                <li key={t.id} className={t.engineerOnly ? "eng-only" : undefined}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13px] text-mute hover:border-signal hover:text-paper">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 max-w-3xl pb-16">
          <div className="rec-only mt-10 flex flex-col gap-3 rounded-md border border-line bg-ink-2 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-mute">
              Recruiter view. Engineer mode adds the architecture, technical decisions, data flow, limitations and
              interview questions.
            </p>
            <EngineerModeButton />
          </div>

          <Block id="problem" label="Problem">
            <p className="text-[17px] leading-relaxed text-paper/90">{p.problem}</p>
          </Block>

          <Block id="why" label="Why it matters">
            <p className="text-[17px] leading-relaxed text-paper/90">{p.whyItMatters}</p>
          </Block>

          <Block id="system" label="System">
            <ul className="space-y-3">
              {p.system.map((s) => (
                <li key={s} className="grid grid-cols-[0.9rem_1fr] gap-2 text-[15.5px] leading-relaxed text-paper/90">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-signal" />
                  {s}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="architecture" label="Architecture" engineerOnly>
            <div className="rounded-md border border-line bg-ink-2/70 p-5 sm:p-7">
              <FlowDiagram flow={p.architecture} />
            </div>
          </Block>

          {p.decisions.length > 0 && (
            <Block id="decisions" label="Technical decisions" engineerOnly>
              <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
                {p.decisions.map((d) => (
                  <li key={d.title} className="bg-ink-2 p-5">
                    <h3 className="text-[15.5px] font-medium leading-snug text-paper">{d.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-mute">{d.detail}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block id="data-flow" label="Data flow" engineerOnly>
            <div className="rounded-md border border-line bg-ink-2/70 p-5 sm:p-7">
              <FlowDiagram flow={p.dataFlow} />
            </div>
          </Block>

          {p.honesty && (
            <Block id="honesty" label={p.honesty.title}>
              <ModelHonesty data={p.honesty} />
            </Block>
          )}

          <Block id="results" label="Results">
            {p.results.length > 0 ? (
              <ul className="space-y-3">
                {p.results.map((r) => (
                  <li key={r} className="grid grid-cols-[0.9rem_1fr] gap-2 text-[15.5px] leading-relaxed text-paper/90">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-signal" />
                    {r}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-mute">No measured results are claimed for this project.</p>
            )}
            {p.media && p.media.length > 0 && (
              <div className="mt-8">
                <ProjectMedia items={p.media} />
              </div>
            )}
          </Block>

          <Block id="limitations" label="Limitations" engineerOnly>
            <ul className="space-y-3">
              {p.limitations.map((l) => (
                <li key={l} className="grid grid-cols-[0.9rem_1fr] gap-2 text-[15.5px] leading-relaxed text-paper/85">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-faint" />
                  {l}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="stack" label="Tech stack">
            <StackList items={p.stack} />
          </Block>

          {p.interview.length > 0 && (
            <Block id="interview" label="Interview mode — what an interviewer can ask me" engineerOnly>
              <InterviewQA items={p.interview} idPrefix={p.slug} />
            </Block>
          )}

          {/* Previous / next */}
          <nav aria-label="More projects" className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group bg-ink-2 p-5 hover:bg-ink-3">
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  <ArrowLeft aria-hidden="true" className="size-3.5" /> Previous
                </span>
                <span className="mt-2 block text-[15px] text-paper group-hover:text-signal">{prev.title}</span>
              </Link>
            ) : (
              <span className="bg-ink-2" />
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group bg-ink-2 p-5 text-right hover:bg-ink-3">
                <span className="flex items-center justify-end gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  Next <ArrowRight aria-hidden="true" className="size-3.5" />
                </span>
                <span className="mt-2 block text-[15px] text-paper group-hover:text-signal">{next.title}</span>
              </Link>
            ) : (
              <span className="bg-ink-2" />
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
