import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — CS undergrad at VIT, builder, hackathon winner.`,
};

export default function AboutPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="about"
        title="A few words on what I do."
        lede="I'm a CS undergrad at VIT, mostly more interested in building things than in classes. I like the messy intersection of full-stack apps, AI agents, and crypto."
      />

      <Prose>
        <p>
          <strong>Hello, I&rsquo;m Divyansh.</strong> I&rsquo;m currently in my
          B.Tech in Computer Science Engineering at{" "}
          <strong>Vellore Institute of Technology</strong>, with an expected
          graduation in April 2028. Most of my real learning happens outside
          the classroom — in side projects, hackathons, and internships.
        </p>

        <p>
          Right now I&rsquo;m interning at{" "}
          <strong>Powergrid</strong> (May – July 2026). My recent obsession has
          been building things that bridge <em>AI agents</em> and{" "}
          <em>crypto rails</em> — using LLMs to interact with real-world
          systems through smart contracts. The most fun version of this so far
          was <strong>Interact</strong>, which won ETHGlobal Prague.
        </p>

        <h2>Experience</h2>
        <ul>
          <li>
            <strong>Powergrid</strong> — Intern · May 2026 – Jul 2026
          </li>
          <li>
            <strong>International Solar Alliance</strong> — Data Management
            Intern · May 2024 – Jul 2024
            <br />
            <span className="text-sm text-ink-muted">
              Built Power BI dashboards, added Jest unit tests from scratch
              (0% → 100% coverage), and collaborated across teams on Slack and
              JIRA.
            </span>
          </li>
        </ul>

        <h2>Education</h2>
        <ul>
          <li>
            <strong>Vellore Institute of Technology</strong> — B.Tech, Computer
            Science Engineering · expected April 2028
          </li>
        </ul>

        <h2>Skills</h2>
        <p>
          <strong>Languages:</strong> Python, C++, JavaScript, TypeScript, SQL,
          C, HTML/CSS
          <br />
          <strong>Frameworks &amp; libraries:</strong> React, Next.js, FastAPI,
          TensorFlow, Jest, Pandas, NumPy
          <br />
          <strong>Tools:</strong> Git, BigQuery, AWS, Jupyter, MongoDB,
          Node.js, Jira, PostgreSQL
        </p>

        <h2>Where to find me</h2>
        <p>
          The most reliable way to reach me is over{" "}
          <a href={`mailto:${site.email}`}>email</a>. I&rsquo;m also on{" "}
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          .
        </p>

        <hr />
        <p className="text-sm text-ink-faint">
          This site is a slow, deliberately small website. It grows in uneven
          bursts.
        </p>
      </Prose>
    </div>
  );
}
