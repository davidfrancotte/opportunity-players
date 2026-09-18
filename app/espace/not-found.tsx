import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="member-empty">
      <span className="member-eyebrow">404 · HORS TERRAIN</span>
      <h1>Ce parcours n’existe pas.</h1>
      <p>
        Le profil, l’annonce ou la page demandé ne fait pas partie de cette
        démonstration.
      </p>
      <Link href="/espace" className="m-button">
        <ArrowLeft size={15} />
        Retour au fil d’actualité
      </Link>
    </div>
  );
}
