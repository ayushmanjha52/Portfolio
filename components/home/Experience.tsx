import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Badges";
import { experience } from "@/data/experience";
import { education } from "@/data/profile";

export function Experience() {
  return (
    <Section id="experience" index="05" eyebrow="Experience" title="Internships and education.">
      <div className="grid gap-6 lg:grid-cols-2">
        {experience.map((e) => (
          <article key={e.company} className="reveal flex flex-col rounded-md border border-line bg-ink-2/70 p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{e.period}</p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{e.mode}</p>
            </div>
            <h3 className="display mt-4 text-[2.1rem] leading-none text-paper">{e.role}</h3>
            <p className="text-[15px] text-mute">{e.company}</p>
            <ul className="mt-5 space-y-2.5">
              {e.bullets.map((b) => (
                <li key={b} className="grid grid-cols-[0.75rem_1fr] gap-2 text-[15px] leading-relaxed text-paper/90">
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-2 bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {e.stack.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
            {e.related && (
              <Link
                href={e.related.href}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14.5px] font-medium text-mute hover:text-paper"
              >
                Related · {e.related.label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
        {education.map((ed) => (
          <div key={ed.institution} className="reveal bg-ink-2 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{ed.period}</p>
            <h3 className="display mt-3 text-[1.6rem] leading-tight text-paper">{ed.degree}</h3>
            <p className="text-[14px] text-mute">
              {ed.institution} · {ed.location}
            </p>
            <p className="mt-2 font-mono text-[12px] text-paper">{ed.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
