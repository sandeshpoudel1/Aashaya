import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "invite-theme";

type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ initial, children }: { initial: Theme; children: ReactNode }) {
  // Same pattern as the language: render the default first so hydration matches,
  // then apply the guest's saved choice or a ?theme= link.
  const [theme, setThemeState] = useState<Theme>(initial);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("theme");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage can be blocked in in-app browsers
    }
    const next = fromUrl ?? saved;
    if (next === "light" || next === "dark") setThemeState(next);
  }, []);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#3b0a14" : "#fbf4ec");
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // choice just won't persist
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
