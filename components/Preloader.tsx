"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { greetings } from "@/lib/data";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("ishita-intro")) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";

    let count = 0;
    const greet = setInterval(() => {
      count += 1;
      if (count >= greetings.length) {
        clearInterval(greet);
        setDone(true);
      } else {
        setI(count);
      }
    }, 300);

    const finish = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("ishita-intro", "1");
      document.documentElement.style.overflow = "";
    }, 2200);

    return () => {
      clearInterval(greet);
      clearTimeout(finish);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={done ? "name" : i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="font-display text-4xl font-medium tracking-tight text-ink sm:text-6xl"
              >
                {done ? "Ishita Goel" : greetings[i]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              aria-hidden
              className="block h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: done ? 170 : 44 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
