// Reuse the current app's interaction tests against the real Next web workspace.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
for(const name of ['opportunity-publishing','growth','network-lists','member-media']){
  let code=fs.readFileSync(path.resolve(root,'../opportunity-players-app/studio/scripts',`validate-${name}.mjs`),'utf8');
  code=code.slice(0,code.indexOf('const root='))+"const origin=process.env.PARITY_ORIGIN||'http://127.0.0.1:3000';\n"+code.slice(code.indexOf('const browser='));
  code=code.replaceAll('../lib/','../lib/studio/').replaceAll('/images/','/studio-images/');
  code=code.replace(/\/(accueil|reseau|parametres|profil|modifier-profil|abonnement|medias|jouer|organiser|match|invitation|telecharger|opportunities)\//g,'/espace/$1');
  code=code.replaceAll('**/espace/match**','**/espace/match?**');
  code=code.replaceAll('document.documentElement.dataset.theme',"document.querySelector('.studio-surface').dataset.theme");
  code=code.replaceAll(".bottom-nav a[href=\"/${route}/\"]","a[href=\"/espace/${route}\"]:visible").replaceAll('**/${route}/','**/espace/${route}');
  code=code.replaceAll('`).click();await page.waitForURL', '`).first().click();await page.waitForURL');
  code=code.replaceAll('await new Promise(resolve=>server.close(resolve));','').replaceAll('server.close();','');
  code=code.replaceAll('/tmp/op-','/tmp/web-parity-');
  code=code.replaceAll('.brand-logo:visible','.op-brand-mark img:visible');
  code=code.replaceAll('[320,390]','[320,390,900,1440]').replaceAll('[360,390]','[360,390,900,1440]');
  // A desktop sidebar is present but hidden on small viewports.
  code=code.replaceAll("').first().click()","').filter({visible:true}).first().click()");
  fs.writeFileSync(path.join(root,'scripts',`parity-${name}.mjs`),code);
}
