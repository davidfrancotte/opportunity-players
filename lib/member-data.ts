// Entirely fictional fixtures for the Arena prototype. No private account data.
export const demoMembers = [
  {
    slug: 'alex-dupont',
    name: 'Alex Dupont',
    initials: 'AD',
    role: 'Coach',
    sport: 'Padel',
    city: 'Liège',
    image: 'padel',
    bio: 'J’accompagne les joueurs dans leur progression technique et leur préparation. Mon approche : des objectifs simples, du jeu et de la régularité.',
    tags: ['Entraînement', 'Accompagnement', 'Technique'],
  },
  {
    slug: 'sarah-moreau',
    name: 'Sarah Moreau',
    initials: 'SM',
    role: 'Sportive',
    sport: 'Football',
    city: 'Bruxelles',
    image: 'football',
    bio: 'Joueuse passionnée par le collectif, je souhaite rejoindre un projet ambitieux et continuer à progresser. J’aime le jeu de mouvement et les défis partagés.',
    tags: ['Collectif', 'Milieu de terrain', 'Disponible'],
  },
  {
    slug: 'julien-martin',
    name: 'Julien Martin',
    initials: 'JM',
    role: 'Sportif',
    sport: 'Basketball',
    city: 'Namur',
    image: 'basketball',
    bio: 'Le basket est mon terrain d’expression. Je cherche à échanger avec des joueurs, des clubs et des professionnels de la préparation.',
    tags: ['Basketball', 'Progression', 'Échanges'],
  },
  {
    slug: 'horizon-padel',
    name: 'Horizon Padel',
    initials: 'HP',
    role: 'Club',
    sport: 'Padel',
    city: 'Liège',
    image: 'padel',
    bio: 'Un club fictif imaginé pour explorer Arena. Notre projet rassemble pratique loisir, accompagnement et vie de club autour du padel.',
    tags: ['Club', 'Padel', 'Formation'],
  },
  {
    slug: 'lea-caron',
    name: 'Léa Caron',
    initials: 'LC',
    role: 'Sportive',
    sport: 'Tennis',
    city: 'Lille',
    image: 'tennis',
    bio: 'Joueuse de tennis amateur, curieuse de nouvelles méthodes d’entraînement et de rencontres qui font progresser.',
    tags: ['Tennis', 'Amateur', 'Entraînement'],
  },
  {
    slug: 'collectif-athle',
    name: 'Collectif Athlé',
    initials: 'CA',
    role: 'Association',
    sport: 'Athlétisme',
    city: 'Louvain',
    image: 'athletics',
    bio: 'Une association fictive pour mettre en scène les échanges entre athlètes, encadrants et organisateurs dans la démonstration.',
    tags: ['Athlétisme', 'Inclusion', 'Collectif'],
  },
];
export type DemoMember = (typeof demoMembers)[number];
export const demoOpportunities = [
  {
    slug: 'coach-padel',
    title: 'Accompagner notre groupe de padel',
    org: 'Horizon Padel',
    member: 'horizon-padel',
    sport: 'Padel',
    city: 'Liège',
    role: 'Coach',
    image: 'padel',
    intro:
      'Un projet d’entraînement régulier pour un petit groupe de joueurs amateurs.',
    description:
      'Dans cet exemple, le club souhaite rencontrer un coach capable de construire des séances progressives, adaptées aux niveaux des participants. L’objectif est de développer le jeu collectif et le plaisir de jouer.',
    needs: [
      'Une approche pédagogique et bienveillante',
      'Une expérience d’encadrement au padel',
      'L’envie de construire un projet avec le club',
    ],
    tags: ['Encadrement', 'Amateur'],
  },
  {
    slug: 'collectif-football',
    title: 'Rejoindre un nouveau collectif',
    org: 'Équipe Rivage',
    member: 'sarah-moreau',
    sport: 'Football',
    city: 'Bruxelles',
    role: 'Sportive',
    image: 'football',
    intro: 'Une équipe féminine souhaite rencontrer de nouvelles joueuses.',
    description:
      'Cette annonce fictive illustre une recherche de joueuses pour compléter un collectif amateur. Le premier échange permet de partager les envies, le parcours et les disponibilités de chacune.',
    needs: [
      'L’esprit d’équipe',
      'L’envie de progresser dans un cadre amateur',
      'Un premier échange sur le projet sportif',
    ],
    tags: ['Équipe féminine', 'Amateur'],
  },
  {
    slug: 'preparation-basket',
    title: 'Construire une préparation adaptée',
    org: 'Projet Basket Nord',
    member: 'julien-martin',
    sport: 'Basketball',
    city: 'Namur',
    role: 'Préparateur',
    image: 'basketball',
    intro: 'Un collectif cherche un professionnel de la préparation physique.',
    description:
      'Un exemple de mise en relation autour de la préparation de saison. Le groupe aimerait échanger avec un professionnel pour comprendre son approche et définir un accompagnement adapté.',
    needs: [
      'Une expertise en préparation physique',
      'Une connaissance des contraintes du basketball',
      'Un accompagnement construit avec l’encadrement',
    ],
    tags: ['Préparation', 'Accompagnement'],
  },
  {
    slug: 'athletisme-rencontre',
    title: 'Faire grandir un projet inclusif',
    org: 'Collectif Athlé',
    member: 'collectif-athle',
    sport: 'Athlétisme',
    city: 'Louvain',
    role: 'Encadrant',
    image: 'adaptive-athletics',
    intro:
      'Des échanges entre sportifs et encadrants autour de la pratique inclusive.',
    description:
      'Cette annonce de démonstration présente un projet de rencontre entre acteurs de l’athlétisme. L’objectif est de partager des expériences et de réfléchir à une pratique ouverte à des parcours différents.',
    needs: [
      'Un intérêt pour la pratique inclusive',
      'Une expérience à partager',
      'L’envie de collaborer avec des acteurs locaux',
    ],
    tags: ['Inclusion', 'Rencontre'],
  },
];
export type DemoOpportunity = (typeof demoOpportunities)[number];
export type DemoPost = {
  id: string;
  author: string;
  name: string;
  role: string;
  body: string;
  image?: string;
  type: 'Article' | 'Annonce';
  likes: number;
  comments: string[];
};
export const initialPosts: DemoPost[] = [
  {
    id: 'post-padel',
    author: 'alex-dupont',
    name: 'Alex Dupont',
    role: 'Coach · Padel',
    type: 'Article',
    body: 'Une bonne séance ne se mesure pas uniquement au score. Aujourd’hui, place au placement et à la communication entre partenaires. Et vous, quel aspect de votre jeu travaillez-vous en ce moment ?',
    image: 'padel',
    likes: 12,
    comments: ['La communication fait toute la différence dans notre groupe.'],
  },
  {
    id: 'post-football',
    author: 'sarah-moreau',
    name: 'Sarah Moreau',
    role: 'Sportive · Football',
    type: 'Article',
    body: 'Un nouveau chapitre se prépare. Je cherche surtout un collectif avec lequel partager l’envie de progresser, sur le terrain et en dehors. Mon profil est à jour : échangeons !',
    image: 'football',
    likes: 8,
    comments: [],
  },
  {
    id: 'post-club',
    author: 'horizon-padel',
    name: 'Horizon Padel',
    role: 'Club · Liège',
    type: 'Annonce',
    body: 'Nous imaginons un nouveau groupe d’entraînement amateur. Nous aimerions rencontrer un coach pour construire ce projet ensemble. Retrouvez l’exemple d’annonce dans les opportunités.',
    likes: 5,
    comments: [],
  },
];
export const initialProfile = {
  firstName: 'Camille',
  lastName: 'Martin',
  city: 'Liège, Belgique',
  headline: 'Joueuse de padel · L’envie de progresser ensemble',
  bio: 'Le padel m’a appris que les bonnes rencontres changent le jeu. Je cherche des partenaires d’entraînement et des échanges avec les professionnels de ma discipline.',
};
export type DemoProfile = typeof initialProfile;
export const demoNotifications = [
  {
    id: 'n1',
    title: 'Alex partage un conseil d’entraînement',
    body: 'Une nouvelle publication dans votre réseau de démonstration.',
    href: '/espace',
    type: 'publication',
  },
  {
    id: 'n2',
    title: 'Un projet de padel à découvrir',
    body: 'L’exemple d’annonce Horizon Padel correspond à votre discipline.',
    href: '/espace/opportunites/coach-padel',
    type: 'opportunite',
  },
  {
    id: 'n3',
    title: 'Votre parcours mérite d’être visible',
    body: 'Ajoutez votre présentation au profil de démonstration.',
    href: '/espace/profil',
    type: 'profil',
  },
];
export const memberPages = {
  reseau: {
    title: 'Votre réseau',
    description: 'Rencontrez les acteurs qui partagent votre terrain.',
  },
  opportunites: {
    title: 'Les opportunités',
    description: 'Des projets à découvrir. Des rencontres à provoquer.',
  },
  profil: {
    title: 'Votre profil',
    description: 'Votre parcours, votre projet, votre prochain chapitre.',
  },
  messages: {
    title: 'Vos échanges',
    description: 'Une rencontre commence par une conversation.',
  },
  notifications: {
    title: 'Vos notifications',
    description: 'L’essentiel de votre réseau, au même endroit.',
  },
  medias: {
    title: 'Votre galerie',
    description: 'Donnez une autre dimension à votre parcours.',
  },
  parametres: {
    title: 'Vos paramètres',
    description: 'Un espace qui s’adapte à vos préférences.',
  },
};
