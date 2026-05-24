import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { profile } from "@/lib/data";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ishita Goel — AI Research & Design";

export default function Image() {
  return renderOg({
    eyebrow: "Portfolio",
    title: profile.tagline,
    meta: "AI Research · Design · Sustainability",
  });
}
