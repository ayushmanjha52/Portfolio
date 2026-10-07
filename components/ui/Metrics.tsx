import type { Metric } from "@/data/projects";

export function Metrics({ metrics, size = "md" }: { metrics: Metric[]; size?: "sm" | "md" | "lg" }) {
  if (metrics.length === 0) return null;
  const value =
    size === "lg" ? "text-3xl sm:text-4xl" : size === "md" ? "text-2xl sm:text-[1.7rem]" : "text-xl";
  // Columns follow the count so no empty hairline cells appear.
  const cols =
    metrics.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : metrics.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : metrics.length === 2
          ? "grid-cols-2"
          : "grid-cols-1";
  return (
    <dl className={`grid gap-px overflow-hidden rounded-md border border-line bg-line ${cols}`}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse justify-end gap-1.5 bg-ink-2 p-4">
          <dt className="text-[12px] leading-snug text-mute">{m.label}</dt>
          <dd className={`font-mono font-medium tracking-tight text-paper tabular-nums ${value}`}>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
