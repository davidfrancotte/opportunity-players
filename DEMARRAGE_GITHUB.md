# Opportunity Players — Arena : livraison GitHub

Export du 18 septembre 2026, identique au code de la version publiée avec le smartphone 3D volumétrique.

Commit source : `700d24cba5d9718a3efb38a7fa78d4fed7bfeb25`.

Ce guide est le seul fichier ajouté à l’export. Les sources et les images du projet sont conservées à l’identique.

## Ce que contient le dossier

- Les 23 pages du site vitrine et les 18 pages de l’espace membre de démonstration.
- Les composants, styles responsive, textes, formulaires et navigation.
- Les images des sports, leurs versions couleur, les 13 portraits de soutien et la carte de partage social.
- Le smartphone réellement modélisé en 3D : châssis, tranches, dos, boutons, objectifs et écran provisoire ; rotation au scroll de −45° à +45°.
- Les dépendances déclarées et verrouillées, la configuration de compilation et les scripts de vérification.
- Le fichier `.gitignore`, pour ne pas versionner les dépendances, caches ou variables d’environnement locales.

Ne sont pas inclus : `node_modules`, les fichiers compilés, les caches, les fichiers `.env`, les identifiants d’accès et l’historique `.git`. Aucun de ces éléments n’est nécessaire pour créer le dépôt GitHub ; les dépendances se réinstallent avec `npm ci`.

## Lancer le projet

Prérequis : Node.js 24.x et npm. Ouvrir un terminal dans ce dossier, puis :

```bash
npm ci
npm run dev
```

Ouvrir l’adresse locale indiquée par le terminal. Pour préparer la version de production :

```bash
npm run build
npm run start
```

`start` utilise la configuration Cloudflare Worker générée par la compilation. Ce projet utilise React, TypeScript, Vinext/Vite, Tailwind, Base UI et Three.js ; ce n’est pas un export HTML statique.

## Premier push vers GitHub

Créer d’abord un dépôt GitHub vide, sans initialisation de README, de licence ou de `.gitignore`. Dans le terminal ouvert dans ce dossier :

```bash
git init
git add .
git commit -m "Initial import — Opportunity Players Arena"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/opportunity-players-arena.git
git push -u origin main
```

Remplacer `VOTRE_COMPTE` et, si nécessaire, le nom du dépôt. Utiliser votre méthode habituelle d’authentification GitHub ; ne jamais ajouter un jeton ou un mot de passe aux fichiers du projet.

Cette livraison ne crée aucun dépôt GitHub et n’effectue aucun push à votre place.

## Hébergement et configuration

Un push vers GitHub stocke le code ; il ne configure pas automatiquement l’hébergement. Le projet conserve sa configuration Sites/Cloudflare actuelle dans `vite.config.ts` et `.openai/hosting.json`. L’identifiant de projet contenu dans ce dernier fichier n’est pas une clé d’accès. Ne pas supprimer ce fichier sans adapter l’import correspondant dans `vite.config.ts`.

Pour un hébergement différent, adapter la configuration de déploiement avec votre développeur. Le projet ne peut pas être déposé tel quel sur GitHub Pages comme un simple site statique. Aucune action GitHub de déploiement automatique n’a été ajoutée.

## Où intervenir

| Élément | Emplacement |
| --- | --- |
| Pages du site et de la démo | `app/` |
| Composants partagés | `components/` |
| Textes, sports et publics | `lib/content.ts` |
| Données fictives de la démo | `lib/member-data.ts` |
| Portraits officiels et provenance | `lib/supporters.ts`, `public/supporters/` |
| Images des sports et effets couleur | `public/images/`, `components/athlete-image.tsx` |
| Géométrie et rendu du smartphone | `lib/phone-model.ts`, `lib/phone-renderer.ts` |
| Rotation au défilement | `lib/phone-motion.ts`, `components/app-phone-stage.tsx` |
| Présentation de l’app et écran de remplacement | `components/app-showcase.tsx`, `components/phone-3d.tsx` |

Les futures captures réelles de l’application pourront être raccordées via `screenSrc`. Les écrans actuels sont explicitement des placeholders, pas des captures d’une application native finalisée.

## Vérifications

Après installation :

```bash
node scripts/validate-phone-model.mjs
node scripts/validate-phone-motion.mjs
npm run build
npx tsc --noEmit
```

Avec `npm run dev` actif dans un autre terminal (adresse par défaut `http://localhost:3000`) :

```bash
node scripts/validate-http.mjs
node scripts/validate-athlete-images.mjs
node scripts/validate-members.mjs
node scripts/validate-supporters-app.mjs
```

Ces contrôles couvrent le code, les routes HTTP et la géométrie 3D ; ils ne remplacent pas une recette visuelle sur appareils réels. Lire aussi le `README.md` pour les limites connues et les points restant à valider avant une mise en production publique.

## Limites importantes

L’export contient toute la refonte développée ici, pas le code privé du service Opportunity Players existant. L’espace membre est une démo avec données fictives et interactions en mémoire : il ne comporte pas de backend métier, d’authentification réelle, de paiements ni de messagerie persistante. Les liens vers le service actuel sont conservés.

Les photos de soutien proviennent du site officiel. Vérifier les autorisations de redistribution des visuels avant de rendre le dépôt public. Aucune licence open source n’a été attribuée automatiquement à votre projet.
