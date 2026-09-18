/**
 * Knowledge Engine REST API Routes for Kai RegAI.
 * 
 * Provides decoupled endpoints for web, admin dashboard, and future native Android/iOS apps.
 */

import { Router, Request, Response } from 'express';
import { PALM_FEATURES } from '../services/knowledge/ontology/FeatureTaxonomy.js';
import { TRADITIONS } from '../services/knowledge/ontology/TraditionRegistry.js';
import { sourceRegistry } from '../services/knowledge/sources/SourceRegistry.js';
import { knowledgeSearchEngine, KnowledgeSearchRequest } from '../services/knowledge/engine/KnowledgeSearchEngine.js';
import { PalmReadingSynthesisService, SynthesisRequest } from '../services/knowledge/synthesis/PalmReadingSynthesisService.js';
import { AdminCurationService } from '../services/knowledge/curation/AdminCurationService.js';

const router = Router();

// 1. Palm Feature Taxonomy
router.get('/taxonomy', (_req: Request, res: Response) => {
  res.json({
    total_features: Object.keys(PALM_FEATURES).length,
    features: PALM_FEATURES,
  });
});

// 2. Palmistry Traditions
router.get('/traditions', (_req: Request, res: Response) => {
  res.json({
    total_traditions: Object.keys(TRADITIONS).length,
    traditions: TRADITIONS,
  });
});

// 3. Classical Source Registry
router.get('/sources', (_req: Request, res: Response) => {
  const sources = sourceRegistry.getAllSources();
  res.json({
    total_sources: sources.length,
    sources,
  });
});

// 4. Structured & Semantic Knowledge Search (Section 16)
router.post('/search', (req: Request, res: Response) => {
  try {
    const searchReq: KnowledgeSearchRequest = {
      traditions: req.body.traditions,
      categories: req.body.categories,
      features: req.body.features || {},
      query_text: req.body.query_text,
      min_relevance: req.body.min_relevance,
    };

    const result = knowledgeSearchEngine.search(searchReq);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Search execution failed' });
  }
});

// 4b. Conversational "Ask Kai" Classical Knowledge Retrieval
router.post('/ask-kai', (req: Request, res: Response) => {
  try {
    const {
      question,
      hand = 'right',
      handArchetype = 'Balanced Hand',
      lines = {},
      traditionFilter = 'ALL',
    } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'A valid question string is required.' });
      return;
    }

    const qLower = question.toLowerCase();

    // 1. Identify crease of focus if mentioned
    let creaseTarget: 'heart' | 'head' | 'life' | 'fate' | null = null;

    if (qLower.includes('heart') || qLower.includes('love') || qLower.includes('emotion') || qLower.includes('romance') || qLower.includes('hridaya')) {
      creaseTarget = 'heart';
    } else if (qLower.includes('head') || qLower.includes('mind') || qLower.includes('intellect') || qLower.includes('logic') || qLower.includes('matru')) {
      creaseTarget = 'head';
    } else if (qLower.includes('life') || qLower.includes('vitality') || qLower.includes('health') || qLower.includes('ayur') || qLower.includes('energy') || qLower.includes('longevity')) {
      creaseTarget = 'life';
    } else if (qLower.includes('fate') || qLower.includes('career') || qLower.includes('destiny') || qLower.includes('karma') || qLower.includes('job') || qLower.includes('money') || qLower.includes('success')) {
      creaseTarget = 'fate';
    }

    // 2. Filter traditions if requested
    const traditions = traditionFilter === 'ALL'
      ? undefined
      : [traditionFilter];

    // 3. Search knowledge base
    const searchRes = knowledgeSearchEngine.search({
      query_text: question,
      traditions,
      features: {},
    });

    const topMatches = searchRes.status === 'SUCCESS' ? searchRes.matches.slice(0, 3) : [];

    // Compile citations from verified classical texts
    const citations = topMatches.map((m) => {
      const isSamudrika = m.tradition === 'SAMUDRIKA_SHASTRA' || m.tradition === 'INDIAN_SAMUDRIKA';
      const isCheiro = m.tradition === 'CHEIRO_SYSTEM';

      const traditionName = isSamudrika
        ? 'Brihat Samudrika Shastra'
        : isCheiro
        ? "Cheiro's Language of the Hand (1894)"
        : 'The Laws of Scientific Hand Reading (1900)';

      const badge = isSamudrika
        ? '📜 Brihat Samudrika Shastra'
        : isCheiro
        ? "📖 Cheiro (1894)"
        : '🔬 Benham (1900)';

      return {
        tradition: m.tradition,
        source_title: m.source_citation.source_title || traditionName,
        author: m.source_citation.author,
        chapter: m.source_citation.chapter,
        page_or_verse: m.source_citation.page_or_verse,
        excerpt: m.source_citation.excerpt,
        badge,
        headline: m.rule.interpretation.headline,
      };
    });

    // 4. Synthesize direct grounded conversational explanation
    let reply = '';
    const lineData = creaseTarget ? (lines as Record<string, any>)[creaseTarget] : null;

    if (creaseTarget && lineData) {
      const lineName = creaseTarget === 'heart' ? 'Heart Line (Hridaya Rekha)' :
        creaseTarget === 'head' ? 'Head Line (Matru Rekha)' :
        creaseTarget === 'life' ? 'Life Line (Ayur Rekha)' : 'Fate Line (Karma Rekha)';

      reply += `On your ${hand} palm, Kai observes that your **${lineName}** exhibits a ${lineData.length || 'well-formed'} trajectory with ${lineData.curvature || 'balanced'} curvature. `;
    } else if (qLower.includes('shape') || qLower.includes('archetype') || qLower.includes('element')) {
      reply += `Your hand demonstrates an **${handArchetype}** structure. `;
    }

    if (topMatches.length > 0) {
      const primary = topMatches[0];
      reply += `${primary.rule.interpretation.detailed_analysis} `;
      if (topMatches.length > 1 && topMatches[1].tradition !== primary.tradition) {
        reply += `Cross-tradition comparison: While ${primary.source_citation.author} emphasizes ${primary.rule.interpretation.traditional_keywords.slice(0, 2).join(' and ')}, ${topMatches[1].source_citation.author} adds that ${topMatches[1].rule.interpretation.traditional_statement}`;
      }
    } else {
      reply += `Based on classical principles from Brihat Samudrika Shastra, Cheiro (1894), and William G. Benham (1900), your palm features reflect purposeful self-direction and balanced mental equilibrium. Every line in traditional palmistry is viewed as an instrument for self-reflection rather than rigid fatalism.`;
    }

    // 5. Contextual follow-ups
    const suggestedFollowUps: string[] = [];
    if (creaseTarget !== 'heart') suggestedFollowUps.push('What does Cheiro say about my heart line?');
    if (creaseTarget !== 'head') suggestedFollowUps.push('How does Benham interpret my head line slope?');
    if (creaseTarget !== 'life') suggestedFollowUps.push('What does Samudrika Shastra say about my vitality (Ayur Rekha)?');
    if (creaseTarget !== 'fate') suggestedFollowUps.push('What does my fate line reveal about career timing?');
    suggestedFollowUps.push('Compare Eastern Samudrika vs Western Cheiro on my hand archetype');

    res.json({
      status: 'SUCCESS',
      reply: reply.trim(),
      creaseToInspect: creaseTarget,
      citations,
      conflicts: searchRes.conflicts,
      suggestedFollowUps: suggestedFollowUps.slice(0, 4),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Ask Kai query failed' });
  }
});

// 5. AI Synthesis Layer Endpoint (Section 18)
router.post('/synthesize', (req: Request, res: Response) => {
  try {
    const synthReq: SynthesisRequest = {
      reading_id: req.body.reading_id,
      detected_features: req.body.detected_features || {},
      feature_confidences: req.body.feature_confidences,
      matched_rules: req.body.matched_rules || [],
      conflicts: req.body.conflicts,
      selected_traditions: req.body.selected_traditions,
    };

    const reading = PalmReadingSynthesisService.synthesize(synthReq);
    res.json(reading);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Synthesis execution failed' });
  }
});

// 6. List All Rules
router.get('/rules', (req: Request, res: Response) => {
  const { feature, tradition, status } = req.query;
  let rules = knowledgeSearchEngine.getAllRules();

  if (feature) {
    rules = rules.filter((r) => r.feature === String(feature));
  }
  if (tradition) {
    rules = rules.filter((r) => r.tradition === String(tradition));
  }
  if (status) {
    rules = rules.filter((r) => r.status === String(status));
  }

  res.json({
    total_rules: rules.length,
    rules,
  });
});

// 7. Admin Curation: Submit Rule with Quality Validation
router.post('/rules', (req: Request, res: Response) => {
  const candidate = req.body;
  const validation = AdminCurationService.validateRule(candidate);

  if (!validation.is_valid) {
    res.status(422).json({
      error: 'Rule validation failed',
      details: validation.errors,
      warnings: validation.warnings,
    });
    return;
  }

  const newRule = {
    ...candidate,
    version: 1,
    status: candidate.status || 'PENDING_REVIEW',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  knowledgeSearchEngine.addRule(newRule);
  res.status(201).json({
    message: 'Rule submitted successfully',
    warnings: validation.warnings,
    rule: newRule,
  });
});

// 8. Admin Review: Approve / Reject / Disable Rule
router.patch('/rules/:ruleId/status', (req: Request, res: Response) => {
  const ruleId = Array.isArray(req.params.ruleId) ? req.params.ruleId[0] : req.params.ruleId;
  const { action, reviewer, notes } = req.body;

  if (!action || !['APPROVE', 'REJECT', 'DISABLE'].includes(action)) {
    res.status(400).json({ error: 'Valid action (APPROVE, REJECT, DISABLE) is required.' });
    return;
  }

  const result = AdminCurationService.reviewRule(ruleId, action, reviewer || 'admin', notes);
  if (!result.success) {
    res.status(404).json({ error: result.error });
    return;
  }

  res.json({ message: `Rule ${ruleId} updated to ${result.rule?.status}`, rule: result.rule });
});

// 9. Admin Review Queue
router.get('/review-queue', (_req: Request, res: Response) => {
  const queue = AdminCurationService.getReviewQueue();
  res.json({
    pending_count: queue.length,
    queue,
  });
});

export default router;
