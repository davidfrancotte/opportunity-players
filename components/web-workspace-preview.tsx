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
    image: 'web-20260922-profil',
    href: '/espace/profil',
    title: 'Vos sports, vos niveaux, vos clubs.',
    text: 'Un dossier multisport, vos références et votre agent : donnez du contexte à votre profil.',
    alt: 'Interface web Arena en mode clair : profil sportif, disciplines et classements distincts, clubs et accès aux références et à l’agent.',
  },
  {
    id: 'reseau',
    label: '02 / Les bons profils',
    image: 'web-20260922-reseau',
    href: '/espace/reseau',
    title: 'Une recherche qui connaît votre terrain.',
    text: 'Recherchez un membre, suivez ses publications ou envoyez une demande Connect. Avec Premium, affinez par pays, ville, sport et classement.',
    alt: 'Interface web actualisée en mode clair : recherche, filtres Premium dépliés, invitations et suggestions de membres.',
  },
  {
    id: 'messages',
    label: '03 / Mes échanges',
    image: 'web-20260922-messages',
    href: '/espace/messages',
    title: 'Une conversation peut tout changer.',
    text: 'Après acceptation de votre connexion, échangez sans quota et préparez vos prochaines rencontres.',
    alt: 'Messagerie web Arena en mode clair : trois conversations fictives avec Noah Laurent, Horizon Padel et Léa Moreau, et un échange ouvert autour d’une séance de padel.',
  },
  {
    id: 'accueil',
    label: '04 / Ma communauté',
    image: 'web-20260922-accueil',
    href: '/espace/accueil',
    title: 'Votre communauté, au premier plan.',
    text: 'Un fil centré sur les membres suivis. Ouvrez les posts complets, importez photos et vidéos et programmez vos publications avec Premium.',
    alt: 'Capture réelle du fil communautaire web en mode clair, avec publication et aperçu limité à trois lignes.',
  },
  {
    id: 'opportunities',
    label: '05 / Opportunités',
    image: 'web-20260922-opportunities',
    href: '/espace/opportunities',
    title: 'Votre prochain projet, plus facile à trouver.',
    text: 'Coaching, recrutement, partenariat, sponsoring et essais groupés : trouvez les annonces pertinentes et suivez vos démarches.',
    alt: 'Capture réelle des opportunités web avec les six catégories, dont Essais groupés.',
  },
  {
    id: 'agenda',
    label: '06 / Agenda',
    image: 'web-20260922-agenda',
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
