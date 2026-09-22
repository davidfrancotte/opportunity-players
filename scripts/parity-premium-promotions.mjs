import { chromium } from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
async function nav(href) {
  await page.locator(`a[href="${href}"]`).filter({visible:true}).first().click();
  await page.waitForURL(`**${href}`);
}
try {
  await page.goto('http://127.0.0.1:3000/espace/abonnement', { waitUntil: 'networkidle' });
  for (const category of ['Sportif', 'Professionnel', 'Organisation']) {
    await page.locator('.subscription-demo-controls summary').click();
    await page.locator('#demo-category').selectOption(category);
    assert.equal(await page.locator('.premium-offer').count(), 1);
    await page.getByRole('button', { name: 'Essayer Premium dans la démo', exact: true }).click();
    await page.getByRole('button', { name: 'Activer Premium dans la démo', exact: true }).click();
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.equal(await page.locator('.premium-offer').count(), 0);
    assert.match(await page.locator('h1').innerText(), /Premium est actif/);
    for (const href of ['/espace/accueil', '/espace/messages', '/espace/profil', '/espace/reseau', '/espace/opportunities']) {
      await nav(href);
      assert.equal(await page.locator('.plan-status,.event-premium,.premium-offer').count(), 0, `${category}: ${href}`);
    }
    await nav('/espace/reseau');
    await page.locator('.network-sections a[href="/espace/jouer"]').click();
    await page.getByRole('button', { name: 'À proximité', exact: true }).click();
    assert.equal(await page.locator('.event-premium').count(), 0);
    assert.equal(await page.locator('.nearby-alerts').count(), 1);
    await page.locator('a[href="/espace/parametres"]').filter({visible:true}).first().click();
    await page.getByRole('link', { name: 'Gérer mon abonnement', exact: true }).click();
    await page.waitForURL('**/abonnement');
    assert.equal(await page.locator('.premium-offer').count(), 0);
    await page.locator('.subscription-demo-controls summary').click();
    await page.getByRole('button', { name: 'Revenir à Gratuit dans la démo', exact: true }).click();
    assert.equal(await page.locator('.premium-offer').count(), 1);
    await nav('/espace/messages');
    assert.equal(await page.locator('.plan-status').count(), 1);
    await page.locator('.plan-status').click();
    await page.waitForURL('**/abonnement');
  }
  assert.deepEqual(errors, []);
  console.log('PASS: promotions disappear immediately after Premium activation and across navigation for all three account types; management stays accessible; promotions return on downgrade.');
} finally { await browser.close(); }
