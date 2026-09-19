import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { demoMembers } from '@/lib/member-data';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = demoMembers.find((x) => x.slug === slug);
  if (!m) return { title: 'Profil introuvable' };
  const title = `${m.name} · Profil fictif Arena`;
  const description = `${m.role} · ${m.sport} · ${m.city}. Profil de démonstration, sans représentation d’un membre réel.`;
  const image = `https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site/images/${m.image}-color.webp`;
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
  const m = demoMembers.find((x) => x.slug === slug);
  if (!m) notFound();
  redirect('/espace/reseau');
}
