import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      index="06"
      eyebrow="Skills"
      title="Tools, and where they were used."
      intro="No self-rated bars. Each skill names the public work that uses it; skills without a name come from the resume or internship work."
    >
      <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((g) => (
          <section key={g.id} aria-labelledby={`skills-${g.id}`} className="reveal bg-ink-2 p-6">
            <h3 id={`skills-${g.id}`} className="display text-[1.75rem] leading-none text-paper">
              {g.title}
            </h3>
            <dl className="mt-4 divide-y divide-line">
              {g.skills.map((s) => (
                <div key={s.name} className="flex items-baseline justify-between gap-4 py-2">
                  <dt className="text-[14.5px] text-paper">{s.name}</dt>
                  <dd className="text-right text-[12px] leading-snug text-faint">{s.where ?? ""}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Section>
  );
}
