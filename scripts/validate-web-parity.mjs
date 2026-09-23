import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin=process.env.PARITY_ORIGIN||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[],failedAssets=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('response',response=>{if(response.status()>=400&&response.url().startsWith(origin))failedAssets.push([response.status(),response.url()]);});
const navigate=async route=>{await page.goto(`${origin}/espace/${route}`,{waitUntil:'networkidle'});};
const overflow=async label=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label);
try {
  const screens=await fs.readFile(new URL('../app/espace/[section]/page.tsx',import.meta.url),'utf8');
  const routes=[...screens.slice(screens.indexOf('= {'),screens.indexOf('};')).matchAll(/(?:^|[,{\n])\s*["']?([\w-]+)["']?\s*:/g)].map(match=>match[1]);
  for(const route of routes){
    const response=await page.goto(`${origin}/espace/${route}`,{waitUntil:'networkidle'});
    assert.equal(response.status(),200,route);
    await page.locator('main#main').waitFor();
    await overflow(route);
    assert.equal(await page.locator('.locale-switch').count(),route==='parametres'?1:0,route+': language in settings only');
    const escaped=await page.locator('a[href]').evaluateAll((links,routes)=>links.map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')&&routes.includes(h.slice(1).split(/[/?#]/)[0])),routes);
    assert.deepEqual(escaped,[],route+': all app links stay in /espace');
  }
  console.log('PASS',routes.length,'web routes: render, links, settings language, no horizontal overflow.');

  await navigate('parametres');
  assert.equal(await page.locator('.language-preferences option').count(),9);
  await page.locator('input[name="app-appearance"][value="light"]').check();
  assert.equal(await page.locator('.studio-surface').getAttribute('data-theme'),'light');
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('input[name="app-appearance"][value="light"]').isChecked(),true);
  await page.getByRole('button',{name:'Mode sombre',exact:true}).filter({visible:true}).click();
  assert.equal(await page.locator('input[name="app-appearance"][value="dark"]').isChecked(),true);

  for(const theme of ['dark','light']){
    await navigate('parametres');
    await page.locator(`input[name="app-appearance"][value="${theme}"]`).check();
    for(const route of ['accueil','reseau','opportunities','jouer','agenda','profil','messages','parametres']){
      await navigate(route);
      for(const width of [320,390,900,1440]){
        await page.setViewportSize({width,height:1000});await overflow(`${theme} ${route} ${width}`);
        if(route==='opportunities'){
          const title=await page.locator('.social-title h1').boundingBox(),button=await page.locator('.opportunity-publish-button').boundingBox();
          if(button)assert.ok(button.x>title.x&&Math.abs(button.y-title.y)<60,'publish aligned right of title');
        }
        if(width===1440||width===390)await page.screenshot({path:`/tmp/web-parity-${route}-${theme}-${width}.png`,animations:'disabled'});
      }
    }
  }
  await navigate('messages');
  assert.equal(await page.locator('.web-chat-placeholder').isVisible(),true);
  await page.locator('.web-conversations .conversation-row').first().click();
  assert.equal(await page.locator('.web-conversations').isVisible(),true);
  assert.equal(await page.locator('.conversation-panel').isVisible(),true);
  const left=await page.locator('.web-conversations').boundingBox(),right=await page.locator('.conversation-panel').boundingBox();
  assert.ok(left.x<right.x,'desktop messaging retains two panes');
  await page.locator('#message-text').fill('Réponse fictive de contrôle web');
  await page.getByRole('button',{name:'Ajouter le message à la démo',exact:true}).click();
  await page.locator('.message-log').getByText('Réponse fictive de contrôle web',{exact:true}).waitFor();
  await page.screenshot({path:'/tmp/web-parity-messages-desktop.png'});

  // Client navigation out of the member area must not leak its scoped CSS/theme.
  await page.locator('.web-sidebar-bottom a[href="/"]').click();
  await page.waitForURL(origin+'/');
  assert.equal(await page.locator('.studio-surface').count(),0);
  assert.equal(await page.locator('.site-header').count(),1);
  await overflow('marketing after workspace');
  assert.deepEqual(errors,[]);
  assert.deepEqual(failedAssets,[]);
  console.log('PASS responsive dark/light layouts, persistent settings, desktop messages, isolated marketing, no runtime/asset errors.');
} finally {await browser.close();}
