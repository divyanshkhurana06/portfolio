import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { posts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="container-prose pt-12 sm:pt-16">
      <p className="eyebrow">
        <Link href="/writing" className="link-quiet">
          ← writing
        </Link>
      </p>
      <header className="mt-3 mb-10 space-y-4 border-b border-rule pb-8">
        <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.5rem]">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
          <time dateTime={post.date} className="font-mono text-xs uppercase tracking-wider">
            {formatDate(post.date)}
          </time>
          {post.readingTime ? (
            <>
              <span aria-hidden className="text-ink-faint">
                ·
              </span>
              <span className="text-xs">{post.readingTime} read</span>
            </>
          ) : null}
          {post.tags?.length ? (
            <>
              <span aria-hidden className="text-ink-faint">
                ·
              </span>
              <span className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-paper-sunk px-2 py-0.5 text-[11px] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </span>
            </>
          ) : null}
        </div>
        <p className="text-pretty text-[1.0625rem] leading-[1.7] text-ink-muted">
          {post.summary}
        </p>
      </header>

      <Prose>
        <p>
          <em>
            This is a placeholder post body. When you wire up MDX (or a CMS), this
            page will render the actual content for{" "}
            <code>/writing/{post.slug}</code>.
          </em>
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam
          lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam
          viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent
          et diam eget libero egestas mattis sit amet vitae augue.
        </p>

        <h2>A section heading</h2>
        <p>
          Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut
          libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </p>

        <ul>
          <li>One placeholder bullet.</li>
          <li>Another placeholder bullet.</li>
          <li>A third for good measure.</li>
        </ul>

        <blockquote>
          A short pull quote that you can replace with whatever you actually want to
          say.
        </blockquote>

        <p>
          Until then, this paragraph is just here to give the layout something to
          breathe with. Pretend it&rsquo;s the closing of a thoughtful essay.
        </p>
      </Prose>

      <footer className="mt-16 border-t border-rule pt-8">
        <Link
          href="/writing"
          className="text-sm text-ink-muted no-underline hover:text-accent"
        >
          ← back to all writing
        </Link>
      </footer>
    </article>
  );
}
