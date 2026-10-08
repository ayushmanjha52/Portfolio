import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { journey } from "@/data/experience";
import { SignalToDecision } from "./SignalToDecision";

export function HowIWork() {
  return (
    <Section
      id="engineering"
      index="01"
      eyebrow="How I work"
      title={
        <>
          From signal to decision.
          <span className="block text-mute">The same seven steps, five times.</span>
        </>
      }
      intro="Every system on this site follows one progression: a real-world problem, the data or signal it leaves behind, analysis, a model, a system design, the software, and the decision it supports."
      className="eng-only"
    >
      <SignalToDecision />
    </Section>
  );
}

export function EngineeringJourney() {
  return (
    <>
      <Section
        id="journey"
        index="04"
        eyebrow="Engineering journey"
        title="Electrical engineering, extended into software."
        intro="Each stage added a layer rather than replacing the last: signals need data skills, models need validation discipline, and models only matter once they are inside a system someone uses."
        className="eng-only"
      >
        <ol className="relative grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {journey.map((stage, i) => (
            <li key={stage.id} className="reveal relative flex flex-col bg-ink-2 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{stage.period}</span>
              </div>
              <h3 className="display mt-5 text-[1.85rem] leading-none text-paper">
                {stage.title}
                {i < journey.length - 1 && (
                  <span aria-hidden="true" className="ml-2 text-faint">
                    →
                  </span>
                )}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-mute">{stage.thesis}</p>
              <ul className="mt-5 space-y-1 border-t border-line pt-4 text-[13px]">
                {stage.evidence.map((e) =>
                  e.href ? (
                    <li key={e.label}>
                      <Link href={e.href} className="text-paper underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                        {e.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={e.label} className="text-paper/85">
                      {e.label}
                    </li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ol>

        <Link
          href="/interview"
          className="group mt-8 flex flex-col gap-4 rounded-md border border-signal-line bg-signal-soft p-6 transition-colors hover:bg-signal/15 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <MessagesSquare aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" strokeWidth={1.5} />
            <div>
              <p className="display text-[1.6rem] leading-none text-signal">Interview mode</p>
              <p className="mt-1 text-[15px] text-paper">
                Every question an interviewer can ask me about these projects — with the answer and the file that proves it.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-paper">
            Open
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Section>
    </>
  );
}
