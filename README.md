# Ayushman Jha — Engineering Intelligent Systems

Personal portfolio. Electrical Engineering × AI/ML × Data × Software.

Every project claim on the site was checked against its public repository (README, docs, model
cards, source and tests) in October 2026. If a repository does not say something, the site does
not claim it.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 ·
Motion · Lucide. Every page is statically prerendered.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npx tsc --noEmit && npm run lint
```

## Content lives in `data/`

| File | What |
| --- | --- |
| `data/projects.ts` | Every project: problem, system, architecture and data-flow diagrams, decisions, results, limitations, stack, repos, live demo, interview Q&A. Drives the homepage cards, `/projects`, `/projects/[slug]` and `/interview`. |
| `data/experience.ts` | Internships (from the resume) and the engineering-journey timeline. |
| `data/profile.ts` | Name, links, education, achievements, resume skills. |
| `data/skills.ts` | Skill groups, each skill tied to the work that uses it. |
| `data/repos.ts` | The `/github` repository index. |
| `data/domains.ts`, `data/story.ts` | Hero system map, "What I build", and the signal-to-decision story. |

The resume PDF is `public/resume/Ayushman_Jha_Resume.pdf`; replace the file to update it.

## Features

- **Engineering system map** — interactive hero: six domains traced to their projects.
- **Recruiter / Engineer mode** — a header toggle. Recruiter mode shows a 30-second brief, top
  projects, experience, skills, achievements and contact; Engineer mode adds architecture,
  decisions, validation, limitations and interview questions. The choice is remembered.
  Share `/?mode=recruiter` to open the site directly in recruiter mode.
- **Interview mode** — `/interview` and each case study list the questions an interviewer can ask,
  with answers and the repository file that backs each one.
- **Model honesty** — headline accuracy is always the time-based holdout, never shuffled CV.
- Respects `prefers-reduced-motion`; CSS scroll-driven reveals degrade to plain content.

## Routes

`/` · `/projects` · `/projects/[slug]` · `/github` · `/resume` · `/interview` · `/sitemap.xml` ·
`/robots.txt` · `/opengraph-image`

## Deploy

Works on any Next.js host (Vercel recommended). Set `NEXT_PUBLIC_SITE_URL` to the production URL
so canonical links, the sitemap and Open Graph images use the right domain (on Vercel the
production URL is picked up automatically if it is not set).
