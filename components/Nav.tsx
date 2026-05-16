"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import Magnetic from "@/components/cursor/Magnetic";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#about", id: "about", label: "About" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#writing", id: "writing", label: "Writing" },
  { href: "#contact", id: "contact", label: "Hello" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          data-cursor=""
          className="font-display text-base font-medium tracking-tight text-ink"
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-3 text-sm text-muted sm:gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  data-cursor=""
                  className={`link-underline pb-0.5 transition-colors hover:text-ink ${
                    active === l.id ? "text-accent" : ""
                  }`}
                  href={l.href}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Magnetic className="inline-block" strength={0.4}>
            <a
              href={profile.cv}
              data-cursor="open"
              className="inline-block rounded-full border border-hairline px-3.5 py-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              CV
            </a>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
