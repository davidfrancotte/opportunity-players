import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  ArrowUpRight,
  UserRound,
  BriefcaseBusiness,
  UsersRound,
} from 'lucide-react';
import { monthlyPrice } from '@/lib/studio/pricing';
import type { Category } from '@/lib/studio/model';
import './pricing.css';
export const metadata: Metadata = {
  title: 'Les formules — Opportunity Players',
  description:
    'Compte gratuit pour tous. Premium Sportif à 2,99 €/mois, Professionnel à 14,99 €/mois et Collectif à 29,99 €/mois.',
};
const plans: {
  category: Category;
  name: string;
  icon: typeof UserRound;
  line: string;
  free: string[];
  premium: string[];
}[] = [
  {
    category: 'Sportif',
    name: 'Sportifs',
    icon: UserRound,
    line: 'Faites grandir votre parcours.',
    free: [
      'Profil, exploration du réseau et suivi de membres',
      '3 nouvelles prises de contact par mois ; réponses gratuites',
      'Réception de messages et commentaires autorisés sur les publications ouvertes',
      'Pas de création de publications',
    ],
    premium: [
      'Tout le socle gratuit',
      'Publication de vos actualités et de vos images',
      '30 nouvelles prises de contact par mois',
      'Recherches favorites avec alertes, publications programmées et agenda avancé',
    ],
  },
  {
    category: 'Professionnel',
    name: 'Professionnels',
    icon: BriefcaseBusiness,
    line: 'Transformez votre expertise en échanges.',
    free: [
      'Profil, exploration du réseau et suivi de membres',
      'Création de publications',
      '3 nouvelles prises de contact par mois, y compris avec les joueurs',
      'Réception, réponses et commentaires gratuits',
    ],
    premium: [
      'Tout le socle gratuit',
      '100 nouvelles prises de contact par mois',
      '5 offres actives, listes de talents et portefeuille avec notes privées',
      'Essais groupés, disponibilités récurrentes et statistiques',
    ],
  },
  {
    category: 'Organisation',
    name: 'Collectifs',
    icon: UsersRound,
    line: 'Donnez de l’élan à votre communauté.',
    free: [
      'Profil, exploration du réseau et suivi de membres',
      '1 offre active et 1 gestionnaire ; publications avec Premium',
      '5 nouvelles prises de contact par mois',
      'Réception, réponses, commentaires et réactions gratuits',
    ],
    premium: [
      'Tout le socle gratuit',
      '200 nouvelles prises de contact par mois, partagées entre gestionnaires',
      '10 offres actives, 5 gestionnaires et viviers de recrutement',
      'Publications, équipes, essais groupés et coordination des entretiens',
    ],
  },
];
export default function Page() {
  return (
    <main id="main" className="plans-page">
      <section className="page-heading">
        <span className="section-label">
          LES FORMULES / À CHACUN SON TERRAIN
        </span>
        <h1>
          Entrez dans le réseau.
          <br />
          <em>Ouvrez les possibilités.</em>
        </h1>
        <p>
          La création de compte est gratuite pour les sportifs, les
          professionnels et les collectifs. Passez à Premium lorsque vous
          souhaitez développer vos échanges.
        </p>
      </section>
      <section className="section plans-section">
        <div className="plans-free-banner">
          <div>
            <span className="section-label">LE POINT DE DÉPART, POUR TOUS</span>
            <h2>
              Un profil. Un réseau. <em>0 €.</em>
            </h2>
            <p>
              Présentez-vous, explorez la communauté et suivez les profils qui
              vous intéressent. Les droits de publication et de messagerie
              dépendent de votre catégorie.
            </p>
          </div>
          <Link href="/espace/inscription" className="action">
            Essayer gratuitement <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="plans-grid">
          {plans.map(({ category, name, icon: Icon, line, free, premium }) => (
            <article className="plan-card" key={category}>
              <div className="plan-card-label">
                <Icon size={21} />
                <span>PREMIUM</span>
              </div>
              <h2>{name}</h2>
              <p className="plan-line">{line}</p>
              <div className="plan-monthly">
                <strong>{monthlyPrice(category)}</strong>
                <span>/ mois</span>
              </div>
              <div className="plan-free">
                <h3>Votre accès gratuit</h3>
                <ul>
                  {free.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  <li>Réponse aux invitations personnelles à jouer</li>
                </ul>
              </div>
              <div className="plan-premium">
                <h3>Ce que Premium débloque</h3>
                <ul>
                  {premium.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li>
                    <Check size={15} />
                    <span>
                      Organisation de matchs et invitations de vos contacts
                    </span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Découverte des matchs ouverts dans les 50 km</span>
                  </li>
                </ul>
              </div>
              <Link href="/espace/abonnement" className="action">
                Découvrir Premium <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Tarifs mensuels validés pour la future expérience Arena Studio. Cette
          préversion ne traite aucun paiement, ne crée aucun abonnement réel et
          ne modifie pas les offres de l’application actuellement disponible sur
          les stores. Les conditions contractuelles et fiscales seront précisées
          avant toute commercialisation.
        </p>
      </section>
      <section className="section plans-rules">
        <div>
          <span className="section-label">PAS DE PETITES LIGNES CACHÉES</span>
          <h2>
            Des règles simples.
            <br />
            <em>Des échanges clairs.</em>
          </h2>
        </div>
        <div className="plans-answers">
          <article>
            <span>01</span>
            <div>
              <h3>Comment les nouvelles prises de contact sont-elles comptées ?</h3>
              <p>
                Seul le premier message à un nouvel interlocuteur consomme le quota.
                Gratuit : 3 demandes par mois pour les sportifs et professionnels,
                5 pour les collectifs. Premium : respectivement 30, 100 et 200.
                Réceptions, réponses et conversations déjà engagées restent gratuites.
                Les quotas se renouvellent au début du mois, heure de Bruxelles.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Un abonnement permet-il de contacter tout le monde ?</h3>
              <p>
                Toutes les catégories peuvent recevoir des messages et poursuivre leurs
                conversations sans abonnement. Premium augmente le nombre de nouveaux
                contacts et ajoute des outils métier ; il ne contourne jamais un blocage
                ou les règles de sécurité.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Qui peut publier et commenter ?</h3>
              <p>
                Les sportifs et collectifs créent des publications avec Premium.
                Les professionnels peuvent publier gratuitement. Pour tous les profils,
                commentaires, réactions et partages restent gratuits. La programmation
                des publications est une extension Premium.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h3>Puis-je tester sans payer ?</h3>
              <p>
                Oui. L’espace Connexion ouvre la même démonstration que l’app
                mobile. Dans « Abonnement », choisissez un profil sportif,
                professionnel ou collectif, puis simulez Premium. Aucun achat,
                prélèvement ou renouvellement n’est effectué ; l’état de la démo
                est effacé au rechargement.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section plans-outro">
        <h2>
          Le bon outil.
          <br />
          <em>Pour votre prochain pas.</em>
        </h2>
        <Link href="/application" className="text-link">
          Explorer les fonctionnalités de l’application{' '}
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
