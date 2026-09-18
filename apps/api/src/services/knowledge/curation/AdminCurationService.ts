/**
 * Admin Knowledge Curation & Quality Verification Service for Kai RegAI.
 * 
 * Enforces human-in-the-loop review, quality checks, immutable version audits,
 * and lifecycle transitions (PENDING_REVIEW -> APPROVED / REJECTED).
 */

import { KnowledgeRule, RuleStatus } from '../ontology/RuleSchema.js';
import { knowledgeSearchEngine } from '../engine/KnowledgeSearchEngine.js';

export interface QualityValidationResult {
  is_valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface RuleEditPayload {
  rule_id: string;
  updated_by: string;
  change_reason: string;
  patch: Partial<KnowledgeRule>;
}

export class AdminCurationService {
  /**
   * Run strict quality checks on any rule candidate before promotion.
   */
  public static validateRule(rule: Partial<KnowledgeRule>): QualityValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Mandatory Fields
    if (!rule.rule_id || rule.rule_id.trim() === '') {
      errors.push('Rule ID is mandatory.');
    }
    if (!rule.feature || rule.feature.trim() === '') {
      errors.push('Associated palm feature code is mandatory.');
    }
    if (!rule.tradition || rule.tradition.trim() === '') {
      errors.push('Tradition classification is mandatory.');
    }

    // 2. Conditions check
    if (!rule.conditions || rule.conditions.length === 0) {
      errors.push('Rule must specify at least one property condition.');
    }

    // 3. Interpretation check
    if (!rule.interpretation || !rule.interpretation.traditional_statement) {
      errors.push('Rule interpretation traditional statement is mandatory.');
    } else {
      // Check for forbidden deterministic or scientific claim words
      const lowerStmt = rule.interpretation.traditional_statement.toLowerCase();
      const forbiddenTerms = ['proves that', 'scientifically predicts', 'guarantees that', 'you will definitely'];
      for (const term of forbiddenTerms) {
        if (lowerStmt.includes(term)) {
          errors.push(`Forbidden deterministic wording detected: "${term}". Use non-deterministic traditional framing.`);
        }
      }
    }

    // 4. Source Citation check (Zero-Tolerance for unsourced rules claiming to be classical)
    if (!rule.source_refs || rule.source_refs.length === 0) {
      if (rule.evidence_type === 'SOURCE_DIRECT' || rule.evidence_type === 'SOURCE_DERIVED') {
        errors.push('SOURCE_DIRECT and SOURCE_DERIVED rules MUST cite at least one verified historical source.');
      } else {
        warnings.push('Rule lacks verified source reference citation.');
      }
    }

    // 5. Evidence Type Guard
    if (rule.evidence_type === 'AI_DERIVED') {
      warnings.push('AI_DERIVED rules require explicit expert human review before promotion to ACTIVE.');
    }

    return {
      is_valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Updates an existing rule with full audit version history.
   */
  public static editRule(payload: RuleEditPayload): { success: boolean; rule?: KnowledgeRule; error?: string } {
    const existing = knowledgeSearchEngine.getRule(payload.rule_id);
    if (!existing) {
      return { success: false, error: `Rule not found: ${payload.rule_id}` };
    }

    const newVersionNumber = (existing.version || 1) + 1;
    const now = new Date().toISOString();

    const versionEntry = {
      version: existing.version,
      updated_by: payload.updated_by,
      change_reason: payload.change_reason,
      timestamp: now,
    };

    const updatedRule: KnowledgeRule = {
      ...existing,
      ...payload.patch,
      version: newVersionNumber,
      version_history: [...(existing.version_history || []), versionEntry],
      updated_at: now,
    };

    // Re-validate updated rule
    const validation = AdminCurationService.validateRule(updatedRule);
    if (!validation.is_valid) {
      return { success: false, error: `Validation failed: ${validation.errors.join('; ')}` };
    }

    knowledgeSearchEngine.updateRule(updatedRule);
    return { success: true, rule: updatedRule };
  }

  /**
   * Approve or reject a candidate rule in the curation queue.
   */
  public static reviewRule(
    ruleId: string,
    action: 'APPROVE' | 'REJECT' | 'DISABLE',
    reviewer: string,
    notes?: string
  ): { success: boolean; rule?: KnowledgeRule; error?: string } {
    const existing = knowledgeSearchEngine.getRule(ruleId);
    if (!existing) {
      return { success: false, error: `Rule not found: ${ruleId}` };
    }

    let nextStatus: RuleStatus;
    switch (action) {
      case 'APPROVE':
        nextStatus = 'ACTIVE';
        break;
      case 'REJECT':
        nextStatus = 'REJECTED';
        break;
      case 'DISABLE':
        nextStatus = 'DISABLED';
        break;
    }

    return AdminCurationService.editRule({
      rule_id: ruleId,
      updated_by: reviewer,
      change_reason: `Status transition to ${nextStatus}${notes ? `: ${notes}` : ''}`,
      patch: { status: nextStatus },
    });
  }

  /**
   * Returns list of rules awaiting human review.
   */
  public static getReviewQueue(): KnowledgeRule[] {
    return knowledgeSearchEngine
      .getAllRules()
      .filter((r) => r.status === 'PENDING_REVIEW');
  }
}
