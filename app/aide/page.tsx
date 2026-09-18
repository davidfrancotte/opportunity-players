import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { FAQ } from '@/components/arena';
export const metadata: Metadata = {
  title: 'Aide et contact — Opportunity Players',
  description:
    'Les réponses aux questions sur les comptes, les profils, les vidéos et le réseau Opportunity Players.',
};
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <span className="section-label">AIDE & CONTACT</span>
        <h1>
          Une question ?<br />
          <em>On joue collectif.</em>
        </h1>
        <p>
          Les réponses essentielles pour faire vos premiers pas et comprendre la
          plateforme.
        </p>
      </section>
      <section className="section help-content">
        <FAQ />
        <div className="contact-grid">
          <a href="mailto:site@opportunity-players.com">
            <span>UNE QUESTION SUR LE SERVICE</span>
            <h3>Échangeons.</h3>
            <p>site@opportunity-players.com</p>
            <ArrowUpRight />
          </a>
          <a href="mailto:technical@opportunity-players.com">
            <span>UN PROBLÈME TECHNIQUE</span>
            <h3>On vous aide.</h3>
            <p>technical@opportunity-players.com</p>
            <ArrowUpRight />
          </a>
        </div>
        <p className="directory-note">
          Pour une question de compte, ne communiquez jamais votre mot de passe.
          Décrivez le problème et l’écran concerné.
        </p>
      </section>
    </main>
  );
}
