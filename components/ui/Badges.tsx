import type { Maturity } from "@/data/projects";
import { maturityLabels } from "@/data/projects";

export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-line bg-signal-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
      <span aria-hidden="true" className="size-1.5 animate-blink rounded-full bg-signal" />
      Live demo
    </span>
  );
}

export function MaturityBadge({ maturity }: { maturity: Maturity }) {
  if (!maturity) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
      {maturityLabels[maturity]}
    </span>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[3px] border border-line bg-ink-3 px-2 py-0.5 font-mono text-[11px] text-mute">
      {children}
    </span>
  );
}

export function StackList({ items, limit }: { items: string[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {shown.map((s) => (
        <li key={s}>
          <Chip>{s}</Chip>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Chip>+{rest}</Chip>
        </li>
      )}
    </ul>
  );
}
