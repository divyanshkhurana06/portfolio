// Site content — projects and notes. Endorsements live in the database.

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  year: number;
  status: "shipped" | "in progress" | "archived" | "exploring";
  href?: string;
  repo?: string;
  /** Extra outbound links (e.g. hackathon showcase). */
  links?: { label: string; href: string }[];
  stack?: string[];
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

export const projects: Project[] = [
  {
    slug: "interact",
    name: "Interact",
    blurb:
      "A full stack dApp that lets users spend crypto on real world things food delivery, flights, shopping through LLM based AI agents and virtual credit cards. Escrow smart contracts handle trustless payments with dual attestation and time based fallback. Won ETHGlobal Prague.",
    year: 2025,
    status: "shipped",
    repo: "https://github.com/vectorthrust/Interact",
    links: [
      {
        label: "Showcase",
        href: "https://ethglobal.com/showcase/interact-9qtx7",
      },
    ],
    stack: ["Next.js", "React", "FastAPI", "LangChain", "Solidity", "WebSockets"],
    details: {
      role: "Hackathon team: full stack + smart contracts",
      highlights: [
        "Won ETHGlobal Prague",
        "Escrow with dual attestation & time based fallback",
        "Real time agent execution via FastAPI + WebSockets",
      ],
    },
  },
  {
    slug: "mailed",
    name: "Mailed",
    blurb:
      "A Chrome extension for email tracking with real time analytics and AI based categorization. Responsive React + TypeScript dashboard, Node.js + Supabase backend, Hugging Face for categorization, Google OAuth for sign in.",
    year: 2025,
    status: "shipped",
    repo: "https://github.com/divyanshkhurana06/mailed0",
    stack: ["React", "TypeScript", "Tailwind", "Node.js", "Supabase", "Hugging Face"],
    details: {
      role: "Solo build",
      highlights: [
        "Real time email tracking from inside Gmail",
        "AI categorization via Hugging Face",
        "Google OAuth + Node.js + Supabase backend",
      ],
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
    body: "New notebook arrived. Filling the first page is the hardest part wrote down today's date and called it progress.",
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
