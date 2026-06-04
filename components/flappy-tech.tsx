"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  Flappy Tech — flap through merge gates & API pillars. Score = deploys.    */
/*  Theme-aware (paper / ink / amber). Best score in localStorage.            */
/* -------------------------------------------------------------------------- */

const BEST_KEY = "flappy-tech:best";

/** Obstacle labels — your stack, projects, and dev in-jokes. */
const GATE_LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Solidity",
  "FastAPI",
  "Prisma",
  "Postgres",
  "LangChain",
  "Interact",
  "Mailed",
  "ETHGlobal",
  "git push",
  "npm run build",
  "docker pull",
  "merge conflict",
  "502 Bad Gateway",
  "VIT CSE",
  "Powergrid",
  "WebGL",
  "Supabase",
  "TensorFlow",
  "IPFS",
  "Node.js",
  "Tailwind",
  "MongoDB",
] as const;

type Palette = {
  paper: string;
  paperRaised: string;
  paperSunk: string;
  ink: string;
  inkMuted: string;
  inkFaint: string;
  rule: string;
  accent: string;
  accentSoft: string;
};

type Obstacle = {
  x: number;
  gapCenter: number;
  gapSize: number;
  label: string;
  scored: boolean;
};

type GamePhase = "idle" | "playing" | "dead";

const DEFAULT_PALETTE: Palette = {
  paper: "rgb(250, 248, 243)",
  paperRaised: "rgb(245, 242, 234)",
  paperSunk: "rgb(238, 234, 224)",
  ink: "rgb(28, 25, 23)",
  inkMuted: "rgb(87, 83, 78)",
  inkFaint: "rgb(168, 162, 158)",
  rule: "rgb(231, 229, 228)",
  accent: "rgb(180, 83, 9)",
  accentSoft: "rgb(254, 243, 199)",
};

function readPalette(): Palette {
  if (typeof document === "undefined") return DEFAULT_PALETTE;

  const s = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim()
      ? `rgb(${s.getPropertyValue(name).trim()})`
      : fallback;

  return {
    paper: pick("--paper", DEFAULT_PALETTE.paper),
    paperRaised: pick("--paper-raised", DEFAULT_PALETTE.paperRaised),
    paperSunk: pick("--paper-sunk", DEFAULT_PALETTE.paperSunk),
    ink: pick("--ink", DEFAULT_PALETTE.ink),
    inkMuted: pick("--ink-muted", DEFAULT_PALETTE.inkMuted),
    inkFaint: pick("--ink-faint", DEFAULT_PALETTE.inkFaint),
    rule: pick("--rule", DEFAULT_PALETTE.rule),
    accent: pick("--accent", DEFAULT_PALETTE.accent),
    accentSoft: pick("--accent-soft", DEFAULT_PALETTE.accentSoft),
  };
}

export function FlappyTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const phaseRef = useRef<GamePhase>("idle");
  const birdRef = useRef({ y: 0, vy: 0, rot: 0 });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const paletteRef = useRef<Palette>(DEFAULT_PALETTE);
  const starsRef = useRef<{ x: number; y: number; s: number; sp: number }[]>([]);
  const labelIdxRef = useRef(0);
  const bestRef = useRef(0);

  const { resolvedTheme } = useTheme();
  const [best, setBest] = useState(0);

  const syncPhase = (p: GamePhase) => {
    phaseRef.current = p;
  };

  const nextLabel = () => {
    const label = GATE_LABELS[labelIdxRef.current % GATE_LABELS.length]!;
    labelIdxRef.current += 1;
    return label;
  };

  const resetGame = useCallback((h: number) => {
    birdRef.current = { y: h * 0.42, vy: 0, rot: 0 };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    frameRef.current = 0;
  }, []);

  const spawnObstacle = useCallback((w: number, h: number, offsetX: number) => {
    const gapSize = Math.min(150, Math.max(108, h * 0.28));
    const margin = gapSize * 0.55;
    const gapCenter =
      margin + Math.random() * (h - gapSize - margin * 2);
    obstaclesRef.current.push({
      x: offsetX,
      gapCenter,
      gapSize,
      label: nextLabel(),
      scored: false,
    });
  }, []);

  const flap = useCallback(() => {
    if (phaseRef.current === "idle") {
      syncPhase("playing");
      birdRef.current.vy = -6.2;
      return;
    }
    if (phaseRef.current === "playing") {
      birdRef.current.vy = -6.2;
    }
    if (phaseRef.current === "dead") {
      const { h } = sizeRef.current;
      resetGame(h);
      syncPhase("playing");
      birdRef.current.vy = -6.2;
    }
  }, [resetGame]);

  useEffect(() => {
    try {
      const b = window.localStorage.getItem(BEST_KEY);
      if (b) {
        const n = Number(b);
        setBest(n);
        bestRef.current = n;
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    bestRef.current = best;
  }, [best]);

  useEffect(() => {
    paletteRef.current = readPalette();
  }, [resolvedTheme]);

  useEffect(() => {
    paletteRef.current = readPalette();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      sizeRef.current = { w: rect.width, h: rect.height, dpr };

      if (starsRef.current.length === 0) {
        starsRef.current = Array.from({ length: 28 }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          s: 0.6 + Math.random() * 1.4,
          sp: 0.15 + Math.random() * 0.35,
        }));
      }

      if (phaseRef.current === "idle") {
        resetGame(rect.height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const GRAVITY = 0.28;
    const PIPE_SPEED = reduced ? 1.6 : 2.35;
    const PIPE_GAP = 200;
    const BIRD_X = 72;
    const BIRD_R = 14;

    const drawBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const p = paletteRef.current;
      ctx.fillStyle = p.paperSunk;
      ctx.fillRect(0, 0, w, h);

      // Subtle terminal grid
      ctx.strokeStyle = p.rule;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      const grid = 28;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Drifting binary dust
      ctx.fillStyle = p.inkFaint;
      ctx.globalAlpha = 0.2;
      ctx.font = "10px ui-monospace, monospace";
      for (const star of starsRef.current) {
        star.x -= star.sp;
        if (star.x < -20) star.x = w + 10;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", star.x, star.y);
      }
      ctx.globalAlpha = 1;
    };

    const drawPillar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      topH: number,
      bottomY: number,
      h: number,
      label: string,
      isTop: boolean
    ) => {
      const p = paletteRef.current;
      const pw = 52;

      ctx.fillStyle = p.paperRaised;
      ctx.strokeStyle = p.rule;
      ctx.lineWidth = 2;
      if (isTop) {
        ctx.fillRect(x, 0, pw, topH);
        ctx.strokeRect(x, 0, pw, topH);
      } else {
        ctx.fillRect(x, bottomY, pw, h - bottomY);
        ctx.strokeRect(x, bottomY, pw, h - bottomY);
      }

      // Amber accent edge (deploy pipeline stripe)
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.85;
      if (isTop) {
        ctx.fillRect(x + pw - 4, 0, 4, topH);
      } else {
        ctx.fillRect(x + pw - 4, bottomY, 4, h - bottomY);
      }
      ctx.globalAlpha = 1;

      // Label chip on the gap-facing edge
      ctx.fillStyle = p.ink;
      ctx.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      const chipY = isTop ? topH - 18 : bottomY + 6;
      ctx.fillStyle = p.accentSoft;
      ctx.globalAlpha = 0.95;
      const tw = ctx.measureText(label).width + 10;
      ctx.fillRect(x + 4, chipY, tw, 14);
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.ink;
      ctx.fillText(label, x + 9, chipY + 10);
    };

    const drawBird = (
      ctx: CanvasRenderingContext2D,
      y: number,
      rot: number
    ) => {
      const p = paletteRef.current;
      ctx.save();
      ctx.translate(BIRD_X, y);
      ctx.rotate(rot);

      // Glow
      ctx.shadowColor = p.accent;
      ctx.shadowBlur = 14;

      // Body — amber "commit" packet
      ctx.fillStyle = p.accent;
      ctx.beginPath();
      ctx.roundRect(-BIRD_R, -BIRD_R, BIRD_R * 2, BIRD_R * 2, 5);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Monogram
      ctx.fillStyle = p.paper;
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("dk", 0, 1);

      // Tiny bracket wings
      ctx.fillStyle = p.ink;
      ctx.globalAlpha = 0.5;
      ctx.font = "12px ui-monospace, monospace";
      ctx.fillText("{", -BIRD_R - 10, 2);
      ctx.fillText("}", BIRD_R + 4, 2);
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const tick = () => {
      const { w, h, dpr } = sizeRef.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameRef.current += 1;

      const phase = phaseRef.current;
      const bird = birdRef.current;

      if (phase === "playing") {
        bird.vy += GRAVITY;
        bird.y += bird.vy;
        bird.rot = Math.min(Math.PI / 4, Math.max(-0.35, bird.vy * 0.06));

        // Spawn pillars
        const last = obstaclesRef.current[obstaclesRef.current.length - 1];
        if (!last || last.x < w - PIPE_GAP) {
          spawnObstacle(w, h, w + 40);
        }

        for (const obs of obstaclesRef.current) {
          obs.x -= PIPE_SPEED;

          const pw = 52;
          const topH = obs.gapCenter - obs.gapSize / 2;
          const bottomY = obs.gapCenter + obs.gapSize / 2;

          // Score when passed
          if (!obs.scored && obs.x + pw < BIRD_X) {
            obs.scored = true;
            scoreRef.current += 1;
          }

          // Collision — hitbox slightly forgiving
          const hitX = BIRD_X;
          const hitY = bird.y;
          const inX = hitX + BIRD_R > obs.x && hitX - BIRD_R < obs.x + pw;
          if (inX && (hitY - BIRD_R < topH || hitY + BIRD_R > bottomY)) {
            syncPhase("dead");
            try {
              const b = Number(window.localStorage.getItem(BEST_KEY) ?? 0);
              if (scoreRef.current > b) {
                window.localStorage.setItem(BEST_KEY, String(scoreRef.current));
                bestRef.current = scoreRef.current;
                setBest(scoreRef.current);
              }
            } catch {
              /* ignore */
            }
          }
        }

        obstaclesRef.current = obstaclesRef.current.filter((o) => o.x > -80);

        if (bird.y + BIRD_R > h || bird.y - BIRD_R < 0) {
          syncPhase("dead");
        }
      } else if (phase === "idle") {
        bird.y = h * 0.42 + Math.sin(frameRef.current * 0.04) * 6;
        bird.rot = 0;
      }

      // ---- Render ----
      drawBackground(ctx, w, h);

      for (const obs of obstaclesRef.current) {
        const topH = obs.gapCenter - obs.gapSize / 2;
        const bottomY = obs.gapCenter + obs.gapSize / 2;
        drawPillar(ctx, obs.x, topH, bottomY, h, obs.label, true);
        drawPillar(ctx, obs.x, topH, bottomY, h, obs.label, false);
      }

      drawBird(ctx, bird.y, bird.rot);

      // HUD
      const p = paletteRef.current;
      ctx.fillStyle = p.ink;
      ctx.font = "600 11px ui-monospace, monospace";
      ctx.fillText(`deploys ${scoreRef.current}`, 12, 22);
      ctx.fillStyle = p.inkFaint;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(`best ${bestRef.current}`, 12, 36);

      // Watermark — your handle
      ctx.fillStyle = p.inkFaint;
      ctx.globalAlpha = 0.45;
      ctx.font = "italic 11px ui-serif, Georgia, serif";
      ctx.textAlign = "right";
      ctx.fillText(site.shortName, w - 12, h - 12);
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;

      // Overlays
      if (phase === "idle") {
        ctx.fillStyle = p.ink;
        ctx.globalAlpha = 0.88;
        ctx.font = "600 13px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("tap or space to deploy", w / 2, h * 0.58);
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillStyle = p.inkMuted;
        ctx.fillText("flap through the stack", w / 2, h * 0.58 + 18);
        ctx.textAlign = "left";
        ctx.globalAlpha = 1;
      }

      if (phase === "dead") {
        ctx.fillStyle = p.paper;
        ctx.globalAlpha = 0.72;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;

        ctx.fillStyle = p.ink;
        ctx.textAlign = "center";
        ctx.font = "600 15px ui-monospace, monospace";
        ctx.fillText("build failed", w / 2, h / 2 - 28);
        ctx.font = "11px ui-monospace, monospace";
        ctx.fillStyle = p.inkMuted;
        ctx.fillText(`${scoreRef.current} deploys · tap to retry`, w / 2, h / 2 - 6);
        ctx.textAlign = "left";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [resetGame, spawnObstacle, resolvedTheme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  return (
    <section
      aria-label="Flappy Tech mini-game"
      ref={containerRef}
      className="relative h-[44vh] min-h-[300px] w-full overflow-hidden rounded-xl
                 border border-rule/70 bg-paper-sunk select-none"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          e.preventDefault();
          flap();
        }}
        className="absolute inset-0 h-full w-full touch-none"
        role="img"
        aria-label="Flappy Tech game canvas. Press space or tap to flap."
      />

      <p
        className="pointer-events-none absolute left-4 top-3 font-mono text-[10.5px]
                   uppercase tracking-[0.14em] text-ink-faint"
      >
        flappy tech · {site.shortName}
      </p>
    </section>
  );
}
