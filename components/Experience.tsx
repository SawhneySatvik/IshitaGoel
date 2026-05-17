"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Section, SectionHeading, Tag } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { experience } from "@/lib/data";

export default function Experience() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.3,
  });

  return (
    <Section id="experience">
      <SectionHeading number="01" title="Experience" />
      <div ref={ref} className="relative pl-9 sm:pl-14">
        {/* spine */}
        <div
          aria-hidden
          className="absolute bottom-2 left-2 top-2 w-px bg-hairline sm:left-3"
        />
        <motion.div
          aria-hidden
          style={reduced ? { scaleY: 1 } : { scaleY }}
          className="absolute bottom-2 left-2 top-2 w-px origin-top bg-accent sm:left-3"
        />

        <RevealGroup className="space-y-12">
          {experience.map((job) => {
            const year = job.period.match(/\d{4}/)?.[0] ?? "";
            const isInfosys = job.org.includes("Infosys");
            const points = isInfosys
              ? job.points.filter((p) => !p.includes("1000+"))
              : job.points;
            return (
              <RevealItem key={`${job.org}-${job.role}`}>
                <article className="relative grid gap-3 md:grid-cols-[1fr_2fr] md:gap-8">
                  <span
                    aria-hidden
                    className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-paper sm:-left-[2.4rem]"
                  />
                  <div className="relative">
                    {year && (
                      <span
                        aria-hidden
                        className="ghost-numeral pointer-events-none absolute -top-7 right-0 hidden text-[3.25rem] leading-none md:block"
                      >
                        {year}
                      </span>
                    )}
                    <p className="font-display text-lg font-medium tracking-tight text-ink">
                      {job.role}
                    </p>
                    <p className="mt-1 text-sm text-muted">{job.org}</p>
                    <p className="mt-1 text-sm text-muted">
                      {job.period}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                  </div>
                  <div>
                    {isInfosys && (
                      <div className="mb-4 flex items-baseline gap-3">
                        <span className="font-display text-4xl font-medium tabular-nums text-accent">
                          <Counter value={1000} suffix="+" />
                        </span>
                        <span className="text-sm text-muted">
                          applicants beaten for the Apple × Infosys iOS program
                        </span>
                      </div>
                    )}
                    <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink/90">
                      {points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-0.5 text-accent">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <Tag key={t} label={t} />
                      ))}
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
