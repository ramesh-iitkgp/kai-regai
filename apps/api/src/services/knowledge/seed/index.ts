/**
 * Seed Knowledge Repository Aggregator for Kai RegAI.
 * Combines verified classical seed rules across Cheiro, Benham, and Samudrika traditions.
 */

import { KnowledgeRule } from '../ontology/RuleSchema.js';
import { CHEIRO_SEED_RULES } from './cheiro-rules.js';
import { BENHAM_SEED_RULES } from './benham-rules.js';
import { SAMUDRIKA_SEED_RULES } from './samudrika-rules.js';

export const ALL_SEED_RULES: KnowledgeRule[] = [
  ...CHEIRO_SEED_RULES,
  ...BENHAM_SEED_RULES,
  ...SAMUDRIKA_SEED_RULES,
];
