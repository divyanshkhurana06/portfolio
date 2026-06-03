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
  location: "Vellore, India",
  social: {
    github: "https://github.com/divyanshkhurana06",
    // TODO: drop your real LinkedIn URL in here.
    linkedin: "https://linkedin.com/in/your-handle",
    // TODO: replace or remove these if you don't use them.
    twitter: "https://twitter.com/your-handle",
    bluesky: "https://bsky.app/profile/your-handle",
    rss: "/feed.xml",
  },
  // Years included in the footer copyright line.
  startYear: 2025,
} as const;

export type SiteConfig = typeof site;
