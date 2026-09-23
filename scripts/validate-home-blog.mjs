import {chromium} from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base=process.env.OP_SITE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.site-header nav a[href="/blog"], .site-header nav a[href="/faq"]').count(),0);
  for(const href of ['/blog','/faq'])assert.equal(await page.locator(`.footer a[href="${href}"]`).count(),1);
  const blog=page.locator('#blog');assert.equal(await blog.locator('article').count(),4);
  assert.equal(await blog.evaluate(el=>el.previousElementSibling.classList.contains('faq-section')),true);
  for(const img of await blog.locator('img').all())assert.ok(await img.evaluate(async el=>{el.loading='eager';await el.decode();return el.naturalWidth>0;}));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await blog.screenshot({path:`/tmp/op-home-blog-${width}.png`,animations:'disabled'});
  for(const link of await blog.locator('article a').all())assert.equal((await page.request.get(base+await link.getAttribute('href'))).status(),200);
  await blog.getByRole('link',{name:'Voir plus d’articles',exact:true}).click();await page.waitForURL('**/blog');
  if(width<=768){
   await page.getByRole('button',{name:'Ouvrir le menu',exact:true}).click();
   const nav=page.getByRole('navigation',{name:'Navigation mobile',exact:true});
   assert.equal(await nav.locator('a[href="/blog"],a[href="/faq"]').count(),0);
   assert.equal(await nav.locator('a').count(),6);
   await page.getByRole('button',{name:'Fermer le menu',exact:true}).click();
  }
  assert.deepEqual(errors,[]);await page.close();console.log('PASS home blog, navigation, links and images',width);
 }
 const page=await browser.newPage();await page.goto(base+'/plateforme',{waitUntil:'networkidle'});
 assert.equal(await page.getByText('UNE REFONTE EN COURS',{exact:true}).count(),1);
 assert.equal(await page.locator('#blog').count(),0);
 console.log('PASS platform unchanged.');
}finally{await browser.close();}
