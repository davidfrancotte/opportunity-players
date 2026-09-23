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
    image: 'web-20260924-parity-profil',
    href: '/espace/profil',
    title: 'Vos sports, vos niveaux, vos clubs.',
    text: 'Un dossier multisport, votre secteur, vos médias et un passeport sportif à prévisualiser et partager.',
    alt: 'Interface web Arena en mode clair : profil sportif, disciplines et classements distincts, clubs et accès aux références et à l’agent.',
  },
  {
    id: 'reseau',
    label: '02 / Les bons profils',
    image: 'web-20260924-parity-reseau',
    href: '/espace/reseau',
    title: 'Une recherche qui connaît votre terrain.',
    text: 'Retrouvez vos Connexions et vos Suivis dans deux listes avec recherche. Envoyez une demande Connect ou affinez la découverte de membres avec Premium.',
    alt: 'Interface web actualisée en mode clair : recherche, cartes Connexions et Suivis, invitations et suggestions de membres.',
  },
  {
    id: 'messages',
    label: '03 / Mes échanges',
    image: 'web-20260924-parity-messages',
    href: '/espace/messages',
    title: 'Une conversation peut tout changer.',
    text: 'Après acceptation de votre connexion, échangez sans quota et préparez vos prochaines rencontres.',
    alt: 'Messagerie web Arena en mode clair : trois conversations fictives avec Noah Laurent, Horizon Padel et Léa Moreau, et un échange ouvert autour d’une séance de padel.',
  },
  {
    id: 'accueil',
    label: '04 / Ma communauté',
    image: 'web-20260924-parity-accueil',
    href: '/espace/accueil',
    title: 'Votre communauté, au premier plan.',
    text: 'Photos, vidéos, likes et Spotlight du mois. Avec Premium, filtrez par catégorie et discipline et programmez vos publications.',
    alt: 'Capture réelle du fil communautaire web en mode clair, avec publication et aperçu limité à trois lignes.',
  },
  {
    id: 'opportunities',
    label: '05 / Opportunités',
    image: 'web-20260924-parity-opportunities',
    href: '/espace/opportunities',
    title: 'Votre prochain projet, plus facile à trouver.',
    text: 'Treize catégories et toutes les disciplines, dans des filtres dépliables. Professionnels et collectifs publient les annonces correspondant à leur type de compte.',
    alt: 'Capture actualisée des opportunités web : bouton Publier une annonce à droite du titre et filtres repliés au-dessus des annonces.',
  },
  {
    id: 'agenda',
    label: '06 / Agenda',
    image: 'web-20260924-parity-agenda',
    href: '/espace/agenda',
    title: 'Un mois. Toutes vos rencontres.',
    text: 'Calendrier coloré, liste filtrable et demandes de rendez-vous à valider : matchs, rendez-vous pro et événements à suivre, réunis.',
    alt: 'Capture réelle de l’agenda web : calendrier mensuel, filtres par type et demandes de rendez-vous dépliables.',
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
