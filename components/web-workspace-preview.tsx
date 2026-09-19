import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Monitor } from 'lucide-react';
import './web-workspace-preview.css';

export function WebWorkspacePreview() {
  return (
    <figure className="web-workspace-preview">
      <div className="workspace-preview-bar">
        <span>
          <Monitor size={16} />
          VOTRE ESPACE, SUR ORDINATEUR
        </span>
        <span>OPPORTUNITY PLAYERS</span>
      </div>
      <Link
        href="/espace/connexion"
        className="workspace-preview-link"
        aria-label="Découvrir l’espace membre web et se connecter à la démo"
      >
        <Image
          unoptimized
          src="/app-visuals/studio-web-accueil.png"
          alt="Capture réelle de l’espace membre web Opportunity Players : menu latéral, fil sportif, accès aux matchs, réseau et opportunités."
          width={1440}
          height={1000}
          loading="lazy"
        />
        <span className="workspace-preview-cta">
          Explorer mon espace web <ArrowUpRight size={18} />
        </span>
      </Link>
      <figcaption>
        <span>VOTRE FIL. VOS RENCONTRES. VOS MATCHS.</span>
        <span>Capture réelle de la démo · contenus fictifs</span>
      </figcaption>
    </figure>
  );
}
