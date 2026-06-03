import {
  siBitcoin,
  siC,
  siCplusplus,
  siEthereum,
  siFastapi,
  siGit,
  siHuggingface,
  siIpfs,
  siJavascript,
  siJest,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siSolana,
  siSolidity,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
} from "simple-icons";

type Tech =
  | { name: string; path: string; kind?: "icon" }
  | { name: string; kind: "text"; glyph: string };

// Mixed order on purpose — a casual stream of languages, frameworks,
// infra, and a handful of blockchain bits picked up from the Interact
// hackathon project.
const TECH: Tech[] = [
  { name: "Python", path: siPython.path },
  { name: "React", path: siReact.path },
  { name: "Solidity", path: siSolidity.path },
  { name: "TypeScript", path: siTypescript.path },
  { name: "FastAPI", path: siFastapi.path },
  { name: "Next.js", path: siNextdotjs.path },
  { name: "Ethereum", path: siEthereum.path },
  { name: "Node.js", path: siNodedotjs.path },
  { name: "C++", path: siCplusplus.path },
  { name: "PostgreSQL", path: siPostgresql.path },
  { name: "Tailwind", path: siTailwindcss.path },
  { name: "MongoDB", path: siMongodb.path },
  { name: "LangChain", path: siLangchain.path },
  { name: "JavaScript", path: siJavascript.path },
  { name: "Supabase", path: siSupabase.path },
  { name: "IPFS", path: siIpfs.path },
  { name: "TensorFlow", path: siTensorflow.path },
  { name: "Pandas", path: siPandas.path },
  { name: "C", path: siC.path },
  { name: "NumPy", path: siNumpy.path },
  { name: "Solana", path: siSolana.path },
  { name: "Jest", path: siJest.path },
  { name: "Hugging Face", path: siHuggingface.path },
  { name: "Bitcoin", path: siBitcoin.path },
  { name: "Git", path: siGit.path },
];

// One loop = duplicate the list once, animate the track from 0 → -50%
// over this duration. Lower number = faster.
const DURATION_SECONDS = 40;

export function TechMarquee() {
  // Render twice; the second copy makes the seam invisible as the track
  // loops back to start.
  const items = [...TECH, ...TECH];

  return (
    <section
      aria-label="A short list of technologies I work with"
      className="py-2"
    >
      <div className="container-wide mb-4 flex items-baseline justify-between">
        <p className="eyebrow">tech I reach for</p>
        <span className="hidden text-xs text-ink-faint sm:inline">
          trying to learn more
        </span>
      </div>

      <div className="marquee border-y border-rule/70 bg-paper-raised/40 py-5">
        <ul
          className="marquee-track items-center gap-10"
          style={
            {
              ["--marquee-duration" as string]: `${DURATION_SECONDS}s`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {items.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-ink-muted
                         transition-colors duration-300 hover:text-accent"
            >
              <TechGlyph tech={t} />
              <span className="font-mono text-[13px] tracking-tight">
                {t.name}
              </span>
              <span aria-hidden className="ml-8 text-ink-faint/50">
                ·
              </span>
            </li>
          ))}
        </ul>

        <p className="sr-only">
          Technologies I work with: {TECH.map((t) => t.name).join(", ")}.
        </p>
      </div>
    </section>
  );
}

function TechGlyph({ tech }: { tech: Tech }) {
  if ("kind" in tech && tech.kind === "text") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]">
        <text
          x="12"
          y="17.5"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fill="currentColor"
        >
          {tech.glyph}
        </text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <path d={(tech as { path: string }).path} fill="currentColor" />
    </svg>
  );
}
