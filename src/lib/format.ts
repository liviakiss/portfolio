/** "12 Oct" style date, always in the Netherlands time zone so it never flips between server and browser. */
export function formatDay(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(iso));
}
