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

type Theme = "light" | "dark";
const storageKey = "op-web-appearance";
const ThemeContext = createContext<{
  theme: Theme;
  choose: (theme: Theme) => void;
} | null>(null);

export function WebThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // Private/locked storage must not prevent the theme switch from working.
    }
  }, []);
  function choose(next: Theme) {
    setTheme(next);
    try {
      // Only a display preference is stored. No demo profile or personal data.
      localStorage.setItem(storageKey, next);
    } catch {}
  }
  return (
    <ThemeContext.Provider value={{ theme, choose }}>
      <div className="studio-surface" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function WebThemeSwitch() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  return (
    <ToggleGroup
      className="web-theme-switch"
      aria-label="Apparence de l’espace membre"
      value={[context.theme]}
      onValueChange={(values) => {
        const next = values[0];
        if (next === "light" || next === "dark") context.choose(next);
      }}
    >
      <ToggleGroupItem value="light" aria-label="Thème clair">
        <Sun size={16} aria-hidden="true" />
        Clair
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Thème sombre">
        <Moon size={16} aria-hidden="true" />
        Sombre
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
