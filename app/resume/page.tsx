import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import { Chip } from "@/components/ui/Badges";
import { achievements, education, profile, resumeSkills } from "@/data/profile";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Ayushman Jha — B.Tech Electrical Engineering, BIT Sindri. AI/ML and data internships, projects and achievements.",
  alternates: { canonical: "/resume" },
};

const selected = ["plantdesk", "local-energy-market", "tokengrid", "doppelganger-entity-resolution", "field-device-predictive-maintenance", "whatsapp-crm", "rescuegrid"];

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-line pb-2 font-mono text-[11.5px] uppercase tracking-[0.22em] text-signal">{children}</h2>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Resume</p>
          <h1 className="mt-4 text-4xl font-semibold uppercase tracking-tight text-paper sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-mute">B.Tech, Electrical Engineering</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-mute">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-paper">
                <Mail aria-hidden="true" className="size-4" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                <LinkedInIcon className="size-3.5" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                <GitHubIcon className="size-3.5" /> github.com/{profile.githubHandle}
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink"
          >
            <Download aria-hidden="true" className="size-4" /> Download resume
          </a>
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper hover:border-paper"
          >
            <FileText aria-hidden="true" className="size-4" /> Open PDF
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-12">
          <section aria-label="Experience">
            <H>Experience</H>
            <div className="mt-5 space-y-8">
              {experience.map((e) => (
                <div key={e.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[17px] font-medium text-paper">
                      {e.role} · {e.company}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{e.period}</p>
                  </div>
                  <p className="text-[13px] text-faint">{e.mode}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-paper/90 marker:text-signal">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[13px] text-mute">Technologies: {e.stack.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Selected projects">
            <H>Selected projects</H>
            <ul className="mt-5 space-y-5">
              {selected.map((slug) => {
                const p = getProject(slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/projects/${slug}`} className="group inline-flex items-center gap-1.5">
                      <span className="text-[16px] font-medium text-paper group-hover:text-signal">{p.title}</span>
                      <ArrowUpRight aria-hidden="true" className="size-3.5 text-faint" />
                    </Link>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">{p.subtitle}</p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-mute">{p.recruiterLine}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="space-y-12">
          <section aria-label="Education">
            <H>Education</H>
            <ul className="mt-5 space-y-5">
              {education.map((ed) => (
                <li key={ed.institution}>
                  <h3 className="text-[16px] font-medium text-paper">{ed.degree}</h3>
                  <p className="text-[14px] text-mute">{ed.institution}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {ed.period} · {ed.location}
                  </p>
                  <p className="mt-1 text-[14px] text-paper/90">{ed.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Skills">
            <H>Skills</H>
            <dl className="mt-5 space-y-4">
              {resumeSkills.map((g) => (
                <div key={g.group}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{g.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-label="Achievements">
            <H>Achievements</H>
            <ul className="mt-5 space-y-4">
              {achievements.map((a) => (
                <li key={a.title}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{a.kind}</p>
                  <p className="text-[15px] text-paper">{a.title}</p>
                  {a.detail && <p className="text-[13px] text-mute">{a.detail}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
