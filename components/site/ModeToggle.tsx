"use client";

import { setMode, useMode } from "@/lib/use-mode";
import type { Mode } from "@/lib/mode";

const options: { value: Mode; label: string; hint: string }[] = [
  { value: "engineer", label: "Engineer", hint: "Architecture, decisions, validation and interview questions" },
  { value: "recruiter", label: "Recruiter", hint: "The 30-second view: profile, top projects, experience, contact" },
];

export function ModeToggle({ className = "" }: { className?: string }) {
  const mode = useMode();

  return (
    <div
      role="group"
      aria-label="View mode"
      className={`relative inline-flex items-center rounded-full border border-line-strong bg-ink-2 p-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] ${className}`}
    >
      {options.map((o) => {
        const active = mode === o.value;
        return (
          <button
            key={o.value}
            type="button"
            title={o.hint}
            aria-pressed={active}
            onClick={() => setMode(o.value)}
            className={`relative rounded-full px-3 py-1.5 font-mono uppercase tracking-[0.14em] transition-colors duration-200 ${
              active ? "bg-paper text-ink" : "text-mute hover:text-paper"
            }`}
          >
            {o.label}
            <span className="sr-only"> mode</span>
          </button>
        );
      })}
    </div>
  );
}
