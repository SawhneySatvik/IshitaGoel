import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const WORK_DIR = path.join(process.cwd(), "content", "work");
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const NOTES_DIR = path.join(process.cwd(), "content", "notes");

const isProd = process.env.NODE_ENV === "production";

/* ------------------------------- work ---------------------------------- */

export type WorkMeta = {
  title: string;
  kind: string;
  period: string;
  summary: string;
  tags?: string[];
  stack?: string[];
  links?: { label: string; href: string }[];
};

export type WorkDoc = { slug: string; meta: WorkMeta; content: string };

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getWorkSlugs(): string[] {
  return slugsIn(WORK_DIR);
}

export function getWork(slug: string): WorkDoc | null {
  const file = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { slug, meta: data as WorkMeta, content };
}

/* ------------------------------- blog ----------------------------------- */

export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  type?: "essay" | "note";
  cover?: string;
  coverLabel?: string;
  updated?: string;
  draft?: boolean;
};

export type PostSummary = {
  slug: string;
  meta: PostMeta;
  readingTime: number;
  plain: string;
};

export type PostDoc = {
  slug: string;
  meta: PostMeta;
  content: string;
  readingTime: number;
};

function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readingTimeOf(plain: string): number {
  const words = plain ? plain.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export function getPostSlugs(): string[] {
  return slugsIn(BLOG_DIR);
}

export function getPost(slug: string): PostDoc | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    meta: data as PostMeta,
    content,
    readingTime: readingTimeOf(stripMarkdown(content)),
  };
}

export function getAllPosts(): PostSummary[] {
  return getPostSlugs()
    .map((slug) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8")
      );
      const plain = stripMarkdown(content);
      return {
        slug,
        meta: data as PostMeta,
        readingTime: readingTimeOf(plain),
        plain,
      };
    })
    .filter((p) => !(isProd && p.meta.draft))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getPostNav(slug: string): {
  prev: PostSummary | null;
  next: PostSummary | null;
} {
  const posts = getAllPosts(); // newest first
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { next: posts[i - 1] ?? null, prev: posts[i + 1] ?? null };
}

export function getRelated(slug: string, limit = 3): PostSummary[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const tags = new Set(current.meta.tags ?? []);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score: (p.meta.tags ?? []).filter((t) => tags.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function allTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  getAllPosts().forEach((p) =>
    (p.meta.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
  );
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export type TocItem = { depth: 2 | 3; text: string; id: string };

export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const noCode = content.replace(/```[\s\S]*?```/g, "");
  for (const raw of noCode.split("\n")) {
    const m = /^(#{2,3})\s+(.*)$/.exec(raw.trim());
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2].replace(/[#*`_]/g, "").trim();
    items.push({ depth, text, id: slugger.slug(text) });
  }
  return items;
}

/* ------------------------------- notes ---------------------------------- */

export type NoteMeta = { title?: string; date: string; tags?: string[] };
export type Note = { slug: string; meta: NoteMeta; content: string };

export function getAllNotes(): Note[] {
  return slugsIn(NOTES_DIR)
    .map((slug) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(NOTES_DIR, `${slug}.mdx`), "utf8")
      );
      return { slug, meta: data as NoteMeta, content };
    })
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

/* ------------------------------- shared --------------------------------- */

export { formatDate } from "./format";
