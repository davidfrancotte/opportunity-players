import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return (
    <main id="main" className="profile-layout">
      <span className="eyebrow">404 · HORS TERRAIN</span>
      <h1>Ce parcours n’existe pas.</h1>
      <p>
        Le profil, l’annonce ou la page demandé ne fait pas partie de cette
        démonstration.
      </p>
      <Link href="/espace/accueil" className="action primary">
        <ArrowLeft size={15} />
        Retour au fil d’actualité
      </Link>
    </main>
  );
}
