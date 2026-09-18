import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, X, Check } from 'lucide-react';

export const LanguageSuggestionBanner: React.FC = () => {
  const { suggestedLanguage, setLanguage, dismissSuggestion } = useLanguage();

  if (!suggestedLanguage) return null;

  return (
    <div
      style={{
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Globe size={16} color="var(--accent-cyan)" />
        <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
          View in {suggestedLanguage.nativeName} ({suggestedLanguage.name})?
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => setLanguage(suggestedLanguage.id)}
          style={{
            backgroundColor: 'var(--accent-cyan)',
            color: '#080B11',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Check size={12} strokeWidth={3} />
          <span>Switch / ಬದಲಾಯಿಸಿ / बदलें</span>
        </button>

        <button
          onClick={dismissSuggestion}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
