import Link from "next/link";
import type { PostSummary } from "@/lib/content";

export function PostNav({
  prev,
  next,
  related,
}: {
  prev: PostSummary | null;
  next: PostSummary | null;
  related: PostSummary[];
}) {
  return (
    <div className="mt-14 border-t border-hairline pt-8">
      <div className="flex justify-between gap-6 text-sm">
        <div className="max-w-[45%]">
          {prev && (
            <Link
              href={`/blog/${prev.slug}`}
              data-cursor="view"
              className="group block"
            >
              <span className="text-muted">← Older</span>
              <p className="mt-1 font-display text-ink group-hover:text-accent">
                {prev.meta.title}
              </p>
            </Link>
          )}
        </div>
        <div className="max-w-[45%] text-right">
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              data-cursor="view"
              className="group block"
            >
              <span className="text-muted">Newer →</span>
              <p className="mt-1 font-display text-ink group-hover:text-accent">
                {next.meta.title}
              </p>
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <p className="mb-4 font-sans text-xs uppercase tracking-widest text-muted">
            Related
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                data-cursor="view"
                className="group rounded-xl border border-hairline bg-paper-2/70 p-4 dark:bg-paper-2/40"
              >
                <p className="text-xs text-muted">{r.readingTime} min read</p>
                <p className="mt-1 font-display text-ink group-hover:text-accent">
                  {r.meta.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
