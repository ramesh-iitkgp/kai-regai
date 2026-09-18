/**
 * Formal Palmistry Feature Taxonomy for Kai RegAI.
 * Defines standard entities, observable physical attributes, and measurement dimensions.
 */

export type FeatureType =
  | 'LINE'
  | 'MOUNT'
  | 'HAND_SHAPE'
  | 'MARKING'
  | 'FINGER'
  | 'THUMB';

export type ObservabilityLevel = 'observable' | 'partially_observable' | 'not_detectable' | 'uncertain';

export interface PalmFeatureDefinition {
  code: string;
  type: FeatureType;
  sanskritName: string;
  tamilName: string;
  englishName: string;
  description: string;
  observableProperties: string[];
  cvDetectability: ObservabilityLevel;
}

export const PALM_FEATURES: Record<string, PalmFeatureDefinition> = {
  HEART_LINE: {
    code: 'HEART_LINE',
    type: 'LINE',
    sanskritName: 'Hridaya Rekha',
    tamilName: 'Idhaya Regai',
    englishName: 'Heart Line',
    description: 'Traces emotional disposition, empathy, attachment style, and relationship expectations.',
    observableProperties: ['length', 'curvature', 'depth', 'origin', 'termination', 'continuity', 'branches', 'forks'],
    cvDetectability: 'observable',
  },
  HEAD_LINE: {
    code: 'HEAD_LINE',
    type: 'LINE',
    sanskritName: 'Mati Rekha / Shirorashmika',
    tamilName: 'Mano Regai',
    englishName: 'Head Line',
    description: 'Represents cognitive approach, focus, analytical vs creative problem solving, and mental stamina.',
    observableProperties: ['length', 'curvature', 'depth', 'slope', 'origin', 'termination', 'continuity', 'forks'],
    cvDetectability: 'observable',
  },
  LIFE_LINE: {
    code: 'LIFE_LINE',
    type: 'LINE',
    sanskritName: 'Ayush Rekha / Pitru Rekha',
    tamilName: 'Aayul Regai',
    englishName: 'Life Line',
    description: 'Reflects vital energy reserves, physical stamina, relationship with roots, and energetic resilience.',
    observableProperties: ['length', 'arc', 'depth', 'origin', 'termination', 'continuity', 'branches'],
    cvDetectability: 'observable',
  },
  FATE_LINE: {
    code: 'FATE_LINE',
    type: 'LINE',
    sanskritName: 'Bhagya Rekha / Urdhva Rekha',
    tamilName: 'Vithi Regai',
    englishName: 'Fate Line (Line of Destiny)',
    description: 'Signifies sense of vocation, personal purpose, career clarity, and self-directed autonomy.',
    observableProperties: ['presence', 'strength', 'origin', 'termination', 'continuity', 'branches'],
    cvDetectability: 'partially_observable',
  },
  SUN_LINE: {
    code: 'SUN_LINE',
    type: 'LINE',
    sanskritName: 'Surya Rekha / Vidya Rekha',
    tamilName: 'Surya Regai',
    englishName: 'Sun Line (Apollo Line)',
    description: 'Associated with creative brilliance, public recognition, artistic accomplishment, and magnetic reputation.',
    observableProperties: ['presence', 'strength', 'origin', 'termination'],
    cvDetectability: 'partially_observable',
  },
  MOUNT_JUPITER: {
    code: 'MOUNT_JUPITER',
    type: 'MOUNT',
    sanskritName: 'Brihaspati Parvat / Guru Parvat',
    tamilName: 'Guru Medu',
    englishName: 'Mount of Jupiter',
    description: 'Located at base of index finger. Traditional indicator of leadership presence, ambition, dignity, and generosity.',
    observableProperties: ['prominence', 'firmness', 'position'],
    cvDetectability: 'observable',
  },
  MOUNT_SATURN: {
    code: 'MOUNT_SATURN',
    type: 'MOUNT',
    sanskritName: 'Shani Parvat',
    tamilName: 'Sani Medu',
    englishName: 'Mount of Saturn',
    description: 'Located at base of middle finger. Traditional marker of introspection, discipline, patience, and philosophical sobriety.',
    observableProperties: ['prominence', 'firmness'],
    cvDetectability: 'observable',
  },
  MOUNT_SUN: {
    code: 'MOUNT_SUN',
    type: 'MOUNT',
    sanskritName: 'Surya Parvat',
    tamilName: 'Surya Medu',
    englishName: 'Mount of Apollo (Sun)',
    description: 'Located at base of ring finger. Associated with artistic aesthetics, warmth, charisma, and love of harmony.',
    observableProperties: ['prominence', 'firmness'],
    cvDetectability: 'observable',
  },
  MOUNT_MERCURY: {
    code: 'MOUNT_MERCURY',
    type: 'MOUNT',
    sanskritName: 'Budha Parvat',
    tamilName: 'Budhan Medu',
    englishName: 'Mount of Mercury',
    description: 'Located beneath little finger. Traditional indicator of communicative agility, commercial perception, and quick wit.',
    observableProperties: ['prominence', 'firmness'],
    cvDetectability: 'observable',
  },
  MOUNT_VENUS: {
    code: 'MOUNT_VENUS',
    type: 'MOUNT',
    sanskritName: 'Shukra Parvat',
    tamilName: 'Sukiran Medu',
    englishName: 'Mount of Venus',
    description: 'Located at base of thumb. Represents physical vitality, sensual warmth, generosity, and appreciation for life beauty.',
    observableProperties: ['prominence', 'firmness', 'extent'],
    cvDetectability: 'observable',
  },
  MOUNT_MOON: {
    code: 'MOUNT_MOON',
    type: 'MOUNT',
    sanskritName: 'Chandra Parvat',
    tamilName: 'Chandran Medu',
    englishName: 'Mount of Moon (Luna)',
    description: 'Located on lower percussion opposite thumb. Traditional marker of intuitive sensitivity, lateral imagination, and travel inclination.',
    observableProperties: ['prominence', 'firmness'],
    cvDetectability: 'observable',
  },
  HAND_SHAPE: {
    code: 'HAND_SHAPE',
    type: 'HAND_SHAPE',
    sanskritName: 'Kara Akriti',
    tamilName: 'Kai Vadivam',
    englishName: 'Hand Elemental Archetype',
    description: 'Four elemental categories (Earth, Air, Fire, Water) and classical Chirognomy types (Square, Spatulate, Philosophic, Conic).',
    observableProperties: ['palmShape', 'fingerLengthRatio', 'palmProportions'],
    cvDetectability: 'observable',
  },
};
