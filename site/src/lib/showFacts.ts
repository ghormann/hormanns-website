// Show size figures (songs, minutes, pixels) read from the year pages, so the
// numbers in page copy follow whatever the content files say.
//
// Each figure comes from the season the site is currently talking about (see
// currentSeasonYear). If that season's page doesn't have a figure yet, the
// newest earlier year that does is used instead. <ShowStats> still replaces
// songs and minutes with live figures from the playlist API once a page loads.
import { getCollection } from 'astro:content';
import { currentSeasonYear } from './displayYears';

export interface ShowFacts {
  songs: number;
  minutes: number;
  pixels: number;
  /** `pixels` rounded down to the thousand, for "over 75,000" style copy. */
  pixelsFloor: number;
}

export async function showFacts(now: Date = new Date()): Promise<ShowFacts> {
  const seasonYear = currentSeasonYear(now);
  const years = (await getCollection('christmas', ({ data }) => !data.draft && data.year <= seasonYear))
    .sort((a, b) => b.data.year - a.data.year);

  const latest = (key: string): number => {
    for (const y of years) {
      const v = y.data.stats?.[key];
      if (typeof v === 'number') return v;
    }
    throw new Error(`No year page up to ${seasonYear} has a numeric stats.${key}`);
  };

  const pixels = latest('pixel_count');
  return {
    songs: latest('songs'),
    minutes: latest('show_duration_in_minutes'),
    pixels,
    pixelsFloor: Math.floor(pixels / 1000) * 1000,
  };
}
