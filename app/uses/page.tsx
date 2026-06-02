import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { uses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools I reach for, day to day.",
};

export default function UsesPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="uses"
        title="What I use."
        lede="The tools I reach for most days. Not affiliated with anything — just my own boring, sincere recommendations."
      />

      <Section title="Hardware" items={uses.hardware} />
      <Section title="Software" items={uses.software} />

      <p className="mt-16 border-t border-rule pt-6 text-sm italic text-ink-faint">
        Inspired by{" "}
        <a className="link not-italic" href="https://uses.tech">
          uses.tech
        </a>{" "}
        — a friendly list of /uses pages from around the web.
      </p>
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: readonly { name: string; value: string }[];
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="eyebrow mb-3">{title}</h2>
      <dl className="divide-y divide-rule/70">
        {items.map((i) => (
          <div
            key={i.name}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-ink-faint sm:w-40">
              {i.name}
            </dt>
            <dd className="text-[0.95rem] leading-relaxed text-ink">{i.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
