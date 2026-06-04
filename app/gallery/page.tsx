import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { galleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from ETHGlobal Prague, VIT, and a few off-duty moments.",
};

export default function GalleryPage() {
  return (
    <div className="container-wide pt-12 sm:pt-16">
      <PageHeader
        eyebrow="gallery"
        title="A small collection."
        lede="Hackathon wins, campus days, work trips etc."
      />

      <ul
        aria-label="Gallery"
        className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {galleryItems.map((item) => (
          <li
            key={item.src}
            className={
              item.wide ? "sm:col-span-2 lg:col-span-2" : undefined
            }
          >
            <figure
              className="group overflow-hidden rounded-xl border border-rule/70
                         bg-paper-raised/40"
            >
              <div
                className={
                  item.wide
                    ? "relative aspect-[16/10] w-full"
                    : "relative aspect-[4/5] w-full sm:aspect-square"
                }
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    item.wide
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-500
                             group-hover:scale-[1.02]"
                  priority={item.src.includes("ethglobal-award")}
                />
              </div>
              <figcaption className="border-t border-rule/60 px-3 py-2.5">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
