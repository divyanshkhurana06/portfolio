// Small, refined "Resume" pill button. Opens the PDF in a new tab and
// hints at download (most browsers will treat the `download` attribute
// as a real download if the user explicitly chooses Save).
export function ResumeButton({
  href = "/divyansh-khurana-resume.pdf",
  label = "Resume",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      download
      className="group relative inline-flex items-center gap-2 overflow-hidden
                 rounded-full border border-rule bg-paper-raised/60 px-3.5 py-1.5
                 text-sm text-ink no-underline shadow-[0_1px_0_rgb(0_0_0_/_0.02)]
                 transition-all duration-200
                 hover:-translate-y-px hover:border-accent/40 hover:bg-paper-raised
                 hover:shadow-[0_2px_0_rgb(0_0_0_/_0.04)]"
      aria-label="Download résumé (PDF)"
    >
      {/* Tiny mono label, like a tag */}
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint
                       transition-colors group-hover:text-accent">
        pdf
      </span>

      {/* Subtle vertical separator */}
      <span aria-hidden className="h-3 w-px bg-rule" />

      <span className="font-medium">{label}</span>

      {/* Document-with-down-arrow glyph */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ink-muted transition-transform duration-200
                   group-hover:translate-y-0.5 group-hover:text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M12 12v6" />
        <path d="m9 15 3 3 3-3" />
      </svg>
    </a>
  );
}
