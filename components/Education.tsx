import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { education } from "@/lib/data";

function abbr(school: string) {
  if (school.includes("SRM")) return "SRM";
  if (school.includes("Delhi Public")) return "DPS";
  return school.slice(0, 2).toUpperCase();
}

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading number="07" title="Education" />
      <RevealGroup className="space-y-px">
        {education.map((e) => {
          const isSrm = e.school.includes("SRM");
          return (
            <RevealItem key={e.school}>
              <article className="grid items-center gap-4 border-b border-hairline py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-hairline bg-paper-2/80 font-display text-base font-medium tracking-tight text-accent dark:bg-paper-2/60">
                  {abbr(e.school)}
                </div>
                <div>
                  <p className="font-display text-lg font-medium tracking-tight text-ink">
                    {e.school}
                  </p>
                  <p className="mt-1 text-[15px] text-muted">{e.detail}</p>
                  {isSrm ? (
                    <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-2xl font-medium tabular-nums text-accent">
                        <Counter value={9.57} decimals={2} />
                      </span>
                      <span className="text-sm text-muted">
                        CGPA · Founder’s Scholarship (75% tuition)
                      </span>
                    </p>
                  ) : (
                    e.note && <p className="mt-1 text-sm text-accent">{e.note}</p>
                  )}
                </div>
                <span className="text-sm tabular-nums text-muted">{e.period}</span>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
