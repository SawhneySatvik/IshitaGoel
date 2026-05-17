import { Reveal } from "@/components/motion/Reveal";

export function Section({
  id,
  children,
  className = "",
  wide = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`mx-auto ${
        wide ? "max-w-7xl" : "max-w-5xl"
      } scroll-mt-24 px-6 py-16 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  number,
  title,
  kicker,
}: {
  number?: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="relative overflow-hidden">
        {number && (
          <span
            aria-hidden="true"
            className="ghost-numeral pointer-events-none absolute right-0 top-0 text-[3.5rem] leading-[0.8] sm:text-[6rem]"
          >
            {number}
          </span>
        )}
        <div className="relative flex items-baseline gap-4 border-b border-hairline pb-4">
          {number && (
            <span className="font-sans text-sm tabular-nums text-accent">
              {number}
            </span>
          )}
          <h2 className="text-h2 font-display font-medium tracking-tight text-ink">
            {title}
          </h2>
          {kicker && (
            <span className="ml-auto hidden max-w-[42%] text-right text-sm text-muted sm:block">
              {kicker}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

const tagStyles: Record<string, string> = {
  Sustainability: "border-sage/40 bg-sage-soft/65 text-sage dark:bg-sage-soft/50",
  Design: "border-rose/40 bg-rose-soft/65 text-rose dark:bg-rose-soft/50",
};

export function Tag({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  const style =
    tagStyles[label] ??
    "border-hairline bg-paper-2/80 text-muted dark:bg-paper-2/60";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${style}`}
    >
      {icon}
      {label}
    </span>
  );
}

/* Square, hairline badge for tools/skills — deliberately distinct from the
   rounded-full topic Tag. */
export function SkillBadge({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: "sage" | "rose";
}) {
  const tint =
    accent === "sage"
      ? "border-sage/40 bg-sage-soft/55 text-sage dark:bg-sage-soft/40"
      : accent === "rose"
      ? "border-rose/40 bg-rose-soft/55 text-rose dark:bg-rose-soft/40"
      : "border-hairline bg-paper text-ink/80";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${tint}`}
    >
      {children}
    </span>
  );
}
