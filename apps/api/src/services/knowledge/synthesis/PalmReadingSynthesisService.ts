/**
 * Palm Reading Synthesis Service for Kai RegAI.
 * 
 * Synthesizes structured knowledge evidence into grounded, personalized traditional reading sections.
 * Strictly adheres to non-deterministic framing and complete source citation transparency.
 */

import { MatchedRuleResult } from '../engine/RuleMatcher.js';
import { ReadingCategory } from '../ontology/RuleSchema.js';
import { TraditionComparisonSummary } from '../engine/ConflictDetector.js';

export interface FeatureConfidenceRecord {
  feature: string;
  property_summary: string;
  confidence: number; // CV confidence 0.0 to 1.0
}

export interface SynthesisRequest {
  reading_id?: string;
  detected_features: Record<string, any>;
  feature_confidences?: Record<string, number>;
  matched_rules: MatchedRuleResult[];
  conflicts?: TraditionComparisonSummary;
  selected_traditions?: string[];
}

export interface GroundedCategoryReading {
  category: ReadingCategory;
  headline: string;
  traditional_interpretation: string;
  grounded_reasoning: string;
  observations: {
    feature: string;
    description: string;
    confidence: number;
  }[];
  sources: {
    rule_id: string;
    source_id: string;
    source_title: string;
    author: string;
    tradition: string;
    reference: string;
    excerpt: string;
  }[];
  divergence_note?: string;
}

export interface SynthesizedReadingResponse {
  reading_id: string;
  disclaimer: string;
  categories: GroundedCategoryReading[];
  traditions_referenced: string[];
  total_sources_cited: number;
  unsupported_features?: string[];
  generated_at: string;
}

export class PalmReadingSynthesisService {
  private static DISCLAIMER =
    'This palmistry reading is for personal reflection and cultural interest based on traditional Chiromancy and Samudrika Shastra texts. It does not constitute scientific fact, psychological diagnosis, financial advice, or deterministic predictions.';

  /**
   * Synthesize customer-facing reading sections from grounded knowledge rules.
   */
  public static synthesize(request: SynthesisRequest): SynthesizedReadingResponse {
    const readingId = request.reading_id || `read-${Date.now()}`;
    const matchedRules = request.matched_rules;
    const featureConfidences = request.feature_confidences || {};

    // Group matched rules by interpretation category
    const byCategory: Record<ReadingCategory, MatchedRuleResult[]> = {} as any;

    matchedRules.forEach((match) => {
      const cat = match.rule.interpretation.category;
      if (!byCategory[cat]) {
        byCategory[cat] = [];
      }
      byCategory[cat].push(match);
    });

    const categoryReadings: GroundedCategoryReading[] = [];
    const traditionsSet = new Set<string>();
    let totalSources = 0;

    for (const [categoryKey, matches] of Object.entries(byCategory)) {
      const cat = categoryKey as ReadingCategory;
      if (!matches || matches.length === 0) continue;

      // Primary rule is the most specific/highest relevance match in this category
      const primaryMatch = matches[0];
      primaryMatch.rule.source_refs.forEach((s) => traditionsSet.add(primaryMatch.tradition));

      // Build observations
      const observations = matches.map((m) => {
        const feat = m.rule.feature;
        const conf = featureConfidences[feat] ?? 0.85;
        const propSummary = m.matched_properties
          .map((p) => `${p}: ${request.detected_features[feat]?.[p] ?? 'observed'}`)
          .join(', ');
        return {
          feature: feat,
          description: `${feat} exhibits ${propSummary}`,
          confidence: conf,
        };
      });

      // Format customer-facing prose using ethical non-deterministic framing
      const traditionName = primaryMatch.tradition.replace('_', ' ').toLowerCase();
      const traditionalInterpretation = `Traditional ${traditionName} associates this pattern with ${primaryMatch.rule.interpretation.detailed_analysis}`;
      const groundedReasoning = `In the classical literature (${primaryMatch.source_citation.source_title}), this configuration is historically interpreted as an indicator of ${primaryMatch.rule.interpretation.traditional_keywords.join(', ')}.`;

      // Check if there is cross-tradition divergence for this category
      let divergenceNote: string | undefined;
      if (request.conflicts?.has_cross_tradition_divergence) {
        const relevantConflict = request.conflicts.divergent_points.find(
          (c) => c.feature === primaryMatch.rule.feature
        );
        if (relevantConflict) {
          divergenceNote = `Notice of Variation: ${relevantConflict.contrast_summary}`;
        }
      }

      // Collect source citations
      const sources = matches.flatMap((m) => {
        return m.rule.source_refs.map((ref) => {
          totalSources++;
          return {
            rule_id: m.rule.rule_id,
            source_id: ref.source_id,
            source_title: ref.source_title,
            author: ref.author,
            tradition: m.tradition,
            reference: `${ref.chapter}${ref.page ? `, p. ${ref.page}` : ''}${ref.verse_or_ref ? ` (${ref.verse_or_ref})` : ''}`,
            excerpt: ref.excerpt,
          };
        });
      });

      categoryReadings.push({
        category: cat,
        headline: primaryMatch.rule.interpretation.headline,
        traditional_interpretation: traditionalInterpretation,
        grounded_reasoning: groundedReasoning,
        observations,
        sources,
        divergence_note: divergenceNote,
      });
    }

    return {
      reading_id: readingId,
      disclaimer: PalmReadingSynthesisService.DISCLAIMER,
      categories: categoryReadings,
      traditions_referenced: Array.from(traditionsSet),
      total_sources_cited: totalSources,
      generated_at: new Date().toISOString(),
    };
  }
}
