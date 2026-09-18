import React, { useRef } from 'react';
import {
  Sparkles,
  Camera,
  Zap,
  Lock,
  Heart,
  Brain,
  Compass,
  Coins,
  ArrowRight,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PalmLineDemo } from './PalmLineDemo';
import { useLanguage } from '../../context/LanguageContext';
import { getLandingLocale } from '../../locales/landingLocales';

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
  const { currentLanguage, t, formatCurrency } = useLanguage();
  const loc = getLandingLocale(currentLanguage.id);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const explorationThemes = [
    {
      id: 'love',
      title: loc.themes.love.title,
      subtitle: loc.themes.love.subtitle,
      icon: Heart,
      color: '#F43F5E',
      badge: loc.themes.love.lineName,
    },
    {
      id: 'career',
      title: loc.themes.career.title,
      subtitle: loc.themes.career.subtitle,
      icon: Briefcase,
      color: '#8B5CF6',
      badge: loc.themes.career.lineName,
    },
    {
      id: 'money',
      title: loc.themes.money.title,
      subtitle: loc.themes.money.subtitle,
      icon: Coins,
      color: '#10B981',
      badge: loc.themes.money.lineName,
    },
    {
      id: 'personality',
      title: loc.themes.mind.title,
      subtitle: loc.themes.mind.subtitle,
      icon: Brain,
      color: '#38BDF8',
      badge: loc.themes.mind.lineName,
    },
    {
      id: 'life',
      title: loc.themes.life.title,
      subtitle: loc.themes.life.subtitle,
      icon: Compass,
      color: '#F59E0B',
      badge: loc.themes.life.lineName,
    },
  ];

  const valuePillars = [
    { ...loc.pillars[0], icon: Zap },
    { ...loc.pillars[1], icon: Sparkles },
    { ...loc.pillars[2], icon: Heart },
    { ...loc.pillars[3], icon: Compass },
    { ...loc.pillars[4], icon: Lock },
  ];

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* HERO SECTION */}
      <section
        style={{
          padding: '40px 20px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        {/* Soft Ambient Ethereal Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)',
            filter: 'blur(36px)',
            pointerEvents: 'none',
          }}
        />

        {/* Brand Kicker */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-lavender)' }}>
            KAI REGAI
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            AI Palm Reading
          </span>
        </div>

        {/* Hero Tagline */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}
        >
          {loc.tagline1} {loc.tagline2}
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            maxWidth: '380px',
            margin: '0 auto 24px',
          }}
        >
          {loc.subtitle}
        </p>

        {/* Hero Palm Graphic Representation */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '210px',
            margin: '0 auto 24px',
            borderRadius: '28px',
            background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.14) 0%, rgba(17, 22, 43, 0.9) 100%)',
            border: '1px solid var(--border-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 12px 36px -8px rgba(124, 58, 237, 0.25)',
          }}
        >
          {/* Subtle Hand Illustration Silhouette */}
          <svg
            viewBox="0 0 200 240"
            style={{
              width: '80%',
              height: 'auto',
              opacity: 0.85,
            }}
          >
            <path
              d="M 55 230 C 50 180, 25 140, 25 85 C 25 55, 38 55, 45 80 C 48 55, 68 30, 75 52 C 80 30, 100 24, 105 55 C 110 34, 130 44, 134 75 C 138 100, 162 128, 168 165 C 172 195, 145 230, 105 235 Z"
              fill="none"
              stroke="var(--accent-lavender)"
              strokeWidth="2.5"
            />
            {/* Glowing Palm Lines */}
            <path d="M 45 105 Q 85 115 140 95" fill="none" stroke="#F43F5E" strokeWidth="2.5" opacity="0.9" />
            <path d="M 45 125 Q 95 135 145 155" fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity="0.9" />
            <path d="M 45 125 Q 65 170 105 205" fill="none" stroke="#10B981" strokeWidth="2.5" opacity="0.9" />
          </svg>

          {/* Scanning Sweep Line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #8B5CF6, #DDD6FE, transparent)',
              boxShadow: '0 0 12px #8B5CF6',
            }}
            className="animate-scan-sweep"
          />

          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(10, 13, 26, 0.85)',
              border: '1px solid var(--border-subtle)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--accent-lavender-warm)',
            }}
          >
            AI Perception Active
          </div>
        </div>

        {/* Primary CTA & Secondary Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '340px', margin: '0 auto' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartScan}
            leftIcon={<span style={{ fontSize: '18px' }}>✋</span>}
            rightIcon={<ArrowRight size={16} />}
          >
            {loc.scanCta} — {formatCurrency(10)}
          </Button>

          <button
            onClick={scrollToHowItWorks}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '6px',
            }}
          >
            <span>{loc.seeHowItWorks}</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        ref={howItWorksRef}
        style={{
          padding: '32px 20px',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Badge variant="subtle">{loc.stepsBadge}</Badge>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '6px', color: 'var(--text-primary)' }}>
            {loc.howItWorksTitle}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              num: '01',
              title: loc.step1Title,
              desc: loc.step1Desc,
              icon: <Camera size={20} color="var(--accent-lavender)" />,
            },
            {
              num: '02',
              title: loc.step2Title,
              desc: loc.step2Desc,
              icon: <Zap size={20} color="var(--accent-violet)" />,
            },
            {
              num: '03',
              title: loc.step3Title,
              desc: loc.step3Desc,
              icon: <Sparkles size={20} color="var(--accent-emerald)" />,
            },
          ].map((step, idx) => (
            <Card
              key={idx}
              variant="default"
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '14px',
                  fontWeight: 800,
                  color: 'var(--accent-lavender)',
                }}
              >
                {step.num}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                  {step.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* WHAT KAI CAN EXPLORE SECTION */}
      <section
        style={{
          padding: '32px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Badge variant="subtle">{loc.exploreBadge}</Badge>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '6px', color: 'var(--text-primary)' }}>
              {loc.exploreTitle}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {loc.exploreSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {explorationThemes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={item.color} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--accent-lavender)',
                      backgroundColor: 'rgba(124, 58, 237, 0.1)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      flexShrink: 0,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section style={{ padding: '32px 20px', maxWidth: '560px', margin: '0 auto' }}>
        <PalmLineDemo />
      </section>

      {/* WHY KAI REGAI? */}
      <section
        style={{
          padding: '32px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Badge variant="subtle">{loc.trustBadge}</Badge>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '6px', color: 'var(--text-primary)' }}>
              {loc.trustTitle}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {valuePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(124, 58, 237, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Icon size={16} color="var(--accent-lavender)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING STORY SECTION */}
      <section style={{ padding: '40px 20px 24px', textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {loc.closingTitle}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
          {loc.closingDesc}
        </p>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onStartScan}
          leftIcon={<span style={{ fontSize: '18px' }}>✋</span>}
          rightIcon={<ArrowRight size={16} />}
        >
          {loc.closingCta} — {formatCurrency(10)}
        </Button>
      </section>

      {/* TRADITIONAL CULTURAL DISCLAIMER */}
      <section style={{ padding: '16px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {t('reading.disclaimer', 'Traditional Palmistry Interpretation • For entertainment and personal reflection only. Not a substitute for medical, financial, or legal advice.')}{' '}
          <button
            onClick={onOpenDisclaimer}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-lavender)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            Learn more
          </button>
          {' • '}
          <button
            onClick={onOpenPrivacy}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-lavender)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            Privacy Policy
          </button>
        </p>
      </section>
    </div>
  );
};
