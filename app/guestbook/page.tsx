import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a note. Say hi. Tell me what you're building.",
};

// Placeholder static entries — wire this up to a database/edge function later.
const entries = [
  {
    name: "A friendly stranger",
    date: "2026-05-12",
    body: "Found your site through a link from a friend. Stayed for the typography.",
  },
  {
    name: "Future you",
    date: "2026-04-03",
    body: "Hi past me — proud of you for actually publishing this.",
  },
  {
    name: "Curious lurker",
    date: "2026-03-20",
    body: "Just wanted to say the /uses page made me reconsider three things in my own setup.",
  },
];

export default function GuestbookPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="guestbook"
        title="Sign the book."
        lede="A small, slow comments section. No accounts, no algorithm — just a note from you, if you'd like to leave one."
      />

      {/* Placeholder form — non-functional. Hook this up to a server action
          or backend later. The submit button is disabled for now. */}
      <form
        aria-label="Leave a guestbook entry"
        className="rounded-xl border border-rule/70 bg-paper-raised/40 p-5 sm:p-6"
        action="#"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-faint"
            >
              Name (or alias)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="nickname"
              placeholder="A friendly stranger"
              className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm
                         text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-faint"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Say hi, share a thought, tell me what you're building…"
              className="w-full resize-y rounded-md border border-rule bg-paper px-3 py-2 text-sm
                         text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-ink-faint">
              Placeholder form. Connect this to your backend of choice later.
            </p>
            <button
              type="submit"
              disabled
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper
                         opacity-60 transition hover:opacity-100 disabled:cursor-not-allowed"
            >
              Sign
            </button>
          </div>
        </div>
      </form>

      <p className="mt-4 text-xs text-ink-faint">
        Prefer email? <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <ul className="mt-12 space-y-8">
        {entries.map((e, i) => (
          <li key={i} className="border-l-2 border-rule pl-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-serif text-base italic text-ink">{e.name}</p>
              <time
                dateTime={e.date}
                className="font-mono text-[11px] uppercase tracking-wider text-ink-faint"
              >
                {new Date(e.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">
              {e.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
