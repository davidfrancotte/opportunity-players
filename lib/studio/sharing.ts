export type ShareCardData={kind:'match'|'passport';title:string;subtitle:string;sport:string;city:string;image:string;date?:string};
export function encodeCard(card:ShareCardData) {
  // Only the fields shown in the preview leave the app: never contacts, birth date or exact venue.
  return encodeURIComponent(JSON.stringify({kind:card.kind,title:card.title.slice(0,120),subtitle:card.subtitle.slice(0,180),sport:card.sport.slice(0,60),city:card.city.slice(0,80),image:/^\/studio-images\/[\w-]+\.webp$/.test(card.image)?card.image:'/studio-images/coach.webp',date:card.date}));
}
export function decodeCard(hash:string):ShareCardData|null {
  try {
    if(hash.length>4000)return null;
    const value=JSON.parse(decodeURIComponent(hash.replace(/^#/,'')));
    if(!['match','passport'].includes(value.kind)||!['title','subtitle','sport','city','image'].every(key=>typeof value[key]==='string'))return null;
    if(value.date!==undefined&&(typeof value.date!=='string'||!Number.isFinite(Date.parse(value.date))))return null;
    return JSON.parse(decodeURIComponent(encodeCard(value)));
  }catch{return null;}
}
export function publicShareOrigin(value:string|undefined) {
  try{const url=new URL(value||'');return url.protocol==='https:'&&!['localhost','127.0.0.1'].includes(url.hostname)?url.origin:'';}catch{return '';}
}
