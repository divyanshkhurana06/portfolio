import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { TechMarquee } from "@/components/tech-marquee";
import { ResumeButton } from "@/components/resume-button";
import { projects, notes, endorsements } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDateShort } from "@/lib/utils";

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
            I build software, mostly with AI agents, full stack
            apps, and blockchain. This site is just a place for me
            to keep my projects and the things I&rsquo;m thinking about,
            in one spot.
          </p>
          <p className="mt-4 text-pretty text-[1.0625rem] leading-[1.75] text-ink-muted">
            Have a look at the{" "}
            <Link href="/projects" className="link">
              projects I&rsquo;ve shipped
            </Link>
            , the{" "}
            <Link href="/gallery" className="link">
              gallery
            </Link>
            , or just{" "}
            <a href={`mailto:${site.email}`} className="link">
              say hi
            </a>
            .
          </p>

          {/* Small, deliberate row of actions. The resume gets a touch
              of weight; the rest are quieter. */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ResumeButton />
            <span aria-hidden className="text-ink-faint">·</span>
            <a
              href={`mailto:${site.email}`}
              className="group text-sm text-ink-muted no-underline transition-colors hover:text-accent"
            >
              email{" "}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group text-sm text-ink-muted no-underline transition-colors hover:text-accent"
            >
              github{" "}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="group text-sm text-ink-muted no-underline transition-colors hover:text-accent"
            >
              linkedin{" "}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={site.social.x}
              target="_blank"
              rel="noreferrer noopener"
              className="group text-sm text-ink-muted no-underline transition-colors hover:text-accent"
            >
              x{" "}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Tech marquee — full-bleed band that scrolls just below the intro */}
      <div className="mt-14 sm:mt-16">
        <TechMarquee />
      </div>

      <div className="container-wide">
        <Divider />

        {/* Selected projects */}
        <section aria-labelledby="projects">
          <SectionHeader
            id="projects"
            label="some projects"
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

        {/* Recent kind words — the two most recent endorsements bubble up
            here from the shared list. The rest live on /endorse. */}
        <section aria-labelledby="kind-words" className="pb-4">
          <SectionHeader
            id="kind-words"
            label="kind words"
            href="/endorse"
            hrefLabel="all endorsements"
          />
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {endorsements.slice(0, 2).map((e) => (
              <li key={e.id}>
                <figure
                  className="flex h-full flex-col rounded-lg border border-rule/70
                             bg-paper-raised/40 p-5"
                >
                  <blockquote
                    className="relative text-[0.95rem] leading-relaxed text-ink"
                  >
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
                    <p className="font-serif text-sm italic text-ink">
                      {e.name}
                    </p>
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
                      {e.relation}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
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
