import type { Metadata } from 'next';
import { WebShell } from '@/components/studio/web-shell';
import { DemoProvider } from '@/components/studio/demo-provider';
import { UpgradeGate } from '@/components/studio/subscription-ui';
import './studio-globals.css';
import './studio-mobile-app.css';
import './studio-social.css';
import './studio-subscription.css';
import './studio-events.css';
import './studio-trust.css';
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
      <DemoProvider>
        <WebShell>
          <noscript>
            <p className="no-script">
              Activez JavaScript pour essayer la démo. Ne saisissez pas de
              données personnelles.
            </p>
          </noscript>
          {children}
          <p className="web-safety-note">
            Démo uniquement : profils fictifs, aucun envoi réel, aucun paiement.
            Les modifications s’effacent au rechargement.
          </p>
        </WebShell>
        <UpgradeGate />
      </DemoProvider>
    </div>
  );
}
