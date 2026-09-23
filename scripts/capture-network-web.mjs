import {chromium} from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.OP_SITE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{localStorage.setItem('op-web-appearance','light');localStorage.setItem('op-language','fr');});
 async function shot(id){
  await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
  await page.addStyleTag({content:'nextjs-portal{display:none!important}'});await page.evaluate(()=>document.activeElement?.blur());
  await page.screenshot({path:`public/app-visuals/web-20260923-network-${id}.png`,animations:'disabled'});
 }
 for(const route of ['profil','reseau','messages','accueil','opportunities','agenda']){
  await page.goto(`${base}/espace/${route}`,{waitUntil:'networkidle'});
  if(route==='reseau'){
   const cards=page.locator('.network-count-cards > button');assert.deepEqual(await cards.locator('strong').allTextContents(),['0','1']);
   await page.getByRole('button',{name:'Accepter',exact:true}).first().click();assert.deepEqual(await cards.locator('strong').allTextContents(),['1','2']);
   await shot('reseau');await cards.first().click();await page.locator('.network-contact-profile').waitFor();
   await page.locator('.network-directory input').fill('zzzz');assert.equal(await page.locator('.network-contact').count(),0);
   await page.locator('.network-directory input').fill('Moreau');assert.equal(await page.locator('.network-contact').count(),1);
   await page.locator('.network-contact-profile').click();await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();
   await page.locator('.network-directory input').fill('');await shot('connexions');
   await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();await cards.nth(1).click();
   await page.locator('.network-contact-profile').filter({hasText:'Horizon Padel'}).click();await page.getByRole('button',{name:'Ne plus suivre',exact:true}).click();await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();assert.equal(await page.locator('.network-contact').count(),1);
   await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();assert.deepEqual(await cards.locator('strong').allTextContents(),['1','1']);
   for(const theme of ['sombre','clair']){
    await page.getByRole('button',{name:'Thème '+theme,exact:true}).filter({visible:true}).click();
    for(const width of [1440,768,390,320]){
     await page.setViewportSize({width,height:1000});
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Network ${theme} ${width}`);
     const logos=page.locator('.brand:visible .op-brand-mark img:visible');assert.ok(await logos.count()>0);
     for(const logo of await logos.all())assert.match(await logo.getAttribute('src'),new RegExp(theme==='clair'?'light':'dark'));
     await page.screenshot({path:`/tmp/op-web-network-${theme}-${width}.png`});
     await cards.first().click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.getByRole('button',{name:'Retour aux membres',exact:true}).click();
    }
    await page.setViewportSize({width:1440,height:1000});
   }
   continue;
  }
  if(route==='messages')await page.locator('.conversation-list button').first().click();
  await shot(route);
 }
 await page.goto(base+'/espace/jouer',{waitUntil:'networkidle'});assert.equal(await page.getByText('NEW',{exact:true}).count(),0);
 await page.goto(base+'/espace/reseau',{waitUntil:'networkidle'});
 await page.getByRole('combobox',{name:'Langue / Language',exact:true}).filter({visible:true}).first().selectOption('en');
 await page.getByRole('heading',{name:'My network',exact:true}).waitFor();await page.locator('.network-count-cards > button').first().click();await page.getByRole('button',{name:'Back to members',exact:true}).waitFor();
 assert.deepEqual(errors,[]);console.log('PASS web network: counts, search, profiles, unfollow, two themes, four widths, FR/EN, new logo, no NEW. Six web captures regenerated.');
}finally{await browser.close();}
