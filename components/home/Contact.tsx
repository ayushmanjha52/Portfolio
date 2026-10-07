import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import { profile } from "@/data/profile";

const button =
  "inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span className="eng-only text-signal">08</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          Contact
        </p>

        <h2 id="contact-title" className="mt-8">
          <span className="block font-mono text-sm uppercase tracking-[0.3em] text-signal">{profile.name}</span>
          <span className="mt-4 block text-[clamp(2.2rem,6vw,4.2rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-paper">
            Engineering intelligent systems<span className="text-signal">.</span>
          </span>
        </h2>
        <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.14em] text-mute">
          {profile.disciplines.join("  ×  ")}
        </p>

        <blockquote className="mt-10 max-w-3xl border-l-2 border-signal pl-5 text-xl leading-relaxed text-paper sm:text-2xl">
          <p>{profile.closing[0]}</p>
          <p className="mt-2 text-paper/80">{profile.closing[1]}</p>
        </blockquote>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Available for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.availableFor.map((a) => (
                <li key={a} className="rounded-full border border-line px-3 py-1 text-[13px] text-paper/90">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className={button}>
              <GitHubIcon className="size-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={button}>
              <LinkedInIcon className="size-4" /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className={button}>
              <Mail aria-hidden="true" className="size-4" /> Email
            </a>
            <a href={profile.resumePdf} download className={`${button} border-signal bg-signal text-ink hover:border-signal`}>
              <Download aria-hidden="true" className="size-4" /> Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
