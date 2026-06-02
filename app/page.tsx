import Link from "next/link";
import { PostList } from "@/components/post-list";
import { posts, projects, notes, now } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate, formatDateShort } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="container-wide pt-12 sm:pt-16">
      {/* Intro */}
      <section aria-labelledby="hello" className="max-w-prose">
        <p className="eyebrow flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"
          />
          {site.location}
        </p>
        <h1
          id="hello"
          className="mt-3 text-balance font-serif text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]"
        >
          Hi, I&rsquo;m{" "}
          <span className="italic" style={{ fontVariationSettings: '"SOFT" 100' }}>
            {site.name}
          </span>
          .
        </h1>
        <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.75] text-ink-muted">
          I build software, write the occasional essay, and tinker with small projects
          that don&rsquo;t always have a point. This site is my corner of the internet —
          a place to keep my work, my notes, and the things I&rsquo;m thinking about, in
          one quiet spot.
        </p>
        <p className="mt-4 text-pretty text-[1.0625rem] leading-[1.75] text-ink-muted">
          You can read what I&rsquo;m up to{" "}
          <Link href="/now" className="link">
            right now
          </Link>
          , browse{" "}
          <Link href="/writing" className="link">
            things I&rsquo;ve written
          </Link>
          , see the{" "}
          <Link href="/projects" className="link">
            projects I&rsquo;ve shipped
          </Link>
          , or just{" "}
          <a href={`mailto:${site.email}`} className="link">
            say hi
          </a>
          .
        </p>
      </section>

      <Divider />

      {/* Currently — a small at-a-glance card */}
      <section aria-labelledby="currently">
        <SectionHeader id="currently" label="currently" href="/now" hrefLabel="full /now page" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {now.blocks.slice(0, 4).map((b) => (
            <div
              key={b.heading}
              className="rounded-xl border border-rule/70 bg-paper-raised/40 p-5
                         transition-colors hover:bg-paper-raised"
            >
              <p className="eyebrow">{b.heading}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                {b.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Last updated{" "}
          <time dateTime={now.updated}>{formatDate(now.updated)}</time>.
        </p>
      </section>

      <Divider />

      {/* Latest writing */}
      <section aria-labelledby="writing">
        <SectionHeader
          id="writing"
          label="recent writing"
          href="/writing"
          hrefLabel="all posts"
        />
        <div className="mt-4">
          <PostList posts={posts} limit={4} showSummary />
        </div>
      </section>

      <Divider />

      {/* Selected projects */}
      <section aria-labelledby="projects">
        <SectionHeader
          id="projects"
          label="selected projects"
          href="/projects"
          hrefLabel="all projects"
        />
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <a
                href={p.href ?? p.repo ?? "#"}
                target={p.href || p.repo ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group block h-full rounded-xl border border-rule/70 p-5
                           no-underline transition-colors hover:bg-paper-raised"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg font-medium text-ink
                                 transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <span className="font-mono text-xs text-ink-faint">{p.year}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusPill status={p.status} />
                  {p.stack?.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-paper-sunk px-2 py-0.5 text-[11px]
                                 font-medium text-ink-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* Notes — short, microblog-style */}
      <section aria-labelledby="notes">
        <SectionHeader
          id="notes"
          label="recent notes"
          href="/notes"
          hrefLabel="all notes"
        />
        <ul className="mt-4 space-y-5">
          {notes.slice(0, 3).map((n) => (
            <li key={n.id} className="border-l border-rule pl-4">
              <time
                dateTime={n.date}
                className="font-mono text-[11px] uppercase tracking-wider text-ink-faint"
              >
                {formatDateShort(n.date)}
              </time>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">{n.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* Closing */}
      <section className="max-w-prose pb-4">
        <p className="font-serif text-lg italic text-ink-muted">
          Thanks for stopping by. If something here resonates, I&rsquo;d love to hear
          about it —{" "}
          <a href={`mailto:${site.email}`} className="link not-italic">
            send a note
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-14 flex items-center gap-4" aria-hidden>
      <span className="h-px flex-1 bg-rule" />
      <span className="text-ink-faint">✦</span>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

function SectionHeader({
  id,
  label,
  href,
  hrefLabel,
}: {
  id: string;
  label: string;
  href: string;
  hrefLabel: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="eyebrow">
        {label}
      </h2>
      <Link
        href={href}
        className="text-sm text-ink-muted no-underline transition-colors hover:text-accent"
      >
        {hrefLabel}{" "}
        <span aria-hidden className="text-ink-faint">
          →
        </span>
      </Link>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    shipped: "bg-accent-soft text-accent",
    "in progress": "bg-paper-sunk text-ink",
    archived: "bg-paper-sunk text-ink-faint",
    exploring: "bg-paper-sunk text-ink-muted",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
        tone[status] ?? "bg-paper-sunk text-ink-muted"
      }`}
    >
      {status}
    </span>
  );
}
