"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
/* -------------------------------------------------------------------------- */
/*  Flappy Tech — flap through merge gates. Score = deploys.                  */
/* -------------------------------------------------------------------------- */

const BEST_KEY = "flappy-tech:best";
const GATE_TOP = "please";
const GATE_BOTTOM = "hire me";

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

function gameDpr(): number {
  const raw = window.devicePixelRatio || 1;
  const narrow = window.matchMedia("(max-width: 640px)").matches;
  return narrow ? 1 : Math.min(raw, 1.5);
}

export function FlappyTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const activeRef = useRef(true);
  const phaseRef = useRef<GamePhase>("idle");
  const birdRef = useRef({ y: 0, vy: 0, rot: 0 });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const paletteRef = useRef<Palette>(DEFAULT_PALETTE);
  const bestRef = useRef(0);
  const bgKeyRef = useRef("");

  const { resolvedTheme } = useTheme();

  const syncPhase = (p: GamePhase) => {
    phaseRef.current = p;
  };

  const resetGame = useCallback((h: number) => {
    birdRef.current = { y: h / 2, vy: 0, rot: 0 };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    frameRef.current = 0;
  }, []);

  const spawnObstacle = useCallback((w: number, h: number, offsetX: number) => {
    const gapSize = Math.min(148, Math.max(118, h * 0.28));
    const edgePad = 40;
    const gapCenter =
      edgePad +
      gapSize / 2 +
      Math.random() * Math.max(0, h - gapSize - edgePad * 2);
    obstaclesRef.current.push({
      x: offsetX,
      gapCenter,
      gapSize,
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
    paletteRef.current = readPalette();
  }, [resolvedTheme]);

  useEffect(() => {
    try {
      const b = window.localStorage.getItem(BEST_KEY);
      if (b) bestRef.current = Number(b) || 0;
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bgCanvas = document.createElement("canvas");
    let bgCtx: CanvasRenderingContext2D | null = null;

    const paintBackground = (w: number, h: number, dpr: number) => {
      const p = paletteRef.current;
      const key = `${w}x${h}@${dpr}:${p.paperSunk}`;
      if (key === bgKeyRef.current && bgCanvas.width > 0) return;

      bgCanvas.width = Math.floor(w * dpr);
      bgCanvas.height = Math.floor(h * dpr);
      bgCtx = bgCanvas.getContext("2d");
      if (!bgCtx) return;

      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCtx.fillStyle = p.paperSunk;
      bgCtx.fillRect(0, 0, w, h);

      // Sparse grid — one path, fewer lines than per-frame strokes
      bgCtx.strokeStyle = p.rule;
      bgCtx.globalAlpha = 0.28;
      bgCtx.lineWidth = 1;
      bgCtx.beginPath();
      const grid = 56;
      for (let x = 0; x <= w; x += grid) {
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += grid) {
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(w, y);
      }
      bgCtx.stroke();
      bgCtx.globalAlpha = 1;
      bgKeyRef.current = key;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = gameDpr();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
      bgKeyRef.current = "";
      paintBackground(rect.width, rect.height, dpr);

      if (phaseRef.current === "idle") {
        resetGame(rect.height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry?.isIntersecting ?? true;
      },
      { rootMargin: "40px", threshold: 0.05 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) activeRef.current = false;
      else {
        const rect = container.getBoundingClientRect();
        const inView =
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.right > 0 &&
          rect.left < window.innerWidth;
        activeRef.current = inView;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const GRAVITY = 0.28;
    const PIPE_SPEED = reduced ? 1.6 : 2.35;
    const PIPE_GAP = 200;
    const BIRD_X = 72;
    const BIRD_R = 14;
    const PW = 52;
    const CHIP_H = 16;

    const drawPillar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      topH: number,
      bottomY: number,
      h: number,
      isTop: boolean
    ) => {
      const p = paletteRef.current;
      const barH = isTop ? topH : h - bottomY;
      const barY = isTop ? 0 : bottomY;
      if (barH <= 0) return;

      ctx.fillStyle = p.paperRaised;
      ctx.fillRect(x, barY, PW, barH);
      ctx.fillStyle = p.accent;
      ctx.fillRect(x + PW - 4, barY, 4, barH);

      if (barH < 28) return;

      const gateText = isTop ? GATE_TOP : GATE_BOTTOM;
      const chipY = isTop ? topH - CHIP_H - 4 : bottomY + 4;
      const chipW = isTop ? 44 : 52;

      ctx.fillStyle = p.accentSoft;
      ctx.fillRect(x + (PW - chipW) / 2, chipY, chipW, CHIP_H);
      ctx.fillStyle = p.accent;
      ctx.font = "600 10px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(gateText, x + PW / 2, chipY + CHIP_H / 2);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    };

    const drawBird = (ctx: CanvasRenderingContext2D, y: number, rot: number) => {
      const p = paletteRef.current;
      ctx.save();
      ctx.translate(BIRD_X, y);
      ctx.rotate(rot);
      ctx.fillStyle = p.accent;
      ctx.beginPath();
      ctx.roundRect(-BIRD_R, -BIRD_R, BIRD_R * 2, BIRD_R * 2, 5);
      ctx.fill();
      ctx.fillStyle = p.paper;
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("dk", 0, 1);
      ctx.restore();
    };

    let lastTime = performance.now();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      if (!activeRef.current) {
        lastTime = now;
        return;
      }

      const { w, h, dpr } = sizeRef.current;
      if (w === 0 || h === 0) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const dt = Math.min((now - lastTime) / 16.67, 2.5);
      lastTime = now;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameRef.current += 1;

      const phase = phaseRef.current;
      const bird = birdRef.current;

      if (phase === "playing") {
        bird.vy += GRAVITY * dt;
        bird.y += bird.vy * dt;
        bird.rot = Math.min(Math.PI / 4, Math.max(-0.35, bird.vy * 0.06));

        const last = obstaclesRef.current[obstaclesRef.current.length - 1];
        if (!last || last.x < w - PIPE_GAP) {
          spawnObstacle(w, h, w + 40);
        }

        for (const obs of obstaclesRef.current) {
          obs.x -= PIPE_SPEED * dt;

          const topH = obs.gapCenter - obs.gapSize / 2;
          const bottomY = obs.gapCenter + obs.gapSize / 2;

          if (!obs.scored && obs.x + PW < BIRD_X) {
            obs.scored = true;
            scoreRef.current += 1;
          }

          const inX = BIRD_X + BIRD_R > obs.x && BIRD_X - BIRD_R < obs.x + PW;
          if (inX && (bird.y - BIRD_R < topH || bird.y + BIRD_R > bottomY)) {
            syncPhase("dead");
            try {
              if (scoreRef.current > bestRef.current) {
                bestRef.current = scoreRef.current;
                window.localStorage.setItem(BEST_KEY, String(scoreRef.current));
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
        bird.y = h / 2 + Math.sin(frameRef.current * 0.04) * 6;
        bird.rot = 0;
      }

      paintBackground(w, h, dpr);
      if (bgCanvas.width > 0) {
        ctx.drawImage(bgCanvas, 0, 0, w, h);
      }

      for (const obs of obstaclesRef.current) {
        const topH = obs.gapCenter - obs.gapSize / 2;
        const bottomY = obs.gapCenter + obs.gapSize / 2;
        drawPillar(ctx, obs.x, topH, bottomY, h, true);
        drawPillar(ctx, obs.x, topH, bottomY, h, false);
      }

      drawBird(ctx, bird.y, bird.rot);

      const p = paletteRef.current;
      ctx.textAlign = "right";
      ctx.fillStyle = p.ink;
      ctx.font = "600 11px ui-monospace, monospace";
      ctx.fillText(`deploys ${scoreRef.current}`, w - 10, 18);
      ctx.fillStyle = p.inkFaint;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(`best ${bestRef.current}`, w - 10, 32);
      ctx.textAlign = "left";

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
    };

    paletteRef.current = readPalette();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [resetGame, spawnObstacle]);

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
    </section>
  );
}
