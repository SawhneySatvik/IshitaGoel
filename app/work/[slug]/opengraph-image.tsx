import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getWork, getWorkSlugs } from "@/lib/content";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Selected work — Ishita Goel";

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getWork(slug);
  if (!doc) {
    return renderOg({ eyebrow: "Work", title: "Selected work", meta: "Ishita Goel" });
  }
  return renderOg({
    eyebrow: doc.meta.kind,
    title: doc.meta.title,
    meta: doc.meta.period,
  });
}
