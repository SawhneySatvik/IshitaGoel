import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllNotes, formatDate } from "@/lib/content";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Notes — Ishita Goel",
  description: "Short notes and things I’m learning.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <>
      <section className="mx-auto max-w-2xl px-6 pt-28 pb-16 sm:pt-32">
        <Link
          href="/blog"
          data-cursor=""
          className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
        >
          ← All writing
        </Link>

        <h1 className="mt-10 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Notes
        </h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-muted">
          Short thoughts and things I’m learning — the in-between of the essays.
        </p>

        <div className="mt-12 space-y-12">
          {notes.map((n) => (
            <article key={n.slug} className="border-b border-hairline pb-12">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-xl font-medium tracking-tight text-ink">
                  {n.meta.title ?? "Note"}
                </h2>
                <span className="shrink-0 text-sm text-muted">
                  {formatDate(n.meta.date)}
                </span>
              </div>
              <div className="mt-3 space-y-4 font-serif text-[1.05rem] leading-relaxed text-ink/90">
                <MDXRemote
                  source={n.content}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>
              {n.meta.tags && n.meta.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {n.meta.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
