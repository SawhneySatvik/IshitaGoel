"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-sans text-xs uppercase tracking-widest text-muted">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-hairline">
        {items.map((it) => (
          <li key={it.id} className={it.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${it.id}`}
              data-cursor=""
              className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors ${
                active === it.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
