import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `A short introduction to ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="about"
        title="A few sentences about me."
        lede="Replace this page with your own story. Keep it short — the internet has too many long bios already."
      />

      <Prose>
        <p>
          I&rsquo;m <strong>{site.name}</strong>, based in {site.location}. I work on
          [placeholder for what you do], and on the side I keep a small list of side
          projects that I never seem to finish in the order I planned.
        </p>

        <p>
          A few honest things about me: I like [placeholder hobby], I am quietly proud
          of [placeholder small accomplishment], and I will happily lose an evening to
          [placeholder rabbit hole].
        </p>

        <h2>What I&rsquo;m good at</h2>
        <ul>
          <li>Placeholder skill — one line of context that makes it real.</li>
          <li>Placeholder skill — another short line.</li>
          <li>Placeholder skill — and the third one.</li>
        </ul>

        <h2>What I&rsquo;m bad at</h2>
        <p>
          Estimating timelines, naming things, and stopping at one coffee. Working on
          all three with varying degrees of success.
        </p>

        <h2>Where to find me</h2>
        <p>
          The most reliable way to reach me is over{" "}
          <a href={`mailto:${site.email}`}>email</a>. I&rsquo;m also occasionally on{" "}
          <a href={site.social.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>{" "}
          and{" "}
          <a href={site.social.bluesky} target="_blank" rel="noreferrer noopener">
            Bluesky
          </a>
          . I reply to most thoughtful messages, eventually.
        </p>

        <hr />
        <p className="text-sm text-ink-faint">
          This site is a slow, deliberately small website. It will keep growing in
          uneven bursts.
        </p>
      </Prose>
    </div>
  );
}
