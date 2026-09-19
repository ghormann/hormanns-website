// Press coverage of the display.
//
// Lives here rather than on the press page because each year's page also shows
// the stories from that season. Every `date` was verified against the source
// (article datePublished, YouTube uploadDate, or the date in the URL path) —
// do not guess one in, since these values also feed structured data.

import { isoDate } from './displayYears';
import { DISPLAY } from './site';

export type CoverageType = 'segment' | 'article' | 'social';

export interface Coverage {
  outlet: string;
  title: string;
  url: string;
  /** ISO date, as published. */
  date: string;
  type: CoverageType;
  note?: string;
}

export const COVERAGE_LABEL: Record<CoverageType, string> = {
  segment: 'TV',
  article: 'Article',
  social: 'Social',
};

export const coverage: Coverage[] = [
  {
    outlet: 'Lakota East Spark',
    title: 'Story Behind the Lights',
    url: 'https://lakotaeastsparkonline.com/story-behind-the-lights/',
    date: '2025-12-29',
    type: 'article',
    note: 'A long-form student feature by Madison Cline on how the display came together.',
  },
  {
    outlet: 'Cincy Xmas Lights',
    title: 'Featured on Cincy Xmas Lights',
    url: 'https://www.facebook.com/watch/?v=1381945109428225',
    date: '2025-12-22',
    type: 'social',
    note: 'A Facebook community with more than 36,000 followers that highlights Christmas displays around Cincinnati.',
  },
  {
    outlet: 'The Cincinnati Enquirer',
    title: 'Christmas lights near me: Cincinnati homes decorated for the holidays',
    url: 'https://www.cincinnati.com/story/entertainment/2024/12/21/christmas-lights-near-me-cincinnati-homes-decorated-for-the-holidays/77104341007/',
    date: '2024-12-21',
    type: 'article',
  },
  {
    outlet: 'WKRC Local 12',
    title: "Bob Herzog visits Christmas at the Hormann's",
    url: 'https://www.youtube.com/watch?v=sJhgrT7oHVo',
    date: '2023-12-21',
    type: 'segment',
  },
  {
    outlet: 'WLWT 5',
    title: '25 Nights of Lights: The best-dressed Christmas homes around Cincinnati',
    url: 'https://www.wlwt.com/article/christmas-lights-cincinnati-list/45975101',
    date: '2023-12-04',
    type: 'article',
  },
  {
    outlet: 'WLWT 5',
    title: "Create your own display at this home's high tech Christmas light show in Liberty Township",
    url: 'https://www.youtube.com/watch?v=KFL8tMQSX0Q',
    date: '2023-12-01',
    type: 'segment',
  },
  {
    outlet: 'FOX19 NOW',
    title: "Catherine's Celebration of Lights: Christmas at the Hormanns",
    url: 'https://www.youtube.com/watch?v=CzXgFfJLD0k',
    date: '2023-11-22',
    type: 'segment',
  },
  {
    outlet: 'FOX19 NOW',
    title: 'Live broadcast from the display',
    url: 'https://www.youtube.com/watch?v=cqIseHP-Axw',
    date: '2023-11-22',
    type: 'segment',
  },
  {
    outlet: 'WLWT 5',
    title: 'You get to control the show at this Christmas lights display in Liberty Township',
    url: 'https://www.wlwt.com/article/you-get-to-control-the-show-at-this-christmas-lights-display-in-liberty-township/38398417',
    date: '2021-12-01',
    type: 'article',
  },
];

export const coverageYear = (c: Coverage): number => Number(c.date.slice(0, 4));

/** Newest first. */
const byDateDesc = (a: Coverage, b: Coverage) => b.date.localeCompare(a.date);

/** Every story that ran during a given season. */
export function coverageFor(year: number): Coverage[] {
  return coverage.filter(c => coverageYear(c) === year).sort(byDateDesc);
}

/** All coverage, grouped by the year the story actually ran, newest first. */
export function coverageByYear(): { year: number; items: Coverage[] }[] {
  return [...new Set(coverage.map(coverageYear))]
    .sort((a, b) => b - a)
    .map(year => ({ year, items: coverageFor(year) }));
}

/** Turns a YouTube watch URL into its embed-page equivalent, for VideoObject.embedUrl. */
function youtubeEmbedUrl(url: string): string | undefined {
  const id = url.match(/[?&]v=([^&]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : undefined;
}

/** schema.org nodes for a set of stories, for use in a page's @graph. */
export function coverageSchema(items: Coverage[], fallbackImage?: string) {
  return items.map(c => ({
    '@type':
      c.type === 'segment' ? 'VideoObject' : c.type === 'social' ? 'SocialMediaPosting' : 'NewsArticle',
    name: c.title,
    ...(c.type === 'segment' ? {} : { headline: c.title }),
    url: c.url,
    ...(c.type === 'segment'
      ? { uploadDate: isoDate(c.date), contentUrl: c.url, ...(youtubeEmbedUrl(c.url) ? { embedUrl: youtubeEmbedUrl(c.url) } : {}) }
      : { datePublished: isoDate(c.date) }),
    author: { '@type': 'Organization', name: c.outlet },
    publisher: { '@type': 'Organization', name: c.outlet },
    ...(fallbackImage
      ? c.type === 'segment'
        ? { thumbnailUrl: fallbackImage, description: `${c.outlet} coverage of ${DISPLAY.name}.` }
        : { image: fallbackImage }
      : {}),
  }));
}
