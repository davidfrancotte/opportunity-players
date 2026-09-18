import type { Metadata } from 'next';
import { AppShowcase } from '@/components/app-showcase';
import { Action, JoinBand, ProductDemo, SectionHead } from '@/components/arena';
export const metadata: Metadata = {
  title: 'La plateforme — Opportunity Players',
  description:
    'Un profil sportif, un réseau et des échanges autour de votre projet. Découvrez les usages d’Opportunity Players.',
};
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <div className="section-label">
          LA PLATEFORME / VOTRE ESPACE SPORTIF
        </div>
        <h1>
          Tout votre parcours.
          <br />
          <em>De nouvelles perspectives.</em>
        </h1>
        <p>
          Un espace pour présenter ce que vous faites et rencontrer celles et
          ceux avec qui avancer.
        </p>
        <Action />
      </section>
      <section className="section platform-demo">
        <ProductDemo />
      </section>
      <section className="section">
        <SectionHead
          number="PENSÉ POUR LE SPORT"
          title={
            <>
              Les bons outils.
              <br />
              Pour les bonnes rencontres.
            </>
          }
        />
        <div className="feature-rows">
          {[
            [
              '01',
              'Votre profil, votre carte de visite.',
              'Présentation, expériences, compétences, palmarès et médias : rassemblez les éléments qui racontent votre parcours. Le profil sportif propose aussi des informations adaptées à votre discipline et un CV à télécharger.',
            ],
            [
              '02',
              'Un réseau qui parle votre sport.',
              'Découvrez des joueurs et joueuses, des coachs, des clubs et des professionnels. Suivez les profils qui vous intéressent et leurs publications.',
            ],
            [
              '03',
              'Des annonces pour vos projets.',
              'Les membres peuvent partager leurs besoins et leurs opportunités. Consultez leur contexte et identifiez les interlocuteurs pertinents.',
            ],
            [
              '04',
              'Des échanges qui gardent le contexte.',
              'La messagerie permet de poursuivre une rencontre au sein de la plateforme. Les droits de contact dépendent de votre offre et des règles applicables.',
            ],
            [
              '05',
              'Du contenu qui vous ressemble.',
              'Articles, photos, vidéos et documents vous permettent de donner de la profondeur à votre présentation. Les formats et limites sont indiqués dans votre espace.',
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <AppShowcase variant="platform" />
      <section className="section platform-note">
        <span className="section-label">UNE REFONTE EN COURS</span>
        <p>
          L’aperçu présente la nouvelle direction Arena. Les fonctions décrites
          s’appuient sur le service actuel ; l’interface ci-dessus est
          illustrative. Vos comptes et vos échanges restent sur la plateforme
          existante.
        </p>
      </section>
      <JoinBand />
    </main>
  );
}
