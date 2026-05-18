import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getAllPosts, getAllNotes, formatDate } from "@/lib/content";
import { writing } from "@/lib/data";

export default function Writing() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const noteCount = getAllNotes().length;

  return (
    <Section id="writing">
      <SectionHeading number="08" title="Writing" kicker="Essays, notes & reading" />

      {lead && (
        <Reveal className="mb-8">
          <Link
            href={`/blog/${lead.slug}`}
            data-cursor="view"
            className="elev-rest group grid gap-6 overflow-hidden rounded-2xl border border-hairline bg-paper-2/70 transition-all duration-300 hover:-translate-y-1 hover:elev-hover dark:bg-paper-2/40 sm:grid-cols-[1.1fr_1.3fr]"
          >
            <div className="overflow-hidden">
              <ImagePlaceholder
                alt={lead.meta.title}
                aspect="16/10"
                variant="halftone"
                rounded="rounded-none"
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent">
                Latest essay
              </span>
              <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-ink group-hover:text-accent sm:text-3xl">
                {lead.meta.title}
              </h3>
              <p className="mt-3 max-w-xl font-serif text-[17px] leading-relaxed text-muted">
                {lead.meta.excerpt}
              </p>
              <span className="mt-4 text-sm text-muted">
                {formatDate(lead.meta.date)} · {lead.readingTime} min read
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      <RevealGroup className="space-y-px">
        {rest.map((p) => (
          <RevealItem key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              data-cursor="view"
              className="group flex flex-col gap-1 border-b border-hairline py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h3 className="font-display text-lg font-medium tracking-tight text-ink group-hover:text-accent">
                  {p.meta.title}
                </h3>
                <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
                  {p.meta.excerpt}
                </p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-muted">
                {formatDate(p.meta.date)} · {p.readingTime} min
              </span>
            </Link>
          </RevealItem>
        ))}

        {writing.map((w) => (
          <RevealItem key={w.title}>
            <a
              href={w.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="group flex flex-col gap-1 border-b border-hairline py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h3 className="font-display text-lg font-medium tracking-tight text-ink group-hover:text-accent">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{w.outlet} · External</p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-muted">
                {w.year} ↗
              </span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Link
          href="/blog"
          data-cursor="view"
          className="link-underline pb-0.5 text-accent"
        >
          All writing →
        </Link>
        <Link
          href="/notes"
          data-cursor="view"
          className="link-underline pb-0.5 text-ink"
        >
          Notes ({noteCount})
        </Link>
        <Link
          href="/reading"
          data-cursor="view"
          className="link-underline pb-0.5 text-ink"
        >
          Reading list
        </Link>
      </div>
    </Section>
  );
}
