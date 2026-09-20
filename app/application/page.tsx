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
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
} from 'lucide-react';
import { AppPhone } from '@/components/app-showcase';
import { AppPhoneStage } from '@/components/app-phone-stage';
import './application.css';

export const metadata: Metadata = {
  title: 'L’application — Opportunity Players',
  description:
    'Recommandations, candidatures, essais, recrutement et rendez-vous : découvrez Arena Studio et ses bénéfices pour les sportifs, professionnels et collectifs.',
};
const features = [
  {
    id: 'accueil',
    name: 'Accueil',
    icon: House,
    title: 'Votre sport fait l’actualité.',
    text: 'Un fil sportif et des recommandations de personnes et d’opportunités selon vos sports, votre ville et votre pays. Comprenez pourquoi un profil vous est proposé, ajustez vos préférences et suivez les contacts qui correspondent à votre projet.',
    tools: [
      'Filtrer par sport',
      'Aimer et commenter',
      'Publier du texte et une image',
      'Recommandations expliquées et préférences modifiables',
    ],
    benefits: [
      'Découvrez des personnes et des recherches liées à votre pratique. Avec Premium, partagez aussi vos progrès.',
      'Repérez des missions pertinentes et développez votre réseau autour de vos disciplines et de votre localisation.',
      'Découvrez des acteurs de votre écosystème et faites connaître la vie du club. Avec Premium, ouvrez les échanges.',
    ],
    limit:
      'Sportifs et collectifs : création de publications avec Premium. Professionnels : publication gratuite. Commentaires, réactions et partages gratuits pour tous. Programmation des publications avec Premium.',
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
      'Demande de rendez-vous depuis un profil professionnel',
    ],
    benefits: [
      'Trouvez des partenaires d’un niveau adapté, y compris dans votre deuxième sport. Invitez vos contacts, répondez à plusieurs dates et venez avec un ami si les +1 sont autorisés.',
      'Identifiez les joueurs selon leur discipline et leur expérience en club, puis réunissez-les sur un créneau qui convient au groupe.',
      'Repérez des parcours pertinents pour votre collectif. Organisez vos matchs, ajustez l’effectif total et validez les candidats extérieurs.',
    ],
    limit:
      'Un événement créé par mois est inclus gratuitement. La découverte des matchs ouverts est Premium pour les sportifs, gratuite à 50 km pour les professionnels et collectifs. Premium ajoute rayon personnalisable, recherches favorites avec alertes et récurrence. Organisateur et +1 comptent dans l’effectif total ; les candidatures externes nécessitent un accord. Rencontres et notifications simulées.',
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
      'Initiez trois nouvelles conversations par mois gratuitement ; poursuivez les échanges déjà engagés sans décompter chaque réponse.',
      'Recevez et répondez gratuitement. Initiez trois nouvelles conversations par mois en gratuit, cent avec Premium.',
      'Recevez et répondez gratuitement. Cinq nouvelles conversations par mois en gratuit, deux cents partagées entre gestionnaires avec Premium.',
    ],
    limit:
      'Seul le premier message à un nouvel interlocuteur consomme un quota. Réceptions, réponses et interactions sont gratuites pour tous. Un texte bloqué ne consomme rien. Filtre local illustratif, sans modération réelle ni envoi dans la démo.',
  },
  {
    id: 'opportunities',
    name: 'Opportunities',
    icon: Compass,
    title: 'Votre prochain chapitre se trouve ici.',
    text: 'Explorez des opportunités de coaching, de recrutement, de partenariat et de sponsoring. Gardez vos favoris et, pour les recherches ouvertes à votre catégorie de profil, candidatez avec votre dossier. Retrouvez ensuite la réponse et les éventuelles invitations à un essai dans votre suivi.',
    tools: [
      'Filtres par sport et type',
      'Détail des opportunités',
      'Enregistrement en favoris',
      'Candidatures structurées et suivi des réponses',
    ],
    benefits: [
      'Repérez une opportunité pertinente pour progresser ou rejoindre un nouveau projet.',
      'Découvrez des besoins d’accompagnement et des pistes de collaboration dans votre domaine.',
      'Identifiez des projets et des partenaires susceptibles d’accompagner le développement de votre collectif.',
    ],
    limit:
      'Les candidatures et leurs statuts sont interactifs dans la démo, sans envoi réel. Les annonces de partenariat et de sponsoring conservent une expression d’intérêt simulée.',
  },
  {
    id: 'candidatures',
    name: 'Candidatures',
    icon: ClipboardCheck,
    title: 'Du dossier à votre prochain essai.',
    text: 'Partagez un résumé de votre parcours avec le recruteur, suivez votre candidature puis répondez à une invitation. Une fois votre présence confirmée, retrouvez l’essai, sa date et son lieu dans votre agenda.',
    tools: [
      'Dossier partagé après confirmation',
      'Statuts : envoyé, présélectionné, invité, confirmé',
      'Date et lieu de l’essai',
      'Retrait de candidature et notifications',
    ],
    benefits: [
      'Présentez votre expérience sans tout ressaisir et sachez où en est votre candidature.',
      'Candidatez aux missions de votre catégorie et centralisez le suivi de vos démarches.',
      'Recevez des dossiers structurés et préparez une rencontre avec les candidats retenus.',
    ],
    limit:
      'Seuls le nom et le résumé sportif sont partagés dans cette démo, sans coordonnées, date de naissance ni numéro de licence. Aucun dossier n’est envoyé à un recruteur réel.',
  },
  {
    id: 'recrutement',
    name: 'Recrutement',
    icon: BriefcaseBusiness,
    title: 'Les bons profils. Une sélection plus claire.',
    text: 'Clubs et professionnels : publiez une recherche en précisant sport, ville, niveau et poste souhaités. Consultez les dossiers reçus, présélectionnez les candidats, proposez un essai et suivez les confirmations depuis un espace commun.',
    tools: [
      'Création et clôture des recherches',
      'Dossiers reçus et filtres par statut',
      'Présélection et invitations aux essais',
      'Confirmation du candidat dans l’agenda',
    ],
    benefits: [
      'Répondez à un besoin explicite et recevez une invitation concrète plutôt qu’un simple contact sans suite.',
      'Structurez votre recherche de talents et préparez vos essais avec les personnes présélectionnées.',
      'Centralisez vos recherches et les réponses pour mieux préparer la constitution de votre équipe.',
    ],
    limit:
      'Un collectif gratuit peut publier une offre et traiter ses candidatures ; les offres professionnelles et le suivi avancé sont Premium. Les extensions ajoutent viviers avec notes privées, essais groupés, attribution des candidats et permissions de gestionnaires. Aucun recrutement réel dans la démo.',
  },
  {
    id: 'rendez-vous',
    name: 'Rendez-vous',
    icon: CalendarDays,
    title: 'Un accord. Puis le bon créneau.',
    text: 'Depuis le profil d’un professionnel, demandez un rendez-vous en précisant l’objet de l’échange. Le professionnel accepte ou décline. Après son accord seulement, vous accédez aux disponibilités et choisissez votre séance.',
    tools: [
      'Demande depuis le réseau',
      'Acceptation préalable du professionnel',
      'Créneaux disponibles de 30 minutes',
      'Réservation, annulation et notifications',
    ],
    benefits: [
      'Trouvez un moment pour parler de votre progression avec un professionnel, sans multiplier les messages.',
      'Gardez la main sur les demandes reçues et proposez vos disponibilités uniquement après acceptation.',
      'Demandez un échange à un professionnel pour préparer l’accompagnement de votre structure.',
    ],
    limit:
      'Un professionnel gratuit peut confirmer trois rendez-vous par mois, contre cent avec Premium. Les créneaux restent masqués avant acceptation. Premium ajoute disponibilités récurrentes et agenda avancé. La connexion externe est simulée ; l’export .ics contient les événements fictifs. Aucun rendez-vous réel.',
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
      'Consultez les parcours et soumettez un avis factuel sur une expérience que vous connaissez. Les notes sont séparées par sport.',
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
    tools: [
      'Signalements et suivi',
      'Blocage des échanges',
      'Photos en attente avant publication',
      'Vérification e-mail et seconde validation',
      'Notice de confidentialité et attestation',
    ],
    benefits: [
      'Gardez la main sur les personnes qui peuvent échanger avec vous et signalez un comportement abusif.',
      'Distinguez les informations déclarées des liens et expériences qui devront être vérifiés.',
      'Présentez votre structure dans un cadre commun : contenus sportifs, informations sincères et règles de respect.',
    ],
    limit:
      'Aucune protection de production n’est active. Le filtre de texte reconnaît seulement quelques exemples ; les photos ne sont pas analysées et restent non publiées. Vérification e-mail, second facteur et traitement des signalements sont simulés. La politique définitive et les contrôles serveur restent à mettre en place.',
  },
  {
    id: 'parrainage',
    name: 'Parrainage',
    icon: Gift,
    title: 'Votre réseau grandit. Vos possibilités aussi.',
    text: 'Invitez d’autres membres à rejoindre le réseau et suivez leur progression : e-mail vérifié, profil complété, première connexion. La proposition de parrainage prévoit trois mois Premium pour chaque nouveau membre qualifié.',
    tools: [
      'Lien d’invitation personnel',
      'Suivi des étapes du filleul',
      'Trois mois Premium simulés',
      'Un seul crédit par filleul',
    ],
    benefits: [
      'Invitez vos partenaires de jeu et découvrez les possibilités Premium grâce à votre réseau.',
      'Faites découvrir votre espace sportif à vos contacts, sans récompense attribuée au simple clic.',
      'Mobilisez votre communauté autour de la plateforme et visualisez les étapes des invitations.',
    ],
    limit:
      'Offre proposée, conditions commerciales et antifraude à valider. Le lien ne suit aucune inscription réelle. Les étapes, les mois gagnés et l’activation Premium sont simulés, sans effet sur un abonnement facturé.',
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
            communauté à portée de main. Des recommandations pertinentes, un
            dossier pour candidater, des essais et des rendez-vous pour avancer.
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
            <span>{String(i + 1).padStart(2, '0')}</span>
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
                  src={`/app-visuals/studio-${id === 'accueil' ? 'recommandations' : id === 'reseau' ? 'reseau-niveaux' : id === 'profil' ? 'disciplines' : id}.png`}
                  alt={`Écran ${name} de l’application Arena Studio : capture réelle de la démo mobile`}
                  width={390}
                  height={844}
                  loading="lazy"
                />
                <figcaption>
                  {String(i + 1).padStart(2, '0')} / {name.toUpperCase()} ·
                  ÉCRAN DE DÉMONSTRATION
                </figcaption>
              </figure>
              <div className="application-feature-copy">
                <span className="section-label">
                  <Icon size={17} /> {String(i + 1).padStart(2, '0')} /{' '}
                  {name.toUpperCase()}
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
          formule Premium. Professionnels et collectifs : découvrez aussi les
          outils de recrutement et, pour les professionnels, la gestion des
          demandes de rendez-vous.
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
