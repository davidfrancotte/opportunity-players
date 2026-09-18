import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoOpportunities } from '@/lib/member-data';
import { OpportunityDetail } from '@/components/member-pages';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = demoOpportunities.find((x) => x.slug === slug);
  if (!o) return { title: 'Annonce introuvable' };
  const title = `${o.title} · Annonce fictive Arena`;
  const description = `${o.intro} Démonstration : aucune offre réelle.`;
  const image = `https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site/images/${o.image}-color.webp`;
  return {
    title,
    description,
    openGraph: { title, description, images: [image] },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const o = demoOpportunities.find((x) => x.slug === slug);
  if (!o) notFound();
  return <OpportunityDetail opportunity={o} />;
}
