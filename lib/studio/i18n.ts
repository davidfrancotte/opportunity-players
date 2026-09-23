import en from './locales/en.json' with {type:'json'};
import nl from './locales/nl.json' with {type:'json'};
import de from './locales/de.json' with {type:'json'};
import es from './locales/es.json' with {type:'json'};
import it from './locales/it.json' with {type:'json'};
import pt from './locales/pt.json' with {type:'json'};
import pl from './locales/pl.json' with {type:'json'};
import tr from './locales/tr.json' with {type:'json'};
import { english } from './translations.ts';
import { reviewed } from './locales/reviewed.ts';

export const languageKey = 'op-language';
export const languages = [
  {code:'fr',name:'Français',intl:'fr-BE'},
  {code:'nl',name:'Nederlands',intl:'nl-BE'},
  {code:'de',name:'Deutsch',intl:'de-DE'},
  {code:'es',name:'Español',intl:'es-ES'},
  {code:'it',name:'Italiano',intl:'it-IT'},
  {code:'pt',name:'Português',intl:'pt-PT'},
  {code:'pl',name:'Polski',intl:'pl-PL'},
  {code:'tr',name:'Türkçe',intl:'tr-TR'},
  {code:'en',name:'English',intl:'en-GB'},
] as const;
export type Locale = typeof languages[number]['code'];
export function normalizeLocale(value: unknown): Locale {
  return languages.some(language=>language.code===value) ? value as Locale : 'fr';
}
export function intlLocale(locale: string) {
  return languages.find(language=>language.code===locale)?.intl || 'fr-BE';
}
export const dictionaries: Record<Exclude<Locale,'fr'>,Record<string,string>> = {en:{...english,...en},nl,de,es,it,pt,pl,tr};
export function translate(locale: Locale, text: string, englishFallback?: string): string {
  if (locale === 'fr') return text;
  const dictionary=dictionaries[locale];
  const key=text.trim().replace(/\s+/g,' ');
  const value=reviewed[locale]?.[key] || dictionary[text] || dictionary[key] || (locale === 'en' ? englishFallback : undefined);
  if (!value) return text; // User-authored content is never sent to a translation service.
  return text.replace(text.trim(),value);
}
