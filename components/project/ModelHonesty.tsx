import type { ModelHonesty as ModelHonestyData } from "@/data/projects";

export function ModelHonesty({ data }: { data: ModelHonestyData }) {
  return (
    <div className="ticks rounded-md border border-signal-line bg-ink-2 p-5 sm:p-6">
      <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2">
        {data.columns.map((col) => (
          <div key={col.heading} className="bg-ink p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">{col.heading}</p>
            <dl className="mt-4 space-y-4">
              {col.rows.map((row) => (
                <div key={row.label} className="flex items-end justify-between gap-4">
                  <dt className={`text-[13.5px] leading-snug ${row.headline ? "text-paper" : "text-mute"}`}>
                    {row.label}
                    {row.headline ? (
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Headline</span>
                    ) : (
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Optimistic · reference only</span>
                    )}
                  </dt>
                  <dd
                    className={`font-serif leading-none ${row.headline ? "text-[2.75rem] text-signal" : "text-[1.7rem] text-faint"}`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[14.5px] leading-relaxed text-paper/85">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-signal">Why the lower number · </span>
        {data.reason}
      </p>
    </div>
  );
}
