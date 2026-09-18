import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BottomCTA } from '../ui/BottomCTA';
import { Check, ShieldCheck, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface PaymentStepProps {
  amountPaisa?: number;
  onInitiatePayment: (method: 'upi_gpay' | 'upi_phonepe' | 'upi_paytm' | 'qr' | 'gateway') => Promise<void>;
  isLoading?: boolean;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  amountPaisa = 1000,
  onInitiatePayment,
  isLoading = false,
}) => {
  const { t, formatCurrency } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<'upi_gpay' | 'upi_phonepe' | 'upi_paytm' | 'qr' | 'gateway'>('upi_gpay');

  const priceText = formatCurrency(amountPaisa / 100);

  const handlePay = () => {
    onInitiatePayment(selectedMethod);
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Badge variant="emerald" icon={<Check size={12} />}>
          {t('preview.sharpnessLabel', 'Verified')}
        </Badge>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
          {t('payment.title', 'Your Personalized Reading is Ready')}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {t('payment.subtitle', 'Synthesized according to traditional Indian palmistry principles')}
        </p>
      </div>

      {/* Value Proposition Box */}
      <Card variant="gold" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold-light)' }}>
              {t('reading.badge', 'COMPLETE REPORT')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {t('reading.title', 'Full AI Palmistry Reading')}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹99
            </span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-gold-light)', lineHeight: 1 }}>
              {priceText}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          {[
            'Mind & Cognitive Approach (Head Line analysis)',
            'Love, Empathy & Relationships (Heart Line analysis)',
            'Vitality, Life Energy & Resilience (Life Line analysis)',
            'Career Clarity & Ambition (Fate Line analysis)',
            'Dominant Mounts & Innate Creative Talents',
            'Traditional Samudrika Shastra Summary',
            'Downloadable & Shareable Story Card',
          ].map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: 'var(--accent-gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                ✓
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Fast UPI Payment Selection */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t('payment.upiPrompt', 'Select Indian UPI App')}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            Instant Activation
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { id: 'upi_gpay', name: 'Google Pay', icon: '🔵' },
            { id: 'upi_phonepe', name: 'PhonePe', icon: '🟣' },
            { id: 'upi_paytm', name: 'Paytm', icon: '🔷' },
            { id: 'qr', name: 'UPI QR / Cards', icon: '📲' },
          ].map((item) => {
            const isSelected = selectedMethod === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedMethod(item.id as any)}
                style={{
                  background: isSelected ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-surface)',
                  border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 6px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Security & Verification Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          marginTop: 'auto',
        }}
      >
        <ShieldCheck size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
        <span>{t('payment.secureNote', '256-bit encrypted • Razorpay verified • 100% money-back if scan fails')}</span>
      </div>

      {/* Sticky Bottom CTA */}
      <BottomCTA
        headline={t('payment.title', 'Unlock Your Complete Reading')}
        subtext={t('payment.amountNote', 'Includes complete palm line synthesis, mount interpretations, and life dimensions')}
        price={priceText}
        ctaText={`${t('payment.payBtn', 'Pay')} ${priceText}`}
        onAction={handlePay}
        isLoading={isLoading}
        icon={<Lock size={16} />}
      />
    </div>
  );
};
