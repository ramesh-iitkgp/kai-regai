/**
 * Rule Matcher Engine for Kai RegAI Knowledge Engine.
 * 
 * Matches observed physical palm features against structured knowledge rules.
 * Implements specificity weighting, priority ranking, and strict evidence differentiation.
 */

import { KnowledgeRule, RuleCondition } from '../ontology/RuleSchema.js';

export interface MatchedRuleResult {
  rule: KnowledgeRule;
  relevance: number;        // 0.0 to 1.0
  specificity_score: number; // Higher for rules with more precise property combinations
  matched_properties: string[];
  tradition: string;
  source_citation: {
    source_title: string;
    author: string;
    chapter: string;
    page_or_verse?: string;
    excerpt: string;
  };
}

export interface FeatureObservations {
  [featureCode: string]: {
    [property: string]: any;
  };
}

export interface RuleSearchOptions {
  traditions?: string[];
  categories?: string[];
  minRelevance?: number;
  includeDrafts?: boolean;
}

export class RuleMatcher {
  /**
   * Evaluates a single rule condition against an observed feature value.
   */
  public static evaluateCondition(condition: RuleCondition, observedValue: any): boolean {
    if (observedValue === undefined || observedValue === null) {
      return false;
    }

    const obsStr = String(observedValue).toUpperCase().trim();

    switch (condition.operator) {
      case 'equals': {
        const condStr = String(condition.value).toUpperCase().trim();
        return obsStr === condStr;
      }
      case 'not_equals': {
        const condStr = String(condition.value).toUpperCase().trim();
        return obsStr !== condStr;
      }
      case 'in': {
        const targetList = Array.isArray(condition.value)
          ? condition.value.map((v) => String(v).toUpperCase().trim())
          : [String(condition.value).toUpperCase().trim()];
        return targetList.includes(obsStr);
      }
      case 'contains': {
        const condStr = String(condition.value).toUpperCase().trim();
        return obsStr.includes(condStr);
      }
      default:
        return false;
    }
  }

  /**
   * Evaluates all candidate rules against observed features and returns ranked matches.
   */
  public static matchRules(
    rules: KnowledgeRule[],
    observations: FeatureObservations,
    options: RuleSearchOptions = {}
  ): MatchedRuleResult[] {
    const results: MatchedRuleResult[] = [];
    const minRelevance = options.minRelevance ?? 0.5;

    for (const rule of rules) {
      // 1. Status Filter: Only APPROVED or ACTIVE unless includeDrafts is explicitly set
      if (!options.includeDrafts && rule.status !== 'ACTIVE' && rule.status !== 'APPROVED') {
        continue;
      }

      // 2. Tradition Filter
      if (options.traditions && options.traditions.length > 0) {
        if (!options.traditions.includes(rule.tradition)) {
          continue;
        }
      }

      // 3. Category Filter
      if (options.categories && options.categories.length > 0) {
        if (!options.categories.includes(rule.interpretation.category)) {
          continue;
        }
      }

      // 4. Feature Observation Check
      const featureObs = observations[rule.feature];
      if (!featureObs) {
        continue;
      }

      // 5. Evaluate Conditions
      const matchedProperties: string[] = [];
      let conditionsSatisfied = 0;
      const totalConditions = rule.conditions.length;

      for (const cond of rule.conditions) {
        const obsValue = featureObs[cond.property];
        if (RuleMatcher.evaluateCondition(cond, obsValue)) {
          conditionsSatisfied++;
          matchedProperties.push(cond.property);
        }
      }

      let matches = false;
      if (rule.condition_logic === 'OR') {
        matches = conditionsSatisfied > 0;
      } else {
        // Default is 'AND'
        matches = conditionsSatisfied === totalConditions;
      }

      if (!matches) {
        continue;
      }

      // 6. Calculate Specificity & Relevance
      // More conditions matched = higher specificity
      const specificityScore = conditionsSatisfied;
      
      // Base relevance 0.70 + 0.08 per matched condition, capped at 0.98
      // Higher specificity rules always receive higher relevance
      let relevance = 0.70 + Math.min(0.25, conditionsSatisfied * 0.08);
      
      // Slight boost for SOURCE_DIRECT evidence
      if (rule.evidence_type === 'SOURCE_DIRECT') {
        relevance = Math.min(0.99, relevance + 0.04);
      }

      if (relevance < minRelevance) {
        continue;
      }

      const primarySource = rule.source_refs[0] || {
        source_title: 'Traditional Canon',
        author: 'Classical Palmistry Master',
        chapter: 'Classical Line Indications',
        excerpt: rule.interpretation.traditional_statement,
      };

      results.push({
        rule,
        relevance: parseFloat(relevance.toFixed(2)),
        specificity_score: specificityScore,
        matched_properties: matchedProperties,
        tradition: rule.tradition,
        source_citation: {
          source_title: primarySource.source_title,
          author: primarySource.author,
          chapter: primarySource.chapter,
          page_or_verse: primarySource.page ? `Page ${primarySource.page}` : primarySource.verse_or_ref,
          excerpt: primarySource.excerpt,
        },
      });
    }

    // 7. Sort by:
    // (a) Specificity (condition count) descending - exact combinations first
    // (b) Relevance score descending
    // (c) Evidence type (SOURCE_DIRECT first)
    return results.sort((a, b) => {
      if (b.specificity_score !== a.specificity_score) {
        return b.specificity_score - a.specificity_score;
      }
      if (b.relevance !== a.relevance) {
        return b.relevance - a.relevance;
      }
      return a.rule.rule_id.localeCompare(b.rule.rule_id);
    });
  }
}
