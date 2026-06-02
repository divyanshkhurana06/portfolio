import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post-list";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, notes, and the occasional long thought.",
};

export default function WritingPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  // Group by year for a calmer scroll.
  const byYear = sorted.reduce<Record<string, typeof posts>>((acc, p) => {
    const y = p.date.slice(0, 4);
    (acc[y] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container-wide pt-12 sm:pt-16">
      <PageHeader
        eyebrow="writing"
        title="Writing."
        lede="A working archive of essays, build notes, and small things I wanted to think out loud about. New posts arrive in irregular weather."
      />

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} aria-labelledby={`year-${year}`}>
            <div className="mb-2 flex items-baseline justify-between">
              <h2
                id={`year-${year}`}
                className="font-serif text-xl font-medium text-ink"
              >
                {year}
              </h2>
              <span className="text-xs text-ink-faint">
                {byYear[year].length}{" "}
                {byYear[year].length === 1 ? "post" : "posts"}
              </span>
            </div>
            <div className="hairline mb-2" />
            <PostList posts={byYear[year]} showSummary />
          </section>
        ))}
      </div>
    </div>
  );
}
