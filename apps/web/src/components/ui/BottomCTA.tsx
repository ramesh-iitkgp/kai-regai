import React from 'react';
import { Button } from './Button';
import { Sparkles, ShieldCheck } from 'lucide-react';

export interface BottomCTAProps {
  headline?: string;
  subtext?: string;
  price?: string;
  ctaText: string;
  onAction: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  headline,
  subtext = 'Instant • Private • AI-Powered',
  price = '₹10',
  ctaText,
  onAction,
  isLoading = false,
  disabled = false,
  icon = <Sparkles size={18} />,
}) => {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(8, 11, 17, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-medium)',
        padding: '12px 18px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          {headline && (
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {headline}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={13} color="var(--accent-emerald)" />
            <span>{subtext}</span>
          </div>
        </div>

        {price && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', lineHeight: 1 }}>
              Only
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold-light)', lineHeight: 1.2 }}>
              {price}
            </span>
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onAction}
        isLoading={isLoading}
        disabled={disabled}
        leftIcon={icon}
      >
        {ctaText}
      </Button>
    </div>
  );
};
