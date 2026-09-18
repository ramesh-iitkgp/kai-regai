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
