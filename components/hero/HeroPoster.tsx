/* Static warm "mesh" gradient — the SSR truth and the universal fallback
   (reduced-motion, touch, no-WebGL). Pure CSS, theme-reactive via tokens. */
export default function HeroPoster() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(42% 52% at 16% 26%, color-mix(in oklab, var(--accent) var(--poster-accent), transparent), transparent 70%)",
          "radial-gradient(46% 56% at 84% 20%, color-mix(in oklab, var(--sage) var(--poster-sage), transparent), transparent 72%)",
          "radial-gradient(54% 60% at 70% 82%, color-mix(in oklab, var(--rose) var(--poster-rose), transparent), transparent 72%)",
          "radial-gradient(60% 70% at 40% 60%, color-mix(in oklab, var(--accent-soft) var(--poster-accent2), transparent), transparent 80%)",
          "var(--paper)",
        ].join(","),
      }}
    />
  );
}
