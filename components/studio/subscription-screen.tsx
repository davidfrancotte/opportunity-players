"use client";
import { useLocale } from "./locale";
import { T } from "./locale";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { ProfileLayout, Modal } from "./profile-screens";
import { useDemo } from "./demo-provider";
import { categories, type Category } from "@/lib/studio/model";
import { monthlyPrice, annualPrice, annualSaving } from "@/lib/studio/pricing";
import { isPremium, remainingMessages } from "@/lib/studio/social";
import { limits } from "@/lib/studio/entitlements";
import catalog from "@/lib/studio/offer-catalog.json";
import { categoryLabel } from "./subscription-ui";
export function SubscriptionPage() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, setProfile, social, dispatchSocial, access, notify, setCareerActor } = useDemo();
  const [confirm, setConfirm] = useState(false),
    [all, setAll] = useState(false);
  const [annual, setAnnual] = useState(false);
  const paid = isPremium(social, profile.category),
    free = limits(profile.category, false),
    premium = limits(profile.category, true);
  const rows = catalog[profile.category];
  return (
    <ProfileLayout back="/espace/profil">
      <div className="extension-page">
        <header className="subscription-hero">
          <span className="mini-kicker"><T>{paid ? "ARENA / MON ABONNEMENT" : "ARENA / GRATUIT & PREMIUM"}</T></span>
          <h1>
            {paid ? <><T>{"Votre Premium est actif"}</T><span>.</span></> : <><T>{"Un réseau ouvert."}</T><br /><T>{"Des outils pour aller plus loin"}</T><span>.</span></>}
          </h1>
          <p>
            <T>{paid ? "Vos outils Premium sont disponibles. Retrouvez ici vos accès et vos limites d’utilisation." : "Votre profil, les réponses, commentaires, réactions et partages restent gratuits. Choisissez les outils adaptés à vos projets."}</T>
          </p>
        </header>
        <div className="subscription-current">
          <strong>
            <T>{categoryLabel(profile.category)}</T> · <T>{paid ? "Premium simulé" : "Gratuit"}</T>
          </strong>
          <span>
            {remainingMessages(social, access.month, profile.category)} <T>{"nouvelles prises de contact encore disponibles ce mois-ci"}</T></span>
        </div>
        {!paid && <article className="premium-offer">
          <span>PREMIUM <T>{categoryLabel(profile.category)}</T></span>
          <div className="billing-period" role="group" aria-label={uiCopy("Périodicité de la formule")}>
            <Button aria-pressed={!annual} onClick={() => setAnnual(false)}><T>{"Mensuel"}</T></Button>
            <Button aria-pressed={annual} onClick={() => setAnnual(true)}><T>{"Annuel · tarif réduit"}</T></Button>
          </div>
          <div className="subscription-price">
            <strong>{annual ? annualPrice(profile.category) : monthlyPrice(profile.category)}</strong>
            <span><T>{annual ? "/an" : "/mois"}</T></span>
          </div>
          <p className="annual-price-note">
            {annual
              ? uiCopy("Paiement annuel en une fois. Économisez {saving} par rapport à 12 mensualités de {monthly}.").replace('{saving}',annualSaving(profile.category)).replace('{monthly}',monthlyPrice(profile.category))
              : uiCopy("Ou {annual} par an, payés en une fois : {saving} d’économie par rapport à 12 mensualités.").replace('{annual}',annualPrice(profile.category)).replace('{saving}',annualSaving(profile.category))}
          </p>
          <p className="price-caveat"><T>{"Les mêmes fonctionnalités et quotas sont inclus, quelle que soit la périodicité."}</T></p>
          <ul className="premium-benefits">
            <li>{premium.contacts} <T>{" nouvelles demandes de conversation par mois"}</T></li>
            <li>{premium.searches} <T>{" recherches favorites avec alertes de nouveautés"}</T></li>
            <li><T>{"Programmation des publications et statistiques détaillées"}</T></li>
            <li>{premium.events} <T>{" événements actifs, récurrence et agenda avancé"}</T></li>
            <li>
              <T>{profile.category === "Sportif"
                ? "30 candidatures par mois et jusqu’à 15 demandes de rendez-vous"
                : "Viviers, notes privées, sessions d’essais et outils de coordination"}</T>
            </li>
          </ul>
          <Button className="action primary" disabled={paid} onClick={() => setConfirm(true)}>
            <T>{paid ? "Premium actif dans la démo" : "Essayer Premium dans la démo"}</T>
          </Button>
          <p className="demo-context">
            <T>{"Simulation gratuite. Aucun prélèvement, aucune carte, aucun abonnement réel. TVA et conditions commerciales à préciser avant lancement."}</T></p>
        </article>}
        <section className="extension-card">
          <h2><T>{"Vos accès, en détail"}</T></h2>
          <p>
            <T>{"Référence : fichier d’offres mis à jour par le propriétaire. Réponses et interactions gratuites, y compris sans abonnement."}</T></p>
          <div className="extension-table-wrap">
            <table>
              <thead>
                <tr>
                  <th><T>{"Fonctionnalité"}</T></th>
                  <th><T>{"Gratuit"}</T></th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                {(all ? rows : rows.filter((r) => r.free !== "V")).map((r) => (
                  <tr key={r.feature}>
                    <td>
                      <strong><T>{r.feature}</T></strong>
                      <details>
                        <summary><T>{"Comprendre"}</T></summary>
                        <p><T>{r.detail}</T></p>
                      </details>
                    </td>
                    <td>{typeof r.free === 'string' ? <T>{r.free}</T> : r.free}</td>
                    <td>{typeof r.paid === 'string' ? <T>{r.paid}</T> : r.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="outline" onClick={() => setAll(!all)}>
            <T>{all ? "Voir uniquement les différences" : "Voir toutes les fonctionnalités"}</T>
          </Button>
        </section>
        <section className="extension-card">
          <h2><T>{"Comment les limites fonctionnent"}</T></h2>
          <p>
            <T>{"Les connexions acceptées peuvent échanger sans consommer de quota. Hors connexions, un quota de contact est consommé au premier message vers un nouvel interlocuteur, pas à chaque réponse. Le quota gratuit est de"}</T>{free.contacts} <T>{"nouveaux contacts par mois, contre"}</T>{premium.contacts} <T>{"en Premium. Les réceptions et conversations déjà engagées restent gratuites."}</T></p>
          <p>
            <T>{"Les quotas mensuels suivent le mois civil, heure de Bruxelles. Les photos, vidéos et documents sont des capacités totales conservées. Une formule gratuite permet de créer un événement par mois ; Premium limite le nombre d’événements actifs."}</T></p>
          <p>
            <T>{"Revenir à Gratuit ne supprime pas vos contenus : la création au-delà des limites est bloquée. Les programmations sont suspendues tant que Premium est inactif."}</T></p>
        </section>
        <details className="subscription-demo-controls">
          <summary><T>{"Tester un autre cas dans la démo"}</T></summary>
          <label htmlFor="demo-category"><T>{"Type de compte fictif"}</T></label>
          <NativeSelect
            id="demo-category"
            disabled={profile.registrationMode === "child"}
            value={profile.category}
            onChange={(e) => {
              setCareerActor("self");
              setProfile({ ...profile, category: e.target.value as Category });
            }}
          >
            {categories.map((c) => (
              <NativeSelectOption key={c} value={c}>
                {categoryLabel(c)}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {paid && (
            <Button
              variant="outline"
              onClick={() => {
                dispatchSocial({ type: "subscription", category: null });
                notify("Retour au compte gratuit simulé.");
              }}
            >
              <T>{"Revenir à Gratuit dans la démo"}</T></Button>
          )}
        </details>
        <nav className="extension-nav">
          <Link href="/espace/outils"><T>{"Essayer les extensions"}</T></Link>
          <Link href="/espace/accueil"><T>{"Continuer dans l’app"}</T></Link>
        </nav>
        <Modal
          open={confirm && !paid}
          onOpenChange={setConfirm}
          title={uiCopy("Activez la simulation")}
          description="Vous débloquez les outils Premium de ce profil fictif. Aucun paiement réel."
        >
          <p>
            <T>{categoryLabel(profile.category)}</T> · {annual ? annualPrice(profile.category) : monthlyPrice(profile.category)} <T>{annual ? "/an" : "/mois"}</T> <T>{"affichés · montant prélevé : 0 €."}</T></p>
          <Button
            className="action primary"
            onClick={() => {
              dispatchSocial({ type: "subscription", category: profile.category });
              setCareerActor("self");
              setConfirm(false);
              notify("Premium activé dans la démo.");
            }}
          >
            <T>{"Activer Premium dans la démo"}</T></Button>
        </Modal>
      </div>
    </ProfileLayout>
  );
}
