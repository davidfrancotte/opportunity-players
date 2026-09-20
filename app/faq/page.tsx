import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqDirectory } from '@/components/faq-directory';
import './faq.css';
export const metadata: Metadata = {
  title: 'FAQ — Opportunity Players',
  description:
    'Comptes gratuits, Premium, profils multisports, réseau, messages, matchs, recrutement et rendez-vous : les réponses sur la nouvelle version.',
};
export default function FaqPage() {
  return (
    <main id="main" className="op-faq">
      <header className="section faq-page-heading">
        <span className="section-label">LES RÉPONSES / POUR AVANCER</span>
        <h1>
          Vos questions.
          <br />
          <em>Le jeu au clair.</em>
        </h1>
        <p>Comprendre votre profil, vos accès et les outils du réseau.</p>
      </header>
      <section className="section faq-page-content">
        <div className="faq-demo-note">
          <strong>Vous explorez la nouvelle version en démonstration.</strong>
          <p>
            Les règles d’accès ci-dessous correspondent à cette version. Les
            échanges et abonnements sont fictifs ; les connexions externes et la
            sécurité de production ne sont pas activées. Vos comptes actuels ne
            sont pas modifiés.
          </p>
        </div>
        <FaqDirectory />
      </section>
      <section className="section faq-contact">
        <h2>Vous avez encore une question ?</h2>
        <p>
          L’équipe vous accompagne pour une question sur le service ou un
          problème technique.
        </p>
        <Link href="/aide" className="text-link">
          Contacter l’équipe ↗
        </Link>
      </section>
    </main>
  );
}
