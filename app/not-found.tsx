import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">404 · No return</p>
        <h1 className="display mt-6 text-6xl text-paper sm:text-7xl">Signal lost.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-mute">
          Nothing answered at this address. The work is still where it was.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-[15px] font-medium">
          <Link href="/" className="rounded-full bg-signal px-5 py-2.5 text-ink">
            Home
          </Link>
          <Link href="/projects" className="rounded-full border border-line-strong px-5 py-2.5 text-paper hover:border-paper">
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
