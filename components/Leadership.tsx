import Link from "next/link";
import { Section, SectionHeading, Tag } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImagePlaceholder, type PlaceholderVariant } from "@/components/ui/ImagePlaceholder";
import { leadership, type LeadershipItem } from "@/lib/data";

function Card({
  item,
  feature,
  variant,
}: {
  item: LeadershipItem;
  feature?: boolean;
  variant: PlaceholderVariant;
}) {
  return (
    <article className="elev-rest group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper/60 transition-all duration-300 hover:-translate-y-1 hover:elev-hover">
      <div className="overflow-hidden">
        <ImagePlaceholder
          src={item.image}
          alt={item.org}
          aspect={feature ? "16/9" : "4/3"}
          variant={variant}
          rounded="rounded-none"
          className="w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex grow flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={`font-display font-medium tracking-tight text-ink ${
              feature ? "text-2xl" : "text-xl"
            }`}
          >
            {item.org}
          </h3>
          <span className="shrink-0 text-sm text-muted">{item.period}</span>
        </div>
        <p className="mt-1 text-sm text-accent">{item.role}</p>
        <p className="mt-3 font-serif text-[17px] leading-relaxed text-ink/90">
          {item.blurb}
        </p>
        {item.points && (
          <ul className="mt-3 grow space-y-1.5 text-[15px] text-muted">
            {item.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-accent">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {item.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {item.slug && (
            <Link
              href={`/work/${item.slug}`}
              data-cursor="view"
              className="ml-1 text-sm text-accent hover:underline"
            >
              The story →
            </Link>
          )}
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Visit ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Leadership() {
  const [feature, ...rest] = leadership;
  return (
    <Section>
      <SectionHeading
        number="05"
        title="Leadership & Community"
        kicker="Impact & sustainability"
      />
      <div className="rounded-3xl border border-sage/20 bg-ground-sage p-5 sm:p-8">
        <RevealGroup className="grid gap-6 lg:grid-cols-3">
          {feature && (
            <RevealItem className="lg:col-span-2">
              <Card item={feature} feature variant="contour" />
            </RevealItem>
          )}
          {rest.map((item) => (
            <RevealItem key={item.org} className="h-full">
              <Card item={item} variant="halftone" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
