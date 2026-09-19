import type { Metadata } from 'next';
import { FeedPage } from '@/components/studio/social-screens';
export const metadata: Metadata = {
  title: 'Fil d’actualité · Démo Arena',
  description: 'Explorez le fil d’actualité sportif de démonstration Arena.',
};
export default function Page() {
  return <FeedPage />;
}
