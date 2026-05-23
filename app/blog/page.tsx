import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, allTags, getAllNotes, formatDate } from "@/lib/content";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Writing — Ishita Goel",
  description: "Essays, notes, and a reading list by Ishita Goel.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = allTags();
  const notes = getAllNotes().slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-32">
        <Link
          href="/#writing"
          data-cursor=""
          className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
        >
          ← Back home
        </Link>

        <h1 className="mt-10 font-display text-4xl font-medium tracking-tight text-ink sm:text-6xl">
          Writing
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-muted">
          Essays, notes, and the things I’m reading — I write to think.
        </p>

        <div className="mt-12">
          <BlogExplorer posts={posts} tags={tags} />
        </div>

        {notes.length > 0 && (
          <div className="mt-20">
            <div className="flex items-baseline justify-between border-b border-hairline pb-4">
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                Notes
              </h2>
              <Link
                href="/notes"
                data-cursor="view"
                className="link-underline pb-0.5 text-sm text-accent"
              >
                All notes →
              </Link>
            </div>
            <ul className="mt-6 space-y-4">
              {notes.map((n) => (
                <li
                  key={n.slug}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-display text-lg text-ink">
                    {n.meta.title ?? "Note"}
                  </span>
                  <span className="shrink-0 text-sm text-muted">
                    {formatDate(n.meta.date)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/reading"
            data-cursor="view"
            className="link-underline pb-0.5 text-sm text-accent"
          >
            Reading list / bookshelf →
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
