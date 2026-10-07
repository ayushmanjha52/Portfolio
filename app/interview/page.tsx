import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { InterviewQA } from "@/components/project/InterviewQA";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Interview mode",
  description:
    "Questions an interviewer can ask Ayushman Jha about each project — multi-tenant isolation, market clearing, asynchronous metering, entity resolution, time-based validation and radar — with answers and the repository evidence.",
  alternates: { canonical: "/interview" },
};

export default function InterviewPage() {
  const withQuestions = [...projects].filter((p) => p.interview.length > 0).sort((a, b) => a.rank - b.rank);
  const total = withQuestions.reduce((n, p) => n + p.interview.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Interview mode"
        title={
          <>
            Ask me anything about the work.
            <span className="block text-mute">{total} questions, answered.</span>
          </>
        }
        intro="The questions an interviewer is likely to ask about each project, with the answer I would give and the file in the repository that backs it up."
      />

      <nav aria-label="Projects" className="mt-10 flex flex-wrap gap-2">
        {withQuestions.map((p) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-mute hover:border-line-strong hover:text-paper"
          >
            {p.title} <span className="text-faint">{p.interview.length}</span>
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {withQuestions.map((p) => (
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-iq`} className="anchor">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
              <div>
                <h2 id={`${p.slug}-iq`} className="text-xl font-semibold tracking-tight text-paper">
                  {p.title}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">{p.subtitle}</p>
              </div>
              <Link
                href={`/projects/${p.slug}`}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mute hover:text-paper"
              >
                Case study <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <div className="mt-5">
              <InterviewQA items={p.interview} idPrefix={`iv-${p.slug}`} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
