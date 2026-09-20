'use client';
import { T, LanguageSwitch } from './locale';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  House,
  UsersRound,
  MessageCircle,
  Compass,
  UserRound,
  Settings,
  Sparkles,
  ArrowUpRight,
  LogOut,
  CalendarDays,
  Bell,
  ShieldCheck,
  Gift,
} from 'lucide-react';
import { EventHeader } from './event-navigation';
import { WebThemeSwitch } from './web-theme';
import { useDemo } from './demo-provider';
import { Brand } from './studio-ui';
import { PlanStatus } from './subscription-ui';
import { displayName, completion } from '@/lib/studio/model';
import { members, opportunities } from '@/lib/studio/social';
import { Button } from '@/components/ui/button';

const navigation = [
  { href: 'accueil', label: 'Accueil', icon: House },
  { href: 'reseau', label: 'Réseau', icon: UsersRound },
  { href: 'messages', label: 'Messages', icon: MessageCircle },
  { href: 'opportunities', label: 'Opportunities', icon: Compass },
  { href: 'profil', label: 'Mon profil', icon: UserRound },
];
const authRoutes = [
  'connexion',
  'inscription',
  'verification',
  'double-facteur',
  'personnalisation',
  'presentation',
  'mot-de-passe-oublie',
];

export function WebShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = pathname.split('/')[2] || 'accueil';
  const { profile, social, dispatchSocial, reset, events } = useDemo();
  const current = [
    'dossier-sportif',
    'parcours',
    'medias',
    'modifier-profil',
    'disciplines',
    'agent',
    'documents',
  ].includes(page)
    ? 'profil'
    : ['jouer', 'organiser', 'match'].includes(page)
      ? 'reseau'
      : page;
  const eventUnread = events.notices.filter(
    (n) => n.recipient === 'me' && !n.read,
  ).length;
  const unread = social.conversations.filter((c) => c.unread).length;
  const progress = completion(profile);
  if (authRoutes.includes(page))
    return (
      <div className="studio-web-auth">
        <nav className="studio-web-return" aria-label="Retour au site vitrine">
          <Link href="/">← Retour au site</Link>
          <LanguageSwitch />
          <WebThemeSwitch />
          <Link href="/application">Découvrir l’application ↗</Link>
        </nav>
        {profile.registrationMode === 'child' && (
          <p className="child-mode-note">
            <T>Profil géré par un représentant</T>
          </p>
        )}
        {children}
      </div>
    );
  return (
    <div className={`studio-workspace studio-page-${page}`}>
      <aside className="web-sidebar">
        <Brand href="/espace/accueil" />
        <span className="web-space-label">VOTRE ESPACE SPORT</span>
        <nav aria-label="Navigation de l’espace membre web">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/espace/${href}`}
              aria-current={current === href ? 'page' : undefined}
            >
              <Icon size={21} />
              <span>
                <T>{label}</T>
              </span>
              {href === 'messages' && unread > 0 && (
                <small aria-label={`${unread} conversations non lues`}>
                  {unread}
                </small>
              )}
            </Link>
          ))}
        </nav>
        <div className="web-sidebar-secondary">
          <Link
            href="/espace/securite"
            aria-current={page === 'securite' ? 'page' : undefined}
          >
            <ShieldCheck size={19} />
            <T>{'Sécurité'}</T>
          </Link>
          <Link
            href="/espace/parrainage"
            aria-current={page === 'parrainage' ? 'page' : undefined}
          >
            <Gift size={19} />
            Parrainage
          </Link>
          <Link
            href="/espace/jouer"
            aria-current={page === 'jouer' ? 'page' : undefined}
          >
            <UsersRound size={19} />
            <T>{'Jouer ensemble'}</T>
          </Link>
          <Link
            href="/espace/agenda"
            aria-current={page === 'agenda' ? 'page' : undefined}
          >
            <CalendarDays size={19} />
            <T>{'Mon agenda'}</T>
          </Link>
          <Link
            href="/espace/notifications"
            aria-current={page === 'notifications' ? 'page' : undefined}
          >
            <Bell size={19} />
            <T>{'Notifications'}</T>
            {eventUnread > 0 && <small>{eventUnread}</small>}
          </Link>
          <Link
            href="/espace/abonnement"
            aria-current={page === 'abonnement' ? 'page' : undefined}
          >
            <Sparkles size={19} />
            <T>{'Mon abonnement'}</T>
          </Link>
          <Link
            href="/espace/parametres"
            aria-current={page === 'parametres' ? 'page' : undefined}
          >
            <Settings size={19} />
            <T>{'Paramètres'}</T>
          </Link>
        </div>
        <Link className="web-self" href="/espace/profil">
          <Image
            src={profile.photo}
            alt=""
            width={36}
            height={36}
            unoptimized
          />
          <span>
            <strong>{displayName(profile)}</strong>
            <small>
              {profile.sport} · {profile.city}
            </small>
          </span>
        </Link>
        <div className="web-sidebar-bottom">
          <Link href="/">← Le site</Link>
          <Link href="/espace/connexion" onClick={reset}>
            <LogOut size={15} />
            <T>{'Déconnexion'}</T>
          </Link>
        </div>
        <p className="web-demo-note">
          Démo · session fictive, non sauvegardée.
        </p>
      </aside>
      <div className="web-content-area">
        <header className="web-topbar">
          <span>
            OPPORTUNITY PLAYERS <i>/</i>{' '}
            <strong>
              {(
                {
                  jouer: 'Jouer ensemble',
                  organiser: 'Organiser un match',
                  match: 'Votre match',
                  agenda: 'Mon agenda',
                  notifications: 'Notifications',
                  disciplines: 'Sports, niveaux et clubs',
                  agent: 'Mon agent',
                  documents: 'CV et références',
                  'dossier-sportif': 'Dossier sportif',
                  securite: 'Sécurité et modération',
                  parrainage: 'Inviter mon réseau',
                  confidentialite: 'Confidentialité et charte',
                } as Record<string, string>
              )[page] ||
                navigation.find((n) => n.href === current)?.label ||
                (page === 'abonnement' ? 'Abonnement' : 'Paramètres')}
            </strong>
          </span>
          <div className="web-topbar-actions">
            <LanguageSwitch />
            <WebThemeSwitch />
            <EventHeader />
            <Link href="/espace/profil">
              <Image
                src={profile.photo}
                alt=""
                width={36}
                height={36}
                unoptimized
              />
              <span>{profile.firstName}</span>
            </Link>
          </div>
        </header>
        <div className="web-mobile-appearance">
          <span>Apparence</span>
          <LanguageSwitch />
          <WebThemeSwitch />
        </div>
        <div className="web-content-grid">
          <div className="web-main-content">{children}</div>
          {page === 'accueil' && (
            <aside
              className="web-context-rail"
              aria-label="Votre réseau et vos opportunités"
            >
              <section className="web-rail-card">
                <span className="web-space-label">VOTRE PROCHAIN PAS</span>
                <h2>Un profil qui ouvre des portes.</h2>
                <p>
                  Sports, niveaux, clubs, CV et agent : donnez du contexte à
                  chaque rencontre.
                </p>
                <p>
                  {progress.count} rubriques complétées sur {progress.total}.
                </p>
                <progress
                  value={progress.count}
                  max={progress.total}
                  aria-label="Complétion du profil"
                />
                <Link href="/espace/disciplines">
                  Compléter mon parcours <ArrowUpRight size={17} />
                </Link>
              </section>
              <section className="web-rail-card">
                <h2>Élargissez votre terrain.</h2>
                <p>Quelques profils fictifs à découvrir.</p>
                {members.slice(0, 3).map((member) => (
                  <div className="web-suggestion" key={member.id}>
                    <Image
                      src={member.image}
                      alt=""
                      width={38}
                      height={42}
                      unoptimized
                    />
                    <span>
                      <strong>{member.name}</strong>
                      <small>{member.role}</small>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`${social.following.includes(member.id) ? 'Ne plus suivre' : 'Suivre'} ${member.name}`}
                      aria-pressed={social.following.includes(member.id)}
                      onClick={() =>
                        dispatchSocial({ type: 'follow', id: member.id })
                      }
                    >
                      {social.following.includes(member.id) ? 'Suivi' : '+'}
                    </Button>
                  </div>
                ))}
                <Link href="/espace/reseau">
                  Explorer le réseau <ArrowUpRight size={17} />
                </Link>
              </section>
              <section className="web-rail-card web-rail-opportunity">
                <Image
                  src={opportunities[0].image}
                  alt="Un terrain de padel"
                  width={244}
                  height={130}
                  unoptimized
                />
                <span className="web-space-label">
                  À DÉCOUVRIR · ANNONCE FICTIVE
                </span>
                <h2>{opportunities[0].title}</h2>
                <Link href="/espace/opportunities">
                  Voir les opportunités <ArrowUpRight size={17} />
                </Link>
              </section>
              <PlanStatus compact />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
