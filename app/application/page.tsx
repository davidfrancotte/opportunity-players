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
  ShieldCheck,
  Gift,
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
    text: 'Retrouvez des joueurs par sport, niveau, classement et club actuel ou passé. Un même profil peut réunir plusieurs disciplines, chacune avec son parcours. Puis passez du réseau au terrain : proposez un lieu et plusieurs dates, recueillez les disponibilités et confirmez votre match une fois l’effectif réuni.',
    tools: [
      'Filtres sport, niveau, classement et club',
      'Profils à découvrir',
      'Suivi de vos contacts',
      'Organisation de matchs et choix des créneaux',
      'Invitations avec +1 et effectif total ajustable',
      'Matchs ouverts à 50 km, sur candidature',
      'Agenda, confirmations et notifications',
    ],
    benefits: [
      'Trouvez des partenaires d’un niveau adapté, y compris dans votre deuxième sport. Invitez vos contacts, répondez à plusieurs dates et venez avec un ami si les +1 sont autorisés.',
      'Identifiez les joueurs selon leur discipline et leur expérience en club, puis réunissez-les sur un créneau qui convient au groupe.',
      'Repérez des parcours pertinents pour votre collectif. Organisez vos matchs, ajustez l’effectif total et validez les candidats extérieurs.',
    ],
    limit:
      'Découvrir et suivre des profils, ainsi que répondre à une invitation personnelle, reste gratuit. Créer un match et voir les invitations ouvertes à 50 km nécessite Premium. L’organisateur et les +1 sont compris dans l’effectif total ; les candidatures externes ne comptent qu’après acceptation. Notifications et rencontres simulées dans cette démo.',
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: MessageCircle,
    title: 'Une rencontre commence par un échange.',
    text: 'Retrouvez vos conversations, contactez un profil depuis le réseau et gardez la main sur vos échanges. Un accès au signalement et au blocage est disponible dans chaque conversation, avec un suivi dans l’espace Sécurité.',
    tools: [
      'Conversations regroupées',
      'Recherche dans les contacts',
      'Contact depuis un profil',
      'Signalement confidentiel et blocage',
      'Alerte lorsqu’un texte est filtré',
    ],
    benefits: [
      'Présentez votre projet, demandez un conseil ou échangez avec un club : cinq messages envoyés par mois en gratuit.',
      'Avec Premium, échangez avec les joueurs, recevez les demandes et poursuivez vos conversations.',
      'Avec Premium, recevez les prises de contact et dialoguez avec les joueurs autour de vos projets.',
    ],
    limit:
      'Le quota sportif porte sur chaque message envoyé. Un texte bloqué ne le consomme pas. Les professionnels et collectifs doivent être abonnés pour recevoir des messages. Le filtre local est illustratif et non exhaustif ; aucune modération réelle ni aucun envoi dans cette démo.',
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
    title: 'Tous vos sports. Un parcours qui vous ressemble.',
    text: 'Tennis, padel, football… Chaque discipline garde son niveau, son classement et ses clubs actuels ou passés. Complétez votre dossier avec un CV et des références, déclarez votre agent et rendez visible le lien avec son profil.',
    tools: [
      'Plusieurs sports, niveaux et classements distincts',
      'Clubs actuels et expériences passées',
      'CV et références associés au parcours',
      'Agent déclaré et confirmation réciproque',
      'Avis professionnels par expérience et par sport',
    ],
    benefits: [
      'Montrez votre progression dans chaque discipline sans mélanger les classements. Donnez du contexte à vos expériences et à votre représentation.',
      'Consultez les parcours et, avec Premium, soumettez un avis factuel sur une expérience que vous connaissez. Les notes sont séparées par sport.',
      'Comprenez les niveaux, clubs et références des joueurs pour préparer des prises de contact pertinentes. Les classements déclarés restent distincts des avis.',
    ],
    limit:
      'Profil gratuit. Les nouveaux documents restent en attente et ne sont pas téléversés dans la démo. Un agent déclaré n’est pas un lien vérifié. Les avis passent par une validation simulée ; un avis contesté sort du score. Les classements ne sont pas certifiés par une fédération.',
  },
  {
    id: 'securite',
    name: 'Confiance',
    icon: ShieldCheck,
    title: 'Un réseau sportif. Un cadre de respect.',
    text: 'L’expérience prévoit le filtrage des contenus abusifs et des photos sans lien avec le sport, avec un recours humain. Dans la démo, testez les alertes, signalez un comportement et gérez vos blocages depuis un espace dédié.',
    tools: ['Signalements et suivi', 'Blocage des échanges', 'Photos en attente avant publication', 'Vérification e-mail et seconde validation', 'Notice de confidentialité et attestation'],
    benefits: [
      'Gardez la main sur les personnes qui peuvent échanger avec vous et signalez un comportement abusif.',
      'Distinguez les informations déclarées des liens et expériences qui devront être vérifiés.',
      'Présentez votre structure dans un cadre commun : contenus sportifs, informations sincères et règles de respect.',
    ],
    limit: 'Aucune protection de production n’est active. Le filtre de texte reconnaît seulement quelques exemples ; les photos ne sont pas analysées et restent non publiées. Vérification e-mail, second facteur et traitement des signalements sont simulés. La politique définitive et les contrôles serveur restent à mettre en place.',
  },
  {
    id: 'parrainage',
    name: 'Parrainage',
    icon: Gift,
    title: 'Votre réseau grandit. Vos possibilités aussi.',
    text: 'Invitez d’autres membres à rejoindre le réseau et suivez leur progression : e-mail vérifié, profil complété, première connexion. La proposition de parrainage prévoit trois mois Premium pour chaque nouveau membre qualifié.',
    tools: ['Lien d’invitation personnel', 'Suivi des étapes du filleul', 'Trois mois Premium simulés', 'Un seul crédit par filleul'],
    benefits: [
      'Invitez vos partenaires de jeu et découvrez les possibilités Premium grâce à votre réseau.',
      'Faites découvrir votre espace sportif à vos contacts, sans récompense attribuée au simple clic.',
      'Mobilisez votre communauté autour de la plateforme et visualisez les étapes des invitations.',
    ],
    limit: 'Offre proposée, conditions commerciales et antifraude à valider. Le lien ne suit aucune inscription réelle. Les étapes, les mois gagnés et l’activation Premium sont simulés, sans effet sur un abonnement facturé.',
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
            communauté à portée de main. Vos disciplines, vos références et votre
            agent vous suivent dans un même profil.
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
                  src={`/app-visuals/studio-${id === 'reseau' ? 'reseau-niveaux' : id === 'profil' ? 'disciplines' : id}.png`}
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
          formule Premium. Invitez également votre réseau et explorez le
          parrainage depuis votre profil.
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
