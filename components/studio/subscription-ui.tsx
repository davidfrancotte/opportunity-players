"use client";
import { useLocale } from "./locale";
import { T } from "./locale";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Check, LockKeyhole, Sparkles, X } from "lucide-react";
import { Button } from "@/components/studio/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/studio/ui/dialog";
import { useDemo } from "./demo-provider";
import { isPremium, remainingMessages, type AccessReason } from "@/lib/studio/social";
import type { Category } from "@/lib/studio/model";
import {limits} from "@/lib/studio/entitlements";
import { monthlyPrice, annualPrice } from "@/lib/studio/pricing";

export const categoryLabel = (category: Category) =>
  category === "Sportif" ? "Joueur" : category === "Organisation" ? "Collectif" : "Professionnel";
export function FreePlanNote({ category }: { category: Category }) {
  const { social } = useDemo();
  if (isPremium(social, category)) return null;
  return (
    <aside className="free-plan-note">
      <span>
        <Check size={15} />
        <T>{"Votre compte est gratuit"}</T>
      </span>
      <p>
        <T>{category === "Sportif"
          ? "Explorez le réseau, initiez 3 conversations par mois et répondez gratuitement. La création de publications nécessite Premium."
          : "Présentez votre activité, recevez et répondez gratuitement aux messages. Les nouvelles prises de contact et les outils métier dépendent de votre offre."}</T>
      </p>
      <small>
        <T>{"Premium optionnel :"}</T>
        {monthlyPrice(category)}
        <T>{"/mois ou"}</T>{annualPrice(category)}<T>{"/an. Aucun paiement à l’inscription."}</T></small>
    </aside>
  );
}
export function PlanStatus({ compact = false }: { compact?: boolean }) {
  const { profile, social, access } = useDemo();
  const premium = isPremium(social, profile.category);
  const left = remainingMessages(social, access.month,profile.category);
  if (premium) return null;
  return (
    <Link href="/espace/abonnement" className={compact ? "plan-status compact" : "plan-status"}>
      <span className="plan-icon">
        {premium ? <Sparkles size={19} /> : <LockKeyhole size={18} />}
      </span>
      <span>
        <strong>
          <T>{categoryLabel(profile.category)}</T> · <T>{premium ? "Premium simulé" : "Gratuit"}</T>
        </strong>
        <small>
          {premium
            ? <T>{"Vos outils Premium sont actifs dans la démo."}</T>
            : profile.category === "Sportif"
              ? <>{left} <T>{"nouvelles prises de contact disponibles ce mois-ci"}</T></>
              : <T>{"Réception et réponses gratuites."}</T>}
        </small>
        {!premium && (
          <em className="plan-monthly">
            <T>{"Premium ·"}</T>{monthlyPrice(profile.category)}
            <T>{"/mois"}</T>
            <T>{" · ou "}</T>{annualPrice(profile.category)}<T>{"/an"}</T></em>
        )}
      </span>
      <ArrowUpRight size={18} />
    </Link>
  );
}
export const gateCopy: Record<AccessReason, { title: string; text: string; benefits: string[] }> = {
  publish: {
    title: "Votre parcours mérite d’être partagé.",
    text: "La création de publications est incluse dans Premium pour les sportifs et collectifs. Commentaires, réactions et partages restent gratuits.",
    benefits: [
      "Partagez vos moments sportifs",
      "Ajoutez une illustration à vos posts",
      "Initiez davantage de nouvelles conversations",
    ],
  },
  "player-contact": {
    title: "Passez de la découverte à l’échange.",
    text: "Votre compte gratuit vous permet de découvrir les joueurs. Activez Premium pour leur envoyer des messages et commenter leurs publications.",
    benefits: [
      "Contactez les joueurs",
      "Recevez leurs réponses",
      "Recevez des commentaires sur vos publications",
    ],
  },
  receive: {
    title: "Ouvrez la porte aux échanges.",
    text: "Pour les professionnels et collectifs, la réception de messages et de commentaires sur leurs posts nécessite Premium.",
    benefits: [
      "Consultez les messages reçus",
      "Échangez avec les joueurs",
      "Recevez les commentaires de la communauté",
    ],
  },
  quota: {
    title: "Gardez la conversation ouverte.",
    text: "Votre quota de nouvelles prises de contact est atteint. Les réponses et les échanges déjà engagés restent accessibles. Le quota est renouvelé au prochain mois civil.",
    benefits: [
      "Augmentez votre quota de nouvelles prises de contact",
      "Publiez dans le fil sportif",
      "Conservez votre profil et votre réseau",
    ],
  },
  recipient: {
    title: "Ce membre ne peut pas encore recevoir.",
    text: "Ce professionnel ou collectif fictif n’a pas d’abonnement actif. Il doit activer Premium pour recevoir votre message ou commentaire. Aucun message n’est envoyé et votre quota n’est pas débité.",
    benefits: [],
  },
};
export function LockedFeature({ reason = "receive" }: { reason?: AccessReason }) {
  const { dispatchSocial, social, profile } = useDemo();
  const paid = isPremium(social, profile.category);
  if (paid && reason !== "quota" && reason !== "recipient") return null;
  return (
    <aside className="locked-feature">
      <LockKeyhole size={21} />
      <h3><T>{gateCopy[reason].title}</T></h3>
      <p><T>{gateCopy[reason].text}</T></p>
      <Button variant="secondary" onClick={() => dispatchSocial({ type: "gate", reason })}>
        <T>{reason === "recipient" || paid ? "Comprendre cette limite" : "Découvrir Premium"}</T>
        <ArrowUpRight size={15} />
      </Button>
    </aside>
  );
}
export function UpgradeGate() {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, social, dispatchSocial } = useDemo();
  const router = useRouter();
  const pathname = usePathname();
  const reason = social.gate;
  const paid = isPremium(social, profile.category);
  const promotion = !paid && reason !== "recipient";
  const copy = reason ? gateCopy[reason] : gateCopy.receive;
  function close() {
    dispatchSocial({ type: "gate", reason: null });
  }
  return (
    <Dialog
      open={!!reason && (!paid || reason === "quota" || reason === "recipient")}
      onOpenChange={(v) => {
        if (!v) close();
      }}
    >
      <DialogContent className="studio-modal upgrade-modal" showCloseButton={false}>
        <Button className="modal-close" variant="ghost" aria-label={uiCopy("Fermer")} onClick={close}>
          <X size={20} />
        </Button>
        <span className="premium-eyebrow">
          <Sparkles size={15} />
          <T>{reason === "recipient" ? "DISPONIBILITÉ DU MEMBRE" : paid ? "VOTRE QUOTA" : "ARENA / PREMIUM"}</T>
        </span>
        <DialogTitle className="modal-title"><T>{copy.title}</T></DialogTitle>
        <DialogDescription className="modal-description"><T>{copy.text}</T></DialogDescription>
        {promotion && (
          <p className="upgrade-price">
            {monthlyPrice(profile.category)}
            <span><T>{"/mois · offre "}</T>{categoryLabel(profile.category)}</span>
            <span><T>{"ou "}</T>{annualPrice(profile.category)}<T>{"/an, payés en une fois"}</T></span>
          </p>
        )}
        {promotion && !!copy.benefits.length && (
          <ul className="premium-benefits">
            {copy.benefits.map((s) => (
              <li key={s}>
                <Check size={16} />
                <T>{s}</T>
              </li>
            ))}
          </ul>
        )}
        {promotion && (
          <Button
            className="action primary"
            onClick={() => {
              close();
              router.push("/espace/abonnement?retour=" + encodeURIComponent(pathname));
            }}
          >
            <T>{"Voir mon offre"}</T>
            <ArrowUpRight size={18} />
          </Button>
        )}
        <Button variant="ghost" className="keep-free" onClick={close}>
          <T>{reason === "recipient" || paid ? "Compris" : "Continuer gratuitement"}</T>
        </Button>
        <p className="demo-context">
          <T>{"Démo uniquement. Aucun prélèvement, aucun achat réel."}</T>
        </p>
      </DialogContent>
    </Dialog>
  );
}
