import React, { useState } from 'react';
import { ArrowRight, User, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../types/LanguageRegistry';
import type { HandType } from '../../types/contracts';

export interface WelcomeScreenProps {
  onStartScan: (hand: HandType, name: string) => void;
  onOpenDisclaimer: () => void;
  onOpenPrivacy: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartScan,
  onOpenDisclaimer,
  onOpenPrivacy,
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('kai_user_name') || '');
  const [selectedHand, setSelectedHand] = useState<HandType>('right');

  const handleBegin = () => {
    const finalName = userName.trim() || 'Palm 1';
    localStorage.setItem('kai_user_name', finalName);
    localStorage.setItem('kai_user_profile_initialized', 'true');
    onStartScan(selectedHand, finalName);
  };

  return (
    <div
      style={{
        padding: '24px 20px 80px',
        maxWidth: '520px',
        margin: '0 auto',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(124, 58, 237, 0.16)',
            border: '2px solid rgba(167, 139, 250, 0.4)',
            boxShadow: '0 0 24px rgba(124, 58, 237, 0.35)',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '28px', color: '#DDD6FE', fontWeight: 700 }}>கை</span>
        </div>

        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 60%, #C4B5FD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 6px',
          }}
        >
          {t('welcome.title', 'Welcome to Kai RegAI')}
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            maxWidth: '420px',
            margin: '0 auto',
          }}
        >
          {t('welcome.subtitle', 'Discover the classical reflections held in your palm with modern AI.')}
        </p>
      </div>

      {/* Language Selection Section */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 16px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            🌐 {t('welcome.chooseLanguage', 'Choose Your Language / மொழியைத் தேர்ந்தெடுக்கவும்')}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--accent-lavender-warm)', fontWeight: 600 }}>
            {currentLanguage.nativeName}
          </span>
        </div>

        {/* 12 Indian Languages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}
        >
          {Object.values(SUPPORTED_LANGUAGES).map((lang) => {
            const isSelected = currentLanguage.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                style={{
                  padding: '10px 6px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid #8B5CF6' : '1px solid var(--border-medium)',
                  backgroundColor: isSelected ? 'rgba(124, 58, 237, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                  boxShadow: isSelected ? '0 0 12px rgba(124, 58, 237, 0.3)' : 'none',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700 }}>
                  {lang.nativeName}
                </span>
                <span style={{ fontSize: '10px', color: isSelected ? '#DDD6FE' : 'var(--text-muted)' }}>
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Name & Hand Selection Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 16px',
          marginBottom: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Name input */}
        <div>
          <label
            htmlFor="user-name-input"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              marginBottom: '6px',
            }}
          >
            <User size={13} color="var(--accent-lavender)" />
            <span>{t('firstAccess.nameLabel', 'Your Name (Optional)')}</span>
          </label>
          <input
            id="user-name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t('firstAccess.namePlaceholder', 'e.g., Aarav, Priya (Defaults to Palm 1)')}
            style={{
              width: '100%',
              padding: '10px 14px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Hand Selection */}
        <div>
          <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {t('handSelect.stepTitle', 'Choose Hand to Read')}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => setSelectedHand('right')}
              style={{
                padding: '12px 10px',
                borderRadius: 'var(--radius-sm)',
                border: selectedHand === 'right' ? '2px solid #8B5CF6' : '1px solid var(--border-medium)',
                backgroundColor: selectedHand === 'right' ? 'rgba(124, 58, 237, 0.18)' : 'var(--bg-surface-elevated)',
                color: selectedHand === 'right' ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '24px' }}>✋</span>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>Right Palm</span>
              <span style={{ fontSize: '10px', color: 'var(--accent-lavender)' }}>Karma / Active</span>
            </button>

            <button
              onClick={() => setSelectedHand('left')}
              style={{
                padding: '12px 10px',
                borderRadius: 'var(--radius-sm)',
                border: selectedHand === 'left' ? '2px solid #8B5CF6' : '1px solid var(--border-medium)',
                backgroundColor: selectedHand === 'left' ? 'rgba(124, 58, 237, 0.18)' : 'var(--bg-surface-elevated)',
                color: selectedHand === 'left' ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '24px', transform: 'scaleX(-1)' }}>✋</span>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>Left Palm</span>
              <span style={{ fontSize: '10px', color: 'var(--accent-lavender)' }}>Innate Potential</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleBegin}
        style={{
          padding: '16px 24px',
          fontSize: '15px',
          fontWeight: 800,
          background: 'var(--cta-bg)',
          boxShadow: 'var(--cta-shadow)',
          border: '1px solid rgba(196, 181, 253, 0.3)',
          color: '#FFFFFF',
        }}
      >
        <span>✋ {t('welcome.startBtn', 'Begin Your Reading')}</span>
        <ArrowRight size={18} style={{ marginLeft: '6px' }} />
      </Button>

      {/* Trust & Privacy Notice */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        <ShieldCheck size={14} color="var(--accent-emerald)" />
        <span>100% Private • Scan erased on exit • Traditional Samudrika Shastra</span>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>
        <button
          onClick={onOpenDisclaimer}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', padding: '0 4px' }}
        >
          Disclaimer
        </button>
        <span style={{ color: 'var(--text-muted)' }}>•</span>
        <button
          onClick={onOpenPrivacy}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', padding: '0 4px' }}
        >
          Privacy Policy
        </button>
      </div>
    </div>
  );
};
