export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Wider tile in the bento grid on sm+ */
  wide?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/ethglobal-award.png",
    alt: "Interact winning the Flare cross-chain track at ETHGlobal Prague",
    caption: "Interact · Flare track winner · ETHGlobal Prague",
    wide: true,
  },
  {
    src: "/gallery/ethglobal-team.png",
    alt: "Interact team at ETHGlobal Prague",
    caption: "Prague Hacker House",
    wide: true,
  },
  {
    src: "/gallery/vit-traditional-day.png",
    alt: "Friends in traditional dress at VIT",
    caption: "Traditional day · VIT",
  },
  {
    src: "/gallery/ieee-hackbattle-25.png",
    alt: "Divyansh at IEEE Computer Society Hackbattle 25 at VIT",
    caption: "IEEE Hackbattle '25 · VIT",
  },
  {
    src: "/gallery/festival-selfie.png",
    alt: "Divyansh at an outdoor night event",
    caption: "Riveira 2025 VIT",
  },
  {
    src: "/gallery/evening-out.png",
    alt: "Two friends dressed up at night",
    caption: "Internal Hackathon win",
  },
  {
    src: "/gallery/fior-di-luna.png",
    alt: "Outside Fior di Luna gelato shop",
    caption: "Rome · Hackathon trip ",
  },
  {
    src: "/gallery/friends-night.png",
    alt: "Group of friends at night",
    caption: "Barcelona · Hackathon trip",
  },
];
