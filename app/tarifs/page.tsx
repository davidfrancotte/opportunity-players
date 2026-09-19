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
      '5 messages envoyés par mois',
      'Réception de messages et commentaires autorisés sur les publications ouvertes',
      'Pas de création de publications',
    ],
    premium: [
      'Tout le socle gratuit',
      'Publication de vos actualités et de vos images',
      'Messages envoyés sans la limite de 5 par mois',
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
      'Pas de communication avec les joueurs',
      'Pas de réception de messages ni de commentaires',
    ],
    premium: [
      'Tout le socle gratuit',
      'Communication avec les joueurs',
      'Réception de messages',
      'Réception de commentaires sur vos publications',
    ],
  },
  {
    category: 'Organisation',
    name: 'Collectifs',
    icon: UsersRound,
    line: 'Donnez de l’élan à votre communauté.',
    free: [
      'Profil, exploration du réseau et suivi de membres',
      'Création de publications',
      'Pas de communication avec les joueurs',
      'Pas de réception de messages ni de commentaires',
    ],
    premium: [
      'Tout le socle gratuit',
      'Communication avec les joueurs',
      'Réception de messages',
      'Réception de commentaires sur vos publications',
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
              <h3>Comment les 5 messages sont-ils comptés ?</h3>
              <p>
                Pour un sportif gratuit, chaque message envoyé compte, même dans
                une conversation déjà ouverte. Le compteur est commun à toutes
                les conversations et repart à cinq au début de chaque mois,
                selon l’heure de Bruxelles. La réception de messages et les
                commentaires ne consomment pas ce quota.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Un abonnement permet-il de contacter tout le monde ?</h3>
              <p>
                Un professionnel ou un collectif doit avoir Premium pour
                recevoir des messages ou des commentaires. Votre propre
                abonnement ne débloque pas la réception chez un destinataire
                gratuit. Les professionnels et collectifs gratuits peuvent
                écrire à d’autres professionnels ou collectifs abonnés, mais pas
                aux joueurs.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Qui peut publier et commenter ?</h3>
              <p>
                Les sportifs publient avec Premium. Les professionnels et
                collectifs peuvent publier gratuitement, mais doivent être
                abonnés pour recevoir des commentaires ou communiquer avec des
                joueurs, y compris sous leurs publications.
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
