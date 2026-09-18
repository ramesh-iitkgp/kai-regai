export type HandType = 'left' | 'right';

export interface ImageQualityResult {
  isValid: boolean;
  handDetected: boolean;
  sharpnessScore: number; // 0 to 1
  lightingScore: number;  // 0 to 1
  aspectScore: number;    // 0 to 1
  warnings: string[];     // User friendly warnings
  guidanceText?: string;  // Explicit suggestion
}

export type LineCurvature = 'straight' | 'gentle' | 'moderate' | 'deep_arc';
export type LineLength = 'short' | 'average' | 'long' | 'extends_across';
export type LineContinuity = 'continuous' | 'partially_broken' | 'chained' | 'forked';

export interface Point2D {
  x: number;
  y: number;
}

export interface PalmLineFeature {
  name: string;
  detected: boolean;
  confidence: number; // 0 to 1
  length: LineLength;
  curvature: LineCurvature;
  continuity: LineContinuity;
  traditionalMeaningSummary: string;
  svgPath?: string; // Normalized coordinates SVG path
  points?: Point2D[];
}

export interface MountFeature {
  name: string;
  prominence: 'prominent' | 'balanced' | 'understated';
  traditionalAttribute: string;
}

export interface StructuredPalmAnalysis {
  scanId: string;
  hand: HandType;
  imageQualityScore: number;
  lines: {
    life: PalmLineFeature;
    head: PalmLineFeature;
    heart: PalmLineFeature;
    fate?: PalmLineFeature;
    sun?: PalmLineFeature;
  };
  mounts: MountFeature[];
  handArchetype: 'Earth Hand' | 'Air Hand' | 'Fire Hand' | 'Water Hand';
  detectedTags: string[];
  landmarks?: Point2D[];
  palmBoundary?: string;
}

export interface PaymentInitResponse {
  orderId: string;
  scanId: string;
  amount: number;
  currency: string;
  keyId: string;
  mockMode?: boolean;
}

export interface PaymentVerifyRequest {
  scanId: string;
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  status: 'paid' | 'failed';
  message: string;
  readingReady: boolean;
}

export interface SectionSourceCitation {
  ruleId: string;
  sourceId: string;
  sourceTitle: string;
  author: string;
  tradition: string;
  reference: string;
  excerpt: string;
}

export interface BookComparison {
  tradition: string;      // 'Samudrika Shastra' | 'Cheiro (1894)' | 'Benham (1900)'
  sourceTitle: string;
  author: string;
  reference: string;
  interpretation: string;
}

export interface ReadingCardSection {
  id: string;
  title: string;
  iconName: string;
  tagline: string;
  keyObservation: string;
  traditionalInterpretation: string;
  reflectiveAdvice: string;
  sources?: SectionSourceCitation[];
  bookComparisons?: BookComparison[];
  divergenceNote?: string;
}

export interface PalmCrunchPillar {
  id: 'wealth' | 'love' | 'mind' | 'health';
  traditionalName: string; // e.g. "Dhana & Bhagya (धन एवं भाग्य)"
  englishName: string;     // e.g. "Wealth & Career"
  score: number;           // e.g. 92
  ratingLabel: string;     // e.g. "Very Favorable (उत्तम)"
  verdict: string;         // e.g. "Strong financial independence with compounding gains post-28."
  keyIndicator: string;    // e.g. "Clear ascending Fate line toward Saturn Mount"
  color: string;
}

export interface AuspiciousSignals {
  specialYog: string;        // e.g. "Gajakesari Influence & Trishul Mark"
  specialYogMeaning: string; // e.g. "Sign of leadership prestige and moral authority in career"
  luckyDay: string;          // e.g. "Thursday (गुरुवार)"
  auspiciousColor: string;   // e.g. "Royal Gold & Deep Saffron"
  luckyGemstone: string;     // e.g. "Yellow Sapphire (पुखराज) or Pearl"
  guidingMantra: string;     // e.g. "Action backed by patience yields enduring prosperity."
}

export interface FullPalmReading {
  readingId: string;
  scanId: string;
  hand: HandType;
  generatedAt: string;
  archetype: string;
  archetypeDescription: string;
  summaryBadges: string[];
  sections: ReadingCardSection[];
  traditionalDisclaimer: string;
  crunchPillars?: PalmCrunchPillar[];
  auspiciousSignals?: AuspiciousSignals;
  shareCard: {
    title: string;
    headline: string;
    primaryTags: string[];
    watermark: string;
  };
}
