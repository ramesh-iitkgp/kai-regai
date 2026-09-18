import React, { createContext, useContext, useState } from 'react';
import type { LanguageDefinition } from '../types/LanguageRegistry';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  detectSuggestedLanguage,
  getLanguage,
  getAllLanguages,
} from '../types/LanguageRegistry';
import { TRANSLATIONS } from '../locales/translations';

interface LanguageContextValue {
  currentLanguage: LanguageDefinition;
  setLanguage: (langId: string) => void;
  availableLanguages: LanguageDefinition[];
  t: (path: string, fallback?: string) => string;
  suggestedLanguage: LanguageDefinition | null;
  dismissSuggestion: () => void;
  formatCurrency: (amountInPaise: number) => string;
  formatDate: (date: string | Date) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'kai_preferred_language';
const SUGGESTION_DISMISSED_KEY = 'kai_lang_suggestion_dismissed';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLangId, setCurrentLangId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES[saved]) {
      return saved;
    }
    // Check browser languages
    const detected = detectSuggestedLanguage(navigator.languages || [navigator.language]);
    return detected.id;
  });

  const [suggestedLanguage, setSuggestedLanguage] = useState<LanguageDefinition | null>(() => {
    const dismissed = localStorage.getItem(SUGGESTION_DISMISSED_KEY);
    if (dismissed) return null;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return null; // user already made an explicit choice

    const detected = detectSuggestedLanguage(navigator.languages || [navigator.language]);
    if (detected.id !== DEFAULT_LANGUAGE) {
      return detected;
    }
    return null;
  });

  const setLanguage = (langId: string) => {
    if (SUPPORTED_LANGUAGES[langId]) {
      setCurrentLangId(langId);
      localStorage.setItem(STORAGE_KEY, langId);
      setSuggestedLanguage(null);
      localStorage.setItem(SUGGESTION_DISMISSED_KEY, 'true');
    }
  };

  const dismissSuggestion = () => {
    setSuggestedLanguage(null);
    localStorage.setItem(SUGGESTION_DISMISSED_KEY, 'true');
  };

  // Helper to extract nested key like 'hero.title1'
  const t = (path: string, fallback?: string): string => {
    const parts = path.split('.');
    const getVal = (dict: any): string | undefined => {
      let curr = dict;
      for (const part of parts) {
        if (!curr || typeof curr !== 'object') return undefined;
        curr = curr[part];
      }
      return typeof curr === 'string' ? curr : undefined;
    };

    // 1. Try active language
    const activeDict = TRANSLATIONS[currentLangId] || TRANSLATIONS[DEFAULT_LANGUAGE];
    const val = getVal(activeDict);
    if (val) return val;

    // 2. Fallback to English
    const enVal = getVal(TRANSLATIONS[DEFAULT_LANGUAGE]);
    if (enVal) return enVal;

    // 3. Fallback to passed fallback or key
    return fallback || path;
  };

  // Locale-aware currency formatting
  const formatCurrency = (amount: number): string => {
    const rupees = amount >= 100 ? Math.round(amount / 100) : amount;
    const lang = getLanguage(currentLangId);
    return `${lang.currencySymbol}${rupees}`;
  };

  // Locale-aware date formatting
  const formatDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const lang = getLanguage(currentLangId);
    try {
      return new Intl.DateTimeFormat(lang.locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(d);
    } catch {
      return d.toLocaleDateString();
    }
  };

  const currentLanguage = getLanguage(currentLangId);
  const availableLanguages = getAllLanguages();

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        availableLanguages,
        t,
        suggestedLanguage,
        dismissSuggestion,
        formatCurrency,
        formatDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
