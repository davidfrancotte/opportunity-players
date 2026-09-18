import type { Metadata } from 'next';
import { AthleteImage } from '@/components/athlete-image';
import { SportsExplorer, JoinBand } from '@/components/arena';
export const metadata: Metadata = {
  title: 'Les sports — Opportunity Players',
  description:
    'Découvrez les disciplines représentées dans le réseau sportif Opportunity Players.',
};
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <span className="section-label">
          LES DISCIPLINES / UNE PASSION COMMUNE
        </span>
        <h1>
          Votre sport.
          <br />
          <em>Votre terrain de rencontre.</em>
        </h1>
        <p>
          Des pratiques différentes. La même envie de progresser, de partager et
          de faire les bonnes rencontres.
        </p>
      </section>
      <section className="section sports-directory">
        <SportsExplorer />
        <p className="directory-note">
          Sélection de disciplines représentées dans les contenus actuels. Le
          sport disponible pour votre profil se choisit sur la plateforme.
          Visuels illustratifs.
        </p>
      </section>
      <section className="inclusion-section">
        <AthleteImage
          src="/images/adaptive-athletics.webp"
          alt="Athlète fictive en fauteuil de course illustrant le handisport"
          width={1536}
          height={1024}
          loading="lazy"
        />
        <div>
          <span className="section-label">TOUTES LES TRAJECTOIRES</span>
          <h2>
            Le sport,
            <br />
            sans angle mort.
          </h2>
          <p>
            Le handisport traverse de nombreuses disciplines. Il fait partie du
            réseau et de notre regard sur le sport, pas d’une catégorie à part.
          </p>
        </div>
      </section>
      <JoinBand />
    </main>
  );
}
