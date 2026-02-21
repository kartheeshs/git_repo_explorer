export function getRelativeTime(
  dateString: string,
  locale: string = "ja"
): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const intervals = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ] as const;

  for (const interval of intervals) {
    const value = Math.floor(diffInSeconds / interval.seconds);
    if (value >= 1) {
      return rtf.format(-value, interval.unit);
    }
  }

  return locale === "ja" ? "今" : "now";
}
