import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import path from 'node:path';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const output = path.resolve('public/app-visuals');
const errors = [];
async function capture(page, url, name) {
  await page.goto(url, {waitUntil:'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({content:'nextjs-portal { display: none !important; }'});
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0,0); });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow: ${url}`);
  await page.screenshot({path:path.join(output,name+'.png'), animations:'disabled'});
}
try {
  const mobile = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
  const web = await browser.newPage({viewport:{width:1440,height:1000}});
  for (const page of [mobile,web]) page.on('pageerror',e => errors.push(e.message));
  await web.addInitScript(() => localStorage.setItem('op-web-appearance','light'));
  for (const route of ['accueil','reseau','messages','opportunities','candidatures','recrutement','agenda','profil','securite','parrainage','medias','jouer']) {
    await capture(mobile,'http://127.0.0.1:3002/'+route,'studio-20260922-'+route);
  }
  await mobile.goto('http://127.0.0.1:3002/accueil',{waitUntil:'networkidle'});
  await mobile.locator('.compose-launch').click();
  await mobile.getByLabel('Votre publication',{exact:true}).fill('Une belle séance avec la communauté. Rendez-vous sur le terrain !');
  await mobile.getByLabel('Votre publication',{exact:true}).blur();
  await mobile.screenshot({path:path.join(output,'studio-20260922-publier.png'),animations:'disabled'});
  await mobile.getByLabel('Fermer la fenêtre').click();
  for (const route of ['accueil','reseau','messages','opportunities','agenda','profil']) {
    await capture(web,'http://127.0.0.1:3000/espace/'+route,'web-20260922-'+route);
    if (route==='reseau') {
      await web.getByRole('button',{name:'Affiner la recherche',exact:true}).click();
      assert.equal(await web.getByLabel('Filtrer par pays').isDisabled(),true);
      await web.screenshot({path:path.join(output,'web-20260922-reseau.png'),animations:'disabled'});
    }
    if (route==='messages') {
      await web.locator('.conversation-list button').first().click();
      await web.screenshot({path:path.join(output,'web-20260922-messages.png'),animations:'disabled'});
      assert.equal(await web.locator('.web-conversations').isVisible(),true);
      assert.equal(await web.locator('.conversation-panel').isVisible(),true);
    }
  }
  await web.goto('http://127.0.0.1:3000/espace/accueil',{waitUntil:'networkidle'});
  await web.locator('.compose-launch').click();
  assert.equal(await web.getByLabel('Discipline',{exact:true}).inputValue(),'-');
  assert.equal(await web.getByLabel('Programmer cette publication').isDisabled(),true);
  await web.getByLabel('Importer une photo ou une vidéo',{exact:true}).setInputFiles('public/studio-images/tennis-color.webp');
  await web.getByAltText('Aperçu de la photo à publier').waitFor();
  await web.getByRole('dialog').screenshot({path:path.join(output,'web-20260922-publier.png'),animations:'disabled'});
  await web.getByLabel('Fermer la fenêtre').click();
  await web.getByRole('dialog').waitFor({state:'hidden'});
  for (const theme of ['sombre','clair']) {
    await web.getByRole('button',{name:'Thème '+theme,exact:true}).filter({visible:true}).click();
    for (const width of [1440,900,390]) {
      await web.setViewportSize({width,height:1000});
      assert.ok(await web.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1));
      await web.screenshot({path:`/tmp/arena-updated-${theme}-${width}.png`,animations:'disabled'});
    }
    await web.setViewportSize({width:1440,height:1000});
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: actual mobile/web captures, advanced free gate, desktop messaging, media/default discipline, light/dark responsive widths.');
} finally {await browser.close();}
