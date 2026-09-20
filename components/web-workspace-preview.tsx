'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Monitor } from 'lucide-react';
import './web-workspace-preview.css';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const previews = [
  {
    id: 'profil',
    label: '01 / Mon parcours',
    image: 'studio-web-profil-light',
    href: '/espace/profil',
    title: 'Vos sports, vos niveaux, vos clubs.',
    text: 'Un dossier multisport, vos références et votre agent : donnez du contexte à votre profil.',
    alt: 'Interface web Arena en mode clair : profil sportif, disciplines et classements distincts, clubs et accès aux références et à l’agent.',
  },
  {
    id: 'reseau',
    label: '02 / Les bons profils',
    image: 'studio-web-reseau-light',
    href: '/espace/reseau',
    title: 'Une recherche qui connaît votre terrain.',
    text: 'Croisez sport, niveau, classement et expérience en club pour trouver les bons interlocuteurs.',
    alt: 'Interface web Arena en mode clair : recherche de joueurs avec filtres par sport, niveau, classement et club.',
  },
  {
    id: 'messages',
    label: '03 / Mes échanges',
    image: 'studio-web-messages-light',
    href: '/espace/messages',
    title: 'Une conversation peut tout changer.',
    text: 'Retrouvez vos conversations, échangez avec votre réseau et préparez votre prochaine rencontre sportive.',
    alt: 'Messagerie web Arena en mode clair : trois conversations fictives avec Noah Laurent, Horizon Padel et Léa Moreau, et un échange ouvert autour d’une séance de padel.',
  },
  {
    id: 'recommandations',
    label: '04 / Pour vous',
    image: 'studio-web-recommandations-light',
    href: '/espace/accueil',
    title: 'Des suggestions qui ont une raison.',
    text: 'Vos sports et votre localisation orientent les recommandations. Ajustez vos préférences et découvrez les personnes et recherches pertinentes.',
    alt: 'Capture réelle de l’espace web en mode clair : recommandations de profils et d’opportunités avec leurs raisons.',
  },
  {
    id: 'recrutement',
    label: '05 / Candidatures & essais',
    image: 'studio-web-recrutement-light',
    href: '/espace/recrutement',
    title: 'Du premier dossier à la rencontre.',
    text: 'Candidatez, suivez la réponse et confirmez un essai. Côté recruteur : recherches, présélection et invitations réunies au même endroit.',
    alt: 'Capture réelle du recrutement web en mode clair : recherche ouverte et candidature fictive avec invitation à un essai.',
  },
  {
    id: 'rendez-vous',
    label: '06 / Rendez-vous',
    image: 'studio-web-rendez-vous-light',
    href: '/espace/rendez-vous',
    title: 'L’agenda s’ouvre après un premier accord.',
    text: 'Demandez un rendez-vous à un professionnel. Après acceptation, choisissez un créneau ; les deux agendas sont mis à jour dans la démo.',
    alt: 'Capture réelle de l’espace rendez-vous web : demande acceptée et créneaux disponibles après accord du professionnel.',
  },
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
        <TabsList
          className="workspace-preview-switch"
          aria-label="Aperçus de l’interface web"
        >
          {previews.map((p) => (
            <TabsTrigger key={p.id} value={p.id}>
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {previews.map((p) => (
          <TabsContent key={p.id} value={p.id}>
            <div className="workspace-preview-description">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
            <Link
              href={p.href}
              className="workspace-preview-link"
              aria-label={p.title + ' Explorer dans la démo web'}
            >
              <Image
                unoptimized
                src={'/app-visuals/' + p.image + '.png'}
                alt={p.alt}
                width={1440}
                height={1000}
                loading="lazy"
              />
              <span className="workspace-preview-cta">
                Explorer cet espace <ArrowUpRight size={18} />
              </span>
            </Link>
          </TabsContent>
        ))}
      </Tabs>
      <figcaption>
        <span>LE MÊME RÉSEAU. SUR ORDINATEUR ET SUR MOBILE.</span>
        <span>Captures réelles de la démo · profils et contrôles simulés</span>
      </figcaption>
    </figure>
  );
}
