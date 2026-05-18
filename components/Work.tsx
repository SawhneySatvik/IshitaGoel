"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionHeading, SkillBadge } from "@/components/ui/Section";
import { useHoverPreview } from "@/components/cursor/HoverPreview";
import { projects, type Project } from "@/lib/data";

function Card({ p, index }: { p: Project; index: number }) {
  const hp = useHoverPreview();
  const cover = { title: p.title, gradient: p.cover };
  const handlers = {
    onMouseEnter: () => hp?.show(cover),
    onMouseMove: (e: React.MouseEvent) => hp?.move(e.clientX, e.clientY),
    onMouseLeave: () => hp?.hide(),
    onClick: () => hp?.hide(),
  };
  const num = String(index + 1).padStart(2, "0");

  const card = (
    <article className="elev-rest group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-2/70 transition-all duration-300 hover:-translate-y-1 hover:elev-hover dark:bg-paper-2/40">
      <div
        className="relative h-44 w-full shrink-0 overflow-hidden"
        style={{ backgroundImage: p.cover }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`wd-${index}`}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="3" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#wd-${index})`} />
        </svg>
        <span className="absolute left-4 top-2 font-display text-[3.5rem] font-semibold leading-none text-paper/25">
          {num}
        </span>
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-display text-2xl font-medium text-paper drop-shadow-md">
            {p.title}
          </span>
        </div>
        <span className="absolute right-4 top-4 text-xs text-paper/90">
          {p.year}
        </span>
      </div>
      <div className="flex grow flex-col p-6">
        <p className="grow font-serif text-[17px] leading-relaxed text-ink/90">
          {p.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <SkillBadge key={s}>{s}</SkillBadge>
          ))}
        </div>
        {p.slug && (
          <span className="mt-5 text-sm text-accent transition-transform group-hover:translate-x-1">
            Read the case study →
          </span>
        )}
      </div>
    </article>
  );

  if (p.slug) {
    return (
      <Link
        href={`/work/${p.slug}`}
        data-cursor="view"
        draggable={false}
        className="block h-full"
        {...handlers}
      >
        {card}
      </Link>
    );
  }
  return (
    <div className="block h-full" {...handlers}>
      {card}
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor=""
      aria-label={dir === "left" ? "Previous projects" : "Next projects"}
      className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}

function WorkScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const scrollByCard = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const end = () => {
    drag.current.down = false;
  };
  // Suppress the click that follows a drag (so dragging doesn't navigate).
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-5 flex justify-end gap-2">
        <Arrow dir="left" onClick={() => scrollByCard(-1)} />
        <Arrow dir="right" onClick={() => scrollByCard(1)} />
      </div>
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        onClickCapture={onClickCapture}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory items-start gap-6 overflow-x-auto scroll-smooth pb-6 active:cursor-grabbing"
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            data-card
            className={`h-[24rem] w-[20rem] shrink-0 snap-start sm:h-[26rem] sm:w-[24rem] ${
              i % 2 === 1 ? "sm:mt-10" : ""
            }`}
          >
            <Card p={p} index={i} />
          </div>
        ))}
        <div className="flex h-[24rem] w-[16rem] shrink-0 snap-start items-center sm:h-[26rem]">
          <p className="font-display text-2xl italic leading-snug text-muted">
            …and more,
            <br />
            always in progress.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          number="03"
          title="Selected Work"
          kicker="drag, swipe, or use the arrows"
        />
      </div>
      <WorkScroller />
    </section>
  );
}
