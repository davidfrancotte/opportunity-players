import assert from 'node:assert/strict';
import fs from 'node:fs';
import { athleteImageNames, colorImageSource } from '../lib/athlete-images.ts';

const root = new URL('../', import.meta.url);
for (const name of athleteImageNames) {
  const original = `/images/${name}.${name === 'arena-collective' ? 'jpg' : 'webp'}`;
  assert.equal(colorImageSource(original), `/images/${name}-color.webp`);
  assert.ok(
    fs.existsSync(new URL(`public${original}`, root)),
    `preserve ${original}`,
  );
  const target = new URL(`public${colorImageSource(original)}`, root);
  assert.ok(fs.statSync(target).size > 1000, `usable variant ${name}`);
  const data = fs.readFileSync(target);
  assert.equal(data.toString('ascii', 0, 4), 'RIFF', `webp ${name}`);
  assert.equal(data.toString('ascii', 8, 12), 'WEBP', `webp ${name}`);
}
assert.equal(colorImageSource('/og.png'), '/og.png', 'social card unchanged');
assert.equal(
  colorImageSource('/images/unrelated.webp'),
  '/images/unrelated.webp',
);

const base = process.argv[2] || 'http://localhost:3000';
const routes = [
  '/',
  '/plateforme',
  '/sports',
  '/sports/football',
  '/sports/padel',
  '/sports/boxe',
  '/pour-vous/sportifs',
  '/pour-vous/professionnels',
  '/pour-vous/organisations',
  '/actualites',
  '/a-propos',
  '/rejoindre',
];
let instances = 0;
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    if (!tag.includes('/images/')) continue;
    instances++;
    assert.ok(tag.includes('athlete-image'), `${route}: image effect applied`);
    assert.ok(tag.includes('-color.webp'), `${route}: color master used`);
    assert.ok(
      tag.includes('data-athlete-color="selective"'),
      `${route}: selective color`,
    );
    assert.ok(/alt="[^"]+"/.test(tag), `${route}: alternative text preserved`);
  }
}
assert.ok(
  instances > 30,
  'coverage includes reusable sport cards and hero images',
);
const css = fs.readFileSync(new URL('app/athlete-images.css', root), 'utf8');
for (const rule of [
  'grayscale(var(--athlete-grayscale))',
  '(hover: hover)',
  ':focus-visible',
  '(hover: none)',
  'prefers-reduced-motion',
  '--athlete-brightness: 0.5',
  'transform 650ms',
])
  assert.ok(css.includes(rule), rule);
console.log(
  `PASS: 14 selective-color assets, ${instances} images across ${routes.length} routes, source mapping, keyboard/touch/reduced-motion declarations. No browser automation performed.`,
);
