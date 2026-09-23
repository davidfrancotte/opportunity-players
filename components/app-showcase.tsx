import Link from 'next/link';
import { BrandMark } from './brand-mark';
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

/** Screens are captures of the implemented Arena Studio demo, not invented UI. */
export function AppPhone({
  label,
  screenSrc,
}: {
  label: string;
  screenSrc?: string;
}) {
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
              <BrandMark/>
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

export function AppShowcase({ variant = 'home' }: AppShowcaseProps) {
  const isPlatform = variant === 'platform';
  const label = 'Accueil de l’application Arena Studio';
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
          Suivez votre communauté, ouvrez les publications et partagez vos propres
          photos ou vidéos. Connectez-vous après acceptation pour échanger librement
          et inviter vos contacts à jouer. Matchs, rendez-vous professionnels et
          événements à suivre se retrouvent dans un seul agenda. Premium ouvre
          les filtres avancés, les matchs à proximité et la programmation des posts.
        </p>
        <Link href="/application" className="app-demo-link">
          Explorer l’application <ArrowUpRight size={20} aria-hidden="true" />
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
          Aperçu réel de notre démo Arena Studio, avec des contenus fictifs. Les
          liens de téléchargement ouvrent l’application actuelle, dont le design
          peut différer.
        </p>
      </div>
      <AppPhoneStage duo={isPlatform}>
        <span className="app-stage-word" aria-hidden="true">
          <span>ON</span>
          <span>THE</span>
          <span>MOVE.</span>
        </span>
        <div className="app-phone-scene">
          {isPlatform && (
            <div className="app-phone-secondary">
              <AppPhone
                label="Messagerie Arena Studio"
                screenSrc="/app-visuals/studio-20260923-network-messages.png"
              />
            </div>
          )}
          <div className="app-phone-primary">
            <AppPhone
              label={label}
              screenSrc="/app-visuals/studio-20260923-network-accueil.png"
            />
          </div>
        </div>
        <figcaption>
          <span>APP MOBILE / ARENA</span>
          <span>APERÇU ARENA STUDIO</span>
        </figcaption>
      </AppPhoneStage>
    </section>
  );
}
