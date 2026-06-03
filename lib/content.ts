// Placeholder content. Replace the items in each array with your own,
// or wire these up to MDX / a CMS later.

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

export type Endorsement = {
  id: string;
  name: string;
  relation: string;
  date: string; // ISO YYYY-MM-DD
  body: string;
};

export const projects: Project[] = [
  {
    slug: "interact",
    name: "Interact",
    blurb:
      "A full-stack dApp that lets users spend crypto on real-world things — food delivery, flights, shopping — through LLM-based AI agents and virtual credit cards. Escrow smart contracts handle trustless payments with dual attestation and time-based fallback. Won ETHGlobal Prague.",
    year: 2025,
    status: "shipped",
    // TODO: replace these placeholders with the real Interact links.
    href: "https://ethglobal.com/showcase",
    repo: "https://github.com/divyanshkhurana06",
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
    // TODO: replace these placeholders with the real Chrome store + repo URLs.
    href: "https://chromewebstore.google.com",
    repo: "https://github.com/divyanshkhurana06",
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

// Endorsements are sorted newest-first. The two most recent ones bubble up
// to the home page; the full list lives on /endorse. Replace these with
// real notes as people leave them.
export const endorsements: Endorsement[] = [
  {
    id: "e-003",
    name: "Placeholder Collaborator",
    relation: "Hackathon teammate",
    date: "2026-05-12",
    body: "Placeholder endorsement — a short, honest sentence or two from someone you've worked with. Replace with the real thing.",
  },
  {
    id: "e-002",
    name: "Placeholder Teammate",
    relation: "Internship colleague",
    date: "2026-04-03",
    body: "Placeholder endorsement — describe a specific moment or skill. Specifics are always more believable than adjectives.",
  },
  {
    id: "e-001",
    name: "Placeholder Mentor",
    relation: "Project advisor",
    date: "2026-03-20",
    body: "Placeholder endorsement — one more, so the list doesn't look thin.",
  },
];
