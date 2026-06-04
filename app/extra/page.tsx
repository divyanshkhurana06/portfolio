import type { Metadata } from "next";
import { siChessdotcom, siDiscord, siSpotify, siSteam, siX } from "simple-icons";

// GeoGuessr isn't in simple-icons yet, so we inline a location-pin glyph
// — conceptually obvious for a "guess where in the world" platform.
const GEOGUESSR_PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";
import { ExtraSceneClient } from "@/components/extra-scene-client";
import { FlappyTech } from "@/components/flappy-tech";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Extra",
  description:
    "",
};

/* -------------------------------------------------------------------------- */
/*  /extra — the canvas dominates the top of the page. No headings, no       */
/*  caption, no descriptive paragraph; just the columns. Below it sits a     */
/*  tidy "elsewhere" grid for off-site platforms and a small snapshot of    */
/*  whatever I'm into at the moment.                                         */
/* -------------------------------------------------------------------------- */

export default function ExtraPage() {
  return (
    <div className="pt-6 sm:pt-8">
      <section
        aria-label="Interactive cursor field and Flappy Tech game"
        className="container-wide"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            className="h-[58vh] min-h-[380px] w-full overflow-hidden rounded-xl
                       border border-rule/70 bg-paper-sunk"
          >
            <ExtraSceneClient />
          </div>
          <FlappyTech />
        </div>
      </section>

      <div className="container-wide">
        <Divider />

        {/* Off-site presence */}
        <section aria-labelledby="elsewhere">
          <header className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="elsewhere" className="eyebrow">
              elsewhere
            </h2>
            <p className="text-xs text-ink-faint">
              
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <PlatformCard
              icon={siChessdotcom.path}
              brandColor="#5b9c4d"
              label={site.extras.chess.label}
              handle={site.extras.chess.handle}
              blurb={site.extras.chess.blurb}
              href={site.extras.chess.url}
            />
            <PlatformCard
              icon={GEOGUESSR_PIN_PATH}
              brandColor="#fece4e"
              brandIconColor="#1c1917"
              label={site.extras.geoguessr.label}
              handle={site.extras.geoguessr.handle}
              blurb={site.extras.geoguessr.blurb}
              href={site.extras.geoguessr.url}
            />
            <PlatformCard
              icon={siDiscord.path}
              brandColor="#5865f2"
              label={site.extras.discord.label}
              handle={site.extras.discord.handle}
              blurb={site.extras.discord.blurb}
              href={site.extras.discord.url}
            />
            <PlatformCard
              icon={siX.path}
              brandColor="#0f1419"
              label={site.extras.x.label}
              handle={site.extras.x.handle}
              blurb={site.extras.x.blurb}
              href={site.extras.x.url}
            />
            <PlatformCard
              icon={siSpotify.path}
              brandColor="#1db954"
              label={site.extras.spotify.label}
              handle={site.extras.spotify.handle}
              blurb={site.extras.spotify.blurb}
              href={site.extras.spotify.url}
            />
          </ul>
        </section>

        <Divider />

        {/* Currently into — a tiny snapshot of what I'm consuming. */}
        <section aria-labelledby="currently">
          <header className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="currently" className="eyebrow">
              currently into
            </h2>
            <p className="text-xs text-ink-faint">
              
            </p>
          </header>
              <p> Running, Basketball, Pickleball, Chess</p>

        </section>

   

        {/* Tiny note at the bottom — keep the page from ending abruptly. */}
        <section className="pb-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          </p>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Components                                                                */
/* -------------------------------------------------------------------------- */

function Divider() {
  return <hr className="my-12 border-0 border-t border-rule/70" aria-hidden />;
}

function PlatformCard({
  icon,
  brandColor,
  brandIconColor = "#ffffff",
  label,
  handle,
  blurb,
  href,
  className,
}: {
  icon: string;
  brandColor: string;
  brandIconColor?: string;
  label: string;
  handle: string;
  blurb: string;
  href: string;
  className?: string;
}) {
  return (
    <li className={className}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative flex h-full items-start gap-4 rounded-lg border border-rule/70
                   bg-paper-raised/40 p-4 no-underline transition-all
                   hover:-translate-y-0.5 hover:border-accent/60 hover:bg-paper-raised
                   focus-visible:-translate-y-0.5 focus-visible:border-accent"
      >
        {/* Brand glyph — sized like a profile picture. The brand color
            does the heavy visual work; the rest of the card stays calm. */}
        <span
          aria-hidden
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md
                     transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ backgroundColor: brandColor }}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path d={icon} fill={brandIconColor} />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[0.95rem] font-medium text-ink">{label}</p>
            <span
              aria-hidden
              className="text-ink-faint transition-transform duration-200
                         group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                         group-hover:text-accent"
            >
              ↗
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[11.5px] tracking-tight text-ink-muted">
            {handle}
          </p>
          <p className="mt-1.5 text-[0.85rem] leading-snug text-ink-faint">
            {blurb}
          </p>
        </div>
      </a>
    </li>
  );
}

function StatusRow({
  label,
  value,
  icon,
  iconColor,
}: {
  label: string;
  value: string;
  icon?: string;
  iconColor?: string;
}) {
  return (
    <>
      <dt className="eyebrow leading-[1.6]">{label}</dt>
      <dd className="flex items-center gap-2 leading-[1.6] text-ink-muted">
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: iconColor ?? "currentColor" }}
          >
            <path d={icon} fill="currentColor" />
          </svg>
        ) : null}
        <span>{value}</span>
      </dd>
    </>
  );
}
