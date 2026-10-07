import { ImageResponse } from "next/og";

export const alt = "Ayushman Jha — Engineering Intelligent Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const line = "rgba(233,231,226,0.08)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d0e10",
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: "#e9e7e2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 8, color: "#f2a93b" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#f2a93b" }} />
          AYUSHMAN JHA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>ENGINEERING</span>
          <span>INTELLIGENT</span>
          <span style={{ display: "flex" }}>
            SYSTEMS<span style={{ color: "#f2a93b" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#a6a49e" }}>
          ELECTRICAL ENGINEERING × AI/ML × DATA × SOFTWARE
        </div>
      </div>
    ),
    size,
  );
}
