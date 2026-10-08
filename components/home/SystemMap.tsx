"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { mapNodes, type MapNode } from "@/data/domains";

const C = 200; // centre of the 400×400 viewBox
const R = 146; // node ring radius
const OUTER = 186;

const nodes = mapNodes.map((n) => {
  const a = (n.angle * Math.PI) / 180;
  return { ...n, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
});

const ticks = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const long = i % 6 === 0;
  const r1 = OUTER;
  const r2 = OUTER + (long ? 9 : 4);
  return { x1: C + r1 * Math.cos(a), y1: C + r1 * Math.sin(a), x2: C + r2 * Math.cos(a), y2: C + r2 * Math.sin(a), long };
});

// A few fixed "returns" on the scope.
const blips = [
  { x: 262, y: 118, d: "0s" },
  { x: 128, y: 252, d: "0.8s" },
  { x: 244, y: 286, d: "1.6s" },
  { x: 150, y: 140, d: "2.2s" },
];

const hexPath = nodes.map((n, i) => `${i === 0 ? "M" : "L"}${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(" ") + " Z";

export function SystemMap() {
  const [selected, setSelected] = useState<MapNode["id"] | null>(null);
  const [preview, setPreview] = useState<MapNode["id"] | null>(null);
  const shownId = preview ?? selected;
  const shown = nodes.find((n) => n.id === shownId) ?? null;

  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="386" y1="200" x2="342" y2="80">
              <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0.26" />
              <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0.18" />
              <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Scope rings, crosshair, ticks */}
          {[46, 96, R, OUTER].map((r) => (
            <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="var(--color-line)" strokeWidth={r === R ? 1 : 0.75} />
          ))}
          <line x1={C - OUTER} y1={C} x2={C + OUTER} y2={C} stroke="var(--color-line)" strokeWidth="0.75" />
          <line x1={C} y1={C - OUTER} x2={C} y2={C + OUTER} stroke="var(--color-line)" strokeWidth="0.75" />
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.long ? "var(--color-line-strong)" : "var(--color-line)"}
              strokeWidth="1"
            />
          ))}

          {/* Radar sweep */}
          <g className="motion-decor animate-sweep" style={{ transformOrigin: "200px 200px", transformBox: "view-box" }}>
            <path d={`M${C} ${C} L386 ${C} A186 186 0 0 0 342.5 80.4 Z`} fill="url(#sweep)" />
            <line x1={C} y1={C} x2="386" y2={C} stroke="var(--color-signal)" strokeOpacity="0.55" strokeWidth="1" />
          </g>

          {blips.map((b) => (
            <circle
              key={`${b.x}-${b.y}`}
              cx={b.x}
              cy={b.y}
              r="1.8"
              fill="var(--color-signal)"
              className="motion-decor animate-blink"
              style={{ animationDelay: b.d }}
            />
          ))}

          {/* Domain ring and spokes into the core */}
          <path d={hexPath} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" />
          {nodes.map((n) => {
            const on = n.id === shownId;
            return (
              <line
                key={n.id}
                x1={n.x}
                y1={n.y}
                x2={C}
                y2={C}
                className="edge-flow"
                stroke={on ? "var(--color-signal)" : "var(--color-line-strong)"}
                strokeOpacity={on ? 0.9 : 1}
                strokeWidth={on ? 1.25 : 1}
              />
            );
          })}
          {nodes.map((n, i) => (
            <circle key={`p-${n.id}`} r="2.2" fill="var(--color-signal)" className="motion-decor">
              {/* Negative begin = already mid-path at load, so no pulse waits at the SVG origin. */}
              <animateMotion
                dur="3.2s"
                begin={`-${i * 0.55}s`}
                repeatCount="indefinite"
                path={`M${n.x.toFixed(1)} ${n.y.toFixed(1)} L${C} ${C}`}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))}

          {/* Core */}
          <circle cx={C} cy={C} r="40" fill="url(#core)" />
          <circle cx={C} cy={C} r="25" fill="var(--color-ink-2)" stroke="var(--color-signal-line)" />
          <circle cx={C} cy={C} r="2.5" fill="var(--color-signal)" />
          <text
            x={C}
            y={C + 13}
            textAnchor="middle"
            fill="var(--color-faint)"
            style={{ font: "500 6.5px var(--font-mono)", letterSpacing: "0.18em" }}
          >
            DECISION
          </text>
        </svg>

        {nodes.map((n) => {
          const on = n.id === shownId;
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={selected === n.id}
              aria-controls="system-map-readout"
              onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
              onMouseEnter={() => setPreview(n.id)}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview(n.id)}
              onBlur={() => setPreview(null)}
              style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 400) * 100}%` }}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-[4px] border bg-ink px-2 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-200 sm:px-2.5 sm:text-[11px] ${
                on ? "border-signal text-signal" : "border-line-strong text-paper hover:border-signal-line"
              }`}
            >
              <span aria-hidden="true" className={`size-1.5 rounded-[1px] ${on ? "bg-signal" : "bg-mute"}`} />
              {n.label}
            </button>
          );
        })}
      </div>

      <div
        id="system-map-readout"
        aria-live="polite"
        className="ticks mx-auto mt-4 min-h-[8.5rem] max-w-[460px] rounded-md border border-line bg-ink-2/80 p-4"
      >
          <AnimatePresence mode="wait" initial={false}>
            {shown ? (
              <m.div
                key={shown.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-signal">
                  Trace · {shown.label}
                </p>
                <p className="mt-2 font-serif text-[1.6rem] leading-none text-paper">{shown.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-mute">{shown.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {shown.projects.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[13px] text-paper underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                      >
                        {p.name}
                        <ArrowUpRight aria-hidden="true" className="size-3.5 text-faint" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </m.div>
            ) : (
              <m.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Engineering system map</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mute">
                  Six domains, one pattern: real-world signal in, a decision out. Select a domain to trace it to the
                  systems built there.
                </p>
              </m.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
