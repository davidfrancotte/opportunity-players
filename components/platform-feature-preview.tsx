'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FileUser, Users, BriefcaseBusiness, MessageCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import './platform-feature-preview.css';

const features = [
  {
    id: 'profil', label: 'Profil & CV', icon: FileUser,
    title: 'Votre parcours. Dans toutes ses dimensions.',
    text: 'Sportif, professionnel ou collectif : présentez ce qui vous distingue et donnez aux bonnes personnes les informations utiles pour vous rencontrer.',
    points: [
      'Plusieurs sports, avec niveaux, classements, postes et clubs propres à chaque discipline.',
      'Disponibilité, situation contractuelle, palmarès, licence et relation confirmée avec un agent.',
      'CV, références, photos et vidéos pour donner du contexte à vos expériences, selon votre formule.',
      'Handisport, profil enfant accompagné et contrôle de la visibilité des informations personnelles.',
    ],
    href: '/espace/profil', action: 'Explorer le profil',
    image: 'platform-profil-current',
    alt: 'Capture de la démo web Arena en mode clair : profil d’un coach, parcours et accès au dossier sportif, aux références et à l’agent.',
  },
  {
    id: 'reseau', label: 'Réseau', icon: Users,
    title: 'Les bons profils. Et l’occasion de jouer ensemble.',
    text: 'Trouvez des sportifs, des professionnels et des structures selon votre pratique, votre localisation et votre projet. Les recommandations expliquent pourquoi un profil peut vous correspondre.',
    points: [
      'Recherche par sport, pays, ville, âge, genre, handisport, niveau et métier ou type de structure.',
      'Filtres avancés par poste, latéralité, classement, club, disponibilité et contrat avec Premium.',
      'Recherches favorites, alertes et listes de talents avec notes privées selon votre formule.',
      'Invitations à jouer : dates proposées, lieu, effectif total, +1 et confirmation de l’organisateur.',
    ],
    href: '/espace/reseau', action: 'Explorer le réseau',
    image: 'platform-reseau-current',
    alt: 'Capture de la démo web Arena en mode clair : recherche de membres, filtres et profils sportifs fictifs.',
  },
  {
    id: 'opportunites', label: 'Opportunités', icon: BriefcaseBusiness,
    title: 'De l’opportunité à la candidature. Puis au terrain.',
    text: 'Découvrez les recherches de joueurs, missions et collaborations. Les sportifs et professionnels suivent leurs démarches ; les recruteurs organisent leurs besoins et leurs réponses.',
    points: [
      'Annonces et recommandations personnalisées consultables gratuitement.',
      'Candidatures avec dossier partagé sur accord et suivi du statut avec Premium.',
      'Offres, présélection, invitations individuelles à des essais et sessions groupées selon la formule.',
      'Pour les collectifs Premium : gestionnaires, permissions, commentaires internes et entretiens coordonnés.',
    ],
    href: '/espace/opportunities', action: 'Explorer les opportunités',
    image: 'platform-opportunities-current',
    alt: 'Capture de la démo web Arena en mode clair : opportunités sportives, filtres, favoris et accès aux candidatures.',
  },
  {
    id: 'messages', label: 'Messages', icon: MessageCircle,
    title: 'Un premier contact. Une conversation qui continue.',
    text: 'Retrouvez vos échanges au même endroit, poursuivez une candidature ou préparez une rencontre. La réception des messages et les réponses restent gratuites pour chaque catégorie.',
    points: [
      'Le quota porte sur les nouveaux interlocuteurs contactés, pas sur chaque réponse.',
      'Demande de rendez-vous : le professionnel accepte avant de donner accès à ses disponibilités.',
      'Notifications et agenda pour retrouver essais, rendez-vous et matchs confirmés.',
      'Blocage, signalement et parcours de modération pour encadrer les échanges.',
    ],
    href: '/espace/messages', action: 'Explorer la messagerie',
    image: 'platform-messages-current',
    alt: 'Capture de la messagerie web Arena en mode clair, avec liste de conversations et échanges fictifs.',
  },
];

export function PlatformFeaturePreview() {
  return (
    <Tabs defaultValue="profil" className="platform-features">
      <TabsList className="platform-feature-tabs" aria-label="Explorer les fonctions de la plateforme">
        {features.map(({id,label,icon:Icon}) => <TabsTrigger key={id} value={id}><Icon size={17}/>{label}</TabsTrigger>)}
      </TabsList>
      {features.map(f => (
        <TabsContent key={f.id} value={f.id}>
          <div className="platform-feature-intro">
            <div><span className="section-label">{f.label.toUpperCase()}</span><h2>{f.title}</h2><p>{f.text}</p>
              <Link className="action" href={f.href}>{f.action}<ArrowUpRight size={18}/></Link>
            </div>
            <ul>{f.points.map(p=><li key={p}>{p}</li>)}</ul>
          </div>
          <figure className="platform-feature-visual">
            <div className="platform-feature-bar"><span>OP / VOTRE ESPACE WEB</span><span>APERÇU EN MODE CLAIR</span></div>
            <Link href={f.href} aria-label={f.action + ' dans la démo'}>
              <Image unoptimized src={`/app-visuals/${f.image}.png`} alt={f.alt} width={1440} height={1000} loading="lazy"/>
            </Link>
            <figcaption>Capture de la démo actuelle · profils et échanges fictifs. Ouvrez cet espace pour essayer les interactions.</figcaption>
          </figure>
        </TabsContent>
      ))}
      <p className="platform-feature-note">Les accès et limites varient selon le profil et la formule. <Link href="/tarifs">Comparer Gratuit et Premium</Link>.</p>
    </Tabs>
  );
}
