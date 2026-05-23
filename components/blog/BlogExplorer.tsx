"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import type { PostSummary } from "@/lib/content";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor=""
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-accent bg-accent text-paper"
          : "border-hairline text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

export function BlogExplorer({
  posts,
  tags,
}: {
  posts: PostSummary[];
  tags: { tag: string; count: number }[];
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (active && !(p.meta.tags ?? []).includes(active)) return false;
      if (!query) return true;
      const hay = `${p.meta.title} ${p.meta.excerpt} ${(p.meta.tags ?? []).join(
        " "
      )} ${p.plain}`.toLowerCase();
      return hay.includes(query);
    });
  }, [posts, q, active]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search writing…"
          data-cursor=""
          aria-label="Search writing"
          className="w-full rounded-full border border-hairline bg-paper px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <Chip label="All" active={active === null} onClick={() => setActive(null)} />
          {tags.map((t) => (
            <Chip
              key={t.tag}
              label={t.tag}
              active={active === t.tag}
              onClick={() => setActive(active === t.tag ? null : t.tag)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 font-serif text-lg italic text-muted">
          Nothing matches that yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => (
            <PostCard key={p.slug} post={p} onTag={setActive} />
          ))}
        </div>
      )}
    </div>
  );
}
