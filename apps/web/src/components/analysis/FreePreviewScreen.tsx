import React, { useState } from 'react';
import type { StructuredPalmAnalysis } from '../../types/contracts';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Heart, Brain, Compass, Lock, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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

  // Line features
  const heartCurvature = analysis.lines.heart.curvature;
  const headLength = analysis.lines.head.length;
  const lifeArc = analysis.lines.life.curvature;

  const detectedLines = [
    { name: 'Heart Line', detected: true, label: 'Emotional expression & empathy' },
    { name: 'Head Line', detected: true, label: 'Intellect & decision-making style' },
    { name: 'Life Line', detected: true, label: 'Vitality & resilience arc' },
    { name: 'Fate & Direction', detected: true, label: 'Career momentum & ambition' },
  ];

  const previewInsights = [
    {
      id: 'heart',
      title: 'Heart Line',
      icon: Heart,
      color: '#F43F5E',
      preview:
        heartCurvature === 'deep_arc' || heartCurvature === 'moderate'
          ? 'Deep upward arc toward Jupiter indicates high empathy, warm loyalty, and expressive emotional connections.'
          : 'Focused, direct trajectory reflects measured affection, pragmatic loyalty, and emotional self-containment.',
    },
    {
      id: 'head',
      title: 'Head Line',
      icon: Brain,
      color: '#38BDF8',
      preview:
        headLength === 'long'
          ? 'Extended across palm into lunar territory — suggests strong imaginative vision combined with analytical endurance.'
          : 'Balanced trajectory shows rapid practical discernment, swift execution, and problem-solving focus.',
    },
    {
      id: 'life',
      title: 'Life Line',
      icon: Compass,
      color: '#10B981',
      preview:
        lifeArc === 'deep_arc'
          ? 'Generous curve around the thumb mount denotes steady vitality, physical adaptability, and energetic stamina.'
          : 'Refined contour indicates mindful pacing, selective focus, and purposeful energy distribution.',
    },
  ];

  return (
    <div
      style={{
        padding: '24px 20px',
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '140px',
      }}
    >
      {/* 1. Header with Detection Checkmarks */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Badge variant="emerald" icon={<Sparkles size={12} />}>
          Analysis Complete
        </Badge>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginTop: '8px',
            marginBottom: '4px',
          }}
        >
          Your palm has been mapped.
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
          Your personalized reading is ready.
        </p>
      </div>

      {/* Palm Thumbnail & Detected Features Summary */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
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
          <div>
            <span style={{ fontSize: '11px', color: 'var(--accent-lavender)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Identified Archetype
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', marginBottom: '2px' }}>
              {analysis.handArchetype}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {analysis.hand === 'right' ? 'Right hand (Active path)' : 'Left hand (Innate potential)'}
            </span>
          </div>
        </div>

        {/* Feature Checkmarks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {detectedLines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{line.name} detected</span>
            </div>
          ))}
        </div>
      </div>

      {/* Free Preview Insight Snippets */}
      <div style={{ marginBottom: '22px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Detected Line Glimpse
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {previewInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Icon size={15} color={insight.color} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {insight.title}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  {insight.preview}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Converting, Transparent ₹10 Payment Card */}
      <Card
        variant="elevated"
        style={{
          padding: '22px',
          border: '1.5px solid var(--border-active)',
          background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.09) 0%, var(--bg-surface) 100%)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Unlock Your Full Reading
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
              One-time fee: {priceText} • No subscriptions
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-lavender-warm)', lineHeight: 1 }}>
              {priceText}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.45 }}>
          A complete personal interpretation covering:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '18px' }}>
          {[
            'Emotional style & connections',
            'Focus, decision-making & thinking style',
            'Vitality & personal momentum',
            'Strengths & natural tendencies',
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-lavender)',
                  flexShrink: 0,
                }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* UPI App Selection */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Pay securely via UPI / Card / Netbanking:
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
                  <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
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
          UNLOCK FOR {priceText}
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>Server-verified • Instant access • Private & secure</span>
        </div>
      </Card>
    </div>
  );
};
