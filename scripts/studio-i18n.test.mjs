import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {languages,normalizeLocale,intlLocale,translate,dictionaries} from '../lib/studio/i18n.ts';
test('opportunities title and navigation use the French source key in every locale',()=>{
  const expected=['Opportunités','Kansen','Chancen','Oportunidades','Opportunità','Oportunidades','Oferty','Fırsatlar','Opportunities'];
  languages.forEach(({code},index)=>assert.equal(translate(code,'Opportunités'),expected[index]));
  for(const file of ['components/studio/social-screens.tsx','components/studio/profile-screens.tsx','app/espace/[section]/page.tsx']){
    const source=fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
    assert.ok(!source.includes('"Opportunities"'),`${file}: use canonical French label`);
  }
  for(const {code} of languages.filter(l=>l.code!=='fr')){
    for(const key of ['Publier une annonce','Organiser un match','Mes invitations','J’organise','À proximité','Essais groupés','Sport études'])assert.notEqual(translate(code,key),key,`${code}: ${key}`);
  }
});
test('every extracted interface string has an offline translation',()=>{
  const keys=JSON.parse(fs.readFileSync(new URL('../lib/studio/locales/source.json',import.meta.url),'utf8'));
  for(const [locale,dictionary] of Object.entries(dictionaries)) {
    assert.deepEqual(keys.filter(key=>!dictionary[key]?.trim()),[],`${locale}: missing translations`);
    for(const key of keys.filter(key=>key.includes('{'))) {
      assert.deepEqual((dictionary[key].match(/\{\w+\}/g)||[]).sort(),(key.match(/\{\w+\}/g)||[]).sort(),`${locale}: interpolation ${key}`);
    }
  }
});
test('requested languages and existing English remain available',()=>{
  assert.deepEqual(languages.map(l=>l.code),['fr','nl','de','es','it','pt','pl','tr','en']);
  for(const language of languages)assert.equal(normalizeLocale(language.code),language.code);
});
test('invalid stored languages safely fall back to French',()=>{
  for(const value of [null,undefined,'','FR','xx',{},'<script>'])assert.equal(normalizeLocale(value),'fr');
});
test('reviewed navigation labels exist for each locale',()=>{
  for(const locale of languages.filter(l=>l.code!=='fr')){
    assert.notEqual(translate(locale.code,'Langue de l’application'),'Langue de l’application');
    assert.notEqual(translate(locale.code,'Accueil'),'Accueil');
    assert.notEqual(translate(locale.code,'Mode sombre'),'Mode sombre');
    assert.notEqual(translate(locale.code,'Toutes les disciplines'),'Toutes les disciplines');
  }
});
test('unsupported user content and canonical data are not modified',()=>{
  for(const {code} of languages){
    assert.equal(translate(code,'Alex Dupont — Mon texte personnel 8472'),'Alex Dupont — Mon texte personnel 8472');
    assert.equal(translate(code,''),'');
  }
  assert.equal(translate('fr','Accueil'),'Accueil');
  assert.equal(translate('nl',' Accueil '),' Start ');
});
test('display dates use all requested locales without changing the stored date',()=>{
  const date=new Date('2026-09-23T12:00:00Z');
  for(const {code,intl} of languages){
    assert.equal(intlLocale(code),intl);
    const formatted=new Intl.DateTimeFormat(intlLocale(code),{month:'long',timeZone:'Europe/Brussels'}).format(date);
    assert.ok(formatted.length>1);
  }
  assert.equal(date.toISOString(),'2026-09-23T12:00:00.000Z');
});
test('language selector is confined to settings, not headers',()=>{
  const profile=fs.readFileSync(new URL('../components/studio/profile-screens.tsx',import.meta.url),'utf8');
  const auth=fs.readFileSync(new URL('../components/studio/studio-ui.tsx',import.meta.url),'utf8');
  assert.ok(profile.slice(profile.indexOf('export function SettingsPage')).includes('<LanguagePreferences />'));
  assert.ok(!profile.includes('<LanguageSwitch'));
  assert.ok(!auth.includes('<LanguageSwitch'));
});
