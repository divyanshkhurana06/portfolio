// Edit this file to make the site yours.

export const site = {
  name: "Divyansh Khurana",
  shortName: "divyansh",
  title:
    "Divyansh Khurana — CS @ VIT, building at the AI × crypto edge",
  description:
    "Personal site of Divyansh Khurana — CS undergrad at VIT. I build full-stack apps, AI agents, and crypto experiments. Currently interning at Powergrid.",
  url: "https://divyanshkhurana.com",
  email: "divyanshkhurana06@gmail.com",
  emailBackup: "divyansh.khurana2024@vitstudent.ac.in",
  location: "Vellore, India",
  social: {
    github: "https://github.com/divyanshkhurana06",
    linkedin: "https://www.linkedin.com/in/divyansh-khurana-6891a7264/",
    x: "https://x.com/divyansh_divs",
    bluesky: "https://bsky.app/profile/your-handle",
    rss: "/feed.xml",
  },
  extras: {
    chess: {
      label: "Chess.com",
      handle: "divyanshchessing",
      blurb: "rapid · blitz · bullet",
      url: "https://www.chess.com/member/divyanshchessing",
    },
    geoguessr: {
      label: "GeoGuessr",
      handle: "divyansh",
      blurb: "level 37 · duels · classic",
      url: "https://www.geoguessr.com/user/67e685c6c561a610d3ced9a0",
    },
    x: {
      label: "X",
      handle: "@divyansh_divs",
      blurb: "occasional thoughts",
      url: "https://x.com/divyansh_divs",
    },
    spotify: {
      label: "Spotify",
      handle: "divyansh",
      blurb: "Playlists · The Strokes",
      url: "https://open.spotify.com/user/k0pg9dkn2ou4i64a3g640agaz",
    },
    discord: {
      label: "Discord",
      handle: "divyansh",
      blurb: "lets talk",
      url: "https://discordapp.com/users/481722928036184064",
    },
  },
  startYear: 2025,
} as const;

export type SiteConfig = typeof site;
