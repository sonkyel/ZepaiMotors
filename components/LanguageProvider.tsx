"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dict, type Lang, type Dict } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

const ORDER: Lang[] = ["es", "en", "fr"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("zepai-lang")) as Lang | null;
    if (saved === "es" || saved === "en" || saved === "fr") {
      setLangState(saved);
    } else if (typeof navigator !== "undefined") {
      const nav = navigator.language.slice(0, 2);
      if (nav === "fr") setLangState("fr");
      else if (nav === "en") setLangState("en");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("zepai-lang", l);
      document.documentElement.lang = l;
    }
  }, []);

  const toggle = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(lang) + 1) % ORDER.length];
    setLang(next);
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, t: dict[lang], setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
