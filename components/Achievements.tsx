import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { achievements } from "@/lib/data";

export default function Achievements() {
  const credentials = achievements.filter((a) => !a.sustainability);
  const sustainability = achievements.filter((a) => a.sustainability);

  return (
    <Section>
      <SectionHeading
        number="06"
        title="Achievements & Certifications"
        kicker="A sustainability thread runs through it"
      />
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <RevealGroup className="space-y-px">
          {credentials.map((a) => (
            <RevealItem key={a.title}>
              <article className="border-b border-hairline py-5">
                <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  {a.detail}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="rounded-2xl border border-l-2 border-sage/25 border-l-sage bg-ground-sage p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-sage" />
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                Sustainability & climate
              </p>
            </div>
            <ul className="space-y-5">
              {sustainability.map((a) => (
                <li key={a.title}>
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">
                    {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
