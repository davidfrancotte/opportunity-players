import {chromium} from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {languages,translate} from '../lib/studio/i18n.ts';
import {encodeCard} from '../lib/studio/sharing.ts';
const origin=process.env.PARITY_ORIGIN||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>Object.defineProperty(navigator,'canShare',{value:()=>false,configurable:true}));
 await page.route('**/*',route=>/^(blob:|data:)/.test(route.request().url())||route.request().url().startsWith(origin)?route.continue():route.abort());
 await page.goto(origin+'/espace/accueil',{waitUntil:'networkidle'});await page.locator('.spotlight-card').waitFor();
 assert.equal(await page.locator('.spotlight-card img').count(),1);
 for(const theme of ['light','dark']){await page.evaluate(theme=>document.querySelector('.studio-surface').dataset.theme=theme,theme);await page.screenshot({path:`/tmp/web-parity-growth-feed-${theme}.png`,fullPage:true});}
 await page.locator('.post-card').first().getByRole('button',{name:'Aimer la publication',exact:true}).click();
 await page.locator('.spotlight-rules summary').click();await page.getByRole('button',{name:'Simuler la clôture du mois',exact:true}).click();assert.ok((await page.locator('.spotlight-card').innerText()).includes('1 interactions'));
 await page.locator('.spotlight-open').click();await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Retirer mon j’aime',exact:true}).click();await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();
 await page.getByRole('button',{name:'Revenir au Spotlight',exact:true}).click();assert.ok((await page.locator('.spotlight-card').innerText()).includes('24 interactions'));
 await page.goto(origin+'/espace/medias',{waitUntil:'networkidle'});await page.locator('.media-grid button').filter({visible:true}).first().click();await page.locator('.media-like').click();assert.equal(await page.locator('.media-like').getAttribute('aria-pressed'),'true');await page.locator('.media-like').click();assert.equal(await page.locator('.media-like').getAttribute('aria-pressed'),'false');
 for(const {code} of languages){
  await page.goto(origin+'/espace/parametres');await page.locator('.language-preferences select').selectOption(code);await page.goto(origin+'/espace/profil',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:translate(code,'Mon passeport sportif'),exact:true}).click();await page.locator('.share-card-image').waitFor();
  await page.waitForFunction(()=>document.querySelector('.share-card-image')?.naturalWidth===900);
  const share=page.getByRole('button',{name:translate(code,'Partager la carte'),exact:true});assert.equal(await share.isDisabled(),true);
  await page.locator('.share-consent input').check();assert.equal(await share.isEnabled(),true);
  for(const width of [320,390,900,1440]){await page.setViewportSize({width,height:844});assert.equal(await page.getByRole('dialog').evaluate(dialog=>dialog.scrollWidth<=dialog.clientWidth+1),true,code+' overflow');}
  if(code==='fr'){
   await page.screenshot({path:'/tmp/web-parity-growth-passport.png',fullPage:true});
   const downloaded=page.waitForEvent('download');await share.click();const download=await downloaded;await download.saveAs('/tmp/web-parity-growth-card.png');const png=await fs.readFile('/tmp/web-parity-growth-card.png');assert.equal(png.subarray(1,4).toString(),'PNG');
  }
  await page.getByRole('button',{name:translate(code,'Aperçu invité'),exact:true}).click();await page.locator('.guest-card').waitFor();console.log('PASS passport',code);
 }
 await page.goto(origin+'/espace/parametres');await page.locator('.language-preferences select').selectOption('fr');
 await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Accepter',exact:true}).first().click();
 await page.locator('a[href="/espace/jouer"]').filter({visible:true}).first().click();await page.locator('a[href="/espace/organiser"]').filter({visible:true}).first().click();
 await page.locator('[name="match-title"]').fill('Un padel entre amis');await page.locator('[name="venue"]').fill('Lieu privé de test');await page.getByRole('button',{name:'Continuer',exact:true}).click();
 const date=new Date(Date.now()+7*86400000).toISOString().slice(0,10);await page.locator('input[type="date"]').first().fill(date);await page.locator('input[type="time"]').first().fill('18:00');await page.getByRole('button',{name:'Continuer',exact:true}).click();
 await page.getByLabel('Léa Moreau',{exact:false}).check();await page.getByRole('button',{name:'Créer et inviter',exact:true}).click();await page.waitForURL('**/espace/match?**');
 await page.getByRole('button',{name:'Partager l’invitation',exact:true}).click();await page.locator('.share-card-image').waitFor();await page.getByRole('button',{name:'Aperçu invité',exact:true}).click();
 assert.ok(!(await page.locator('.guest-card').innerText()).includes('Lieu privé'));await page.getByRole('button',{name:'Je souhaite participer',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Demande simulée',exact:true}).isDisabled(),true);await page.screenshot({path:'/tmp/web-parity-growth-match-share.png',fullPage:true});
 const payload=encodeCard({kind:'match',title:'Invitation test',subtitle:'Alex',sport:'Padel',city:'Liège',image:'/studio-images/coach.webp',date:new Date(Date.now()+86400000).toISOString()});
 await page.goto(origin+'/espace/invitation#'+payload);await page.getByRole('heading',{name:'Invitation test'}).waitFor();await page.getByRole('link',{name:'Télécharger l’app',exact:true}).click();await page.getByText('La démo n’est pas encore disponible sur l’App Store. Installation de test via Xcode uniquement.',{exact:true}).waitFor();
 assert.deepEqual(errors,[]);console.log('PASS growth: spotlight, likes, month simulation, card PNG export, nine languages, two widths, guest preview, host invitation, download fallback.');
}finally{await browser.close();}
