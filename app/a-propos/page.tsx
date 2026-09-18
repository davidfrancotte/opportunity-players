import type { Metadata } from 'next';
import { AthleteImage } from '@/components/athlete-image';
import { Action, JoinBand } from '@/components/arena';
export const metadata: Metadata = {
  title: 'Notre histoire — Opportunity Players',
  description:
    'Faciliter les rencontres entre les sportifs, les professionnels et les organisations qui font vivre le sport.',
};
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <span className="section-label">NOTRE HISTOIRE / UNE CONVICTION</span>
        <h1>
          Le talent mérite
          <br />
          <em>les bonnes rencontres.</em>
        </h1>
        <p>
          La visibilité et le réseau ne devraient pas dépendre uniquement des
          personnes que l’on connaît déjà.
        </p>
      </section>
      <section className="about-story section">
        <div className="about-photo">
          <AthleteImage
            src="/images/athletics.webp"
            alt="Sprinteur fictif illustrant le parcours sportif"
            width={1536}
            height={1024}
          />
          <span>LE PARCOURS APPARTIENT À CHACUN.</span>
        </div>
        <div>
          <span className="section-label">À L’ORIGINE</span>
          <h2>
            Une rencontre.
            <br />
            Puis une idée.
          </h2>
          <p>
            L’histoire publiée par Opportunity Players commence avec Ilias, un
            jeune footballeur en recherche de club, et sa rencontre avec
            Christel. L’aide apportée grâce à un réseau personnel fait émerger
            une question : comment rendre ces connexions plus accessibles ?
          </p>
          <p>
            La plateforme est née de cette volonté de rapprocher les talents
            sportifs et les structures. Son périmètre réunit aujourd’hui
            sportifs, clubs et métiers de l’accompagnement, dans plusieurs
            disciplines.
          </p>
          <a
            className="text-link"
            href="https://www.opportunity-players.com/fr/le-blog/lhistoire-dopportunity-players"
          >
            Lire l’histoire sur le site actuel ↗
          </a>
        </div>
      </section>
      <section className="section values-section">
        <span className="section-label">CE QUI NOUS RASSEMBLE</span>
        <h2>
          Un réseau sportif.
          <br />
          Une ambition humaine.
        </h2>
        <div className="three-points">
          {[
            [
              'Respect',
              'Donner leur place à des parcours, des niveaux et des disciplines différents.',
            ],
            [
              'Bienveillance',
              'Favoriser des échanges utiles entre celles et ceux qui font vivre le sport.',
            ],
            [
              'Réussite',
              'Aider chacun à présenter son projet et à trouver ses interlocuteurs, sans promettre un résultat garanti.',
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="inclusion-section">
        <AthleteImage
          src="/images/adaptive-athletics.webp"
          alt="Illustration d’une sportive en fauteuil de course"
          loading="lazy"
          width={1536}
          height={1024}
        />
        <div>
          <span className="section-label">TOUTES LES TRAJECTOIRES</span>
          <h2>
            Le même droit
            <br />
            d’être visible.
          </h2>
          <p>
            Le sport amateur, le sport féminin et le handisport font partie
            intégrante de l’écosystème. La diversité des parcours doit se voir
            dans le réseau comme dans sa représentation.
          </p>
          <Action href="/sports">Explorer les sports</Action>
        </div>
      </section>
      <JoinBand />
    </main>
  );
}
