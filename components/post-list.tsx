import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDateShort } from "@/lib/utils";

export function PostList({
  posts,
  limit,
  showSummary = false,
}: {
  posts: Post[];
  limit?: number;
  showSummary?: boolean;
}) {
  const items = limit ? posts.slice(0, limit) : posts;

  return (
    <ul className="-mx-3 divide-y divide-rule/70">
      {items.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-1 rounded-lg px-3 py-4 no-underline
                       transition-colors hover:bg-paper-raised
                       sm:flex-row sm:items-baseline sm:gap-5"
          >
            <time
              dateTime={post.date}
              className="shrink-0 font-mono text-xs uppercase tracking-wide text-ink-faint
                         sm:w-24"
            >
              {formatDateShort(post.date)}
            </time>
            <div className="min-w-0 flex-1">
              <h3 className="text-pretty text-[1.0625rem] font-medium leading-snug text-ink
                             transition-colors group-hover:text-accent">
                {post.title}
                <span
                  aria-hidden
                  className="ml-1 inline-block translate-x-0 text-ink-faint opacity-0
                             transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                >
                  →
                </span>
              </h3>
              {showSummary && post.summary ? (
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                  {post.summary}
                </p>
              ) : null}
            </div>
            {post.readingTime ? (
              <span className="hidden shrink-0 text-xs text-ink-faint sm:inline">
                {post.readingTime}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
