export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
) {
  return new Date(iso).toLocaleDateString("en-US", opts);
}

export function formatDateShort(iso: string) {
  return formatDate(iso, { year: "numeric", month: "short", day: "numeric" });
}
