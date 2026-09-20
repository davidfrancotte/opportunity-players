'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Monitor } from 'lucide-react';
import './web-workspace-preview.css';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';

const previews = [
  {id:'profil',label:'01 / Mon parcours',image:'studio-web-profil-light',href:'/espace/profil',title:'Vos sports, vos niveaux, vos clubs.',text:'Un dossier multisport, vos références et votre agent : donnez du contexte à votre profil.',alt:'Interface web Arena en mode clair : profil sportif, disciplines et classements distincts, clubs et accès aux références et à l’agent.'},
  {id:'reseau',label:'02 / Les bons profils',image:'studio-web-reseau-light',href:'/espace/reseau',title:'Une recherche qui connaît votre terrain.',text:'Croisez sport, niveau, classement et expérience en club pour trouver les bons interlocuteurs.',alt:'Interface web Arena en mode clair : recherche de joueurs avec filtres par sport, niveau, classement et club.'},
  {id:'messages',label:'03 / Mes échanges',image:'studio-web-messages-light',href:'/espace/messages',title:'Une conversation peut tout changer.',text:'Retrouvez vos conversations, échangez avec votre réseau et préparez votre prochaine rencontre sportive.',alt:'Messagerie web Arena en mode clair : trois conversations fictives avec Noah Laurent, Horizon Padel et Léa Moreau, et un échange ouvert autour d’une séance de padel.'},
];

export function WebWorkspacePreview() {
  return (
    <figure className="web-workspace-preview">
      <div className="workspace-preview-bar">
        <span>
          <Monitor size={16} />
          VOTRE ESPACE, SUR ORDINATEUR
        </span>
        <span>OPPORTUNITY PLAYERS</span>
      </div>
      <Tabs defaultValue="profil" className="workspace-preview-tabs">
        <TabsList className="workspace-preview-switch" aria-label="Aperçus de l’interface web">
          {previews.map(p=><TabsTrigger key={p.id} value={p.id}>{p.label}</TabsTrigger>)}
        </TabsList>
        {previews.map(p=><TabsContent key={p.id} value={p.id}>
          <div className="workspace-preview-description"><h3>{p.title}</h3><p>{p.text}</p></div>
          <Link href={p.href} className="workspace-preview-link" aria-label={p.title+' Explorer dans la démo web'}>
            <Image unoptimized src={'/app-visuals/'+p.image+'.png'} alt={p.alt} width={1440} height={1000} loading="lazy"/>
            <span className="workspace-preview-cta">Explorer cet espace <ArrowUpRight size={18}/></span>
          </Link>
        </TabsContent>)}
      </Tabs>
      <figcaption>
        <span>LE MÊME RÉSEAU. SUR ORDINATEUR ET SUR MOBILE.</span>
        <span>Captures réelles de la démo · profils et contrôles simulés</span>
      </figcaption>
    </figure>
  );
}
