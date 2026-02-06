"use client";

import { useLanguage } from "@/lib/i18n/context";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "mm" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cream-300 text-sm font-medium text-gray-600 hover:border-gold-400 hover:text-gray-900 transition-colors cursor-pointer bg-cream-200"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {locale === "en" ? "MM" : "EN"}
    </button>
  );
}
