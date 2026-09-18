import { Info, ShieldCheck, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface HeaderProps {
  onOpenDisclaimer?: () => void;
  onOpenPrivacy?: () => void;
  onOpenAdmin?: () => void;
  onOpenLanguage?: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDisclaimer,
  onOpenPrivacy,
  onOpenAdmin,
  onOpenLanguage,
  onReset,
}) => {
  const { currentLanguage, t } = useLanguage();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: 'rgba(8, 11, 17, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        onClick={onReset}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: onReset ? 'pointer' : 'default',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#080B11',
            fontWeight: 800,
            fontSize: '18px',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)',
          }}
        >
          கை
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Kai RegAI
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--accent-cyan)',
                background: 'rgba(56, 189, 248, 0.12)',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.25)',
              }}
            >
              AI
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {t('nav.tagline', 'Traditional Palmistry')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Native Language Selector Button */}
        {onOpenLanguage && (
          <button
            onClick={onOpenLanguage}
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.15s ease',
            }}
            title="Change Language / भाषा बदलें"
          >
            <Globe size={13} />
            <span>{currentLanguage.nativeName}</span>
            <span style={{ fontSize: '10px', opacity: 0.7 }}>▾</span>
          </button>
        )}

        {/* Scholar Sources Portal */}
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: 'var(--accent-gold-light)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Classical Palmistry Sources"
          >
            <BookOpen size={13} />
            <span>{t('nav.sources', 'Sources')}</span>
          </button>
        )}

        {/* Disclaimer Notice */}
        {onOpenDisclaimer && (
          <button
            onClick={onOpenDisclaimer}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '12px',
              padding: '6px 6px',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Traditional interpretation notice"
          >
            <Info size={15} />
            <span>{t('nav.notice', 'Notice')}</span>
          </button>
        )}

        {/* Privacy Purge Info */}
        {onOpenPrivacy && (
          <button
            onClick={onOpenPrivacy}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px 6px',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Privacy & Storage"
          >
            <ShieldCheck size={16} />
          </button>
        )}
      </div>
    </header>
  );
};
