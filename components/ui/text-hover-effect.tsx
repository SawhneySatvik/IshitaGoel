"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function TextHoverEffect({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mask, setMask] = useState({ cx: "50%", cy: "50%" });
  const [fine, setFine] = useState(true);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    setMask({
      cx: `${((e.clientX - r.left) / r.width) * 100}%`,
      cy: `${((e.clientY - r.top) / r.height) * 100}%`,
    });
  };

  // Static, always-visible fallback for reduced motion / touch devices.
  if (reduced || !fine) {
    return (
      <span
        aria-hidden
        className="block bg-gradient-to-br from-accent via-rose to-sage bg-clip-text font-display font-semibold tracking-tight text-transparent"
        style={{ fontSize: "clamp(3.25rem, 17vw, 13rem)", lineHeight: 0.86 }}
      >
        {text}
      </span>
    );
  }

  const common = {
    x: "50%",
    y: "50%",
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontSize: 120,
    fontWeight: 600,
    style: { fontFamily: "var(--font-display)" },
  };

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox="0 0 1000 200"
      className="w-full select-none overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      <defs>
        <linearGradient id="ihe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="50%" stopColor="var(--rose)" />
          <stop offset="100%" stopColor="var(--sage)" />
        </linearGradient>
        <motion.radialGradient
          id="ihe-reveal"
          gradientUnits="userSpaceOnUse"
          r="30%"
          animate={mask}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="ihe-mask">
          <rect width="100%" height="100%" fill="url(#ihe-reveal)" />
        </mask>
      </defs>

      {/* base — gradient fill, always clearly legible */}
      <text {...common} fill="url(#ihe-grad)" opacity={0.45}>
        {text}
      </text>

      {/* stroke draw-in on mount */}
      <motion.text
        {...common}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={0.7}
        opacity={0.25}
        initial={{ strokeDashoffset: 1400, strokeDasharray: 1400 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1400 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* vivid gradient revealed under the cursor */}
      <text
        {...common}
        fill="url(#ihe-grad)"
        mask="url(#ihe-mask)"
        style={{
          ...common.style,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s",
        }}
      >
        {text}
      </text>
    </svg>
  );
}
