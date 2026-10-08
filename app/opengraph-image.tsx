import { ImageResponse } from "next/og";

export const alt = "Ayushman Jha — Engineering Intelligent Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const line = "rgba(238,234,226,0.06)";
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
          background: "#070708",
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: "#eeeae2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, color: "#eeeae2" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff6b3d" }} />
          Ayushman Jha
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 400, lineHeight: 1, letterSpacing: -3 }}>
          <span>Engineering</span>
          <span style={{ color: "#ff6b3d" }}>intelligent</span>
          <span>systems.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a8a39a" }}>
          Electrical Engineering × AI/ML × Data × Software
        </div>
      </div>
    ),
    size,
  );
}
