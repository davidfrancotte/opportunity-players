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
  LogOut,
  CalendarDays,
  Bell,
  ShieldCheck,
  Gift,
  BriefcaseBusiness,
  ClipboardCheck,
} from 'lucide-react';
import { EventHeader } from './event-navigation';
import { WebThemeSwitch } from './web-theme';
import { useDemo } from './demo-provider';
import { Brand } from './studio-ui';
import { displayName } from '@/lib/studio/model';

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
  const {
    profile,
    social,
    reset,
    events,
    career,
    careerActor,
    extensionWorkspace,
  } = useDemo();
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
    : ['jouer', 'organiser', 'match', 'agenda', 'calendrier-avance'].includes(page)
      ? 'reseau'
      : ['candidatures', 'recrutement'].includes(page)
        ? 'opportunities'
        : page === 'rendez-vous'
          ? 'reseau'
          : page;
  const extensionUnread=extensionWorkspace.notices.filter(n=>!n.read).length;
  const eventUnread = events.notices.filter(
    (n) => n.recipient === 'me' && !n.read,
  ).length;
  const careerUnread = career.notices.filter(
    (n) => n.recipient === careerActor.id && !n.read,
  ).length;
  const unread = social.conversations.filter((c) => c.unread).length;
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
            href="/espace/candidatures"
            aria-current={page === 'candidatures' ? 'page' : undefined}
          >
            <ClipboardCheck size={19} />
            <span>Candidatures & essais</span>
          </Link>
          {profile.category !== 'Sportif' && (
            <Link
              href="/espace/recrutement"
              aria-current={page === 'recrutement' ? 'page' : undefined}
            >
              <BriefcaseBusiness size={19} />
              <span>Espace recrutement</span>
            </Link>
          )}
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
            <T>{'Agenda'}</T>
          </Link>
          <Link
            href="/espace/notifications"
            aria-current={page === 'notifications' ? 'page' : undefined}
          >
            <Bell size={19} />
            <T>{'Notifications'}</T>
            {eventUnread + careerUnread + extensionUnread > 0 && (
              <small>{eventUnread + careerUnread + extensionUnread}</small>
            )}
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
          <Link href="/espace/outils" aria-current={['outils','recherches','talents','essais-groupes','equipes','calendrier-avance','statistiques','publications-programmees'].includes(page)?'page':undefined}><Sparkles size={19}/>Mes outils</Link>
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
                  agenda: 'Agenda',
                  notifications: 'Notifications',
                  candidatures: 'Candidatures et essais',
                  recrutement: 'Espace recrutement',
                  'rendez-vous': 'Mes rendez-vous',
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
                (page === 'abonnement' ? 'Abonnement' : ['outils','recherches','talents','essais-groupes','equipes','calendrier-avance','statistiques','publications-programmees'].includes(page) ? 'Mes outils' : 'Paramètres')}
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

        </div>
      </div>
    </div>
  );
}
