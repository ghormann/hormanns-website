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
  // Full Google Maps place URL (what the old goo.gl short link resolved to);
  // Google is retiring goo.gl links, so nothing should point at one.
  mapUrl: 'https://www.google.com/maps/place/Christmas+@+the+Hormanns/@39.3953299,-84.3994264,18z/data=!4m5!3m4!1s0x88405b01adc3fe25:0xe69153dcc65684a9!8m2!3d39.395325!4d-84.3991475',
  interactUrl: 'https://vote-now.org/',
  fmFrequency: '106.7 FM',
  facebookUrl: 'https://www.facebook.com/HormannChristmas',
  coolDisplaysUrl: 'https://cooldisplays.net/index.php?page=single&id=1',
} as const;

/** A photo of the lit display, for the season Event (the upcoming season's own photos may not exist yet). */
export const SEASON_EVENT_IMAGE = '/christmas/2025/the_hormanns_2025.jpg';

export const VENMO_URL = 'https://account.venmo.com/u/Verna-Heaney';

export const CHARITY = {
  partner: "Southwest Ohio Valley Women's Club",
  partnerUrl: 'https://www.facebook.com/gfwcswohiovallleywomensclub',
  beneficiary: 'local food banks',
  accepts: 'non-perishable food, grocery gift cards, or cash',
  treasurer: 'Verna',
} as const;

export const fullAddress = `${DISPLAY.streetAddress}, ${DISPLAY.addressLocality}, ${DISPLAY.addressRegion} ${DISPLAY.postalCode}`;

/** Turn-by-turn directions to the house, opened in the visitor's map app. */
export const DIRECTIONS_URL = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
  apple: `https://maps.apple.com/?daddr=${encodeURIComponent(fullAddress)}`,
} as const;

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

/**
 * The schema.org Event for a season. Built in one place so every page that
 * carries it (Plan Your Visit, and the season's own year page) emits an
 * identical node under the same @id.
 */
export function seasonEvent(
  base: string,
  s: { year: number; openText: string; closeText: string; startDateIso: string; endDateIso: string },
  hoursText: string,
) {
  const organizer = person(base, 'Greg Hormann', 'greg');
  return {
    '@type': 'Event',
    '@id': `${base}/christmas/visit/#event-${s.year}`,
    name: `${DISPLAY.name}, ${s.year}`,
    description: `A free drive-up Christmas light show in Liberty Township, Ohio. Tens of thousands of RGB pixels synchronized to music, heard on ${DISPLAY.fmFrequency} from your car or on outdoor speakers if you walk around. Open nightly ${hoursText} from ${s.openText} through ${s.closeText}.`,
    image: absolute(base, SEASON_EVENT_IMAGE),
    startDate: s.startDateIso,
    endDate: s.endDateIso,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: place,
    organizer,
    performer: organizer,
    isAccessibleForFree: true,
    url: `${base}/christmas/visit/`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: s.startDateIso,
      url: `${base}/christmas/visit/`,
      category: 'Free',
    },
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
