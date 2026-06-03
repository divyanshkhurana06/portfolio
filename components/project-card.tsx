import type { Project } from "@/lib/content";

const statusTone: Record<string, string> = {
  shipped: "bg-accent-soft text-accent",
  "in progress": "bg-paper-sunk text-ink",
  archived: "bg-paper-sunk text-ink-faint",
  exploring: "bg-paper-sunk text-ink-muted",
};

type Variant = "compact" | "full";

export function ProjectCard({
  project,
  variant = "compact",
}: {
  project: Project;
  variant?: Variant;
}) {
  const stackLimit = variant === "compact" ? 3 : undefined;

  return (
    <div className="flip-card group h-full min-h-[240px]">
      <div className="flip-card-inner">
        {/* Front */}
        <article
          className="flip-face flex h-full min-h-[240px] flex-col gap-3 rounded-xl
                     border border-rule/70 bg-paper-raised/40 p-5
                     transition-colors group-hover:bg-paper-raised"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-lg font-medium text-ink">
              {project.name}
            </h3>
            <span className="font-mono text-xs text-ink-faint">
              {project.year}
            </span>
          </div>

          <p className="text-[0.95rem] leading-relaxed text-ink-muted">
            {project.blurb}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <StatusPill status={project.status} />
            {project.stack?.slice(0, stackLimit).map((s) => (
              <span
                key={s}
                className="rounded-full bg-paper-sunk px-2 py-0.5 text-[11px]
                           font-medium text-ink-muted"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Affordance hint — always visible so the card reads as
              interactive at a glance. Only shown on hover-capable
              devices since the flip is gated behind hover too. */}
          <p
            className="pointer-events-none mt-1 hidden items-center justify-end gap-1
                       text-[11px] text-ink-faint transition-colors
                       group-hover:text-ink-muted
                       [@media(hover:hover)]:flex"
            aria-hidden="true"
          >
            hover for more
            <span
              aria-hidden
              className="inline-block transition-transform duration-500
                         group-hover:rotate-180"
            >
              ↺
            </span>
          </p>
        </article>

        {/* Back */}
        <article
          className="flip-face flip-back flex h-full flex-col gap-3 overflow-hidden
                     rounded-xl border border-rule/70 bg-paper-sunk p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-lg font-medium leading-tight">
              {project.href || project.repo ? (
                <a
                  href={(project.href ?? project.repo) as string}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/title inline-flex items-baseline gap-1.5 text-ink
                             no-underline transition-colors hover:text-accent"
                >
                  {project.name}
                  <span
                    aria-hidden
                    className="translate-y-px text-sm text-ink-faint
                               transition-all duration-200
                               group-hover/title:-translate-y-0.5
                               group-hover/title:translate-x-0.5
                               group-hover/title:text-accent"
                  >
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-ink">{project.name}</span>
              )}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              more
            </span>
          </div>

          {project.details?.role ? (
            <p className="text-xs">
              <span className="font-mono uppercase tracking-wider text-ink-faint">
                role ·{" "}
              </span>
              <span className="text-ink-muted">{project.details.role}</span>
            </p>
          ) : null}

          {project.details?.highlights?.length ? (
            <ul className="space-y-1.5 text-[0.875rem] leading-snug text-ink-muted">
              {project.details.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="select-none text-accent">
                    ·
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {project.details?.notes ? (
            <p className="text-xs italic leading-relaxed text-ink-faint">
              {project.details.notes}
            </p>
          ) : null}

          {project.href || project.repo ? (
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet"
                >
                  Live{" "}
                  <span aria-hidden className="text-ink-faint">
                    ↗
                  </span>
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet"
                >
                  Source{" "}
                  <span aria-hidden className="text-ink-faint">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
        statusTone[status] ?? "bg-paper-sunk text-ink-muted"
      }`}
    >
      {status}
    </span>
  );
}
