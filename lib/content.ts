// Placeholder content. Replace the items in each array with your own,
// or wire these up to MDX / a CMS later.

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags?: string[];
  readingTime?: string;
};

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  year: number;
  status: "shipped" | "in progress" | "archived" | "exploring";
  href?: string;
  repo?: string;
  stack?: string[];
  // Shown on the back of the project card (on hover).
  details?: {
    role?: string;
    highlights?: string[];
    notes?: string;
  };
};

export type Note = {
  id: string;
  date: string;
  body: string;
};

export type Book = {
  title: string;
  author: string;
  finished?: string;
  rating?: number; // 1-5
  status: "reading" | "finished" | "want";
};

export const posts: Post[] = [
  {
    slug: "placeholder-post-one",
    title: "A first placeholder post you can replace later",
    date: "2026-04-12",
    summary:
      "A short, honest paragraph that previews the post. Two sentences is usually plenty — enough to hint at the idea without spoiling it.",
    tags: ["writing", "meta"],
    readingTime: "4 min",
  },
  {
    slug: "placeholder-post-two",
    title: "Notes from a small experiment",
    date: "2026-03-01",
    summary:
      "What I tried, what broke, and the one thing I'd do differently next time. Mostly for future-me, but maybe useful to you.",
    tags: ["engineering", "notes"],
    readingTime: "6 min",
  },
  {
    slug: "placeholder-post-three",
    title: "On finishing things",
    date: "2026-01-18",
    summary:
      "Some thoughts on the unromantic last 10% of a project, and a small ritual that's helped me ship more of them.",
    tags: ["essays"],
    readingTime: "5 min",
  },
  {
    slug: "placeholder-post-four",
    title: "Year in review — placeholder edition",
    date: "2025-12-30",
    summary:
      "Looking back at the things I made, the things I almost made, and the things I learned I didn't actually want to make.",
    tags: ["review"],
    readingTime: "9 min",
  },
  {
    slug: "placeholder-post-five",
    title: "A tiny tool I keep reaching for",
    date: "2025-11-04",
    summary:
      "Short writeup of a 60-line script that has saved me more time than most of the apps on my laptop.",
    tags: ["tools"],
    readingTime: "3 min",
  },
];

export const projects: Project[] = [
  {
    slug: "interact",
    name: "Interact",
    blurb:
      "A full-stack dApp that lets users spend crypto on real-world things — food delivery, flights, shopping — through LLM-based AI agents and virtual credit cards. Escrow smart contracts handle trustless payments with dual attestation and time-based fallback. Won ETHGlobal Prague.",
    year: 2025,
    status: "shipped",
    // TODO: add live link if there is one.
    // TODO: add repo URL.
    stack: ["Next.js", "React", "FastAPI", "LangChain", "Solidity", "WebSockets"],
    details: {
      role: "Hackathon team — full-stack + smart contracts",
      highlights: [
        "Won ETHGlobal Prague",
        "Escrow with dual attestation & time-based fallback",
        "Real-time agent execution via FastAPI + WebSockets",
      ],
      notes:
        "Placeholder — add a sentence or two on what you'd do differently, or what you learned, here.",
    },
  },
  {
    slug: "mailed",
    name: "Mailed",
    blurb:
      "A Chrome extension for email tracking with real-time analytics and AI-based categorization. Responsive React + TypeScript dashboard, Node.js + Supabase backend, Hugging Face for categorization, Google OAuth for sign-in.",
    year: 2025,
    status: "shipped",
    // TODO: add Chrome store link and repo URL.
    stack: ["React", "TypeScript", "Tailwind", "Node.js", "Supabase", "Hugging Face"],
    details: {
      role: "Solo build",
      highlights: [
        "Real-time email tracking from inside Gmail",
        "AI categorization via Hugging Face",
        "Google OAuth + Node.js + Supabase backend",
      ],
      notes:
        "Placeholder — what worked, what didn't, anything else worth saying.",
    },
  },
  {
    slug: "next-thing",
    name: "Next thing",
    blurb:
      "Placeholder card for the project I'm currently exploring. Will replace this with something real once it's worth talking about.",
    year: 2026,
    status: "exploring",
    details: {
      role: "Placeholder — solo / team / what kind of role.",
      highlights: [
        "Placeholder bullet one.",
        "Placeholder bullet two.",
        "Placeholder bullet three.",
      ],
      notes: "Placeholder — describe the project in more depth once it's ready.",
    },
  },
];

export const notes: Note[] = [
  {
    id: "n-005",
    date: "2026-05-22",
    body: "Spent the morning rewriting a script I'd been putting off for months. Took thirty minutes. Annoying lesson, learned again.",
  },
  {
    id: "n-004",
    date: "2026-05-14",
    body: "Reading a paper on row-polymorphic types. Will probably not understand it, but I like trying.",
  },
  {
    id: "n-003",
    date: "2026-04-29",
    body: "New notebook arrived. Filling the first page is the hardest part — wrote down today's date and called it progress.",
  },
  {
    id: "n-002",
    date: "2026-04-18",
    body: "Went for a walk without my phone for the first time in a while. Highly recommend.",
  },
  {
    id: "n-001",
    date: "2026-04-09",
    body: "Cleaning up old side projects. Half of them I forgot I made; the other half I forgot why I made.",
  },
];

export const reading: Book[] = [
  {
    title: "Placeholder Title One",
    author: "Author A",
    finished: "2026-05-02",
    rating: 4,
    status: "finished",
  },
  {
    title: "Placeholder Title Two",
    author: "Author B",
    finished: "2026-04-15",
    rating: 5,
    status: "finished",
  },
  {
    title: "Currently Reading",
    author: "Author C",
    status: "reading",
  },
  {
    title: "On the To-Read Pile",
    author: "Author D",
    status: "want",
  },
];

export const uses = {
  hardware: [
    { name: "Laptop", value: "Placeholder — e.g. MacBook Air M3" },
    { name: "Monitor", value: "Placeholder — e.g. 27\" 4K" },
    { name: "Keyboard", value: "Placeholder — e.g. a tenkeyless mech" },
    { name: "Mouse / trackpad", value: "Placeholder" },
    { name: "Phone", value: "Placeholder" },
    { name: "Headphones", value: "Placeholder" },
  ],
  software: [
    { name: "Editor", value: "Placeholder — e.g. Cursor / Neovim" },
    { name: "Terminal", value: "Placeholder — e.g. Ghostty + fish" },
    { name: "Browser", value: "Placeholder" },
    { name: "Notes", value: "Placeholder — e.g. Obsidian" },
    { name: "Design", value: "Placeholder — e.g. Figma" },
    { name: "Music", value: "Placeholder" },
  ],
} as const;

// "Now" page — a snapshot of what you're focused on lately.
export const now = {
  updated: "2026-06-03",
  blocks: [
    {
      heading: "Working on",
      body: "Interning at Powergrid (May – July 2026). On the side, slowly chipping away at the next project after Interact — still in the messy ideation phase.",
    },
    {
      heading: "Learning",
      body: "Placeholder — something I'm trying to get better at this season. Will fill this in soon.",
    },
    {
      heading: "Reading",
      body: "Placeholder — a book or two I'd recommend, plus one I'm slowly working through.",
    },
    {
      heading: "Elsewhere",
      body: "Placeholder — where I am physically, or where my head is, this month.",
    },
  ],
} as const;
