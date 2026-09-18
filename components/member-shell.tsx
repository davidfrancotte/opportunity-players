'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  House,
  Users,
  BriefcaseBusiness,
  MessageCircle,
  UserRound,
  Images,
  Settings,
  Bell,
  ArrowUpRight,
  ArrowLeft,
  Search,
  FlaskConical,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DemoProvider, useDemo } from '@/components/member-context';
import { demoNotifications } from '@/lib/member-data';
const links = [
  { href: '/espace', label: 'Fil d’actualité', icon: House },
  { href: '/espace/reseau', label: 'Mon réseau', icon: Users },
  {
    href: '/espace/opportunites',
    label: 'Opportunités',
    icon: BriefcaseBusiness,
  },
  { href: '/espace/messages', label: 'Messages', icon: MessageCircle },
  { href: '/espace/profil', label: 'Mon profil', icon: UserRound },
  { href: '/espace/medias', label: 'Ma galerie', icon: Images },
  { href: '/espace/notifications', label: 'Notifications', icon: Bell },
  { href: '/espace/parametres', label: 'Paramètres', icon: Settings },
];
function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { profile, read, notice, announce } = useDemo();
  const unread = demoNotifications.length - read.length;
  return (
    <div className="member-shell">
      <aside className="member-sidebar">
        <Link
          href="/espace"
          className="member-brand"
          aria-label="Arena, fil d’actualité"
        >
          <span>
            op<em>↗</em>
          </span>
          <span>
            opportunity
            <br />
            players
          </span>
        </Link>
        <span className="member-workspace-label">VOTRE TERRAIN COMMUN</span>
        <nav aria-label="Espace membre">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === '/espace' ? path === href : path.startsWith(href))
                  ? 'page'
                  : undefined
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {href === '/espace/notifications' && unread > 0 && (
                <small>{unread}</small>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/" className="back-site">
            <ArrowLeft size={15} /> Retour au site
          </Link>
          <Link href="/espace/profil" className="sidebar-user">
            <span className="member-avatar">
              {profile.firstName.slice(0, 1)}
              {profile.lastName.slice(0, 1)}
            </span>
            <span>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
              <small>Profil de démonstration</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </aside>
      <div className="member-body">
        <header className="member-topbar">
          <Link href="/espace" className="mobile-member-brand">
            op<em>↗</em>
          </Link>
          <form
            action="/espace/reseau"
            className="member-search"
            onSubmit={(event) => {
              event.preventDefault();
              const value = new FormData(event.currentTarget).get('q');
              const query = typeof value === 'string' ? value : '';
              router.push(`/espace/reseau?q=${encodeURIComponent(query)}`);
            }}
          >
            <Search size={18} />
            <Input
              name="q"
              type="search"
              placeholder="Un nom, un sport, un collectif…"
              aria-label="Rechercher dans le réseau de démonstration"
            />
            <Button
              variant="ghost"
              size="icon"
              type="submit"
              aria-label="Lancer la recherche"
            >
              <ArrowUpRight size={18} />
            </Button>
          </form>
          <Link
            className="member-top-notifications"
            href="/espace/notifications"
            aria-label={`${unread} notifications non lues`}
          >
            <Bell size={21} />
            {unread > 0 && <i />}
          </Link>
          <Link
            className="member-top-settings"
            href="/espace/parametres"
            aria-label="Paramètres de la démo"
          >
            <Settings size={20} />
          </Link>
          <Link
            href="/espace/profil"
            className="member-avatar small"
            aria-label="Mon profil"
          >
            {profile.firstName.slice(0, 1)}
            {profile.lastName.slice(0, 1)}
          </Link>
        </header>
        <div className="member-demo-notice">
          <FlaskConical size={14} />
          <span>
            DÉMO ARENA <b>·</b> Profils fictifs. Vos essais restent dans cette
            session, sans envoi réel.
          </span>
          <Link href="/plateforme">
            À propos de la démo <ArrowUpRight size={12} />
          </Link>
        </div>
        <main id="main" className="member-content">
          {children}
        </main>
        <footer className="member-footnote">
          Préversion de l’espace membre · Ne saisissez pas de données réelles.
          Les essais s’effacent au rechargement.{' '}
          <Link href="/aide">Besoin d’aide ?</Link>
          <Link href="/">Retour au site</Link>
        </footer>
        <output
          className={`member-feedback ${notice ? 'visible' : ''}`}
          aria-live="polite"
        >
          {notice}
          {notice && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => announce('')}
              aria-label="Fermer la confirmation"
            >
              <X size={14} />
            </Button>
          )}
        </output>
      </div>
      <nav
        className="member-mobile-nav"
        aria-label="Navigation mobile de l’espace membre"
      >
        {links.slice(0, 5).map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === '/espace' ? path === href : path.startsWith(href))
                ? 'page'
                : undefined
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
export function MemberShell({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <Shell>{children}</Shell>
    </DemoProvider>
  );
}
