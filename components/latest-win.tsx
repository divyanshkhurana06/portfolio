import Image from "next/image";
import Link from "next/link";

export function LatestWin() {
  return (
    <section
      aria-labelledby="latest-win"
      className="group/win relative overflow-hidden rounded-2xl border border-accent/30
                 bg-accent-soft/50 shadow-[0_1px_0_rgb(0_0_0_/_0.03)]"
    >
      <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <p className="eyebrow flex items-center gap-2 text-accent">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
            />
            just happened
          </p>

          <h2
            id="latest-win"
            className="text-balance font-serif text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[1.9rem]"
          >
            Winner, Fund My Crazy 2026
          </h2>

          <p className="text-pretty text-[0.95rem] leading-relaxed text-ink-muted">
            A Google Gemini competition. 1,92,000 entries, ten finalists, pitched
            live on stage at IIT Delhi to Tanmay Bhat, Sahiba Bali and Varun
            Mayya.
          </p>

          <p className="text-pretty text-[0.95rem] leading-relaxed text-ink-muted">
            My idea is{" "}
            <strong className="font-semibold text-ink">Dagar</strong>, an app
            that helps a town give its street vendors a legal spot. It started
            with the chai wala outside my house, whose stall a municipal truck
            kept taking away.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link href="/projects" className="link-quiet font-medium">
              About Dagar{" "}
              <span aria-hidden className="text-ink-faint">
                →
              </span>
            </Link>
            <a
              href="https://www.instagram.com/p/Ddy1xgeAmoM/?img_index=1"
              target="_blank"
              rel="noreferrer noopener"
              className="link-quiet"
            >
              Google&rsquo;s post{" "}
              <span aria-hidden className="text-ink-faint">
                ↗
              </span>
            </a>
            <Link href="/gallery" className="link-quiet">
              Photos{" "}
              <span aria-hidden className="text-ink-faint">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[220px] w-full md:min-h-full">
          <Image
            src="/gallery/dagar-pitch.jpg"
            alt="Divyansh pitching Dagar on stage at the Fund My Crazy grand finale at IIT Delhi"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700
                       group-hover/win:scale-[1.03]"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-accent-soft/80 via-accent-soft/10 to-transparent
                       md:from-accent-soft md:via-accent-soft/20"
          />
        </div>
      </div>
    </section>
  );
}
