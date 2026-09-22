// Reviewed migration of the September app changes, preserving desktop-specific UI.
// Does not touch the standalone app or the retired Sites checkout.
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
const root = path.resolve(import.meta.dirname, '..');
if (fs.existsSync(path.join(root, 'components/studio/agenda-screen.tsx'))) {
  throw new Error('September migration already applied. Merge later app changes selectively; preserve reviewed web adaptations.');
}
const source = path.resolve(root, '../opportunity-players-app/studio');
const read = p => fs.readFileSync(p, 'utf8');
const write = (p, content) => fs.writeFileSync(path.join(root, p), content);
const routes = ['accueil','reseau','messages','opportunities','abonnement','inscription','verification','personnalisation','presentation','connexion','mot-de-passe-oublie','profil','parcours','medias','modifier-profil','parametres','jouer','organiser','match','agenda','notifications','outils','recherches','publications-programmees','talents','essais-groupes','equipes','calendrier-avance','statistiques','candidatures','recrutement','rendez-vous','dossier-sportif','disciplines','agent','documents','securite','parrainage','confidentialite','double-facteur'];
function adapt(code) {
  return code.replaceAll('@/lib/', '@/lib/studio/')
    .replaceAll('@/components/', '@/components/studio/')
    .replaceAll('/images/', '/studio-images/')
    .replace(/(["'`])\/([^"'`\s]*)/g, (match, quote, route) => {
      if (!route) return `${quote}/espace/connexion`;
      return routes.includes(route.split(/[?#]/)[0]) ? `${quote}/espace/${route}` : match;
    })
    .replaceAll('retour=/', 'retour=/espace/');
}
function between(text, start, end) {
  const from = text.indexOf(start), to = text.indexOf(end, from);
  if (from < 0 || to < 0) throw new Error(`Missing preserved block: ${start}`);
  return text.slice(from, to);
}
const webSocial = read(path.join(root, 'components/studio/social-screens.tsx'));
const webProfile = read(path.join(root, 'components/studio/profile-screens.tsx'));
const messages = between(webSocial, 'export function MessagesPage()', 'export function OpportunitiesPage()');
const profileLayout = between(webProfile, 'export function ProfileLayout(', 'export function Modal(');
const components = ['social-screens','profile-screens','demo-provider','subscription-screen','subscription-ui','event-navigation','play-screens','career-screens','extension-screens','studio-screen','agenda-screen','agenda-requests','connection-controls','post-excerpt','media-upload','post-attachment'];
for (const name of components) {
  let code = adapt(read(path.join(source, 'components', `${name}.tsx`)));
  if (name === 'social-screens') code = code.replace(between(code, 'export function MessagesPage()', 'export function OpportunitiesPage()'), messages);
  if (name === 'profile-screens') {
    code = code.replace(between(code, 'export function ProfileLayout(', 'export function Modal('), profileLayout);
    code = code.replace('const pathname = usePathname();', 'const route = usePathname();\n  const pathname = route === "/espace" ? "/espace/accueil" : route;');
  }
  write(`components/studio/${name}.tsx`, code);
}
// Shared business rules. Keep the web locale and shell, which own appearance and storage.
for (const name of ['agenda','athlete','career','community','directory','entitlements','events','extensions','model','pricing','social','sport-profile','translations','trust']) {
  write(`lib/studio/${name}.ts`, adapt(read(path.join(source, 'lib', `${name}.ts`))));
}
write('lib/studio/offer-catalog.json', read(path.join(source,'lib/offer-catalog.json')));
for (const name of ['globals','mobile-app','social','subscription','events','trust','sport-profile','career','extensions','community','agenda']) {
  const css = postcss.parse(read(path.join(source, 'app', `${name}.css`)));
  const scope = 'body:has(.studio-surface)';
  css.walkAtRules(rule => { if (['import','theme','custom-variant'].includes(rule.name)) rule.remove(); });
  css.walkRules(rule => {
    if (rule.parent.type === 'atrule' && rule.parent.name.includes('keyframes')) return;
    rule.selectors = rule.selectors.map(selector => {
      if (selector === ':root' || selector === '.dark') return scope;
      if (/^html(?=\W|$)/.test(selector)) return selector.replace(/^html/,'html:has(.studio-surface)');
      if (/^body(?=\W|$)/.test(selector)) return selector.replace(/^body/,scope);
      return `${scope} ${selector}`;
    });
  });
  write(`app/espace/studio-${name}.css`, `/* App rules scoped to the web workspace; desktop adaptations remain separate. */\n${css}`);
}
for (const name of ['model','social','subscription','events','trust','directory','sport-profile','career','community','agenda','connections']) {
  write(`scripts/studio-${name}.test.mjs`, adapt(read(path.join(source,'scripts',`${name}.test.mjs`))).replaceAll('../lib/', '../lib/studio/'));
}
console.log('Aligned shared features; desktop messaging, shell, theme, authentication and profile layout preserved.');
