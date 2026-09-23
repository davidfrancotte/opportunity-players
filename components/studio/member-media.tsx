'use client';
import {useId,useRef,useState} from 'react';
import {ArrowLeft,Heart,Play} from 'lucide-react';
import {useDemo} from './demo-provider';
import {T,useLocale} from './locale';
import {Button} from './ui/button';
import {memberMedia,memberMediaReaction,type MemberMedia} from '@/lib/studio/member-media';

export function MemberMediaGallery({memberId}:{memberId:string}){
  const {social,dispatchSocial,trust}=useDemo();const {t}=useLocale();
  const heading=useId();const [selectedId,setSelectedId]=useState<string|null>(null);
  const viewer=useRef<HTMLDivElement>(null);const triggers=useRef(new Map<string,HTMLButtonElement>());
  const items=memberMedia(memberId,social,trust.blocked);
  const selected=items.find(item=>item.id===selectedId);
  function like(item:MemberMedia){
    if(trust.blocked.includes(memberId))return;
    dispatchSocial(item.postId?{type:'like',id:item.postId}:{type:'media-like',id:'member:'+item.id});
  }
  function reaction(item:MemberMedia){const {liked,count}=memberMediaReaction(item,social);return <Button className="member-media-like" variant="ghost" aria-pressed={liked} aria-label={t(liked?'Retirer mon j’aime':item.kind==='video'?'Aimer la vidéo':'Aimer la photo')} onClick={()=>like(item)}><Heart size={18} fill={liked?'currentColor':'none'}/><span>{count}</span></Button>;}
  function open(id:string){setSelectedId(id);requestAnimationFrame(()=>{viewer.current?.focus();viewer.current?.scrollIntoView({block:'nearest'});});}
  function back(){const id=selectedId;setSelectedId(null);requestAnimationFrame(()=>{if(id)triggers.current.get(id)?.focus();});}
  return <section className="member-media" aria-labelledby={heading}>
    <div className="member-media-heading"><h3 id={heading}><T>Photos et vidéos</T></h3><span>{items.length}</span></div>
    <p className="field-hint"><T>Galerie publique de démonstration. Réactions conservées pendant cette visite.</T></p>
    {!items.length?<p className="field-hint"><T>Aucun média partagé pour le moment.</T></p>:selected?<div className="member-media-viewer" ref={viewer} tabIndex={-1}>
      <Button variant="ghost" onClick={back}><ArrowLeft size={16}/><T>Retour à la galerie</T></Button>
      {selected.kind==='video'?<video key={selected.id} src={selected.src} poster={selected.poster} controls playsInline preload="metadata" aria-label={t(selected.title)}/>:<img src={selected.src} alt={t(selected.title)}/>}
      <div className="member-media-caption"><span><T>{selected.title}</T></span>{reaction(selected)}</div>
    </div>:<div className="member-media-grid">{items.map(item=><article key={item.id}>
      <button className="member-media-open" ref={node=>{if(node)triggers.current.set(item.id,node);else triggers.current.delete(item.id);}} aria-label={`${t(item.kind==='video'?'Ouvrir la vidéo':'Ouvrir la photo')} · ${t(item.title)}`} onClick={()=>open(item.id)}>
        {item.kind==='video'&&!item.poster?<video src={item.src} muted playsInline preload="metadata" aria-hidden="true"/>:<img src={item.poster||item.src} alt="" loading="lazy"/>}
        <span>{item.kind==='video'&&<Play size={14}/>}<T>{item.kind==='video'?'Vidéo':'Photo'}</T></span>
      </button>
      <div className="member-media-caption"><span><T>{item.title}</T></span>{reaction(item)}</div>
    </article>)}</div>}
  </section>;
}
