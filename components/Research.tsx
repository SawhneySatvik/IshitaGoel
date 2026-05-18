"use client";

import Link from "next/link";
import { Section, SectionHeading, Tag } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useHoverPreview } from "@/components/cursor/HoverPreview";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Counter from "@/components/motion/Counter";
import { research, type ResearchItem } from "@/lib/data";

function useRowHandlers(item: ResearchItem) {
  const hp = useHoverPreview();
  const cover = { title: item.title, gradient: item.cover };
  return {
    onMouseEnter: () => hp?.show(cover),
    onMouseMove: (e: React.MouseEvent) => hp?.move(e.clientX, e.clientY),
    onMouseLeave: () => hp?.hide(),
    onClick: () => hp?.hide(),
  };
}

function Featured({ item }: { item: ResearchItem }) {
  const handlers = useRowHandlers(item);
  const inner = (
    <article className="elev-rest group grid gap-6 overflow-hidden rounded-2xl border border-l-2 border-hairline border-l-sage bg-ground-sage p-6 transition-all duration-300 hover:-translate-y-0.5 hover:elev-hover sm:grid-cols-[1.5fr_1fr] sm:p-8">
      <div>
        <div className="flex items-center gap-2">
          {item.current && (
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sage" />
          )}
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
            {item.current ? "Currently" : "Research"}
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-muted">
          {item.org}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        <p className="mt-1 text-sm text-muted">{item.period}</p>
        <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-ink">
          {item.blurb}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {item.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {item.slug && (
            <span className="ml-1 text-sm text-accent transition-transform group-hover:translate-x-1">
              Read the deep-dive →
            </span>
          )}
        </div>
      </div>
      <ImagePlaceholder
        alt={item.title}
        aspect="4/3"
        variant="data"
        className="w-full self-center"
      />
    </article>
  );

  return (
    <RevealItem>
      {item.slug ? (
        <Link href={`/work/${item.slug}`} data-cursor="view" {...handlers}>
          {inner}
        </Link>
      ) : (
        <div {...handlers}>{inner}</div>
      )}
    </RevealItem>
  );
}

function CaseRow({ item }: { item: ResearchItem }) {
  const handlers = useRowHandlers(item);
  const showStat = item.slug === "federated-learning";
  const inner = (
    <article className="group grid gap-3 border-b border-hairline py-7 transition-colors hover:bg-paper-2/60 md:grid-cols-[1fr_2fr] md:gap-8 dark:hover:bg-paper-2/30">
      <div>
        <p className="font-display text-xl font-medium tracking-tight text-ink">
          {item.title}
        </p>
        <p className="mt-1 text-sm text-muted">{item.org}</p>
        <p className="mt-1 text-sm text-muted">{item.period}</p>
      </div>
      <div>
        <p className="font-serif text-lg leading-relaxed text-ink">
          {item.blurb}
        </p>
        {showStat && (
          <div className="my-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-medium tabular-nums text-accent">
              <Counter value={91} suffix="%" />
            </span>
            <span className="text-sm text-muted">
              accuracy on decentralised datasets
            </span>
          </div>
        )}
        {item.points && (
          <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
            {item.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-accent">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {item.slug && (
            <span className="ml-1 text-sm text-accent transition-transform group-hover:translate-x-1">
              Read the deep-dive →
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <RevealItem>
      {item.slug ? (
        <Link href={`/work/${item.slug}`} data-cursor="view" {...handlers}>
          {inner}
        </Link>
      ) : (
        <div {...handlers}>{inner}</div>
      )}
    </RevealItem>
  );
}

export default function Research() {
  const [featured, ...rest] = research;
  return (
    <Section id="research">
      <SectionHeading number="02" title="Research" kicker="AI · Sustainability" />
      <RevealGroup className="space-y-px">
        {featured && <Featured item={featured} />}
        {rest.map((item) => (
          <CaseRow key={item.title} item={item} />
        ))}
      </RevealGroup>

      <Reveal className="mt-8">
        <p className="max-w-2xl font-serif text-base italic leading-relaxed text-muted">
          “I’m drawn to projects that make people feel seen, supported, or
          empowered — and to the quiet question of how technology can stay human
          while it scales.”
        </p>
      </Reveal>
    </Section>
  );
}
