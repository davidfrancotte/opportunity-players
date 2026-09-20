import Link from 'next/link';
import { SupportersSection } from '@/components/supporters';
import { AppShowcase } from '@/components/app-showcase';
import { WebWorkspacePreview } from '@/components/web-workspace-preview';
import { AthleteImage } from '@/components/athlete-image';
import { HeroAthletes } from '@/components/hero-athletes';
import {
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
  FileUser,
  Users,
  MessageCircle,
} from 'lucide-react';
import {
  Action,
  AudienceCards,
  FAQ,
  JoinBand,
  SectionHead,
  SportCard,
} from '@/components/arena';
import { sports } from '@/lib/content';

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> LE RÉSEAU DES ACTEURS DU SPORT
          </div>
          <h1>
            Votre talent.
            <br />
            Le bon
            <br />
            <em>collectif.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Sportifs, professionnels, clubs.
              <br />
              Les bonnes rencontres changent
              <br className="desktop-break" /> la suite de votre parcours.
            </p>
            <Action />
            <span className="micro">
              Sans carte bancaire. À partir de 16 ans.
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <HeroAthletes />
          <div className="image-topline">
            <span>LE SPORT NOUS RELIE.</span>
            <MoveUpRight size={30} />
          </div>
          <div className="image-caption">
            <span>
              Un terrain commun.
              <br />
              Des parcours singuliers.
            </span>
            <span className="photo-note">VISUEL ILLUSTRATIF</span>
          </div>
          <span className="hero-index">01 — ARENA</span>
        </div>
        <a href="#plateforme" className="scroll-cue">
          <ArrowDown size={16} /> DÉCOUVRIR LE RÉSEAU
        </a>
      </section>
      <div className="sports-ribbon">
        <span>UN RÉSEAU. TOUS LES SPORTS.</span>
        {sports.slice(0, 6).map((s) => (
          <Link key={s.slug} href={`/sports/${s.slug}`}>
            {s.name}
          </Link>
        ))}
        <Link href="/sports" aria-label="Tous les sports">
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <section className="section intro-section" id="plateforme">
        <SectionHead
          number="01 / PLUS QU’UN PROFIL"
          title={
            <>
              Le prochain chapitre
              <br />
              commence par <em>une rencontre.</em>
            </>
          }
        />
        <div className="intro-bottom">
          <span className="large-arrow" aria-hidden="true">
            ↗
          </span>
          <p>
            Plusieurs sports. Un seul réseau. Présentez vos niveaux et vos clubs
            pour chaque discipline, ajoutez votre CV et vos références, et
            rendez visible votre lien avec un agent. Découvrez des profils et
            des opportunités recommandés, candidatez et confirmez un essai.
            Clubs et professionnels disposent d’un espace de recrutement. Pour
            un rendez-vous, demandez l’accord du professionnel avant de choisir
            un créneau. Sur ordinateur comme sur mobile, donnez une suite
            concrète à chaque rencontre.
          </p>
        </div>
        <WebWorkspacePreview />
        <div className="section-bottom">
          <span>VOS SPORTS. VOTRE PARCOURS. VOS PROCHAINES RENCONTRES.</span>
          <Link className="text-link" href="/plateforme">
            Explorer la plateforme <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section audience-section">
        <SectionHead
          number="02 / VOTRE PLACE EST ICI"
          title={
            <>
              Sur le terrain.
              <br />
              Et <em>tout autour.</em>
            </>
          }
          description="Le sport se construit avec celles et ceux qui jouent, accompagnent et font grandir les collectifs."
        />
        <AudienceCards />
      </section>
      <section className="section sports-section">
        <SectionHead
          number="03 / VOTRE SPORT NOUS RASSEMBLE"
          title={
            <>
              À chacun sa discipline.
              <br />
              <em>À tous, un réseau.</em>
            </>
          }
        />
        <div className="featured-sports">
          {sports.slice(0, 3).map((s) => (
            <SportCard sport={s} key={s.slug} />
          ))}
        </div>
        <div className="section-bottom">
          <span>DES SPORTS COLLECTIFS AUX PARCOURS INDIVIDUELS.</span>
          <Link href="/sports" className="text-link">
            Explorer les disciplines <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section steps-section">
        <SectionHead
          number="04 / COMMENT ÇA MARCHE"
          title={
            <>
              Des rencontres,
              <br />
              pas des complications.
            </>
          }
        />
        <div className="steps-grid">
          {[
            [
              FileUser,
              '01',
              'Présentez-vous.',
              'Créez votre profil et donnez du contexte à votre parcours, à votre expertise ou à votre structure.',
            ],
            [
              Users,
              '02',
              'Trouvez votre collectif.',
              'Découvrez des profils, suivez leur activité et explorez les annonces qui font écho à votre projet.',
            ],
            [
              MessageCircle,
              '03',
              'Ouvrez la discussion.',
              'Prenez contact selon votre offre et donnez une suite concrète à une rencontre.',
            ],
          ].map(([Icon, n, t, d]) => {
            const I = Icon as typeof FileUser;
            return (
              <div key={String(n)}>
                <div>
                  <I size={25} />
                  <span>{String(n)}</span>
                </div>
                <h3>{String(t)}</h3>
                <p>{String(d)}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="inclusion-section">
        <AthleteImage
          src="/images/adaptive-athletics.webp"
          alt="Illustration d’une athlète en fauteuil de course sur une piste"
          loading="lazy"
          width={1536}
          height={1024}
        />
        <div>
          <span className="section-label">
            LA MÊME PASSION. TOUTES LES TRAJECTOIRES.
          </span>
          <h2>
            Votre parcours
            <br />a sa place.
          </h2>
          <p>
            Sport féminin, sport amateur, haut niveau, handisport. Un réseau
            pour rendre visibles les personnes qui font vivre le sport, dans
            toute sa diversité.
          </p>
          <Link href="/a-propos" className="text-link">
            Découvrir notre engagement <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <AppShowcase />
      <SupportersSection />
      <section className="section faq-section">
        <div>
          <div className="section-label">05 / ON VOUS RÉPOND</div>
          <h2>
            Avant de
            <br />
            <em>vous lancer.</em>
          </h2>
          <Link href="/aide" className="text-link">
            Toutes les réponses <ArrowUpRight size={17} />
          </Link>
        </div>
        <FAQ compact />
      </section>
      <JoinBand />
    </main>
  );
}
