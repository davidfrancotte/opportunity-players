import { monthlyPrice, annualPrice } from './studio/pricing';
import { limits } from './studio/entitlements';
export type FaqEntry = {
  question: string;
  answer: string;
  href?: string;
  link?: string;
};
export type FaqGroup = { id: string; title: string; items: FaqEntry[] };
const player = limits('Sportif', false),
  pro = limits('Professionnel', false),
  collective = limits('Organisation', false);
export const faqGroups: FaqGroup[] = [
  {
    id: 'demarrer',
    title: 'Compte & premiers pas',
    items: [
      {
        question: 'À qui s’adresse Opportunity Players ?',
        answer:
          'Aux sportifs amateurs, semi-professionnels et professionnels, aux métiers du sport et aux collectifs : clubs, équipes, fédérations, associations, universités, académies et structures sport-études. Choisissez Sportif, Professionnel ou Collectif à la création de votre profil.',
        href: '/rejoindre',
        link: 'Découvrir les profils',
      },
      {
        question: 'Puis-je créer un compte gratuitement ?',
        answer:
          'Oui, les trois catégories disposent d’un compte gratuit : présentez-vous, explorez le réseau, suivez des profils, recevez des messages et répondez. Les commentaires, réactions et partages sont également gratuits. Les quotas de nouveaux contacts et les outils supplémentaires dépendent de votre catégorie.',
        href: '/tarifs',
        link: 'Comparer les formules',
      },
      {
        question: 'Comment créer mon profil dans la nouvelle version ?',
        answer:
          'Le parcours vous guide dans le choix de la catégorie, l’identité, la validation de l’adresse e-mail, les informations sportives ou professionnelles, puis la personnalisation. La confirmation des informations et l’acceptation des règles sont prévues. Utilisez uniquement des données fictives dans la démonstration.',
        href: '/espace/inscription',
        link: 'Ouvrir le parcours de démonstration',
      },
      {
        question: 'La validation de l’e-mail est-elle déjà réelle ?',
        answer:
          'Non. La démo montre une étape de vérification par code, mais aucun e-mail n’est envoyé et aucun compte réel n’est créé. La vérification d’une adresse e-mail n’est pas, à elle seule, une authentification à deux facteurs. Une authentification et une vérification côté serveur restent nécessaires avant mise en service.',
      },
      {
        question: 'Puis-je inscrire mon enfant ?',
        answer:
          'Oui, le parcours sportif propose « J’inscris mon enfant ». Dans cette version, un profil de moins de 18 ans passe par ce parcours : date de naissance, nom du représentant, lien avec l’enfant et confirmation du représentant. Cette validation parentale est simulée ; elle ne vaut pas vérification d’identité ou autorisation réelle.',
        href: '/espace/modifier-profil',
        link: 'Explorer les informations du profil',
      },
      {
        question: 'Mon compte actuel et mes données sont-ils transférés ?',
        answer:
          'Non. La nouvelle version est une démonstration distincte : elle ne synchronise pas les comptes de la plateforme actuelle. Les profils, messages, abonnements et confirmations de la démo sont fictifs. Les actions de session sont réinitialisées au rechargement ; certaines préférences d’affichage peuvent être conservées sur cet appareil. N’y saisissez pas vos identifiants réels.',
      },
    ],
  },
  {
    id: 'profil',
    title: 'Profil, CV & médias',
    items: [
      {
        question: 'Quelles informations puis-je ajouter à mon profil sportif ?',
        answer:
          'Votre présentation, votre âge à partir de la date de naissance, votre pays et ville, vos sports, niveaux, classements, positions, clubs et expériences. Le poids, la taille et le côté dominant — gauche, droit ou ambidextre — sont également prévus. Les documents et médias disponibles dépendent de la formule.',
        href: '/espace/profil',
        link: 'Voir le profil web',
      },
      {
        question:
          'Puis-je pratiquer plusieurs sports et renseigner le handisport ?',
        answer:
          'Oui. Chaque discipline possède sa propre fiche : niveau, classement, position, côté dominant, clubs, disponibilité et situation contractuelle. Le critère handisport peut être renseigné et utilisé dans la recherche selon les accès de la formule. Les informations déclarées ne sont pas une certification officielle.',
      },
      {
        question:
          'Comment indiquer ma disponibilité, mon contrat et ma licence ?',
        answer:
          'Votre dossier par discipline permet de préciser si vous êtes disponible, à l’écoute ou indisponible, ainsi qu’une date de disponibilité si nécessaire. Vous pouvez renseigner votre situation contractuelle, votre licence sportive et vos distinctions. Ne publiez pas de données confidentielles ou de documents que vous n’êtes pas autorisé à partager.',
      },
      {
        question: 'Puis-je présenter mon agent et mes références ?',
        answer:
          'Vous pouvez indiquer si vous avez un agent, le nommer et afficher la relation dans votre dossier. Les parcours en clubs, le palmarès et les références complètent le profil. Un parcours d’avis professionnels sur une expérience est également présent, avec un état de validation. Dans la démo, ces relations et avis ne sont pas vérifiés auprès de personnes réelles.',
      },
      {
        question: 'Quels sont les accès aux photos, documents et vidéos ?',
        answer:
          'En gratuit : 3 photos pour les sportifs et professionnels ; 5 photos, 1 document et 1 vidéo pour les collectifs. En Premium : 50 photos pour les sportifs et professionnels, 30 pour les collectifs ; 20 documents pour chaque catégorie ; 20 vidéos sportifs, 30 professionnels et 10 collectifs. Il s’agit des quotas de la nouvelle offre.',
        href: '/tarifs',
        link: 'Voir le détail par catégorie',
      },
      {
        question:
          'Quels formats et durées de vidéos sont acceptés dans la démo ?',
        answer:
          'Le lecteur de vidéos sportives accepte les fichiers MP4 ou WebM jusqu’à 50 Mo. La durée maximale est de 5 minutes pour les sportifs et professionnels ayant accès aux vidéos ; pour les collectifs, 1 minute en gratuit et 3 minutes en Premium. Les aperçus restent locaux : aucun fichier n’est téléversé sur un serveur.',
      },
    ],
  },
  {
    id: 'reseau',
    title: 'Réseau, publications & messages',
    items: [
      {
        question:
          'Comment rechercher un sportif, un professionnel ou un collectif ?',
        answer:
          'Dans Réseau, choisissez la catégorie puis vos critères. Le sport, le pays et la ville structurent la recherche. Pour les sportifs : genre, âge, niveau, position, côté dominant, handisport, clubs, classement et disponibilité sont prévus. Pour les professionnels et collectifs : le type de métier ou de structure permet d’affiner. Certains critères avancés sont réservés à Premium.',
        href: '/espace/reseau',
        link: 'Explorer le réseau',
      },
      {
        question:
          'Comment fonctionnent les recommandations et recherches enregistrées ?',
        answer:
          'Les recommandations rapprochent votre profil des personnes et opportunités proposées dans la démo. Vous disposez d’une recherche enregistrée en gratuit ; Premium permet 10 recherches sportifs, 20 professionnels et 30 collectifs. Les alertes sur de nouveaux résultats sont simulées pendant la visite, sans notifications envoyées en arrière-plan.',
      },
      {
        question:
          'Combien de nouveaux contacts puis-je contacter chaque mois ?',
        answer: `En gratuit : ${player.contacts} pour les sportifs, ${pro.contacts} pour les professionnels et ${collective.contacts} pour les collectifs. En Premium : ${limits('Sportif', true).contacts}, ${limits('Professionnel', true).contacts} et ${limits('Organisation', true).contacts}, respectivement. Le quota concerne les nouveaux interlocuteurs contactés, pas chaque message ni chaque réponse.`,
        href: '/tarifs',
        link: 'Comparer Gratuit et Premium',
      },
      {
        question:
          'La réception des messages et les réponses sont-elles gratuites ?',
        answer:
          'Oui, pour toutes les catégories. Vous pouvez recevoir des messages et poursuivre une conversation déjà engagée gratuitement. Les limites mensuelles portent uniquement sur les nouveaux contacts. Aucun message de la démo n’est envoyé à une personne réelle.',
        href: '/espace/messages',
        link: 'Ouvrir la messagerie',
      },
      {
        question: 'Qui peut publier, commenter ou partager ?',
        answer:
          'La création de publications est réservée à Premium pour les sportifs et collectifs. Les professionnels peuvent créer des publications dès le compte gratuit. Pour les trois catégories, les commentaires, réactions et partages restent gratuits. La programmation des publications fait partie des outils Premium et est simulée pendant la visite.',
      },
    ],
  },
  {
    id: 'jouer',
    title: 'Matchs, invitations & agenda',
    items: [
      {
        question: 'Puis-je organiser un match gratuitement ?',
        answer:
          'La nouvelle offre permet de créer un événement par mois en gratuit, quelle que soit la catégorie. Premium porte la capacité à 10 événements actifs pour un sportif, 25 pour un professionnel et 50 pour un collectif. Vous pouvez renseigner le sport, le lieu, les horaires et plusieurs créneaux.',
        href: '/espace/jouer',
        link: 'Explorer Jouer ensemble',
      },
      {
        question: 'Comment sont choisis le créneau et le nombre de joueurs ?',
        answer:
          'Les invités indiquent les créneaux qui leur conviennent. Le nombre requis correspond au total des participants, et non au nombre de places restant à remplir. Un total est proposé selon le sport, mais l’organisateur peut le modifier. Lorsqu’un créneau atteint l’effectif requis, l’organisateur reçoit une notification et confirme le choix ; les participants sont ensuite notifiés.',
      },
      {
        question: 'Un invité peut-il venir avec un ami en +1 ?',
        answer:
          'Oui, un participant peut indiquer un accompagnant joueur en +1, même si cet ami n’a pas de compte. Ce +1 entre dans le total des participants. L’organisateur garde la main sur la confirmation du match.',
      },
      {
        question: 'Qui peut découvrir les invitations ouvertes autour de lui ?',
        answer:
          'La découverte des invitations publiques est disponible aux sportifs Premium et aux professionnels et collectifs dès le gratuit, avec une portée de 50 km pour ces comptes gratuits. Premium donne accès aux réglages avancés de proximité. Une candidature à un match ouvert nécessite l’accord de l’organisateur ; elle ne vaut pas confirmation automatique.',
      },
      {
        question:
          'L’agenda envoie-t-il de vrais rappels ou se connecte-t-il à Google et Outlook ?',
        answer:
          'L’agenda regroupe les événements fictifs et permet de tester les rappels et notifications. La connexion Google Agenda, Outlook ou Apple est simulée : aucun compte externe n’est connecté. L’export .ics est utilisable, mais contient uniquement les événements fictifs affichés dans la démo.',
        href: '/espace/calendrier-avance',
        link: 'Explorer les outils d’agenda',
      },
    ],
  },
  {
    id: 'opportunites',
    title: 'Opportunités, recrutement & rendez-vous',
    items: [
      {
        question:
          'Puis-je consulter des opportunités et envoyer ma candidature ?',
        answer:
          'Vous pouvez consulter les annonces et recommandations gratuitement. Les sportifs et professionnels Premium disposent de 30 candidatures par mois dans la nouvelle offre, avec suivi des statuts et invitations à des essais. Dans la démonstration, aucune candidature n’est réellement transmise.',
        href: '/espace/opportunities',
        link: 'Voir les opportunités',
      },
      {
        question:
          'Quels outils de recrutement sont proposés aux professionnels et clubs ?',
        answer:
          'Les listes de profils permettent de préparer une sélection : en gratuit, 1 liste de 20 profils ; en Premium, 20 listes professionnels ou 30 listes collectifs, avec 1 000 profils au total. Les outils Premium ajoutent le suivi des candidatures et l’organisation d’essais individuels ou collectifs. Pour les annonces actives : professionnels, 0 en gratuit et 5 en Premium ; collectifs, 1 en gratuit et 10 en Premium.',
        href: '/espace/recrutement',
        link: 'Découvrir le recrutement',
      },
      {
        question: 'Plusieurs personnes peuvent-elles gérer un collectif ?',
        answer:
          'Un collectif gratuit dispose d’un gestionnaire. Premium permet jusqu’à 5 gestionnaires, propriétaire inclus, avec rôles, permissions, commentaires internes et coordination du recrutement. Dans la démo, les changements de rôle et la collaboration sont simulés dans une même session, sans connexion entre comptes réels.',
      },
      {
        question: 'Comment demander un rendez-vous à un professionnel ?',
        answer:
          'Depuis le profil d’un professionnel, envoyez une demande. Il doit d’abord l’accepter pour vous donner accès à ses disponibilités ; vous pouvez alors choisir un créneau. En gratuit, vous disposez d’1 demande pour les sportifs et collectifs, et 3 pour les professionnels. Premium porte ces quotas à 15 pour les sportifs et professionnels, et 20 pour les collectifs.',
        href: '/espace/rendez-vous',
        link: 'Explorer les rendez-vous',
      },
      {
        question:
          'Un professionnel peut-il présenter ses services et gérer les rendez-vous ?',
        answer:
          'Oui : 3 services en gratuit, jusqu’à 15 en Premium. Le quota de rendez-vous confirmés reçus passe de 3 en gratuit à 100 en Premium. Le parcours permet de tester les demandes, l’acceptation et les créneaux ; il ne réalise pas de réservation ni de paiement auprès d’un professionnel réel.',
      },
    ],
  },
  {
    id: 'offres',
    title: 'Formules & parrainage',
    items: [
      {
        question: 'Quels sont les tarifs Premium mensuels et annuels ?',
        answer: `Sportifs : ${monthlyPrice('Sportif')}/mois ou ${annualPrice('Sportif')}/an. Professionnels : ${monthlyPrice('Professionnel')}/mois ou ${annualPrice('Professionnel')}/an. Collectifs : ${monthlyPrice('Organisation')}/mois ou ${annualPrice('Organisation')}/an. Le tarif annuel est un paiement annuel, distinct de 12 mensualités. Chaque formule Premium inclut les accès gratuits de sa catégorie. Aucun paiement n’est effectué dans la démo.`,
        href: '/tarifs',
        link: 'Voir les formules et économies annuelles',
      },
      {
        question: 'Comment essayer Premium dans la démonstration ?',
        answer:
          'La page Mon abonnement permet de simuler une activation et de découvrir les fonctions de la catégorie choisie. Il n’y a ni paiement, ni prélèvement, ni contrat d’abonnement réel. Les modalités commerciales définitives de renouvellement ou de résiliation devront être indiquées avant toute souscription réelle.',
        href: '/espace/abonnement',
        link: 'Tester les accès Premium',
      },
      {
        question: 'Comment fonctionne le parrainage ?',
        answer:
          'Les sportifs et collectifs y ont accès dès le gratuit ; les professionnels avec Premium. Le parcours simule une invitation et la progression du filleul, puis un crédit de 3 mois Premium lorsque les étapes sont validées. Aucune invitation réelle n’est envoyée et aucune réduction réelle n’est attribuée dans cette démonstration.',
        href: '/espace/parrainage',
        link: 'Explorer le parrainage',
      },
    ],
  },
  {
    id: 'securite',
    title: 'Sécurité, langues & assistance',
    items: [
      {
        question:
          'Comment signaler un comportement abusif ou bloquer un membre ?',
        answer:
          'Les conversations proposent des actions de signalement et de blocage ; l’espace Sécurité permet d’en suivre les états dans la démo. Le blocage et le signalement restent accessibles indépendamment de la formule. Pour un problème concernant un vrai compte, contactez l’assistance de la plateforme actuelle.',
        href: '/espace/securite',
        link: 'Voir l’espace Sécurité',
      },
      {
        question:
          'Le filtrage des propos et des images est-il déjà opérationnel ?',
        answer:
          'La démo illustre les parcours de modération de textes et de contrôle des médias sportifs. Elle ne constitue pas un service de modération automatique complet : elle ne garantit pas la détection de tous les propos racistes, sexistes ou abusifs, ni l’analyse réelle du contenu de toutes les images. Une solution serveur, une revue humaine et des recours sont à prévoir avant exploitation réelle.',
      },
      {
        question: 'Où retrouver les notifications ?',
        answer:
          'La cloche et l’espace Notifications regroupent les invitations, demandes et changements de statut fictifs. Des alertes apparaissent pendant l’utilisation. Les notifications push sur un téléphone verrouillé, les e-mails et les rappels en arrière-plan ne sont pas connectés dans cette démo.',
        href: '/espace/notifications',
        link: 'Ouvrir les notifications',
      },
      {
        question: 'Quelles langues et quels thèmes sont disponibles ?',
        answer:
          'L’interface propose un sélecteur Français / English ; certaines extensions récentes peuvent encore comporter des textes français. La version web dispose d’un choix clair ou sombre. Ces réglages sont des préférences d’affichage : ils ne traduisent pas automatiquement les publications des membres.',
      },
      {
        question: 'Qui contacter si j’ai besoin d’aide ?',
        answer:
          'Pour une question de service : site@opportunity-players.com. Pour un problème technique : technical@opportunity-players.com. Indiquez l’écran concerné et les étapes du problème, sans jamais envoyer votre mot de passe.',
        href: '/aide',
        link: 'Contacter l’équipe',
      },
    ],
  },
];
// Shared short FAQ keeps the homepage and help page aligned with this source.
export const faqs = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[2].items[2],
  faqGroups[5].items[0],
  faqGroups[0].items[4],
  faqGroups[1].items[5],
  faqGroups[0].items[5],
].map(({ question, answer }) => [question, answer]);
