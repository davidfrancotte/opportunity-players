import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';

// Capture actual interactive states, not just the top of each legacy route.
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
const light = process.argv.includes('--light');
await page.addInitScript(theme => localStorage.setItem('op-mobile-appearance', theme), light ? 'light' : 'dark');
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
const root='http://127.0.0.1:3002';
const nav=async route=>{
  await page.locator(`a[href="/${route}"]`).filter({visible:true}).first().press('Enter');
  await page.waitForURL(`**/${route}`);
};
async function shot(id, selector) {
  await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'nextjs-portal {display:none!important}'});
  if(selector) await page.locator(selector).first().evaluate(el=>scrollTo(0, Math.max(0,el.getBoundingClientRect().top+scrollY-(document.querySelector('.app-header')?.getBoundingClientRect().height||76)-16)));
  else await page.evaluate(()=>scrollTo(0,0));
  await page.evaluate(()=>document.activeElement?.blur());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id);
  assert.equal(await page.locator('html').getAttribute('data-theme'), light ? 'light' : 'dark');
  await page.screenshot({path:`public/app-visuals/studio-20260922-current-${id}${light ? '-light' : ''}.png`,animations:'disabled'});
}
try {
  await page.goto(root+'/reseau',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Affiner la recherche',exact:true}).click();
  assert.equal(await page.getByLabel('Filtrer par pays').isDisabled(),true);
  await shot('reseau','.network-sections');

  await nav('accueil');
  await page.locator('.compose-launch').click();
  assert.equal(await page.getByLabel('Discipline',{exact:true}).inputValue(),'-');
  assert.equal(await page.getByLabel('Programmer cette publication').isDisabled(),true);
  await page.getByLabel('Votre publication',{exact:true}).fill('Une belle séance avec la communauté. Rendez-vous sur le terrain !');
  await page.getByLabel('Importer une photo ou une vidéo',{exact:true}).setInputFiles('public/studio-images/tennis-color.webp');
  await page.getByAltText('Aperçu de la photo à publier').waitFor();
  await page.getByLabel('Discipline',{exact:true}).evaluate(el=>{
    const dialog=el.closest('[role="dialog"]');
    dialog.scrollTop += el.getBoundingClientRect().top-dialog.getBoundingClientRect().top-60;
  });
  await shot('publier');
  await page.getByLabel('Fermer la fenêtre').click();

  await page.goto(root+'/abonnement',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Essayer Premium dans la démo',exact:true}).click();
  await page.getByRole('button',{name:'Activer Premium dans la démo',exact:true}).click();
  await page.getByRole('dialog').waitFor({state:'hidden'});
  // Close feedback through the actual control before taking screenshots.
  const closeToast=page.getByRole('button',{name:'Fermer la notification',exact:true});
  if(await closeToast.count()) await closeToast.click();
  await nav('accueil');
  await page.getByRole('button',{name:'Filtrer le fil',exact:true}).click();
  await shot('accueil','.community-heading');
  await nav('reseau');
  await page.locator('.network-sections a[href="/jouer"]').click();
  await page.getByRole('button',{name:'À proximité',exact:true}).click();
  assert.equal(await page.locator('.nearby-alerts').count(),1);
  await shot('jouer','.network-sections');
  await page.locator('.network-sections a[href="/agenda"]').click();
  await shot('agenda','.network-sections');
  await nav('messages');
  await page.locator('.conversation-list button').first().click();
  await shot('messages');
  await nav('opportunities');
  assert.equal(await page.locator('.career-nav').count(),0);
  const types=page.getByRole('group',{name:'Types d’opportunités'});
  assert.deepEqual(await types.getByRole('button').allTextContents(),['Toutes','Coaching','Recrutement','Partenariat','Sponsoring','Essais groupés']);
  await types.getByRole('button',{name:'Essais groupés',exact:true}).click();
  await shot('opportunities','h1');
  await nav('profil');
  await shot('profil','h1');
  await page.locator('a[href="/medias"]').filter({visible:true}).first().click();
  await shot('medias','h1');
  assert.deepEqual(errors,[]);
  console.log('PASS: nine actual current app states captured, including free gates, upload, Premium filters and unified agenda.');
} finally {await browser.close();}
