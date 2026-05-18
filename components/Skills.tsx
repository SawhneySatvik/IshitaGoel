"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading, SkillBadge } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Marquee from "@/components/Marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { skills } from "@/lib/data";

const groupNote: Record<string, string> = {
  Languages: "Comfortable across the stack.",
  "ML & Data": "The research toolkit.",
  Web: "What this very site is built with.",
  Design: "Yes — she designs, too.",
  Tools: "How the work actually ships.",
  Spoken: "Hello in four languages.",
};

const marqueeItems = [
  "Python",
  "TensorFlow",
  "SwiftUI",
  "React",
  "Next.js",
  "Figma",
  "Illustrator",
  "Pandas",
  "NumPy",
  "Tailwind",
  "Jira",
  "Notion",
  "Git",
];

type Emphasis = "rose" | "sage" | undefined;

export default function Skills() {
  return (
    <Section wide>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          number="04"
          title="Skills"
          kicker="Engineering meets design"
        />
      </div>

      <div className="mb-12">
        <Marquee items={marqueeItems} />
      </div>

      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => {
          const emphasis: Emphasis =
            s.group === "Design" ? "rose" : s.group === "ML & Data" ? "sage" : undefined;
          const featured = emphasis !== undefined;
          const tint =
            emphasis === "rose"
              ? "border-rose/30 bg-rose-soft/45 dark:bg-rose-soft/25"
              : emphasis === "sage"
              ? "border-sage/30 bg-sage-soft/45 dark:bg-sage-soft/25"
              : "border-hairline bg-paper-2/70 dark:bg-paper-2/40";
          const dot =
            emphasis === "rose"
              ? "bg-rose"
              : emphasis === "sage"
              ? "bg-sage"
              : "bg-accent";
          return (
            <RevealItem key={s.group} className={featured ? "sm:col-span-2" : ""}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:elev-hover ${tint}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-sm ${dot}`} />
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <h3
                          data-cursor=""
                          className="inline-block cursor-help text-sm font-medium tracking-wide text-ink"
                        />
                      }
                    >
                      {s.group}
                    </TooltipTrigger>
                    <TooltipContent>
                      {groupNote[s.group] ?? s.group}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <SkillBadge accent={emphasis}>{item}</SkillBadge>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
