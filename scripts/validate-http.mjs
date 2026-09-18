import assert from 'node:assert/strict';
import fs from 'node:fs';
import { siteOrigin as origin } from '../lib/site-origin.ts';

// HTTP/content verification only; no browser automation or visual inspection.
const base = process.argv[2] || 'http://localhost:3000';
const content = fs.readFileSync(
  new URL('../lib/content.ts', import.meta.url),
  'utf8',
);
const sportSlugs = [
  ...content.split('export const audiences')[0].matchAll(/slug: '([^']+)'/g),
].map((x) => x[1]);
const routes = [
  '/',
  '/plateforme',
  '/sports',
  '/tarifs',
  '/aide',
  '/rejoindre',
  '/a-propos',
  '/actualites',
  ...sportSlugs.map((x) => `/sports/${x}`),
  ...['sportifs', 'professionnels', 'organisations'].map(
    (x) => `/pour-vous/${x}`,
  ),
];
const records = {
  '/': ['Opportunity Players — Le réseau des acteurs du sport', '/og.png'],
  '/sports/football': [
    'Football — Opportunity Players',
    '/images/football.webp',
  ],
  '/sports/padel': ['Padel — Opportunity Players', '/images/padel.webp'],
  '/pour-vous/sportifs': [
    'Sportifs — Opportunity Players',
    '/images/football.webp',
  ],
  '/pour-vous/professionnels': [
    'Professionnels — Opportunity Players',
    '/images/tennis.webp',
  ],
};
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.ok(html.includes('id="main"'), `${route}: landmark`);
  if (records[route]) {
    const [title, img] = records[route];
    assert.ok(html.includes(`<title>${title}</title>`), `${route}: title`);
    for (const property of ['og:title', 'twitter:title'])
      assert.ok(
        html.includes(`${property}" content="${title}"`),
        `${route}: ${property}`,
      );
    for (const property of ['og:image', 'twitter:image'])
      assert.ok(
        html.includes(`${property}" content="${origin}${img}"`),
        `${route}: ${property}`,
      );
    assert.ok(
      /name="description" content="[^"]{30,}"/.test(html),
      `${route}: description`,
    );
  }
  console.log('OK', route);
}
for (const route of [
  '/sports/inexistant',
  '/pour-vous/inexistant',
  '/page-inexistante',
])
  assert.equal((await fetch(base + route)).status, 404, route);
for (const file of fs.readdirSync(
  new URL('../public/images/', import.meta.url),
))
  assert.equal((await fetch(`${base}/images/${file}`)).status, 200, file);
assert.equal((await fetch(`${base}/og.png`)).status, 200);
console.log(
  `PASS: ${routes.length} pages, 3 missing routes, ${fs.readdirSync(new URL('../public/images/', import.meta.url)).length} image files, social image, 5 metadata sets.`,
);
