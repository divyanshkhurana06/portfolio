"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/writing", label: "writing" },
  { href: "/projects", label: "projects" },
  { href: "/notes", label: "notes" },
  { href: "/reading", label: "reading" },
  { href: "/now", label: "now" },
  { href: "/uses", label: "uses" },
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
      <div className="container-wide flex items-center justify-between gap-4 py-5">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 text-ink no-underline"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-accent transition-transform
                       group-hover:scale-125"
          />
          <span className="font-serif text-base font-medium tracking-tight">
            {site.shortName}
          </span>
          <span className="text-sm text-ink-faint">.me</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 text-sm">
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
                        "rounded-md px-2 py-1 no-underline transition-colors",
                        active
                          ? "text-ink bg-paper-raised"
                          : "text-ink-muted hover:text-ink hover:bg-paper-raised"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span aria-hidden className="mx-1 hidden h-4 w-px bg-rule md:block" />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav: simple wrap-around row, no JS drawer needed. */}
      <nav aria-label="Primary mobile" className="md:hidden">
        <ul className="container-wide flex flex-wrap items-center gap-x-3 gap-y-1 pb-4 text-sm">
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
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
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
