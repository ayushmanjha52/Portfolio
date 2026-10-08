"use client";

import { setMode } from "@/lib/use-mode";

export function EngineerModeButton({ label = "Switch to Engineer mode" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => setMode("engineer")}
      className="inline-flex items-center rounded-full border border-signal-line px-4 py-2 text-[14px] font-medium text-signal transition-colors hover:bg-signal-soft"
    >
      {label}
    </button>
  );
}
