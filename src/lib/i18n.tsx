import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ne" | "en";
export type Bi = { ne: string; en: string };

const STORAGE_KEY = "invite-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: Bi) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
  // Server and first client render both use `initial`, so hydration matches.
  // The guest's saved choice or ?lang= link is applied right after mount.
  const [lang, setLangState] = useState<Lang>(initial);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage can be blocked in in-app browsers; the default language still works
    }
    const next = fromUrl ?? saved;
    if (next === "ne" || next === "en") setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore, choice just won't persist
    }
  }, []);

  const t = useCallback((text: Bi) => text[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

const NE_DIGITS = "०१२३४५६७८९";

/** Renders ASCII digits as Devanagari digits when the language is Nepali. */
export function digits(value: string | number, lang: Lang) {
  const s = String(value);
  return lang === "ne" ? s.replace(/\d/g, (d) => NE_DIGITS[Number(d)] ?? d) : s;
}
