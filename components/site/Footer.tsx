import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-[26px] leading-none text-paper">{profile.name}</p>
          <p className="mt-2 text-sm text-mute">{profile.headline}.</p>
          <p className="mt-6 max-w-sm text-xs leading-relaxed text-faint">
            Every project claim on this site was checked against its public repository in October 2026. Where a
            repository does not say something, this site does not claim it.
          </p>
        </div>
        <nav aria-label="Footer: site">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Site</p>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li><Link className="hover:text-paper" href="/projects">All projects</Link></li>
            <li className="eng-only"><Link className="hover:text-paper" href="/interview">Interview mode</Link></li>
            <li><Link className="hover:text-paper" href="/github">GitHub repositories</Link></li>
            <li><Link className="hover:text-paper" href="/resume">Resume</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer: elsewhere">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li><a className="hover:text-paper" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="hover:text-paper" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="hover:text-paper" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="hover:text-paper" href={profile.phoneHref}>{profile.phone}</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint sm:px-6 lg:px-8">
          © 2026 {profile.name} · Built with Next.js, TypeScript, Tailwind and Motion
        </p>
      </div>
    </footer>
  );
}
