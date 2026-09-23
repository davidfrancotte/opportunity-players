import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.OP_SITE_URL||'http://localhost:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[]; page.on('pageerror', e=>errors.push(e.message));
try {
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    for (const route of ['/','/application','/plateforme']) {
      await page.goto(base+route,{waitUntil:'networkidle'});
      await page.addStyleTag({content:'nextjs-portal {display:none!important}'});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1), `${route} at ${width}`);
      await page.screenshot({path:`/tmp/arena-final-${route.replaceAll('/','')||'home'}-${width}.png`,animations:'disabled'});
      const captures=page.locator(route==='/application'?'img[src*="studio-20260923-current-"]':'img[src*="20260922"]');
      assert.ok(await captures.count()>0, `updated captures on ${route}`);
      for (const capture of await captures.all()) {
        await capture.scrollIntoViewIfNeeded();
        assert.ok(await capture.evaluate(async img=>{try{img.loading='eager';await img.decode();return img.naturalWidth>0;}catch{return false;}}), `${route} ${width} ${await capture.getAttribute('src')}`);
      }
      if (route==='/application') {
        assert.equal(await page.locator('#publier').count(),1);
        assert.equal(await page.locator('#agenda').count(),1);
        assert.equal(await page.locator('#rendez-vous').count(),0);
        assert.deepEqual(await page.locator('.application-index a').evaluateAll(links=>links.map(link=>link.getAttribute('href'))),['#accueil','#reseau','#messages','#opportunities','#profil']);
        assert.equal(await page.locator('#candidatures,#recrutement,#securite,#parrainage').count(),0);
        assert.equal(await page.locator('#jouer,#medias').count(),2);
        assert.equal(await page.locator('.application-feature').count(),10);
        assert.equal(await page.locator('.application-feature img[src*="-current-"]').count(),10);
        assert.match(await page.locator('#opportunities').innerText(),/treize catégories/);
        assert.match(await page.locator('#reseau').innerText(),/secteur ou métier/);
        assert.equal(await page.locator('#publier .text-link').getAttribute('href'),'/espace/accueil');
        for(const link of await page.locator('.application-index a').all()) {
          await link.click();
          const target=await link.getAttribute('href');
          assert.equal(await page.locator(target).count(),1);
        }
        await page.locator('#publier').screenshot({path:`/tmp/arena-publish-section-${width}.png`,animations:'disabled'});
        await page.locator('#opportunities').screenshot({path:`/tmp/arena-current-opportunities-${width}.png`,animations:'disabled'});
        await page.locator('#medias').screenshot({path:`/tmp/arena-current-medias-${width}.png`,animations:'disabled'});
      }
      if (route==='/') {
        for (const label of ['04 / Ma communauté','05 / Opportunités','06 / Agenda']) {
          const tab=page.getByRole('tab',{name:label,exact:true});
          await tab.click();
          await page.waitForFunction(text=>[...document.querySelectorAll('[role="tab"]')].some(tab=>tab.textContent===text&&tab.getAttribute('aria-selected')==='true'),label);
          await page.waitForFunction(()=>document.querySelectorAll('[role="tabpanel"]').length===1);
          assert.ok(await page.locator('[role="tabpanel"] img').evaluate(async img=>{await img.decode();return img.naturalWidth>0;}));
        }
        await page.locator('.web-workspace-preview').screenshot({path:`/tmp/arena-home-workspace-${width}.png`,animations:'disabled'});
      }
    }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: updated application, home and platform visuals; all captures load; tabs, copy and responsive layouts.');
} finally {await browser.close();}
