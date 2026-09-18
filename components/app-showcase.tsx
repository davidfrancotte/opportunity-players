import Link from 'next/link';
import Image from 'next/image';
import { AppPhoneStage } from '@/components/app-phone-stage';
import { Phone3D } from '@/components/phone-3d';
import { ArrowUpRight, Image as ImageIcon, Smartphone } from 'lucide-react';

// Verified links to the CURRENT native app, not to an unpublished Arena app.
const stores = [
  [
    'App Store',
    'iPhone',
    'https://apps.apple.com/fr/app/opportunity-players/id6741804702',
  ],
  [
    'Google Play',
    'Android',
    'https://play.google.com/store/apps/details?id=com.oanna.opportunityplayers.group',
  ],
] as const;

/** Replace screenSrc only with an approved capture of the real future app.
 * The default screen is explicitly a placeholder, never a fabricated capture.
 */
function AppPhone({ label, screenSrc }: { label: string; screenSrc?: string }) {
  return (
    <Phone3D label={label} screenSrc={screenSrc}>
      <Image
        unoptimized
        className="app-phone-hardware"
        src="/app-visuals/phone-placeholder.webp"
        alt=""
        width={1024}
        height={1536}
        loading="lazy"
        decoding="async"
      />
      <div className="app-phone-screen">
        {screenSrc ? (
          <Image
            unoptimized
            width={390}
            height={844}
            className="app-real-capture"
            src={screenSrc}
            alt={`Application Opportunity Players : ${label}`}
            loading="lazy"
          />
        ) : (
          <div className="app-screen-placeholder" data-app-screen="placeholder">
            <span className="app-screen-brand">
              op<span>↗</span>
            </span>
            <span className="app-screen-kicker">FUTURE APP ARENA</span>
            <strong>
              Votre sport.
              <br />
              Votre réseau.
            </strong>
            <div className="app-screen-capture">
              <ImageIcon size={25} strokeWidth={1} aria-hidden="true" />
              <span>Capture à venir</span>
              <small>{label}</small>
            </div>
            <span className="app-screen-status">ÉCRAN PROVISOIRE</span>
          </div>
        )}
      </div>
    </Phone3D>
  );
}

type AppShowcaseProps = {
  variant?: 'home' | 'platform' | 'audience';
  audience?: string;
};

export function AppShowcase({ variant = 'home', audience }: AppShowcaseProps) {
  const isPlatform = variant === 'platform';
  const label =
    audience === 'organisations'
      ? 'Profil de votre organisation'
      : audience === 'professionnels'
        ? 'Profil professionnel'
        : variant === 'home'
          ? 'Fil d’actualité'
          : 'Profil sportif';
  return (
    <section
      className={`section app-showcase app-showcase--${variant}`}
      aria-label="L’application mobile Opportunity Players"
    >
      <div className="app-showcase-copy">
        <span className="section-label">
          <Smartphone size={15} aria-hidden="true" /> AUSSI SUR VOTRE SMARTPHONE
        </span>
        <h2>
          {isPlatform ? (
            <>
              Un réseau.
              <br />À portée <em>de main.</em>
            </>
          ) : (
            <>
              Le sport vous suit.
              <br />
              <em>Votre réseau aussi.</em>
            </>
          )}
        </h2>
        <p>
          Opportunity Players existe aussi en application mobile. Votre
          parcours, vos contacts et les échanges autour de votre sport vous
          accompagnent au-delà du terrain.
        </p>
        <Link href="/espace" className="app-demo-link">
          Explorer la démo web Arena{' '}
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        <div className="app-store-area">
          <span className="app-store-label">
            TÉLÉCHARGER L’APPLICATION ACTUELLE
          </span>
          <div className="app-store-links">
            {stores.map(([name, device, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Application actuelle sur ${name}, nouvel onglet`}
              >
                <span>
                  <small>{device}</small>
                  {name}
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <p className="app-showcase-disclosure">
          Les smartphones présentent des emplacements provisoires. Ils
          accueilleront les captures réelles de la future app Arena ; les liens
          de téléchargement ouvrent l’application actuelle.
        </p>
      </div>
      <AppPhoneStage duo={isPlatform}>
        <span className="app-stage-word" aria-hidden="true">
          ON
          <br />
          THE
          <br />
          MOVE.
        </span>
        {isPlatform && (
          <div className="app-phone-secondary">
            <AppPhone label="Messagerie" />
          </div>
        )}
        <div className="app-phone-primary">
          <AppPhone label={label} />
        </div>
        <figcaption>
          <span>APP MOBILE / ARENA</span>
          <span>CAPTURES À VENIR</span>
        </figcaption>
      </AppPhoneStage>
    </section>
  );
}
