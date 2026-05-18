import { stats } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";

export default function Stats() {
  return (
    <section
      aria-label="By the numbers"
      className="border-y border-hairline bg-ground-2"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
          By the numbers
        </p>
        <RevealGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {stats.map((s, i) => {
            const featured = i < 3;
            return (
              <RevealItem key={s.label}>
                <div>
                  <div
                    className={`font-display font-medium tabular-nums tracking-tight text-ink ${
                      featured
                        ? "text-5xl sm:text-6xl"
                        : "text-3xl text-muted sm:text-4xl"
                    }`}
                  >
                    <Counter
                      value={s.value}
                      decimals={s.decimals ?? 0}
                      prefix={s.prefix ?? ""}
                      suffix={s.suffix ?? ""}
                    />
                  </div>
                  <div
                    className={`mt-3 h-px ${
                      featured ? "w-10 bg-accent" : "w-6 bg-hairline"
                    }`}
                  />
                  <p className="mt-3 max-w-[18rem] text-sm leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
