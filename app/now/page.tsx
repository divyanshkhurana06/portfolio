import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { now } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on lately. Updated whenever the answer changes.",
};

export default function NowPage() {
  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="now"
        title="What I'm up to, lately."
        lede={
          <>
            A <a className="link" href="https://nownownow.com/about">/now page</a>{" "}
            — a snapshot of where my attention is going. Updated{" "}
            <time dateTime={now.updated}>{formatDate(now.updated)}</time>.
          </>
        }
      />

      <div className="space-y-10">
        {now.blocks.map((b) => (
          <section key={b.heading}>
            <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
              {b.heading}
            </h2>
            <p className="text-[1.0625rem] leading-[1.75] text-ink-muted">
              {b.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-16 border-t border-rule pt-6 text-sm italic text-ink-faint">
        This page changes when I do. If it&rsquo;s been a while, send me a friendly
        nudge.
      </p>
    </div>
  );
}
