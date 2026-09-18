import React, { useState } from 'react';
import { Sparkles, Globe, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';

export interface FirstAccessModalProps {
  isOpen: boolean;
  onComplete: (name: string, langId: string) => void;
}

export const FirstAccessModal: React.FC<FirstAccessModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLanguage.id);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLanguage(selectedLang);
    onComplete(name.trim(), selectedLang);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(124, 58, 237, 0.25)',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid var(--border-active)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              color: 'var(--accent-lavender)',
              boxShadow: '0 0 24px rgba(124, 58, 237, 0.3)',
            }}
          >
            <Sparkles size={26} />
          </div>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Welcome to Kai RegAI
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}
          >
            Personalize your palmistry journey by selecting your native language and entering your name.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Language Selection */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--accent-lavender)',
                marginBottom: '8px',
              }}
            >
              <Globe size={14} />
              Preferred Language
            </label>

            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {availableLanguages.map((lang) => (
                <option key={lang.id} value={lang.id} style={{ backgroundColor: '#0B0F1F', color: '#fff' }}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--accent-lavender)',
                marginBottom: '8px',
              }}
            >
              <User size={14} />
              Your Name (Optional)
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Aarav, Priya (Defaults to Palm 1)"
              maxLength={30}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginTop: '6px',
                lineHeight: 1.3,
              }}
            >
              If left blank, this reading is safely saved as <strong>Palm 1</strong>. You can rename it anytime.
            </span>
          </div>

          {/* Submit Action */}
          <div style={{ marginTop: '8px' }}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight size={18} />}
            >
              Continue to Kai RegAI
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
