"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Sun, Moon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocale } from './locale';

type Theme = "light" | "dark";
const storageKey = "op-web-appearance";
const ThemeContext = createContext<{
  theme: Theme;
  choose: (theme: Theme) => void;
  saved: boolean;
} | null>(null);
export const useWebAppearance = () => useContext(ThemeContext);

export function WebThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      setSaved(false);
      // Private/locked storage must not prevent the theme switch from working.
    }
  }, []);
  function choose(next: Theme) {
    setTheme(next);
    try {
      // Only a display preference is stored. No demo profile or personal data.
      localStorage.setItem(storageKey, next);
      setSaved(true);
    } catch { setSaved(false); }
  }
  return (
    <ThemeContext.Provider value={{ theme, choose, saved }}>
      <div className="studio-surface" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function WebThemeSwitch() {
  const context = useContext(ThemeContext);
  const { t } = useLocale();
  if (!context) return null;
  return (
    <ToggleGroup
      className="web-theme-switch"
      aria-label={t('Apparence de l’app')}
      value={[context.theme]}
      onValueChange={(values) => {
        const next = values[0];
        if (next === "light" || next === "dark") context.choose(next);
      }}
    >
      <ToggleGroupItem value="light" aria-label={t('Mode clair')}>
        <Sun size={16} aria-hidden="true" />
        {t('Mode clair')}
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label={t('Mode sombre')}>
        <Moon size={16} aria-hidden="true" />
        {t('Mode sombre')}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
