"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { stages, storyExamples } from "@/data/story";

export function SignalToDecision() {
  const [activeId, setActiveId] = useState(storyExamples[0].id);
  const active = storyExamples.find((e) => e.id === activeId)!;
  const base = useId();

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + storyExamples.length) % storyExamples.length;
    setActiveId(storyExamples[next].id);
    document.getElementById(`${base}-tab-${storyExamples[next].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Examples" className="flex flex-wrap gap-2">
        {storyExamples.map((ex, i) => {
          const on = ex.id === activeId;
          return (
            <button
              key={ex.id}
              id={`${base}-tab-${ex.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActiveId(ex.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full border px-4 py-1.5 text-[14.5px] transition-colors ${
                on ? "border-signal bg-signal-soft text-signal" : "border-line text-mute hover:border-line-strong hover:text-paper"
              }`}
            >
              {ex.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${activeId}`}
        className="mt-8"
      >
          <AnimatePresence mode="wait" initial={false}>
            <m.ol
              key={active.id}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
              className="relative grid gap-0 lg:grid-cols-7 lg:gap-px lg:overflow-hidden lg:rounded-md lg:border lg:border-line lg:bg-line"
            >
              {stages.map((stage, i) => {
                const last = i === stages.length - 1;
                return (
                  <m.li
                    key={stage}
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.25 }}
                    className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3.5 lg:flex lg:flex-col lg:bg-ink-2 lg:p-4"
                  >
                    {/* Mobile: vertical rail */}
                    <div className="flex flex-col items-center lg:hidden">
                      <span
                        aria-hidden="true"
                        className={`grid size-7 place-items-center rounded-[4px] border font-mono text-[10px] ${
                          last ? "border-signal-line bg-signal-soft text-signal" : "border-line-strong bg-ink-3 text-mute"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {!last && (
                        <span
                          aria-hidden="true"
                          data-dir="v"
                          className="flow-connector min-h-4 w-px flex-1 bg-line-strong"
                          style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
                        />
                      )}
                    </div>

                    <div className={`${last ? "" : "pb-5"} lg:flex lg:h-full lg:flex-col lg:pb-0`}>
                      <p className="flex items-center gap-2 pt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint lg:pt-0">
                        <span className="hidden text-signal lg:inline">{String(i + 1).padStart(2, "0")}</span>
                        {stage}
                      </p>
                      <p className={`mt-1.5 text-[14px] leading-snug lg:mt-3 ${last ? "text-signal" : "text-paper"}`}>
                        {active.values[i]}
                      </p>
                    </div>

                    {/* Desktop: horizontal pulse along the top edge */}
                    {!last && (
                      <span
                        aria-hidden="true"
                        data-dir="h"
                        className="flow-connector absolute left-0 right-0 top-0 hidden h-px lg:block"
                        style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
                      />
                    )}
                  </m.li>
                );
              })}
            </m.ol>
          </AnimatePresence>

        <p className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-mute">
          Traced from
          <Link
            href={`/projects/${active.project.slug}`}
            className="inline-flex items-center gap-1 text-paper underline decoration-line-strong underline-offset-4 hover:decoration-signal"
          >
            {active.project.name}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
