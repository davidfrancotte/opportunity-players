import test from 'node:test';
import assert from 'node:assert/strict';
import {createSocialState,socialReducer} from '../lib/studio/social.ts';
import {calendarMonth} from '../lib/studio/entitlements.ts';
import {previousMonth,chooseSpotlight} from '../lib/studio/spotlight.ts';
import {encodeCard,decodeCard,publicShareOrigin} from '../lib/studio/sharing.ts';
import {growthRows} from '../lib/studio/locales/growth.ts';
test('share payload has only preview fields, strips unsafe images and rejects malformed data',()=>{
 const card={kind:'match',title:'Match de démo',subtitle:'Alex',sport:'Padel',city:'Liège',image:'/studio-images/coach.webp',date:'2026-10-01T12:00:00Z',email:'private@example.com',venue:'Secret address',invitees:['lea']};
 const decoded=decodeCard(encodeCard(card));assert.equal(decoded.city,'Liège');assert.equal(decoded.email,undefined);assert.equal(decoded.venue,undefined);assert.equal(decoded.invitees,undefined);
 assert.equal(decodeCard(encodeCard({...card,image:'https://tracking.example/1'})).image,'/studio-images/coach.webp');
 for(const value of ['bad','%00','#'+encodeURIComponent(JSON.stringify({...card,date:'bad'})),'x'.repeat(5000)])assert.equal(decodeCard(value),null);
 assert.equal(publicShareOrigin('javascript:alert(1)'),'');assert.equal(publicShareOrigin('http://localhost:3002'),'');assert.equal(publicShareOrigin('https://example.com/'),'https://example.com');
});
test('month boundaries and month-end snapshots are deterministic and immutable',()=>{
 assert.equal(previousMonth(Date.parse('2026-01-15T12:00:00Z')),'2025-12');
 let state=createSocialState();const month=previousMonth();const winner=chooseSpotlight(state.posts,month);assert.equal(winner.post.id,'post-padel');assert.ok(winner.post.image);
 assert.equal(chooseSpotlight(state.posts,'2000-01'),null);
 state=socialReducer(state,{type:'spotlight-close',month});assert.equal(state.spotlights[month].score,24);
 const frozen=state.spotlights[month];state=socialReducer(state,{type:'like',id:'post-padel'});state=socialReducer(state,{type:'spotlight-close',month});assert.equal(state.spotlights[month],frozen);assert.equal(frozen.score,24);
 assert.equal(socialReducer(state,{type:'spotlight-close',month:calendarMonth()}),state);
 assert.equal(socialReducer(state,{type:'spotlight-close',month:'2020-99'}),state);
});
test('likes are reversible, comments are monthly, videos and text compete, exclusions respected',()=>{
 let state=createSocialState();const month=calendarMonth();
 state=socialReducer(state,{type:'like',id:'post-padel'});assert.equal(chooseSpotlight(state.posts,month).score,1);
 state=socialReducer(state,{type:'like',id:'post-padel'});assert.equal(chooseSpotlight(state.posts,month),null);
 state=socialReducer(state,{type:'comment',id:'post-running',comment:{id:'1',name:'Alex',text:'Super'}});assert.equal(chooseSpotlight(state.posts,month).post.id,'post-running');
 const video={...state.posts[0],id:'video',video:'blob:demo',image:undefined,monthly:{[month]:{likes:3,comments:2}}};assert.equal(chooseSpotlight([...state.posts,video],month).post.id,'video');
 assert.equal(chooseSpotlight([{...video,spotlightExcluded:true}],month),null);
 state=socialReducer(state,{type:'media-like',id:'photo:private'});assert.equal(state.mediaLikes['photo:private'],true);state=socialReducer(state,{type:'media-like',id:'photo:private'});assert.equal(state.mediaLikes['photo:private'],false);
 assert.equal(chooseSpotlight(state.posts,month).post.id,'post-running');
});
test('new growth strings have all nine language columns',()=>{for(const row of growthRows){assert.equal(row.length,9);assert.ok(row.every(text=>text.trim().length));}});
