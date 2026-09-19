// Mechanical import of the approved standalone app. Never modifies its source.
// Usage: node scripts/sync-studio.mjs ../livrables/opportunity-players-app/studio
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
const source = path.resolve(process.argv[2]);
const root = path.resolve(import.meta.dirname, '..');
const routes = [
  'accueil',
  'reseau',
  'messages',
  'opportunities',
  'abonnement',
  'inscription',
  'verification',
  'personnalisation',
  'presentation',
  'connexion',
  'mot-de-passe-oublie',
  'profil',
  'parcours',
  'medias',
  'modifier-profil',
  'parametres',
];
function write(dest, content) {
  const output = path.join(root, dest);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, content);
}
function adapt(code) {
  return code
    .replaceAll('@/lib/model', '@/lib/studio/model')
    .replaceAll('@/lib/social', '@/lib/studio/social')
    .replaceAll('@/lib/pricing', '@/lib/studio/pricing')
    .replaceAll('@/components/ui/', '@/components/studio/ui/')
    .replaceAll('/images/', '/studio-images/')
    .replace(
      'const pathname = usePathname();',
      "const route = usePathname();\n  const pathname = route === '/espace' ? '/espace/accueil' : route;",
    )
    .replace(/(["'`])\/([^"'`\s]*)/g, (match, quote, route) => {
      if (!route) return `${quote}/espace/connexion`;
      if (routes.includes(route.split('?')[0]))
        return `${quote}/espace/${route}`;
      return match;
    });
}
for (const name of fs.readdirSync(path.join(source, 'components'))) {
  if (name.endsWith('.tsx'))
    write(
      `components/studio/${name}`,
      adapt(fs.readFileSync(path.join(source, 'components', name), 'utf8')),
    );
}
for (const name of fs.readdirSync(path.join(source, 'components/ui'))) {
  write(
    `components/studio/ui/${name}`,
    adapt(fs.readFileSync(path.join(source, 'components/ui', name), 'utf8')),
  );
}
for (const name of ['model.ts', 'social.ts', 'pricing.ts']) {
  write(
    `lib/studio/${name}`,
    adapt(fs.readFileSync(path.join(source, 'lib', name), 'utf8')),
  );
}
for (const name of fs.readdirSync(path.join(source, 'public/images'))) {
  write(
    `public/studio-images/${name}`,
    fs.readFileSync(path.join(source, 'public/images', name)),
  );
}
for (const name of ['model', 'social', 'subscription']) {
  write(
    `scripts/studio-${name}.test.mjs`,
    fs
      .readFileSync(path.join(source, 'scripts', `${name}.test.mjs`), 'utf8')
      .replaceAll('../lib/', '../lib/studio/')
      .replaceAll('../components/', '../components/studio/'),
  );
}
// Scope every rule, including portal styles, to the member route. The marketing
// website remains unchanged even when Next retains the CSS after navigation.
const scope = 'body:has(.studio-surface)';
for (const name of ['globals', 'mobile-app', 'social', 'subscription']) {
  const css = postcss.parse(
    fs.readFileSync(path.join(source, 'app', `${name}.css`), 'utf8'),
  );
  css.walkAtRules((rule) => {
    if (['import', 'theme', 'custom-variant'].includes(rule.name))
      rule.remove();
  });
  css.walkRules((rule) => {
    if (rule.parent.type === 'atrule' && rule.parent.name.includes('keyframes'))
      return;
    rule.selectors = rule.selectors.map((selector) => {
      if (selector === ':root' || selector === '.dark') return scope;
      if (/^html(?=\W|$)/.test(selector))
        return selector.replace(/^html/, 'html:has(.studio-surface)');
      if (/^body(?=\W|$)/.test(selector))
        return selector.replace(/^body/, scope);
      return `${scope} ${selector}`;
    });
  });
  write(
    `app/espace/studio-${name}.css`,
    `/* Generated from the approved Arena Studio app; use scripts/sync-studio.mjs. */\n${css}`,
  );
}
console.log(
  'Imported Arena Studio components, styles, demo rules, prices, assets and tests.',
);
