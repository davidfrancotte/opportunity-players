# Opportunity Players — Arena · édition Netlify

Copie du site Arena adaptée à Next.js standard et Netlify. Le site Sites/Cloudflare original reste indépendant et inchangé. Identité Arena : anthracite, blanc cassé et vert acide, typographie éditoriale et photographie sportive cohérente. Aucun changement sur les comptes existants.

**Déploiement : lire [DEPLOIEMENT_NETLIFY.md](DEPLOIEMENT_NETLIFY.md).** Node.js 24, `npm ci`, puis `npm run build`. Netlify doit compiler le dépôt GitHub ; ne pas déposer ce dossier source dans Netlify Drop. Le dossier de publication est `.next`, pas `dist` ni `public`.

Cette livraison reste une préversion de démonstration, même si son adresse Netlify est publique. `noindex` est conservé, mais n'est pas un contrôle d'accès.

## Périmètre

- Accueil, plateforme, trois parcours par public, répertoire filtrable et douze pages de sports, formules, aide avec recherche, histoire et sélection du journal.
- Parcours d'orientation en deux étapes vers l'inscription officielle. Aucune collecte de données, création de compte, facturation ou messagerie réelle dans cette préversion.
- Aperçu interactif à quatre onglets, avec données explicitement fictives. Il ne constitue pas une application connectée au service.
- Responsive, navigation clavier via primitives Base UI, états de sélection, chargement différé des images secondaires, préférences de mouvement réduit.

## Sources de contenu

Corpus public collecté le 18 septembre 2026 : site officiel opportunity-players.com (pages de présentation, offres, FAQ, histoire et articles). Les observations de l'espace connecté ont permis de décrire profil, CV, publications, réseau, annonces et messagerie, sans exporter de données personnelles. Les formulations sont réécrites ; les fonctions payantes sont conditionnées à l'offre actuelle. La gratuité concerne la création de compte. Aucun tarif ou volume d'utilisateurs inventé.

Le journal renvoie vers les originaux. Ses images sont des illustrations générées, pas des portraits des personnes citées. Les originaux et les prompts des images ont été remis dans le dossier de livrables Arena, en dehors du site.

## Visuels

`public/images` : football, basketball, padel, tennis, handball, rugby, volleyball, hockey sur gazon, pickleball, futsal, boxe et athlétisme, plus athlétisme en fauteuil. Personnages adultes fictifs ; aucune marque ni personne réelle revendiquée. Sources PNG 1536 × 1024 converties en WebP qualité 82. Le visuel collectif reprend la direction validée. Carte sociale : `public/og.png`.

### Révélation sélective de la couleur

Les quatorze compositions sportives possèdent une version `*-color.webp`, distincte des originaux conservés. Ces versions colorisent les sportifs et leur équipement ; le décor reste monochrome. Le composant partagé `AthleteImage` utilise un seul fichier par image, désaturé au repos et révélé au survol, pour éviter tout décalage de silhouette ou double téléchargement au premier survol. Les zooms existants sont conservés.

Durée : 650 ms à l'entrée comme à la sortie. Le focus clavier révèle les images des liens ; une pression tactile apporte le même retour décoratif sans détourner la navigation. La préférence de mouvement réduit supprime le zoom et les transitions sur ces images. Aucun compte, contenu éditorial ni aperçu de partage social n'est modifié par cet effet.

Vérification dédiée : `node scripts/validate-athlete-images.mjs` (fichiers, couverture HTTP, textes alternatifs et règles d'accessibilité ; pas de test visuel navigateur).

## Espace membre de démonstration

18 pages supplémentaires sous `/espace` : fil, réseau, opportunités, profil, messages, notifications, galerie, paramètres, six fiches membres et quatre fiches annonces. Entrée depuis « Démo de l’app » dans le site public. Navigation latérale sur ordinateur et barre inférieure sur mobile. Les paramètres restent accessibles en haut sur mobile.

Les interactions sont simulées en mémoire : publications/commentaires, appréciations, abonnements unilatéraux, annonces enregistrées, profil éditable avec attributs d’autocomplétion, conversations, notifications lues et préférences. Les données sont partagées entre les pages tant que le même layout reste monté, puis perdues au rechargement ou à la sortie de l’espace. Aucun envoi, backend métier, stockage persistant, paiement ni authentification réelle ajouté. Les formulaires demandent des données fictives et le contexte de démo est affiché en permanence. Le CV peut être téléchargé au format texte, explicitement marqué comme fictif ; les images de galerie peuvent être agrandies, mais aucun téléversement réel n’est proposé.

Vérifications dédiées : `node scripts/validate-members.mjs`, compilation, TypeScript et lint du code produit. Les contrôles HTTP couvrent les 18 pages, liens internes, filtres de recherche, erreurs 404, images et métadonnées propres aux fiches. Les interactions de navigateur n’ont pas fait l’objet d’une recette visuelle automatisée.

## Commandes de développement

`npm run dev`, `npm run build`, `npm start`, `npm run typecheck`.

Après compilation, lancer `npm start` dans un terminal et `npm run test:http` dans un second terminal. `npm run test:phone` vérifie la géométrie et la rotation du smartphone sans navigateur.

La compilation et le contrôle TypeScript sont requis avant publication. Le lint complet du kit contient des alertes héritées dans des composants UI non utilisés ; les images HTML sont un choix explicite, les actifs étant déjà optimisés localement. Le code produit est contrôlé séparément. Pas de test navigateur automatisé dans cette livraison : validation HTTP et code uniquement.

## Avant bascule publique

Validation éditoriale et juridique par Opportunity Players, revue visuelle sur appareils réels, branchement au service existant et test de bout en bout, vérification des droits exacts de chaque offre, stratégie des neuf langues et redirections SEO. Les retours sur vérification d'email, double authentification et autocomplétion devront être traités dans le vrai parcours d'identité, pas simulés ici.

Socle Netlify : Next.js 16.3.5, React / React DOM 19.2.8. Le runtime Vinext/Cloudflare et sa dépendance directe RSC ont été retirés de cette copie. Le verrouillage npm est fourni. Exécuter `npm audit` pour l'état courant des dépendances ; ne pas appliquer de mise à jour forcée sans validation. Aucun téléversement utilisateur ni Server Action applicative dans cette préversion.
