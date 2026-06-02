import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 space-y-3", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="font-serif text-balance text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.5rem]">
        {title}
      </h1>
      {lede ? (
        <p className="max-w-prose text-pretty text-[1.0625rem] leading-[1.7] text-ink-muted">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
