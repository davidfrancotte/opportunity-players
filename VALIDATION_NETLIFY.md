# Vérifications de la copie Netlify

Vérification locale : 19 septembre 2026 (heure de Bruxelles).
Source : dépôt GitHub `davidfrancotte/opportunity-players`, commit de départ `3d04c10`.

## Résultats

- Compilation de production Next.js 16.3.5 : réussie.
- TypeScript : réussi.
- Compilation locale officielle `npx --yes netlify-cli build --offline --context production` : réussie avec `@netlify/build` 37.0.0 et le runtime Next.js Netlify 5.16.0. La fonction `___netlify-server-handler` a été créée et empaquetée.
- 23 pages publiques : réponses HTTP 200, métadonnées représentatives correctes.
- 18 pages de démonstration membre : réponses HTTP 200, liens internes et 10 jeux de métadonnées de fiches vérifiés.
- Six adresses inexistantes : réponses HTTP 404.
- Filtres de recherche côté serveur et lien vers une conversation : vérifiés.
- 28 fichiers d'images sportives et carte sociale : accessibles.
- 14 variantes de colorisation : présentes ; 44 occurrences d'images sur 12 pages contrôlées, avec textes alternatifs et règles clavier/tactile/mouvement réduit.
- 13 portraits de soutiens : servis sans altération des fichiers originaux.
- Cinq emplacements de présentation de l'app, six smartphones avec écrans explicitement provisoires : vérifiés.
- Modèle du smartphone : épaisseur réelle, faces latérales et arrière, boutons, écran, rotation de -45° à +45°, cadrage et libération des ressources vérifiés par calcul, sans GPU.
- 19 ressources compilées JavaScript/CSS/préchargées et requêtes de polices : accessibles.
- 125 fichiers de styles, composants, données et visuels : strictement identiques à ceux de la version Sites. Aucun changement esthétique volontaire.
- Lint du code produit : réussi, avec exception explicite pour les balises `img` existantes qui servent des WebP déjà préparés. Le kit UI hérité n'est pas couvert par ce contrôle ciblé.
- Audit npm après mise à jour compatible de la dépendance indirecte Undici : zéro vulnérabilité signalée à la date du contrôle. Cela ne constitue pas une garantie de sécurité exhaustive.

## Ce qui n'a pas été exécuté

- Aucun push vers GitHub.
- Aucun déploiement dans le compte Netlify ; les réglages réels et les journaux de ce compte n'ont pas été inspectés.
- Aucun changement du site Sites actuellement publié.
- Pas de recette visuelle ni d'interactions automatisées dans un navigateur. Les contrôles HTTP, le typage, le calcul de géométrie et la compilation ne remplacent pas une vérification visuelle sur appareils réels.

La validation de publication reste à effectuer après le push et le déploiement Netlify, selon `DEPLOIEMENT_NETLIFY.md`.
