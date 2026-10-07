import { ChevronRight } from "lucide-react";
import type { Flow } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Vertical system diagram: numbered nodes joined by connectors that carry a travelling
 * signal pulse (CSS only; hidden under prefers-reduced-motion).
 */
export function FlowDiagram({
  flow,
  detailed = true,
  showTitle = true,
  className = "",
}: {
  flow: Flow;
  detailed?: boolean;
  showTitle?: boolean;
  className?: string;
}) {
  const last = flow.steps.length - 1;
  return (
    <figure className={className}>
      {showTitle && (
        <figcaption className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
          {flow.title}
        </figcaption>
      )}
      <ol className="relative">
        {flow.steps.map((step, i) => (
          <li key={`${step.label}-${i}`} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3.5">
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className={`grid size-7 shrink-0 place-items-center rounded-[4px] border font-mono text-[10px] tabular-nums ${
                  i === last ? "border-signal-line bg-signal-soft text-signal" : "border-line-strong bg-ink-3 text-mute"
                }`}
              >
                {pad(i + 1)}
              </span>
              {i < last && (
                <span
                  aria-hidden="true"
                  data-dir="v"
                  className="flow-connector min-h-3 w-px flex-1 bg-line-strong"
                  style={{ "--delay": `${i * 0.32}s` } as React.CSSProperties}
                />
              )}
            </div>
            <div className={i < last ? "pb-3.5" : ""}>
              <p className="pt-1 font-mono text-[12px] uppercase leading-snug tracking-[0.1em] text-paper">
                {step.label}
              </p>
              {detailed && step.detail && <p className="mt-1 text-[13px] leading-snug text-mute">{step.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Compact horizontal chain that wraps; used on medium cards. */
export function FlowChips({ flow, className = "" }: { flow: Flow; className?: string }) {
  return (
    <ol aria-label={flow.title} className={`flex flex-wrap items-center gap-x-1 gap-y-2 ${className}`}>
      {flow.steps.map((step, i) => (
        <li key={`${step.label}-${i}`} className="flex items-center gap-1">
          <span
            className={`rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
              i === flow.steps.length - 1 ? "border-signal-line text-signal" : "border-line text-mute"
            }`}
          >
            {step.label}
          </span>
          {i < flow.steps.length - 1 && <ChevronRight aria-hidden="true" className="size-3 text-faint" />}
        </li>
      ))}
    </ol>
  );
}
