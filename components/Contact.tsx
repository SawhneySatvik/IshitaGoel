"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import Magnetic from "@/components/cursor/Magnetic";
import ClipReveal from "@/components/motion/ClipReveal";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, sub: profile.email },
  { label: "LinkedIn", href: profile.linkedin, sub: "in/ishitagoel" },
  { label: "GitHub", href: profile.github, sub: "IshitaGoel" },
  { label: "Kaushal Up", href: profile.ngo, sub: "kaushalup.org" },
];

function Flourish() {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 240 40"
      className="mt-3 h-8 w-48 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 28 C 40 6, 70 6, 96 24 C 110 34, 120 34, 134 18 C 150 2, 176 2, 196 16 C 210 26, 226 22, 236 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-hairline bg-ground-2">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="flex items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-accent">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sage" />
          Say hello
        </p>
        <ClipReveal className="mt-5 max-w-4xl">
          <h2 className="text-display font-display font-medium tracking-tight text-ink">
            Let’s build something{" "}
            <em className="editorial-em">thoughtful</em> together.
          </h2>
        </ClipReveal>
        <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-muted">
          I’m looking for roles in AI research and at the intersection of
          sustainability and machine learning. If that’s your world, I’d love to
          talk.
        </p>
        <p className="mt-3 text-sm text-muted">{profile.available}.</p>

        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-cursor="open"
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group border-b border-hairline py-4 sm:border-b-0 sm:border-r sm:px-5 sm:py-2"
            >
              <span className="block text-sm text-muted">{l.label}</span>
              <span className="mt-0.5 block text-ink group-hover:text-accent">
                {l.sub} ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <Magnetic className="inline-block" strength={0.5}>
            <a
              href={profile.cv}
              data-cursor="open"
              className="inline-block rounded-full bg-ink px-6 py-3 text-paper transition-opacity hover:opacity-85"
            >
              Download CV
            </a>
          </Magnetic>
        </div>

        <div className="mt-16">
          <p className="font-display text-3xl italic text-ink">Ishita</p>
          <Flourish />
        </div>
      </div>
    </section>
  );
}
