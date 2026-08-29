export type GalleryItem = {
  /** Poster frame for video items; the image itself otherwise. */
  src: string;
  alt: string;
  caption: string;
  /** Wider tile in the bento grid on sm+ */
  wide?: boolean;
  /** Present on video items — plays muted and looping in place of the image. */
  video?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/monad-blitz-team.jpg",
    alt: "The Swarm team holding a 1st place $500 board at Monad Blitz Hyderabad V3",
    caption: "Swarm · 1st place · Monad Blitz Hyderabad V3",
    wide: true,
  },
  {
    src: "/gallery/monad-blitz-demo-poster.jpg",
    video: "/gallery/monad-blitz-demo.mp4",
    alt: "Demoing Swarm on stage at Monad Blitz Hyderabad V3",
    caption: "Demoing Swarm on stage · Monad Blitz",
    wide: true,
  },
  {
    src: "/gallery/monad-blitz-selfie.jpg",
    alt: "Divyansh holding the Monad Blitz 1st place board",
    caption: "1st place · $500",
  },
  {
    src: "/gallery/monad-blitz-backdrop.jpg",
    alt: "Divyansh in front of the Monad Blitz backdrop in Hyderabad",
    caption: "Monad Blitz · Hyderabad",
  },
  {
    src: "/gallery/monad-blitz-night.jpg",
    alt: "Two of the Swarm team with the 1st place board outside Babylon Hyderabad",
    caption: "Winning night · Hyderabad",
  },
  {
    src: "/gallery/charminar-night.jpg",
    alt: "Charminar lit up at night in Hyderabad",
    caption: "Charminar · Hyderabad",
  },
  {
    src: "/gallery/hyderabad-balcony.jpg",
    alt: "Divyansh on a balcony overlooking Hyderabad",
    caption: "Hyderabad",
  },
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
