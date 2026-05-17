"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageCurtain() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const first = useRef(true);
  const [token, setToken] = useState(0);

  useEffect(() => {
    // Skip the very first load (the Preloader handles that intro).
    if (first.current) {
      first.current = false;
      return;
    }
    setToken((t) => t + 1);
  }, [pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {token > 0 && (
        <motion.div
          key={token}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] bg-accent"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
