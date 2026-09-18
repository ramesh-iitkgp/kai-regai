import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { HandType } from '../../types/contracts';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface HandSelectionProps {
  selectedHand: HandType;
  onSelectHand: (hand: HandType) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const HandSelection: React.FC<HandSelectionProps> = ({
  selectedHand,
  onSelectHand,
  onConfirm,
  onBack,
}) => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '24px 20px 120px', minHeight: '80vh', display: 'flex', flexDirection: 'column', maxWidth: '520px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          cursor: 'pointer',
          padding: '4px 0',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={18} />
        <span>{t('handSelect.backBtn', 'Back')}</span>
      </button>

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent-lavender-warm)',
            fontWeight: 700,
          }}
        >
          Step 1 of 3
        </span>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
          {t('handSelect.title', 'Choose Which Hand to Read')}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
          {t('handSelect.subtitle', 'In traditional palmistry, each hand reflects a distinct dimension of your life story.')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
        {/* RIGHT HAND */}
        <div
          onClick={() => onSelectHand('right')}
          style={{
            borderRadius: 'var(--radius-lg)',
            border: selectedHand === 'right' ? '2.5px solid #8B5CF6' : '1px solid var(--border-medium)',
            backgroundColor: selectedHand === 'right' ? 'rgba(124, 58, 237, 0.16)' : 'var(--bg-surface)',
            boxShadow: selectedHand === 'right' ? '0 0 24px rgba(124, 58, 237, 0.35), inset 0 0 12px rgba(124, 58, 237, 0.12)' : 'none',
            padding: '20px 14px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          {selectedHand === 'right' && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px #7C3AED',
              }}
            >
              <Check size={14} strokeWidth={3} />
            </div>
          )}

          <div style={{ fontSize: '44px', marginBottom: '10px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
            ✋
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('handSelect.rightTitle', 'Right Palm')}
          </h3>
          <span style={{ fontSize: '11px', color: selectedHand === 'right' ? 'var(--accent-lavender-warm)' : 'var(--text-muted)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
            Karma / Active
          </span>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.3 }}>
            {t('handSelect.rightDesc', 'Reflects your conscious decisions, career focus, and outward life journey.')}
          </p>

          {selectedHand === 'right' && (
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#DDD6FE', backgroundColor: 'rgba(124, 58, 237, 0.35)', padding: '3px 10px', borderRadius: '12px' }}>
                Selected ✓
              </span>
            </div>
          )}
        </div>

        {/* LEFT HAND */}
        <div
          onClick={() => onSelectHand('left')}
          style={{
            borderRadius: 'var(--radius-lg)',
            border: selectedHand === 'left' ? '2.5px solid #8B5CF6' : '1px solid var(--border-medium)',
            backgroundColor: selectedHand === 'left' ? 'rgba(124, 58, 237, 0.16)' : 'var(--bg-surface)',
            boxShadow: selectedHand === 'left' ? '0 0 24px rgba(124, 58, 237, 0.35), inset 0 0 12px rgba(124, 58, 237, 0.12)' : 'none',
            padding: '20px 14px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          {selectedHand === 'left' && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px #7C3AED',
              }}
            >
              <Check size={14} strokeWidth={3} />
            </div>
          )}

          <div style={{ fontSize: '44px', marginBottom: '10px', transform: 'scaleX(-1)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
            ✋
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('handSelect.leftTitle', 'Left Palm')}
          </h3>
          <span style={{ fontSize: '11px', color: selectedHand === 'left' ? 'var(--accent-lavender-warm)' : 'var(--text-muted)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
            Prarabdha / Innate
          </span>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.3 }}>
            {t('handSelect.leftDesc', 'Reflects innate strengths, emotional instincts, and inner potential.')}
          </p>

          {selectedHand === 'left' && (
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#DDD6FE', backgroundColor: 'rgba(124, 58, 237, 0.35)', padding: '3px 10px', borderRadius: '12px' }}>
                Selected ✓
              </span>
            </div>
          )}
        </div>
      </div>

      <Card variant="glass" style={{ padding: '14px', marginBottom: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Sparkles size={18} color="var(--accent-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong>Kai RegAI:</strong> In classical Samudrika Shastra, the dominant hand mirrors active karma, while the non-dominant hand reveals innate potential.
          </p>
        </div>
      </Card>

      <div style={{ marginTop: '30px' }}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onConfirm}
        >
          {t('handSelect.confirmBtn', 'Continue with Selected Hand')}
        </Button>
      </div>
    </div>
  );
};
