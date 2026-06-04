import type { EndorsementRecord } from "@/lib/data";

export function EndorsementList({
  endorsements,
  emptyMessage = "No endorsements yet — be the first to leave one.",
}: {
  endorsements: EndorsementRecord[];
  emptyMessage?: string;
}) {
  if (endorsements.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-ink-muted">{emptyMessage}</p>
    );
  }

  return (
    <ul className="space-y-8">
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
  );
}

export function EndorsementCards({
  endorsements,
}: {
  endorsements: EndorsementRecord[];
}) {
  if (endorsements.length === 0) return null;

  return (
    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
      {endorsements.map((e) => (
        <li key={e.id}>
          <figure
            className="flex h-full flex-col rounded-lg border border-rule/70
                       bg-paper-raised/40 p-5"
          >
            <blockquote className="relative text-[0.95rem] leading-relaxed text-ink">
              <span
                aria-hidden
                className="absolute -left-1 -top-3 select-none font-serif
                           text-3xl italic leading-none text-ink-faint/60"
              >
                &ldquo;
              </span>
              <span className="block pl-3">{e.body}</span>
            </blockquote>
            <figcaption
              className="mt-4 flex flex-wrap items-baseline justify-between
                         gap-x-3 gap-y-1 border-t border-rule/60 pt-3"
            >
              <p className="font-serif text-sm italic text-ink">{e.name}</p>
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
                {e.relation}
              </p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
