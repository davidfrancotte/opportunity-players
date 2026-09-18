import type { Metadata } from 'next';
import { AthleteImage } from '@/components/athlete-image';
import { JoinFlow } from '@/components/arena';
export const metadata: Metadata = {
  title: 'Rejoindre le réseau — Opportunity Players',
  description:
    'Sportif, professionnel ou organisation : commencez votre parcours sur Opportunity Players.',
};
export default function Page() {
  return (
    <main id="main" className="join-page">
      <div className="join-page-visual">
        <AthleteImage
          src="/images/arena-collective.jpg"
          alt="Composition sportive illustrative Arena"
          width={1440}
          height={720}
        />
        <div>
          <span className="section-label">LE RÉSEAU DES ACTEURS DU SPORT</span>
          <h1>
            Votre prochaine
            <br />
            rencontre
            <br />
            <em>commence ici.</em>
          </h1>
        </div>
      </div>
      <JoinFlow />
    </main>
  );
}
