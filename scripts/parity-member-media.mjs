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
 await page.route('**/*',r=>r.request().url().startsWith(origin)||/^(blob:|data:)/.test(r.request().url())?r.continue():r.abort());
 const openMember=async name=>{await page.locator('.member-intro').filter({hasText:name}).first().click();await page.locator('.member-media').waitFor();};
 await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});await openMember('Horizon Padel');
 const gallery=page.locator('.member-media');assert.equal(await gallery.locator('article').count(),2);
 await gallery.getByRole('button',{name:'Aimer la photo',exact:true}).click();assert.equal(await gallery.getByRole('button',{name:'Retirer mon j’aime',exact:true}).innerText(),'25');
 await gallery.locator('.member-media-open').filter({visible:true}).first().click();assert.equal(await gallery.locator('.member-media-viewer img').count(),1);assert.equal(await gallery.locator('.member-media-like').getAttribute('aria-pressed'),'true');
 await gallery.getByRole('button',{name:'Retour à la galerie',exact:true}).click();
 await gallery.getByRole('button',{name:'Aimer la vidéo',exact:true}).click();await gallery.locator('.member-media-open').nth(1).click();
 await page.waitForFunction(()=>document.querySelector('.member-media video')?.readyState>=2);
 const video=gallery.locator('video');assert.equal(await video.getAttribute('playsinline'),'');await video.evaluate(v=>v.play());await page.waitForFunction(()=>document.querySelector('.member-media video')?.currentTime>0.1);
 await gallery.locator('.member-media-like').click();assert.equal(await gallery.locator('.member-media-like').getAttribute('aria-pressed'),'false');
 await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();assert.equal(await page.locator('.member-media video').count(),0);
 await openMember('Horizon Padel');assert.equal(await gallery.locator('.member-media-like').first().getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();await page.locator('a[href="/espace/accueil"]').filter({visible:true}).first().click();
 const postLike=page.locator('.post-card').first().getByRole('button',{name:'Retirer mon j’aime',exact:true});assert.equal(await postLike.innerText(),'25');await postLike.click();
 await page.locator('a[href="/espace/reseau"]').filter({visible:true}).first().click();await openMember('Horizon Padel');assert.equal(await gallery.locator('.member-media-like').first().getAttribute('aria-pressed'),'false');
 await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();await openMember('Camille Roy');await page.getByText('Aucun média partagé pour le moment.',{exact:true}).waitFor();
 for(const {code} of languages){
  await page.goto(origin+'/espace/parametres');await page.locator('.language-preferences select').selectOption(code);await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});await openMember('Horizon Padel');
  await gallery.getByRole('heading',{name:translate(code,'Photos et vidéos'),exact:true}).waitFor();
  for(const theme of ['dark','light'])for(const width of [320,390,900,1440]){
   await page.setViewportSize({width,height:844});await page.evaluate(theme=>document.querySelector('.studio-surface').dataset.theme=theme,theme);await gallery.scrollIntoViewIfNeeded();
   if(!await page.getByRole('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1)){
    console.log(await page.getByRole('dialog').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,nodes:[...el.querySelectorAll('*')].filter(n=>n.getBoundingClientRect().right>el.getBoundingClientRect().right).map(n=>[n.tagName,n.className,n.getBoundingClientRect().width])})));
    await page.screenshot({path:'/tmp/member-media-overflow.png'});
   }
   assert.ok(await page.getByRole('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1),code+' '+theme);
   if(code==='fr'&&width===390)await page.getByRole('dialog').screenshot({path:`/tmp/web-parity-member-media-${theme}.png`});
   await gallery.locator('.member-media-open').nth(1).click();assert.ok(await page.getByRole('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   await gallery.getByRole('button',{name:translate(code,'Retour à la galerie'),exact:true}).click();
  }
  console.log('PASS member gallery',code);
 }
 assert.deepEqual(errors,[]);console.log('PASS gallery: photos, playable offline video, reversible synchronized likes, empty state, nine languages, two themes and widths.');
}finally{await browser.close();}
