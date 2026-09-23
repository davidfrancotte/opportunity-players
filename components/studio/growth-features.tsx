"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Heart,Share2,Download,Sparkles,ArrowUpRight} from 'lucide-react';
import {useDemo} from './demo-provider';
import {T,useLocale} from './locale';
import {Modal,ProfileLayout} from './profile-screens';
import {Button} from './ui/button';
import {displayName} from '@/lib/studio/model';
import {calendarMonth} from '@/lib/studio/entitlements';
import {previousMonth,chooseSpotlight} from '@/lib/studio/spotlight';
import {decodeCard,encodeCard,publicShareOrigin,type ShareCardData} from '@/lib/studio/sharing';
import type {Match} from '@/lib/studio/events';
import type {Post} from '@/lib/studio/social';

const shareOrigin=publicShareOrigin(process.env.NEXT_PUBLIC_SHARE_ORIGIN);
const downloadUrl=(()=>{try{const url=new URL(process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL||'');return url.protocol==='https:'?url.href:'';}catch{return '';}})();
export function DownloadAppLink(){return downloadUrl?<a className="action primary" href={downloadUrl} target="_blank" rel="noopener noreferrer"><Download size={16}/><T>Télécharger l’app</T></a>:<Link className="action primary" href="/espace/telecharger"><Download size={16}/><T>Télécharger l’app</T></Link>;}
export function DownloadAppPage(){return <ProfileLayout back="/espace/accueil"><section className="growth-info"><h1><T>Télécharger l’app</T></h1><p><T>La démo n’est pas encore disponible sur l’App Store. Installation de test via Xcode uniquement.</T></p><Link className="action secondary" href="/espace/accueil"><T>Explorer la démo</T></Link></section></ProfileLayout>;}

function useCardImage(card:ShareCardData,heading:string,cta:string){
  const [url,setUrl]=useState('');
  useEffect(()=>{
    let active=true,owned='';setUrl('');
    const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1120;
    const context=canvas.getContext('2d');if(!context)return;const ctx=context;
    const draw=async()=>{
      ctx.fillStyle='#101214';ctx.fillRect(0,0,900,1120);
      const mark=new Image();mark.src='/op-open-square-dark.png';
      await mark.decode();ctx.drawImage(mark,54,18,85*mark.width/mark.height,85);
      ctx.fillStyle='#f5f7f4';ctx.font='24px sans-serif';ctx.fillText('Opportunity Players',54,127);
      const img=new Image();img.src=card.image;
      try{await img.decode();const scale=Math.max(792/img.width,420/img.height);ctx.save();ctx.beginPath();ctx.roundRect(54,167,792,420,28);ctx.clip();ctx.drawImage(img,54+(792-img.width*scale)/2,167+(420-img.height*scale)/2,img.width*scale,img.height*scale);ctx.restore();}catch{}
      ctx.fillStyle='#d1f94c';ctx.font='600 24px sans-serif';ctx.fillText(heading.toUpperCase(),54,636,792);
      let y=688;
      function lines(text:string,size:number,color:string,maxLines:number){ctx.font=`${size>=36?'600':'400'} ${size}px sans-serif`;ctx.fillStyle=color;let line='',count=0;
        for(const word of text.split(/\s+/)){if(ctx.measureText(line+word).width>780&&line){ctx.fillText(line,54,y,780);y+=size*1.3;line='';count++;if(count>=maxLines){return;}}line+=word+' ';}if(line){ctx.fillText(line,54,y,780);y+=size*1.3;}}
      lines(card.title,42,'#f5f7f4',2);lines(card.subtitle,26,'#bcc2bc',2);lines(`${card.sport} · ${card.city}`,26,'#bcc2bc',1);
      if(card.date)lines(new Date(card.date).toLocaleString(document.documentElement.lang,{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Brussels'}),24,'#bcc2bc',1);
      ctx.fillStyle='#d1f94c';ctx.beginPath();ctx.roundRect(54,970,792,72,36);ctx.fill();ctx.fillStyle='#101214';ctx.font='600 29px sans-serif';ctx.fillText(cta,85,1016,730);
      ctx.fillStyle='#bcc2bc';ctx.font='20px sans-serif';ctx.fillText('OP Demo',54,1081);
      canvas.toBlob(blob=>{if(blob&&active){owned=URL.createObjectURL(blob);setUrl(owned);}},'image/png');
    };void draw();return()=>{active=false;if(owned)URL.revokeObjectURL(owned);};
  },[card.title,card.subtitle,card.sport,card.city,card.image,card.date,heading,cta]);
  return url;
}
function CardPreview({card}:{card:ShareCardData}){
  const {t}=useLocale();const [guest,setGuest]=useState(false),[consent,setConsent]=useState(false),[error,setError]=useState(''),[sharing,setSharing]=useState(false);
  const path=`/espace/invitation/#${encodeCard(card)}`;const link=shareOrigin?shareOrigin+path:'';
  const cta=t(downloadUrl?'Télécharger l’app':'Télécharger l’app · bientôt');
  const image=useCardImage(card,t(card.kind==='match'?'Invitation à un match':'Passeport sportif'),cta);
  async function share(){setError('');if(!image||!consent||sharing)return;setSharing(true);
    try{const file=new File([await (await fetch(image)).blob()],'op-carte.png',{type:'image/png'});const text=[card.title,link,downloadUrl?`${t('Télécharger l’app')} : ${downloadUrl}`:t('La démo n’est pas encore disponible sur l’App Store. Installation de test via Xcode uniquement.')].filter(Boolean).join('\n');
      if(navigator.canShare?.({files:[file]})&&navigator.share)await navigator.share({files:[file],title:card.title,text});
      else {const a=document.createElement('a');a.href=image;a.download='op-carte.png';a.click();setError(t('Carte enregistrée.'));}
    }catch(e){if(!(e instanceof Error&&(e.name==='AbortError'||/cancel/i.test(e.message))))setError(t('Le partage est indisponible sur cet appareil.'));}finally{setSharing(false);}
  }
  return <div className="share-preview">
    {image?<img className="share-card-image" src={image} alt={`${t('Aperçu de la carte')} — ${card.title}`}/>:<p role="status"><T>Chargement…</T></p>}
    <DownloadAppLink/>
    <p className="section-note"><T>Le lien accompagne l’image ; une image PNG ne contient pas de bouton cliquable.</T></p>
    {!shareOrigin&&<p className="inline-note"><T>Aperçu local : le lien public sera disponible après la mise en ligne.</T></p>}
    <label className="share-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><T>J’autorise le partage des informations visibles sur cette carte.</T></label>
    <div className="growth-actions"><Button className="action primary" disabled={!image||!consent||sharing} onClick={share}><Share2 size={16}/><T>Partager la carte</T></Button>
    {link&&<Button className="action secondary" disabled={!consent} onClick={async()=>{try{await navigator.clipboard.writeText(link);setError(t('Lien copié.'));}catch{setError(link);}}}><T>Copier le lien</T></Button>}
    <Button variant="ghost" onClick={()=>setGuest(!guest)} aria-expanded={guest}><T>Aperçu invité</T><ArrowUpRight size={16}/></Button></div>
    {error&&<p role="status">{error}</p>}
    {guest&&<GuestCard card={card}/>}
  </div>;
}
export function PassportButton(){
  const {profile}=useDemo(),{t}=useLocale();const [open,setOpen]=useState(false);
  const card:ShareCardData={kind:'passport',title:displayName(profile),subtitle:[profile.headline,...profile.disciplines.slice(0,2).map(d=>`${t(d.sport)} · ${t(d.level)}`)].filter(Boolean).join(' — '),sport:profile.disciplines.map(d=>t(d.sport)).join(' · ')||t(profile.sport),city:profile.city,image:profile.photo};
  return <><Button className="action secondary passport-trigger" onClick={()=>setOpen(true)}><Share2 size={18}/><T>Mon passeport sportif</T></Button><Modal open={open} onOpenChange={setOpen} title="Mon passeport sportif" description="Aperçu de la carte"><CardPreview card={card}/></Modal></>;
}
export function MatchShareButton({match}:{match:Match}){
  const {profile}=useDemo();const [open,setOpen]=useState(false);const {t}=useLocale();
  if(match.host!=='me'||match.cancelled)return null;
  const card:ShareCardData={kind:'match',title:match.title,subtitle:displayName(profile),sport:t(match.sport),city:match.city,image:profile.photo,date:match.slots.find(s=>s.id===match.confirmed)?.start||match.slots[0]?.start};
  return <><Button className="action secondary" onClick={()=>setOpen(true)}><Share2 size={18}/><T>Partager l’invitation</T></Button><Modal open={open} onOpenChange={setOpen} title="Partager l’invitation" description="Aperçu de la carte"><CardPreview card={card}/></Modal></>;
}
function GuestCard({card}:{card:ShareCardData}){
  const [sent,setSent]=useState(false);const {t,dateLocale}=useLocale();
  return <section className="guest-card"><span className="mini-kicker">OP DEMO</span><h2>{card.title}</h2><p>{card.subtitle}</p><p>{card.sport} · {card.city}</p>{card.date&&<p>{new Date(card.date).toLocaleString(dateLocale,{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Brussels'})}</p>}
    {card.kind==='match'&&<><Button className="action primary" onClick={()=>setSent(true)} disabled={sent}><T>{sent?'Demande simulée':'Je souhaite participer'}</T></Button><p role="status"><T>{sent?'Aucun envoi réel. La participation nécessite l’accord de l’organisateur.':'Aperçu local : le lien public sera disponible après la mise en ligne.'}</T></p></>}
    <DownloadAppLink/>{card.kind==='passport'&&<Link className="action secondary" href="/espace/inscription"><T>Créer un compte</T></Link>}
  </section>;
}
export function SharedCardPage(){const [card,setCard]=useState<ShareCardData|null>(null);useEffect(()=>{const read=()=>setCard(decodeCard(location.hash));read();window.addEventListener('hashchange',read);return()=>window.removeEventListener('hashchange',read);},[]);return <ProfileLayout back="/espace/accueil">{card?<GuestCard card={card}/>:<p><T>Invitation indisponible.</T></p>}</ProfileLayout>;}

export function MediaLike({id}:{id:string}){const {social,dispatchSocial}=useDemo(),{t}=useLocale();const liked=!!social.mediaLikes?.[id];return <Button className="media-like" variant="ghost" aria-pressed={liked} aria-label={t(liked?'Retirer mon j’aime':'Aimer la publication')} onClick={()=>dispatchSocial({type:'media-like',id})}><Heart size={18} fill={liked?'currentColor':'none'}/>{liked?1:0}</Button>;}

export function MonthlySpotlight({visible,onOpen}:{visible:(p:Post)=>boolean;onOpen:(id:string)=>void}){
  const {social,dispatchSocial}=useDemo();const {t,dateLocale}=useLocale();const [month,setMonth]=useState(()=>previousMonth()),[simulation,setSimulation]=useState(false);
  useEffect(()=>{const close=()=>{const ended=previousMonth();setMonth(ended);dispatchSocial({type:'spotlight-close',month:ended});};close();const timer=setInterval(close,60000);window.addEventListener('focus',close);return()=>{clearInterval(timer);window.removeEventListener('focus',close);};},[dispatchSocial]);
  const award=simulation?chooseSpotlight(social.posts.filter(visible),calendarMonth()):social.spotlights?.[month];
  const post=award?.post;
  return <section className="monthly-spotlight">
    {post&&visible(post)&&<article className="spotlight-card"><header><Sparkles size={20}/><div><span>Spotlight of the month</span><p>{new Date(`${award.month}-15T12:00:00Z`).toLocaleDateString(dateLocale,{month:'long',year:'numeric'})} · <T>{simulation?'Simulation':'Exemple de démonstration'}</T></p></div></header>
      <button className="spotlight-open" onClick={()=>onOpen(post.id)} aria-label={t('Voir la publication')}>{post.image?<img src={post.image} alt={post.sport}/>:<p>{post.text}</p>}<span>{post.name} · {post.sport}</span></button>
      <p>{award.score} <T>interactions</T> · <T>La communauté à l’honneur</T></p><Button variant="ghost" onClick={()=>onOpen(post.id)}><T>Voir la publication</T><ArrowUpRight size={16}/></Button>
    </article>}
    <details className="spotlight-rules"><summary><T>Comment fonctionne le Spotlight ?</T></summary><p><T>Un like ou un commentaire compte pour une interaction. Les publications du fil sont éligibles, pas les médias privés. Le résultat du mois écoulé est figé à la prochaine ouverture de la démo.</T></p><Button variant="ghost" onClick={()=>setSimulation(!simulation)}><T>{simulation?'Revenir au Spotlight':'Simuler la clôture du mois'}</T></Button>{simulation&&!award&&<p role="status"><T>Aimez ou commentez une publication pour tester le classement.</T></p>}</details>
  </section>;
}
