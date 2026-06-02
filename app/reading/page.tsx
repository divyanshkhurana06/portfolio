import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { reading } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reading",
  description: "A small bookshelf — what I've finished, what's open on the nightstand.",
};

export default function ReadingPage() {
  const groups = {
    reading: reading.filter((b) => b.status === "reading"),
    finished: reading.filter((b) => b.status === "finished"),
    want: reading.filter((b) => b.status === "want"),
  };

  return (
    <div className="container-prose pt-12 sm:pt-16">
      <PageHeader
        eyebrow="reading"
        title="A small bookshelf."
        lede="Books I'm in the middle of, books I've finished and remembered to log, and books waiting their turn on the nightstand."
      />

      <Section title="Currently reading" books={groups.reading} />
      <Section title="Recently finished" books={groups.finished} />
      <Section title="Want to read" books={groups.want} />
    </div>
  );
}

function Section({
  title,
  books,
}: {
  title: string;
  books: typeof reading;
}) {
  if (books.length === 0) return null;
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="eyebrow mb-3">{title}</h2>
      <ul className="divide-y divide-rule/70">
        {books.map((b) => (
          <li
            key={`${b.title}-${b.author}`}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div className="min-w-0">
              <p className="text-pretty font-serif text-base text-ink">{b.title}</p>
              <p className="text-sm text-ink-muted">{b.author}</p>
            </div>
            <div className="flex shrink-0 items-baseline gap-3 text-xs text-ink-faint">
              {b.rating ? (
                <span aria-label={`Rated ${b.rating} of 5`}>
                  {"★".repeat(b.rating)}
                  <span className="text-ink-faint/40">
                    {"★".repeat(5 - b.rating)}
                  </span>
                </span>
              ) : null}
              {b.finished ? (
                <time dateTime={b.finished} className="font-mono">
                  {formatDate(b.finished)}
                </time>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
