import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const range =
    site.startYear === year ? `${year}` : `${site.startYear}–${year}`;

  return (
    <footer className="mt-24 border-t border-rule/70">
      <div className="container-wide flex flex-col gap-6 py-10 text-sm text-ink-muted sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-ink">
            <span className="font-serif italic">{site.name}</span>
          </p>
          <p>
            Made by hand in {site.location}. Last touched{" "}
            <time dateTime={new Date().toISOString().slice(0, 10)}>
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </time>
            .
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
          <FooterLink href="/now">/now</FooterLink>
          <FooterLink href="/uses">/uses</FooterLink>
          <FooterLink href="/guestbook">/guestbook</FooterLink>
          <FooterLink href={site.social.rss}>rss</FooterLink>
          <FooterLink href={site.social.github} external>
            github
          </FooterLink>
          <FooterLink href={`mailto:${site.email}`}>email</FooterLink>
        </div>
      </div>

      <div className="container-wide pb-10">
        <p className="text-xs text-ink-faint">
          © {range} {site.name}. Set in a serif and a sans, with a small smile.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="link-quiet"
      >
        {children}
        <span aria-hidden className="ml-0.5 text-ink-faint">
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href} className="link-quiet">
      {children}
    </Link>
  );
}
