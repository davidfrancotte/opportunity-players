export const athleteImageNames = [
  'football',
  'basketball',
  'padel',
  'tennis',
  'handball',
  'rugby',
  'volleyball',
  'hockey',
  'pickleball',
  'futsal',
  'boxing',
  'athletics',
  'adaptive-athletics',
  'arena-collective',
] as const;

const sources = new Map(
  athleteImageNames.map((name) => [
    `/images/${name}.${name === 'arena-collective' ? 'jpg' : 'webp'}`,
    `/images/${name}-color.webp`,
  ]),
);

export function colorImageSource(source: string): string {
  return sources.get(source) ?? source;
}
