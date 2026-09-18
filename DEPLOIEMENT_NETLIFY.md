# Mettre Arena en ligne sur Netlify

## Ce qui change

Cette copie utilise Next.js standard, avec le même design, les mêmes contenus et les mêmes images que la version Sites. Les effets de colorisation, les portraits des soutiens et le smartphone volumétrique restent présents. Aucun backend, compte réel ou paiement n'a été ajouté. L'espace membre reste une démonstration en mémoire et les écrans de smartphone restent des placeholders.

La configuration Vinext/Cloudflare a été retirée de cette copie uniquement. Le projet Sites d'origine est intact. Cette version n'est plus destinée à être publiée avec l'ancienne commande Sites.

## 1. Vérifier localement

Installer Node.js 24 puis, depuis le dossier contenant `package.json` :

```bash
npm ci
npm run build
npm start
```

Ouvrir http://localhost:3000. Pour développer, arrêter le serveur avec Ctrl+C puis utiliser `npm run dev`.

Dans un second terminal, depuis le même dossier et pendant que `npm start` tourne :

```bash
npm run test:http
npm run test:phone
```

## 2. Envoyer la copie locale préparée sur GitHub

Le dossier local livré `opportunity-players-netlify` est un clone du dépôt `davidfrancotte/opportunity-players`, avec son historique conservé et les changements Netlify non commités. Depuis ce dossier :

```bash
git status --short
git add -A
git commit -m "Adapter Arena à Next.js et Netlify"
git push origin main
```

Vérifier les fichiers affichés par `git status` avant le commit. Ne pas utiliser `--force`. Si GitHub refuse le push parce que le dépôt a changé entre-temps, arrêter et faire intégrer les nouvelles modifications. Ne jamais versionner un mot de passe, un token ou un fichier `.env`.

L'archive ZIP est une archive de sources : elle ne contient pas `.git`. Si l'on travaille uniquement depuis ce ZIP, cloner d'abord le dépôt GitHub, puis y reporter les fichiers de l'archive et les suppressions indiquées ci-dessous. Ne pas réinitialiser un dépôt par-dessus un historique existant.

Fichiers à retirer de l'ancien export lors d'une copie manuelle : `vite.config.ts`, `.openai/hosting.json`, `DEMARRAGE_GITHUB.md`. Le clone local préparé contient déjà ces suppressions. Ne pas recopier les anciens `node_modules`, `dist`, `.next`, `.vinext` ou `.wrangler`.

## 3. Vérifier la configuration du projet Netlify existant

Utiliser le projet correspondant à `https://opportunity-players.netlify.app`, sans en créer un autre et sans modifier le domaine officiel Opportunity Players.

Dans les réglages de build / déploiement continu :

- Dépôt : `https://github.com/davidfrancotte/opportunity-players`.
- Branche de production : `main`.
- Base directory : racine du dépôt (champ vide).
- Package directory : vide, si ce champ est présent.
- Build command : `npm run build`.
- Publish directory : `.next`.
- Node.js : `24`.

Les valeurs de compilation et de publication sont aussi définies dans `netlify.toml`. Vérifier que Netlify lit bien ce fichier à la racine. Retirer toute ancienne valeur `dist`, `dist/client` ou `public` dans les réglages obsolètes. Ne pas définir `NODE_ENV=development` ni `NETLIFY_NEXT_PLUGIN_SKIP=true`. Laisser l'installation des dépendances de développement activée : Tailwind et TypeScript sont nécessaires à la compilation.

L'adaptateur `@netlify/plugin-nextjs` est explicitement activé dans `netlify.toml`, sans version figée. Il prépare automatiquement les fonctions serveur et les fichiers statiques. Aucun token applicatif n'est requis dans le code. Aucun faux fichier `index.html` ni redirection globale vers `/index.html` n'est nécessaire.

Le push déclenche un déploiement si le dépôt est déjà relié à Netlify. Sinon, relier le dépôt dans les réglages du projet existant. Après le changement de framework, lancer une fois un nouveau déploiement avec effacement du cache depuis l'onglet des déploiements. Vérifier que la compilation, puis la préparation de l'adaptateur Next.js, aboutissent.

**Ne pas utiliser Netlify Drop pour ce ZIP ni téléverser `.next` seul.** Il s'agit d'une application Next.js avec rendu serveur ; Netlify doit exécuter son processus de build.

## 4. Contrôler le site publié

Vérifier l'accueil, `/sports/football`, `/pour-vous/sportifs`, `/espace`, puis recharger directement ces adresses. Vérifier les images, les liens de navigation, le survol coloré et la rotation du smartphone. Les commandes HTTP acceptent aussi une adresse publiée, par exemple :

```bash
node scripts/validate-http.mjs https://opportunity-players.netlify.app
node scripts/validate-members.mjs https://opportunity-players.netlify.app
```

Les métadonnées utilisent l'adresse Netlify configurée par l'hébergement. Pour un futur domaine, définir `SITE_URL` à son URL HTTPS puis recompiler. Il n'est pas nécessaire de la définir pour l'adresse Netlify actuelle. Ne pas changer les liens de l'app actuelle : ils pointent volontairement vers les stores existants.

Si une erreur subsiste, transmettre le journal complet du dernier déploiement en masquant les secrets éventuels. Une compilation locale réussie ne confirme pas à elle seule le succès d'un déploiement dans le compte Netlify.

## Limites conservées

- Pas d'authentification réelle, de vérification d'email, de messagerie connectée, de base de données ni de paiement.
- Les données fictives de l'espace membre se réinitialisent au rechargement.
- Les illustrations de la future app restent explicitement provisoires.
- `noindex` conservé pour cette préversion ; ce réglage n'empêche pas l'accès public.
- Les droits de publication des portraits et les contenus commerciaux doivent être validés par Opportunity Players avant lancement officiel.

Documentation officielle : https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
