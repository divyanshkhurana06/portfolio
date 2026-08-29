"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FlappyTech } from "@/components/flappy-tech";

type Score = { id: string; name: string; score: number; date: string };

const BOARD_SIZE = 5;
const NAME_KEY = "flappy-tech:name";
const POLL_MS = 15_000;

export function FlappyPanel() {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justLanded, setJustLanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/flappy-scores", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as { scores?: Score[] };
      setScores(json.scores ?? []);
    } catch {
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(NAME_KEY);
      if (saved) setName(saved);
    } catch {
    }
  }, []);

  const makesBoard = useCallback(
    (score: number) => {
      if (score < 1) return false;
      const board = scores ?? [];
      if (board.length < BOARD_SIZE) return true;
      return score > board[board.length - 1].score;
    },
    [scores]
  );

  const onGameOver = useCallback(
    (score: number) => {
      setError(null);
      setJustLanded(false);
      setPending(makesBoard(score) ? score : null);
    },
    [makesBoard]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending === null || busy) return;

    const entered = name.trim();
    if (!entered) {
      inputRef.current?.focus();
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/flappy-scores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: entered, score: pending }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not save your score.");

      try {
        window.localStorage.setItem(NAME_KEY, entered);
      } catch {
      }
      setScores(json.scores ?? []);
      setPending(null);
      setJustLanded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your score.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <FlappyTech onGameOver={onGameOver} />

      <section
        aria-labelledby="flappy-board"
        className="rounded-xl border border-rule/70 bg-paper-raised/40 p-4"
      >
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="flappy-board" className="eyebrow">
            top 5 deploys
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            live
          </span>
        </div>

        <ol className="mt-3 space-y-1.5">
          {scores === null ? (
            <li className="font-mono text-[11px] text-ink-faint">loading…</li>
          ) : scores.length === 0 ? (
            <li className="font-mono text-[11px] text-ink-faint">
              nobody yet, the board is yours
            </li>
          ) : (
            scores.map((s, i) => (
              <li
                key={s.id}
                className="flex items-baseline gap-3 text-[0.875rem] leading-snug"
              >
                <span className="w-4 shrink-0 font-mono text-[11px] text-ink-faint">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-ink">{s.name}</span>
                <span className="font-mono text-[12px] tabular-nums text-accent">
                  {s.score}
                </span>
              </li>
            ))
          )}
        </ol>

        {pending !== null ? (
          <form onSubmit={submit} className="mt-4 border-t border-rule/60 pt-3">
            <label
              htmlFor="flappy-name"
              className="block text-[0.8rem] text-ink-muted"
            >
              {pending} deploys. That makes the board. Who should I put down?
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="flappy-name"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={14}
                autoComplete="off"
                placeholder="your name"
                className="min-w-0 flex-1 rounded-lg border border-rule bg-paper px-2.5 py-1.5
                           text-[0.875rem] text-ink outline-none
                           placeholder:text-ink-faint focus:border-accent"
              />
              <button
                type="submit"
                disabled={busy}
                className="shrink-0 rounded-lg border border-accent/40 bg-accent-soft px-3 py-1.5
                           text-[0.8rem] font-medium text-accent transition-colors
                           hover:border-accent disabled:opacity-50"
              >
                {busy ? "saving…" : "add me"}
              </button>
            </div>
            {error ? (
              <p className="mt-2 text-[0.8rem] text-ink-muted">{error}</p>
            ) : null}
          </form>
        ) : justLanded ? (
          <p className="mt-4 border-t border-rule/60 pt-3 text-[0.8rem] text-ink-muted">
            You&rsquo;re on the board. Tap the game to try to climb.
          </p>
        ) : null}
      </section>
    </div>
  );
}
