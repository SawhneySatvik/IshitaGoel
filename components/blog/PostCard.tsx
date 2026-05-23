"use client";

import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/content";

export function PostCard({
  post,
  onTag,
}: {
  post: PostSummary;
  onTag?: (tag: string) => void;
}) {
  const { slug, meta, readingTime } = post;
  const isImage = meta.cover?.startsWith("/");
  const gradient = isImage
    ? undefined
    : meta.cover ?? "linear-gradient(135deg, #eae0cf, #e7c8b3)";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-2/70 transition-shadow hover:shadow-xl dark:bg-paper-2/40">
      <Link href={`/blog/${slug}`} data-cursor="view" className="group block">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden"
          style={{ backgroundImage: gradient }}
        >
          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={meta.cover}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>{formatDate(meta.date)}</span>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-ink group-hover:text-accent">
            {meta.title}
          </h3>
          <p className="mt-2 font-serif text-[15px] leading-relaxed text-muted">
            {meta.excerpt}
          </p>
        </div>
      </Link>
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-6 pb-6">
          {meta.tags.map((t) =>
            onTag ? (
              <button
                key={t}
                type="button"
                onClick={() => onTag(t)}
                data-cursor=""
                className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                #{t}
              </button>
            ) : (
              <span
                key={t}
                className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-muted"
              >
                #{t}
              </span>
            )
          )}
        </div>
      )}
    </article>
  );
}
