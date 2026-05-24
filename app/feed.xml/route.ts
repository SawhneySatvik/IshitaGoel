import { getAllPosts } from "@/lib/content";
import { profile, SITE_URL } from "@/lib/data";

// Route handlers default to dynamic in Next 16 — force static so the feed is
// emitted at build time (the site is fully SSG).
export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${escapeXml(p.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.meta.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.meta.excerpt ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0]
    ? new Date(posts[0].meta.date).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ishita Goel — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(profile.subline)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
