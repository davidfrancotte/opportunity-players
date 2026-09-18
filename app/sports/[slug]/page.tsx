import type { Metadata } from 'next';
import { AthleteImage } from '@/components/athlete-image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { sports } from '@/lib/content';
import { Action, JoinBand, SportCard } from '@/components/arena';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = sports.find((s) => s.slug === slug);
  if (!s) return { title: 'Discipline introuvable' };
  return {
    title: `${s.name} — Opportunity Players`,
    description: s.description,
    openGraph: {
      title: `${s.name} — Opportunity Players`,
      description: s.description,
      images: [`/images/${s.image}.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${s.name} — Opportunity Players`,
      description: s.description,
      images: [`/images/${s.image}.webp`],
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = sports.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <main id="main">
      <section className="sport-detail">
        <div>
          <Link href="/sports" className="back-link">
            <ArrowLeft size={15} /> Toutes les disciplines
          </Link>
          <span className="section-label">
            {s.category.toUpperCase()} / {s.name.toUpperCase()}
          </span>
          <h1>
            {s.name}
            <em>.</em>
          </h1>
          <h2>{s.line}</h2>
          <p>{s.description}</p>
          <Action />
          <div className="sport-tags">
            {s.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <figure>
          <AthleteImage
            src={`/images/${s.image}.webp`}
            alt={`Illustration Arena de la discipline ${s.name}`}
            width={1536}
            height={1024}
            style={{ objectPosition: `${s.position} center` }}
          />
          <figcaption>SPORT ILLUSTRÉ · PERSONNAGE FICTIF</figcaption>
        </figure>
      </section>
      <section className="section sport-benefits">
        <div className="section-label">VOTRE PROCHAIN MOUVEMENT</div>
        <div className="three-points">
          {[
            [
              'Présenter',
              'Rassemblez votre expérience, vos compétences et vos médias.',
            ],
            [
              'Découvrir',
              'Explorez les profils et les contenus liés à votre projet sportif.',
            ],
            [
              'Échanger',
              'Développez des relations avec les acteurs de votre discipline.',
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <ArrowUpRight />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-label">LE RÉSEAU CONTINUE</div>
        <h2>
          D’autres terrains.
          <br />
          La même passion.
        </h2>
        <div className="featured-sports">
          {sports
            .filter((x) => x.slug !== s.slug)
            .slice(0, 3)
            .map((x) => (
              <SportCard key={x.slug} sport={x} />
            ))}
        </div>
      </section>
      <JoinBand />
    </main>
  );
}
