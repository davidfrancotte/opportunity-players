import type { Metadata } from 'next';
import { MemberShell } from '@/components/member-shell';
import './member.css';
export const metadata: Metadata = {
  title: 'Espace membre · Démo Arena',
  description:
    'Explorez la démonstration de l’espace membre Opportunity Players. Profils et échanges fictifs.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Espace membre · Démo Arena',
    description: 'Une démonstration avec des profils fictifs.',
    images: [],
  },
  twitter: {
    title: 'Espace membre · Démo Arena',
    description: 'Une démonstration avec des profils fictifs.',
    images: [],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MemberShell>{children}</MemberShell>;
}
