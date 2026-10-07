import Link from "next/link";
import { ArrowUpRight, Download, Phone } from "lucide-react";
import { Portrait } from "@/components/site/Portrait";
import { achievements, education, profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";

const top = [
  "plantdesk",
  "local-energy-market",
  "tokengrid",
  "whatsapp-crm",
  "rescuegrid",
  "doppelganger-entity-resolution",
  "field-device-predictive-maintenance",
];

/** The 30-second view. Rendered only in recruiter mode. */
export function RecruiterBrief() {
  const degree = education[0];
  return (
    <section id="about" aria-labelledby="about-title" className="rec-only border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="about-title" className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            The 30-second brief
          </h2>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            Switch to Engineer mode for architecture and validation
          </p>
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
          <div className="bg-ink-2 p-6">
            <div className="flex items-center gap-4">
              <Portrait size={72} />
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Who</p>
                <p className="mt-1 text-[17px] font-medium text-paper">{profile.name}</p>
                <a href={profile.phoneHref} className="text-[13px] text-mute hover:text-paper">
                  {profile.phone}
                </a>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-paper">
              {degree.degree}, {degree.institution} ({degree.period}). {degree.detail}.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-mute">
              Builds intelligent software for real engineering and business problems: real-time platforms, industrial maintenance, energy
              markets, AI infrastructure, ML and data.
            </p>
          </div>

          <div className="bg-ink-2 p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Experience</p>
            <ul className="mt-3 space-y-3">
              {experience.map((e) => (
                <li key={e.company}>
                  <p className="text-[15px] text-paper">
                    {e.role} · {e.company}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{e.period}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Recognition</p>
            <ul className="mt-2 space-y-1 text-[14px] text-mute">
              {achievements.map((a) => (
                <li key={a.title}>
                  <span className="text-paper">{a.kind}</span> — {a.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink-2 p-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Top projects</p>
            <ol className="mt-3 space-y-2.5">
              {top.map((slug, i) => {
                const p = getProject(slug)!;
                return (
                  <li key={slug} className="grid grid-cols-[1.5rem_1fr] gap-2">
                    <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <Link href={`/projects/${slug}`} className="group">
                      <span className="text-[15px] text-paper group-hover:text-signal">{p.title}</span>
                      <span className="block text-[13px] leading-snug text-mute">{p.subtitle}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={profile.resumePdf}
                download
                className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink"
              >
                <Download aria-hidden="true" className="size-3.5" />
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper"
              >
                Email
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
              <a
                href={profile.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper"
              >
                <Phone aria-hidden="true" className="size-3.5" />
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
