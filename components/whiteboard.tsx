"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/* -------------------------------------------------------------------------- */
/*  Whiteboard — a drawable canvas where visitors can leave a doodle, a      */
/*  signature, or just a scribble. Strokes persist to the visitor's own      */
/*  localStorage (not a shared wall — that would need a backend). Resizes    */
/*  cleanly: the previous drawing is captured and replayed at the new size  */
/*  so the canvas doesn't blank out on window resize.                        */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "whiteboard:strokes";

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [hasContent, setHasContent] = useState(false);
  const { resolvedTheme } = useTheme();

  /** Re-apply context defaults that get reset whenever canvas dims change. */
  const applyContextDefaults = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
  };

  /** Resize the backing buffer to match the container + DPR, while
   *  preserving anything that's already been drawn. */
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Snapshot whatever is currently on the canvas before we blow it away.
    const prev =
      canvas.width > 0 && canvas.height > 0 ? canvas.toDataURL() : null;

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    sizeRef.current = { w: rect.width, h: rect.height };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    applyContextDefaults(ctx);

    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = prev;
    }
  }, []);

  // Mount: size the canvas, restore from storage, observe future resizes.
  useEffect(() => {
    sizeCanvas();

    // Try to bring back the visitor's previous drawing.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        const { w, h } = sizeRef.current;
        const img = new Image();
        img.onload = () => {
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, w, h);
          setHasContent(true);
        };
        img.src = stored;
      }
    } catch {
      /* localStorage may be disabled in private mode — quietly ignore */
    }

    const ro = new ResizeObserver(sizeCanvas);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [sizeCanvas]);

  const strokeColor = resolvedTheme === "dark" ? "#f0ede6" : "#1c1917";

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = pointFromEvent(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !lastPointRef.current) return;

    const next = pointFromEvent(e);
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    lastPointRef.current = next;

    if (!hasContent) setHasContent(true);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* may already be released */
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;

    // Save the drawing once each stroke is finished — cheaper than on
    // every pointer move, but still quick enough to feel persistent.
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      window.localStorage.setItem(STORAGE_KEY, canvas.toDataURL());
    } catch {
      /* ignore */
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      aria-labelledby="whiteboard"
      ref={containerRef}
      className="relative h-[44vh] min-h-[300px] w-full overflow-hidden rounded-xl
                 border border-rule/70 bg-paper-raised/40"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Whiteboard — draw with your cursor or finger"
        className="absolute inset-0 cursor-crosshair touch-none"
      />

      {/* Ghost prompt — only shows while the board is empty so it doesn't
          clutter someone's finished doodle. */}
      {!hasContent && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-2xl italic text-ink-faint sm:text-3xl">
            leave a mark.
          </p>
        </div>
      )}

      {/* Top-left label so it's always clear what the panel is. */}
      <p
        id="whiteboard"
        className="pointer-events-none absolute left-4 top-3 font-mono text-[10.5px]
                   uppercase tracking-[0.14em] text-ink-faint"
      >
        whiteboard · saved on this device
      </p>

      {/* Bottom-right clear button, sized to match other small buttons on
          the site. Only shows once there's something to clear. */}
      {hasContent && (
        <button
          type="button"
          onClick={clear}
          className="absolute bottom-3 right-3 rounded-md border border-rule/70
                     bg-paper px-3 py-1.5 text-xs font-medium text-ink no-underline
                     transition-colors hover:border-accent hover:text-accent
                     focus-visible:border-accent focus-visible:text-accent"
        >
          ↻ clear
        </button>
      )}
    </section>
  );
}
