import test from 'node:test';
import assert from 'node:assert/strict';
import {memberMedia,memberMediaReaction} from '../lib/studio/member-media.ts';
import {createSocialState,socialReducer} from '../lib/studio/social.ts';
test('gallery contains only the selected member’s public photos and videos; no avatar fallback',()=>{
 const state=createSocialState();assert.equal(memberMedia('horizon',state).length,2);
 assert.deepEqual(memberMedia('camille',state),[]);assert.deepEqual(memberMedia('unknown',state),[]);assert.deepEqual(memberMedia('horizon',state,['horizon']),[]);
 assert.ok(memberMedia('lea',state).every(m=>m.postId==='post-tennis'));
 state.posts.push({...state.posts[0],id:'test-video',author:'lea',image:undefined,video:'blob:video'});
 assert.equal(memberMedia('lea',state)[1].kind,'video');
});
test('gallery post reactions synchronize with feed likes and remain reversible',()=>{
 let state=createSocialState();const photo=memberMedia('horizon',state)[0];
 state=socialReducer(state,{type:'like',id:photo.postId});assert.deepEqual(memberMediaReaction(photo,state),{liked:true,count:25});
 state=socialReducer(state,{type:'like',id:photo.postId});assert.deepEqual(memberMediaReaction(photo,state),{liked:false,count:24});
 const video=memberMedia('horizon',state)[1];state=socialReducer(state,{type:'media-like',id:'member:'+video.id});
 assert.deepEqual(memberMediaReaction(video,state),{liked:true,count:1});assert.equal(memberMediaReaction(photo,state).count,24);
 assert.equal(memberMediaReaction(memberMedia('ines',state)[0],state).liked,false);
 state=socialReducer(state,{type:'media-like',id:'member:'+video.id});assert.deepEqual(memberMediaReaction(video,state),{liked:false,count:0});
});
