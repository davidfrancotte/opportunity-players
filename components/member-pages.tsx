'use client';
import Link from 'next/link';
import { useState, type ReactNode, type SubmitEvent } from 'react';
import {
  ArrowUpRight,
  ArrowLeft,
  Plus,
  Check,
  Heart,
  MessageCircle,
  Bookmark,
  Search,
  MapPin,
  ImagePlus,
  Send,
  SlidersHorizontal,
  Download,
  Pencil,
  FileText,
  ShieldCheck,
  ExternalLink,
  Users,
  BriefcaseBusiness,
  Bell,
  Images,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { AthleteImage } from '@/components/athlete-image';
import { useDemo, toggleItem } from '@/components/member-context';
import {
  demoMembers,
  demoOpportunities,
  demoNotifications,
  type DemoMember,
  type DemoPost,
  type DemoOpportunity,
} from '@/lib/member-data';
import { currentSite } from '@/lib/content';

export function MemberHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="member-heading">
      <div>
        <span className="member-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
function Empty({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="member-empty">
      <Search size={29} />
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="member-modal" showCloseButton={false}>
        <DialogClose
          render={
            <Button
              className="member-modal-close"
              variant="ghost"
              size="icon"
              aria-label="Fermer"
            />
          }
        >
          <X />
        </DialogClose>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
function FollowButton({ member }: { member: DemoMember }) {
  const { followed, setFollowed, announce } = useDemo();
  const active = followed.includes(member.slug);
  return (
    <Button
      className={`m-button ${active ? 'subtle' : ''}`}
      variant={active ? 'outline' : 'default'}
      aria-pressed={active}
      onClick={() => {
        setFollowed((x) => toggleItem(x, member.slug));
        announce(
          active
            ? 'Abonnement retiré dans cette démo.'
            : 'Profil suivi dans cette démo. Aucun membre réel notifié.',
        );
      }}
    >
      {active ? <Check size={15} /> : <Plus size={15} />}{' '}
      {active ? 'Suivi' : 'Suivre'}
    </Button>
  );
}
export function MemberCard({ member }: { member: DemoMember }) {
  return (
    <article className="network-member-card">
      <Link
        href={`/espace/membres/${member.slug}`}
        className="member-card-cover"
      >
        <AthleteImage
          src={`/images/${member.image}.webp`}
          alt={`Illustration de ${member.sport}, profil fictif ${member.name}`}
          width={1536}
          height={1024}
          loading="lazy"
        />
        <span>{member.sport}</span>
      </Link>
      <div className="network-member-info">
        <span className="member-avatar">{member.initials}</span>
        <Link href={`/espace/membres/${member.slug}`}>
          <h2>{member.name}</h2>
        </Link>
        <p>
          {member.role} · {member.sport}
        </p>
        <small>
          <MapPin size={12} />
          {member.city}
        </small>
        <div>
          <FollowButton member={member} />
          <Link
            href={`/espace/membres/${member.slug}`}
            className="m-icon-link"
            aria-label={`Voir le profil de ${member.name}`}
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}
function SuggestionRail() {
  return (
    <aside className="member-rail">
      <section className="member-panel">
        <div className="panel-heading">
          <h2>À découvrir</h2>
          <Users size={17} />
        </div>
        <p className="rail-subtitle">Des profils pour élargir votre terrain.</p>
        {demoMembers.slice(0, 3).map((m) => (
          <div className="rail-person" key={m.slug}>
            <span className="member-avatar small">{m.initials}</span>
            <div>
              <Link href={`/espace/membres/${m.slug}`}>{m.name}</Link>
              <small>
                {m.role} · {m.sport}
              </small>
            </div>
            <Link
              href={`/espace/membres/${m.slug}`}
              aria-label={`Découvrir ${m.name}`}
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>
        ))}
        <Link href="/espace/reseau" className="m-text-link">
          Explorer le réseau <ArrowUpRight size={15} />
        </Link>
      </section>
      <section className="rail-opportunity">
        <span className="member-eyebrow">VOTRE PROCHAIN MOUVEMENT</span>
        <h2>
          Un projet.
          <br />
          Le bon collectif.
        </h2>
        <p>Découvrez les annonces imaginées pour cette démo.</p>
        <Link href="/espace/opportunites" className="m-button">
          Voir les opportunités <ArrowUpRight size={16} />
        </Link>
      </section>
      <p className="rail-fineprint">
        Les personnes, clubs et publications de cet espace sont fictifs. Ils
        illustrent la nouvelle expérience Arena.
      </p>
    </aside>
  );
}
function Composer() {
  const { profile, setPosts, announce } = useDemo();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'Article' | 'Annonce'>('Article');
  const [body, setBody] = useState('');
  const [withImage, setWithImage] = useState(false);
  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body.trim()) return;
    setPosts((p) => [
      {
        id: `demo-${Date.now()}`,
        author: 'me',
        name: `${profile.firstName} ${profile.lastName}`,
        role: 'Sportive · Padel',
        type,
        body: body.trim(),
        image: withImage ? 'padel' : undefined,
        likes: 0,
        comments: [],
      },
      ...p,
    ]);
    setBody('');
    setWithImage(false);
    setOpen(false);
    announce(
      'Publication ajoutée uniquement à votre démo, sans publication réelle.',
    );
  }
  return (
    <>
      <div className="member-composer">
        <span className="member-avatar">CM</span>
        <Button
          variant="ghost"
          onClick={() => setOpen(true)}
          className="composer-trigger"
        >
          Un projet, une idée, une nouvelle à partager ? <Plus size={19} />
        </Button>
        <div>
          <Button
            variant="ghost"
            onClick={() => {
              setType('Article');
              setOpen(true);
            }}
          >
            <FileText size={16} />
            Article
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setType('Annonce');
              setOpen(true);
            }}
          >
            <BriefcaseBusiness size={16} />
            Annonce
          </Button>
          <span>Visible dans votre démo uniquement</span>
        </div>
      </div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Faites vivre votre réseau."
        description="Essai local : aucun contenu ne sera publié sur la plateforme actuelle. Utilisez un texte fictif."
      >
        <form onSubmit={submit}>
          <div className="member-filters">
            {(['Article', 'Annonce'] as const).map((t) => (
              <Button
                key={t}
                variant="outline"
                aria-pressed={type === t}
                className={type === t ? 'selected' : ''}
                onClick={() => setType(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <label htmlFor="demo-post">Votre {type.toLowerCase()}</label>
          <Textarea
            id="demo-post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Racontez votre projet sportif…"
            required
            maxLength={1500}
            rows={5}
          />
          <div className="composer-media">
            <Button
              variant="outline"
              aria-pressed={withImage}
              onClick={() => setWithImage((x) => !x)}
            >
              <ImagePlus size={16} />
              {withImage
                ? 'Retirer l’illustration'
                : 'Ajouter l’illustration padel'}
            </Button>
            <small>{body.length}/1500</small>
          </div>
          {withImage && (
            <AthleteImage
              className="composer-preview"
              src="/images/padel.webp"
              alt="Illustration padel de démonstration"
              width={1536}
              height={1024}
            />
          )}
          <Button className="m-button" type="submit" disabled={!body.trim()}>
            Ajouter à la démo <ArrowUpRight size={17} />
          </Button>
        </form>
      </Modal>
    </>
  );
}
function PostCard({ post }: { post: DemoPost }) {
  const { liked, setLiked, posts, setPosts, announce } = useDemo();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const isLiked = liked.includes(post.id);
  const initials = post.name
    .split(' ')
    .map((x) => x[0])
    .slice(0, 2)
    .join('');
  const profileUrl =
    post.author === 'me' ? '/espace/profil' : `/espace/membres/${post.author}`;
  function addComment(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment.trim()) return;
    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? { ...p, comments: [...p.comments, comment.trim()] }
          : p,
      ),
    );
    setComment('');
    announce('Commentaire ajouté à la démo uniquement.');
  }
  return (
    <article className="member-post">
      <header>
        <Link href={profileUrl} className="member-avatar">
          {initials}
        </Link>
        <div>
          <Link href={profileUrl}>
            <strong>{post.name}</strong>
          </Link>
          <p>{post.role}</p>
        </div>
        <span>{post.type} · Démo</span>
      </header>
      <p className="post-body">{post.body}</p>
      {post.image && (
        <div className="post-image">
          <AthleteImage
            src={`/images/${post.image}.webp`}
            alt={`Illustration sportive de la publication fictive de ${post.name}`}
            width={1536}
            height={1024}
            loading="lazy"
          />
        </div>
      )}
      {post.type === 'Annonce' && post.author === 'horizon-padel' && (
        <Link
          className="post-announcement"
          href="/espace/opportunites/coach-padel"
        >
          Découvrir le projet de padel <ArrowUpRight size={18} />
        </Link>
      )}
      <div className="post-social-proof">
        <span>{post.likes + (isLiked ? 1 : 0)} appréciations d’exemple</span>
        <span>
          {post.comments.length} commentaire
          {post.comments.length > 1 ? 's' : ''}
        </span>
      </div>
      <div className="post-actions">
        <Button
          variant="ghost"
          aria-pressed={isLiked}
          className={isLiked ? 'selected' : ''}
          onClick={() => setLiked((x) => toggleItem(x, post.id))}
        >
          <Heart size={17} fill={isLiked ? 'currentColor' : 'none'} />
          J’aime
        </Button>
        <Button
          variant="ghost"
          aria-expanded={showComments}
          onClick={() => setShowComments((x) => !x)}
        >
          <MessageCircle size={17} />
          Commenter
        </Button>
        <Link
          href={`/espace/messages?avec=${post.author === 'me' ? 'alex-dupont' : post.author}`}
        >
          <Send size={16} />
          Échanger
        </Link>
      </div>
      {showComments && (
        <div className="post-comments">
          {post.comments.map((c, i) => (
            <p key={`${post.id}-${i}`}>
              <span>Commentaire de démonstration</span>
              {c}
            </p>
          ))}
          <form onSubmit={addComment}>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Un commentaire fictif…"
              aria-label="Votre commentaire de démonstration"
              maxLength={500}
              required
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Ajouter le commentaire à la démo"
              disabled={!comment.trim()}
            >
              <ArrowUpRight size={18} />
            </Button>
          </form>
        </div>
      )}
    </article>
  );
}
export function FeedPage() {
  const { profile, posts } = useDemo();
  const [filter, setFilter] = useState('Tout');
  const filtered = posts.filter((p) => filter === 'Tout' || p.type === filter);
  return (
    <>
      <MemberHeading
        eyebrow="VOTRE TERRAIN COMMUN"
        title={`Bonjour, ${profile.firstName}.`}
        description="Le sport nous relie. À vous de créer la prochaine rencontre."
      />
      <div className="member-two-column">
        <div>
          <div className="member-welcome">
            <div>
              <span>VOTRE PROFIL, VOTRE POINT DE DÉPART</span>
              <h2>
                Donnez de l’élan
                <br />à votre parcours.
              </h2>
              <Link href="/espace/profil">
                Explorer mon profil <ArrowUpRight size={17} />
              </Link>
            </div>
            <span aria-hidden="true">↗</span>
          </div>
          <Composer />
          <div className="feed-filter">
            <div className="member-filters">
              {['Tout', 'Article', 'Annonce'].map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  aria-pressed={filter === f}
                  className={filter === f ? 'selected' : ''}
                  onClick={() => setFilter(f)}
                >
                  {f === 'Tout'
                    ? 'Pour vous'
                    : f === 'Article'
                      ? 'Articles'
                      : 'Annonces'}
                </Button>
              ))}
            </div>
            <span>PUBLICATIONS FICTIVES</span>
          </div>
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <SuggestionRail />
      </div>
    </>
  );
}
export function NetworkPage({ initialQuery = '' }: { initialQuery?: string }) {
  const { followed } = useDemo();
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState('Tous');
  const [sport, setSport] = useState('Tous les sports');
  const filtered = demoMembers.filter(
    (m) =>
      (tab !== 'Suivis' || followed.includes(m.slug)) &&
      (sport === 'Tous les sports' || m.sport === sport) &&
      `${m.name} ${m.role} ${m.sport} ${m.city}`
        .toLocaleLowerCase('fr')
        .includes(query.toLocaleLowerCase('fr')),
  );
  return (
    <>
      <MemberHeading
        eyebrow="LES RENCONTRES FONT LE RESTE"
        title="Votre réseau."
        description="Trouvez les personnes et les collectifs avec qui avancer."
      />
      <div className="member-toolbar">
        <div className="member-filters">
          {['Tous', 'Suivis'].map((t) => (
            <Button
              key={t}
              variant="ghost"
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
              className={tab === t ? 'selected' : ''}
            >
              {t === 'Tous' ? 'À découvrir' : `Suivis · ${followed.length}`}
            </Button>
          ))}
        </div>
        <label className="member-inline-search" htmlFor="network-query">
          <Search size={17} />
          <Input
            id="network-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nom, ville ou expertise…"
            aria-label="Filtrer les profils"
          />
        </label>
      </div>
      <div className="member-sport-filters">
        <SlidersHorizontal size={16} />
        {[
          'Tous les sports',
          'Padel',
          'Football',
          'Basketball',
          'Tennis',
          'Athlétisme',
        ].map((s) => (
          <Button
            key={s}
            variant="ghost"
            aria-pressed={sport === s}
            className={sport === s ? 'selected' : ''}
            onClick={() => setSport(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <p className="member-result-count" aria-live="polite">
        {filtered.length} profil{filtered.length > 1 ? 's' : ''} de
        démonstration
      </p>
      {filtered.length ? (
        <div className="member-network-grid">
          {filtered.map((m) => (
            <MemberCard key={m.slug} member={m} />
          ))}
        </div>
      ) : (
        <Empty
          title="Le bon profil reste à trouver."
          description="Élargissez vos critères pour retrouver les profils de démonstration."
        >
          <Button
            className="m-button"
            onClick={() => {
              setQuery('');
              setSport('Tous les sports');
              setTab('Tous');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </Empty>
      )}
    </>
  );
}
function SaveOpportunity({ opportunity }: { opportunity: DemoOpportunity }) {
  const { saved, setSaved, announce } = useDemo();
  const active = saved.includes(opportunity.slug);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="opportunity-save"
      aria-label={
        active
          ? 'Retirer des opportunités enregistrées'
          : 'Enregistrer cette opportunité'
      }
      aria-pressed={active}
      onClick={() => {
        setSaved((x) => toggleItem(x, opportunity.slug));
        announce(
          active
            ? 'Opportunité retirée de votre sélection locale.'
            : 'Opportunité enregistrée pour cette session de démo.',
        );
      }}
    >
      <Bookmark size={19} fill={active ? 'currentColor' : 'none'} />
    </Button>
  );
}
function OpportunityCard({ opportunity: o }: { opportunity: DemoOpportunity }) {
  return (
    <article className="member-opportunity">
      <Link
        className="opportunity-image"
        href={`/espace/opportunites/${o.slug}`}
      >
        <AthleteImage
          src={`/images/${o.image}.webp`}
          alt={`Illustration de l’annonce fictive ${o.title}`}
          width={1536}
          height={1024}
          loading="lazy"
        />
      </Link>
      <div className="opportunity-info">
        <div>
          <span className="member-pill">{o.sport}</span>
          <SaveOpportunity opportunity={o} />
        </div>
        <small>{o.org} · Annonce fictive</small>
        <Link href={`/espace/opportunites/${o.slug}`}>
          <h2>{o.title}</h2>
        </Link>
        <p>{o.intro}</p>
        <div className="opportunity-meta">
          <span>
            <MapPin size={14} />
            {o.city}
          </span>
          <span>
            <UserRoundIcon />
            {o.role}
          </span>
        </div>
        <Link href={`/espace/opportunites/${o.slug}`} className="m-text-link">
          Découvrir le projet <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
function UserRoundIcon() {
  return <Users size={14} />;
}
export function OpportunitiesPage() {
  const { saved } = useDemo();
  const [tab, setTab] = useState('Toutes');
  const [query, setQuery] = useState('');
  const filtered = demoOpportunities.filter(
    (o) =>
      (tab === 'Toutes' || saved.includes(o.slug)) &&
      `${o.title} ${o.sport} ${o.city} ${o.role}`
        .toLocaleLowerCase('fr')
        .includes(query.toLocaleLowerCase('fr')),
  );
  return (
    <>
      <MemberHeading
        eyebrow="VOTRE PROCHAIN MOUVEMENT"
        title="Des projets. Des possibles."
        description="Explorez les annonces et gardez celles qui vous parlent."
      />
      <div className="member-toolbar">
        <div className="member-filters">
          {['Toutes', 'Enregistrées'].map((t) => (
            <Button
              key={t}
              variant="ghost"
              className={tab === t ? 'selected' : ''}
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
            >
              {t}
              {t === 'Enregistrées' ? ` · ${saved.length}` : ''}
            </Button>
          ))}
        </div>
        <label className="member-inline-search" htmlFor="opportunity-query">
          <Search size={17} />
          <Input
            id="opportunity-query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sport, ville, rôle…"
            aria-label="Rechercher une opportunité"
          />
        </label>
      </div>
      <p className="member-result-count" aria-live="polite">
        {filtered.length} annonce{filtered.length > 1 ? 's' : ''} de
        démonstration · Aucune offre réelle
      </p>
      {filtered.length ? (
        <div className="member-opportunities-grid">
          {filtered.map((o) => (
            <OpportunityCard key={o.slug} opportunity={o} />
          ))}
        </div>
      ) : (
        <Empty
          title={
            tab === 'Enregistrées'
              ? 'Votre prochaine opportunité vous attend.'
              : 'Aucun projet avec ces critères.'
          }
          description={
            tab === 'Enregistrées'
              ? 'Utilisez le marque-page d’une annonce pour la retrouver ici.'
              : 'Essayez une autre discipline ou une autre ville.'
          }
        >
          <Button
            className="m-button"
            onClick={() => {
              setTab('Toutes');
              setQuery('');
            }}
          >
            Explorer toutes les annonces
          </Button>
        </Empty>
      )}
    </>
  );
}
export function OpportunityDetail({
  opportunity: o,
}: {
  opportunity: DemoOpportunity;
}) {
  return (
    <>
      <Link className="member-back-link" href="/espace/opportunites">
        <ArrowLeft size={15} /> Toutes les opportunités
      </Link>
      <div className="opportunity-detail">
        <div>
          <div className="opportunity-detail-image">
            <AthleteImage
              src={`/images/${o.image}.webp`}
              alt={`Illustration de ${o.sport}`}
              width={1536}
              height={1024}
            />
            <span>ANNONCE DE DÉMONSTRATION</span>
          </div>
          <section className="member-panel opportunity-detail-copy">
            <span className="member-pill">{o.sport}</span>
            <h1>{o.title}</h1>
            <p className="opportunity-detail-intro">{o.intro}</p>
            <hr />
            <h2>Le projet</h2>
            <p>{o.description}</p>
            <h2>Ce qui ferait la différence</h2>
            <ul>
              {o.needs.map((n) => (
                <li key={n}>
                  <Check size={16} />
                  {n}
                </li>
              ))}
            </ul>
            <div className="member-tags">
              {o.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <section className="member-panel opportunity-contact">
            <span className="member-avatar">
              {o.org
                .split(' ')
                .map((x) => x[0])
                .join('')
                .slice(0, 2)}
            </span>
            <h2>{o.org}</h2>
            <p>
              <MapPin size={14} />
              {o.city}
            </p>
            <p>
              <BriefcaseBusiness size={14} />
              Profil recherché : {o.role}
            </p>
            <Link
              className="m-button"
              href={`/espace/messages?avec=${o.member}`}
            >
              Simuler une prise de contact <ArrowUpRight size={16} />
            </Link>
            <div className="save-detail">
              <SaveOpportunity opportunity={o} />
              <span>Garder cette annonce</span>
            </div>
            <small>
              Cette annonce est fictive. Aucun message ni candidature ne sera
              transmis.
            </small>
          </section>
          <Link className="m-text-link" href={`/espace/membres/${o.member}`}>
            Découvrir le profil associé <ArrowUpRight size={16} />
          </Link>
        </aside>
      </div>
    </>
  );
}
function ProfileEditor() {
  const { profile, setProfile, announce } = useDemo();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(profile);
  return (
    <>
      <Button
        className="m-button"
        variant="outline"
        onClick={() => {
          setDraft(profile);
          setOpen(true);
        }}
      >
        <Pencil size={15} />
        Modifier mon profil
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Votre profil, à votre image."
        description="Utilisez des informations fictives. Les modifications ne vivent que dans cette session de démonstration."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setProfile(draft);
            setOpen(false);
            announce('Profil de démonstration modifié pour cette session.');
          }}
        >
          <div className="member-form-columns">
            <label htmlFor="profile-first">
              Prénom
              <Input
                id="profile-first"
                name="given-name"
                autoComplete="given-name"
                required
                maxLength={40}
                value={draft.firstName}
                onChange={(e) =>
                  setDraft({ ...draft, firstName: e.target.value })
                }
              />
            </label>
            <label htmlFor="profile-last">
              Nom
              <Input
                id="profile-last"
                name="family-name"
                autoComplete="family-name"
                required
                maxLength={40}
                value={draft.lastName}
                onChange={(e) =>
                  setDraft({ ...draft, lastName: e.target.value })
                }
              />
            </label>
          </div>
          <label htmlFor="profile-city">
            Localisation
            <Input
              id="profile-city"
              autoComplete="address-level2"
              value={draft.city}
              maxLength={80}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
            />
          </label>
          <label htmlFor="profile-headline">
            Votre titre
            <Input
              id="profile-headline"
              value={draft.headline}
              maxLength={120}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
            />
          </label>
          <label htmlFor="profile-bio">
            Votre présentation
            <Textarea
              id="profile-bio"
              value={draft.bio}
              maxLength={800}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              rows={4}
            />
          </label>
          <Button type="submit" className="m-button">
            Enregistrer dans la démo <Check size={17} />
          </Button>
        </form>
      </Modal>
    </>
  );
}
function DownloadCV() {
  const { profile, announce } = useDemo();
  function download() {
    const text = `CV DE DÉMONSTRATION — PROFIL FICTIF\n\n${profile.firstName} ${profile.lastName}\n${profile.headline}\n${profile.city}\n\nPRÉSENTATION\n${profile.bio}\n\nSPORT\nPadel — Pratique amateur\n\nDocument généré depuis la démo Arena. Aucun profil réel ni certification.`;
    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/plain;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-arena-demonstration.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('CV fictif téléchargé au format texte.');
  }
  return (
    <Button className="m-button" variant="outline" onClick={download}>
      <Download size={15} />
      CV de démo (.txt)
    </Button>
  );
}
export function ProfilePage() {
  const { profile, followed, posts } = useDemo();
  return (
    <>
      <MemberHeading
        eyebrow="VOTRE PROFIL DE DÉMONSTRATION"
        title="Un parcours qui vous ressemble."
        description="Rassemblez ce qui fait votre singularité."
      />
      <section className="member-profile">
        <div className="profile-cover">
          <AthleteImage
            src="/images/padel.webp"
            alt="Joueuse fictive illustrant le profil de Camille"
            width={1536}
            height={1024}
          />
          <span>LE SPORT NOUS RELIE.</span>
        </div>
        <div className="profile-identity">
          <span className="member-avatar large">
            {profile.firstName.slice(0, 1)}
            {profile.lastName.slice(0, 1)}
          </span>
          <div>
            <span className="member-pill">Ouverte aux rencontres · Démo</span>
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
            <p>{profile.headline}</p>
            <small>
              <MapPin size={14} />
              {profile.city}
            </small>
          </div>
          <div className="profile-controls">
            <ProfileEditor />
            <DownloadCV />
          </div>
        </div>
        <div className="profile-facts">
          <span>
            <strong>Padel</strong>Discipline
          </span>
          <span>
            <strong>Amateur</strong>Niveau d’exemple
          </span>
          <Link href="/espace/reseau">
            <strong>{followed.length}</strong>Profil
            {followed.length > 1 ? 's' : ''} suivi
            {followed.length > 1 ? 's' : ''} dans la démo
          </Link>
        </div>
      </section>
      <Tabs defaultValue="about" className="member-profile-tabs">
        <TabsList className="member-tabs">
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="posts">Publications</TabsTrigger>
          <TabsTrigger value="network">Réseau</TabsTrigger>
          <TabsTrigger value="gallery">Galerie</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <div className="profile-about-grid">
            <section className="member-panel">
              <h2>Mon histoire</h2>
              <p>{profile.bio}</p>
              <h2>Ce que je recherche</h2>
              <div className="member-tags">
                <span>Partenaires d’entraînement</span>
                <span>Progression</span>
                <span>Rencontres</span>
              </div>
            </section>
            <section className="member-panel">
              <h2>Mon jeu</h2>
              {[
                ['Discipline', 'Padel'],
                ['Bras fort', 'Droit — exemple'],
                ['Style', 'Contrôle & maîtrise'],
                ['Fréquence', 'Plusieurs fois par semaine'],
              ].map(([k, v]) => (
                <div className="profile-stat-row" key={k}>
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </section>
            <section className="member-panel">
              <h2>Compétences</h2>
              <p className="member-subtle">
                Exemples de rubriques ; aucune compétence vérifiée.
              </p>
              <div className="member-tags">
                <span>Lob</span>
                <span>Revers</span>
                <span>Jeu de paroi</span>
                <span>Communication</span>
              </div>
            </section>
            <section className="member-panel">
              <h2>Parcours & certifications</h2>
              <p>
                Votre parcours mérite des repères. Cette démonstration ne
                contient aucun diplôme ni palmarès réel.
              </p>
              <ProfileEditor />
            </section>
          </div>
        </TabsContent>
        <TabsContent value="posts">
          {posts.filter((p) => p.author === 'me').length ? (
            posts
              .filter((p) => p.author === 'me')
              .map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            <Empty
              title="Votre histoire commence ici."
              description="Ajoutez une publication fictive depuis le fil pour la retrouver sur votre profil."
            >
              <Link className="m-button" href="/espace">
                Créer une publication de démo <Plus size={16} />
              </Link>
            </Empty>
          )}
        </TabsContent>
        <TabsContent value="network">
          <div className="member-network-grid">
            {demoMembers
              .filter((m) => followed.includes(m.slug))
              .map((m) => (
                <MemberCard key={m.slug} member={m} />
              ))}
          </div>
          {!followed.length && (
            <Empty
              title="Votre collectif reste à rencontrer."
              description="Suivez un profil depuis le réseau pour le retrouver ici."
            >
              <Link href="/espace/reseau" className="m-button">
                Découvrir le réseau
              </Link>
            </Empty>
          )}
        </TabsContent>
        <TabsContent value="gallery">
          <GalleryContent />
        </TabsContent>
      </Tabs>
    </>
  );
}
export function MemberDetail({ member: m }: { member: DemoMember }) {
  return (
    <>
      <Link className="member-back-link" href="/espace/reseau">
        <ArrowLeft size={15} /> Retour au réseau
      </Link>
      <section className="member-profile">
        <div className="profile-cover">
          <AthleteImage
            src={`/images/${m.image}.webp`}
            alt={`Visuel de ${m.sport} pour le profil fictif de ${m.name}`}
            width={1536}
            height={1024}
          />
          <span>PROFIL FICTIF · DÉMONSTRATION</span>
        </div>
        <div className="profile-identity">
          <span className="member-avatar large">{m.initials}</span>
          <div>
            <span className="member-pill">{m.sport}</span>
            <h1>{m.name}</h1>
            <p>
              {m.role} · {m.sport}
            </p>
            <small>
              <MapPin size={14} />
              {m.city}
            </small>
          </div>
          <div className="profile-controls">
            <FollowButton member={m} />
            <Link
              href={`/espace/messages?avec=${m.slug}`}
              className="m-button subtle"
            >
              <MessageCircle size={15} />
              Explorer la conversation
            </Link>
          </div>
        </div>
      </section>
      <div className="profile-about-grid">
        <section className="member-panel">
          <h2>À propos</h2>
          <p>{m.bio}</p>
          <div className="member-tags">
            {m.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </section>
        <section className="member-panel">
          <h2>Ouvrir la rencontre</h2>
          <p>
            Découvrez le parcours, suivez le profil ou explorez la messagerie de
            démonstration. Aucune personne réelle ne recevra vos essais.
          </p>
          <Link
            href={`/espace/messages?avec=${m.slug}`}
            className="m-text-link"
          >
            Passer à la conversation <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
export function MessagesPage({
  initialContact = 'alex-dupont',
}: {
  initialContact?: string;
}) {
  const { messages, setMessages, announce } = useDemo();
  const [selected, setSelected] = useState(
    demoMembers.some((m) => m.slug === initialContact)
      ? initialContact
      : 'alex-dupont',
  );
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const member = demoMembers.find((m) => m.slug === selected)!;
  const thread = messages[selected] ?? [
    {
      body: `Bonjour Camille, ravi de découvrir votre parcours. Quel projet sportif aimeriez-vous faire avancer ?`,
      mine: false,
    },
    {
      body: 'Bonjour ! Je souhaite rencontrer des acteurs de ma discipline et échanger autour de l’entraînement.',
      mine: true,
    },
  ];
  function send(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages({
      ...messages,
      [selected]: [...thread, { body: draft.trim(), mine: true }],
    });
    setDraft('');
    announce('Message ajouté à la conversation fictive. Rien n’a été envoyé.');
  }
  return (
    <>
      <MemberHeading
        eyebrow="LA RENCONTRE DEVIENT UN ÉCHANGE"
        title="Vos conversations."
        description="Gardez le fil de votre projet sportif."
      />
      <div className="member-messenger">
        <aside className="conversation-list">
          <label className="conversation-search" htmlFor="conversation-query">
            <Search size={16} />
            <Input
              id="conversation-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Une conversation…"
              aria-label="Filtrer les conversations"
            />
          </label>
          {demoMembers
            .filter((m) =>
              m.name
                .toLocaleLowerCase('fr')
                .includes(query.toLocaleLowerCase('fr')),
            )
            .map((m) => (
              <Button
                key={m.slug}
                variant="ghost"
                className={`conversation-item ${selected === m.slug ? 'selected' : ''}`}
                aria-pressed={selected === m.slug}
                onClick={() => {
                  setSelected(m.slug);
                  setDraft('');
                }}
              >
                <span className="member-avatar">{m.initials}</span>
                <span>
                  <strong>{m.name}</strong>
                  <small>{m.sport} · Conversation fictive</small>
                </span>
                <ArrowUpRight size={15} />
              </Button>
            ))}
          {demoMembers.every(
            (m) =>
              !m.name
                .toLocaleLowerCase('fr')
                .includes(query.toLocaleLowerCase('fr')),
          ) && (
            <p className="conversation-no-results">
              Aucune conversation avec ce nom.
            </p>
          )}
        </aside>
        <section className="conversation-thread">
          <header>
            <span className="member-avatar">{member.initials}</span>
            <div>
              <Link href={`/espace/membres/${member.slug}`}>
                <strong>{member.name}</strong>
              </Link>
              <p>
                {member.role} · {member.sport}
              </p>
            </div>
            <Link
              href={`/espace/membres/${member.slug}`}
              className="m-icon-link"
              aria-label="Voir le profil"
            >
              <ArrowUpRight size={20} />
            </Link>
          </header>
          <div
            className="thread-body"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <span className="thread-label">CONVERSATION ILLUSTRATIVE</span>
            {thread.map((m, i) => (
              <div
                className={`message-bubble ${m.mine ? 'mine' : ''}`}
                key={`${selected}-${i}`}
              >
                <small>{m.mine ? 'Vous · Démo' : member.name}</small>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
          <form className="message-compose" onSubmit={send}>
            <Textarea
              key={selected}
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Rédigez un message fictif…"
              aria-label="Message de démonstration"
              maxLength={1000}
              required
            />
            <div>
              <small>Aucun envoi réel. Aucun destinataire notifié.</small>
              <Button
                type="submit"
                className="m-button"
                disabled={!draft.trim()}
              >
                Simuler l’envoi <Send size={15} />
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
function GalleryContent() {
  const [tab, setTab] = useState('photos');
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="member-tabs">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Vidéos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="photos">
          <p className="member-result-count">
            3 illustrations de démonstration · Aucun média personnel importé
          </p>
          <div className="member-gallery">
            {[
              { image: 'padel', title: 'Le plaisir de progresser' },
              { image: 'tennis', title: 'Le geste juste' },
              { image: 'adaptive-athletics', title: 'Toutes les trajectoires' },
            ].map((p) => (
              <Button
                variant="ghost"
                key={p.image}
                className="gallery-photo"
                onClick={() => setSelected(p.image)}
                aria-label={`Agrandir : ${p.title}`}
              >
                <AthleteImage
                  src={`/images/${p.image}.webp`}
                  alt={p.title}
                  width={1536}
                  height={1024}
                />
                <span>
                  {p.title}
                  <ArrowUpRight size={17} />
                </span>
              </Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <Empty
            title="Le mouvement racontera la suite."
            description="Aucune vidéo dans cette démo. L’import et le stockage seront reliés au service existant lors de l’intégration."
          >
            <a href={`${currentSite}/connexion`} className="m-button">
              Accéder à mes médias réels <ExternalLink size={15} />
            </a>
          </Empty>
        </TabsContent>
        <TabsContent value="documents">
          <div className="member-document">
            <FileText size={35} />
            <div>
              <h3>Votre CV de démonstration</h3>
              <p>Un export texte des informations du profil fictif.</p>
            </div>
            <DownloadCV />
          </div>
        </TabsContent>
      </Tabs>
      <Modal
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
        title="Le sport, en grand."
        description="Illustration générée pour la démonstration Arena, sans représentation de membre réel."
      >
        {selected && (
          <AthleteImage
            className="gallery-enlarged"
            src={`/images/${selected}.webp`}
            alt="Illustration sportive agrandie"
            width={1536}
            height={1024}
          />
        )}
      </Modal>
    </>
  );
}
export function GalleryPage() {
  return (
    <>
      <MemberHeading
        eyebrow="VOTRE PARCOURS EN IMAGES"
        title="Des images qui racontent."
        description="Photos, vidéos, documents : donnez du contexte à votre profil."
      />
      <section className="member-panel gallery-panel">
        <GalleryContent />
      </section>
    </>
  );
}
export function NotificationsPage() {
  const { read, setRead } = useDemo();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const list = demoNotifications.filter(
    (n) => !unreadOnly || !read.includes(n.id),
  );
  return (
    <>
      <MemberHeading
        eyebrow="RESTEZ DANS LE JEU"
        title="L’essentiel de votre réseau."
        description="Les nouveautés utiles, sans perdre le fil."
      >
        <Button
          className="m-button"
          variant="outline"
          disabled={read.length === demoNotifications.length}
          onClick={() => setRead(demoNotifications.map((n) => n.id))}
        >
          <Check size={15} />
          Tout marquer comme lu
        </Button>
      </MemberHeading>
      <div className="member-filters notification-filters">
        {[false, true].map((v) => (
          <Button
            key={String(v)}
            variant="ghost"
            className={unreadOnly === v ? 'selected' : ''}
            aria-pressed={unreadOnly === v}
            onClick={() => setUnreadOnly(v)}
          >
            {v ? 'Non lues' : 'Toutes'}
          </Button>
        ))}
      </div>
      <section className="member-panel notifications-list">
        {list.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            className={`notification-row ${read.includes(n.id) ? 'read' : ''}`}
            onClick={() =>
              setRead((x) => (x.includes(n.id) ? x : [...x, n.id]))
            }
          >
            <span className="notification-icon">
              {n.type === 'publication' ? (
                <MessageCircle size={21} />
              ) : n.type === 'opportunite' ? (
                <BriefcaseBusiness size={21} />
              ) : (
                <Users size={21} />
              )}
            </span>
            <span>
              <strong>{n.title}</strong>
              <p>{n.body}</p>
              <small>Exemple · Démonstration</small>
            </span>
            {!read.includes(n.id) && <i />}
            <ArrowUpRight size={18} />
          </Link>
        ))}
        {!list.length && (
          <Empty
            title="Vous êtes à jour."
            description="Toutes les notifications de cette démo ont été lues."
          />
        )}
      </section>
    </>
  );
}
export function SettingsPage() {
  const { preferences, setPreferences, announce } = useDemo();
  return (
    <>
      <MemberHeading
        eyebrow="VOTRE ESPACE, VOS CHOIX"
        title="Gardez la main."
        description="Des réglages lisibles, sans détour."
      />
      <div className="member-settings-grid">
        <div>
          <section className="member-panel">
            <div className="panel-heading">
              <h2>Vos notifications</h2>
              <Bell size={20} />
            </div>
            <p>
              Réglages de démonstration, conservés uniquement pendant cette
              session.
            </p>
            {[
              [
                'messages',
                'Messages',
                'Les nouveaux échanges autour de votre projet.',
              ],
              [
                'publications',
                'Publications du réseau',
                'Les actualités des profils que vous suivez.',
              ],
              [
                'opportunites',
                'Opportunités',
                'Les annonces liées à vos centres d’intérêt.',
              ],
              [
                'marketing',
                'Communications commerciales',
                'Un choix facultatif, désactivé dans cette démo.',
              ],
            ].map(([key, title, desc]) => (
              <div className="preference-row" key={key}>
                <label htmlFor={`pref-${key}`}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </label>
                <Switch
                  id={`pref-${key}`}
                  checked={preferences[key]}
                  onCheckedChange={(value) => {
                    setPreferences({ ...preferences, [key]: value });
                    announce('Préférence modifiée dans la démo uniquement.');
                  }}
                />
              </div>
            ))}
          </section>
          <section className="member-panel">
            <div className="panel-heading">
              <h2>Sécurité & identité</h2>
              <ShieldCheck size={20} />
            </div>
            <p>
              La vérification de l’adresse e-mail, le mot de passe et les
              protections du compte doivent être gérés sur le service actuel.
              Cette démonstration ne vous authentifie pas et ne stocke aucun
              identifiant.
            </p>
            <a href={`${currentSite}/connexion`} className="m-text-link">
              Accéder à mon compte réel <ExternalLink size={15} />
            </a>
          </section>
        </div>
        <aside>
          <section className="member-panel member-plan">
            <span className="member-eyebrow">LE PREMIER PAS</span>
            <h2>Compte gratuit.</h2>
            <p>
              La création de compte est gratuite. Les droits et options Premium
              dépendent de l’offre choisie sur la plateforme.
            </p>
            <Link href="/tarifs" className="m-button">
              Comprendre les formules <ArrowUpRight size={16} />
            </Link>
            <small>
              Aucun paiement ni changement d’abonnement depuis cette démo.
            </small>
          </section>
          <section className="member-panel">
            <h2>Une question ?</h2>
            <p>
              Notre aide rassemble les réponses sur les profils, les comptes et
              les médias.
            </p>
            <Link href="/aide" className="m-text-link">
              Ouvrir le centre d’aide <ArrowUpRight size={16} />
            </Link>
          </section>
          <Link href="/espace/medias" className="m-text-link">
            Ma galerie <Images size={16} />
          </Link>
        </aside>
      </div>
    </>
  );
}
