"use client";
import { useLocale } from "./locale";
import { T } from "./locale";
import { SportProfileSummary } from "./sport-portfolio";
import { sportProfileIssues } from "@/lib/studio/sport-profile";
import { PlayerSportFields } from "./directory-fields";
import { measurementLabel, sideNames } from "@/lib/studio/athlete";
import { primaryRecord } from "@/lib/studio/directory";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Plus, FileText, UsersRound, ArrowUpRight, Star, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { Textarea } from "./ui/textarea";
import { Field, AuthLayout, Guard } from "./studio-ui";
import { ProfileLayout, Modal } from "./profile-screens";
import { useDemo } from "./demo-provider";
import { sports, displayName } from "@/lib/studio/model";
import { members, type Member } from "@/lib/studio/social";
import {
  levels,
  memberSports,
  moderateText,
  fileDecision,
  type SportRecord,
  type DocumentRecord,
} from "@/lib/studio/trust";

function TrustError() {
  const { trust } = useDemo();
  return trust.error ? (
    <p role="alert" className="event-error">
      {trust.error}
    </p>
  ) : null;
}
export function ProfileExtensions() {
  const { profile } = useDemo();
  return (
    <section className="trust-profile">
      <SportProfileSummary />
      <span className="mini-kicker"><T>{"VOTRE DOSSIER SPORTIF"}</T></span>
      <p className="directory-profile-summary">
        {[
          profile.city,
          profile.country,
          profile.category === "Sportif" ? profile.gender : profile.accountType,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <div className="trust-sport-pills">
        {profile.disciplines.map((s) => (
          <span key={s.sport}>
            <T>{s.sport}</T> · <T>{s.level}</T>
            {s.ranking ? ` · ${s.ranking}` : ""}
            {profile.category === "Sportif" && s.position ? ` · ${s.position}` : ""}
            {profile.category === "Sportif" && s.dominantSide ? ` · ${s.dominantSide}` : ""}
          </span>
        ))}
      </div>
      {profile.category === "Sportif" && (
        <div className="athlete-profile-facts">
          <h3>
            <T>{"Caractéristiques du sportif"}</T>
          </h3>
          <dl>
            <div>
              <dt>
                <T>{"Poids"}</T>
              </dt>
              <dd>{measurementLabel(profile.weightKg, "kg")}</dd>
            </div>
            <div>
              <dt>
                <T>{"Taille"}</T>
              </dt>
              <dd>{measurementLabel(profile.heightCm, "cm")}</dd>
            </div>
            <div>
              <dt><T>{"Côté dominant · "}</T>{profile.sport}</dt>
              <dd>{sideNames[primaryRecord(profile).dominantSide || ""] || "Non renseigné"}</dd>
            </div>
          </dl>
          <Link href="/espace/modifier-profil">
            <T>{"Modifier mes caractéristiques"}</T>
            <ArrowUpRight size={16} />
          </Link>
          <p className="field-hint">
            <T>{"Côté dominant précisé par sport dans votre dossier."}</T>
          </p>
        </div>
      )}
      <Link href="/espace/disciplines">
        <span>
          <strong>
            <T>{"Sports, niveaux & clubs"}</T>
          </strong>
          <small>
            <T>{"Un parcours distinct par discipline"}</T>
          </small>
        </span>
        <ArrowUpRight size={18} />
      </Link>
      <Link href="/espace/agent">
        <span>
          <strong>
            <T>{"Mon agent"}</T>{profile.agent.status !== "none" && <> : {profile.agent.name}</>}
          </strong>
          <small>
            <T>{profile.agent.status === "confirmed"
              ? "Lien confirmé dans la démo"
              : profile.agent.status === "pending"
                ? "Confirmation de l’agent en attente"
                : profile.agent.status === "declared"
                  ? "Relation déclarée, non vérifiée"
                  : "Indiquer si vous êtes représenté"}</T>
          </small>
        </span>
        <ArrowUpRight size={18} />
      </Link>
      <Link href="/espace/documents">
        <span>
          <strong>
            <T>{"CV & références"}</T>
          </strong>
          <small>
            <T>{"Documents et justificatifs du parcours"}</T>
          </small>
        </span>
        <FileText size={18} />
      </Link>
      <Link href="/espace/parrainage">
        <span>
          <strong>
            <T>{"Inviter mon réseau"}</T>
          </strong>
          <small><T>{"Gagner des mois Premium · simulation"}</T></small>
        </span>
        <UsersRound size={18} />
      </Link>
      <Link href="/espace/securite">
        <span>
          <strong>
            <T>{"Sécurité & modération"}</T>
          </strong>
          <small><T>{"Signalements, blocages et confidentialité"}</T></small>
        </span>
        <ShieldCheck size={18} />
      </Link>
    </section>
  );
}

export function DisciplinesPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, setProfile, notify } = useDemo();
  const [records, setRecords] = useState<SportRecord[]>(structuredClone(profile.disciplines));
  const [sport, setSport] = useState("Tennis");
  const [error, setError] = useState("");
  function update(index: number, patch: Partial<SportRecord>) {
    setRecords(records.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function save(e: FormEvent) {
    e.preventDefault();
    if (!records.length) {
      setError("Ajoutez au moins une discipline.");
      return;
    }
    if (records.some((r) => r.clubs.some((c) => !c.name.trim() || !c.period.trim()))) {
      setError("Précisez le nom et la période de chaque club.");
      return;
    }
    if (moderateText(JSON.stringify(records))) {
      setError("Reformulez les informations de manière respectueuse.");
      return;
    }
    const issues = sportProfileIssues({ ...profile, disciplines: records });
    if (Object.keys(issues).length) {
      setError(Object.values(issues)[0]);
      return;
    }
    setProfile({
      ...profile,
      disciplines: records,
      sport: records.some((r) => r.sport === profile.sport) ? profile.sport : records[0].sport,
    });
    setError("");
    notify("Sports, niveaux et clubs enregistrés dans la démo.");
  }
  return (
    <ProfileLayout back="/espace/profil" title={uiCopy("Mes disciplines")}>
      <p className="event-note">
        <T>{"Chaque sport garde son niveau, son classement et ses clubs. Un classement déclaré n’est pas une note professionnelle ni une certification fédérale."}</T></p>
      <form className="event-form" onSubmit={save}>
        {records.map((r, i) => (
          <section className="trust-card" key={r.sport}>
            <div className="trust-card-head">
              <h2>{r.sport}</h2>
              <Button
                type="button"
                variant="ghost"
                aria-label={`Retirer ${r.sport}`}
                onClick={() => setRecords(records.filter((_, n) => i !== n))}
              >
                <Trash2 size={17} />
              </Button>
            </div>
            <PlayerSportFields
              record={r}
              prefix={`discipline-${i}`}
              onChange={(patch) => update(i, patch)}
            />
            <Field
              label="Classement / catégorie"
              id={`ranking-${i}`}
              value={r.ranking}
              maxLength={80}
              placeholder={uiCopy(r.sport === "Tennis"
                  ? "Ex. classement fédéral, pays et saison"
                  : r.sport === "Padel"
                    ? "Ex. P200, pays et saison"
                    : "Ex. division, ligue, catégorie")}
              onChange={(e) => update(i, { ranking: e.target.value })}
            />
            <h3>
              <T>{"Clubs actuels et précédents"}</T>
            </h3>
            {r.clubs.map((c, n) => (
              <fieldset className="trust-club" key={c.id}>
                <legend><T>{"Club "}</T>{n + 1}</legend>
                <Field
                  label="Nom du club"
                  id={`club-${c.id}`}
                  value={c.name}
                  maxLength={100}
                  required
                  onChange={(e) =>
                    update(i, {
                      clubs: r.clubs.map((x) =>
                        x.id === c.id ? { ...x, name: e.target.value } : x,
                      ),
                    })
                  }
                />
                <Field
                  label="Saison / période"
                  id={`period-${c.id}`}
                  value={c.period}
                  maxLength={60}
                  required
                  placeholder={uiCopy("2024 — aujourd’hui")}
                  onChange={(e) =>
                    update(i, {
                      clubs: r.clubs.map((x) =>
                        x.id === c.id ? { ...x, period: e.target.value } : x,
                      ),
                    })
                  }
                />
                <label className="event-check">
                  <input
                    type="checkbox"
                    checked={c.current}
                    onChange={(e) =>
                      update(i, {
                        clubs: r.clubs.map((x) =>
                          x.id === c.id ? { ...x, current: e.target.checked } : x,
                        ),
                      })
                    }
                  />
                  <T>{"J’y joue actuellement"}</T></label>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => update(i, { clubs: r.clubs.filter((x) => x.id !== c.id) })}
                >
                  <T>{"Retirer ce club"}</T></Button>
              </fieldset>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                update(i, {
                  clubs: [
                    ...r.clubs,
                    {
                      id: crypto.randomUUID(),
                      name: "",
                      period: "",
                      current: true,
                    },
                  ],
                })
              }
            >
              <Plus size={16} />
              <T>{"Ajouter un club"}</T>
            </Button>
          </section>
        ))}
        <label>
          <T>{"Ajouter une discipline"}</T><NativeSelect
            value={sport}
            aria-label={uiCopy("Discipline à ajouter")}
            onChange={(e) => setSport(e.target.value)}
          >
            {sports.map((s) => (
              <NativeSelectOption key={s}>{s}</NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <Button
          type="button"
          variant="outline"
          disabled={records.some((r) => r.sport === sport)}
          onClick={() =>
            setRecords([
              ...records,
              {
                sport,
                level: "Loisir",
                ranking: "",
                federation: "",
                clubs: [],
              },
            ])
          }
        >
          <Plus size={17} />
          <T>{"Ajouter"}</T>
          {sport}
        </Button>
        {error && (
          <p role="alert" className="event-error">
            {error}
          </p>
        )}
        <Button type="submit" className="action primary">
          <T>{"Enregistrer mon parcours multisport"}</T></Button>
      </form>
    </ProfileLayout>
  );
}

export function AgentPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, setProfile, notify } = useDemo();
  const [hasAgent, setHasAgent] = useState(profile.agent.status !== "none");
  const [name, setName] = useState(profile.agent.name);
  const [id, setId] = useState(profile.agent.memberId);
  const [error, setError] = useState("");
  function save(e: FormEvent) {
    e.preventDefault();
    if (hasAgent && (!name.trim() || moderateText(name))) {
      setError("Indiquez un nom valide et respectueux.");
      return;
    }
    setProfile({
      ...profile,
      agent: hasAgent
        ? {
            name: name.trim(),
            memberId: id,
            status: id ? "pending" : "declared",
          }
        : { name: "", memberId: "", status: "none" },
    });
    setError("");
    notify(
      id
        ? "Demande de lien simulée. L’agent devra confirmer."
        : "Situation enregistrée dans la démo.",
    );
  }
  return (
    <ProfileLayout back="/espace/profil" title={uiCopy("Mon agent")}>
      <form className="event-form" onSubmit={save}>
        <label className="event-check">
          <input
            type="checkbox"
            checked={hasAgent}
            onChange={(e) => setHasAgent(e.target.checked)}
          />
          <T>{"Je suis représenté par un agent"}</T></label>
        {hasAgent && (
          <>
            <Field
              label="Nom de mon agent"
              name="agent-name"
              value={name}
              maxLength={100}
              onChange={(e) => {
                setName(e.target.value);
                setId("");
              }}
            />
            <label>
              <T>{"Lier un membre du réseau"}</T><NativeSelect
                aria-label={uiCopy("Agent dans le réseau")}
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  if (e.target.value) setName(members.find((m) => m.id === e.target.value)!.name);
                }}
              >
                <NativeSelectOption value=""><T>{"Non inscrit / nom uniquement"}</T></NativeSelectOption>
                {members
                  .filter((m) => m.kind === "Professionnels")
                  .map((m) => (
                    <NativeSelectOption key={m.id} value={m.id}>
                      {m.name} <T>{"· profil démo"}</T></NativeSelectOption>
                  ))}
              </NativeSelect>
            </label>
            <p className="event-note">
              <T>{"La relation ne sera indiquée comme confirmée qu’après validation par l’autre membre. Un nom saisi librement reste « déclaré, non vérifié »."}</T></p>
          </>
        )}
        {error && <p role="alert">{error}</p>}
        <Button className="action primary" type="submit">
          <T>{"Enregistrer"}</T>
        </Button>
      </form>
      {profile.agent.status !== "none" && (
        <section className="trust-card">
          <h2>{profile.agent.name}</h2>
          <p className="event-note">
            <T>{profile.agent.status === "confirmed"
              ? "Relation confirmée · simulation"
              : profile.agent.status === "pending"
                ? "Demande de confirmation en attente"
                : "Relation déclarée, non vérifiée"}</T>
          </p>
          {profile.agent.memberId && <AgentMember id={profile.agent.memberId} />}{" "}
          {profile.agent.status === "pending" && (
            <details className="event-demo">
              <summary><T>{"Tester la réponse de l’agent"}</T></summary>
              <p><T>{"Aucun agent réel n’est contacté. Ces profils sont fictifs."}</T></p>
              <Button
                variant="outline"
                onClick={() => {
                  setProfile({
                    ...profile,
                    agent: { ...profile.agent, status: "confirmed" },
                  });
                  notify("Confirmation de l’agent simulée.");
                }}
              >
                <T>{"Simuler la confirmation réciproque"}</T></Button>
              <Button
                variant="ghost"
                onClick={() =>
                  setProfile({
                    ...profile,
                    agent: {
                      ...profile.agent,
                      memberId: "",
                      status: "declared",
                    },
                  })
                }
              >
                <T>{"Simuler un refus"}</T></Button>
            </details>
          )}
        </section>
      )}
    </ProfileLayout>
  );
}
function AgentMember({ id }: { id: string }) {
  const m = members.find((x) => x.id === id);
  const [open, setOpen] = useState(false);
  return m ? (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <T>{"Voir le profil lié :"}</T>{m.name}
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={m.name}
        description="Profil fictif lié à la déclaration de représentation. Ce lien n’est pas une certification professionnelle."
      >
        <img className="trust-avatar" src={m.image} alt="" />
        <p>
          {m.role} · {m.city}
        </p>
        <p>{m.bio}</p>
      </Modal>
    </>
  ) : null;
}

export function DocumentsPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, trust, dispatchTrust, dispatchEvent } = useDemo();
  const [kind, setKind] = useState<DocumentRecord["kind"]>("CV");
  const [sport, setSport] = useState(profile.sport);
  const [club, setClub] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function add(file?: File) {
    if (!file) return;
    setError("");
    const rejection = fileDecision(file.name, file.type, file.size, kind);
    if (rejection) {
      setError(rejection);
      return;
    }
    setBusy(true);
    try {
      if (kind !== "Photo") {
        const signature = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
        if (signature !== "%PDF-") {
          setError("Ce fichier ne présente pas l’en-tête d’un PDF.");
          return;
        }
      }
      dispatchTrust({
        type: "document",
        document: {
          id: crypto.randomUUID(),
          name: file.name,
          kind,
          sport,
          club,
          size: file.size,
          status: "pending",
          reason:
            kind === "Photo"
              ? "Analyse du lien au sport et de la sécurité nécessaire avant publication."
              : "Analyse antivirus et vérification de la référence nécessaires avant diffusion.",
        },
      });
      dispatchEvent({
        type: "safety-notice",
        text: "Fichier préparé localement, non publié. Analyse serveur requise avant acceptation.",
      });
    } catch {
      setError("Lecture impossible. Choisissez un autre fichier.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ProfileLayout back="/espace/profil" title={uiCopy("CV & références")}>
      <p className="event-note">
        <T>{"Préparez un CV ou une référence associée à un sport et à un club. Dans cette démo, seul le nom et les métadonnées restent en mémoire : aucun fichier n’est envoyé, stocké sur un serveur ou rendu public."}</T></p>
      <div className="event-form">
        <label>
          <T>{"Type de fichier"}</T><NativeSelect
            aria-label={uiCopy("Type de fichier")}
            value={kind}
            onChange={(e) => setKind(e.target.value as DocumentRecord["kind"])}
          >
            {["CV", "Référence", "Photo"].map((x) => (
              <NativeSelectOption key={x}>{x}</NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <label>
          <T>{"Sport concerné"}</T><NativeSelect
            aria-label={uiCopy("Sport du document")}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            {sports.map((s) => (
              <NativeSelectOption key={s}>{s}</NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <Field
          label="Club concerné (facultatif pour le CV)"
          name="document-club"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          maxLength={100}
        />
        <label className="trust-upload">
          <T>{"Choisir un fichier fictif"}</T><input
            type="file"
            aria-label={uiCopy("Choisir un fichier fictif")}
            accept={kind === "Photo" ? "image/jpeg,image/png,image/webp" : ".pdf,application/pdf"}
            disabled={busy}
            onChange={(e) => {
              void add(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <small><T>{kind === "Photo" ? "JPG, PNG ou WebP" : "PDF"}</T> <T>{" · 10 Mo maximum"}</T></small>
        </label>
        {busy && <p role="status"><T>{"Vérification du format…"}</T></p>}
        {error && (
          <p className="event-error" role="alert">
            {error}
          </p>
        )}
        <TrustError />
      </div>
      <div className="trust-card">
        <ShieldCheck size={22} />
        <h2><T>{"Le sport, et rien d’autre."}</T></h2>
        <p>
          <T>{"Photos de pratique, portraits professionnels, équipes et installations : le contexte sportif doit être identifiable. Une photo hors sujet ou dangereuse sera refusée ; un cas incertain devra être examiné."}</T></p>
        <p className="event-note">
          <T>{"La démo ne reconnaît pas les images. Tout nouveau fichier reste en attente et ne rejoint jamais automatiquement le profil, le fil ou la galerie."}</T></p>
      </div>
      {trust.documents.map((d) => (
        <article className="trust-card" key={d.id}>
          <span className="trust-badge"><T>{"EN ATTENTE · NON PUBLIÉ"}</T></span>
          <h3>{d.name}</h3>
          <p>
            {d.kind} · {d.sport} · {Math.ceil(d.size / 1024)} <T>{"Ko"}</T>{d.club ? ` · ${d.club}` : ""}
          </p>
          <p className="event-note">{d.reason}</p>
          <Button
            variant="ghost"
            onClick={() => dispatchTrust({ type: "remove-document", id: d.id })}
          >
            <T>{"Retirer ce fichier"}</T></Button>
        </article>
      ))}
      <Link className="text-link" href="/espace/securite">
        <T>{"Comprendre la modération"}</T></Link>
    </ProfileLayout>
  );
}

export function MemberDossier({ member: m }: { member: Member }) {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, trust, dispatchTrust, notify, requestAccess } = useDemo();
  const records = memberSports[m.id] || [];
  const [selected, setSelected] = useState("0:0");
  const [score, setScore] = useState("4");
  const [text, setText] = useState("");
  const [relation, setRelation] = useState("");
  const [attest, setAttest] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reviews = trust.reviews.filter((r) => r.memberId === m.id);
  const professional = profile.category === "Professionnel";
  function submit(e: FormEvent) {
    e.preventDefault();
    const [i, n] = selected.split(":").map(Number);
    const record = records[i],
      club = record?.clubs[n];
    if (!club || !attest) return;
    if (!requestAccess("comment", m.id)) return;
    dispatchTrust({
      type: "review",
      professional,
      review: {
        id: crypto.randomUUID(),
        memberId: m.id,
        sport: record.sport,
        club: club.name,
        author: displayName(profile),
        score: Number(score),
        text,
        relationship: relation,
        status: "pending",
      },
    });
    setSubmitted(true);
  }
  return (
    <section className="trust-dossier">
      {records.map((r) => {
        const rs = reviews.filter((x) => x.sport === r.sport && x.status === "published");
        return (
          <div className="trust-card" key={r.sport}>
            <h3>
              {r.sport} · {r.level}
            </h3>
            <p>{r.ranking}</p>
            <p>{[r.position, r.dominantSide].filter(Boolean).join(" · ")}</p>
            <small><T>{"Déclaré · "}</T>{r.federation || "référentiel à préciser"}</small>
            {r.clubs.map((c) => (
              <p key={c.id}>
                {c.name} · <T>{c.current ? "Club actuel" : "Ancien club"}</T>
                <small>{c.period}</small>
              </p>
            ))}
            <p className="trust-score">
              <Star size={16} />
              {rs.length
                ? `${(rs.reduce((a, b) => a + b.score, 0) / rs.length).toFixed(1)} / 5 · ${rs.length} avis professionnel(s) simulé(s)`
                : "Aucun avis professionnel publié"}
            </p>
          </div>
        );
      })}
      {m.id === "lea" && (
        <div className="trust-card">
          <strong><T>{"Agent : Marc Petit"}</T></strong>
          <p className="event-note"><T>{"Relation fictive déclarée, non vérifiée."}</T></p>
          <AgentMember id="marc" />
        </div>
      )}
      {reviews.map((r) => (
        <article className="trust-card" key={r.id}>
          <span className="trust-badge">
            <T>{r.status === "pending"
              ? "EN MODÉRATION"
              : r.status === "contested"
                ? "CONTESTÉ · MASQUÉ DU SCORE"
                : "AVIS SIMULÉ"}</T>
          </span>
          <h3>
            {r.sport} · {r.club}
          </h3>
          <p>
            {r.score}/5 · {r.author}
          </p>
          <p>{r.text}</p>
          <small>{r.relationship}</small>
          {r.status === "published" && (
            <Button
              variant="ghost"
              onClick={() => {
                dispatchTrust({
                  type: "review-status",
                  id: r.id,
                  status: "contested",
                });
                notify("Avis signalé : retiré du score dans la démo.");
              }}
            >
              <T>{"Signaler cet avis"}</T></Button>
          )}
          {r.status === "pending" && (
            <details className="event-demo">
              <summary><T>{"Simuler la décision de modération"}</T></summary>
              <p>
                <T>{"Validation fictive de l’identité, de la relation au club et du contenu. En production, cette action sera réservée à un modérateur."}</T></p>
              <Button
                variant="outline"
                onClick={() =>
                  dispatchTrust({
                    type: "review-status",
                    id: r.id,
                    status: "published",
                  })
                }
              >
                <T>{"Simuler la validation"}</T></Button>
            </details>
          )}
        </article>
      ))}
      {records.length > 0 &&
        (professional ? (
          <details className="trust-card">
            <summary><T>{"Donner un avis professionnel"}</T></summary>
            <p className="event-note">
              <T>{"Comme les commentaires, l’envoi d’un avis nécessite un abonnement professionnel actif. L’identité et l’expérience devront être vérifiées avant publication."}</T></p>
            <form className="event-form" onSubmit={submit}>
              <label>
                <T>{"Expérience concernée"}</T><NativeSelect
                  aria-label={uiCopy("Expérience évaluée")}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {records.flatMap((r, i) =>
                    r.clubs.map((c, n) => (
                      <NativeSelectOption key={c.id} value={`${i}:${n}`}>
                        {r.sport} · {c.name}
                      </NativeSelectOption>
                    )),
                  )}
                </NativeSelect>
              </label>
              <Field
                label="Votre relation au joueur / club"
                name="review-relation"
                required
                maxLength={150}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder={uiCopy("Ex. entraîneur durant la saison 2023")}
              />
              <label>
                <T>{"Note sur cette expérience"}</T><NativeSelect
                  aria-label={uiCopy("Note professionnelle")}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <NativeSelectOption key={n} value={n}>
                      {n} / 5
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </label>
              <label>
                <T>{"Commentaire factuel"}</T><Textarea
                  aria-label={uiCopy("Commentaire professionnel")}
                  required
                  maxLength={600}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <label className="event-check">
                <input
                  type="checkbox"
                  required
                  checked={attest}
                  onChange={(e) => setAttest(e.target.checked)}
                />
                <T>{"J’atteste avoir directement encadré ou côtoyé ce joueur dans cette expérience."}</T></label>
              <Button type="submit"><T>{"Soumettre à la modération"}</T></Button>
              {submitted && !trust.error && (
                <p role="status" className="event-success">
                  <T>{"Avis soumis. Il n’entre pas dans le score avant validation."}</T></p>
              )}
              <TrustError />
            </form>
          </details>
        ) : (
          <p className="event-note">
            <T>{"Seuls les comptes professionnels peuvent soumettre une évaluation d’expérience. Les notes sont séparées par sport."}</T></p>
        ))}
    </section>
  );
}

export function SafetyActions({ memberId }: { memberId: string }) {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { trust, dispatchTrust, dispatchEvent, dispatchSocial } = useDemo();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("Harcèlement");
  const blocked = trust.blocked.includes(memberId);
  return (
    <>
      <div className="trust-safety-actions">
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <T>{"Signaler un abus"}</T></Button>
        <Button
          variant="ghost"
          onClick={() => {
            dispatchTrust({ type: "block", id: memberId });
            dispatchSocial({ type: "close-chat" });
            dispatchEvent({
              type: "safety-notice",
              text: blocked
                ? "Membre débloqué dans la démo."
                : "Membre bloqué : les nouveaux échanges avec ce profil sont bloqués dans la démo.",
            });
          }}
        >
          <T>{blocked ? "Débloquer" : "Bloquer ce membre"}</T>
        </Button>
      </div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={uiCopy("Signaler un comportement")}
        description="Le signalement est confidentiel vis-à-vis du membre signalé. Dans la démo, il reste local et n’est pas envoyé à une équipe réelle."
      >
        <label>
          <T>{"Motif"}</T><NativeSelect
            aria-label={uiCopy("Motif du signalement")}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {[
              "Harcèlement",
              "Racisme / discrimination",
              "Sexisme",
              "Menaces",
              "Spam / arnaque",
              "Photo sans lien avec le sport",
              "Autre comportement abusif",
            ].map((r) => (
              <NativeSelectOption key={r}>{r}</NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <Button
          className="action primary"
          onClick={() => {
            dispatchTrust({
              type: "report",
              id: crypto.randomUUID(),
              memberId,
              reason,
            });
            dispatchEvent({
              type: "safety-notice",
              text: "Signalement enregistré dans la démo. Consultez son suivi dans Sécurité.",
            });
            setOpen(false);
          }}
        >
          <T>{"Enregistrer le signalement"}</T></Button>
      </Modal>
    </>
  );
}

export function SafetyPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { trust, dispatchTrust, dispatchEvent } = useDemo();
  const [sample, setSample] = useState("");
  const [result, setResult] = useState("");
  return (
    <ProfileLayout back="/espace/profil" title={uiCopy("Sécurité & modération")}>
      <div className="trust-card">
        <ShieldCheck size={26} />
        <h2><T>{"Un terrain respectueux."}</T></h2>
        <p>
          <T>{"Racisme, sexisme, menaces et harcèlement n’ont pas leur place ici. Signalez un membre depuis une conversation ou son profil, et bloquez-le sans attendre une décision."}</T></p>
        <p className="event-note">
          <T>{"Le filtre local reconnaît quelques expressions de test. Il n’est ni exhaustif, ni une IA de modération. Une absence d’alerte ne prouve pas qu’un contenu est acceptable."}</T></p>
      </div>
      <details className="trust-card">
        <summary><T>{"Tester le filtre de démonstration"}</T></summary>
        <p className="event-note">
          <T>{"Utilisez [TEST RACISME], [TEST SEXISME], [TEST MENACE] ou [TEST HARCELEMENT], sans écrire de véritable injure."}</T></p>
        <Textarea
          aria-label={uiCopy("Texte à tester")}
          value={sample}
          onChange={(e) => setSample(e.target.value)}
        />
        <Button
          onClick={() => {
            const reason = moderateText(sample);
            setResult(
              reason
                ? `Bloqué : ${reason}`
                : "Aucun déclencheur de démonstration détecté. Ce résultat ne certifie pas le contenu.",
            );
            if (reason)
              dispatchEvent({
                type: "safety-notice",
                text: `Test de modération : ${reason.toLowerCase()} détecté. Aucun contenu transmis.`,
              });
          }}
        >
          <T>{"Tester"}</T></Button>
        <p role="status">{result}</p>
      </details>
      <div className="trust-card">
        <h2><T>{"Demander une révision"}</T></h2>
        <p>
          <T>{"Un blocage automatique peut se tromper. Une équipe humaine devra examiner les contestations."}</T></p>
        <Button
          variant="outline"
          onClick={() => {
            dispatchTrust({
              type: "report",
              id: crypto.randomUUID(),
              memberId: "moderation",
              reason: "Demande de révision d’un filtrage automatique",
            });
            dispatchEvent({
              type: "safety-notice",
              text: "Demande de révision enregistrée dans la démo.",
            });
          }}
        >
          <T>{"Contester un filtrage · démo"}</T></Button>
      </div>
      <section className="trust-card">
        <h2><T>{"Mes signalements"}</T></h2>
        {trust.reports.length ? (
          trust.reports.map((r) => (
            <p key={r.id}>
              <strong>{r.reason}</strong>
              <small>
                {members.find((m) => m.id === r.memberId)?.name || "Modération"} <T>{"· reçu dans la simulation, non traité"}</T></small>
            </p>
          ))
        ) : (
          <p><T>{"Aucun signalement."}</T></p>
        )}
      </section>
      <section className="trust-card">
        <h2><T>{"Membres bloqués"}</T></h2>
        {trust.blocked.length ? (
          trust.blocked.map((id) => (
            <div key={id}>
              <p>{members.find((m) => m.id === id)?.name}</p>
              <Button variant="outline" onClick={() => dispatchTrust({ type: "block", id })}>
                <T>{"Débloquer"}</T></Button>
            </div>
          ))
        ) : (
          <p><T>{"Aucun membre bloqué."}</T></p>
        )}
      </section>
      <section className="trust-card">
        <h2><T>{"Validation du compte"}</T></h2>
        <p>
          <T>{"E-mail et code d’authentification :"}</T>{" "}
          <T>{trust.securityStep
            ? "parcours simulé terminé"
            : "à configurer via l’inscription de démonstration"}</T>
          .
        </p>
        <p className="event-note">
          <T>{"Aucune protection d’accès réelle n’est active. Ne saisissez jamais vos codes personnels."}</T></p>
      </section>
      <Link className="action secondary" href="/espace/confidentialite">
        <T>{"Confidentialité et charte"}</T>
      </Link>
    </ProfileLayout>
  );
}

export function ReferralPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, trust, dispatchTrust, dispatchSocial, notify } = useDemo();
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  return (
    <ProfileLayout back="/espace/profil" title={uiCopy("Invitez votre réseau")}>
      <section className="trust-reward">
        <span className="mini-kicker"><T>{"LE SPORT SE PARTAGE"}</T></span>
        <strong><T>{"3 mois"}</T></strong>
        <h2><T>{"Premium pour une rencontre de plus."}</T></h2>
        <p>
          <T>{"Proposition de parrainage : un nouveau membre distinct, e-mail vérifié, profil complété et première connexion = trois mois offerts."}</T></p>
        <small>
          <T>{"Simulation uniquement. Règles antifraude et conditions commerciales à valider avant lancement."}</T></small>
      </section>
      <div className="trust-card">
        <h2><T>{"Votre invitation"}</T></h2>
        <code>ARENA-ALEX-DEMO</code>
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                `${window.location.origin}/inscription?parrain=ARENA-ALEX-DEMO`,
              );
              setCopied(true);
            } catch {
              notify("Copie indisponible. Code de démonstration : ARENA-ALEX-DEMO");
            }
          }}
        >
          <T>{copied ? "Lien copié" : "Copier le lien de démonstration"}</T>
        </Button>
        <p className="event-note">
          <T>{"Ce lien illustre l’attribution du parrain ; il ne suit aucune inscription réelle et n’envoie aucune invitation."}</T></p>
      </div>
      <form
        className="event-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatchTrust({
            type: "referral",
            ownEmail: profile.email,
            referral: {
              id: crypto.randomUUID(),
              email,
              stage: 0,
              credited: false,
            },
          });
        }}
      >
        <Field
          label="Adresse fictive du filleul"
          name="referral-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={uiCopy("joueur@demo.example")}
        />
        <Button type="submit"><T>{"Ajouter une invitation simulée"}</T></Button>
        <TrustError />
      </form>
      {trust.referrals.map((r) => (
        <section className="trust-card" key={r.id}>
          <h3>{r.email}</h3>
          <ol className="referral-steps">
            {["Invitation", "E-mail vérifié", "Profil complété", "Première connexion"].map(
              (s, i) => (
                <li key={s} data-complete={r.stage >= i}>
                  {s}
                </li>
              ),
            )}
          </ol>
          {r.credited ? (
            <p className="event-success"><T>{"3 mois crédités · simulation"}</T></p>
          ) : (
            <Button
              variant="outline"
              onClick={() => dispatchTrust({ type: "referral-step", id: r.id })}
            >
              <T>{"Simuler :"}</T>{["vérification e-mail", "profil complété", "première connexion"][r.stage]}
            </Button>
          )}
        </section>
      ))}
      <section className="trust-card">
        <h2>{trust.rewardMonths} <T>{" mois gagnés · démo"}</T></h2>
        <p>
          <T>{"Un filleul n’est crédité qu’une seule fois. Les doublons et l’auto-parrainage sont refusés dans cette simulation."}</T></p>
        <Button
          disabled={trust.rewardMonths < 3 || trust.rewardActivated}
          onClick={() => {
            if (trust.rewardMonths < 3 || trust.rewardActivated) return;
            dispatchTrust({ type: "activate-reward" });
            dispatchSocial({
              type: "subscription",
              category: profile.category,
            });
            notify(
              "Récompense activée dans cette visite uniquement. Aucun paiement ni prolongation réelle.",
            );
          }}
        >
          <T>{trust.rewardActivated
            ? "Premium de récompense activé · démo"
            : "Activer la récompense · démo"}</T>
        </Button>
      </section>
    </ProfileLayout>
  );
}

export function PoliciesPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  return (
    <ProfileLayout back="/espace/inscription" title={uiCopy("Confiance & confidentialité")}>
      <p className="trust-badge"><T>{"NOTICE DE DÉMONSTRATION · VERSION 2026-09"}</T></p>
      <section className="trust-card">
        <h2><T>{"Vos données dans cette démo"}</T></h2>
        <p>
          <T>{"Les formulaires, signalements, documents et évaluations utilisent uniquement la mémoire de cet onglet. Aucun document sélectionné n’est envoyé à un serveur. Tout est effacé au rechargement. Utilisez des informations et fichiers fictifs."}</T></p>
        <p>
          <T>{"Les contenus publiés dans une future version seront visibles selon vos réglages de partage. Les signalements devront être limités aux équipes autorisées, sans communication automatique de l’identité du signalant au membre signalé."}</T></p>
      </section>
      <section className="trust-card">
        <h2><T>{"Des informations sincères"}</T></h2>
        <p>
          <T>{"Déclarez vos sports, niveaux, clubs, expériences et liens avec un agent avec exactitude. Ne revendiquez pas une affiliation sans autorisation. Un classement déclaré ou un document transmis n’est pas automatiquement vérifié."}</T></p>
        <p>
          <T>{"Les professionnels doivent avoir directement connu l’expérience évaluée et rédiger un avis factuel, respectueux, sans données sensibles. Les intéressés doivent pouvoir signaler un avis et demander une révision."}</T></p>
      </section>
      <section className="trust-card">
        <h2><T>{"Une communauté sportive"}</T></h2>
        <p>
          <T>{"Les propos racistes, sexistes, discriminatoires, menaçants et le harcèlement sont interdits. Les photos doivent être liées au sport et ne pas porter atteinte aux personnes. Une modération humaine doit pouvoir réexaminer les décisions automatiques."}</T></p>
      </section>
      <section className="trust-card">
        <h2><T>{"Avant le lancement réel"}</T></h2>
        <p>
          <T>{"Cette notice n’est pas la politique juridique définitive. Le responsable du traitement, ses coordonnées, les finalités et bases légales, prestataires, transferts éventuels, durées de conservation, droits et modalités de recours devront être renseignés et validés avant toute collecte réelle. Aucun consentement marketing n’est demandé ni précoché ici."}</T></p>
        <a
          href="https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          <T>{"Référence : information des personnes · CNIL"}</T></a>
      </section>
    </ProfileLayout>
  );
}

export function SecondFactorPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { draft, emailVerified, dispatchTrust } = useDemo();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  if (!draft || !emailVerified) return <Guard verification />;
  return (
    <AuthLayout
      back="/espace/verification"
      step={2}
      title={uiCopy("Une seconde protection.")}
      intro="Après l’e-mail, un code d’application d’authentification. Parcours entièrement simulé."
    >
      <div className="demo-code-note">
        <strong>
          <T>{"CODE DE DÉMONSTRATION : 135790"}</T>
        </strong>
        <p>
          <T>
            {
              "Aucun authentificateur, QR code ou secret réel n’est configuré. Ne saisissez jamais votre propre code."
            }
          </T>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code !== "135790") {
            setError("Utilisez le code fictif 135790.");
            return;
          }
          dispatchTrust({ type: "security", enabled: true });
          router.push("/espace/personnalisation");
        }}
      >
        <Field
          label="Code d’authentification démo"
          name="authenticator-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          error={error}
        />
        <Button type="submit" className="action primary">
          <T>{"Valider la seconde étape"}</T>
        </Button>
      </form>
    </AuthLayout>
  );
}
