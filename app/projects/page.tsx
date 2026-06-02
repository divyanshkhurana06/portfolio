import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected things I've built — shipped, in progress, and otherwise.",
};

const statusTone: Record<string, string> = {
  shipped: "bg-accent-soft text-accent",
  "in progress": "bg-paper-sunk text-ink",
  archived: "bg-paper-sunk text-ink-faint",
  exploring: "bg-paper-sunk text-ink-muted",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="container-wide pt-12 sm:pt-16">
      <PageHeader
        eyebrow="projects"
        title="Things I've made."
        lede="A working list of the projects I've shipped, am still shipping, or quietly let drift into the archive. Most of them taught me something."
      />

      <ul className="grid gap-5 sm:grid-cols-2">
        {sorted.map((p) => (
          <li key={p.slug}>
            <article
              className="group flex h-full flex-col gap-3 rounded-xl border border-rule/70
                         bg-paper-raised/30 p-6 transition-colors hover:bg-paper-raised"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-lg font-semibold text-ink">
                  {p.name}
                </h2>
                <span className="font-mono text-xs text-ink-faint">{p.year}</span>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-ink-muted">
                {p.blurb}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    statusTone[p.status] ?? "bg-paper-sunk text-ink-muted"
                  }`}
                >
                  {p.status}
                </span>
                {p.stack?.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-paper-sunk px-2 py-0.5 text-[11px] font-medium text-ink-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {(p.href || p.repo) && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-quiet"
                    >
                      Live <span aria-hidden className="text-ink-faint">↗</span>
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-quiet"
                    >
                      Source <span aria-hidden className="text-ink-faint">↗</span>
                    </a>
                  ) : null}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
