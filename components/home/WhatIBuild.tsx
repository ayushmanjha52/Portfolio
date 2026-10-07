import Link from "next/link";
import { BrainCircuit, Database, Factory, Network, Sun, Workflow, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { buildDomains } from "@/data/domains";

const icons: Record<(typeof buildDomains)[number]["icon"], LucideIcon> = {
  sun: Sun,
  factory: Factory,
  workflow: Workflow,
  network: Network,
  brain: BrainCircuit,
  database: Database,
};

export function WhatIBuild() {
  return (
    <Section
      id="build"
      index="02"
      eyebrow="What I build"
      title="Six domains. One engineering habit."
      intro="Start from a physical or business system, find the signal in its data, and build software that turns it into a decision someone can act on."
      className="eng-only"
    >
      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {buildDomains.map((d) => {
          const Icon = icons[d.icon];
          return (
            <li key={d.n} className="reveal group relative flex flex-col bg-ink-2 p-6 transition-colors hover:bg-ink-3">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{d.n}</span>
                <Icon aria-hidden="true" className="size-5 text-faint transition-colors group-hover:text-signal" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-mono text-[13px] uppercase tracking-[0.16em] text-paper">{d.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-mute">{d.line}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4">
                {d.projects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-[13px] text-paper underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
