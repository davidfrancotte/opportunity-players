# Page Application — visuels et adoption

Périmètre : page publique `/application`, sans déploiement, changement de l’ancienne app en ligne ou synchronisation fonctionnelle de l’espace web.

- 32 nouvelles captures PNG : 16 parcours réels de l’export embarqué dans la dernière démo iPhone, chacun en clair et en sombre. Préfixe `studio-20260923-growth-` pour éviter les anciens caches. Les anciens assets restent intacts.
- Dix visuels de fonctionnalités remplacés ; Spotlight dans le téléphone 3D d’introduction. Le modèle 3D attend le chargement de sa texture pour ne pas montrer l’écran provisoire pendant le changement de thème.
- Six parcours illustrés dans la dernière section `#adoption-visibilite` : affiliation/parrainage, organisation de matchs, passeport sportif, invitation partageable, Spotlight mensuel, rendez-vous et agenda.
- Deux interrupteurs clair/sombre synchronisés, avec identifiants accessibles distincts ; ils n’affectent pas le thème du site ni les préférences de l’app.
- Textes rapprochés de l’implémentation : filtres repliés des Opportunités, publication à droite du titre, sélecteur Jouer ensemble, likes des médias, passeport, Spotlight et export d’agenda.

## Précisions éditoriales

L’affiliation est présentée comme le parrainage simulé existant, pas comme un programme de commissions. Les trois mois Premium restent une proposition soumise à validation. Le partage d’agenda décrit les agendas de démonstration et l’export `.ics`, pas une synchronisation tierce. Les liens publics des nouvelles cartes et le téléchargement de la nouvelle app restent à raccorder. Le Spotlight en mémoire ne s’exécute pas lorsque la démo est fermée. Ces parcours ne sont pas présentés comme déjà disponibles dans l’ancienne app distribuée.

## Reproduction

Avec Node 24 et le runtime Playwright du poste :

```sh
node scripts/capture-application-current.mjs
node scripts/capture-application-current.mjs --light
npm run typecheck
npm run build -- --webpack
OP_SITE_URL=http://127.0.0.1:3000 node scripts/validate-application-visual-theme.mjs
node scripts/validate-phone-model.mjs
```

Les captures parcourent l’UI réelle, y compris la demande à Marc Petit et son rôle de simulation pour montrer la validation, ainsi que la création d’un match pour ouvrir son invitation. Les tests vérifient 17 emplacements visuels, six nouveaux blocs, les deux thèmes, les commandes clavier, l’absence de doublons d’identifiants et de débordements à 1440, 768, 390 et 320 px.
