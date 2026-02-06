"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import en from "./en.json";
import mm from "./mm.json";

type Locale = "en" | "mm";

const translations = { en, mm } as const;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(
        translations[locale] as unknown as Record<string, unknown>,
        key
      );
    },
    [locale]
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const keys = key.split(".");
      let current: unknown = translations[locale];
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          return [];
        }
      }
      return Array.isArray(current) ? (current as string[]) : [];
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
