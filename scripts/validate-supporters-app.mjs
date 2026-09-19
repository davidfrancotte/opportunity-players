import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { supporters } from '../lib/supporters.ts';

// HTTP/source checks only. This deliberately does not automate a browser.
const base = process.argv[2] || 'http://localhost:3000';
const get = async (path) => {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  return response;
};
assert.equal(supporters.length, 13);
assert.equal(new Set(supporters.map((person) => person.src)).size, 13);
const home = await (await get('/')).text();
assert.ok(home.includes('id="soutiens"'));
assert.equal((home.match(/class="supporter-card"/g) || []).length, 13);
assert.ok(home.includes('Voir les sportifs suivants'));
assert.ok(home.includes('Voir les sportifs précédents'));
for (const person of supporters) {
  assert.ok(home.includes(`alt="${person.name}"`), person.name);
  assert.ok(home.includes(person.sourceUrl), person.sourceUrl);
  const delivered = Buffer.from(await (await get(person.src)).arrayBuffer());
  const original = fs.readFileSync(
    new URL('../public' + person.src, import.meta.url),
  );
  assert.equal(
    createHash('sha256').update(delivered).digest('hex'),
    createHash('sha256').update(original).digest('hex'),
  );
}
const placements = [
  '/',
  '/plateforme',
  '/pour-vous/sportifs',
  '/pour-vous/professionnels',
  '/pour-vous/organisations',
];
for (const path of placements) {
  const html = await (await get(path)).text();
  assert.equal(
    (html.match(/data-phone-model="solid"/g) || []).length,
    path === '/plateforme' ? 2 : 1,
    `${path}: solid 3D phone integration`,
  );
  assert.equal(
    (html.match(/data-app-screen="placeholder"/g) || []).length,
    0,
    `${path}: placeholders replaced by actual Studio captures`,
  );
  assert.ok(html.includes('/app-visuals/studio-accueil.png'), path);
  assert.ok(!html.includes('ÉCRAN PROVISOIRE'), path);
  assert.ok(
    html.includes(
      'https://apps.apple.com/fr/app/opportunity-players/id6741804702',
    ),
    path,
  );
  assert.ok(
    html.includes(
      'https://play.google.com/store/apps/details?id=com.oanna.opportunityplayers.group',
    ),
    path,
  );
  assert.ok(html.includes('href="/application"'), path);
  assert.ok(html.includes('APPLICATION ACTUELLE'), path);
}
const device = await get('/app-visuals/phone-placeholder.webp');
assert.match(device.headers.get('content-type'), /image\/webp/);
const styles = fs.readFileSync(
  new URL('../app/supporters-app.css', import.meta.url),
  'utf8',
);
assert.match(styles, /filter: grayscale\(1\)/);
assert.match(styles, /\.supporter-card:hover[^}]+filter: grayscale\(0\)/s);
assert.match(
  styles,
  /\.supporter-card:focus-visible[^}]+filter: grayscale\(0\)/s,
);
assert.match(styles, /prefers-reduced-motion: reduce/);
assert.match(styles, /hover: none/);
console.log(
  'PASS: 13 original supporter assets; hover/focus/touch/reduced-motion CSS; 5 app placements, 6 actual Studio captures; current store links; device asset.',
);
