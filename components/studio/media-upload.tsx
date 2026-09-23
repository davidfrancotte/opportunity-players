"use client";
import { useLocale } from "./locale";
import { T } from "./locale";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDemo } from "./demo-provider";
import { fileDecision, moderateText } from "@/lib/studio/trust";
import { videoFileIssue } from "@/lib/studio/sport-profile";
import { isPremium } from "@/lib/studio/social";
import { limits } from "@/lib/studio/entitlements";

type PendingMedia = { url: string; name: string; video: boolean; size: number; seconds: number };
export function MediaUpload({ onAdded }: { onAdded: () => void }) {
  const { t: uiCopy, dateLocale: uiDateLocale } = useLocale();
  const { profile, setProfile, social, trust, notify } = useDemo();
  const cap = limits(profile.category, isPremium(social, profile.category));
  const [pending, setPending] = useState<PendingMedia | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);
  const generation = useRef(0);
  const ownedURL = useRef("");
  useEffect(
    () => () => {
      generation.current++;
      if (ownedURL.current) URL.revokeObjectURL(ownedURL.current);
    },
    [],
  );
  function quota(video: boolean) {
    return video
      ? profile.videos.length >= cap.videos
        ? `Votre offre permet ${cap.videos} vidéo(s).`
        : ""
      : profile.media.length + trust.documents.filter((d) => d.kind === "Photo").length >=
          cap.photos
        ? `Votre offre permet ${cap.photos} photos, documents photo compris.`
        : "";
  }
  async function choose(file: File | undefined) {
    const token = ++generation.current;
    if (ownedURL.current) URL.revokeObjectURL(ownedURL.current);
    ownedURL.current = "";
    setPending(null);
    setError("");
    setBusy(false);
    setConsent(false);
    if (!file) return;
    const video = file.type.startsWith("video/");
    const issue =
      (video ? videoFileIssue(file) : fileDecision(file.name, file.type, file.size, "Photo")) ||
      quota(video);
    if (issue) {
      setError(issue);
      return;
    }
    setBusy(true);
    const url = URL.createObjectURL(file);
    ownedURL.current = url;
    const seconds = await new Promise<number>((resolve) => {
      const element = video ? document.createElement("video") : new Image();
      const timer = setTimeout(() => finish(-1), 10000);
      function finish(duration: number) {
        clearTimeout(timer);
        element.onerror = null;
        if (element instanceof HTMLVideoElement) {
          element.onloadedmetadata = null;
          element.removeAttribute("src");
          element.load();
        } else {
          element.onload = null;
          element.removeAttribute("src");
        }
        resolve(duration);
      }
      element.onerror = () => finish(-1);
      if (element instanceof HTMLVideoElement) {
        element.preload = "metadata";
        element.onloadedmetadata = () =>
          finish(Number.isFinite(element.duration) && element.duration > 0 ? element.duration : -1);
      } else
        element.onload = () =>
          finish(element.naturalWidth > 0 && element.naturalHeight > 0 ? 0 : -1);
      element.src = url;
    });
    if (token !== generation.current) {
      URL.revokeObjectURL(url);
      return;
    }
    setBusy(false);
    if (seconds < 0 || (video && seconds > cap.videoSeconds)) {
      URL.revokeObjectURL(url);
      ownedURL.current = "";
      setError(
        video
          ? `Vidéo illisible ou de plus de ${cap.videoSeconds / 60} minutes.`
          : "Image illisible. Choisissez un fichier JPG, PNG ou WebP valide.",
      );
      return;
    }
    setPending({ url, name: file.name, video, size: file.size, seconds });
  }
  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pending || !consent || busy) return;
    const issue = quota(pending.video);
    if (issue) {
      setError(issue);
      return;
    }
    if (pending.video && pending.seconds > cap.videoSeconds) {
      setError("Cette vidéo dépasse la durée autorisée par votre offre.");
      return;
    }
    if (moderateText(pending.name)) {
      setError("Veuillez renommer le fichier avec un titre approprié.");
      return;
    }
    setProfile(
      pending.video
        ? {
            ...profile,
            videos: [
              ...profile.videos,
              {
                id: crypto.randomUUID(),
                sport: profile.sport,
                title: pending.name,
                url: pending.url,
                size: pending.size,
              },
            ],
          }
        : { ...profile, media: [...profile.media, pending.url] },
    );
    ownedURL.current = ""; // The provider owns committed object URLs until removal or reset.
    setPending(null);
    notify("Média ajouté à votre galerie. Aperçu local uniquement.");
    onAdded();
  }
  return (
    <form className="profile-media-upload" onSubmit={add}>
      <label className="media-file-picker">
        <Upload size={18} />
        <span><T>{"Choisir un fichier sur mon appareil"}</T></span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
          aria-label={uiCopy("Choisir un média")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            void choose(file);
          }}
        />
      </label>
      <p className="section-note">
        <T>{"Photos JPG, PNG ou WebP : 10 Mo maximum. Vidéos MP4 ou WebM : 50 Mo,"}</T>{cap.videoSeconds / 60}{" "}
        <T>{"minutes maximum, selon votre offre. Aucun envoi vers un serveur ; les fichiers disparaissent au rechargement."}</T></p>
      {busy && <p role="status"><T>{"Vérification du fichier…"}</T></p>}
      {pending && (
        <div className="media-upload-preview">
          {pending.video ? (
            <video controls playsInline src={pending.url} aria-label={uiCopy("Aperçu de la vidéo")} />
          ) : (
            <img src={pending.url} alt={uiCopy("Aperçu du média sélectionné")} />
          )}
          <p>{pending.name}</p>
        </div>
      )}
      <label className="media-upload-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <T>{"Je confirme disposer des droits et autorisations pour partager ce média sportif."}</T></label>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      <Button type="submit" className="action primary" disabled={!pending || busy || !consent}>
        <T>{"Ajouter à ma galerie"}</T></Button>
    </form>
  );
}
