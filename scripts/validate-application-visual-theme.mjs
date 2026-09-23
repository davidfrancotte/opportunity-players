import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';

const base = process.env.OP_SITE_URL || 'http://localhost:3000';
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
  for (const width of [1440,390]) {
    const page = await browser.newPage({viewport:{width,height:1000}, reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror', error=>errors.push(error.message));
    await page.goto(base + '/application',{waitUntil:'networkidle'});
    const toggle=page.getByRole('switch',{name:'App en mode clair',exact:true});
    const waitForToggle=checked=>page.waitForFunction(value=>document.querySelector('.application-visual-switch')?.getAttribute('aria-checked')===value,checked);
    assert.equal(await toggle.getAttribute('aria-checked'),'false');
    const unchanged=()=>page.evaluate(()=>({
      htmlClass:document.documentElement.className,
      theme:document.documentElement.dataset.theme,
      background:getComputedStyle(document.body).backgroundColor,
      storage:JSON.stringify({...localStorage}),
    }));
    const before=await unchanged();
    const captures=page.locator('img[src*="studio-20260923-current-"]');
    assert.equal(await captures.count(),11);
    assert.equal(await page.locator('main img[src*="studio-20260922-"]').count(),0);
    assert.ok((await captures.evaluateAll(images=>images.map(img=>img.src))).every(src=>!src.endsWith('-light.png')));
    for (const img of await captures.all()) {
      assert.ok(await img.evaluate(async el=>{el.loading='eager';await el.decode();return el.naturalWidth===780 && el.naturalHeight===1688;}));
    }
    await page.locator('.application-hero').screenshot({path:`/tmp/application-dark-toggle-${width}.png`,animations:'disabled'});
    await toggle.click();
    await waitForToggle('true');
    assert.equal(await toggle.getAttribute('aria-checked'),'true');
    for (const img of await captures.all()) {
      assert.match(await img.getAttribute('src'),/-light\.png$/);
      assert.match(await img.getAttribute('alt'),/mode clair/i);
      assert.ok(await img.evaluate(async el=>{el.loading='eager';await el.decode();return el.naturalWidth===780 && el.naturalHeight===1688;}));
    }
    assert.match(await page.locator('.app-phone').getAttribute('aria-label'),/mode clair/);
    assert.deepEqual(await unchanged(),before,'Only preview visuals may change');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.locator('.application-hero').screenshot({path:`/tmp/application-light-toggle-${width}.png`,animations:'disabled'});
    await page.locator('#publier').screenshot({path:`/tmp/application-light-publish-${width}.png`,animations:'disabled'});
    await page.locator('#parametres').screenshot({path:`/tmp/application-settings-${width}.png`,animations:'disabled'});
    // Both keyboard directions work; repeated swaps do not duplicate phone canvases.
    await toggle.focus();
    await page.keyboard.press('Space');
    await waitForToggle('false');
    assert.equal(await toggle.getAttribute('aria-checked'),'false');
    assert.ok((await captures.evaluateAll(images=>images.map(img=>img.src))).every(src=>!src.endsWith('-light.png')));
    await page.keyboard.press('Enter');
    await waitForToggle('true');
    assert.equal(await toggle.getAttribute('aria-checked'),'true');
    assert.ok(await page.locator('.app-phone canvas').count()<=1);
    assert.deepEqual(await unchanged(),before);
    assert.deepEqual(errors,[]);
    await page.goto(base + '/',{waitUntil:'networkidle'});
    assert.equal(await page.locator('img[src$="-light.png"]').count(),0,'Home visuals must not change');
    await page.close();
    console.log(`PASS ${width}px: eleven current visuals, toggle, keyboard, site unchanged, home unchanged.`);
  }
} finally {await browser.close();}
