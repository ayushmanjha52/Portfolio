import { Award, Trophy } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { achievements } from "@/data/profile";

export function Achievements() {
  return (
    <Section id="achievements" index="07" eyebrow="Achievements" title="Hackathons and innovation programmes.">
      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
        {achievements.map((a) => {
          const Icon = a.kind === "Winner" ? Trophy : Award;
          return (
            <li key={a.title} className="reveal flex flex-col bg-ink-2 p-6">
              <div className="flex items-center gap-2.5">
                <Icon aria-hidden="true" className="size-4 text-signal" strokeWidth={1.75} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{a.kind}</span>
              </div>
              <h3 className="mt-4 text-[17px] font-medium leading-snug text-paper">{a.title}</h3>
              {a.detail && <p className="mt-2 text-[14px] leading-relaxed text-mute">{a.detail}</p>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
