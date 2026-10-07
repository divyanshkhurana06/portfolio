
export type Project = {
  slug: string;
  name: string;
  blurb: string;
  year: number;
  status: "shipped" | "in progress" | "archived" | "exploring";
  href?: string;
  repo?: string;
  links?: { label: string; href: string }[];
  award?: string;
  featured?: boolean;
  stack?: string[];
  details?: {
    role?: string;
    highlights?: string[];
    notes?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "dagar",
    name: "Dagar",
    blurb:
      "An app that helps a town and its authorities give street vendors a legal spot. It started with the chai wala outside my house, whose stall a municipal truck kept taking away. The law has promised him a vending certificate for years. Dagar is how a town can finally issue it.",
    year: 2026,
    status: "in progress",
    award: "Winner \u00b7 Fund My Crazy 2026 \u00b7 Google Gemini",
    featured: true,
    links: [
      {
        label: "Google's post",
        href: "https://www.instagram.com/p/Ddy1xgeAmoM/?img_index=1",
      },
      {
        label: "The idea",
        href: "https://www.instagram.com/p/DdlxeoMyS60/",
      },
    ],
    stack: ["Gemini", "Mapping", "Civic tech"],
    details: {
      role: "Solo: idea, research and pitch",
      highlights: [
        "Picked from 1,92,000 entries to the final ten",
        "Pitched live at IIT Delhi to Tanmay Bhat, Sahiba Bali and Varun Mayya",
        "Theme: Our Community and Living",
      ],
    },
  },
  {
    slug: "salvage",
    name: "Salvage",
    blurb:
      "An AI agent that finds money a crypto wallet is owed but never collected, uncollected Uniswap v3 fees and unclaimed airdrops on Ethereum and Base, and claims it, with every number verified against the chain before it is shown. Ships as a naive v1 and a fixed v2, recorded side by side in PRISM to prove where the first one lies.",
    year: 2026,
    status: "shipped",
    award: "1st place · FORGE AI Reliability Hackathon · graVITas VIT",
    featured: true,
    repo: "https://github.com/divyanshkhurana06/Salvage",
    links: [
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/157DDFppwOD_8xa75MQf1_LciQYiUtn6w/view?usp=sharing",
      },
    ],
    stack: ["Python", "Anvil forks", "Uniswap v3", "Chainlink", "PRISM", "LLM agents"],
    details: {
      role: "Team lead: agent, chain verification, PRISM tracing",
      highlights: [
        "v1 reported $151M on a wallet worth $141; v2 was within 5% on 32 of 32",
        "Every claim is simulate, execute, read the receipt",
        "Chain verdict attached to every PRISM trace",
      ],
    },
  },
  {
    slug: "swarm",
    name: "Swarm",
    blurb:
      "An on chain data labelling market where every answer is paid the moment it is given, for a fraction of a cent. A requester signs once and the task goes on chain; a worker signs in with Google and gets paid per answer. Neither side needs a wallet, gas, or a seed phrase.",
    year: 2026,
    status: "shipped",
    award: "1st place · Monad Blitz Hyderabad V3",
    featured: true,
    href: "https://swarm-rouge-one.vercel.app",
    repo: "https://github.com/divyanshkhurana06/swarm",
    links: [{ label: "Demo", href: "/gallery/monad-blitz-demo.mp4" }],
    stack: ["Next.js", "Solidity", "Monad", "viem", "Privy", "TypeScript"],
    details: {
      role: "Solo build: contracts, relayer, and client",
      highlights: [
        "Paid per answer on chain, in seconds",
        "Google sign in and passkeys instead of a wallet",
        "Gasless: a relayer covers gas, workers never hold any",
      ],
    },
  },
  {
    slug: "interact",
    name: "Interact",
    blurb:
      "A full stack dApp that lets users spend crypto on real world things food delivery, flights, shopping through LLM based AI agents and virtual credit cards. Escrow smart contracts handle trustless payments with dual attestation and time based fallback.",
    year: 2025,
    status: "shipped",
    award: "Winner · ETHGlobal Prague",
    featured: true,
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
        "Took the Flare cross chain track",
        "Escrow with dual attestation & time based fallback",
        "Real time agent execution via FastAPI + WebSockets",
      ],
    },
  },
  {
    slug: "rollcall",
    name: "Roll Call",
    blurb:
      "A governance security monitor for the multisigs that control real protocols. Paste a contract and it finds the Safe above it, recovers who actually signed each transaction, tests whether the signers are independent, dates every signer's last onchain signal, and reports the honest quorum against the declared threshold. Scanned 47 contracts holding $4.82B; reports are sold to agents over x402 on Hedera.",
    year: 2026,
    status: "shipped",
    href: "https://rollcall-pi.vercel.app",
    repo: "https://github.com/divyanshkhurana06/rollcall",
    links: [
      {
        label: "Showcase",
        href: "https://ethglobal.com/showcase/roll-call-7rtg5",
      },
    ],
    stack: ["TypeScript", "React", "viem", "Hedera", "Chainlink CRE", "The Graph"],
    details: {
      role: "Solo build: signature recovery, permutation test, x402 API, CRE workflows",
      highlights: [
        "Mantle's bridge: declared 6 of 14, honest quorum 2, 7 signers dark",
        "Every report paid over x402, attested to HCS, priced by the work it takes",
        "Confidential CRE workflow that de-risks a loan when governance degrades",
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
    links: [{ label: "Devpost", href: "https://devpost.com/software/mailed" }],
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
