import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A small visual collection.",
};

export default function GalleryPage() {
  return (
    <div className="container-wide pt-12 sm:pt-16">
      <PageHeader
        eyebrow="gallery"
        title="A small collection."
        lede="Placeholder — something cool is going here. Photos, screenshots, scribbles, whatever feels right."
      />

      {/* Placeholder grid — replace with real items. The cells are
          deliberately empty so the layout reads as intentional
          rather than half-built. */}
      <ul
        aria-label="Placeholder gallery"
        className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="aspect-square rounded-xl border border-dashed border-rule
                       bg-paper-raised/30 transition-colors hover:bg-paper-raised/60
                       flex items-center justify-center"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              slot {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm italic text-ink-faint">
        Coming soon.
      </p>
    </div>
  );
}
