import Image from "next/image";
import { profile } from "@/data/profile";

type Props = {
  /** Rendered size in px (square). */
  size: number;
  shape?: "circle" | "frame";
  preload?: boolean;
  className?: string;
};

/** The headshot, cropped square from the top so the face stays centred. */
export function Portrait({ size, shape = "circle", preload = false, className = "" }: Props) {
  const ring =
    shape === "circle"
      ? "rounded-full ring-1 ring-signal-line ring-offset-2 ring-offset-ink"
      : "rounded-md border border-line-strong";
  return (
    <span
      className={`relative block shrink-0 overflow-hidden bg-ink-3 ${ring} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={profile.photo.src}
        alt={`${profile.name}`}
        width={profile.photo.width}
        height={profile.photo.height}
        sizes={`${size * 2}px`}
        preload={preload}
        className="size-full object-cover object-[50%_18%]"
      />
    </span>
  );
}
