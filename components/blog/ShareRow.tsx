"use client";

import { useState } from "react";

export function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const share = (network: "x" | "linkedin") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const href =
      network === "x"
        ? `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const cls =
    "rounded-full border border-hairline px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-hairline pt-8">
      <span className="mr-1 text-sm text-muted">Share</span>
      <button type="button" onClick={copy} data-cursor="" className={cls}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={() => share("x")}
        data-cursor=""
        aria-label="Share on X"
        className={cls}
      >
        X
      </button>
      <button
        type="button"
        onClick={() => share("linkedin")}
        data-cursor=""
        aria-label="Share on LinkedIn"
        className={cls}
      >
        LinkedIn
      </button>
    </div>
  );
}
