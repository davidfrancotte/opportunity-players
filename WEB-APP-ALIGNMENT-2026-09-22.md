# Alignement web / app — 22 septembre 2026

Document historique, remplacé par `WEB-APP-ALIGNMENT-2026-09-24.md`, notamment pour les catégories d’opportunités, les langues et les fonctionnalités de partage.

Version concernée : ce projet Next.js/Netlify. L’app autonome et l’ancien projet Sites n’ont pas été modifiés par cette livraison. Aucune mise en production ni modification du domaine officiel.

## Fonctionnalités reprises

- Accueil centré sur les publications des membres suivis, sans blocs de recommandations ni rail contextuel ; trois lignes maximum puis ouverture du post complet.
- Filtres Premium du fil : matchs ouverts, emplois, opportunités et sous-catégories, news et divers.
- Publications : discipline « - » par défaut, import réel de fichier local image/vidéo, validation de format/taille/lecture, aperçu, retrait/remplacement. Le média est conservé pendant les navigations et lors d’une programmation, puis libéré au retrait/réinitialisation.
- Programmation visible mais désactivée en gratuit, avec badge et lien Premium ; active pour les abonnés. Aucun service de diffusion en arrière-plan.
- Réseau : recherche simple, filtres pays/ville/sport/classement dépliables pour tous mais utilisables en Premium, deux invitations visibles puis extension, suggestions de membres. Un seul contour de focus dans la recherche.
- Suivre reste unilatéral ; Connect demande l’accord du destinataire. Après acceptation : messages sans quota et invitations directes aux matchs. Bouton Suivre/Ne plus suivre aligné à droite de Connect.
- Jouer ensemble : Mes invitations, J’organise, À proximité, puis Sport. Proximité et alertes Premium ; rayon dans Mes invitations et À proximité.
- Agenda unique : calendrier mensuel, dates colorées, liste et filtres matchs/RDV pro/spectateur. Demandes de RDV dépliables, compteur des non-confirmées, contenu, acceptation/refus et confirmation du créneau. Ancien agenda avancé redirigé vers ce même écran.
- Opportunités : six catégories, dont Essais groupés ; anciens raccourcis retirés de la page.
- Profil/Médias : import de photos/vidéos, aperçu et quotas ; bouton Ajouter un média lisible.
- Promotions Premium absentes une fois Premium activé.

La navigation desktop, la messagerie en deux panneaux, le mode clair/sombre et le parcours web d’inscription sont conservés. Les styles importés sont limités à l’espace membre ; les contrôles de l’agenda ont leurs couleurs adaptées au mode clair.

## Site vitrine et visuels

- Correction après revue : la page Application suit désormais les cinq onglets principaux. Candidatures et recrutement sont décrits sous Opportunités, sans réutiliser les captures de leur ancien menu secondaire. Publier, Jouer ensemble, Agenda et Médias sont clairement identifiés comme parcours internes. Confiance et parrainage restent présentés comme outils complémentaires.
- Les neuf visuels `studio-20260922-current-*` sont recapturés avec `scripts/capture-application-current.mjs` dans des états qui montrent les fonctionnalités : filtres Premium ouverts, filtre gratuit déplié, photo importée et programmation Premium visible, proximité, essai groupé sélectionné, conversation ouverte et ajout de médias. Les légendes précisent le contexte. Ces fichiers remplacent sur la page Application les premières captures génériques prises en haut de chaque route.
- Page Application : textes et fonctionnalités actualisés ; section Publier ; section Agenda unique.
- Accueil : présentation du fil communautaire, des connexions et de l’agenda ; six captures web actualisées, nouveaux écrans dans le smartphone 3D.
- Aperçus Plateforme et visuel de connexion également actualisés pour éviter les anciennes descriptions de recherche.
- Captures réelles de données fictives, générées par `scripts/capture-september.mjs` : mobile 390×844 à 2×, web 1440×1000. Pas de maquettes générées ni de fausses captures. Les anciennes images restent disponibles, sans être utilisées pour ces aperçus.
- Direction artistique, photos sportives, modèle 3D, animations et logos existants conservés.

## Vérification reproductible

`npm run typecheck`, `npm run build`, `node --test scripts/studio-*.test.mjs`.

Avec la version web sur 127.0.0.1:3000 et l’app sur 127.0.0.1:3002 :

`node scripts/validate-september-site.mjs` vérifie les pages publiques, les captures, les onglets et les débordements à 390 et 1440 px.

`scripts/parity-*.mjs` reprend les tests navigateur de l’app sur les routes `/espace/` : communauté, connexions, agenda/demandes, médias, uploads de posts, extraits, promotions et opportunités. Les tests d’upload vidéo prennent le chemin d’un MP4 lisible en argument. `prepare-web-parity-tests.mjs` prépare ces adaptations ; il ne modifie pas l’application.

`align-app-september.mjs` est une migration ponctuelle revue, bloquée si elle a déjà été appliquée. Ne pas relancer une synchronisation mobile complète : elle effacerait les adaptations desktop.

## Limites inchangées

Démo en mémoire : aucun compte, paiement, message ou rendez-vous réel. Fichiers locaux temporaires, aucun téléversement serveur. Acceptation du destinataire simulée explicitement. La production nécessite les services métier et les contrôles serveur correspondants.
