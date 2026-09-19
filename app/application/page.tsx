import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  House,
  UsersRound,
  MessageCircle,
  Compass,
  UserRound,
  Check,
} from 'lucide-react';
import { AppPhone } from '@/components/app-showcase';
import { AppPhoneStage } from '@/components/app-phone-stage';
import './application.css';

export const metadata: Metadata = {
  title: 'L’application — Opportunity Players',
  description:
    'Accueil sportif, réseau, messages, opportunités et profil : découvrez l’application Arena Studio et ses bénéfices pour les sportifs, professionnels et collectifs.',
};
const features = [
  {
    id: 'accueil',
    name: 'Accueil',
    icon: House,
    title: 'Votre sport fait l’actualité.',
    text: 'Un fil de publications pour suivre les acteurs de votre discipline. Filtrez par sport, réagissez et partagez les moments qui font avancer votre parcours.',
    tools: [
      'Filtrer par sport',
      'Aimer et commenter',
      'Publier du texte et une image',
    ],
    benefits: [
      'Inspirez-vous de votre communauté et, avec Premium, partagez vos progrès et vos temps forts.',
      'Partagez vos méthodes et votre expertise. Avec Premium, ouvrez la discussion sous vos publications.',
      'Faites vivre la vie du club et vos projets. Avec Premium, recueillez les commentaires de votre communauté.',
    ],
    limit:
      'Sportifs : publication réservée au Premium. Professionnels et collectifs : publication possible gratuitement ; réception de commentaires réservée au Premium.',
  },
  {
    id: 'reseau',
    name: 'Réseau',
    icon: UsersRound,
    title: 'Les bonnes personnes. Le même terrain.',
    text: 'Retrouvez des joueurs, des professionnels et des collectifs, puis passez du réseau au terrain avec Jouer ensemble. Organisez un match, précisez le lieu et proposez plusieurs dates : vos invités indiquent leurs disponibilités, vous confirmez le créneau une fois l’effectif réuni.',
    tools: [
      'Recherche et filtres',
      'Profils à découvrir',
      'Suivi de vos contacts',
      'Organisation de matchs et choix des créneaux',
      'Invitations avec +1 et effectif total ajustable',
      'Matchs ouverts à 50 km, sur candidature',
      'Agenda, confirmations et notifications',
    ],
    benefits: [
      'Trouvez des partenaires de jeu, invitez vos contacts ou proposez de rejoindre un match près de chez vous. Répondez à plusieurs dates et venez avec un ami si les +1 sont autorisés.',
      'Rassemblez les joueurs autour d’un match et choisissez un créneau qui convient au groupe. Gardez les candidatures, les réponses et l’effectif dans un même espace.',
      'Organisez les matchs de votre communauté, définissez le nombre total de participants et validez les candidats extérieurs avant de confirmer le rendez-vous.',
    ],
    limit:
      'Découvrir et suivre des profils, ainsi que répondre à une invitation personnelle, reste gratuit. Créer un match et voir les invitations ouvertes à 50 km nécessite Premium. L’organisateur et les +1 sont compris dans l’effectif total ; les candidatures externes ne comptent qu’après acceptation. Notifications et rencontres simulées dans cette démo.',
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: MessageCircle,
    title: 'Une rencontre commence par un échange.',
    text: 'Retrouvez vos conversations au même endroit, recherchez un échange et contactez un profil depuis le réseau. Un espace dédié pour passer de l’intérêt à la discussion.',
    tools: [
      'Conversations regroupées',
      'Recherche dans les contacts',
      'Contact depuis un profil',
    ],
    benefits: [
      'Présentez votre projet, demandez un conseil ou échangez avec un club : cinq messages envoyés par mois en gratuit.',
      'Avec Premium, échangez avec les joueurs, recevez les demandes et poursuivez vos conversations.',
      'Avec Premium, recevez les prises de contact et dialoguez avec les joueurs autour de vos projets.',
    ],
    limit:
      'Le quota sportif porte sur chaque message envoyé, pas sur le nombre de conversations. Les professionnels et collectifs doivent être abonnés pour recevoir des messages, quel que soit l’abonnement de l’expéditeur.',
  },
  {
    id: 'opportunities',
    name: 'Opportunities',
    icon: Compass,
    title: 'Votre prochain chapitre se trouve ici.',
    text: 'Explorez une sélection d’opportunités de coaching, de recrutement, de partenariat et de sponsoring. Filtrez par discipline et type, ouvrez les détails et gardez vos favoris.',
    tools: [
      'Filtres par sport et type',
      'Détail des opportunités',
      'Enregistrement en favoris',
    ],
    benefits: [
      'Repérez une opportunité pertinente pour progresser ou rejoindre un nouveau projet.',
      'Découvrez des besoins d’accompagnement et des pistes de collaboration dans votre domaine.',
      'Identifiez des projets et des partenaires susceptibles d’accompagner le développement de votre collectif.',
    ],
    limit:
      'Dans cette démo, les annonces sont fictives et l’expression d’intérêt est simulée : aucune candidature n’est transmise.',
  },
  {
    id: 'profil',
    name: 'Profil',
    icon: UserRound,
    title: 'Bien plus qu’un nom sur une feuille de match.',
    text: 'Rassemblez votre présentation, votre sport, vos compétences, vos objectifs, votre parcours et vos médias. Un profil qui donne du contexte à chaque nouvelle rencontre.',
    tools: [
      'Présentation et objectifs',
      'Parcours et expériences',
      'Galerie de médias',
    ],
    benefits: [
      'Mettez votre parcours en valeur et expliquez ce que vous recherchez pour la suite.',
      'Rendez votre expertise et votre manière d’accompagner les sportifs plus faciles à comprendre.',
      'Présentez votre structure, vos activités et votre projet pour attirer les bons interlocuteurs.',
    ],
    limit:
      'Création du profil gratuite. Le parcours d’inscription de démonstration comprend une étape de vérification d’e-mail simulée, sans envoi réel.',
  },
];
const roles = ['Sportifs', 'Professionnels', 'Collectifs'];

export default function Page() {
  return (
    <main id="main" className="application-page">
      <section className="application-hero section">
        <div className="application-hero-copy">
          <span className="section-label">L’APPLICATION / ARENA STUDIO</span>
          <h1>
            Tout votre sport.
            <br />
            Tout votre réseau.
            <br />
            <em>Dans votre poche.</em>
          </h1>
          <p>
            Un réseau professionnel pensé pour celles et ceux qui font le sport.
            Du premier contact à la prochaine opportunité, gardez votre
            communauté à portée de main.
          </p>
          <div className="application-actions">
            <Link href="/espace/connexion" className="action">
              Essayer l’expérience <ArrowUpRight size={18} />
            </Link>
            <Link href="#fonctionnalites" className="text-link">
              Découvrir les fonctionnalités ↓
            </Link>
          </div>
          <small>
            Écrans réels de la démo Arena Studio. Les fonctionnalités présentées
            ici sont simulées, sans publication, message ou paiement réel.
          </small>
        </div>
        <AppPhoneStage duo={false}>
          <span className="app-stage-word" aria-hidden="true">
            <span>PLAY.</span>
            <span>CONNECT.</span>
            <span>GROW.</span>
          </span>
          <div className="app-phone-scene">
            <div className="app-phone-primary">
              <AppPhone
                label="Accueil de la démo Arena Studio"
                screenSrc="/app-visuals/studio-accueil.png"
              />
            </div>
          </div>
          <figcaption>
            <span>VOTRE APP / 5 ESPACES</span>
            <span>ARENA STUDIO</span>
          </figcaption>
        </AppPhoneStage>
      </section>
      <nav
        className="application-index"
        aria-label="Fonctionnalités de l’application"
      >
        {features.map(({ id, name, icon: Icon }, i) => (
          <Link key={id} href={`#${id}`}>
            <span>0{i + 1}</span>
            <Icon size={18} />
            {name}
          </Link>
        ))}
      </nav>
      <section id="fonctionnalites" className="section application-intro">
        <span className="section-label">UNE APP. TROIS FAÇONS D’AVANCER.</span>
        <h2>
          Le même réseau.
          <br />
          <em>Votre propre ambition.</em>
        </h2>
        <p>
          Sportif, professionnel ou collectif : chaque espace répond à un besoin
          concret de votre parcours.
        </p>
      </section>
      <div className="application-features">
        {features.map(
          (
            { id, name, icon: Icon, title, text, tools, benefits, limit },
            i,
          ) => (
            <section id={id} key={id} className="section application-feature">
              <figure className="application-capture">
                <Image
                  unoptimized
                  src={`/app-visuals/studio-${id === 'reseau' ? 'jouer' : id}.png`}
                  alt={`Écran ${name} de l’application Arena Studio : capture réelle de la démo mobile`}
                  width={390}
                  height={844}
                  loading="lazy"
                />
                <figcaption>
                  0{i + 1} / {name.toUpperCase()} · ÉCRAN DE DÉMONSTRATION
                </figcaption>
              </figure>
              <div className="application-feature-copy">
                <span className="section-label">
                  <Icon size={17} /> 0{i + 1} / {name.toUpperCase()}
                </span>
                <h2>{title}</h2>
                <p className="feature-description">{text}</p>
                <ul className="application-tools">
                  {tools.map((tool) => (
                    <li key={tool}>
                      <Check size={13} />
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="application-benefits">
                  {benefits.map((benefit, index) => (
                    <article key={roles[index]}>
                      <h3>{roles[index]}</h3>
                      <p>{benefit}</p>
                    </article>
                  ))}
                </div>
                <p className="application-feature-note">{limit}</p>
                {id === 'reseau' && (
                  <Link
                    className="action application-play-action"
                    href="/espace/jouer"
                  >
                    Découvrir Jouer ensemble <ArrowUpRight size={18} />
                  </Link>
                )}
                <Link className="text-link" href={`/espace/${id}`}>
                  Explorer{' '}
                  {name === 'Opportunities'
                    ? 'les opportunités'
                    : name.toLowerCase()}{' '}
                  dans la démo <ArrowUpRight size={16} />
                </Link>
              </div>
            </section>
          ),
        )}
      </div>
      <section className="section application-cta">
        <span className="section-label">LE PREMIER PAS EST GRATUIT</span>
        <h2>
          Votre place dans le sport.
          <br />
          <em>Vos possibilités en plus.</em>
        </h2>
        <p>
          Créez votre profil gratuitement. Choisissez ensuite les échanges et
          les possibilités de publication adaptés à votre activité avec une
          formule Premium.
        </p>
        <div className="application-actions">
          <Link href="/espace/inscription" className="action">
            Essayer la création de compte <ArrowUpRight size={18} />
          </Link>
          <Link href="/tarifs" className="text-link">
            Comparer les formules →
          </Link>
        </div>
        <small>
          La démo ne crée pas de compte réel. Les tarifs des formules sont
          présentés sur la page dédiée.
        </small>
      </section>
    </main>
  );
}
