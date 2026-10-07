import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}`,
};

export default function AboutPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="about"
        title="Software Developer."
        lede="CS undergrad at VIT Vellore. From Delhi."
      />

      <dl
        className="mt-10 grid grid-cols-1 gap-y-3 text-[0.95rem]
                   sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-y-2.5"
      >
        <dt className="eyebrow leading-[1.6]">based</dt>
        <dd className="leading-[1.6] text-ink-muted">
          Delhi when I&rsquo;m home · Vellore during semester
        </dd>

        <dt className="eyebrow leading-[1.6]">studying</dt>
        <dd className="leading-[1.6] text-ink-muted">
          B.Tech CSE, VIT Vellore graduating Apr 2028
        </dd>

        <dt className="eyebrow leading-[1.6]">working on</dt>
        <dd className="leading-[1.6] text-ink-muted">
          agentic + blockchain projects
        </dd>
      </dl>

      <Divider />

      <Section title="experience">
        <Entry
          role="Software Engineering Intern"
          org="Powergrid"
          when="May 2026 to Jul 2026"
          note="Backend work on internal applications in C# and ASP.NET Core, SQL reporting for other departments, and validation of large ERP and SAP extracts in Python. Built a guest house booking portal for the ERP and IT department."
        />
        <Entry
          role="Data Management Intern"
          org="International Solar Alliance"
          when="May 2025 to Jul 2025"
          note="Built Power BI dashboards. Wrote Jest unit tests from scratch and pushed coverage from 0% to 100%. Day to day work across Slack and JIRA."
        />
      </Section>

      <Divider />

      <Section title="education">
        <Entry
          role="B.Tech, Computer Science Engineering"
          org="Vellore Institute of Technology"
          when="2024 to 2028 (expected)"
          note = "Current cgpa: 8.82"
        />
        <Entry
        role = "High School"
        org = "DPS Dwarka"
        when = "till 2024"
        note="Secured 90% in both 10th and 12th standards. Vice President of the innovation and the quizzing clubs through which I conducted a lot of events in the delhi tech circuit."
        />
      </Section>

      <Divider />

      <Section title="a thing I'm proud of">
        <p className="text-[0.95rem] leading-[1.7] text-ink-muted">
          <strong className="text-ink">Dagar</strong>: winner of Fund My Crazy
          2026, a Google Gemini competition, picked from 1,92,000 entries and
          pitched on stage at IIT Delhi. It helps a town give its street vendors
          a legal spot, and it started with the chai wala outside my house.
        </p>
        <p className="mt-3 text-[0.95rem] leading-[1.7] text-ink-muted">
          Before that, <strong className="text-ink">Interact</strong> won at
          ETHGlobal Prague, and <strong className="text-ink">Swarm</strong> and{" "}
          <strong className="text-ink">Salvage</strong> both took first place at
          their hackathons. See <a href="/projects" className="link">projects</a>{" "}
          for the rest.
        </p>
      </Section>

      <Divider />

      <Section title="what I reach for">
        <ul className="space-y-2 text-[0.95rem] text-ink-muted">
          <li>
            <span className="eyebrow mr-2">languages: </span>
            Python · TypeScript · JavaScript · C++ · C · C# · SQL · Solidity
          </li>
          <li>
            <span className="eyebrow mr-2">stack: </span>
            React · Next.js · Node · FastAPI · Tailwind · Postgres · MongoDB
          </li>
          <li>
            <span className="eyebrow mr-2">ml &amp; data: </span>
            TensorFlow · Pandas · NumPy · Hugging Face · BigQuery
          </li>
          <li>
            <span className="eyebrow mr-2">tools: </span>
            Git · AWS · Jupyter · Jest · Jira
          </li>
        </ul>
      </Section>

      <Divider />

      <Section title="get in touch">
        <p className="text-[0.95rem] leading-[1.7] text-ink-muted">
          Email is best: <a href={`mailto:${site.email}`} className="link">{site.email}</a>.
          I&rsquo;m also on{" "}
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            LinkedIn
          </a>
          .
        </p>
      </Section>
    </div>
  );
}

function Divider() {
  return <hr className="my-12 border-0 border-t border-rule/70" aria-hidden />;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="eyebrow mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Entry({
  role,
  org,
  when,
  note,
}: {
  role: string;
  org: string;
  when: string;
  note?: string;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-[0.975rem] text-ink">
          <span className="font-medium">{role}</span>
          <span className="text-ink-faint"> · </span>
          <span className="text-ink-muted">{org}</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          {when}
        </p>
      </div>
      {note && (
        <p className="mt-1.5 text-[0.9rem] leading-[1.65] text-ink-muted">
          {note}
        </p>
      )}
    </div>
  );
}
