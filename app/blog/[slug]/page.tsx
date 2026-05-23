import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import {
  getPost,
  getPostSlugs,
  getPostNav,
  getRelated,
  extractToc,
  formatDate,
} from "@/lib/content";
import { Tag } from "@/components/ui/Section";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { Toc } from "@/components/blog/Toc";
import { ShareRow } from "@/components/blog/ShareRow";
import { PostNav } from "@/components/blog/PostNav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: `${post.meta.title} — Ishita Goel`, description: post.meta.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content, readingTime } = post;
  const toc = extractToc(content);
  const { prev, next } = getPostNav(slug);
  const related = getRelated(slug);
  const isImg = meta.cover?.startsWith("/");

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-32">
        <Link
          href="/blog"
          data-cursor=""
          className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
        >
          ← All writing
        </Link>

        {meta.cover && (
          <div
            className="mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl ring-1 ring-hairline"
            style={{ backgroundImage: isImg ? undefined : meta.cover }}
          >
            {isImg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.cover}
                alt={meta.coverLabel ?? meta.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}

        <div className="mt-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="mx-auto w-full max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{formatDate(meta.date)}</span>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-6 font-serif text-xl leading-relaxed text-ink/90">
              {meta.excerpt}
            </p>
            {meta.tags && meta.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {meta.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            )}

            <hr className="my-10 border-hairline" />

            <div className="prose-editorial">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeHighlight],
                  },
                }}
              />
            </div>

            <ShareRow title={meta.title} />
            <PostNav prev={prev} next={next} related={related} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc items={toc} />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
