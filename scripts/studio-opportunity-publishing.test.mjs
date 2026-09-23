import test from 'node:test';
import assert from 'node:assert/strict';
import {offerTypesFor,allOfferTypes} from '../lib/studio/opportunity-types.ts';
import {createSocialState,guardedSocialReducer,allOpportunities,matchesOpportunityType} from '../lib/studio/social.ts';
import {memberSearchFilters} from '../lib/studio/community.ts';
import {emptyDirectoryFilters,matchesDirectory,effectiveDirectoryFilters} from '../lib/studio/directory.ts';
import {careerActors,createCareerState,careerReducer} from '../lib/studio/career.ts';
import {initialProfile} from '../lib/studio/model.ts';
const context=category=>({category,month:'2026-09'});
const offer=(category,type='Coaching',id='new')=>({id,publisherCategory:category,type,sport:'Padel',owner:'Démo',title:'Une annonce de test',description:'Une description de test.',city:'Liège',format:'Sur place',image:'/studio-images/padel-color.webp',details:[],groupTrial:type==='Essais groupés'});
const publish=(state,category,type='Coaching',id='new',extra={})=>guardedSocialReducer(state,{context:{...context(category),...extra},action:{type:'opportunity-publish',opportunity:offer(category,type,id)}});
test('all requested categories are offered only to their correct publishers',()=>{
  assert.equal(offerTypesFor('Professionnel').length,10);assert.equal(offerTypesFor('Organisation').length,8);assert.equal(allOfferTypes.length,13);
  assert.deepEqual(offerTypesFor('Sportif'),[]);
  for(const category of ['Professionnel','Organisation'])for(const type of offerTypesFor(category)){
    const state={...createSocialState(),paidCategory:category};
    const next=publish(state,category,type);
    assert.equal(next.listings.length,1);
    assert.ok(matchesOpportunityType(next.listings[0],type));
    assert.ok(allOpportunities(next).some(o=>o.id==='new'));
  }
  for(const [category,type] of [['Sportif','Coaching'],['Professionnel','Université'],['Organisation','Soins de santé']]){
    const state={...createSocialState(),paidCategory:category};assert.equal(publish(state,category,type),state);
  }
});
test('quotas, shared recruitment quota, manager rights, removal and reset',()=>{
  const free=createSocialState();assert.equal(publish(free,'Professionnel'),free);
  const first=publish(free,'Organisation');assert.equal(first.listings.length,1);
  assert.equal(publish(first,'Organisation','Coaching','second'),first);
  assert.equal(publish(free,'Organisation','Coaching','new',{activeCareerOffers:1}),free);
  assert.equal(publish(free,'Organisation','Coaching','new',{canPublishOffers:false}),free);
  const other=guardedSocialReducer(first,{context:context('Professionnel'),action:{type:'opportunity-remove',id:'new'}});assert.equal(other,first);
  const saved=guardedSocialReducer(first,{context:context('Sportif'),action:{type:'save',id:'new'}});assert.deepEqual(saved.saved,['new']);
  const interested=guardedSocialReducer(saved,{context:context('Sportif'),action:{type:'interest',id:'new'}});assert.deepEqual(interested.interested,['new']);
  const removed=guardedSocialReducer(interested,{context:context('Organisation'),action:{type:'opportunity-remove',id:'new'}});assert.equal(removed.listings.length,0);assert.deepEqual(removed.saved,[]);
  assert.equal(publish(removed,'Organisation').listings.length,1);
  assert.equal(guardedSocialReducer(first,{context:context('Organisation'),action:{type:'reset'}}).listings.length,0);
});
test('validation and moderation reject forged or incomplete announcements',()=>{
  const state={...createSocialState(),paidCategory:'Professionnel'};
  for(const patch of [{publisherCategory:'Organisation'},{title:' '},{description:'[TEST MENACE]'},{sport:'inconnu'},{id:'coach'},{title:'x'.repeat(121)},{format:'x'.repeat(101)}]){
    assert.equal(guardedSocialReducer(state,{context:context('Professionnel'),action:{type:'opportunity-publish',opportunity:{...offer('Professionnel'),...patch}}}),state);
  }
});
test('opportunity listings also consume the existing recruitment quota',()=>{
  const actors=careerActors({...initialProfile,category:'Organisation'},false);
  const actor=actors.find(a=>a.id==='self');
  const state=createCareerState();
  const action={type:'offer',offer:{...state.offers[0],id:'new-career',owner:'self'}};
  const context={actor,actors,blocked:[],now:Date.parse('2026-09-23T10:00:00Z')};
  assert.equal(careerReducer(state,{action,context:{...context,activeListings:1}}).error,'quota');
  assert.equal(careerReducer(state,{action,context:{...context,activeListings:0}}).error,null);
});
test('profile category and sector combine with sport; free profiles ignore paid criteria',()=>{
  const f={...emptyDirectoryFilters,kind:'Professionnels',accountType:'Kiné',sport:'Padel'};
  const member={name:'Test',role:'Kiné',kind:'Professionnels',accountType:'Kiné',sport:'Padel',country:'Belgique',city:'Liège'};
  assert.equal(matchesDirectory(member,[],memberSearchFilters(f,true)),true);
  assert.equal(matchesDirectory({...member,accountType:'Agent'},[],memberSearchFilters(f,true)),false);
  assert.equal(matchesDirectory({...member,sport:'Tennis'},[],memberSearchFilters(f,true)),false);
  assert.deepEqual(memberSearchFilters(f,false),emptyDirectoryFilters);
  assert.equal(effectiveDirectoryFilters(f,false).accountType,'Tous');
  assert.equal(effectiveDirectoryFilters(f,false).kind,'Tous');
});
