import React, { useRef } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Brain,
  Compass,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export interface LandingPageProps {
  onStartScan: () => void;
  onOpenDisclaimer: () => void;
  onOpenPrivacy: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartScan,
  onOpenDisclaimer,
  onOpenPrivacy,
}) => {
  const { formatCurrency } = useLanguage();
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const palmFeatures = [
    {
      id: 'heart',
      name: 'Heart Line',
      label: 'Emotion & Connection',
      description: 'Reflects how you express feelings, form attachments, and experience empathy.',
      icon: Heart,
      color: '#F43F5E',
    },
    {
      id: 'head',
      name: 'Head Line',
      label: 'Mind & Problem-Solving',
      description: 'Reveals your thinking rhythm, intellectual focus, and creative temperament.',
      icon: Brain,
      color: '#38BDF8',
    },
    {
      id: 'life',
      name: 'Life Line',
      label: 'Vitality & Resilience',
      description: 'Illustrates your natural energy reserve, physical stamina, and adaptability.',
      icon: Compass,
      color: '#10B981',
    },
    {
      id: 'fate',
      name: 'Fate & Direction',
      label: 'Purpose & Career Drive',
      description: 'Indicates clarity of purpose, self-directed ambition, and career momentum.',
      icon: Briefcase,
      color: '#8B5CF6',
    },
    {
      id: 'structure',
      name: 'Palm Structure',
      label: 'Elemental Archetype',
      description: 'Proportions of palm and fingers defining your foundational element (Air, Earth, Fire, Water).',
      icon: Sparkles,
      color: '#F59E0B',
    },
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* 1. ABOVE THE FOLD — HERO SECTION */}
      <section
        style={{
          padding: '36px 20px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        {/* Soft Ambient Violet Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '340px',
            height: '340px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Brand Kicker */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            marginBottom: '14px',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-lavender)' }}>
            KAI REGAI
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>•</span>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
            AI PALM READING
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            lineHeight: 1.22,
            letterSpacing: '-0.03em',
            marginBottom: '14px',
            color: 'var(--text-primary)',
          }}
        >
          Discover the story in your hands.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            maxWidth: '400px',
            margin: '0 auto 24px',
          }}
        >
          Scan your palm and explore a personalized interpretation inspired by traditional palmistry.
        </p>

        {/* Primary CTA Above Fold */}
        <div style={{ maxWidth: '340px', margin: '0 auto 12px' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartScan}
            leftIcon={<span style={{ fontSize: '18px' }}>✋</span>}
            rightIcon={<ArrowRight size={18} />}
          >
            SCAN MY PALM
          </Button>
        </div>

        {/* Small Trust Line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '28px',
          }}
        >
          <span>Private</span>
          <span>•</span>
          <span>AI-powered</span>
          <span>•</span>
          <span>About 2 minutes</span>
        </div>

        {/* Beautiful Hero Palm Visual */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            height: '240px',
            margin: '0 auto 16px',
            borderRadius: '28px',
            background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.14) 0%, rgba(17, 22, 43, 0.85) 100%)',
            border: '1px solid var(--border-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 12px 36px -8px rgba(124, 58, 237, 0.22)',
          }}
        >
          {/* Subtle Hand Illustration Silhouette */}
          <svg
            viewBox="0 0 200 240"
            style={{
              width: '82%',
              height: 'auto',
              opacity: 0.9,
            }}
          >
            <path
              d="M 55 230 C 50 180, 25 140, 25 85 C 25 55, 38 55, 45 80 C 48 55, 68 30, 75 52 C 80 30, 100 24, 105 55 C 110 34, 130 44, 134 75 C 138 100, 162 128, 168 165 C 172 195, 145 230, 105 235 Z"
              fill="none"
              stroke="rgba(196, 181, 253, 0.5)"
              strokeWidth="2"
            />
            {/* Illuminated Palm Lines */}
            <path d="M 45 105 Q 85 115 140 95" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 45 125 Q 95 135 145 155" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 45 125 Q 65 170 105 205" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 105 210 Q 106 150 105 105" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
          </svg>

          {/* Gentle Scan Sweep Line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #8B5CF6, #DDD6FE, transparent)',
              boxShadow: '0 0 12px #8B5CF6',
              animation: 'scanSweep 3s ease-in-out infinite',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(10, 13, 26, 0.88)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--accent-lavender-warm)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span>Ready to Read</span>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section
        ref={howItWorksRef}
        style={{
          padding: '36px 20px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-lavender)',
              fontWeight: 700,
            }}
          >
            Simple Process
          </span>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginTop: '4px',
            }}
          >
            How It Works
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Step 01 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(124, 58, 237, 0.14)',
                color: 'var(--accent-lavender)',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Scan
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Take a clear photo of your open palm or upload one from your gallery.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(56, 189, 248, 0.14)',
                color: '#38BDF8',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Analyze
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                AI identifies visible palm features — line trajectories, curvature, and hand shape.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                color: '#10B981',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Discover The Crunch
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Get your concise, high-impact report card covering Wealth, Marriage, Mind, and Health — easy to download and share on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE LOOK AT SECTION */}
      <section
        style={{
          padding: '24px 20px 36px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-lavender)',
              fontWeight: 700,
            }}
          >
            Palmistry Dimensions
          </span>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginTop: '4px',
            }}
          >
            What We Look At
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {palmFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: feat.color,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {feat.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: feat.color, fontWeight: 600 }}>
                      {feat.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. REALISTIC READING EXAMPLE */}
      <section
        style={{
          padding: '24px 20px 36px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-lavender)',
              fontWeight: 700,
            }}
          >
            Example Reading
          </span>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginTop: '4px',
            }}
          >
            What You Receive
          </h2>
        </div>

        {/* Sample Result Card */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-active)',
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-lavender)', fontWeight: 700 }}>
              Sample Archetype
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#DDD6FE',
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              The Visionary Strategist
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {['Emotionally Expressive', 'Analytical Vision', 'Self-Directed Ambition'].map((trait, i) => (
              <span
                key={i}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Sample Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-surface-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F43F5E', fontWeight: 700, marginBottom: '2px' }}>
                <Heart size={13} />
                <span>Heart & Connection</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Gentle upward arc toward Jupiter reflects high empathy, sincere loyalty, and deep selective attachment.
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-surface-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontWeight: 700, marginBottom: '2px' }}>
                <Brain size={13} />
                <span>Mind & Problem-Solving</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                Extended head line indicates balanced reasoning — combining pragmatism with creative visualization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT PRICING CALLOUT */}
      <section
        style={{
          padding: '20px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10B981', marginBottom: '4px' }}>
            Clear, Transparent Pricing
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {formatCurrency(10)}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 auto 14px', maxWidth: '340px' }}>
            One single interpretation covering all major palm lines and themes. No subscriptions, no hidden upsells.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="#10B981" /> All 6 Life Areas
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="#10B981" /> Interactive Palm Map
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="#10B981" /> Instant Synthesis
            </span>
          </div>
        </div>
      </section>

      {/* 6. TRUST, PRIVACY & DISCLAIMER */}
      <section
        style={{
          padding: '24px 20px',
          maxWidth: '520px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
          <ShieldCheck size={16} color="#10B981" />
          <span>Private & Safe</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 auto 16px', maxWidth: '420px' }}>
          Your photo is processed privately to identify visible lines. You can purge your image at any time.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '11px', marginBottom: '20px' }}>
          {onOpenDisclaimer && (
            <button
              onClick={onOpenDisclaimer}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', padding: '2px 4px' }}
            >
              Traditional Palmistry Disclaimer
            </button>
          )}
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          {onOpenPrivacy && (
            <button
              onClick={onOpenPrivacy}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', padding: '2px 4px' }}
            >
              Privacy & Data Policy
            </button>
          )}
        </div>

        {/* Final CTA */}
        <div style={{ maxWidth: '340px', margin: '0 auto' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartScan}
            leftIcon={<span style={{ fontSize: '18px' }}>✋</span>}
            rightIcon={<ArrowRight size={18} />}
          >
            SCAN MY PALM
          </Button>
        </div>
      </section>
    </div>
  );
};
