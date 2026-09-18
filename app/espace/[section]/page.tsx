import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  NetworkPage,
  OpportunitiesPage,
  ProfilePage,
  MessagesPage,
  GalleryPage,
  NotificationsPage,
  SettingsPage,
} from '@/components/member-pages';
import { memberPages } from '@/lib/member-data';
type Props = {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ q?: string; avec?: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const p = memberPages[section as keyof typeof memberPages];
  return {
    title: p ? `${p.title} · Démo Arena` : 'Page introuvable',
    description: p?.description,
  };
}
export default async function Page({ params, searchParams }: Props) {
  const { section } = await params;
  const search = await searchParams;
  switch (section) {
    case 'reseau':
      return (
        <NetworkPage
          key={search.q ?? ''}
          initialQuery={typeof search.q === 'string' ? search.q : ''}
        />
      );
    case 'opportunites':
      return <OpportunitiesPage />;
    case 'profil':
      return <ProfilePage />;
    case 'messages':
      return (
        <MessagesPage
          key={search.avec ?? ''}
          initialContact={
            typeof search.avec === 'string' ? search.avec : undefined
          }
        />
      );
    case 'medias':
      return <GalleryPage />;
    case 'notifications':
      return <NotificationsPage />;
    case 'parametres':
      return <SettingsPage />;
    default:
      notFound();
  }
}
