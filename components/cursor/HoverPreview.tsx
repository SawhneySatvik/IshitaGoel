"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export type Cover = { title: string; gradient: string };

type Ctx = {
  show: (cover: Cover) => void;
  hide: () => void;
  move: (x: number, y: number) => void;
  enabled: boolean;
};

const HoverPreviewContext = createContext<Ctx | null>(null);

export function HoverPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [cover, setCover] = useState<Cover | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const enabled = !reduced;

  // Clear on route change (a clicked row navigates before mouseleave fires).
  useEffect(() => {
    setCover(null);
  }, [pathname]);

  // Safety nets: clear if the pointer leaves the window or the tab is hidden.
  useEffect(() => {
    if (!enabled) return;
    const clear = () => setCover(null);
    document.addEventListener("mouseleave", clear);
    window.addEventListener("blur", clear);
    return () => {
      document.removeEventListener("mouseleave", clear);
      window.removeEventListener("blur", clear);
    };
  }, [enabled]);

  const ctx: Ctx = {
    show: (c) => enabled && setCover(c),
    hide: () => setCover(null),
    move: (mx, my) => {
      x.set(mx);
      y.set(my);
    },
    enabled,
  };

  return (
    <HoverPreviewContext.Provider value={ctx}>
      {children}
      {enabled && (
        <div className="pointer-events-none fixed inset-0 z-[75] hidden md:block">
          <AnimatePresence>
            {cover && (
              <motion.div
                key={cover.title}
                style={{ x: sx, y: sy }}
                className="absolute left-0 top-0"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl ring-1 ring-hairline"
                  style={{ backgroundImage: cover.gradient }}
                >
                  <div className="flex h-full items-end p-5">
                    <span className="font-display text-2xl font-medium text-paper drop-shadow-md">
                      {cover.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </HoverPreviewContext.Provider>
  );
}

export function useHoverPreview() {
  return useContext(HoverPreviewContext);
}
