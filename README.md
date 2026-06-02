# portfolio

A small, content-first personal site. Calm warm/stone palette, serif headings,
dark mode, and pages like `/now`, `/uses`, `/reading`, `/guestbook` to make it
feel personal.

Built with [Next.js 15 (App Router)](https://nextjs.org/),
[TypeScript](https://www.typescriptlang.org/), and
[Tailwind CSS](https://tailwindcss.com/).

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Where things live

- `app/` — all routes (Next App Router pages).
- `app/globals.css` — design tokens (light + dark palette), base typography.
- `app/layout.tsx` — root layout, fonts, theme provider.
- `components/` — header, footer, theme toggle, post list, prose wrapper.
- `lib/site.ts` — your name, email, social links, location. **Start here.**
- `lib/content.ts` — placeholder posts, projects, notes, books, /now, /uses.
  Edit these arrays to make the site yours.
- `app/writing/[slug]/page.tsx` — post template (placeholder body). Wire up
  MDX or a CMS later.
- `app/guestbook/page.tsx` — form is intentionally non-functional. Connect it
  to a database / edge function when you're ready.

## Conventions

- Stick to the three font tokens: `font-sans`, `font-serif`, `font-mono`.
- Stick to the palette: `text-ink`, `text-ink-muted`, `text-ink-faint`,
  `bg-paper`, `bg-paper-raised`, `bg-paper-sunk`, `border-rule`, `text-accent`.
- Use the `.eyebrow`, `.link`, `.link-quiet`, `.hairline` component classes
  for consistency.
- Prefer `container-prose` for reading pages, `container-wide` for index
  pages.

## What's next

A few obvious follow-ups when you want to grow this:

- MDX for blog posts (`@next/mdx` or `contentlayer`).
- An RSS/Atom feed (`app/feed.xml/route.ts`).
- A real OG image generator (`opengraph-image.tsx`).
- A backed guestbook (Supabase / Turso / Neon).
- View transitions for page changes.
- A photos page.

— Have fun with it.
