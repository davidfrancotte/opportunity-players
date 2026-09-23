import type {Post} from './social';
import {calendarMonth} from './entitlements.ts';
export type MonthlyEngagement = Record<string,{likes:number;comments:number}>;
export type Spotlight = {month:string;post:Post;score:number};
export function previousMonth(now=Date.now()) {
  const [year,month]=calendarMonth(now).split('-').map(Number);
  return `${month===1?year-1:year}-${String(month===1?12:month-1).padStart(2,'0')}`;
}
export function chooseSpotlight(posts:Post[],month:string):Spotlight|null {
  const ranked=posts.filter(p=>!p.spotlightExcluded).map(post=>({post,month,score:(post.monthly?.[month]?.likes||0)+(post.monthly?.[month]?.comments||0)}))
    .filter(p=>p.score>0).sort((a,b)=>b.score-a.score||(b.post.monthly?.[month]?.likes||0)-(a.post.monthly?.[month]?.likes||0)||a.post.id.localeCompare(b.post.id));
  return ranked[0]?structuredClone(ranked[0]):null;
}
