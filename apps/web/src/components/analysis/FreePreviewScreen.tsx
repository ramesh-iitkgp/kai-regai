import React, { useState } from 'react';
import type { StructuredPalmAnalysis } from '../../types/contracts';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Heart, Brain, Compass, Lock, ShieldCheck, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface FreePreviewScreenProps {
  analysis: StructuredPalmAnalysis;
  imageDataUrl: string;
  onUnlock: (method: 'upi_gpay' | 'upi_phonepe' | 'upi_paytm' | 'qr' | 'gateway') => void;
  isLoading?: boolean;
}

export const FreePreviewScreen: React.FC<FreePreviewScreenProps> = ({
  analysis,
  imageDataUrl,
  onUnlock,
  isLoading = false,
}) => {
  const { formatCurrency } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<'upi_gpay' | 'upi_phonepe' | 'upi_paytm' | 'qr' | 'gateway'>('upi_gpay');

  const priceText = formatCurrency(10);

  // Derive genuine preview snippets from CV feature analysis
  const heartCurvature = analysis.lines.heart.curvature;
  const headLength = analysis.lines.head.length;
  const lifeArc = analysis.lines.life.curvature;

  const previewInsights = [
    {
      id: 'heart',
      title: 'Heart Line',
      icon: Heart,
      color: '#F43F5E',
      preview:
        heartCurvature === 'deep_arc' || heartCurvature === 'moderate'
          ? 'Deeply curved arc toward Jupiter — indicates noble devotion, high emotional fidelity, and empathy.'
          : 'Direct, focused orientation — reflects practical affection and emotional self-containment.',
      lockedTeaser: 'Deep dive into marriage nuances, soul connections, and emotional rhythm.',
    },
    {
      id: 'head',
      title: 'Head Line',
      icon: Brain,
      color: '#38BDF8',
      preview:
        headLength === 'long'
          ? 'Extended across the palm into lunar territory — suggests fertile creative vision and analytical persistence.'
          : 'Balanced trajectory — shows swift practical discernment and pragmatic problem solving.',
      lockedTeaser: 'Unpack your vocational alignment, strategic focus, and creative temperament.',
    },
    {
      id: 'life',
      title: 'Life Line',
      icon: Compass,
      color: '#10B981',
      preview:
        lifeArc === 'deep_arc'
          ? 'Wide, generous sweep around Venus — traditional sign of robust natural vitality (Ojas) and stamina.'
          : 'Close contour — indicates mindful energy distribution and deep selective focus.',
      lockedTeaser: 'Examine life milestones, regenerative vitality, and innate physical resilience.',
    },
  ];

  return (
    <div
      style={{
        padding: '24px 20px',
        maxWidth: '460px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '140px',
      }}
    >
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Badge variant="emerald" icon={<Sparkles size={12} />}>
          Palm Lines Successfully Mapped
        </Badge>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginTop: '8px',
          }}
        >
          Your Palm Has a Story
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Here is a complimentary glimpse of what Kai detected in your {analysis.hand === 'right' ? 'right' : 'left'} hand.
        </p>
      </div>

      {/* Palm Thumbnail & Archetype Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 14px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#000',
            border: '1px solid var(--border-medium)',
          }}
        >
          <img
            src={imageDataUrl}
            alt="Analyzed Palm"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '11px', color: 'var(--accent-lavender)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Identified Archetype
          </span>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1px' }}>
            {analysis.handArchetype}
          </h4>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Confidence: {Math.round(analysis.imageQualityScore * 100)}% clarity
          </span>
        </div>
      </div>

      {/* Free Preview Insight Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {previewInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={16} color={insight.color} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {insight.title}
                </h4>
              </div>

              {/* Free Insight Snippet */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '10px' }}>
                {insight.preview}
              </p>

              {/* Locked Deeper Layer Teaser */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px dashed var(--border-medium)',
                  fontSize: '11px',
                  color: 'var(--accent-lavender)',
                }}
              >
                <Lock size={12} color="var(--accent-violet)" style={{ flexShrink: 0 }} />
                <span style={{ filter: 'blur(0.3px)' }}>{insight.lockedTeaser}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Converting, Transparent ₹10 Unlock Box */}
      <Card
        variant="elevated"
        style={{
          padding: '20px',
          border: '1.5px solid var(--border-active)',
          background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, var(--bg-surface) 100%)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-lavender)' }}>
              COMPLETE REPORT
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              Unlock Your Full Reading
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹99
            </span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-lavender-warm)', lineHeight: 1 }}>
              {priceText}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '13px', marginBottom: '16px' }}>
          {[
            'Personalized palm interpretation across 5 dimensions',
            'Deep Love & Relationship disposition',
            'Career path & vocational mastery indicators',
            'Innate personality & dominant mount attributes',
            'Classical Samudrika Shastra source citations',
            'Interactive palm line highlighter & shareable card',
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'rgba(124, 58, 237, 0.2)',
                  color: 'var(--accent-lavender)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  flexShrink: 0,
                }}
              >
                <Check size={10} strokeWidth={3} />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* UPI App Selection */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Pay securely with any UPI app:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[
              { id: 'upi_gpay', name: 'GPay', icon: '🔵' },
              { id: 'upi_phonepe', name: 'PhonePe', icon: '🟣' },
              { id: 'upi_paytm', name: 'Paytm', icon: '🔷' },
              { id: 'qr', name: 'UPI QR', icon: '📲' },
            ].map((app) => {
              const isSelected = selectedMethod === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedMethod(app.id as any)}
                  style={{
                    background: isSelected ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-surface-elevated)',
                    border: isSelected ? '1.5px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 4px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{app.icon}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onUnlock(selectedMethod)}
          isLoading={isLoading}
          leftIcon={<Lock size={16} />}
          rightIcon={<ArrowRight size={16} />}
        >
          Unlock Full Reading — {priceText}
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>Server-verified • 100% money back if scan fails</span>
        </div>
      </Card>
    </div>
  );
};
