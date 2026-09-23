import {chromium} from '/Users/davidfrancotte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {allOfferTypes,offerTypesFor} from '../lib/studio/opportunity-types.ts';
import {sports} from '../lib/studio/model.ts';
const origin=process.env.PARITY_ORIGIN||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{const url=route.request().url();if(url.startsWith(origin)||/^(blob:|data:)/.test(url))return route.continue();external.push(url);return route.abort();});
  async function nav(route){await page.locator(`a[href="/espace/${route}"]:visible`).first().click();await page.waitForURL(`**/espace/${route}`);await page.waitForLoadState('networkidle');}
  async function openFilters(){
    const toggle=page.getByRole('button',{name:'Filtres',exact:true});
    assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    assert.equal(await page.locator('#opportunity-filters').count(),0);
    assert.equal(await page.locator('.social-title .opportunity-filter-toggle').count(),0);
    assert.equal(await page.locator('.opportunity-list-toolbar .opportunity-filter-toggle').count(),1);
    const position=await toggle.evaluate(button=>{
      const first=document.querySelector('.opportunity-card'),intro=document.querySelector('.social-intro');
      return {belowIntro:button.getBoundingClientRect().top>intro.getBoundingClientRect().bottom,aboveCards:!first||button.getBoundingClientRect().bottom<first.getBoundingClientRect().top};
    });
    assert.deepEqual(position,{belowIntro:true,aboveCards:true});
    await toggle.click();
    assert.equal(await page.locator('#opportunity-filters .compact-select > svg').count(),0);
    assert.deepEqual(await page.getByLabel('Types d’opportunités',{exact:true}).locator('option').evaluateAll(opts=>opts.map(o=>o.value)),['Toutes',...allOfferTypes]);
    assert.deepEqual(await page.locator('#opportunity-sport option').evaluateAll(opts=>opts.map(o=>o.value)),['Tous',...sports]);
    assert.equal(await page.getByLabel('Types d’opportunités',{exact:true}).isEnabled(),true);
    assert.equal(await page.locator('#opportunity-sport').isEnabled(),true);
  }
  async function edit(category,sector){
    await nav('profil');await page.locator('a[href="/espace/modifier-profil"]').filter({visible:true}).first().click();await page.waitForURL('**/espace/modifier-profil');
    await page.locator('#category').selectOption(category);
    if(category==='Organisation')await page.getByLabel('Organisation fictive',{exact:true}).fill('Collectif de test');
    if(category!=='Sportif')await page.getByLabel('Secteur / métier',{exact:true}).selectOption(sector);
    await page.getByRole('button',{name:'Enregistrer',exact:true}).click();await page.waitForURL('**/espace/profil');
    if(category!=='Sportif')assert.ok(await page.getByText(sector,{exact:true}).count());
  }
  await page.goto(origin+'/espace/reseau',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Affiner la recherche',exact:true}).click();
  assert.equal(await page.getByLabel('Type de profil',{exact:true}).isDisabled(),true);
  assert.equal(await page.getByLabel('Secteur / métier',{exact:true}).isDisabled(),true);
  await nav('opportunities');await openFilters();
  await page.getByRole('button',{name:'Filtres',exact:true}).click();
  await page.screenshot({path:'/tmp/web-parity-filters-collapsed.png'});
  await page.getByRole('button',{name:'Publier une annonce',exact:true}).click();
  assert.equal(await page.locator('.opportunity-publish-form').count(),0);
  await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();
  await page.goto(origin+'/espace/abonnement',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Essayer Premium dans la démo',exact:true}).click();
  await page.getByRole('button',{name:'Activer Premium dans la démo',exact:true}).click();
  await page.getByRole('dialog').waitFor({state:'hidden'});
  await edit('Professionnel','Kiné');
  await nav('reseau');await page.getByRole('button',{name:'Affiner la recherche',exact:true}).click();
  await page.getByLabel('Type de profil',{exact:true}).selectOption('Professionnels');
  await page.getByLabel('Secteur / métier',{exact:true}).selectOption('Entraîneur de gardiens');
  assert.equal(await page.locator('.community-results .member-card').count(),1);
  assert.ok(await page.locator('.community-results').getByText('Camille Roy',{exact:true}).count());
  await page.getByLabel('Type de profil',{exact:true}).selectOption('Collectives');
  assert.equal(await page.getByLabel('Secteur / métier',{exact:true}).inputValue(),'Tous');
  await page.getByLabel('Secteur / métier',{exact:true}).selectOption('Académie');
  assert.equal(await page.locator('.community-results .member-card').count(),1);
  for(const theme of ['light','dark']){await page.evaluate(value=>document.querySelector('.studio-surface').dataset.theme=value,theme);await page.screenshot({path:`/tmp/web-parity-network-sector-${theme}.png`,fullPage:true});}
  async function publish(category,type,title){
    await nav('opportunities');await page.getByRole('button',{name:'Publier une annonce',exact:true}).click();
    assert.deepEqual(await page.getByLabel('Catégorie de l’annonce',{exact:true}).locator('option').evaluateAll(opts=>opts.map(o=>o.value)),offerTypesFor(category));
    await page.getByLabel('Catégorie de l’annonce',{exact:true}).selectOption(type);
    await page.getByLabel('Discipline',{exact:true}).selectOption('Padel');
    await page.getByLabel('Titre',{exact:true}).fill(title);
    await page.getByLabel('Description',{exact:true}).fill('Annonce fictive créée pour vérifier le formulaire et les filtres.');
    await page.screenshot({path:`/tmp/web-parity-publish-form-${category}.png`,fullPage:true});
    await page.getByRole('button',{name:'Publier dans la démo',exact:true}).click();
    await page.getByRole('dialog').getByText(title,{exact:true}).waitFor();
    await page.getByRole('button',{name:'Fermer la fenêtre',exact:true}).click();
    await openFilters();
    await page.getByLabel('Types d’opportunités',{exact:true}).selectOption(type);
    await page.locator('#opportunity-sport').selectOption('Padel');
    await page.getByRole('button',{name:'Filtres',exact:true}).click();
    assert.equal(await page.locator('#opportunity-filters').count(),0);
    assert.equal(await page.locator('.opportunity-filter-count').innerText(),'2');
    assert.equal(await page.locator('.opportunity-card').count(),1);
    await openFilters();
    assert.equal(await page.locator('#opportunity-sport').inputValue(),'Padel');
    assert.equal(await page.locator('.opportunity-card').count(),1);
    assert.ok(await page.locator('.opportunity-card').getByText(title,{exact:true}).count());
    await page.locator('#opportunity-sport').selectOption('Football');assert.equal(await page.locator('.opportunity-card').count(),0);
    await page.locator('#opportunity-sport').selectOption('Padel');
  }
  await publish('Professionnel','Soins de santé','Accompagnement sportif de test');
  await edit('Organisation','Université');await publish('Organisation','Université','Parcours universitaire de test');
  for(const theme of ['light','dark']){
    await page.evaluate(value=>document.querySelector('.studio-surface').dataset.theme=value,theme);
    for(const width of [360,390,900,1440]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
    await page.screenshot({path:`/tmp/web-parity-published-offer-${theme}.png`,fullPage:true});
  }
  await edit('Sportif','');await nav('opportunities');
  await openFilters();
  assert.equal(await page.getByRole('button',{name:'Publier une annonce',exact:true}).count(),0);
  await page.getByLabel('Types d’opportunités',{exact:true}).selectOption('Soins de santé');
  assert.equal(await page.locator('.opportunity-card').count(),1,'Other profile sees published listing');
  await page.locator('.opportunity-card').getByRole('button',{name:/Enregistrer/}).click();
  await page.getByRole('button',{name:'Réinitialiser les filtres',exact:true}).click();
  assert.equal(await page.getByLabel('Types d’opportunités',{exact:true}).inputValue(),'Toutes');
  assert.equal(await page.locator('#opportunity-sport').inputValue(),'Tous');
  assert.equal(await page.locator('.opportunity-filter-count').count(),0);
  assert.ok(await page.locator('.opportunity-card').count()>1);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('PASS: pro and organisation publication, role-specific categories, sectors saved, paid network search, public filters, cross-profile visibility, both themes and mobile widths.');
}finally{await browser.close();}
