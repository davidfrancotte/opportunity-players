import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  demoMembers,
  demoOpportunities,
  memberPages,
  initialPosts,
  demoNotifications,
} from '../lib/member-data.ts';
const base = process.argv[2] || 'http://localhost:3000';
const origin =
  'https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site';
const routes = [
  '/espace',
  ...Object.keys(memberPages).map((x) => `/espace/${x}`),
  ...demoMembers.map((x) => `/espace/membres/${x.slug}`),
  ...demoOpportunities.map((x) => `/espace/opportunites/${x.slug}`),
];
const known = new Set(routes);
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
assert.equal(new Set(demoMembers.map((m) => m.slug)).size, demoMembers.length);
assert.equal(
  new Set(demoOpportunities.map((m) => m.slug)).size,
  demoOpportunities.length,
);
for (const p of initialPosts)
  assert.ok(demoMembers.some((m) => m.slug === p.author));
for (const o of demoOpportunities)
  assert.ok(demoMembers.some((m) => m.slug === o.member));
for (const n of demoNotifications) assert.ok(known.has(n.href));
let images = 0;
let checkedMetadata = 0;
for (const route of routes) {
  const r = await fetch(base + route);
  assert.equal(r.status, 200, route);
  const html = await r.text();
  assert.ok(html.includes('DÉMO ARENA'), `${route}: disclosure`);
  assert.ok(html.includes('id="main"'), `${route}: main landmark`);
  assert.ok(
    !html.includes('<header class="site-header"'),
    `${route}: member chrome`,
  );
  assert.ok(
    html.includes('aria-label="Espace membre"'),
    `${route}: navigation`,
  );
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!img[0].includes('/images/')) continue;
    images++;
    assert.ok(img[0].includes('-color.webp'), `${route}: color variant`);
    assert.ok(img[0].includes('athlete-image'), `${route}: hover effect`);
    assert.ok(/alt="[^"]+"/.test(img[0]), `${route}: alt`);
  }
  for (const link of html.matchAll(/href="(\/espace[^"#]*)"/g)) {
    const path = link[1].split('?')[0];
    assert.ok(known.has(path), `${route}: resolves ${path}`);
  }
  const member = demoMembers.find((m) => route === `/espace/membres/${m.slug}`);
  const opportunity = demoOpportunities.find(
    (o) => route === `/espace/opportunites/${o.slug}`,
  );
  if (member || opportunity) {
    const record = member ?? opportunity;
    const title = member
      ? `${member.name} · Profil fictif Arena`
      : `${opportunity.title} · Annonce fictive Arena`;
    const description = member
      ? `${member.role} · ${member.sport} · ${member.city}. Profil de démonstration, sans représentation d’un membre réel.`
      : `${opportunity.intro} Démonstration : aucune offre réelle.`;
    assert.ok(
      html.includes(`<title>${escape(title)}</title>`),
      `${route}: title`,
    );
    for (const field of ['og:title', 'twitter:title'])
      assert.ok(
        html.includes(`${field}" content="${escape(title)}"`),
        `${route}: ${field}`,
      );
    for (const field of ['og:description', 'twitter:description'])
      assert.ok(
        html.includes(`${field}" content="${escape(description)}"`),
        `${route}: ${field}`,
      );
    for (const field of ['og:image', 'twitter:image'])
      assert.ok(
        html.includes(
          `${field}" content="${origin}/images/${record.image}-color.webp"`,
        ),
        `${route}: ${field}`,
      );
    checkedMetadata++;
  }
  console.log('OK', route);
}
for (const route of [
  '/espace/inexistant',
  '/espace/membres/inexistant',
  '/espace/opportunites/inexistant',
])
  assert.equal((await fetch(base + route)).status, 404, route);
for (const query of ['Sarah', 'zzzzzz']) {
  const r = await fetch(`${base}/espace/reseau?q=${query}`);
  assert.equal(r.status, 200);
  const html = await r.text();
  const count = [...html.matchAll(/class="network-member-card"/g)].length;
  assert.equal(count, query === 'Sarah' ? 1 : 0, 'query filter SSR');
}
const message = await fetch(`${base}/espace/messages?avec=horizon-padel`);
assert.equal(message.status, 200);
const source = fs.readFileSync(
  new URL('../components/member-pages.tsx', import.meta.url),
  'utf8',
);
assert.ok(
  source.includes('autoComplete="given-name"') &&
    source.includes('autoComplete="family-name"'),
);
assert.ok(
  !/fetch\(|localStorage|sessionStorage/.test(source),
  'no network mutations or browser persistence',
);
console.log(
  `PASS: ${routes.length} member pages, ${images} image occurrences, ${checkedMetadata} record metadata sets, 3 error routes, filters and internal links.`,
);
