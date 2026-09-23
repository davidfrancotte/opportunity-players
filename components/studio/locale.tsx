"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Languages } from "lucide-react";
import { languages, languageKey, normalizeLocale, translate, intlLocale, type Locale } from "@/lib/studio/i18n";
const Context = createContext({
  locale: "fr" as Locale,
  setLocale: (_: Locale) => {},
  t: (s: string, _englishFallback?: string) => s,
  dateLocale: "fr-BE",
  saved: true,
});
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    try {
      setLocale(normalizeLocale(localStorage.getItem(languageKey)));
    } catch { setSaved(false); }
  }, []);
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = previous; };
  }, [locale]);
  function change(next: Locale) {
    const validated=normalizeLocale(next);
    setLocale(validated);
    try {
      localStorage.setItem(languageKey, validated);
      setSaved(true);
    } catch { setSaved(false); }
  }
  return (
    <Context.Provider
      value={{ locale, setLocale: change, t: (s,en) => translate(locale,s,en), dateLocale:intlLocale(locale), saved }}
    >
      {children}
    </Context.Provider>
  );
}
export const useLocale = () => useContext(Context);
export function T({ children }: { children: string }) {
  return <>{useLocale().t(children)}</>;
}
export function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <label className="locale-switch">
      <span>{t("Langue de l’application")}</span>
      <select
        aria-label={t("Langue de l’application")}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
      >
        {languages.map(language=><option key={language.code} value={language.code} lang={language.code}>{language.name}</option>)}
      </select>
    </label>
  );
}
export function LanguagePreferences() {
  const { t, saved }=useLocale();
  return <section className="info-card language-preferences" aria-labelledby="language-heading">
    <div className="card-heading"><h2 id="language-heading"><Languages size={19} aria-hidden="true" />{t("Langue")}</h2></div>
    <p>{t("Choisissez la langue de votre application.")}</p>
    <LanguageSwitch />
    <p role="status">{t(saved ? "Votre préférence est enregistrée sur cet appareil." : "Le stockage est indisponible. Ce choix reste actif pendant cette visite.")}</p>
  </section>;
}
