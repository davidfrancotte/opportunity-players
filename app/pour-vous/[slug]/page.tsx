import type { Metadata } from 'next';
import { AppShowcase } from '@/components/app-showcase';
import { AthleteImage } from '@/components/athlete-image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { audiences } from '@/lib/content';
import { Action, JoinBand, AudienceCards } from '@/components/arena';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = audiences.find((a) => a.slug === slug);
  if (!a) return { title: 'Page introuvable' };
  return {
    title: `${a.name} — Opportunity Players`,
    description: a.intro,
    openGraph: {
      title: `${a.name} — Opportunity Players`,
      description: a.intro,
      images: [`/images/${a.image}.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${a.name} — Opportunity Players`,
      description: a.intro,
      images: [`/images/${a.image}.webp`],
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = audiences.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <main id="main">
      <div className="audience-subnav">
        {audiences.map((x) => (
          <Link
            key={x.slug}
            href={`/pour-vous/${x.slug}`}
            aria-current={x.slug === slug ? 'page' : undefined}
          >
            {x.name}
          </Link>
        ))}
      </div>
      <section className="audience-hero">
        <div>
          <span className="section-label">
            POUR VOUS / {a.name.toUpperCase()}
          </span>
          <h1>
            {a.title.split(' ').slice(0, 2).join(' ')}
            <br />
            <em>{a.title.split(' ').slice(2).join(' ')}</em>
          </h1>
          <p>{a.intro}</p>
          <Action />
        </div>
        <AthleteImage
          src={`/images/${a.image}.webp`}
          alt="Photographie sportive illustrative Arena"
          width={1536}
          height={1024}
        />
      </section>
      <section className="section">
        <div className="feature-rows">
          {a.features.map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <span className="section-label">UN ÉCOSYSTÈME COMMUN</span>
        <h2>
          Et autour de vous,
          <br />
          tout un collectif.
        </h2>
        <AudienceCards />
      </section>
      <AppShowcase variant="audience" audience={slug} />
      <JoinBand />
    </main>
  );
}
