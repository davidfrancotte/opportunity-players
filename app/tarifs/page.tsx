import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  ArrowUpRight,
  UserRound,
  BriefcaseBusiness,
  UsersRound,
} from 'lucide-react';
import { monthlyPrice, annualPrice, annualSaving } from '@/lib/studio/pricing';
import type { Category } from '@/lib/studio/model';
import offerCatalog from '@/lib/studio/offer-catalog.json';
import './pricing.css';
export const metadata: Metadata = {
  title: 'Les formules — Opportunity Players',
  description:
    `Compte gratuit pour tous. Premium Sportif à ${monthlyPrice('Sportif')}/mois, Professionnel à ${monthlyPrice('Professionnel')}/mois et Collectif à ${monthlyPrice('Organisation')}/mois. Comparez les accès, services et quotas.`,
};
const plans: {
  category: Category;
  name: string;
  icon: typeof UserRound;
  line: string;
  free: string[];
  premium: string[];
}[] = [
  {
    category: 'Sportif',
    name: 'Sportifs',
    icon: UserRound,
    line: 'Faites grandir votre parcours.',
    free: [
      'Profil multisport complet : niveaux, parcours, palmarès, handisport et relation avec un agent',
      'Fil communautaire, réseau, opportunités et 1 recherche enregistrée sans alerte',
      '3 nouvelles prises de contact par mois ; réponses gratuites',
      '3 photos, 1 demande de rendez-vous et 1 événement créé par mois',
      'Réponses aux invitations personnelles à jouer et aux essais',
      'Commentaires, réactions et partages ; création de publications non incluse',
    ],
    premium: [
      'Tout le socle gratuit',
      'Création et programmation de publications ; 50 photos, 20 vidéos et 20 documents',
      '30 nouveaux contacts, 30 candidatures et 15 demandes de rendez-vous par mois',
      'Recherche avancée et 10 recherches enregistrées avec alertes',
      'Découverte des matchs ouverts, rayon personnalisable et 10 événements actifs',
      'Événements récurrents, options avancées de l’agenda et statistiques détaillées',
    ],
  },
  {
    category: 'Professionnel',
    name: 'Professionnels',
    icon: BriefcaseBusiness,
    line: 'Transformez votre expertise en échanges.',
    free: [
      'Profil, qualifications, références, 3 services et 3 photos',
      'Création de publications, commentaires, réactions et partages',
      '3 nouveaux contacts, 3 demandes de rendez-vous et 3 rendez-vous confirmés par mois',
      '1 recherche enregistrée sans alerte et 1 liste de 20 profils',
      '5 invitations à des essais et 1 événement créé par mois ; réponses aux invitations personnelles',
      'Réception des messages, réponses et traitement simple des candidatures',
    ],
    premium: [
      'Tout le socle gratuit',
      '100 nouvelles prises de contact par mois',
      '30 candidatures, 15 demandes de rendez-vous et 100 rendez-vous confirmés par mois',
      '5 offres actives, recrutement avancé et essais groupés',
      '20 listes, 1 000 profils au total et notes privées ; 20 recherches avec alertes',
      '15 services, 50 photos, 30 vidéos et 20 documents ; publications programmées',
      '25 événements actifs, récurrences, options de l’agenda, statistiques et parrainage',
    ],
  },
  {
    category: 'Organisation',
    name: 'Collectifs',
    icon: UsersRound,
    line: 'Donnez de l’élan à votre communauté.',
    free: [
      'Profil multisport, équipes et liens confirmés avec les joueurs et le staff',
      '1 offre active, traitement des candidatures et invitations individuelles à un essai',
      '1 gestionnaire, 1 liste de 20 profils et 1 recherche sans alerte',
      '5 nouveaux contacts, 1 demande de rendez-vous et 1 événement créé par mois',
      '5 photos, 1 document et 1 vidéo d’une minute ; réponses aux invitations personnelles',
      'Réception, réponses, commentaires, réactions et partages ; publications non incluses',
    ],
    premium: [
      'Tout le socle gratuit',
      '200 nouvelles prises de contact par mois, partagées entre gestionnaires',
      '10 offres actives, recrutement avancé, essais groupés et 20 demandes de rendez-vous par mois',
      '5 gestionnaires, permissions, collaboration et gestion structurée des équipes',
      '30 listes, 1 000 profils au total et notes privées ; 30 recherches avec alertes',
      'Publications programmées, 30 photos, 20 documents et 10 vidéos de 3 minutes',
      '50 événements actifs, agenda partagé, entretiens coordonnés et suivi des invitations',
    ],
  },
];
export default function Page() {
  return (
    <main id="main" className="plans-page">
      <section className="page-heading">
        <span className="section-label">
          LES FORMULES / À CHACUN SON TERRAIN
        </span>
        <h1>
          Entrez dans le réseau.
          <br />
          <em>Ouvrez les possibilités.</em>
        </h1>
        <p>
          La création de compte est gratuite pour les sportifs, les
          professionnels et les collectifs. Passez à Premium lorsque vous
          souhaitez multiplier les contacts, valoriser votre parcours ou organiser
          votre activité. Chaque formule Premium inclut les accès gratuits de sa catégorie.
        </p>
      </section>
      <section className="section plans-section">
        <div className="plans-free-banner">
          <div>
            <span className="section-label">LE POINT DE DÉPART, POUR TOUS</span>
            <h2>
              Un profil. Un réseau. <em>0 €.</em>
            </h2>
            <p>
              Présentez-vous, explorez la communauté et suivez les profils qui
              vous intéressent. Recevez des messages, répondez et interagissez avec
              la communauté gratuitement. Les quotas de nouveaux contacts et les
              outils supplémentaires dépendent de votre catégorie.
            </p>
          </div>
          <Link href="/espace/inscription" className="action">
            Essayer gratuitement <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="plans-grid">
          {plans.map(({ category, name, icon: Icon, line, free, premium }) => (
            <article className="plan-card" key={category}>
              <div className="plan-card-label">
                <Icon size={21} />
                <span>PREMIUM</span>
              </div>
              <h2>{name}</h2>
              <p className="plan-line">{line}</p>
              <div className="plan-monthly">
                <strong>{monthlyPrice(category)}</strong>
                <span>/ mois</span>
              </div>
              <div className="plan-annual">
                <p>ou <strong>{annualPrice(category)}</strong> / an</p>
                <span>Paiement annuel en une fois</span>
                <p className="plan-saving">Économisez {annualSaving(category)} par rapport à 12 mensualités.</p>
              </div>
              <div className="plan-free">
                <h3>Votre accès gratuit</h3>
                <ul>
                  {free.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="plan-premium">
                <h3>Ce que Premium débloque</h3>
                <ul>
                  {premium.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/espace/abonnement" className="action">
                Découvrir Premium <ArrowUpRight size={17} />
              </Link>
              <a className="plan-detail-link" href={`#details-${category}`}>
                Comparer toutes les fonctionnalités
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Paiement mensuel ou annuel au choix. Le paiement annuel en une fois
          bénéficie d’un tarif réduit, avec les mêmes fonctionnalités incluses. Cette
          préversion ne traite aucun paiement, ne crée aucun abonnement réel et
          ne modifie pas les offres de l’application actuellement disponible sur
          les stores. Les conditions contractuelles et fiscales seront précisées
          avant toute commercialisation.
        </p>
      </section>
      <section className="section plans-comparison" aria-labelledby="comparison-title">
        <span className="section-label">LE DÉTAIL, PROFIL PAR PROFIL</span>
        <h2 id="comparison-title">Comparez ce qui est <em>inclus.</em></h2>
        <p>Les quotas mensuels concernent les nouvelles actions, hors réponses.
          Les plafonds de médias portent sur le total conservé, sans renouvellement mensuel.
          « Actifs » désigne les offres ou événements gérés simultanément.</p>
        {plans.map(({category,name}) => (
          <details className="plan-comparison" id={`details-${category}`} key={category}>
            <summary><span>{name}</span><span>Gratuit / Premium {monthlyPrice(category)} par mois</span></summary>
            <div className="plan-table-scroll" role="region" aria-label={`Comparatif ${name}`} tabIndex={0}>
              <table>
                <caption>Fonctionnalités {name.toLowerCase()} : gratuit et Premium</caption>
                <thead><tr><th scope="col">Fonctionnalité et détail</th><th scope="col">Gratuit · 0 €</th><th scope="col">Premium</th></tr></thead>
                <tbody>{offerCatalog[category].map(row => (
                  <tr key={row.feature}>
                    <th scope="row"><strong>{row.feature}</strong><p>{row.detail.replace(' (clarification du propriétaire)', '')}</p></th>
                    <td>{row.free === '—' ? 'Non inclus' : row.free === 'V' ? 'Inclus' : row.free.replace(/^V,?\s*/, 'Inclus, ').replace('1 nouvelles demandes', '1 nouvelle demande').replace('1 documents','1 document').replace('1 vidéos','1 vidéo')}</td>
                    <td>{row.paid === 'V' ? 'Inclus' : row.paid}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </details>
        ))}
      </section>
      <section className="section plans-rules">
        <div>
          <span className="section-label">PAS DE PETITES LIGNES CACHÉES</span>
          <h2>
            Des règles simples.
            <br />
            <em>Des échanges clairs.</em>
          </h2>
        </div>
        <div className="plans-answers">
          <article>
            <span>01</span>
            <div>
              <h3>Comment les nouvelles prises de contact sont-elles comptées ?</h3>
              <p>
                Seul le premier message à un nouvel interlocuteur consomme le quota.
                Gratuit : 3 demandes par mois pour les sportifs et professionnels,
                5 pour les collectifs. Premium : respectivement 30, 100 et 200.
                Réceptions, réponses et conversations déjà engagées restent gratuites.
                Les quotas se renouvellent au début du mois, heure de Bruxelles.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Un abonnement permet-il de contacter tout le monde ?</h3>
              <p>
                Toutes les catégories peuvent recevoir des messages et poursuivre leurs
                conversations sans abonnement. Premium augmente le nombre de nouveaux
                contacts et ajoute des outils métier ; il ne contourne jamais un blocage
                ou les règles de sécurité.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Qui peut publier et commenter ?</h3>
              <p>
                Les sportifs et collectifs créent des publications avec Premium.
                Les professionnels peuvent publier gratuitement. Pour tous les profils,
                commentaires, réactions et partages restent gratuits. La programmation
                des publications est une extension Premium.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h3>Peut-on organiser un match gratuitement ?</h3>
              <p>
                Oui, chaque catégorie peut créer 1 événement par mois et répondre aux
                invitations personnelles. La découverte des matchs dans « À proximité »
                est réservée à Premium pour toutes les catégories de profils.
                Premium ajoute un rayon personnalisable, les alertes, les récurrences et
                jusqu’à 10, 25 ou 50 événements actifs selon votre catégorie.
              </p>
            </div>
          </article>
          <article>
            <span>05</span>
            <div>
              <h3>À quoi servent les recherches enregistrées et les alertes ?</h3>
              <p>
                Conservez une recherche, par exemple « Tennis à Bruxelles », pour la
                relancer sans ressaisir les filtres. Le gratuit inclut 1 recherche sans
                alerte. Premium permet d’enregistrer 10 recherches pour les sportifs,
                20 pour les professionnels ou 30 pour les collectifs, et d’être averti
                de nouveaux résultats correspondants.
              </p>
            </div>
          </article>
          <article>
            <span>06</span>
            <div>
              <h3>Puis-je tester sans payer ?</h3>
              <p>
                Oui. L’espace Connexion ouvre la même démonstration que l’app
                mobile. Dans « Abonnement », choisissez un profil sportif,
                professionnel ou collectif, puis simulez Premium. Aucun achat,
                prélèvement ou renouvellement n’est effectué ; l’état de la démo
                est effacé au rechargement. Les connexions aux agendas externes,
                notifications et échanges entre comptes sont simulés ; aucun service
                ne s’exécute en arrière-plan lorsque la démo est fermée.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section plans-outro">
        <h2>
          Le bon outil.
          <br />
          <em>Pour votre prochain pas.</em>
        </h2>
        <Link href="/application" className="text-link">
          Explorer les fonctionnalités de l’application{' '}
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
