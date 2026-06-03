import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-prose flex min-h-[60dvh] flex-col items-start justify-center pt-12 sm:pt-16">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem]">
        This page isn&rsquo;t here.
      </h1>
      <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.7] text-ink-muted">
        It may have moved, never existed, or be a future page I haven&rsquo;t
        written yet. Either way — let&rsquo;s get you somewhere else.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/" className="link">
          ← back home
        </Link>
        <Link href="/projects" className="link">
          see projects
        </Link>
        <Link href="/gallery" className="link">
          peek at the gallery
        </Link>
        <Link href="/extra" className="link">
          poke the 3D thing
        </Link>
      </div>
    </div>
  );
}
