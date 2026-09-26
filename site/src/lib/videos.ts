export type VideoCategory = 'song' | 'construction';

export interface Video {
  id: string;
  title: string;
  thumb?: string;
  category?: VideoCategory;
}

// Setup, take-down, staging and behind-the-scenes videos are titled
// consistently enough ("Setup: Day 3", "Take Down Day 1", "Takedown: Day 2",
// "Grid Going up", "Everything is Staged") that the title decides; a video's
// own `category` wins when the guess is wrong.
const CONSTRUCTION = /\b(set ?up|setting up|take ?down|going up|behind the scenes|stag(ed|ing))\b/i;

export function videoCategory(v: Video): VideoCategory {
  return v.category ?? (CONSTRUCTION.test(v.title) ? 'construction' : 'song');
}

// Construction videos read newest-first, like a season in reverse:
//   1. behind the scenes
//   2. take down, highest day first (Day 3 → Day 0)
//   3. setup, highest day first (Day 13 → Day 1)
//   4. anything else about the build (e.g. "Grid Going up")
//   5. staging, which happens before setup starts
// Videos in the same group with no day number keep their original order.
const GROUPS: RegExp[] = [
  /\bbehind the scenes\b/i,
  /\btake ?down\b/i,
  /\b(set ?up|setting up)\b/i,
  /\bstag(ed|ing)\b/i,
];
const OTHER = 3; // sorts between setup (2) and staging (4)

function group(title: string): number {
  const i = GROUPS.findIndex(re => re.test(title));
  if (i === -1) return OTHER;
  return i === 3 ? 4 : i;
}

function day(title: string): number {
  const m = /\bday\s*(\d+)/i.exec(title);
  return m ? Number(m[1]) : -1;
}

export function sortConstruction(videos: Video[]): Video[] {
  return videos
    .map((v, i) => ({ v, i, g: group(v.title), d: day(v.title) }))
    .sort((a, b) => a.g - b.g || b.d - a.d || a.i - b.i)
    .map(x => x.v);
}
