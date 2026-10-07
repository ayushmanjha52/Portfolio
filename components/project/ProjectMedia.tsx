import Image from "next/image";
import type { Media } from "@/data/projects";

export function ProjectMedia({ items }: { items: Media[] }) {
  const pair = items.length > 1 && items.every((m) => m.width < 800);
  return (
    <div className={`grid gap-6 ${pair ? "sm:grid-cols-2" : ""}`}>
      {items.map((m) => (
        <figure key={m.src} className="overflow-hidden rounded-md border border-line bg-ink-2">
          <Image
            src={m.src}
            alt={m.alt}
            width={m.width}
            height={m.height}
            sizes="(min-width: 1024px) 760px, 100vw"
            unoptimized={m.src.endsWith(".gif")}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-line px-4 py-3 font-mono text-[11px] tracking-[0.04em] text-mute">
            {m.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
