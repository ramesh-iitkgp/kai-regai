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
      const q = request.query_text.toLowerCase().trim();
      const stopWords = new Set([
        'what', 'does', 'about', 'tell', 'more', 'your', 'with', 'from',
        'this', 'that', 'have', 'show', 'mean', 'says', 'some', 'give', 'could'
      ]);
      const tokens = q
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length >= 3 && !stopWords.has(t));

      matches = rulesList
        .filter((r) => {
          if (r.status !== 'ACTIVE' && r.status !== 'APPROVED') return false;
          if (request.traditions && request.traditions.length > 0 && !request.traditions.includes(r.tradition)) return false;

          const textCorpus = [
            r.interpretation.headline,
            r.interpretation.traditional_statement,
            r.interpretation.detailed_analysis,
            ...r.interpretation.traditional_keywords,
            ...(r.tags || []),
            r.feature,
            r.tradition,
            r.source_refs[0]?.author || '',
            r.source_refs[0]?.source_title || '',
            r.source_refs[0]?.chapter || '',
          ].join(' ').toLowerCase();

          if (textCorpus.includes(q)) return true;
          return tokens.some((token) => textCorpus.includes(token));
        })
        .map((rule) => {
          const textCorpus = [
            rule.interpretation.headline,
            rule.interpretation.traditional_statement,
            rule.interpretation.detailed_analysis,
            ...rule.interpretation.traditional_keywords,
            ...(rule.tags || []),
            rule.feature,
            rule.tradition,
            rule.source_refs[0]?.author || '',
            rule.source_refs[0]?.source_title || '',
            rule.source_refs[0]?.chapter || '',
          ].join(' ').toLowerCase();

          let score = 0.55;
          if (textCorpus.includes(q)) score += 0.35;
          let matchedTokensCount = 0;
          for (const token of tokens) {
            if (textCorpus.includes(token)) {
              score += 0.12;
              matchedTokensCount++;
            }
          }

          return {
            rule,
            relevance: Math.min(0.99, Number(score.toFixed(2))),
            specificity_score: Math.max(1, matchedTokensCount),
            matched_properties: ['semantic_query'],
            tradition: rule.tradition,
            source_citation: {
              source_title: rule.source_refs[0]?.source_title || 'Classical Source',
              author: rule.source_refs[0]?.author || 'Traditional Palmistry Master',
              chapter: rule.source_refs[0]?.chapter || 'Text Reference',
              page_or_verse: rule.source_refs[0]?.page ? `Page ${rule.source_refs[0]?.page}` : rule.source_refs[0]?.verse_or_ref,
              excerpt: rule.source_refs[0]?.excerpt || rule.interpretation.traditional_statement,
            },
          };
        })
        .sort((a, b) => b.relevance - a.relevance);
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
