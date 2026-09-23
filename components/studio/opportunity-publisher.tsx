"use client";
import {useState, type FormEvent} from 'react';
import Link from 'next/link';
import {Plus} from 'lucide-react';
import {useDemo} from './demo-provider';
import {T,useLocale} from './locale';
import {Modal} from './profile-screens';
import {Field,Submit} from './studio-ui';
import {Button} from './ui/button';
import {NativeSelect,NativeSelectOption} from './ui/native-select';
import {Textarea} from './ui/textarea';
import {sports,displayName} from '@/lib/studio/model';
import {offerTypesFor} from '@/lib/studio/opportunity-types';
import {isPremium,opportunityPublishIssue,type Opportunity} from '@/lib/studio/social';
import {limits} from '@/lib/studio/entitlements';

export function OpportunityPublisher({onPublished}:{onPublished:(offer:Opportunity)=>void}) {
  const {profile,social,access,dispatchSocial,notify}=useDemo();
  const {t}=useLocale();
  const [open,setOpen]=useState(false),[error,setError]=useState('');
  const types=offerTypesFor(profile.category);
  if(!types.length)return null;
  const quota=limits(profile.category,isPremium(social,profile.category)).offers;
  const used=social.listings.filter(o=>o.publisherCategory===profile.category).length+(access.activeCareerOffers||0);
  const canPublish=used<quota&&access.canPublishOffers!==false;
  function publish(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const value=(key:string)=>String(data.get(key)||'').trim();
    const offer:Opportunity={id:crypto.randomUUID(),publisherCategory:profile.category,owner:displayName(profile),type:value('type'),sport:value('sport'),title:value('title'),description:value('description'),city:value('city'),format:value('format'),image:profile.photo,details:[],groupTrial:value('type')==='Essais groupés'};
    const issue=opportunityPublishIssue(social,access,offer);
    if(issue){setError(issue);return;}
    dispatchSocial({type:'opportunity-publish',opportunity:offer});
    setOpen(false);onPublished(offer);notify('Annonce publiée dans la démo. Aucun envoi réel.');
  }
  return <>
    <Button className="action primary opportunity-publish-button" onClick={()=>{setError('');setOpen(true);}}><Plus size={16} aria-hidden="true"/><span><T>Publier une annonce</T></span></Button>
    <Modal open={open} onOpenChange={setOpen} title="Publier une annonce" description="Annonce conservée pendant cette visite uniquement. Rien n’est publié en ligne.">
      <p><T>Annonces actives</T> : {used} / {quota}</p>
      {!canPublish ? <div className="inline-note">
        <p><T>{access.canPublishOffers===false?'Ce gestionnaire ne dispose pas des droits de recrutement.':'Le quota d’annonces actives de votre offre est atteint.'}</T></p>
        {!isPremium(social,profile.category)&&<Link href="/espace/abonnement?retour=/espace/opportunities"><T>Découvrir Premium</T></Link>}
      </div> : <form className="opportunity-publish-form" onSubmit={publish}>
        <Field label="Catégorie" name="offer-type"><NativeSelect id="offer-type" name="type" aria-label={t('Catégorie de l’annonce')} required>
          {types.map(type=><NativeSelectOption key={type} value={type}>{type}</NativeSelectOption>)}
        </NativeSelect></Field>
        <Field label="Discipline" name="offer-sport"><NativeSelect id="offer-sport" name="sport" aria-label={t('Discipline')} defaultValue="-">
          {['-',...sports].map(sport=><NativeSelectOption key={sport} value={sport}>{sport}</NativeSelectOption>)}
        </NativeSelect></Field>
        <Field label="Titre" name="title" required maxLength={120}/>
        <Field label="Ville" name="city" defaultValue={profile.city} required maxLength={100}/>
        <Field label="Format" name="format" maxLength={100}/>
        <Field label="Description" name="description"><Textarea id="description" name="description" required maxLength={2000} rows={5}/></Field>
        {error&&<p role="alert" className="field-error">{t(error)}</p>}
        <Submit><T>Publier dans la démo</T></Submit>
      </form>}
    </Modal>
  </>;
}
