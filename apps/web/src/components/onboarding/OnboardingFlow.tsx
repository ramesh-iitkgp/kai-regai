import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Heart, Briefcase, Coins, Brain, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export interface OnboardingFlowProps {
  onComplete: (selectedInterests: string[]) => void;
  onSkip: () => void;
  onBack?: () => void;
}

const INTEREST_OPTIONS = [
  { id: 'love', label: 'Love & Relationships', icon: Heart, color: '#F43F5E' },
  { id: 'career', label: 'Career & Ambition', icon: Briefcase, color: '#8B5CF6' },
  { id: 'money', label: 'Money & Abundance', icon: Coins, color: '#10B981' },
  { id: 'personality', label: 'Innate Personality', icon: Brain, color: '#38BDF8' },
  { id: 'life', label: 'Life Themes & Vitality', icon: Compass, color: '#F59E0B' },
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onSkip,
  onBack,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'love',
    'career',
    'personality',
  ]);

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else if (onBack) {
      onBack();
    }
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px',
        maxWidth: '440px',
        margin: '0 auto',
      }}
    >
      {/* Top Stepper Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '13px',
            cursor: 'pointer',
            padding: '4px 0',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={16} />
          <span>{t('common.back', 'Back')}</span>
        </button>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === step ? '28px' : '8px',
                height: '4px',
                borderRadius: '4px',
                backgroundColor: i === step ? 'var(--accent-primary)' : 'var(--border-medium)',
                transition: 'all var(--transition-normal)',
              }}
            />
          ))}
        </div>

        {step < 3 ? (
          <button
            onClick={onSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {t('common.skip', 'Skip')}
          </button>
        ) : (
          <div style={{ width: '40px' }} />
        )}
      </div>

      {/* Screen 1: Welcome */}
      {step === 1 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.08) 100%)',
              border: '1px solid var(--border-active)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 32px rgba(124, 58, 237, 0.25)',
            }}
          >
            <span style={{ fontSize: '38px' }}>✋</span>
          </div>

          <h2
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.25,
            }}
          >
            Welcome to Kai RegAI
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              maxWidth: '320px',
              margin: '0 auto',
            }}
          >
            Your palm has a story. Let's explore what traditional wisdom and vision AI reveal together.
          </p>
        </div>
      )}

      {/* Screen 2: Select Curiosity */}
      {step === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-lavender)',
              }}
            >
              Tailor Your Journey
            </span>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginTop: '4px',
              }}
            >
              What are you curious about?
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Select one or more topics to prioritize in your reading.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {INTEREST_OPTIONS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1.5px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(124, 58, 237, 0.12)' : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color={item.color} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.label}</span>
                  </div>

                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? 'none' : '1.5px solid var(--border-medium)',
                      backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Screen 3: Ready to Meet Your Palm */}
      {step === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 32px rgba(16, 185, 129, 0.2)',
            }}
          >
            <Sparkles size={36} color="var(--accent-emerald)" />
          </div>

          <h2
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.25,
            }}
          >
            Ready to meet your palm?
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              maxWidth: '320px',
              margin: '0 auto 20px',
            }}
          >
            Position your open hand in natural light. In seconds, Kai will trace your major lines and synthesize your reflection.
          </p>

          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              maxWidth: '300px',
              margin: '0 auto',
            }}
          >
            🔒 Privacy First • Photos are only used for your reading.
          </div>
        </div>
      )}

      {/* Bottom CTA Step Navigation */}
      <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleBack}
          style={{ flex: '0 0 auto', minWidth: '90px' }}
        >
          {t('common.back', 'Back')}
        </Button>
        {step < 3 ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setStep((prev) => (prev + 1) as any)}
            rightIcon={<ArrowRight size={18} />}
          >
            {step === 1 ? t('common.continue', 'Continue') : t('common.next', 'Next')}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onComplete(selectedInterests)}
            rightIcon={<ArrowRight size={18} />}
          >
            ✋ {t('hero.cta', 'Scan My Palm')}
          </Button>
        )}
      </div>
    </div>
  );
};
