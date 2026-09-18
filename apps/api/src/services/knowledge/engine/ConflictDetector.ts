/**
 * Conflict Detector for Kai RegAI Knowledge Engine.
 * 
 * Analyzes matched rules to detect divergences and contrasting interpretations across
 * traditions (e.g. Western psychological vs Indian karmic/planetary) or within traditions.
 * Prevents forced consensus and surfaces authentic differences transparently.
 */

import { MatchedRuleResult } from './RuleMatcher.js';
import { ConflictRecord } from '../ontology/RuleSchema.js';

export interface TraditionComparisonSummary {
  has_cross_tradition_divergence: boolean;
  traditions_present: string[];
  divergent_points: ConflictRecord[];
  harmonious_themes: string[];
}

export class ConflictDetector {
  /**
   * Evaluates a set of matched rules for cross-tradition and intra-tradition variations.
   */
  public static detectConflicts(matches: MatchedRuleResult[]): TraditionComparisonSummary {
    const traditionsPresent = Array.from(new Set(matches.map((m) => m.tradition)));
    const divergentPoints: ConflictRecord[] = [];
    const harmoniousThemes: string[] = [];

    // Group matches by feature code
    const byFeature: Record<string, MatchedRuleResult[]> = {};
    for (const match of matches) {
      const feat = match.rule.feature;
      if (!byFeature[feat]) {
        byFeature[feat] = [];
      }
      byFeature[feat].push(match);
    }

    // Inspect each feature where multiple traditions or interpretations exist
    for (const [feature, featureMatches] of Object.entries(byFeature)) {
      if (featureMatches.length < 2) {
        continue;
      }

      for (let i = 0; i < featureMatches.length; i++) {
        for (let j = i + 1; j < featureMatches.length; j++) {
          const a = featureMatches[i];
          const b = featureMatches[j];

          // If from different traditions or opposing categories
          if (a.tradition !== b.tradition) {
            // Check if they highlight different nuances (e.g. Western character vs Samudrika Dharma/Graha)
            divergentPoints.push({
              feature,
              divergence_type: 'ACROSS_TRADITIONS',
              rule_a: {
                rule_id: a.rule.rule_id,
                tradition: a.tradition,
                interpretation: a.rule.interpretation.headline,
              },
              rule_b: {
                rule_id: b.rule.rule_id,
                tradition: b.tradition,
                interpretation: b.rule.interpretation.headline,
              },
              contrast_summary: `${a.tradition} emphasizes '${a.rule.interpretation.headline}', whereas ${b.tradition} frames this through '${b.rule.interpretation.headline}'.`,
            });
          } else {
            // Same tradition: check if they share a common theme
            if (a.rule.interpretation.category === b.rule.interpretation.category) {
              harmoniousThemes.push(
                `${a.tradition} consistently links ${feature} with ${a.rule.interpretation.category}.`
              );
            }
          }
        }
      }
    }

    return {
      has_cross_tradition_divergence: divergentPoints.length > 0,
      traditions_present: traditionsPresent,
      divergent_points: divergentPoints,
      harmonious_themes: Array.from(new Set(harmoniousThemes)),
    };
  }
}
