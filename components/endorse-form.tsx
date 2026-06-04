"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function EndorseForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/endorsements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          relation: data.get("relation"),
          body: data.get("message"),
          website: data.get("website"),
        }),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        return;
      }

      form.reset();
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Network error — try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Leave an endorsement"
      className="rounded-xl border border-rule/70 bg-paper-raised/40 p-5 sm:p-6"
    >
      <div className="space-y-4">
        {/* Honeypot — hidden from humans, bots often fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <div>
          <label
            htmlFor="name"
            className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-faint"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            disabled={pending}
            className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm
                       text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none
                       disabled:opacity-60"
          />
        </div>
        <div>
          <label
            htmlFor="relation"
            className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-faint"
          >
            How we worked together
          </label>
          <input
            id="relation"
            name="relation"
            type="text"
            required
            minLength={2}
            maxLength={120}
            disabled={pending}
            placeholder="Hackathon teammate, internship lead, class project…"
            className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm
                       text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none
                       disabled:opacity-60"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-faint"
          >
            Your endorsement
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={1000}
            disabled={pending}
            placeholder="A short, specific note. Two or three sentences is plenty."
            className="w-full resize-y rounded-md border border-rule bg-paper px-3 py-2 text-sm
                       text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none
                       disabled:opacity-60"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          {error ? (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : success ? (
            <p className="text-xs text-accent" role="status">
              Thanks — your note is live.
            </p>
          ) : (
            <p className="text-xs text-ink-faint">
              Saved immediately · no account needed
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper
                       transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Sending…" : "Endorse"}
          </button>
        </div>
      </div>
    </form>
  );
}
