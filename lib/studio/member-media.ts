import type {SocialState} from './social.ts';
export type MemberMedia = {id:string;kind:'photo'|'video';src:string;poster?:string;title:string;postId?:string};
// Public fictional albums. Avatars are not automatically treated as uploaded media.
const albums:Record<string,MemberMedia[]>={
  ines:[{id:'ines-football',kind:'photo',src:'/studio-images/football-color.webp',title:'Football'}],
  camille:[],
  academie:[{id:'academie-football',kind:'photo',src:'/studio-images/football-color.webp',title:'Football'}],
  lea:[],noah:[],
  horizon:[{id:'horizon-video',kind:'video',src:'/videos/padel-demo.mp4',poster:'/studio-images/padel-color.webp',title:'Diaporama de démonstration'}],
  sam:[{id:'sam-athletics',kind:'photo',src:'/studio-images/athletics-color.webp',title:'Athlétisme'}],
  united:[{id:'united-football',kind:'photo',src:'/studio-images/football-color.webp',title:'Football'}],
  marc:[{id:'marc-coach',kind:'photo',src:'/studio-images/coach.webp',title:'Padel'}],
};
export function memberMedia(memberId:string,state:SocialState,blocked:string[]=[]):MemberMedia[]{
  if(blocked.includes(memberId)||!Object.hasOwn(albums,memberId))return [];
  const publications=state.posts.filter(p=>p.author===memberId&&(p.image||p.video)).map(p=>({
    id:'post:'+p.id,postId:p.id,kind:p.video?'video' as const:'photo' as const,
    src:p.video||p.image!,poster:p.video?p.image:undefined,title:p.sport==='-'?'Médias':p.sport,
  }));
  return [...publications,...albums[memberId]];
}
export function memberMediaReaction(media:MemberMedia,state:SocialState){
  if(media.postId){const post=state.posts.find(p=>p.id===media.postId);return {liked:!!post?.liked,count:post?.likes||0};}
  const liked=!!state.mediaLikes?.['member:'+media.id];return {liked,count:liked?1:0};
}
