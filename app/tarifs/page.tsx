import type { Metadata } from 'next';
import { Check, ArrowUpRight } from 'lucide-react';
import { Action, FAQ } from '@/components/arena';
import { currentSite } from '@/lib/content';
export const metadata: Metadata = {
  title: 'Les formules — Opportunity Players',
  description:
    'Commencez gratuitement et découvrez les options Premium de la plateforme Opportunity Players.',
};
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <span className="section-label">
          LES FORMULES / LE CHOIX DE VOTRE PARCOURS
        </span>
        <h1>
          Commencez gratuitement.
          <br />
          <em>Avancez à votre rythme.</em>
        </h1>
        <p>
          Un accès gratuit pour rejoindre le réseau. Des options Premium pour
          aller plus loin selon votre profil et vos besoins.
        </p>
      </section>
      <section className="section pricing-section">
        <div className="pricing-grid">
          <article className="price-card free">
            <span className="price-kicker">LE PREMIER PAS</span>
            <h2>Gratuit</h2>
            <div className="price">
              0 €<span>pour créer votre compte</span>
            </div>
            <p>
              Rejoignez un espace dédié aux acteurs du sport, sans carte
              bancaire.
            </p>
            <ul>
              {[
                'Création de compte',
                'Accès à votre espace personnel',
                'Découverte de la plateforme',
                'Sans souscription Premium obligatoire',
              ].map((t) => (
                <li key={t}>
                  <Check size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <Action />
          </article>
          <article className="price-card">
            <span className="price-kicker">POUR ALLER PLUS LOIN</span>
            <h2>
              Premium
              <ArrowUpRight />
            </h2>
            <div className="premium-price">
              Une offre adaptée
              <br />à votre profil.
            </div>
            <p>
              La plateforme présente des fonctions supplémentaires pour
              développer vos échanges.
            </p>
            <ul>
              {[
                'Recherche avancée selon votre offre',
                'Possibilités de contact étendues',
                'Formule mensuelle ou annuelle',
                'Gestion de l’abonnement depuis votre compte',
              ].map((t) => (
                <li key={t}>
                  <Check size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <a
              className="action action-secondary"
              href={`${currentSite}/nos-formules`}
            >
              Consulter les offres actuelles <ArrowUpRight size={18} />
            </a>
          </article>
        </div>
        <p className="pricing-note">
          Les droits précis, les tarifs, les promotions et les conditions de
          renouvellement sont à vérifier sur la plateforme actuelle avant
          souscription. Cette préversion ne traite aucun paiement et ne modifie
          aucun abonnement.
        </p>
      </section>
      <section className="section faq-section">
        <div>
          <span className="section-label">LES QUESTIONS ESSENTIELLES</span>
          <h2>
            En toute
            <br />
            <em>clarté.</em>
          </h2>
        </div>
        <FAQ compact />
      </section>
    </main>
  );
}
