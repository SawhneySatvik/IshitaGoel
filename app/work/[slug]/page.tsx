import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWork, getWorkSlugs } from "@/lib/content";
import { Tag } from "@/components/ui/Section";
import Footer from "@/components/Footer";
import ClipReveal from "@/components/motion/ClipReveal";

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getWork(slug);
  if (!doc) return { title: "Not found" };
  return {
    title: `${doc.meta.title} — Ishita Goel`,
    description: doc.meta.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getWork(slug);
  if (!doc) notFound();
  const { meta, content } = doc;

  return (
    <>
      <article className="mx-auto max-w-2xl px-6 pt-28 pb-16 sm:pt-32">
        <Link
          href="/#work"
          data-cursor=""
          className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
        >
          ← Back to work
        </Link>

        <ClipReveal>
          <p className="mt-10 font-sans text-sm tracking-wide text-accent">
            {meta.kind}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-sm text-muted">{meta.period}</p>
          <p className="mt-6 font-serif text-xl leading-relaxed text-ink/90">
            {meta.summary}
          </p>
        </ClipReveal>

        {(meta.tags?.length || meta.stack?.length) && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {meta.tags?.map((t) => (
              <Tag key={t} label={t} />
            ))}
            {meta.stack?.map((s) => (
              <span
                key={s}
                className="rounded-md bg-paper-2/80 px-2 py-0.5 text-xs text-muted ring-1 ring-hairline dark:bg-paper-2/60"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <hr className="my-10 border-hairline" />

        <div className="prose-editorial">
          <MDXRemote source={content} />
        </div>

        {meta.links && meta.links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4 border-t border-hairline pt-8">
            {meta.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-hairline px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </article>
      <Footer />
    </>
  );
}
