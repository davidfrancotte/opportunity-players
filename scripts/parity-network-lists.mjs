import {chromium} from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {languages,translate} from '../lib/studio/i18n.ts';
const origin=process.env.PARITY_ORIGIN||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});
 const cards=page.locator('.network-count-cards > button');
 assert.deepEqual(await cards.locator('strong').allTextContents(),['0','1']);
 await cards.first().click();await page.getByText('Aucune connexion acceptée pour le moment.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();
 await page.getByRole('button',{name:'Accepter',exact:true}).first().click();assert.deepEqual(await cards.locator('strong').allTextContents(),['1','2']);
 await cards.first().click();assert.equal(await page.locator('.network-contact').count(),1);
 await page.locator('.network-directory input').fill('zzzz');assert.equal(await page.locator('.network-contact').count(),0);
 await page.locator('.network-directory input').fill('Moreau');await page.locator('.network-contact-profile').click();await page.getByRole('dialog').waitFor();
 await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();assert.equal(await page.locator('.network-directory input').inputValue(),'Moreau');
 await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();await cards.nth(1).click();
 await page.locator('.network-contact-profile').filter({hasText:'Horizon Padel'}).click();await page.getByRole('button',{name:'Ne plus suivre',exact:true}).click();await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();assert.equal(await page.locator('.network-contact').count(),1);
 await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();assert.deepEqual(await cards.locator('strong').allTextContents(),['1','1']);
 for(const {code} of languages){
  await page.goto(origin+'/espace/parametres');await page.locator('.language-preferences select').selectOption(code);await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:translate(code,'Mon réseau'),exact:true}).waitFor();
  for(const theme of ['dark','light'])for(const width of [320,390,900,1440]){
   await page.setViewportSize({width,height:844});await page.evaluate(theme=>document.querySelector('.studio-surface').dataset.theme=theme,theme);
   assert.equal(await page.locator('.op-brand-mark img:visible').count(),1);
   assert.ok((await page.locator('.op-brand-mark img:visible').getAttribute('src')).includes(theme));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,code+' '+theme+' overflow');
   if(code==='fr'&&width===390)await page.screenshot({path:`/tmp/web-parity-network-${theme}.png`,fullPage:true});
   await cards.first().click();await page.getByRole('heading',{name:translate(code,'Mes connexions')+'.',exact:true}).waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,code+' directory overflow');
   await page.getByRole('button',{name:translate(code,'Retour aux membres'),exact:true}).click();
  }
  console.log('PASS network',code);
 }
 await page.goto(origin+'/espace/jouer',{waitUntil:'networkidle'});assert.equal(await page.getByText('NEW',{exact:true}).count(),0);
 assert.deepEqual(errors,[]);console.log('PASS network lists, counts, search, profiles, unfollow, branding, nine languages, two themes, two widths, no NEW.');
}finally{await browser.close();}
