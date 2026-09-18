/**
 * Comprehensive Test Suite for Kai RegAI Palmistry Knowledge Engine V1.
 * Tests:
 *  1. Exact Rule Matching
 *  2. Specificity Priority Scoring (multi-condition rule ranks above single-condition rule)
 *  3. Tradition Isolation (Western vs Indian Samudrika)
 *  4. Cross-Tradition Conflict Detection
 *  5. No-Hallucination Policy (returns NO_SUPPORTED_RULE on ungrounded features)
 *  6. Source Citation Integrity
 *  7. Non-deterministic ethical language enforcement in Admin Curation
 *  8. Rule Version Audit Trail
 *  9. AI Reading Synthesis Formatting
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { RuleMatcher } from '../src/services/knowledge/engine/RuleMatcher.js';
import { ConflictDetector } from '../src/services/knowledge/engine/ConflictDetector.js';
import { KnowledgeSearchEngine } from '../src/services/knowledge/engine/KnowledgeSearchEngine.js';
import { PalmReadingSynthesisService } from '../src/services/knowledge/synthesis/PalmReadingSynthesisService.js';
import { AdminCurationService } from '../src/services/knowledge/curation/AdminCurationService.js';
import { ALL_SEED_RULES } from '../src/services/knowledge/seed/index.js';
import { CHEIRO_SEED_RULES } from '../src/services/knowledge/seed/cheiro-rules.js';

describe('Kai RegAI Knowledge Engine V1 Tests', () => {

  test('1. Exact Rule Matching: matches Heart Line with length=LONG, curvature=CURVED, termination=JUPITER', () => {
    const observations = {
      HEART_LINE: {
        length: 'LONG',
        curvature: 'CURVED',
        termination: 'JUPITER',
      },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, observations);
    assert.ok(matches.length > 0, 'Should match at least one rule');

    const topMatch = matches[0];
    assert.equal(topMatch.rule.rule_id, 'cheiro-heart-jupiter-001');
    assert.equal(topMatch.rule.tradition, 'CHEIRO_SYSTEM');
    assert.ok(topMatch.relevance >= 0.90, 'High relevance for exact multi-condition match');
  });

  test('2. Specificity Priority Scoring: More specific rules outrank general rules', () => {
    const observations = {
      HEART_LINE: {
        length: 'LONG',
        curvature: 'CURVED',
        termination: 'JUPITER',
        depth: 'DEEP',
      },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, observations);
    // cheiro-heart-jupiter-001 matches 3 conditions (length, curvature, termination)
    // samudrika-hridaya-guru-001 matches 2 conditions (termination, length)
    assert.ok(matches.length >= 2, 'Multiple rules should match');
    
    // Top match should be the most specific (higher specificity_score)
    assert.ok(matches[0].specificity_score >= matches[1].specificity_score);
    assert.ok(matches[0].relevance >= matches[1].relevance);
    assert.equal(matches[0].rule.rule_id, 'cheiro-heart-jupiter-001');
  });

  test('3. Tradition Isolation: strictly filters by tradition without cross-contamination', () => {
    const observations = {
      HEART_LINE: {
        length: 'LONG',
        curvature: 'CURVED',
        termination: 'JUPITER',
      },
    };

    // Filter strictly to INDIAN_SAMUDRIKA
    const indianMatches = RuleMatcher.matchRules(ALL_SEED_RULES, observations, {
      traditions: ['INDIAN_SAMUDRIKA'],
    });
    assert.ok(indianMatches.every((m) => m.tradition === 'INDIAN_SAMUDRIKA'));
    assert.equal(indianMatches[0].rule.rule_id, 'samudrika-hridaya-guru-001');

    // Filter strictly to CHEIRO_SYSTEM
    const cheiroMatches = RuleMatcher.matchRules(ALL_SEED_RULES, observations, {
      traditions: ['CHEIRO_SYSTEM'],
    });
    assert.ok(cheiroMatches.every((m) => m.tradition === 'CHEIRO_SYSTEM'));
    assert.equal(cheiroMatches[0].rule.rule_id, 'cheiro-heart-jupiter-001');
  });

  test('4. Cross-Tradition Conflict / Variation Detection', () => {
    const observations = {
      HEART_LINE: {
        length: 'LONG',
        curvature: 'CURVED',
        termination: 'JUPITER',
      },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, observations);
    const conflicts = ConflictDetector.detectConflicts(matches);

    assert.ok(conflicts.has_cross_tradition_divergence, 'Should detect cross-tradition nuance');
    assert.ok(conflicts.traditions_present.includes('CHEIRO_SYSTEM'));
    assert.ok(conflicts.traditions_present.includes('INDIAN_SAMUDRIKA'));
    assert.ok(conflicts.divergent_points.length > 0);
  });

  test('5. No-Hallucination Policy: returns NO_SUPPORTED_RULE when no grounded rule exists', () => {
    const engine = new KnowledgeSearchEngine(ALL_SEED_RULES);
    const fictitiousObservations = {
      HEART_LINE: {
        length: 'ZIGZAG_TRIPLE_SPIRAL_UNKNOWN',
        termination: 'OUTER_SPACE',
      },
    };

    const response = engine.search({ features: fictitiousObservations });
    assert.equal(response.status, 'NO_SUPPORTED_RULE');
    assert.equal(response.total_matches, 0);
    assert.ok(response.message?.includes('No sufficiently supported traditional palmistry rule found'));
  });

  test('6. Source Citation Integrity: every matched rule preserves authentic book references', () => {
    const observations = {
      HEAD_LINE: {
        origin: 'SEPARATED_FROM_LIFE',
      },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, observations);
    assert.ok(matches.length > 0);
    const benhamRule = matches.find((m) => m.rule.rule_id === 'benham-head-separated-life-001');
    assert.ok(benhamRule, 'Should find Benham head line rule');

    assert.equal(benhamRule.source_citation.author, 'William G. Benham');
    assert.ok(benhamRule.source_citation.source_title.includes('The Laws of Scientific Hand Reading'));
    assert.ok(benhamRule.source_citation.excerpt.length > 20);
    assert.ok(benhamRule.source_citation.page_or_verse?.includes('258'));
  });

  test('7. Admin Curation: Quality validation rejects ungrounded rules and deterministic language', () => {
    // Attempt to validate a rule with deterministic wording
    const deterministicRule: any = {
      rule_id: 'invalid-rule-001',
      feature: 'HEART_LINE',
      tradition: 'CLASSICAL_WESTERN',
      conditions: [{ property: 'length', operator: 'equals', value: 'LONG' }],
      interpretation: {
        category: 'RELATIONSHIPS',
        traditional_statement: 'This proves that you will definitely marry a millionaire.',
        detailed_analysis: 'Invalid claim',
        traditional_keywords: ['invalid'],
      },
      evidence_type: 'SOURCE_DIRECT',
      source_refs: [],
    };

    const validation = AdminCurationService.validateRule(deterministicRule);
    assert.equal(validation.is_valid, false);
    assert.ok(validation.errors.some((e) => e.includes('Forbidden deterministic wording detected')));
    assert.ok(validation.errors.some((e) => e.includes('MUST cite at least one verified historical source')));
  });

  test('8. Rule Version Audit Trail: preserves prior version and log on review status update', () => {
    const rule = CHEIRO_SEED_RULES[0];
    const engine = new KnowledgeSearchEngine([rule]);

    const result = AdminCurationService.editRule({
      rule_id: rule.rule_id,
      updated_by: 'scholar_reviewer_1',
      change_reason: 'Refined English translation of Jupiterian generosity attributes',
      patch: { notes: ['Verified against 1894 London Edition page 58'] },
    });

    assert.ok(result.success);
    assert.equal(result.rule?.version, 2);
    assert.equal(result.rule?.version_history?.length, 1);
    assert.equal(result.rule?.version_history?.[0].updated_by, 'scholar_reviewer_1');
  });

  test('9. AI Reading Synthesis: produces structured grounded categories with citations', () => {
    const observations = {
      HEART_LINE: {
        length: 'LONG',
        curvature: 'CURVED',
        termination: 'JUPITER',
      },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, observations);
    const conflicts = ConflictDetector.detectConflicts(matches);

    const synthesis = PalmReadingSynthesisService.synthesize({
      reading_id: 'test-read-001',
      detected_features: observations,
      feature_confidences: { HEART_LINE: 0.92 },
      matched_rules: matches,
      conflicts,
    });

    assert.equal(synthesis.reading_id, 'test-read-001');
    assert.ok(synthesis.categories.length > 0);
    assert.ok(synthesis.disclaimer.includes('traditional Chiromancy and Samudrika Shastra'));
    
    const cat = synthesis.categories[0];
    assert.ok(cat.traditional_interpretation.startsWith('Traditional '));
    assert.ok(cat.sources.length > 0);
    assert.ok(cat.sources[0].excerpt.length > 10);
    assert.equal(cat.observations[0].confidence, 0.92);
  });

  test('10. Expanded Seed Rules: matches Thumb balance, Writer Fork, and Sun line', () => {
    const thumbObs = {
      THUMB: { proportions: 'BALANCED' },
      HEAD_LINE: { forks: 'PRESENT' },
      SUN_LINE: { strength: 'CLEAR' },
    };

    const matches = RuleMatcher.matchRules(ALL_SEED_RULES, thumbObs);
    assert.ok(matches.some((m) => m.rule.rule_id === 'samudrika-angustha-logic-will-006'));
    assert.ok(matches.some((m) => m.rule.rule_id === 'benham-head-fork-writer-006'));
    assert.ok(matches.some((m) => m.rule.rule_id === 'samudrika-surya-rekha-008'));
  });

  test('11. End-to-End Reading Pipeline: attaches real classical sources to reading sections', async () => {
    const { ReadingGenerationService } = await import('../src/services/ai/ReadingGenerationService.js');
    const mockAnalysis: any = {
      scanId: 'test-scan-001',
      hand: 'right',
      imageQualityScore: 0.9,
      lines: {
        heart: { detected: true, confidence: 0.9, length: 'long', curvature: 'deep_arc', continuity: 'continuous', name: 'Heart' },
        head: { detected: true, confidence: 0.88, length: 'long', curvature: 'moderate', continuity: 'continuous', name: 'Head' },
        life: { detected: true, confidence: 0.95, length: 'long', curvature: 'deep_arc', continuity: 'continuous', name: 'Life' },
      },
      mounts: [],
      handArchetype: 'Fire Hand',
      detectedTags: [],
    };

    const reading = await ReadingGenerationService.generateReading('test-scan-001', mockAnalysis);
    assert.equal(reading.scanId, 'test-scan-001');
    assert.ok(reading.sections.length > 0);

    const loveSection = reading.sections.find((s) => s.id === 'love');
    assert.ok(loveSection);
    assert.ok(loveSection.sources && loveSection.sources.length > 0, 'Love section must have classical sources');
    assert.ok(loveSection.sources.some((s) => s.sourceTitle.includes('Cheiro') || s.sourceTitle.includes('Samudrika')));
    assert.ok(loveSection.sources[0].excerpt.length > 10);
  });
});
