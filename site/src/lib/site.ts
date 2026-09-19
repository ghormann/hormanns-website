// Single source of truth for the facts that appear in both page copy and
// structured data. Changing an address or an hour here changes it everywhere.

export const SITE_ORIGIN = 'https://thehormanns.net';

export const DISPLAY = {
  name: 'Christmas at the Hormanns',
  streetAddress: '6656 Devon Drive',
  addressLocality: 'Liberty Township',
  addressRegion: 'OH',
  postalCode: '45044',
  addressCountry: 'US',
  latitude: 39.395325,
  longitude: -84.3991475,
  mapUrl: 'https://goo.gl/maps/tZj7PPjBcjEFB1XM6',
  interactUrl: 'https://vote-now.org/',
  fmFrequency: '106.7 FM',
  facebookUrl: 'https://www.facebook.com/HormannChristmas',
  coolDisplaysUrl: 'https://cooldisplays.net/index.php?page=single&id=1',
} as const;

export const VENMO_URL = 'https://account.venmo.com/u/Verna-Heaney';

export const CHARITY = {
  partner: "Southwest Ohio Valley Women's Club",
  partnerUrl: 'https://www.facebook.com/gfwcswohiovallleywomensclub',
  beneficiary: 'local food banks',
  accepts: 'non-perishable food, grocery gift cards, or cash',
  treasurer: 'Verna',
} as const;

export const fullAddress = `${DISPLAY.streetAddress}, ${DISPLAY.addressLocality}, ${DISPLAY.addressRegion} ${DISPLAY.postalCode}`;

export function origin(site: URL | undefined): string {
  return (site ?? new URL(SITE_ORIGIN)).origin;
}

export function absolute(base: string, path: string): string {
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: DISPLAY.streetAddress,
  addressLocality: DISPLAY.addressLocality,
  addressRegion: DISPLAY.addressRegion,
  postalCode: DISPLAY.postalCode,
  addressCountry: DISPLAY.addressCountry,
};

export const geo = {
  '@type': 'GeoCoordinates',
  latitude: DISPLAY.latitude,
  longitude: DISPLAY.longitude,
};

export const place = {
  '@type': 'Place',
  name: 'Hormann Residence',
  address: postalAddress,
  geo,
};

export function person(base: string, name: string, slug: string) {
  return { '@type': 'Person', name, url: `${base}/${slug}/` };
}

/** Stable @id for the display as a visitable attraction, referenced from every page. */
export function touristAttraction(base: string, image?: string) {
  return {
    '@type': 'TouristAttraction',
    '@id': `${base}/christmas/visit/#attraction`,
    name: DISPLAY.name,
    description:
      'A free, computer-controlled Christmas light display with tens of thousands of RGB pixels synchronized to music, heard over FM radio or outdoor speakers, in Liberty Township, Ohio (Cincinnati area).',
    url: `${base}/christmas/visit/`,
    address: postalAddress,
    geo,
    hasMap: DISPLAY.mapUrl,
    isAccessibleForFree: true,
    publicAccess: true,
    touristType: ['Families', 'Christmas light enthusiasts'],
    sameAs: [DISPLAY.facebookUrl, DISPLAY.coolDisplaysUrl].filter(Boolean),
    ...(image ? { image } : {}),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbList(base: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${base}${c.path}`,
    })),
  };
}

/** Wrap one or more schema.org nodes in a single @graph document. */
export function graph(...nodes: unknown[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  });
}
