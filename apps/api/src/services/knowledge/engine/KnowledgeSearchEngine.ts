/**
 * Knowledge Search Engine for Kai RegAI.
 * 
 * Orchestrates structured feature matching, semantic fallback search, tradition isolation,
 * conflict reporting, and citation compilation.
 */

import { KnowledgeRule } from '../ontology/RuleSchema.js';
import { ALL_SEED_RULES } from '../seed/index.js';
import { RuleMatcher, FeatureObservations, MatchedRuleResult, RuleSearchOptions } from './RuleMatcher.js';
import { ConflictDetector, TraditionComparisonSummary } from './ConflictDetector.js';

export interface KnowledgeSearchRequest {
  traditions?: string[];
  categories?: string[];
  features: FeatureObservations;
  query_text?: string;
  min_relevance?: number;
}

export interface KnowledgeSearchResponse {
  status: 'SUCCESS' | 'NO_SUPPORTED_RULE';
  total_matches: number;
  matches: MatchedRuleResult[];
  conflicts: TraditionComparisonSummary;
  message?: string;
  timestamp: string;
}

export class KnowledgeSearchEngine {
  private rules: Map<string, KnowledgeRule> = new Map();

  constructor(initialRules: KnowledgeRule[] = ALL_SEED_RULES) {
    initialRules.forEach((rule) => {
      this.rules.set(rule.rule_id, rule);
    });
  }

  public getAllRules(): KnowledgeRule[] {
    return Array.from(this.rules.values());
  }

  public getRule(ruleId: string): KnowledgeRule | undefined {
    return this.rules.get(ruleId);
  }

  public addRule(rule: KnowledgeRule): void {
    this.rules.set(rule.rule_id, rule);
  }

  public updateRule(rule: KnowledgeRule): void {
    this.rules.set(rule.rule_id, rule);
  }

  /**
   * Search knowledge base by observed palm features.
   * Enforces NO HALLUCINATION POLICY: if zero rules match, explicitly returns NO_SUPPORTED_RULE.
   */
  public search(request: KnowledgeSearchRequest): KnowledgeSearchResponse {
    const rulesList = Array.from(this.rules.values());
    const options: RuleSearchOptions = {
      traditions: request.traditions,
      categories: request.categories,
      minRelevance: request.min_relevance ?? 0.6,
    };

    // 1. Perform structured matching
    let matches = RuleMatcher.matchRules(rulesList, request.features, options);

    // 2. If semantic query text provided and structured matches empty, perform fallback keyword/semantic filtering
    if (matches.length === 0 && request.query_text) {
      const q = request.query_text.toLowerCase();
      matches = rulesList
        .filter((r) => {
          const inHeadline = r.interpretation.headline.toLowerCase().includes(q);
          const inStatement = r.interpretation.traditional_statement.toLowerCase().includes(q);
          const inKeywords = r.interpretation.traditional_keywords.some((k) => k.toLowerCase().includes(q));
          const matchesTradition = !request.traditions || request.traditions.includes(r.tradition);
          return (inHeadline || inStatement || inKeywords) && matchesTradition && (r.status === 'ACTIVE' || r.status === 'APPROVED');
        })
        .map((rule) => ({
          rule,
          relevance: 0.70,
          specificity_score: 1,
          matched_properties: ['semantic_query'],
          tradition: rule.tradition,
          source_citation: {
            source_title: rule.source_refs[0]?.source_title || 'Classical Source',
            author: rule.source_refs[0]?.author || 'Traditional Palmistry Master',
            chapter: rule.source_refs[0]?.chapter || 'Text Reference',
            page_or_verse: rule.source_refs[0]?.page ? `Page ${rule.source_refs[0]?.page}` : rule.source_refs[0]?.verse_or_ref,
            excerpt: rule.source_refs[0]?.excerpt || rule.interpretation.traditional_statement,
          },
        }));
    }

    // 3. No Hallucination Policy Enforcement
    if (matches.length === 0) {
      return {
        status: 'NO_SUPPORTED_RULE',
        total_matches: 0,
        matches: [],
        conflicts: {
          has_cross_tradition_divergence: false,
          traditions_present: [],
          divergent_points: [],
          harmonious_themes: [],
        },
        message: 'No sufficiently supported traditional palmistry rule found for the specified feature configuration.',
        timestamp: new Date().toISOString(),
      };
    }

    // 4. Conflict & Cross-Tradition Analysis
    const conflicts = ConflictDetector.detectConflicts(matches);

    return {
      status: 'SUCCESS',
      total_matches: matches.length,
      matches,
      conflicts,
      timestamp: new Date().toISOString(),
    };
  }
}

export const knowledgeSearchEngine = new KnowledgeSearchEngine();
