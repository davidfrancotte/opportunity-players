'use client';
import { AthleteImage } from '@/components/athlete-image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Check,
  UserRound,
  Users,
  BriefcaseBusiness,
  MessageCircle,
  FileUser,
  MapPin,
  Search,
  Bell,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { sports, audiences, faqs, currentSite } from '@/lib/content';

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Opportunity Players accueil">
      <span className="brand-symbol">
        op<i className="op-angle" aria-hidden="true" />
      </span>
      <span>
        opportunity
        <br />
        players
      </span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (path.startsWith('/espace')) return null;
  const links = [
    ['La plateforme', '/plateforme'],
    ['Pour vous', '/pour-vous/sportifs'],
    ['Les sports', '/sports'],
    ['Formules', '/tarifs'],
    ['L’application', '/application'],
  ];
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Navigation principale">
        {links.map(([label, url]) => (
          <Link
            key={url}
            href={url}
            aria-current={path === url ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="login-link" href="/espace/connexion">
          Connexion <ArrowUpRight size={13} />
        </Link>
        <Link className="header-join" href="/rejoindre">
          Rejoindre le réseau <ArrowUpRight size={17} />
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                className="menu-toggle"
                variant="ghost"
                size="icon"
                aria-label="Ouvrir le menu"
              />
            }
          >
            <Menu size={24} />
          </DialogTrigger>
          <DialogContent className="mobile-menu" showCloseButton={false}>
            <div className="mobile-menu-top">
              <Brand />
              <DialogClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Fermer le menu"
                  />
                }
              >
                <X />
              </DialogClose>
            </div>
            <DialogTitle className="sr-only">Navigation</DialogTitle>
            <DialogDescription className="sr-only">
              Découvrez le réseau et rejoignez la plateforme.
            </DialogDescription>
            <nav aria-label="Navigation mobile">
              {links.map(([label, url], i) => (
                <Link key={url} href={url} onClick={() => setOpen(false)}>
                  <span>0{i + 1}</span>
                  {label}
                  <ArrowUpRight />
                </Link>
              ))}
              <Link href="/aide" onClick={() => setOpen(false)}>
                <span>06</span>Aide
                <ArrowUpRight />
              </Link>
            </nav>
            <Link
              className="text-link"
              href="/espace/connexion"
              onClick={() => setOpen(false)}
            >
              Connexion <ArrowUpRight size={15} />
            </Link>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
export function Footer() {
  const path = usePathname();
  if (path.startsWith('/espace')) return null;
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Brand />
          <p className="footer-statement">
            Le sport nous relie.
            <br />
            Les rencontres nous font avancer.
          </p>
        </div>
        <div>
          <h3>Explorer</h3>
          <Link href="/plateforme">La plateforme</Link>
          <Link href="/application">Explorer l’application</Link>
          <Link href="/sports">Les sports</Link>
          <Link href="/tarifs">Les formules</Link>
          <Link href="/actualites">Le journal</Link>
        </div>
        <div>
          <h3>Opportunity Players</h3>
          <Link href="/a-propos">Notre histoire</Link>
          <Link href="/#soutiens">Ils nous soutiennent</Link>
          <Link href="/aide">Aide & contact</Link>
          <Link href="/espace/connexion">Connexion ↗</Link>
          <Link href="/rejoindre">Rejoindre le réseau</Link>
        </div>
        <div>
          <h3>Un échange ?</h3>
          <a href="mailto:site@opportunity-players.com">
            Parlons de votre projet <ArrowUpRight size={15} />
          </a>
          <p>
            Une plateforme ouverte
            <br />
            aux acteurs du sport.
          </p>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        opportunity players<span>↗</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Opportunity Players</span>
        <a href={`${currentSite}/mentions-legales`}>Mentions légales ↗</a>
        <a href={`${currentSite}/protection-des-donnees`}>Confidentialité ↗</a>
        <a href={`${currentSite}/conditions-generales-de-vente`}>
          Conditions ↗
        </a>
      </div>
      <p className="preview-disclosure">
        Préversion Arena · Illustrations des disciplines générées par IA. Les
        portraits de la section « Nous avons leur soutien » sont les photos
        originales du site actuel. Les écrans mobiles présentent la démo Arena
        Studio. L’espace Connexion est une démonstration sans compte réel ni
        paiement.
      </p>
    </footer>
  );
}
export function Action({
  children = 'Créer mon compte gratuit',
  href = '/rejoindre',
  secondary = false,
}: {
  children?: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`action${secondary ? ' action-secondary' : ''}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={20} />
    </Link>
  );
}
export function SectionHead({
  number,
  title,
  description,
}: {
  number: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <div className="section-label">{number}</div>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
export function JoinBand() {
  return (
    <section className="join-band">
      <div className="section-label">LA SUITE SE JOUE ENSEMBLE</div>
      <div>
        <h2>
          Faites le
          <br />
          <span>premier pas.</span>
        </h2>
        <div>
          <p>
            Un profil. Un projet.
            <br />
            Un réseau pour le faire avancer.
          </p>
          <Action />
          <span className="micro">Création gratuite · Sans carte bancaire</span>
        </div>
        <ArrowUpRight className="join-arrow" />
      </div>
    </section>
  );
}
export function AudienceCards() {
  return (
    <div className="audience-grid">
      {audiences.map((a) => (
        <Link
          href={`/pour-vous/${a.slug}`}
          key={a.slug}
          className="audience-card"
        >
          <span>{a.number}</span>
          <h3>{a.name}</h3>
          <p>{a.title}</p>
          <ArrowUpRight />
          <span className="audience-link">
            Découvrir mon parcours <ArrowRight size={15} />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function SportCard({ sport }: { sport: (typeof sports)[number] }) {
  return (
    <Link href={`/sports/${sport.slug}`} className="sport-card">
      <div className="sport-image">
        <AthleteImage
          src={`/images/${sport.image}.webp`}
          alt={`${sport.name} : illustration sportive dans l’identité Arena`}
          loading="lazy"
          width={1536}
          height={1024}
          style={{ objectPosition: `${sport.position} center` }}
        />
        <span className="sport-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="sport-card-title">
        <h3>{sport.name}</h3>
        <span>{sport.category}</span>
      </div>
    </Link>
  );
}
export function SportsExplorer() {
  const [category, setCategory] = useState('Tous');
  const filtered = sports.filter(
    (s) => category === 'Tous' || s.category === category,
  );
  return (
    <>
      <div className="filter-row" aria-label="Filtrer les sports">
        {['Tous', 'Collectifs', 'Raquettes', 'Individuels'].map((c) => (
          <Button
            key={c}
            variant="ghost"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`filter-button ${category === c ? 'selected' : ''}`}
          >
            {c}
          </Button>
        ))}
        <span aria-live="polite">{filtered.length} disciplines</span>
      </div>
      <div className="sports-grid">
        {filtered.map((s) => (
          <SportCard key={s.slug} sport={s} />
        ))}
      </div>
    </>
  );
}
export function FAQ({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('');
  const data = (compact ? faqs.slice(0, 4) : faqs).filter(([q, a]) =>
    `${q} ${a}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr')),
  );
  return (
    <div className="faq-block">
      {!compact && (
        <label className="faq-search" htmlFor="faq-query">
          <Search size={20} />
          <Input
            id="faq-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Inscription, profil, vidéos…"
            aria-label="Rechercher dans les questions"
          />
        </label>
      )}
      <Accordion className="faq-list">
        {data.map(([q, a], i) => (
          <AccordionItem className="faq-item" key={q} value={q}>
            <AccordionTrigger className="faq-trigger">
              <span className="faq-number">0{i + 1}</span>
              <span className="faq-question">{q}</span>
            </AccordionTrigger>
            <AccordionContent className="faq-answer">
              <p>{a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {data.length === 0 && (
        <output className="empty-search">
          Aucune réponse pour « {query} ». Essayez un autre mot ou contactez
          notre équipe.
        </output>
      )}
    </div>
  );
}
const demoContent = {
  profil: {
    title: 'Votre parcours, au même endroit.',
    subtitle: 'Un profil sportif qui vous ressemble.',
    icon: FileUser,
  },
  reseau: {
    title: 'Les bons interlocuteurs.',
    subtitle: 'Découvrez des acteurs de votre sport.',
    icon: Users,
  },
  opportunites: {
    title: 'Un projet à faire avancer.',
    subtitle: 'Les annonces ont leur propre terrain.',
    icon: BriefcaseBusiness,
  },
  messages: {
    title: 'La rencontre devient un échange.',
    subtitle: 'Gardez le contexte de votre conversation.',
    icon: MessageCircle,
  },
};
export function ProductDemo() {
  return (
    <Tabs defaultValue="profil" className="product-demo">
      <TabsList
        className="demo-tabs"
        aria-label="Explorer les fonctions de la plateforme"
      >
        {Object.entries(demoContent).map(([key, v]) => (
          <TabsTrigger key={key} value={key}>
            <v.icon size={16} />
            {key === 'profil'
              ? 'Profil & CV'
              : key === 'reseau'
                ? 'Réseau'
                : key === 'opportunites'
                  ? 'Opportunités'
                  : 'Messages'}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(demoContent).map(([key, v]) => (
        <TabsContent key={key} value={key}>
          <div className="demo-scene">
            <div className="demo-side">
              <span className="demo-brand">op<i className="op-angle" aria-hidden="true" /></span>
              <span className="demo-avatar">
                <UserRound />
              </span>
              <strong>Camille Martin</strong>
              <span>Sportive · Padel</span>
              <div className="demo-side-links">
                <span>
                  <FileUser size={14} /> Mon profil
                </span>
                <span>
                  <Users size={14} /> Mon réseau
                </span>
                <span>
                  <BriefcaseBusiness size={14} /> Opportunités
                </span>
                <span>
                  <MessageCircle size={14} /> Messages
                </span>
              </div>
              <span className="demo-tag">PROFIL FICTIF</span>
            </div>
            <div className="demo-main">
              <div className="demo-toolbar">
                <span>Bonjour, Camille.</span>
                <span>
                  <Search size={14} />
                  <Bell size={14} />
                </span>
              </div>
              <div className="demo-heading">
                <div>
                  <span className="tiny-label">VOTRE ESPACE SPORTIF</span>
                  <h3>{v.title}</h3>
                  <p>{v.subtitle}</p>
                </div>
                <span className="demo-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              {key === 'profil' ? (
                <div className="profile-preview">
                  <div className="profile-photo">
                    <AthleteImage
                      src="/images/padel.webp"
                      alt="Joueuse de padel fictive illustrant un profil"
                      loading="lazy"
                    />
                    <span>
                      Camille Martin<small>Padel · Belgique</small>
                    </span>
                  </div>
                  <div className="profile-data">
                    <span className="demo-pill">Ouverte aux rencontres</span>
                    <h4>Un parcours qui se partage.</h4>
                    <p>
                      Présentation, expérience, compétences et vidéos : tout ce
                      qui donne du sens à votre projet.
                    </p>
                    <div className="profile-data-grid">
                      <span>
                        01<small>Parcours</small>
                      </span>
                      <span>
                        02<small>Compétences</small>
                      </span>
                      <span>
                        03<small>Médias</small>
                      </span>
                    </div>
                    <span className="demo-inline-link">
                      Mon CV sportif <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              ) : key === 'reseau' ? (
                <div className="network-demo">
                  {[
                    ['Club Horizon', 'Club · Padel'],
                    ['Alex Dupont', 'Préparation physique'],
                    ['Studio Performance', 'Accompagnement sportif'],
                  ].map(([n, d]) => (
                    <div key={n}>
                      <span className="network-avatar">
                        <Users size={24} />
                      </span>
                      <h4>{n}</h4>
                      <p>{d}</p>
                      <span className="demo-inline-link">
                        Découvrir le profil <ArrowUpRight size={14} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : key === 'opportunites' ? (
                <div className="opportunity-demo">
                  <div>
                    <span className="demo-pill">Exemple d’annonce</span>
                    <Bookmark size={18} />
                  </div>
                  <h4>Un club recherche son prochain coach.</h4>
                  <p>
                    Un projet sportif, une discipline, des attentes claires.
                  </p>
                  <span>
                    <MapPin size={14} /> Belgique · Padel
                  </span>
                  <span className="demo-inline-link">
                    Découvrir le projet <ArrowUpRight size={15} />
                  </span>
                </div>
              ) : (
                <div className="message-demo">
                  <span className="demo-pill">Conversation illustrative</span>
                  <div>
                    Bonjour Camille, j’aimerais en savoir plus sur votre projet
                    sportif.
                  </div>
                  <div>
                    Bonjour ! Avec plaisir. Voici quelques éléments de mon
                    parcours.
                  </div>
                  <p>
                    <FileUser size={15} /> Mon profil sportif
                  </p>
                </div>
              )}
              <p className="demo-disclosure">
                Aperçu de la future expérience · Données fictives, aucun message
                envoyé
              </p>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
export function JoinFlow() {
  const [role, setRole] = useState('sportifs');
  const [step, setStep] = useState(1);
  return (
    <div className="join-flow">
      <div className="join-progress">
        <span className={step === 1 ? 'current' : ''}>01 · Votre profil</span>
        <span className={step === 2 ? 'current' : ''}>02 · Rejoindre</span>
      </div>
      {step === 1 ? (
        <>
          <h2>Vous êtes plutôt…</h2>
          <p>Un point de départ pour découvrir votre place dans le réseau.</p>
          <div className="role-options">
            {audiences.map((a, i) => {
              const Icon = [UserRound, BriefcaseBusiness, Users][i];
              return (
                <Button
                  key={a.slug}
                  variant="outline"
                  aria-pressed={role === a.slug}
                  className={`role-option ${role === a.slug ? 'selected' : ''}`}
                  onClick={() => setRole(a.slug)}
                >
                  <Icon />
                  <span>
                    <strong>{a.name}</strong>
                    <small>{a.title}</small>
                  </span>
                  {role === a.slug ? <Check /> : <ArrowUpRight />}
                </Button>
              );
            })}
          </div>
          <Button className="action flow-next" onClick={() => setStep(2)}>
            Continuer <ArrowRight size={19} />
          </Button>
        </>
      ) : (
        <>
          <span className="step-icon">
            <Check size={30} />
          </span>
          <h2>Votre prochain chapitre.</h2>
          <p>
            Vous rejoignez le réseau en tant que{' '}
            <strong>
              {audiences.find((a) => a.slug === role)?.name.toLowerCase()}
            </strong>
            .
          </p>
          <div className="join-explainer">
            <h3>Continuez sur la plateforme actuelle</h3>
            <p>
              Cette préversion ne collecte aucune donnée et ne crée pas de
              compte. Le lien ci-dessous ouvre l’inscription officielle ; vous y
              choisirez votre type de profil et votre sport.
            </p>
          </div>
          <a className="action" href={`${currentSite}/creer-un-compte`}>
            Créer mon compte sur la plateforme <ExternalLink size={17} />
          </a>
          <Button
            variant="ghost"
            className="back-button"
            onClick={() => setStep(1)}
          >
            Modifier mon choix
          </Button>
        </>
      )}
      <div className="join-assurances">
        <span>
          <Check size={13} /> Création gratuite
        </span>
        <span>
          <Check size={13} /> Sans carte bancaire
        </span>
        <span>
          <Check size={13} /> Dès 16 ans
        </span>
      </div>
      <p className="join-existing">
        Déjà membre ? <Link href="/espace/connexion">Se connecter ↗</Link>
      </p>
    </div>
  );
}
