# Alignement web — réseau et carré ouvert

- Identité carré ouvert issue des mêmes PNG approuvés que l’application iPhone : en-têtes, pied de page, espace membre, anciens composants de présentation, aperçu 3D sans capture, favicon et image de partage.
- Espace web Réseau : cartes Connexions et Suivis entre Recherche et Invitations ; compteurs issus des relations réelles de la démo, listes recherchables, accès au profil et messagerie pour les connexions acceptées. Aucun verrou Premium sur ces listes. Les membres bloqués sont exclus.
- Badge NEW retiré de Jouer ensemble.
- Page Application : description et limites explicites, captures des deux listes ajoutées, 18 états mobiles recapturés dans chaque thème depuis l’export réellement installé sur iPhone. Les 19 visuels affichés basculent ensemble (l’accueil 3D réutilise un état).
- Présentations ailleurs sur le site : six captures web actualisées, deux captures mobiles de présentation remplacées, textes Réseau adaptés. Les anciennes images conservées ne sont plus référencées par le code de présentation.
- Adaptations de bureau préservées : aucune resynchronisation globale des composants mobiles.

## Vérification

- TypeScript et compilation de production réussis.
- Parcours Réseau FR/EN : acceptation, compteurs, recherche, profils, suivi/désabonnement et retour aux membres.
- Espace web clair/sombre à 1440, 768, 390 et 320 px, sans débordement.
- Page Application : 19 visuels, deux interrupteurs synchronisés et accessibles au clavier, aucune modification du thème global ni des préférences utilisateur ; quatre largeurs vérifiées.
- Tests géométrie et animation des téléphones 3D réussis.

Scripts : `sync-network-brand-assets.mjs`, `capture-application-current.mjs` (avec ou sans `--light`), `capture-network-web.mjs`, `validate-application-visual-theme.mjs`.

Mise à jour locale uniquement : aucun push GitHub et aucun déploiement public effectué.
