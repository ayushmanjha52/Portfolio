import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { SystemMap } from "./SystemMap";
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import { Portrait } from "@/components/site/Portrait";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10 lg:px-8 lg:pb-24">
        <div>
          <div className="flex items-center gap-4">
            <Portrait size={60} preload />
            <div>
              <h1 id="hero-title" className="font-serif text-[30px] leading-none text-paper">
                {profile.name}
              </h1>
              <p className="mt-2 text-[14px] text-mute">
                B.Tech Electrical Engineering · BIT Sindri · 2023 – 2027
              </p>
            </div>
          </div>

          <p className="display mt-10 text-[clamp(3.4rem,9.6vw,7.4rem)] leading-[0.9] text-paper">
            Engineering <em className="text-signal">intelligent</em> systems.
          </p>

          <p className="mt-8 text-[17px] text-mute">
            {profile.disciplines.map((d, i) => (
              <span key={d} className="whitespace-nowrap">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-2.5 text-signal">
                    ×
                  </span>
                )}
                {d}
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-xl text-[19px] leading-relaxed text-paper/90">{profile.pitch}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-[15px] font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              View work
              <ArrowDown aria-hidden="true" className="size-3.5" />
            </Link>
            <a
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[15px] font-medium text-paper transition-colors hover:border-paper"
            >
              <Download aria-hidden="true" className="size-3.5" />
              Download resume
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line-strong sm:block" aria-hidden="true" />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full border border-line text-mute transition-colors hover:border-line-strong hover:text-paper"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="grid size-10 place-items-center rounded-full border border-line text-mute transition-colors hover:border-line-strong hover:text-paper"
            >
              <LinkedInIcon className="size-[17px]" />
            </a>
          </div>

          <div className="mt-10 border-t border-line pt-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Open to</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-mute">
              {profile.availableFor.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <SystemMap />
      </div>
    </section>
  );
}
