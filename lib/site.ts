// Edit this file to make the site yours.

export const site = {
  name: "Divyansh Khurana",
  shortName: "divyansh",
  title:
    "Divyansh Khurana — CS @ VIT, building at the AI × crypto edge",
  description:
    "Personal site of Divyansh Khurana — CS undergrad at VIT. I build full-stack apps, AI agents, and crypto experiments. Currently interning at Powergrid.",
  // TODO: replace with your real domain once you deploy.
  url: "https://divyanshkhurana.com",
  email: "divyanshkhurana06@gmail.com",
  emailBackup: "divyansh.khurana2024@vitstudent.ac.in",
  location: "Vellore, India",
  social: {
    github: "https://github.com/divyanshkhurana06",
    // TODO: drop your real LinkedIn URL in here.
    linkedin: "https://linkedin.com/in/your-handle",
    // TODO: replace this with your real X / Twitter handle.
    x: "https://x.com/your-handle",
    // TODO: replace or remove these if you don't use them.
    bluesky: "https://bsky.app/profile/your-handle",
    rss: "/feed.xml",
  },
  // Where to find me off-site. Used by the /extra page. Replace the
  // placeholder URLs + display handles with the real ones.
  extras: {
    chess: {
      label: "Chess.com",
      handle: "@divyanshk",
      blurb: "rapid · ~1500",
      url: "https://www.chess.com/member/divyanshk",
    },
    geoguessr: {
      label: "GeoGuessr",
      handle: "divyansh",
      blurb: "world · diamond division",
      url: "https://www.geoguessr.com/user/your-handle",
    },
    discord: {
      label: "Discord",
      handle: "divyansh",
      blurb: "say hi · usually online late",
      url: "https://discord.com/users/your-id",
    },
    x: {
      label: "X",
      handle: "@your-handle",
      blurb: "occasional thoughts",
      url: "https://x.com/your-handle",
    },
    spotify: {
      label: "Spotify",
      handle: "divyansh",
      blurb: "on loop right now · lo-fi piano · the slow stuff",
      url: "https://open.spotify.com/user/your-id",
    },
  },
  // Years included in the footer copyright line.
  startYear: 2025,
} as const;

export type SiteConfig = typeof site;
