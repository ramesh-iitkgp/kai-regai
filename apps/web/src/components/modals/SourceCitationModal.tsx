import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { BookOpen, AlertCircle, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import type { SectionSourceCitation } from '../../types/contracts';

export interface SourceCitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  keyObservation: string;
  traditionalInterpretation: string;
  sources?: SectionSourceCitation[];
  divergenceNote?: string;
}

export const SourceCitationModal: React.FC<SourceCitationModalProps> = ({
  isOpen,
  onClose,
  sectionTitle,
  keyObservation,
  traditionalInterpretation,
  sources,
  divergenceNote,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Why Am I Seeing This?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {sectionTitle}
          </span>
          <Badge variant="gold" icon={<Sparkles size={11} />}>
            Source Grounded
          </Badge>
        </div>

        {/* 1. Physical Palm Observation */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <CheckCircle2 size={14} color="var(--accent-cyan)" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              Physical Palm Observation
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
            {keyObservation}
          </p>
        </div>

        {/* 2. Traditional Interpretation */}
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
            Traditional Interpretation
          </span>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {traditionalInterpretation}
          </p>
        </div>

        {/* 3. Cross-Tradition Divergence / Variation Notice */}
        {divergenceNote && (
          <div
            style={{
              padding: '10px 12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderLeft: '3px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <AlertCircle size={14} color="var(--accent-gold)" />
              <strong style={{ fontSize: '12px', color: 'var(--accent-gold-light)' }}>
                Notice of Traditional Variation
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              {divergenceNote}
            </p>
          </div>
        )}

        {/* 4. Verified Historical Sources List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <BookOpen size={14} color="var(--accent-gold-light)" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
              Historical Citations ({sources?.length || 0})
            </span>
          </div>

          {sources && sources.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sources.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <div>
                      <h5 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {src.sourceTitle}
                      </h5>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        by {src.author} • {src.reference}
                      </span>
                    </div>
                    <Badge variant="subtle">{src.tradition.replace('_', ' ')}</Badge>
                  </div>

                  {/* Historical Excerpt */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      marginTop: '6px',
                    }}
                  >
                    <Quote size={14} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0, lineHeight: 1.4 }}>
                      "{src.excerpt}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '12px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                Classical Western and Samudrika rules synthesize this feature combination.
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer Footer */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
            Grounding Note: Kai RegAI maps physical features directly to classical treatises. No reading makes deterministic predictions or scientific claims.
          </p>
        </div>
      </div>
    </Modal>
  );
};
