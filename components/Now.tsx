import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import ClipReveal from "@/components/motion/ClipReveal";
import { now, profile } from "@/lib/data";

export default function Now() {
  const city = profile.location.split(",")[0];
  return (
    <Section className="!py-20 sm:!py-28">
      <div className="rounded-3xl border border-l-2 border-sage/20 border-l-sage bg-ground-sage p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-accent">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sage" />
              Now
            </p>
            <p className="mt-2 text-sm text-muted">{city} · today</p>
          </Reveal>
          <ClipReveal className="max-w-2xl">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[2rem]">
              {now}
            </p>
          </ClipReveal>
        </div>
      </div>
    </Section>
  );
}
