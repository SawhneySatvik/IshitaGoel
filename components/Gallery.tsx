import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  ImagePlaceholder,
  type PlaceholderVariant,
} from "@/components/ui/ImagePlaceholder";
import { gallery } from "@/lib/data";

const variants: PlaceholderVariant[] = [
  "halftone",
  "contour",
  "glyph",
  "data",
  "contour",
  "halftone",
];

export default function Gallery() {
  return (
    <Section wide>
      <Reveal className="mb-10 flex items-baseline gap-4 border-b border-hairline pb-4">
        <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
          Moments
        </span>
        <h2 className="text-h2 font-display font-medium tracking-tight text-ink">
          In the world
        </h2>
      </Reveal>

      <RevealGroup className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {gallery.map((g, i) => (
          <RevealItem
            key={g.label}
            className="group relative block break-inside-avoid overflow-hidden rounded-2xl"
          >
            <div data-cursor="view">
              <ImagePlaceholder
                src={g.src}
                alt={g.label}
                aspect={g.aspect}
                variant={variants[i % variants.length]}
                rounded="rounded-2xl"
                className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end rounded-2xl bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="p-4 font-display text-lg text-[#f7f3ec]">
                  {g.label}
                </span>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
