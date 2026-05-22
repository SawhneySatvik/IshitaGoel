import Image from "next/image";

export type PlaceholderVariant =
  | "glyph"
  | "halftone"
  | "contour"
  | "data"
  | "duotone";

/* Deterministic hash + PRNG so a given seed always renders the same art
   (SSR-safe: no Math.random, no Date, identical on server and client). */
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function prng(seed: number) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r2 = (n: number) => Math.round(n * 100) / 100;

function GenerativeArt({
  seed,
  variant,
  initials,
}: {
  seed: string;
  variant: PlaceholderVariant;
  initials?: string;
}) {
  const rand = prng(hashSeed(seed + variant));
  const id = hashSeed(seed).toString(36);

  if (variant === "data") {
    const nodes = Array.from({ length: 9 }, () => ({
      x: r2(8 + rand() * 84),
      y: r2(10 + rand() * 80),
      r: r2(0.9 + rand() * 2.2),
      sage: rand() > 0.55,
    }));
    const edges: [number, number][] = [];
    nodes.forEach((_, i) => {
      const j = (i + 1 + Math.floor(rand() * 2)) % nodes.length;
      edges.push([i, j]);
    });
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect width="100" height="100" className="fill-paper-2" />
        <rect width="100" height="100" className="fill-accent" opacity="0.07" />
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            className="stroke-accent"
            strokeWidth="0.4"
            strokeOpacity="0.45"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            className={n.sage ? "fill-sage" : "fill-accent"}
            opacity="0.8"
          />
        ))}
      </svg>
    );
  }

  if (variant === "contour") {
    const cx = r2(30 + rand() * 40);
    const cy = r2(35 + rand() * 30);
    const rings = Array.from({ length: 7 }, (_, i) => i);
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect width="100" height="100" className="fill-sage-soft" opacity="0.7" />
        <rect width="100" height="100" className="fill-paper-2" opacity="0.55" />
        {rings.map((i) => (
          <ellipse
            key={i}
            cx={cx + i * (rand() * 3 - 1.5)}
            cy={cy + i * (rand() * 3 - 1)}
            rx={6 + i * (7 + rand() * 2)}
            ry={5 + i * (5.5 + rand() * 2)}
            fill="none"
            className="stroke-sage"
            strokeWidth="0.5"
            strokeOpacity={r2(0.62 - i * 0.05)}
          />
        ))}
      </svg>
    );
  }

  if (variant === "halftone") {
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`hg-${id}`} cx="32%" cy="28%" r="85%">
            <stop offset="0%" className="[stop-color:var(--accent-soft)]" />
            <stop offset="100%" className="[stop-color:var(--paper-2)]" />
          </radialGradient>
          <pattern
            id={`hd-${id}`}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${r2(rand() * 40 - 20)})`}
          >
            <circle cx="2.5" cy="2.5" r="1.1" className="fill-accent" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#hg-${id})`} />
        <rect width="100" height="100" fill={`url(#hd-${id})`} opacity="0.3" />
        <circle cx="30" cy="28" r="42" className="fill-rose" opacity="0.1" />
      </svg>
    );
  }

  if (variant === "duotone") {
    const angle = r2(rand() * 60 + 110);
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`dt-${id}`}
            gradientTransform={`rotate(${angle} 0.5 0.5)`}
          >
            <stop offset="0%" className="[stop-color:var(--ink)]" stopOpacity="0.7" />
            <stop offset="55%" className="[stop-color:var(--accent)]" stopOpacity="0.6" />
            <stop offset="100%" className="[stop-color:var(--accent-soft)]" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" className="fill-paper-2" />
        <rect width="100" height="100" fill={`url(#dt-${id})`} />
      </svg>
    );
  }

  // glyph (default) — oversized Fraunces letterform bled off-frame
  const ch = (initials || seed).trim().charAt(0).toUpperCase() || "·";
  const gx = r2(20 + rand() * 30);
  const rot = r2(rand() * 16 - 8);
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`gg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="[stop-color:var(--paper-2)]" />
          <stop offset="100%" className="[stop-color:var(--accent-soft)]" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#gg-${id})`} />
      <text
        x={gx}
        y="92"
        className="font-display fill-accent"
        style={{ fontSize: "120px", fontWeight: 600 }}
        opacity="0.26"
        transform={`rotate(${rot} ${gx} 60)`}
      >
        {ch}
      </text>
    </svg>
  );
}

export function ImagePlaceholder({
  src,
  alt,
  aspect = "4/3",
  initials,
  label,
  className = "",
  rounded = "rounded-2xl",
  variant = "glyph",
}: {
  src?: string;
  alt: string;
  aspect?: string;
  initials?: string;
  label?: string;
  className?: string;
  rounded?: string;
  variant?: PlaceholderVariant;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ring-1 ring-hairline ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <>
          <GenerativeArt seed={initials || alt} variant={variant} initials={initials} />
          {/* unify with the page's film texture + soft vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 120% at 50% 0%, transparent 55%, color-mix(in oklab, var(--ink) 18%, transparent) 100%)",
            }}
            aria-hidden="true"
          />
          {label && (
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/70 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-muted backdrop-blur-sm">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
