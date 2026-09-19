import type { Metadata } from 'next';
import Link from 'next/link';
import { DemoProvider } from '@/components/studio/demo-provider';
import { UpgradeGate } from '@/components/studio/subscription-ui';
import './studio-globals.css';
import './studio-mobile-app.css';
import './studio-social.css';
import './studio-subscription.css';
import './studio-web.css';
export const metadata: Metadata = {
  title: 'Espace membre · Démo Arena',
  description:
    'Explorez la démonstration de l’espace membre Opportunity Players. Profils et échanges fictifs.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Espace membre · Démo Arena',
    description: 'Une démonstration avec des profils fictifs.',
    images: [],
  },
  twitter: {
    title: 'Espace membre · Démo Arena',
    description: 'Une démonstration avec des profils fictifs.',
    images: [],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-surface">
      <aside className="studio-web-aside">
        <Link href="/" className="studio-back">
          ← Retour au site
        </Link>
        <span className="studio-web-label">
          OPPORTUNITY PLAYERS / ARENA STUDIO
        </span>
        <h2>
          Le terrain
          <br />
          des bonnes
          <br />
          <em>rencontres.</em>
        </h2>
        <p>
          Retrouvez l’expérience de l’application : votre communauté, vos
          échanges et vos prochaines opportunités.
        </p>
        <Link href="/application">Découvrir l’application ↗</Link>
        <Link href="/tarifs">Comparer les formules ↗</Link>
        <small>
          Démo uniquement. Profils fictifs, aucun envoi réel, aucun paiement.
          Les modifications s’effacent au rechargement.
        </small>
      </aside>
      <DemoProvider>
        <div className="mobile-app-frame">
          <nav
            className="studio-web-return"
            aria-label="Retour au site vitrine"
          >
            <Link href="/">← Le site</Link>
            <Link href="/application">L’application ↗</Link>
          </nav>
          <noscript>
            <p className="no-script">
              Activez JavaScript pour essayer la démo. Ne saisissez pas de
              données personnelles.
            </p>
          </noscript>
          {children}
        </div>
        <UpgradeGate />
      </DemoProvider>
    </div>
  );
}
