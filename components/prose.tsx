import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Minimal "prose" wrapper so we don't need @tailwindcss/typography yet.
// Styles long-form text content (paragraphs, lists, headings) with sensible defaults.
export function Prose({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-prose text-[1.0625rem] leading-[1.75] text-ink",
        "[&_p]:my-5",
        "[&_p+p]:mt-0",
        "[&_a]:link",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_em]:italic",
        "[&_code]:rounded [&_code]:bg-paper-raised [&_code]:px-1.5 [&_code]:py-0.5",
        "[&_code]:font-mono [&_code]:text-[0.9em]",
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-paper-sunk [&_pre]:p-4",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:my-1.5",
        "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:my-1.5",
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent",
        "[&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ink-muted",
        "[&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold",
        "[&_h3]:mt-9 [&_h3]:mb-2 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_hr]:my-10 [&_hr]:border-rule",
        className
      )}
      {...props}
    />
  );
}
