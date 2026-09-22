'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';
import { AppPhone } from './app-showcase';

// This preview is deliberately independent of the website and app preferences.
const VisualTheme = createContext({ light: false, toggle: () => {} });

export function ApplicationVisualTheme({ children }: { children: ReactNode }) {
  const [light, setLight] = useState(false);
  return (
    <VisualTheme.Provider value={{ light, toggle: () => setLight(value => !value) }}>
      {children}
    </VisualTheme.Provider>
  );
}

export function ApplicationVisualToggle() {
  const { light, toggle } = useContext(VisualTheme);
  return (
    <div className="application-visual-control">
      <span id="app-visual-theme-label">App en mode clair</span>
      <button
        type="button"
        role="switch"
        aria-checked={light}
        aria-labelledby="app-visual-theme-label"
        aria-describedby="app-visual-theme-help"
        className="application-visual-switch"
        onClick={toggle}
      >
        <span className="application-visual-switch-thumb">
          {light ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </span>
      </button>
      <small id="app-visual-theme-help">Change uniquement les visuels de l’app sur cette page.</small>
    </div>
  );
}

function captureSource(id: string, light: boolean) {
  return `/app-visuals/studio-20260922-current-${id}${light ? '-light' : ''}.png`;
}

export function ApplicationCapture({ id, alt }: { id: string; alt: string }) {
  const { light } = useContext(VisualTheme);
  return <Image unoptimized src={captureSource(id, light)} alt={`${alt} Mode ${light ? 'clair' : 'sombre'}.`} width={390} height={844} loading="lazy" />;
}

export function ApplicationHeroPhone() {
  const { light } = useContext(VisualTheme);
  return <AppPhone key={light ? 'light' : 'dark'} label={`Accueil de la démo Arena Studio — mode ${light ? 'clair' : 'sombre'}`} screenSrc={captureSource('accueil', light)} />;
}
