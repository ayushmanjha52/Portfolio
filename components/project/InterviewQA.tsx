import { Plus } from "lucide-react";
import type { QA } from "@/data/projects";

export function InterviewQA({ items, idPrefix }: { items: QA[]; idPrefix: string }) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-md border border-line bg-ink-2/70">
      {items.map((qa, i) => (
        <li key={qa.q}>
          <details className="group" id={`${idPrefix}-q${i + 1}`}>
            <summary className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-ink-3 sm:px-6">
              <span className="pt-0.5 font-mono text-[11px] tracking-[0.12em] text-signal">
                Q{String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[15.5px] leading-snug text-paper">{qa.q}</span>
              <Plus aria-hidden="true" className="qa-plus mt-0.5 size-4 shrink-0 text-faint transition-transform duration-200" />
            </summary>
            <div className="px-5 pb-5 pl-[3.4rem] sm:px-6 sm:pl-[3.65rem]">
              <p className="text-[15px] leading-relaxed text-paper/85">{qa.a}</p>
              {qa.evidence && (
                <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-faint">
                  <span className="uppercase tracking-[0.16em] text-mute">Evidence</span> · {qa.evidence}
                </p>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
