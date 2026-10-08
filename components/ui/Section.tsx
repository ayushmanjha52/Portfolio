type SectionProps = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, index, eyebrow, title, intro, className = "", children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading index={index} eyebrow={eyebrow} title={title} intro={intro} id={headingId} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
  as: Heading = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
      <div>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          {/* Numbers follow the full engineer view; recruiter mode skips sections, so it hides them. */}
          {index && <span className="eng-only text-signal">{index}</span>}
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
        <Heading id={id} className="display mt-5 text-[2.6rem] leading-[1.02] text-paper sm:text-[3.2rem] lg:text-[3.75rem]">
          {title}
        </Heading>
      </div>
      {intro && <p className="max-w-xl text-[16.5px] leading-relaxed text-mute lg:justify-self-end">{intro}</p>}
    </div>
  );
}
