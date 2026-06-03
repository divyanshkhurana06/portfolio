import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <footer className="mt-24 border-t border-rule/70">
      <div className="container-wide py-12">
        {/* Top row: contact + navigation */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.2fr_1fr]">
          {/* Identity + the two ways to reach me + social links */}
          <div>
            <p className="font-serif text-lg italic text-ink">{site.name}</p>

            <dl className="mt-5 space-y-2 text-sm">
              <EmailRow label="primary" address={site.email} />
              <EmailRow label="college" address={site.emailBackup} />
            </dl>

            {/* Social row, sized to match the emails. Sits a hair below
                them so the eye reads identity → emails → handles top-down. */}
            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <li>
                <SocialLink href={site.social.github}>github</SocialLink>
              </li>
              <li>
                <SocialLink href={site.social.linkedin}>linkedin</SocialLink>
              </li>
              <li>
                <SocialLink href={site.social.x}>x</SocialLink>
              </li>
            </ul>
          </div>

          {/* Internal pages — 2 / 2 / 1 layout. Resume is intentionally
              excluded; it already has the prominent button on the home page. */}
          <nav aria-label="Footer">
            <p className="eyebrow mb-4">elsewhere</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              <FooterLink href="/projects">projects</FooterLink>
              <FooterLink href="/gallery">gallery</FooterLink>
              <FooterLink href="/notes">notes</FooterLink>
              <FooterLink href="/endorse">endorse</FooterLink>
              <FooterLink href="/extra">extra</FooterLink>
            </div>
          </nav>
        </div>

        {/* Bottom hairline + last-updated line */}
        <div className="mt-10 border-t border-rule/60 pt-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            last updated{" "}
            <time dateTime={new Date().toISOString().slice(0, 10)}>
              {updated}
            </time>
          </p>
        </div>
      </div>
    </footer>
  );
}

function EmailRow({ label, address }: { label: string; address: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </dt>
      <dd>
        <a
          href={`mailto:${address}`}
          className="text-ink no-underline transition-colors hover:text-accent"
        >
          {address}
        </a>
      </dd>
    </div>
  );
}

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group text-ink no-underline transition-colors hover:text-accent"
    >
      {children}
      <span
        aria-hidden
        className="ml-0.5 inline-block text-ink-faint transition-transform duration-200
                   group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      >
        ↗
      </span>
    </a>
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
