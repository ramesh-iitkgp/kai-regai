/**
 * Formal Knowledge Rule Schema for Kai RegAI.
 * 
 * Rules encapsulate traditional palmistry associations directly grounded in verified historical texts.
 * AI-derived rules are strictly isolated from source-direct rules.
 */

export type ReadingCategory =
  | 'PERSONALITY'
  | 'EMOTIONAL_STYLE'
  | 'RELATIONSHIPS'
  | 'CAREER'
  | 'MONEY'
  | 'COMMUNICATION'
  | 'CREATIVITY'
  | 'LEADERSHIP'
  | 'LIFE_DIRECTION'
  | 'STRENGTHS'
  | 'CHALLENGES';

export type EvidenceType =
  | 'SOURCE_DIRECT'   // Exact word-for-word interpretation from verified classical text
  | 'SOURCE_DERIVED'  // Paraphrased traditional interpretation from source material
  | 'ADMIN_CURATED'   // Curated and cross-referenced by palmistry scholar/expert
  | 'AI_DERIVED';     // Generated/inferred by AI (strictly separated, never presented as classical)

export type RuleStatus =
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'APPROVED_WITH_EDITS'
  | 'REJECTED'
  | 'ACTIVE'
  | 'DISABLED';

export type ConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'in'
  | 'contains';

export interface RuleCondition {
  property: string;       // e.g., 'length', 'curvature', 'termination', 'depth'
  operator: ConditionOperator;
  value: string | string[]; // e.g., 'LONG', 'MODERATE', 'JUPITER'
}

export interface RuleInterpretation {
  category: ReadingCategory;
  headline: string;
  traditional_statement: string; // "Traditional palmistry associates this with..."
  detailed_analysis: string;
  traditional_keywords: string[];
}

export interface SourceReference {
  source_id: string;
  source_title: string;
  author: string;
  chapter: string;
  section?: string;
  page?: number;
  verse_or_ref?: string;
  excerpt: string; // Authentic historical quote or reference
}

export interface RuleVersionEntry {
  version: number;
  updated_by: string;
  change_reason: string;
  timestamp: string;
}

export interface KnowledgeRule {
  rule_id: string;
  version: number;
  feature: string; // References FeatureTaxonomy code
  condition_logic: 'AND' | 'OR';
  conditions: RuleCondition[];
  tradition: string; // References TraditionRegistry code
  interpretation: RuleInterpretation;
  source_refs: SourceReference[];
  evidence_type: EvidenceType;
  strength: 'PRIMARY' | 'SUPPORTING' | 'TRADITIONAL';
  status: RuleStatus;
  tags?: string[];
  notes?: string[];
  version_history?: RuleVersionEntry[];
  created_at: string;
  updated_at: string;
}

export interface ConflictRecord {
  feature: string;
  divergence_type: 'ACROSS_TRADITIONS' | 'WITHIN_TRADITION';
  rule_a: {
    rule_id: string;
    tradition: string;
    interpretation: string;
  };
  rule_b: {
    rule_id: string;
    tradition: string;
    interpretation: string;
  };
  contrast_summary: string;
}
