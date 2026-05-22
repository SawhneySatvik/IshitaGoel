"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        setHovering(true);
        setLabel(el.dataset.cursor ?? "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;
  const hasLabel = hovering && label.length > 0;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: hasLabel ? 66 : hovering ? 44 : 14,
          height: hasLabel ? 66 : hovering ? 44 : 14,
          backgroundColor: hasLabel ? "var(--accent)" : "rgba(0,0,0,0)",
          borderWidth: hasLabel ? 0 : 1.5,
          borderColor: "var(--accent)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {hasLabel ? (
          <span className="text-[11px] font-medium uppercase tracking-wide text-paper">
            {label}
          </span>
        ) : (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
