# Portfolio

Personal site built with Next.js 15, Tailwind, and Prisma (SQLite).

## Features

- **Endorsements** — visitors submit kind words via `/endorse`; stored in the database and shown on the home page.
- **Flappy Tech** — on `/extra`, a theme-matched mini-game (flap through your stack).
- **Projects, notes, gallery** — static content in `lib/content.ts`.

## Setup

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite path, e.g. `file:./data/port.db` |
| `ADMIN_SECRET` | Optional — bearer token to `DELETE /api/whiteboard/strokes` and clear the wall |

### Database

```bash
npm run db:migrate   # apply migrations (dev)
npm run db:push      # push schema without migration files
```

The SQLite file is created at `./data/port.db` (gitignored).

### Production

For Vercel or other serverless hosts, use a hosted database (e.g. [Turso](https://turso.tech) or Neon Postgres) and set `DATABASE_URL` accordingly. Update `prisma/schema.prisma` `provider` if you switch away from SQLite.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally
