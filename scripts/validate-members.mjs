import assert from 'node:assert/strict';
import fs from 'node:fs';
import { demoMembers, demoOpportunities } from '../lib/member-data.ts';
const base = process.argv[2] || 'http://localhost:3000';
const screens = [
  'accueil',
  'reseau',
  'messages',
  'opportunities',
  'profil',
  'parcours',
  'medias',
  'modifier-profil',
  'parametres',
  'abonnement',
  'connexion',
  'inscription',
  'verification',
  'personnalisation',
  'presentation',
  'mot-de-passe-oublie',
];
const social = screens.slice(0, 10);
for (const screen of screens) {
  const r = await fetch(base + '/espace/' + screen);
  assert.equal(r.status, 200, screen);
  const html = await r.text();
  assert.ok(html.includes('studio-surface'), screen + ': scoped Studio shell');
  assert.ok(html.includes('id="main"'), screen + ': main landmark');
  assert.ok(
    !html.includes('class="mobile-app-frame"'),
    screen + ': not a phone embed',
  );
  assert.ok(
    !html.includes('<header class="site-header"'),
    screen + ': no marketing header',
  );
  assert.ok(html.includes('aucun paiement'), screen + ': demo disclosure');
  if (social.includes(screen)) {
    assert.ok(
      html.includes('Navigation de l’espace membre web'),
      screen + ': desktop sidebar',
    );
    assert.ok(
      html.includes('Navigation de l’application'),
      screen + ': bottom nav',
    );
    for (const dest of [
      'accueil',
      'reseau',
      'messages',
      'opportunities',
      'profil',
    ])
      assert.ok(
        html.includes('href="/espace/' + dest + '"'),
        screen + ': ' + dest,
      );
  }
  if (screen === 'accueil') assert.ok(html.includes('web-context-rail'));
  if (screen === 'messages') {
    assert.ok(html.includes('web-messaging'));
    assert.ok(html.includes('Vos conversations'));
    assert.ok(html.includes('web-chat-placeholder'));
  }
  if (screen === 'connexion') {
    assert.ok(html.includes('Entrer dans l’espace web démo'));
    assert.ok(!html.includes('web-sidebar'));
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    assert.ok(
      ![
        '/accueil',
        '/reseau',
        '/messages',
        '/profil',
        '/abonnement',
        '/inscription',
      ].includes(match[1]),
      screen + ': no standalone app route escape',
    );
  }
  console.log('OK /espace/' + screen);
}
for (const route of [
  '/espace',
  '/connexion',
  '/espace/opportunites',
  '/espace/notifications',
  ...demoMembers.map((m) => '/espace/membres/' + m.slug),
  ...demoOpportunities.map((o) => '/espace/opportunites/' + o.slug),
]) {
  assert.equal(
    (await fetch(base + route)).status,
    200,
    route + ': legacy link resolves',
  );
}
assert.equal((await fetch(base + '/espace/inconnu')).status, 404);
const app = await (await fetch(base + '/application')).text();
assert.ok(app.includes('Tout votre sport.'));
for (const screen of [
  'accueil',
  'reseau',
  'messages',
  'opportunities',
  'profil',
]) {
  assert.ok(app.includes('id="' + screen + '"'));
  const file = '/app-visuals/studio-' + screen + '.png';
  assert.ok(app.includes(file));
  const r = await fetch(base + file);
  assert.equal(r.status, 200);
  const image = Buffer.from(await r.arrayBuffer());
  assert.equal(image.readUInt32BE(16), 780);
  assert.equal(image.readUInt32BE(20), 1688);
}
for (const role of ['Sportifs', 'Professionnels', 'Collectifs'])
  assert.ok(app.includes(role));
const home = await (await fetch(base + '/')).text();
assert.ok(home.includes('/app-visuals/studio-accueil.png'));
assert.ok(home.includes('Explorer l’application'));
assert.ok(home.includes('href="/espace/connexion"'));
assert.ok(!home.includes('Démo de l’app'));
assert.ok(!home.includes('Explorer la démo web Arena'));
const pricing = await (await fetch(base + '/tarifs')).text();
for (const price of ['2,99 €', '14,99 €', '29,99 €'])
  assert.ok(pricing.includes(price), price);
assert.ok(!pricing.includes('19,99 €'));
assert.ok(!pricing.includes('mensuelle ou annuelle'));
assert.ok(pricing.includes('5 messages'));
assert.ok(pricing.includes('Pas de création de publications'));
assert.ok(pricing.includes('Pas de réception de messages ni de commentaires'));
for (const name of ['model', 'social', 'pricing'])
  assert.ok(
    fs.existsSync(new URL('../lib/studio/' + name + '.ts', import.meta.url)),
  );
console.log(
  'PASS: 16 Studio routes, legacy redirects, 5 real screen assets, homepage links, feature benefits and approved pricing.',
);
