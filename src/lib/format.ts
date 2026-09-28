export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  // timeZone: 'UTC' keeps output identical regardless of the build machine's
  // timezone — date-only frontmatter parses as UTC midnight.
  return new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", ...options }).format(d);
}
