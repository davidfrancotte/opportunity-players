import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const source=path.resolve(root,'../opportunity-players-app/studio/scripts');
for (const name of ['community','connections','agenda','agenda-requests','post-upload','feed-posts','premium-promotions','media-upload','opportunities']) {
  let code=fs.readFileSync(path.join(source,`check-${name}-browser.mjs`),'utf8');
  code=code.replaceAll('http://127.0.0.1:3002/', 'http://127.0.0.1:3000/espace/')
    .replaceAll('public/images/', 'public/studio-images/')
    .replaceAll('/tmp/op-', '/tmp/web-parity-')
    .replace(/(["'`])\/(accueil|reseau|messages|opportunities|abonnement|profil|medias|jouer|organiser|agenda|match|rendez-vous|candidatures|recrutement|parametres)(?=[?"'`])/g,'$1/espace/$2');
  // Browser fixtures are text checks, never app navigation: ensure expected hrefs match.
  code=code.replaceAll('retour=/', 'retour=/espace/')
    .replaceAll('getByLabel("Langue / Language")', 'getByLabel("Langue / Language").filter({ visible: true })')
    .replaceAll('locator(`.bottom-nav a[href="${href}"]`)', 'locator(`a[href="${href}"]`).filter({visible:true}).first()')
    .replaceAll("locator('a[href=\"/espace/parametres\"]').first()", "locator('a[href=\"/espace/parametres\"]').filter({visible:true}).first()");
  fs.writeFileSync(path.join(root,'scripts',`parity-${name}.mjs`),code);
}
