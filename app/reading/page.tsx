import Link from "next/link";
import type { Metadata } from "next";
import { reading, type ReadingItem } from "@/lib/data";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reading — Ishita Goel",
  description: "Books Ishita is reading, has finished, and wants to read next.",
};

const groups: { key: ReadingItem["status"]; label: string }[] = [
  { key: "reading", label: "Currently reading" },
  { key: "finished", label: "Finished" },
  { key: "queued", label: "Up next" },
];

export default function ReadingPage() {
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
          Reading
        </h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-muted">
          A slowly-growing shelf — what’s on my desk, what stayed with me, and
          what’s next.
        </p>

        <div className="mt-12 space-y-12">
          {groups.map((g) => {
            const books = reading.filter((b) => b.status === g.key);
            if (books.length === 0) return null;
            return (
              <div key={g.key}>
                <h2 className="mb-5 font-sans text-sm uppercase tracking-widest text-accent">
                  {g.label}
                </h2>
                <ul className="space-y-px">
                  {books.map((b) => (
                    <li
                      key={b.title}
                      className="border-b border-hairline py-5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-lg font-medium text-ink">
                          {b.link ? (
                            <a
                              href={b.link}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="open"
                              className="hover:text-accent"
                            >
                              {b.title} ↗
                            </a>
                          ) : (
                            b.title
                          )}
                        </span>
                        <span className="shrink-0 text-sm text-muted">
                          {b.author}
                        </span>
                      </div>
                      {b.note && (
                        <p className="mt-1 font-serif text-[15px] leading-relaxed text-muted">
                          {b.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
