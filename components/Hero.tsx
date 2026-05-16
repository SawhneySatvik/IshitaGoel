"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { profile, greetings } from "@/lib/data";
import Magnetic from "@/components/cursor/Magnetic";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { FlipWords } from "@/components/ui/flip-words";
import HeroPoster from "@/components/hero/HeroPoster";

const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RotatingGreeting() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((p) => (p + 1) % greetings.length), 2400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative inline-flex h-[1.2em] items-baseline overflow-hidden align-baseline">
      <motion.span
        key={i}
        initial={reduced ? false : { y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-accent"
      >
        {greetings[i]}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    if (!fine || !hover) return;
    try {
      const c = document.createElement("canvas");
      if (c.getContext("webgl2") || c.getContext("webgl")) setEnable(true);
    } catch {
      /* no webgl — poster stays */
    }
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-28"
    >
      <h1 className="sr-only">Ishita Goel — AI researcher and designer</h1>

      {/* Generative backdrop — poster (SSR) + WebGL shader (gated) */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0"
      >
        <HeroPoster />
        {enable && <HeroCanvas />}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-5 flex items-center gap-3 font-sans text-sm tracking-wide text-muted"
        >
          <RotatingGreeting />
          <span className="h-px w-8 bg-hairline" />
          <span className="uppercase tracking-[0.2em]">Portfolio</span>
        </motion.p>

        <div aria-hidden className="-mx-1 w-full">
          <TextHoverEffect text="Ishita Goel" />
        </div>

        <div className="mt-8 grid gap-8 sm:mt-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="max-w-xl font-serif text-lg leading-relaxed text-muted sm:text-xl"
          >
            <span className="text-ink">
              <FlipWords
                words={["AI researcher", "designer", "founder", "curious mind"]}
                className="font-display font-medium italic text-accent"
              />
            </span>{" "}
            working on human-centered, sustainable machine learning. Founder of
            Kaushal Up.
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="flex flex-col items-start gap-4 md:items-end"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm md:justify-end">
              <Magnetic className="inline-block" strength={0.5}>
                <a
                  href="#work"
                  data-cursor="view"
                  className="inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-opacity hover:opacity-85"
                >
                  See selected work
                </a>
              </Magnetic>
              <Magnetic className="inline-block" strength={0.4}>
                <a
                  href="#contact"
                  data-cursor=""
                  className="link-underline inline-block pb-0.5 text-ink"
                >
                  Get in touch
                </a>
              </Magnetic>
            </div>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sage" />
              {profile.available}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-xs uppercase tracking-widest text-muted"
          >
            scroll
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
