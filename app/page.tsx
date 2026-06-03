import Link from "next/link";
import { PostList } from "@/components/post-list";
import { ProjectCard } from "@/components/project-card";
import { TechMarquee } from "@/components/tech-marquee";
import { posts, projects, notes, now } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate, formatDateShort } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="pt-12 sm:pt-16">
      {/* Intro */}
      <section aria-labelledby="hello" className="container-wide">
        <div className="max-w-prose">
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
            <span
              className="italic"
              style={{ fontVariationSettings: '"SOFT" 100' }}
            >
              {site.name}
            </span>
            .
          </h1>
          <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.75] text-ink-muted">
            I build software, write the occasional essay, and tinker with small
            projects that don&rsquo;t always have a point. This site is my corner
            of the internet — a place to keep my work, my notes, and the things
            I&rsquo;m thinking about, in one quiet spot.
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
        </div>
      </section>

      {/* Tech marquee — full-bleed band that scrolls just below the intro */}
      <div className="mt-14 sm:mt-16">
        <TechMarquee />
      </div>

      <div className="container-wide">
        <Divider />

        {/* Currently — a small at-a-glance card */}
        <section aria-labelledby="currently">
          <SectionHeader
            id="currently"
            label="currently"
            href="/now"
            hrefLabel="full /now page"
          />
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
                <ProjectCard project={p} variant="compact" />
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
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* Closing */}
        <section className="max-w-prose pb-4">
          <p className="font-serif text-lg italic text-ink-muted">
            Thanks for stopping by. If something here resonates, I&rsquo;d love
            to hear about it —{" "}
            <a href={`mailto:${site.email}`} className="link not-italic">
              send a note
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="my-16 border-0 border-t border-rule/70" aria-hidden />;
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

