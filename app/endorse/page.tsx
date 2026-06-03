import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { endorsements } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Endorse",
  description:
    "Kind words from people I've worked with — collaborators, teammates, anyone with a thoughtful note to leave.",
};

export default function EndorsePage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="endorse"
        title="Kind words."
        lede="If we've worked together — on a project, an internship, a hackathon, a class — and you'd like to leave a short note, this is where it'd live."
      />

      {/* Placeholder form — non-functional. Hook this up to a server action
          or backend later. The submit button is disabled for now. */}
      <form
        aria-label="Leave an endorsement"
        className="rounded-xl border border-rule/70 bg-paper-raised/40 p-5 sm:p-6"
        action="#"
      >
        <div className="space-y-4">
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
              autoComplete="name"
              placeholder="Jane Doe"
              className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm
                         text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
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
              placeholder="Hackathon teammate / internship lead / collaborator on X"
              className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm
                         text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
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
              placeholder="A short, specific note. Two or three sentences is plenty."
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
              Endorse
            </button>
          </div>
        </div>
      </form>

      <p className="mt-4 text-xs text-ink-faint">
        Prefer email? <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <ul className="mt-12 space-y-8">
        {endorsements.map((e) => (
          <li key={e.id} className="border-l-2 border-rule pl-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
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
            <p className="mt-0.5 text-xs text-ink-faint">{e.relation}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
              {e.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
