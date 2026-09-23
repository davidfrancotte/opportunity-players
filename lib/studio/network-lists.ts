import {members,isConnected,matchesQuery,type SocialState} from './social.ts';
export type NetworkList='connections'|'following';
export function networkMembers(state:SocialState,blocked:string[],kind:NetworkList,query='') {
  return members.filter(m=>!blocked.includes(m.id) &&
    (kind==='connections'?isConnected(state,m.id):state.following.includes(m.id)) &&
    matchesQuery([m.name,m.role,m.sport,m.city,m.country].join(' '),query));
}
