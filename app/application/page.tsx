import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight,
  House,
  UsersRound,
  MessageCircle,
  Compass,
  UserRound,
  Check,
  CalendarDays,
  ImagePlus,
  Volleyball,
  Settings,
} from 'lucide-react';
import { ApplicationVisualTheme, ApplicationVisualToggle, ApplicationCapture, ApplicationHeroPhone } from '@/components/application-visual-theme';
import { AppPhoneStage } from '@/components/app-phone-stage';
import './application.css';

export const metadata: Metadata = {
  title: 'L’application — Opportunity Players',
  description:
    'Votre communauté, vos connexions, vos matchs et un agenda commun : découvrez l’expérience Arena sur mobile et sur ordinateur.',
};
const features = [
  {
    id: 'accueil',
    name: 'Accueil',
    location: 'Accueil · votre communauté',
    capture: 'Compte Premium · filtres du fil ouverts',
    route: 'accueil',
    icon: House,
    title: 'Votre sport fait l’actualité.',
    text: 'L’accueil se concentre sur les publications de votre communauté. Lisez les trois premières lignes, puis ouvrez le post complet. Partagez du texte avec une photo ou une vidéo importée depuis votre appareil ; choisissez une discipline ou « - » pour un sujet transversal.',
    tools: [
      'Premium : matchs ouverts, emplois, opportunités, news et divers',
      'Aimer et commenter',
      'Importer une photo ou une vidéo avec aperçu',
      'Programmer une publication avec Premium',
    ],
    benefits: [
      'Retrouvez les personnes que vous suivez et partagez vos progrès selon votre offre.',
      'Publiez vos actualités et importez vos propres images ou vidéos. Programmez vos publications avec Premium.',
      'Faites vivre la communauté de votre club et présentez vos besoins dans une catégorie d’opportunité précise.',
    ],
    limit:
      'Sportifs et collectifs : création de publications avec Premium. Professionnels : publication gratuite. Commentaires, réactions et partages gratuits pour tous. Programmation des publications avec Premium.',
  },
  {
    id: 'publier',
    name: 'Publier',
    location: 'Accueil › Créer une publication',
    capture: 'Photo importée · discipline « - » · programmation Premium',
    route: 'accueil',
    icon: ImagePlus,
    title: 'Vos images. Vos moments. Votre communauté.',
    text: 'Importez une photo ou une vidéo depuis votre appareil, vérifiez l’aperçu et retirez ou remplacez le média avant de publier. La discipline « - » est présélectionnée : votre publication n’a pas besoin d’être liée à un sport précis.',
    tools: ['Texte, photo ou vidéo importée', 'Aperçu avant publication', 'Discipline facultative, sans illustration prédéfinie', 'Option Programmer visible pour tous, activable avec Premium'],
    benefits: ['Partagez vos progrès avec vos propres médias selon votre offre.', 'Préparez une actualité et programmez sa diffusion avec Premium.', 'Annoncez la vie du club, une recherche ou un rendez-vous avec vos propres visuels.'],
    limit: 'Images JPG, PNG et WebP jusqu’à 10 Mo ; vidéos MP4 et WebM jusqu’à 50 Mo. Dans cette démo, les fichiers restent sur votre appareil et sont perdus au rechargement. La programmation nécessite de garder la démo ouverte.',
  },
  {
    id: 'reseau',
    name: 'Réseau',
    location: 'Réseau › Les membres',
    capture: 'Compte gratuit · aperçu des filtres Premium',
    route: 'reseau',
    icon: UsersRound,
    title: 'Les bonnes personnes. Le même terrain.',
    text: 'Trois espaces clairs : Les membres, Jouer ensemble et Agenda. Recherchez un nom, un rôle, un club ou une ville. Suivre affiche les publications d’un membre ; Connect lui envoie une demande qu’il doit accepter pour ouvrir les échanges sans quota et les invitations à vos matchs.',
    tools: [
      'Recherche simple et filtres Premium : pays, ville, sport, classement',
      'Invitations reçues : deux visibles, liste dépliable',
      'Suivre ou envoyer une demande Connect',
      'Jouer ensemble : Mes invitations, J’organise, À proximité',
      'À proximité et alertes de matchs réservées à Premium',
      'Rayon des matchs dans Mes invitations et À proximité',
    ],
    benefits: [
      'Suivez les sportifs qui vous intéressent et demandez une connexion pour échanger et les inviter à jouer.',
      'Affinez votre recherche avec Premium. Consultez le profil avant de proposer une connexion qui devra être acceptée.',
      'Découvrez les membres suggérés, traitez vos invitations et développez les relations de votre collectif.',
    ],
    limit:
      'Les filtres avancés se déplient pour tous, mais leur utilisation et l’onglet À proximité nécessitent Premium. Un événement créé par mois est inclus gratuitement. Une connexion doit être acceptée : suivre une personne ne suffit pas pour l’inviter directement à un match. Rencontres et notifications simulées.',
  },
  {
    id: 'jouer',
    name: 'Jouer ensemble',
    location: 'Réseau › Jouer ensemble',
    capture: 'Compte Premium · À proximité et alertes de matchs',
    route: 'jouer',
    icon: Volleyball,
    title: 'Une invitation. Un terrain. On joue.',
    text: 'Mes invitations, J’organise et À proximité : les matchs sont répartis dans trois vues, suivies du filtre Sport. Répondez à vos invitations, gérez les rencontres que vous organisez ou découvrez les matchs ouverts autour de vous avec Premium.',
    tools: ['Trois vues : Mes invitations, J’organise, À proximité', 'Filtre Sport après les trois onglets', 'Rayon dans Mes invitations et À proximité', 'Alertes de matchs uniquement dans À proximité', 'Invitations directes aux connexions acceptées'],
    benefits: ['Répondez aux invitations reçues et retrouvez vos matchs confirmés dans votre agenda.', 'Organisez une rencontre et invitez les personnes qui ont accepté votre connexion.', 'Gérez les participants, les places disponibles et les candidatures aux matchs ouverts.'],
    limit: 'À proximité et ses alertes sont réservés aux comptes Premium, quelle que soit la catégorie de profil. Les invitations personnelles restent accessibles gratuitement. Un événement créé par mois est inclus dans l’offre gratuite. Rencontres simulées dans la démo.',
  },
  {
    id: 'messages',
    name: 'Messages',
    location: 'Messages · vos conversations',
    capture: 'Une conversation ouverte dans l’application',
    route: 'messages',
    icon: MessageCircle,
    title: 'Une rencontre commence par un échange.',
    text: 'Retrouvez vos conversations et écrivez librement aux personnes qui ont accepté votre connexion. En dehors de vos connexions, les quotas de nouvelles prises de contact de votre offre restent applicables. Signalement et blocage sont accessibles dans chaque conversation.',
    tools: [
      'Conversations regroupées',
      'Recherche dans les contacts',
      'Contact depuis un profil',
      'Signalement confidentiel et blocage',
      'Alerte lorsqu’un texte est filtré',
    ],
    benefits: [
      'Échangez sans quota avec vos connexions acceptées ; suivre un membre seul ne donne pas cet accès.',
      'Poursuivez vos conversations et retrouvez rapidement les contacts avec lesquels vous travaillez.',
      'Centralisez les échanges de votre structure et bloquez ou signalez un comportement inapproprié.',
    ],
    limit:
      'Les connexions acceptées échangent sans quota. Hors connexion, seul le premier message à un nouvel interlocuteur consomme le quota de l’offre ; les réponses restent gratuites. Un texte bloqué ne consomme rien. Aucun message réel n’est envoyé dans la démo.',
  },
  {
    id: 'opportunities',
    name: 'Opportunités',
    location: 'Opportunities · annonces et essais groupés',
    capture: 'Catégorie Essais groupés sélectionnée parmi les six filtres',
    route: 'opportunities',
    icon: Compass,
    title: 'Votre prochain chapitre se trouve ici.',
    text: 'La page présente uniquement les catégories Toutes, Coaching, Recrutement, Partenariat, Sponsoring et Essais groupés, puis les annonces. Le suivi des candidatures et les outils du recruteur prolongent ces démarches : ce ne sont pas des catégories supplémentaires dans la barre de filtres.',
    tools: [
      'Six catégories, dont Essais groupés, et filtre Sport',
      'Ouvrir une annonce et l’enregistrer en favori',
      'Candidater puis suivre la réponse selon votre offre',
      'Côté recruteur : présélectionner et proposer un essai',
      'Essai confirmé retrouvé dans l’agenda',
    ],
    benefits: [
      'Repérez une recherche de joueur ou un essai, partagez votre dossier puis suivez l’avancement de votre candidature.',
      'Trouvez une mission de coaching ou une collaboration. Les outils de recrutement dépendent de votre formule.',
      'Présentez un besoin de recrutement et traitez les dossiers reçus ; explorez aussi partenariats et sponsoring.',
    ],
    limit:
      'Les accès aux candidatures, offres et essais dépendent de la catégorie de profil et de l’abonnement. Un collectif gratuit dispose d’une offre active ; les offres professionnelles sont Premium. Aucun dossier ni candidature n’est envoyé réellement dans la démo.',
  },
  {
    id: 'agenda',
    name: 'Agenda',
    location: 'Réseau › Agenda',
    capture: 'Calendrier mensuel et filtres de la liste des événements',
    route: 'agenda',
    icon: CalendarDays,
    title: 'Tout votre agenda. Au même endroit.',
    text: 'Un calendrier mensuel met en couleur les jours où un événement est prévu. En dessous, filtrez la liste entre matchs, rendez-vous professionnels et événements sportifs à suivre comme spectateur. Les demandes de rendez-vous se déplient avec un compteur des demandes non confirmées.',
    tools: [
      'Calendrier du mois et jours avec événements',
      'Filtres : matchs, rendez-vous pro et spectateur',
      'Demandes dépliables : contenu, validation ou refus',
      'Choix du créneau après acceptation, puis confirmation',
    ],
    benefits: [
      'Retrouvez vos matchs et les événements que vous souhaitez suivre comme spectateur dans un seul calendrier.',
      'Dépliez chaque demande de rendez-vous pour en lire le contenu, l’accepter ou la refuser.',
      'Filtrez les événements par catégorie ou par jour pour organiser les prochains temps forts de votre structure.',
    ],
    limit:
      'Un seul Agenda dans Réseau. Accepter une demande ne réserve pas encore un créneau : la demande reste comptée jusqu’à sa confirmation. Les outils de récurrence et d’export sont regroupés dans les options de cet agenda ; les accès dépendent de l’offre. Aucun rendez-vous réel dans la démo.',
  },
  {
    id: 'profil',
    name: 'Profil',
    location: 'Profil · votre parcours sportif',
    capture: 'Profil multisport et accès aux rubriques du parcours',
    route: 'profil',
    icon: UserRound,
    title: 'Tous vos sports. Un parcours qui vous ressemble.',
    text: 'Tennis, padel, football… Chaque discipline garde son niveau, son classement et ses clubs actuels ou passés. Complétez votre dossier avec un CV et des références, déclarez votre agent et rendez visible le lien avec son profil.',
    tools: [
      'Plusieurs sports, niveaux et classements distincts',
      'Clubs actuels et expériences passées',
      'CV, références et import de photos ou vidéos dans Médias',
      'Agent déclaré et confirmation réciproque',
      'Avis professionnels par expérience et par sport',
    ],
    benefits: [
      'Montrez votre progression dans chaque discipline sans mélanger les classements. Donnez du contexte à vos expériences et à votre représentation.',
      'Consultez les parcours et soumettez un avis factuel sur une expérience que vous connaissez. Les notes sont séparées par sport.',
      'Comprenez les niveaux, clubs et références des joueurs pour préparer des prises de contact pertinentes. Les classements déclarés restent distincts des avis.',
    ],
    limit:
      'Profil gratuit ; quotas médias selon votre formule. Photos et vidéos peuvent être importées et prévisualisées localement, sans envoi au serveur ni conservation après rechargement. Un agent déclaré n’est pas un lien vérifié ; avis et contrôles sont simulés.',
  },
  {
    id: 'medias',
    name: 'Médias',
    location: 'Profil › Médias',
    capture: 'Le bouton Ajouter un média et la galerie du profil',
    route: 'medias',
    icon: ImagePlus,
    title: 'Votre sport en images. Vos propres médias.',
    text: 'Le bouton Ajouter un média ouvre la sélection de fichiers de votre appareil. Importez une photo ou une vidéo, vérifiez son aperçu et confirmez son ajout à votre galerie. Il ne s’agit pas d’un choix d’illustrations prédéfinies.',
    tools: ['Bouton Ajouter un média', 'Import d’une photo ou d’une vidéo', 'Aperçu, confirmation et retrait du média', 'Formats, taille et quotas vérifiés selon votre offre'],
    benefits: ['Montrez vos entraînements, vos matchs et votre progression avec vos propres photos et vidéos.', 'Présentez votre travail et votre accompagnement à travers des contenus concrets.', 'Partagez les moments de votre équipe et donnez de la visibilité à votre collectif.'],
    limit: 'Dans cette démo, l’import est local : aucun fichier n’est envoyé à un serveur ni conservé au rechargement. Les quotas et les formats autorisés sont indiqués dans le formulaire.',
  },
  {
    id: 'parametres',
    name: 'Réglages',
    location: 'Réglages › Apparence et langue',
    capture: 'Thème et langue de l’application dans les réglages',
    route: 'parametres',
    icon: Settings,
    title: 'Votre app. Votre thème. Votre langue.',
    text: 'Choisissez un mode clair ou sombre et la langue de votre interface dans les réglages de l’app. Le sélecteur de langue ne prend plus de place en haut des écrans. En mode clair, les sélections reprennent le jaune citron du site ; la navigation conserve la même capsule autour de l’icône dans les deux thèmes.',
    tools: ['Modes clair et sombre', 'Français, néerlandais, allemand, espagnol, italien, portugais, polonais, turc et anglais', 'Dates et calendrier adaptés à la langue', 'Préférences mémorisées sur l’appareil'],
    benefits: ['Retrouvez vos préférences de thème et de langue à la prochaine ouverture.', 'Consultez l’interface et les calendriers dans la langue de votre choix.', 'Gardez les mêmes repères de navigation dans les deux thèmes.'],
    limit: 'Ces captures proviennent de la démo iPhone multilingue. Ses traductions sont embarquées pour fonctionner hors ligne ; les publications, messages et descriptions des profils restent dans leur langue d’origine. L’espace web de démonstration peut évoluer séparément.',
  },
];
// Match the actual five bottom-navigation destinations. Other sections describe
// nested workflows, not additional application tabs.
const primaryIds = ['accueil', 'reseau', 'messages', 'opportunities', 'profil'];
const sectionOrder = ['accueil', 'publier', 'reseau', 'jouer', 'agenda', 'messages', 'opportunities', 'profil', 'medias', 'parametres'];
const orderedFeatures = sectionOrder.map(id => features.find(feature => feature.id === id)!);
const roles = ['Sportifs', 'Professionnels', 'Collectifs'];

export default function Page() {
  return (
    <ApplicationVisualTheme>
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
            communauté à portée de main. Un fil centré sur les personnes suivies,
            des connexions acceptées, des opportunités et un agenda unique.
            Des repères d’usage familiers, proches de LinkedIn, dans une interface plus premium.
          </p>
          <ApplicationVisualToggle />
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
              <ApplicationHeroPhone />
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
        {primaryIds.map(id => features.find(feature => feature.id === id)!).map(({ id, name, icon: Icon }, i) => (
          <Link key={id} href={`#${id}`}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <Icon size={18} />
            {name}
          </Link>
        ))}
      </nav>
      <section id="fonctionnalites" className="section application-intro">
        <span className="section-label">CINQ ONGLETS. DES PARCOURS CONNECTÉS.</span>
        <h2>
          Le même réseau.
          <br />
          <em>Votre propre ambition.</em>
        </h2>
        <p>
          Accueil, Réseau, Messages, Opportunités et Profil : la présentation suit
          les cinq entrées de l’application. Publier se trouve dans Accueil ;
          Les membres, Jouer ensemble et Agenda dans Réseau ; Médias dans Profil.
          Candidatures et recrutement sont présentés avec les Opportunités.
        </p>
      </section>
      <div className="application-features">
        {orderedFeatures.map(
          (
            { id, location, capture, route, icon: Icon, title, text, tools, benefits, limit },
            i,
          ) => (
            <section id={id} key={id} className="section application-feature">
              <figure className="application-capture">
                <ApplicationCapture
                  id={id}
                  alt={`${location} : ${capture}. Capture réelle de la démo mobile.`}
                />
                <figcaption>
                  {capture} · DÉMO
                </figcaption>
              </figure>
              <div className="application-feature-copy">
                <span className="section-label">
                  <Icon size={17} /> {String(i + 1).padStart(2, '0')} /{' '}
                  {location.toUpperCase()}
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
                <Link className="text-link" href={`/espace/${route}`}>
                  {id === 'publier' ? 'Ouvrir l’accueil pour publier' : 'Explorer cet espace'}
                  {' '}dans la démo <ArrowUpRight size={16} />
                </Link>
              </div>
            </section>
          ),
        )}
      </div>
      <section className="section application-support">
        <span className="section-label">LES OUTILS COMPLÉMENTAIRES</span>
        <h2>Votre réseau, dans un cadre clair.</h2>
        <p>Le signalement, le blocage et la gestion de la confidentialité restent accessibles dans les outils du compte. Le parrainage dispose de son espace dédié : ces services ne sont pas des onglets supplémentaires de la navigation principale.</p>
        <div className="application-actions">
          <Link href="/espace/securite" className="text-link">Confiance et sécurité <ArrowUpRight size={16} /></Link>
          <Link href="/espace/parrainage" className="text-link">Parrainage <ArrowUpRight size={16} /></Link>
        </div>
        <small>Vérifications, modération, récompenses et notifications sont simulées. Aucun contrôle de sécurité ou avantage d’abonnement réel n’est activé par cette démo.</small>
      </section>
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
    </ApplicationVisualTheme>
  );
}
