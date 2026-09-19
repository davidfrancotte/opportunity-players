import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { StudioScreen } from '@/components/studio/studio-screen';
const screens: Record<string, string> = {
  accueil: 'Accueil',
  reseau: 'Mon réseau',
  messages: 'Messages',
  opportunities: 'Opportunities',
  abonnement: 'Mon abonnement',
  inscription: 'Créer un compte',
  verification: 'Vérifier votre e-mail',
  personnalisation: 'Votre univers sportif',
  presentation: 'Votre présentation',
  connexion: 'Connexion',
  'mot-de-passe-oublie': 'Retrouver votre accès',
  profil: 'Mon profil',
  parcours: 'Mon parcours',
  medias: 'Mes médias',
  'modifier-profil': 'Modifier mon profil',
  parametres: 'Réglages de la démo',
};
type Props = { params: Promise<{ section: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return {
    title: (screens[section] || 'Espace membre') + ' — Arena Studio',
    description:
      'La démo interactive Opportunity Players, avec le design et les fonctionnalités de l’application mobile.',
  };
}
export default async function Page({ params }: Props) {
  const { section } = await params;
  if (section === 'opportunites') redirect('/espace/opportunities');
  if (section === 'notifications') redirect('/espace/accueil');
  if (!screens[section]) notFound();
  return <StudioScreen screen={section} />;
}
