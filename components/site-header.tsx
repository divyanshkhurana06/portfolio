"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/notes", label: "notes" },
  { href: "/gallery", label: "gallery" },
  { href: "/extra", label: "extra" },
  { href: "/endorse", label: "endorse" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3
                   focus:z-50 focus:rounded focus:bg-paper-raised focus:px-3 focus:py-2
                   focus:text-sm focus:text-ink focus:shadow"
      >
        Skip to content
      </a>

      <div className="container-wide flex items-center justify-between gap-6 py-5">
        {/* Brand — signature-style: first name in serif, last name in
            muted italic. The accent dot doubles as a "live" indicator. */}
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group inline-flex items-baseline gap-2.5 text-ink no-underline"
        >
          <span
            aria-hidden
            className="mb-[2px] inline-block h-1.5 w-1.5 rounded-full bg-accent
                       transition-transform duration-300 group-hover:scale-125"
          />
          <span className="font-serif text-[15px] tracking-tight">
            <span className="font-medium">Divyansh</span>{" "}
            <span className="italic text-ink-muted">Khurana</span>
          </span>
        </Link>

        {/* Desktop nav + theme toggle */}
        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-1 text-sm">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname?.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 no-underline transition-colors",
                        active
                          ? "bg-paper-raised text-ink"
                          : "text-ink-muted hover:bg-paper-raised hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span aria-hidden className="h-4 w-px bg-rule/70" />
          <ThemeToggle />
        </div>

        {/* Mobile theme toggle — sits next to brand so it's reachable */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav: a thin, tappable strip under the brand row. */}
      <nav aria-label="Primary mobile" className="md:hidden">
        <ul
          className="container-wide flex flex-wrap items-center gap-x-4 gap-y-1
                     pb-4 text-[13px]"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "no-underline transition-colors",
                    active
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
