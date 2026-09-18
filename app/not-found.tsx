import { Action } from '@/components/arena';
export default function NotFound() {
  return (
    <main id="main">
      <section className="page-heading not-found">
        <span className="section-label">404 / HORS DU TERRAIN</span>
        <h1>
          Cette page n’est
          <br />
          <em>plus dans le jeu.</em>
        </h1>
        <p>
          Le lien est peut-être incomplet. Retrouvez le réseau depuis l’accueil.
        </p>
        <Action href="/">Retour à l’accueil</Action>
      </section>
    </main>
  );
}
