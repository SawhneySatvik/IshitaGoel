import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Face = {
  file: string;
  name: string;
  weight: 400 | 600;
  style: "normal";
};

// Load brand fonts if committed to assets/fonts; otherwise ImageResponse falls
// back to its built-in font so the build never breaks on a missing file.
const loadFonts = cache(async () => {
  const faces: Face[] = [
    { file: "Fraunces-SemiBold.woff", name: "Fraunces", weight: 600, style: "normal" },
    { file: "Inter-Regular.woff", name: "Inter", weight: 400, style: "normal" },
  ];
  const fonts: { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[] = [];
  for (const f of faces) {
    try {
      const data = await readFile(join(process.cwd(), "assets/fonts", f.file));
      fonts.push({ name: f.name, data, weight: f.weight, style: f.style });
    } catch {
      /* font not present — default font is used */
    }
  }
  return fonts;
});

export async function renderOg({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  const fonts = await loadFonts();
  const titleFamily = fonts.some((f) => f.name === "Fraunces") ? "Fraunces" : undefined;
  const uiFamily = fonts.some((f) => f.name === "Inter") ? "Inter" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#f1e8d9",
          position: "relative",
        }}
      >
        {/* warm accent echoes (solid translucent circles — Satori-safe) */}
        <div
          style={{
            position: "absolute",
            top: "-130px",
            right: "-90px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            backgroundColor: "rgba(194,105,63,0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-170px",
            left: "-110px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            backgroundColor: "rgba(126,139,107,0.14)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "36px", height: "4px", backgroundColor: "#c2693f", display: "flex" }} />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#6f6354",
              fontFamily: uiFamily,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              maxWidth: "1000px",
              fontSize: "76px",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontWeight: 600,
              color: "#211c16",
              fontFamily: titleFamily,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", fontSize: "26px", color: "#6f6354", fontFamily: uiFamily }}>
            {meta ?? ""}
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#c2693f", fontFamily: uiFamily }}>
            ishitagoel.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, ...(fonts.length ? { fonts } : {}) }
  );
}
