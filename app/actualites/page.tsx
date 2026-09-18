import type { Metadata } from 'next';
import { AthleteImage } from '@/components/athlete-image';
import { ArrowUpRight } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Le journal — Opportunity Players',
  description:
    'Des parcours, des points de vue et des rencontres autour du sport. Une sélection du journal Opportunity Players.',
};
const articles = [
  {
    sport: 'TENNIS & RÉSEAU',
    title: 'Dominique Monami et Opportunity Players',
    summary:
      'Une rencontre autour de la transmission, du réseau et de la place du handisport.',
    image: 'tennis',
    slug: 'dominique-monami-et-opportuniy-players-une-union-evidente-fr',
  },
  {
    sport: 'BASKETBALL',
    title: 'La communauté du basket belge',
    summary:
      'Le site présente les liens avec l’AWBB et Basketball Belgium autour des acteurs du basket.',
    image: 'basketball',
    slug: 'lawbb-basketball-belgium-et-opportunity-players-main-dans-la-main-pour-la-communaute-du-basket-belge',
  },
  {
    sport: 'FOOTBALL & PARCOURS',
    title: 'Sarah Huchet, plusieurs vies dans le sport',
    summary:
      'Un parcours à la croisée du football, du droit et de l’accompagnement.',
    image: 'football',
    slug: 'sarah-huchet-lincarnation-de-lecosysteme-du-football',
  },
  {
    sport: 'HANDBALL',
    title: 'Structurer le handball amateur',
    summary:
      'Un échange sur la visibilité et les relations entre clubs, sportifs et encadrement.',
    image: 'handball',
    slug: 'opportunity-players-peut-devenir-un-veritable-levier-pour-la-structuration-du-handball-amateur-fr',
  },
  {
    sport: 'PADEL',
    title: 'Le regard de Guillaume Crasson',
    summary:
      'La pratique du padel et l’importance des connexions entre joueurs, professionnels et clubs.',
    image: 'padel',
    slug: 'guillaume-crasson-dans-la-peau-dun-des-ambassadeurs-liegeois-du-padel-belge',
  },
  {
    sport: 'RECONVERSION',
    title: 'Steve Darcis et l’après-carrière',
    summary:
      'Une conversation sur le parcours sportif, les clubs et la reconversion.',
    image: 'tennis',
    slug: 'steve-darcis-ma-plus-grande-fierte-est-davoir-reussi-ma-reconversion',
  },
];
export default function Page() {
  return (
    <main id="main">
      <section className="page-heading">
        <span className="section-label">
          LE JOURNAL / PARCOURS & RENCONTRES
        </span>
        <h1>
          Le sport se vit.
          <br />
          <em>Et se raconte.</em>
        </h1>
        <p>
          Une sélection des entretiens et histoires publiés par Opportunity
          Players. Les articles complets s’ouvrent sur le site actuel.
        </p>
      </section>
      <section className="section journal-grid">
        {articles.map((a) => (
          <a
            className="journal-card"
            key={a.slug}
            href={`https://www.opportunity-players.com/fr/le-blog/${a.slug}`}
          >
            <div>
              <AthleteImage
                src={`/images/${a.image}.webp`}
                alt={`Visuel illustratif de ${a.sport.toLowerCase()}, sans représentation de la personne interviewée`}
                width={1536}
                height={1024}
                loading="lazy"
              />
              <span>ILLUSTRATION · PAS UN PORTRAIT DE L’INVITÉ</span>
            </div>
            <small>{a.sport}</small>
            <h2>{a.title}</h2>
            <p>{a.summary}</p>
            <span className="text-link">
              Lire l’entretien original <ArrowUpRight size={16} />
            </span>
          </a>
        ))}
      </section>
    </main>
  );
}
