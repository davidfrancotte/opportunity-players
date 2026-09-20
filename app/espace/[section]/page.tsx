import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { StudioScreen } from '@/components/studio/studio-screen';
const screens: Record<string, string> = {
  candidatures: 'Candidatures et essais',
  recrutement: 'Espace recrutement',
  'rendez-vous': 'Mes rendez-vous',
  'dossier-sportif': 'Dossier sportif',
  disciplines: 'Sports, niveaux et clubs',
  agent: 'Mon agent',
  documents: 'CV et références',
  securite: 'Sécurité et modération',
  parrainage: 'Inviter mon réseau',
  confidentialite: 'Confidentialité et charte',
  'double-facteur': 'Seconde validation',
  accueil: 'Accueil',
  reseau: 'Mon réseau',
  jouer: 'Jouer ensemble',
  organiser: 'Organiser un match',
  match: 'Votre match',
  agenda: 'Mon agenda',
  notifications: 'Notifications',
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
  if (!screens[section]) notFound();
  return <StudioScreen screen={section} />;
}
