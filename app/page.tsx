import Link from "next/link";
import { EndorsementCards } from "@/components/endorsement-list";
import { ProjectCard } from "@/components/project-card";
import { TechMarquee } from "@/components/tech-marquee";
import { ResumeButton } from "@/components/resume-button";
import { projects } from "@/lib/content";
import { getEndorsements } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const endorsements = await getEndorsements(2);
  return (
    <div className="pt-12 sm:pt-16">
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

      <div className="mt-14 sm:mt-16">
        <TechMarquee />
      </div>

      <div className="container-wide">
        <Divider />

        <section aria-labelledby="projects">
          <SectionHeader
            id="projects"
            label="some projects"
            href="/projects"
            hrefLabel="all projects"
          />
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects.filter((p) => p.featured).map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} variant="compact" />
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <section aria-labelledby="kind-words" className="pb-4">
          <SectionHeader
            id="kind-words"
            label="kind words"
            href="/endorse"
            hrefLabel="all endorsements"
          />
          <EndorsementCards endorsements={endorsements} />
          {endorsements.length === 0 && (
            <p className="mt-2 text-sm text-ink-muted">
              No endorsements yet.{" "}
              <Link href="/endorse" className="link">
                leave the first one
              </Link>
              .
            </p>
          )}
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
