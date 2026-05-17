"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { about, profile } from "@/lib/data";

export default function About() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-7%", "9%"]);

  return (
    <Section id="about" className="!py-20 sm:!py-28">
      <div
        ref={ref}
        className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:gap-16"
      >
        {/* Portrait — generative until a real photo is dropped in */}
        <Reveal>
          <div className="relative max-w-[20rem]">
            <div
              aria-hidden
              className="absolute inset-0 -rotate-2 rounded-2xl bg-accent-soft/55 dark:bg-accent-soft/40"
            />
            <motion.div
              style={reduced ? undefined : { y: portraitY }}
              className="relative"
            >
              <ImagePlaceholder
                src={profile.photo || undefined}
                alt="Ishita Goel"
                aspect="3/4"
                initials="IG"
                variant="glyph"
                className="w-full"
              />
            </motion.div>
          </div>
        </Reveal>

        {/* Voice */}
        <div>
          <Reveal>
            <p className="mb-6 font-sans text-sm uppercase tracking-[0.2em] text-accent">
              About
            </p>
          </Reveal>
          <div className="max-w-2xl space-y-6 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {about.map((para, i) => (
              <Fragment key={i}>
                <Reveal as="p" delay={i * 0.05}>
                  <span className={i === 0 ? "drop-cap" : ""}>{para}</span>
                </Reveal>
                {i === 0 && (
                  <Reveal>
                    <blockquote className="editorial-em border-l-2 border-accent-soft py-1 pl-5 text-2xl leading-snug sm:text-3xl">
                      “{profile.tagline}”
                    </blockquote>
                  </Reveal>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
