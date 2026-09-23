"use client";
// The shared settings UI uses the web provider, never the native/global theme.
import { Sun, Moon, Check } from 'lucide-react';
import { useLocale } from './locale';
import { useWebAppearance } from './web-theme';

export function AppearancePreferences() {
  const appearance = useWebAppearance();
  const { t } = useLocale();
  if (!appearance) return null;
  return <section className="info-card appearance-preferences" aria-labelledby="appearance-heading">
    <div className="card-heading"><h2 id="appearance-heading"><Sun size={19} aria-hidden="true" />{t('Apparence de l’app')}</h2></div>
    <p>{t('Choisissez le thème qui vous convient. Vous pouvez le changer à tout moment.')}</p>
    <fieldset className="appearance-options">
      <legend className="sr-only">{t('Thème de l’application')}</legend>
      {(['light', 'dark'] as const).map(value => {
        const Icon = value === 'light' ? Sun : Moon;
        return <label key={value} className="appearance-option" data-selected={appearance.theme === value}>
          <input type="radio" name="app-appearance" value={value} checked={appearance.theme === value} onChange={() => appearance.choose(value)} />
          <Icon size={23} aria-hidden="true" />
          <span>{t(value === 'light' ? 'Mode clair' : 'Mode sombre')}</span>
          <Check className="appearance-check" size={16} aria-hidden="true" />
        </label>;
      })}
    </fieldset>
    <p className="appearance-note" role="status">{t(appearance.saved ? 'Votre préférence est enregistrée sur cet appareil.' : 'Le stockage est indisponible. Ce choix reste actif pendant cette visite.')}</p>
  </section>;
}
