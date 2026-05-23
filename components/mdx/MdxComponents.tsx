import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

function Callout({
  children,
  variant = "rose",
}: {
  children: ReactNode;
  variant?: "rose" | "sage";
}) {
  const tone =
    variant === "sage"
      ? "border-sage bg-sage-soft/55 dark:bg-sage-soft/40"
      : "border-accent bg-rose-soft/55 dark:bg-rose-soft/40";
  return (
    <aside
      className={`my-7 rounded-xl border-l-2 px-5 py-4 font-serif text-[1.05rem] not-italic leading-relaxed text-ink ${tone}`}
    >
      {children}
    </aside>
  );
}

function Figure({
  src,
  alt,
  caption,
  aspect = "16/9",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="my-8">
      <ImagePlaceholder
        src={src}
        alt={alt ?? caption ?? "Figure"}
        label={src ? undefined : caption ?? "Image"}
        aspect={aspect}
        className="w-full"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = { Callout, Figure };
