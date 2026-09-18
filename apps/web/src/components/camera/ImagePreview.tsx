import React, { useEffect, useState, useRef } from 'react';
import type { ImageQualityResult, HandType } from '../../types/contracts';
import { validatePalmImageQuality } from '../../services/CanvasQualityValidator';
import { compressPalmImage } from '../../services/ImageCompressor';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ErrorAlert } from '../ui/ErrorAlert';
import { CheckCircle2, RefreshCw, ArrowRight, Sparkles, Upload } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface ImagePreviewProps {
  imageDataUrl: string;
  hand: HandType;
  onRetake: () => void;
  onProceed: (compressedBlob: Blob, compressedDataUrl: string, quality: ImageQualityResult) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageDataUrl,
  hand,
  onRetake,
  onProceed,
}) => {
  const { t } = useLanguage();
  const [currentImageData, setCurrentImageData] = useState<string>(imageDataUrl);
  const [isCheckingQuality, setIsCheckingQuality] = useState(true);
  const [qualityResult, setQualityResult] = useState<ImageQualityResult | null>(null);
  const [compressedData, setCompressedData] = useState<{ blob: Blob; dataUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function evaluate() {
      setIsCheckingQuality(true);
      try {
        const img = new Image();
        img.src = currentImageData;
        await new Promise((res) => {
          img.onload = res;
        });

        const quality = await validatePalmImageQuality(img);
        const compressed = await compressPalmImage(img);

        if (isMounted) {
          setQualityResult(quality);
          setCompressedData(compressed);
        }
      } catch (err) {
        console.error('Validation error:', err);
      } finally {
        if (isMounted) setIsCheckingQuality(false);
      }
    }

    evaluate();
    return () => {
      isMounted = false;
    };
  }, [currentImageData]);

  const handleProceed = () => {
    if (compressedData && qualityResult) {
      onProceed(compressedData.blob, compressedData.dataUrl, qualityResult);
    }
  };

  const handleChooseAnotherFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCurrentImageData(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const isHandMissing = qualityResult && (!qualityResult.handDetected || qualityResult.aspectScore < 0.4);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
          {t('preview.subtitle', 'Step 2 of 3 • Image Quality Check')}
        </span>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
          {t('preview.title', 'Review Your Palm Capture')}
        </h2>
      </div>

      {/* Captured Image Display with Framing */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          height: '380px',
          margin: '0 auto',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '2px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          backgroundColor: '#000',
        }}
      >
        <img
          src={currentImageData}
          alt="Captured Palm"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Quality status badge overlay */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          {isCheckingQuality ? (
            <Badge variant="subtle">Analyzing...</Badge>
          ) : qualityResult?.isValid ? (
            <Badge variant="emerald" icon={<CheckCircle2 size={13} />}>
              Verified
            </Badge>
          ) : isHandMissing ? (
            <Badge variant="outline" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
              No Palm Detected
            </Badge>
          ) : (
            <Badge variant="outline" style={{ background: 'rgba(245, 158, 11, 0.25)', color: 'var(--accent-gold-light)' }}>
              Adjustment Needed
            </Badge>
          )}
        </div>

        {/* Hand indicator pill */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <Badge variant="gold">
            {hand === 'right' ? t('handSelect.rightTitle') : t('handSelect.leftTitle')}
          </Badge>
        </div>
      </div>

      {/* Quality Details / Warnings Box */}
      <div style={{ marginTop: '16px', flex: 1 }}>
        {isCheckingQuality ? (
          <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <Sparkles size={18} className="animate-spin" style={{ margin: '0 auto 8px', color: 'var(--accent-gold-light)' }} />
            {t('loading.step1', 'Detecting palm landmarks and creases...')}
          </div>
        ) : qualityResult && !qualityResult.isValid ? (
          <ErrorAlert
            title={isHandMissing ? "Please upload your hand photo or palm photo" : "We couldn't get a clear enough view of your palm"}
            message={
              isHandMissing
                ? "The AI vision system could not find a clear human palm in this image. Please ensure your open hand is facing the camera."
                : "To give you an accurate and grounded traditional palm reading, our vision system requires clear line visibility."
            }
            reasons={qualityResult.warnings}
            onRetry={onRetake}
            onSecondaryAction={() => fileInputRef.current?.click()}
            secondaryActionLabel="Upload Another Photo"
            retryLabel="Retake Photo with Camera"
          />
        ) : (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
              <CheckCircle2 size={18} />
              <span>Great photo! Open palm verified</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Hand Match</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {Math.round((qualityResult?.aspectScore || 0.9) * 100)}%
                </span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>{t('preview.sharpnessLabel', 'Sharpness')}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {Math.round((qualityResult?.sharpnessScore || 0.8) * 100)}%
                </span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>{t('preview.lightingLabel', 'Lighting')}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {Math.round((qualityResult?.lightingScore || 0.85) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Picker for Direct Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChooseAnotherFile}
      />

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {qualityResult?.isValid && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleProceed}
            disabled={!compressedData}
            rightIcon={<ArrowRight size={18} />}
          >
            {t('preview.analyzeBtn', 'Analyze Palm Lines')}
          </Button>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <Button
            variant="outline"
            fullWidth
            onClick={onRetake}
            leftIcon={<RefreshCw size={16} />}
          >
            {t('preview.retakeBtn', 'Retake')}
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload size={16} />}
          >
            {t('scanner.uploadPhoto', 'Upload Other')}
          </Button>
        </div>
      </div>
    </div>
  );
};
