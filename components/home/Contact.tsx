import { Download, Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import { Portrait } from "@/components/site/Portrait";
import { profile } from "@/data/profile";

// Colour classes are kept separate so the primary button never carries two text colours.
const buttonBase =
  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors";
const button = `${buttonBase} border-line-strong text-paper hover:border-paper`;
const primaryButton = `${buttonBase} border-signal bg-signal font-medium text-ink`;

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span className="eng-only text-signal">08</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          Contact
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div>
            <h2 id="contact-title">
              <span className="block font-mono text-sm uppercase tracking-[0.3em] text-signal">{profile.name}</span>
              <span className="display mt-4 block text-[clamp(3rem,7.4vw,5.75rem)] leading-[0.92] text-paper">
                Engineering <em className="text-signal">intelligent</em> systems.
              </span>
            </h2>
            <p className="mt-6 text-[17px] text-mute">
              {profile.disciplines.join("  ×  ")}
            </p>

            <blockquote className="display mt-10 max-w-3xl border-l-2 border-signal pl-6 text-[1.9rem] leading-snug text-paper sm:text-[2.3rem]">
              <p>{profile.closing[0]}</p>
              <p className="mt-2 italic text-paper/75">{profile.closing[1]}</p>
            </blockquote>
          </div>

          <figure className="ticks w-fit p-2">
            <Portrait size={240} shape="frame" />
            <figcaption className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              {profile.location}
            </figcaption>
          </figure>
        </div>

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
            <a href={profile.phoneHref} className={button} aria-label={`Call ${profile.phone}`}>
              <Phone aria-hidden="true" className="size-4" /> {profile.phone}
            </a>
            <a href={profile.resumePdf} download className={primaryButton}>
              <Download aria-hidden="true" className="size-4" /> Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
