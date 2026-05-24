import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPost, getPostSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const runtime = "nodejs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Essay — Ishita Goel";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return renderOg({ eyebrow: "Writing", title: "Essay", meta: "Ishita Goel" });
  }
  return renderOg({
    eyebrow: post.meta.type === "note" ? "Note" : "Essay",
    title: post.meta.title,
    meta: `${formatDate(post.meta.date)} · ${post.readingTime} min read`,
  });
}
