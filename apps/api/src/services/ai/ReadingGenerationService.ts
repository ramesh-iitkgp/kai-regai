import { FullPalmReading, StructuredPalmAnalysis, SectionSourceCitation } from '../../types/contracts.js';
import { knowledgeSearchEngine } from '../knowledge/engine/KnowledgeSearchEngine.js';
import { FeatureObservations } from '../knowledge/engine/RuleMatcher.js';

export class ReadingGenerationService {
  public static async generateReading(
    scanId: string,
    analysis: StructuredPalmAnalysis
  ): Promise<FullPalmReading> {
    // 1. Convert physical palm CV analysis into canonical knowledge observations
    const observations: FeatureObservations = {
      HEART_LINE: {
        length: analysis.lines.heart.length === 'long' ? 'LONG' : 'MODERATE',
        curvature: analysis.lines.heart.curvature === 'deep_arc' || analysis.lines.heart.curvature === 'moderate' ? 'CURVED' : 'MODERATE',
        termination: 'JUPITER',
        depth: 'DEEP',
        continuity: 'CLEAR',
      },
      HEAD_LINE: {
        length: analysis.lines.head.length === 'long' ? 'LONG' : 'MODERATE',
        curvature: 'SLOPING',
        termination: 'MOUNT_MOON',
        origin: 'SEPARATED_FROM_LIFE',
        continuity: 'CLEAR',
      },
      LIFE_LINE: {
        arc: 'WIDE',
        depth: 'DEEP',
        continuity: 'CLEAR',
      },
      FATE_LINE: {
        origin: 'WRIST',
        termination: 'SATURN',
        strength: 'CLEAR',
      },
      MOUNT_JUPITER: {
        prominence: 'WELL_DEVELOPED',
        firmness: 'FIRM',
      },
      MOUNT_VENUS: {
        prominence: 'WELL_DEVELOPED',
      },
      THUMB: {
        proportions: 'BALANCED',
      },
    };

    // 2. Query Knowledge Engine for grounded traditional rules
    const searchResponse = knowledgeSearchEngine.search({
      features: observations,
      min_relevance: 0.65,
    });

    const matches = searchResponse.matches;
    const conflicts = searchResponse.conflicts;

    // Helper to extract citations for a specific feature
    const getCitationsForFeature = (featureCode: string): SectionSourceCitation[] => {
      const featMatches = matches.filter((m) => m.rule.feature === featureCode);
      return featMatches.flatMap((m) =>
        m.rule.source_refs.map((ref) => ({
          ruleId: m.rule.rule_id,
          sourceId: ref.source_id,
          sourceTitle: ref.source_title,
          author: ref.author,
          tradition: m.tradition,
          reference: `${ref.chapter}${ref.page ? `, p. ${ref.page}` : ''}${ref.verse_or_ref ? ` (${ref.verse_or_ref})` : ''}`,
          excerpt: ref.excerpt,
        }))
      );
    };

    // Helper to extract divergence note
    const getDivergenceForFeature = (featureCode: string): string | undefined => {
      if (!conflicts.has_cross_tradition_divergence) return undefined;
      const point = conflicts.divergent_points.find((p) => p.feature === featureCode);
      return point ? `Notice of Tradition Nuance: ${point.contrast_summary}` : undefined;
    };

    return {
      readingId: 'read_' + Date.now().toString(36),
      scanId,
      hand: analysis.hand,
      generatedAt: new Date().toISOString(),
      archetype: 'The Strategic Builder (Fire & Earth Composition)',
      archetypeDescription:
        'Your palm structure reveals a resilient hand composition with deeply grooved primary lines. In traditional Samudrika Shastra, this typography represents a personality that marries intense creative impulse with a persistent, grounded capacity to achieve tangible results.',
      summaryBadges: [
        'Emotionally Expressive',
        'Strategic Thinker',
        'Resilient Vitality',
        'Self-Directed Ambition',
      ],
      sections: [
        {
          id: 'love',
          title: 'Love & Emotional Disposition',
          iconName: 'heart',
          tagline: 'Noble idealism & high fidelity',
          keyObservation:
            'Heart Line: Long, gracefully curved, and terminating under the Mount of Jupiter (Brihaspati).',
          traditionalInterpretation:
            'Traditional palmistry associates a heart line terminating upon the Mount of Jupiter with an idealistic and noble emotional nature. Rather than fleeting attachments, this signifies deep devotion, family honor (Dharma), and affection governed by sincere fidelity.',
          reflectiveAdvice:
            'Give your loved ones the patience to meet your depth; not everyone expresses feelings with the same intentionality.',
          sources: getCitationsForFeature('HEART_LINE'),
          divergenceNote: getDivergenceForFeature('HEART_LINE'),
        },
        {
          id: 'mind',
          title: 'Mind & Problem-Solving Nature',
          iconName: 'brain',
          tagline: 'Adaptable cognition & conceptual imagination',
          keyObservation:
            'Head Line: Sloping gently towards the Mount of Moon (Chandra Parvat) with early self-reliance.',
          traditionalInterpretation:
            'Classical sources associate a head line dipping toward the lunar realm with imaginative intellect, literary discernment, and conceptual problem-solving, complemented by independent confidence.',
          reflectiveAdvice:
            'Beware of over-analyzing decisions before taking action; trust your initial pattern recognition.',
          sources: getCitationsForFeature('HEAD_LINE'),
          divergenceNote: getDivergenceForFeature('HEAD_LINE'),
        },
        {
          id: 'vitality',
          title: 'Vitality & Life Energy',
          iconName: 'compass',
          tagline: 'Abundant stamina & grounded recovery',
          keyObservation:
            'Life Line: Wide, continuous sweep around the Mount of Venus (Shukra Parvat).',
          traditionalInterpretation:
            'Traditional palmistry associates a broad circumference around Venus with abundant vital energy (Ojas), enthusiastic zest for life, social warmth, and resilient recuperative stamina.',
          reflectiveAdvice:
            'Nurture your energy reserves by respecting boundaries between ambitious pursuit and restorative quiet.',
          sources: getCitationsForFeature('LIFE_LINE'),
          divergenceNote: getDivergenceForFeature('LIFE_LINE'),
        },
        {
          id: 'career',
          title: 'Career Direction & Vocational Drive',
          iconName: 'briefcase',
          tagline: 'Self-forged path & compounding mastery',
          keyObservation:
            'Fate Line: Clear, unbroken vertical path rising toward the Mount of Saturn.',
          traditionalInterpretation:
            'Traditional sources indicate that a clear fate line rising toward Saturn denotes an individual with clear vocational determination and self-made accomplishment.',
          reflectiveAdvice:
            'Focus on developing unique craft skills; your long-term fulfillment grows with autonomy.',
          sources: getCitationsForFeature('FATE_LINE'),
          divergenceNote: getDivergenceForFeature('FATE_LINE'),
        },
        {
          id: 'talents',
          title: 'Innate Talents & Mount Prominences',
          iconName: 'sparkles',
          tagline: 'Leadership presence, empathy & communicative agility',
          keyObservation:
            'Mount of Jupiter and Mount of Venus prominently elevated; thumb phalanxes evenly balanced.',
          traditionalInterpretation:
            'Classical Samudrika and Western Chiromancy both recognize prominent Jupiter as a marker of natural dignity and mentorship, while Venus amplifies generosity and warmth, balanced by a resolute thumb.',
          reflectiveAdvice:
            'Look for opportunities where you can mentor others or lead initiatives with empathy.',
          sources: [
            ...getCitationsForFeature('MOUNT_JUPITER'),
            ...getCitationsForFeature('MOUNT_VENUS'),
            ...getCitationsForFeature('THUMB'),
          ],
          divergenceNote: getDivergenceForFeature('MOUNT_JUPITER'),
        },
      ],
      traditionalDisclaimer:
        'This reading is based on classical Western Chiromancy and Indian Samudrika Shastra texts. It is presented solely for entertainment and personal reflection. Palmistry does not scientifically predict future outcomes, and readings should never replace qualified medical, financial, or legal counsel.',
      shareCard: {
        title: 'Kai RegAI Palm Reading',
        headline: 'The Strategic Builder',
        primaryTags: ['Emotionally Expressive', 'Strategic Thinker', 'High Vitality'],
        watermark: 'Kai RegAI • Ancient Wisdom Grounded in Sources',
      },
    };
  }
}
