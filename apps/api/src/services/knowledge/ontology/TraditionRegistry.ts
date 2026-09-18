/**
 * Palmistry Tradition Registry.
 * Preserves the historical, philosophical, and methodological boundaries of distinct traditions.
 * Distinct traditions are NEVER forcibly unified into a single consensus rule.
 */

export interface PalmistryTradition {
  id: string;
  code: string;
  name: string;
  originEra: string;
  geographicOrigin: string;
  philosophicalCore: string;
  primaryLiterature: string[];
  keyDifferencesFromOtherTraditions: string;
}

export const TRADITIONS: Record<string, PalmistryTradition> = {
  INDIAN_SAMUDRIKA: {
    id: 'tradition-indian-samudrika',
    code: 'INDIAN_SAMUDRIKA',
    name: 'Indian Samudrika Shastra & Hastha Rekha',
    originEra: 'Vedic / Classical Antiquity (~1500 BCE – Classical Era)',
    geographicOrigin: 'Ancient India (Vedic / Tamil Siddha traditions)',
    philosophicalCore: 'Views the hand as a karmic canvas reflecting Prarabdha (innate potential) on the non-dominant hand and Kriyaman (active choices/Karma) on the dominant hand. Emphasizes Dharma, Mounts of Grahas (planets), and holistic bodily symmetry.',
    primaryLiterature: [
      'Samudrika Shastra (attributed to Sage Garga / Narada)',
      'Bhavishya Purana & Garuda Purana (Hastha Rekha chapters)',
      'Hasta Rekha Vigyan (Modern classical interpretations by Dr. N.D. Shrimali, Dr. B.V. Raman)',
    ],
    keyDifferencesFromOtherTraditions: 'Heavy planetary (Graha) mount correspondence, distinct interpretations of thumb phalanxes for logic vs will, and strong emphasis on the interplay between dominant (karma) and passive (destiny) hands.',
  },
  CLASSICAL_WESTERN: {
    id: 'tradition-classical-western',
    code: 'CLASSICAL_WESTERN',
    name: 'Classical Western Palmistry (Chiromancy & Chirognomy)',
    originEra: '19th Century Systematic Revival (1839–1900)',
    geographicOrigin: 'France, Britain, and United States',
    philosophicalCore: 'Focuses on empirical character analysis, psychological disposition, and career inclination rather than strict omen-reading. Catalyzed by d\'Arpentigny (hand types), Desbarrolles (mounts), and William G. Benham (clinical line analysis).',
    primaryLiterature: [
      'The Laws of Scientific Hand Reading (William G. Benham, 1900)',
      'The Science of the Hand (Casimir Stanislas d\'Arpentigny, 1839)',
      'Les Mystères de la Main (Adolphe Desbarrolles, 1859)',
    ],
    keyDifferencesFromOtherTraditions: 'Emphasizes psychological personality profiling, intellectual versus physical work aptitude, and precise anatomical line curvature classification.',
  },
  CHEIRO_SYSTEM: {
    id: 'tradition-cheiro-system',
    code: 'CHEIRO_SYSTEM',
    name: 'Cheiro\'s Classical Synthesized Palmistry',
    originEra: 'Victorian / Edwardian Era (1894–1930)',
    geographicOrigin: 'Studied in India (Maharashtra / Konkan Joshi Brahmins) and practiced in London & New York',
    philosophicalCore: 'An influential cross-cultural synthesis directly derived from ancient Indian Brahmin palm-leaf records combined with Western Chirognomic structure. Regarded as the gold standard of practical 20th-century palmistry.',
    primaryLiterature: [
      'Cheiro\'s Language of the Hand (1894)',
      'Cheiro\'s Palmistry for All (1910)',
      'You and Your Hand (1931)',
    ],
    keyDifferencesFromOtherTraditions: 'Directly credits Indian Vedic palmistry as the original mother science of hand reading; bridges classical Sanskrit line meanings with accessible English terminology.',
  },
};
