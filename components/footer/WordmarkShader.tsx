"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function WordmarkShader() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 30);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 16);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="mx-auto max-w-6xl overflow-hidden px-6 pt-16"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.p
        style={{ x: sx, y: sy }}
        data-cursor=""
        className="wordmark-fill select-none text-center font-display-lg text-[22vw] leading-none"
      >
        Ishita
      </motion.p>
    </div>
  );
}
