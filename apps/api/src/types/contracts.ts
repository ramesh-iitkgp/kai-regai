export type HandType = 'left' | 'right';

export interface ImageQualityResult {
  isValid: boolean;
  handDetected: boolean;
  sharpnessScore: number;
  lightingScore: number;
  aspectScore: number;
  warnings: string[];
  guidanceText?: string;
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
  confidence: number;
  length: LineLength;
  curvature: LineCurvature;
  continuity: LineContinuity;
  traditionalMeaningSummary: string;
  svgPath?: string;
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
  tradition: string;
  sourceTitle: string;
  author: string;
  reference: string;
  interpretation: string;
}

export interface ReadingCardSection {
  id: string;
  title: string;
  iconName: string; // 'heart' | 'brain' | 'briefcase' | 'compass' | 'sparkles' | 'shield'
  tagline: string;
  keyObservation: string;
  traditionalInterpretation: string;
  reflectiveAdvice: string;
  sources?: SectionSourceCitation[];
  bookComparisons?: BookComparison[];
  divergenceNote?: string;
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
  shareCard: {
    title: string;
    headline: string;
    primaryTags: string[];
    watermark: string;
  };
}
