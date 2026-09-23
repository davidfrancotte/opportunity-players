# Parité de l’espace membre web — 24 septembre 2026

Référence : état courant de `../opportunity-players-app/studio`, y compris la dernière galerie de médias des membres. Seul le site Next.js/Netlify est modifié. Aucun push GitHub, déploiement, changement de backend ou installation iPhone.

## Périmètre aligné

| Parcours | Fonctionnalités et règles reprises de l’app |
| --- | --- |
| Opportunités | Filtres fermés initialement, bouton au-dessus des annonces, catégorie + discipline + recherche + favoris. Toutes les catégories sont proposées à tous les types de profils. |
| Publication d’annonces | Bouton à droite du titre. Professionnels : 10 catégories ; organisations : 8. Quotas, modération et droits de gestion issus des mêmes règles que l’app. |
| Profils et réseau | Secteurs/métiers propres aux professionnels et collectifs. Recherche avancée par type, secteur, pays, ville, sport, classement ; accessible en aperçu gratuit, utilisable en Premium. |
| Contacts | Connexions et Suivis distincts, compteurs, recherche, demandes acceptées/refusées/annulées. Messages libres et invitations à jouer après acceptation. Aucun badge NEW. |
| Médias des membres | Photos et vidéos publiques du membre sélectionné, lecture locale de la vidéo de démo, likes réversibles et synchronisés avec les publications correspondantes. État vide quand aucun média n’est partagé. |
| Accueil | Fil communautaire, filtres Premium catégorie/discipline, trois lignes maximum et ouverture de la publication complète, likes et commentaires. |
| Éditeur de publications | Discipline « - » par défaut, import image/vidéo, programmation visible mais verrouillée en gratuit, active en Premium. |
| Visibilité et partage | Spotlight mensuel de démonstration, likes, simulation de clôture, passeport sportif et invitation partageable, carte PNG prévisualisée, consentement et aperçu invité. |
| Jouer ensemble | Sélecteur secondaire en rail arrondi, espace avant Organiser, Mes invitations/J’organise/À proximité, proximité et alertes Premium, rayon aux bons endroits. |
| Agenda et RDV | Calendrier mensuel, jours colorés, matchs/RDV pro/spectateur, demandes dépliables, compteur, refus/validation, accès aux créneaux puis réservation. |
| Carrière et outils | Candidatures, recrutement, recherches enregistrées, programmation, listes de talents, essais groupés, équipes, permissions, statistiques et invitations ; modèles identiques à l’app. Liens dynamiques corrigés vers `/espace/*`. |
| Profil, compte et sécurité | Dossier multisport, niveaux/classements/clubs, agent, documents, parcours, imports médias, parrainage, modération, confidentialité, inscription et contrôles de formule. |
| Préférences | FR/NL/DE/ES/IT/PT/PL/TR/EN, choix de langue dans les paramètres seulement. Thèmes clair/sombre persistants, sélection citron approuvée. Promotions Premium masquées après activation. |

Les treize catégories d’annonces sont : Coaching, Recrutement, Partenariat, Sponsoring, Essais groupés, Soins de santé, Arbitre, Juridique, Agent, Média, Sport études, Équipe, Université.

## Adaptations web intentionnelles

- Navigation latérale, profils en colonnes et messagerie à deux panneaux conservés sur ordinateur ; présentation responsive sur petit écran.
- Identité carré ouvert conservée dans les deux thèmes.
- Thème limité à `.studio-surface`, stockage `op-web-appearance`. Il ne change pas le thème global du site vitrine. Les contrôles de thème de l’en-tête et des paramètres utilisent le même état.
- Partage : API de partage du navigateur quand elle accepte les fichiers, sinon téléchargement PNG. Aucun module natif Capacitor n’est ajouté au site.
- Pages invité/téléchargement sous `/espace/invitation` et `/espace/telecharger`. Sans URL de téléchargement officielle, le message indique explicitement l’absence de disponibilité App Store. Sans origine HTTPS configurée, le partage reste un aperçu local comme dans l’app.
- Les échanges, annonces, matchs, rendez-vous et likes restent fictifs et en mémoire. La programmation et le Spotlight ne constituent pas un service serveur en arrière-plan.
- Sept captures réelles `web-20260924-parity-*` renouvelées ; six parcours utilisés dans les aperçus du site. Descriptions des opportunités, secteurs, passeport et Spotlight corrigées. Aucune ancienne capture supprimée.

## Vérifications

- `npm run build` et TypeScript : succès.
- `npm run test:studio` : 106 tests réussis (droits, quotas, profils, filtres, matchs, rendez-vous, partage, Spotlight, i18n, médias, thèmes…).
- `npm run check:app-parity` : 89 fichiers partagés vérifiés, avec adaptation des chemins et exceptions desktop explicites. Nécessite le dossier source mobile à côté du site.
- `npm run test:web-parity` : 42 pages chargées, liens internes vérifiés, langues confinées aux paramètres, absence d’erreurs runtime/assets, dispositions clair/sombre à 320/390/900/1440 px, persistance du thème, messagerie desktop et isolation du site vitrine.
- Tests navigateur spécialisés : annonces pro/organisation, secteurs, filtrage croisé, favoris, connexions/suivis, galerie/vidéo/likes, passeport dans les neuf langues, partage de match, Spotlight, imports de posts, programmation, agenda et demandes de rendez-vous, promotions Premium.
- Régression de la page d’accueil publique : Blog/navigation/liens/images sur quatre largeurs.
- Captures contrôlées visuellement : opportunités desktop sombre, profil desktop clair, sélecteur Jouer ensemble sur petit écran et publication avec filtres dépliés.

Les scripts `parity-*.mjs` et `validate-web-parity.mjs` ciblent le serveur local 3000 ; ils utilisent le runtime Playwright disponible sur ce Mac. Le corpus d’anciens tests du site peut encore contenir des assertions historiques sur le marketing : le contrôle de parité courant est celui documenté ici.

## Prévenir une nouvelle divergence

`scripts/align-app-september24.mjs --check` ne modifie rien et signale toute dérive des fichiers partagés. Une nouvelle migration exige `--apply` et une revue préalable des différences ; ne pas écraser les adaptations web sans examen. `scripts/build-studio-light.mjs` régénère les couleurs web après modification des CSS partagées. Les scripts de synchronisation antérieurs ne doivent pas être exécutés automatiquement.
