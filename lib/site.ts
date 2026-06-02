// Edit this file to make the site yours.

export const site = {
  name: "Your Name",
  shortName: "yourname",
  title: "Your Name — Software, writing, side quests",
  description:
    "A small corner of the internet by Your Name. Writing about software, side projects, and the occasional unrelated tangent.",
  url: "https://yourname.com",
  email: "hello@yourname.com",
  location: "Somewhere on Earth",
  social: {
    github: "https://github.com/yourhandle",
    twitter: "https://twitter.com/yourhandle",
    bluesky: "https://bsky.app/profile/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    rss: "/feed.xml",
  },
  // Years included in the footer copyright line.
  startYear: 2024,
} as const;

export type SiteConfig = typeof site;
