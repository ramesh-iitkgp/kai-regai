/**
 * Centralized Language Registry for Kai RegAI Web Client.
 * 
 * Supports extensible Indian and international languages with authentic native script names,
 * locale codes, script families, and directional metadata.
 */

export interface LanguageDefinition {
  id: string;             // ISO 639-1 code (e.g. 'hi', 'bn', 'ta')
  name: string;           // English name (e.g. 'Hindi')
  nativeName: string;     // Authentic script (e.g. 'हिन्दी')
  locale: string;         // Full BCP 47 locale (e.g. 'hi-IN')
  script: string;         // Script name (e.g. 'Devanagari')
  direction: 'ltr' | 'rtl';
  currency: string;       // ISO 4217 code
  currencySymbol: string;
  enabled: boolean;
  isPopular?: boolean;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageDefinition> = {
  en: {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    locale: 'en-IN',
    script: 'Latin',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
    isPopular: true,
  },
  hi: {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    locale: 'hi-IN',
    script: 'Devanagari',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
    isPopular: true,
  },
  bn: {
    id: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    locale: 'bn-IN',
    script: 'Bengali',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
    isPopular: true,
  },
  ta: {
    id: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    locale: 'ta-IN',
    script: 'Tamil',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
    isPopular: true,
  },
  te: {
    id: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    locale: 'te-IN',
    script: 'Telugu',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
    isPopular: true,
  },
  mr: {
    id: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    locale: 'mr-IN',
    script: 'Devanagari',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  gu: {
    id: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    locale: 'gu-IN',
    script: 'Gujarati',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  kn: {
    id: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    locale: 'kn-IN',
    script: 'Kannada',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  ml: {
    id: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    locale: 'ml-IN',
    script: 'Malayalam',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  pa: {
    id: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    locale: 'pa-IN',
    script: 'Gurmukhi',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  or: {
    id: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    locale: 'or-IN',
    script: 'Odia',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
  as: {
    id: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    locale: 'as-IN',
    script: 'Bengali-Assamese',
    direction: 'ltr',
    currency: 'INR',
    currencySymbol: '₹',
    enabled: true,
  },
};

export const DEFAULT_LANGUAGE = 'en';

export function getAllLanguages(): LanguageDefinition[] {
  return Object.values(SUPPORTED_LANGUAGES).filter((l) => l.enabled);
}

export function getLanguage(id: string): LanguageDefinition {
  return SUPPORTED_LANGUAGES[id] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
}

/**
 * Suggests an initial language from browser/device locales without forcing it.
 */
export function detectSuggestedLanguage(browserLocales: readonly string[]): LanguageDefinition {
  for (const rawLocale of browserLocales) {
    const langCode = rawLocale.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGUAGES[langCode] && langCode !== 'en') {
      return SUPPORTED_LANGUAGES[langCode];
    }
  }
  return SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
}
