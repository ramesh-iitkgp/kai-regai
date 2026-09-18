/**
 * Source Registry for Kai RegAI Knowledge Engine.
 * 
 * Manages verified, legally cleared classical palmistry texts, manuals, and traditional scriptures.
 * Preserves bibliographic citations, copyright status, and historical attribution.
 */

export type SourceType =
  | 'BOOK'
  | 'ARTICLE'
  | 'REFERENCE'
  | 'MANUAL'
  | 'TRADITIONAL_TEXT'
  | 'ADMIN_CURATED_RULE';

export type CopyrightStatus =
  | 'PUBLIC_DOMAIN'          // Pre-1929 published works or ancient historical manuscripts
  | 'CREATIVE_COMMONS'
  | 'PROPRIETARY_LICENSED'
  | 'RESTRICTED_CITATION_ONLY'; // Max ~50-word fair use citations

export type IngestionStatus =
  | 'PLANNED'
  | 'EXTRACTED'
  | 'VERIFIED'
  | 'ACTIVE';

export interface PalmistrySource {
  source_id: string;
  title: string;
  author: string;
  publication_year: number;
  edition?: string;
  tradition: string; // References Tradition code
  language: string;
  source_type: SourceType;
  copyright_status: CopyrightStatus;
  license_status: string;
  origin: string;
  ingestion_status: IngestionStatus;
  canonical_url?: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SourcePassage {
  passage_id: string;
  source_id: string;
  chapter: string;
  section?: string;
  page_number?: number;
  verse_or_ref?: string;
  original_text: string;
  cleaned_text: string;
  hash: string;
}

/**
 * Authentic Historical Source Registry.
 * All listed sources are either historical public domain texts (pre-1928) or ancient traditional scriptures.
 */
export const SOURCE_REGISTRY: Record<string, PalmistrySource> = {
  'cheiro-language-of-hand-1894': {
    source_id: 'cheiro-language-of-hand-1894',
    title: "Cheiro's Language of the Hand: Complete Practical Work on the Sciences of Cheirognomy and Chiromancy",
    author: 'Cheiro (William John Warner, Count Louis Hamon)',
    publication_year: 1894,
    edition: '1st Illustrated London Edition',
    tradition: 'CHEIRO_SYSTEM',
    language: 'English',
    source_type: 'BOOK',
    copyright_status: 'PUBLIC_DOMAIN',
    license_status: 'Public Domain worldwide (Author deceased 1936, published 1894)',
    origin: 'London: Nichols & Co. / New York: Rand, McNally & Co.',
    ingestion_status: 'VERIFIED',
    description: 'The foundational 19th-century synthesis of Indian palmistry lessons learned from Joshi Brahmins in Maharashtra, adapted for Western character analysis.',
    created_at: '2026-09-18T00:00:00Z',
    updated_at: '2026-09-18T00:00:00Z',
  },
  'benham-laws-hand-reading-1900': {
    source_id: 'benham-laws-hand-reading-1900',
    title: 'The Laws of Scientific Hand Reading: A Practical Treatise on the Art Commonly Called Palmistry',
    author: 'William G. Benham',
    publication_year: 1900,
    edition: 'G.P. Putnam\'s Sons Illustrated Edition',
    tradition: 'CLASSICAL_WESTERN',
    language: 'English',
    source_type: 'BOOK',
    copyright_status: 'PUBLIC_DOMAIN',
    license_status: 'Public Domain worldwide (Published 1900)',
    origin: 'New York & London: G.P. Putnam\'s Sons, The Knickerbocker Press',
    ingestion_status: 'VERIFIED',
    description: 'Regarded as the most rigorous and analytical Western palmistry manual, focusing on anatomical line quality, depth, mount prominence, and psychological temperament.',
    created_at: '2026-09-18T00:00:00Z',
    updated_at: '2026-09-18T00:00:00Z',
  },
  'samudrika-shastra-classical': {
    source_id: 'samudrika-shastra-classical',
    title: 'Brihat Samudrika Shastra & Hastha Sanjeevani (Classical Sanskrit & Tamil Aphorisms)',
    author: 'Traditional Rishis (Attributed to Sage Garga, Narada, and Tamil Siddhars)',
    publication_year: 1200,
    edition: 'Classical Sanskrit Manuscripts / Varanasi Chaukhambha Recension',
    tradition: 'INDIAN_SAMUDRIKA',
    language: 'Sanskrit & Tamil',
    source_type: 'TRADITIONAL_TEXT',
    copyright_status: 'PUBLIC_DOMAIN',
    license_status: 'Ancient Classical Heritage (Public Domain)',
    origin: 'Ancient Indian Subcontinent',
    ingestion_status: 'VERIFIED',
    description: 'Foundational Vedic and Siddha bodily divination treatises outlining the planetary mounts (Navagraha Parvatas), karmic hand divisions, and auspicious line formations.',
    created_at: '2026-09-18T00:00:00Z',
    updated_at: '2026-09-18T00:00:00Z',
  },
};

export class SourceRegistryService {
  private sources: Map<string, PalmistrySource> = new Map();

  constructor() {
    Object.values(SOURCE_REGISTRY).forEach((src) => {
      this.sources.set(src.source_id, src);
    });
  }

  public getAllSources(): PalmistrySource[] {
    return Array.from(this.sources.values());
  }

  public getSource(sourceId: string): PalmistrySource | undefined {
    return this.sources.get(sourceId);
  }

  public registerSource(source: PalmistrySource): PalmistrySource {
    const updated = {
      ...source,
      created_at: source.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.sources.set(updated.source_id, updated);
    return updated;
  }
}

export const sourceRegistry = new SourceRegistryService();
