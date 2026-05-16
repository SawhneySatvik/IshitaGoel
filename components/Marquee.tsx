export default function Marquee({
  items,
  duration = 36,
}: {
  items: string[];
  duration?: number;
}) {
  const row = [...items, ...items];
  return (
    <div
      className="group/marquee marquee-mask relative overflow-hidden py-2"
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="flex w-max animate-marquee gap-3 whitespace-nowrap">
        {row.map((item, idx) => (
          <span
            key={idx}
            className="rounded-full border border-hairline bg-paper-2/70 px-4 py-1.5 text-sm text-ink/90 dark:bg-paper-2/40"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
