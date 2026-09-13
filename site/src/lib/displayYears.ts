// Greg started experimenting with animated displays in 2001, which we count as year one.
export const yearsOfDisplay = new Date().getFullYear() - 2000;

export function yearCountInWords(n: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  const tensDigit = Math.floor(n / 10);
  const onesDigit = n % 10;
  return onesDigit ? `${tens[tensDigit]}-${ones[onesDigit].toLowerCase()}` : tens[tensDigit];
}

export const yearsOfDisplayWords = yearCountInWords(yearsOfDisplay);

// ---------------------------------------------------------------------------
// Season schedule
//
// The display opens two days before Thanksgiving (i.e. the Tuesday before) and
// runs nightly through January 1. Everything below is derived so the dates and
// the Event structured data can never go stale.
// ---------------------------------------------------------------------------

export const SHOW_OPEN_HOUR = 17; // 5:00 PM
export const SHOW_CLOSE_HOUR = 23; // 11:00 PM
export const SHOW_HOURS_TEXT = '5:00 PM to 11:00 PM';

/** Thanksgiving Day (US): the fourth Thursday of November. */
export function thanksgiving(year: number): Date {
  const nov1 = new Date(year, 10, 1);
  const firstThursday = 1 + ((4 - nov1.getDay() + 7) % 7);
  return new Date(year, 10, firstThursday + 21);
}

/** Opening night: two days before Thanksgiving (the Tuesday before). */
export function seasonOpen(year: number): Date {
  const t = thanksgiving(year);
  return new Date(year, 10, t.getDate() - 2);
}

/** Closing night: January 1 of the following year. */
export function seasonClose(year: number): Date {
  return new Date(year + 1, 0, 1);
}

/**
 * The season the site should be talking about: the one currently running, or
 * — once a season has ended — the next one.
 */
export function currentSeasonYear(now: Date = new Date()): number {
  const y = now.getFullYear();
  // Jan 1 still belongs to the previous November's season.
  if (now < seasonClose(y - 1)) return y - 1;
  return y;
}

/** True while the display is actually running (date range, not time of day). */
export function isSeasonActive(now: Date = new Date()): boolean {
  const y = currentSeasonYear(now);
  return now >= seasonOpen(y) && now <= endOfDay(seasonClose(y));
}

function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
}

const LONG_DATE = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function formatLongDate(d: Date): string {
  return LONG_DATE.format(d);
}

/** `YYYY-MM-DDTHH:mm:ss-05:00` — schema.org dates in US Eastern (EST in season). */
export function isoLocal(d: Date, hour: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hour)}:00:00-05:00`;
}

export interface Season {
  year: number;
  open: Date;
  close: Date;
  openText: string;
  closeText: string;
  startDateIso: string;
  endDateIso: string;
  active: boolean;
}

export function season(now: Date = new Date()): Season {
  const year = currentSeasonYear(now);
  const open = seasonOpen(year);
  const close = seasonClose(year);
  return {
    year,
    open,
    close,
    openText: formatLongDate(open),
    closeText: formatLongDate(close),
    startDateIso: isoLocal(open, SHOW_OPEN_HOUR),
    endDateIso: isoLocal(close, SHOW_CLOSE_HOUR),
    active: isSeasonActive(now),
  };
}

/**
 * Build-time fallbacks for the show size. <ShowStats> replaces these with live
 * figures from the playlist API once a page loads; they only need to be right
 * enough to be correct if that request never completes.
 */
export const SHOW_DEFAULTS = { songs: 28, minutes: 73 } as const;

/**
 * Whether the homepage should surface the "Come See the Lights" block.
 *
 * Visitor information is only useful in the run-up to and through the season,
 * so it shows from October 1 through January 15 and stays hidden the rest of
 * the year. Exported so the page and its client-side script agree on the rule.
 */
export const VISIT_WINDOW = { startMonth: 9, endMonth: 0, endDay: 15 } as const; // Oct 1 – Jan 15

export function inVisitWindow(now: Date = new Date()): boolean {
  const month = now.getMonth();
  if (month >= VISIT_WINDOW.startMonth) return true; // Oct, Nov, Dec
  return month === VISIT_WINDOW.endMonth && now.getDate() <= VISIT_WINDOW.endDay; // Jan 1–15
}
