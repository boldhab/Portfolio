import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#fff",
        padding: 96,
      }}
    >
      <div style={{ fontSize: 78 }}>{SITE_CONFIG.name}</div>
      <div style={{ fontSize: 40, marginTop: 20 }}>{SITE_CONFIG.author.role}</div>
    </div>,
    { width: 1200, height: 630 }
  );
}
