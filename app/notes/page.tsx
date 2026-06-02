import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { notes } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notes",
  description: "Small things, posted often. A microblog of sorts.",
};

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="notes"
        title="Notes."
        lede="Small thoughts, smaller than essays. Posted whenever; deleted occasionally; never proofread twice."
      />

      <ol className="space-y-10">
        {sorted.map((n) => (
          <li key={n.id} className="border-l-2 border-rule pl-5">
            <time
              dateTime={n.date}
              className="font-mono text-[11px] uppercase tracking-wider text-ink-faint"
            >
              {formatDate(n.date)}
            </time>
            <p className="mt-2 text-[1.0625rem] leading-[1.75] text-ink">
              {n.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
