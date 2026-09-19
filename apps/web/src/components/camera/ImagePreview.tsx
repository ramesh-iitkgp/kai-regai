import React, { useEffect, useState, useRef } from 'react';
import type { ImageQualityResult, HandType } from '../../types/contracts';
import { validatePalmImageQuality } from '../../services/CanvasQualityValidator';
import { compressPalmImage } from '../../services/ImageCompressor';
import { detectHandFromImage } from '../../services/mediapipeService';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle2, RefreshCw, ArrowRight, Sparkles, Upload } from 'lucide-react';

export interface ImagePreviewProps {
  imageDataUrl: string;
  hand: HandType;
  onRetake: () => void;
  onProceed: (
    compressedBlob: Blob,
    compressedDataUrl: string,
    quality: ImageQualityResult,
    detectedHand?: HandType
  ) => void;
  onSelectHand?: (newHand: HandType) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageDataUrl,
  hand,
  onRetake,
  onProceed,
  onSelectHand,
}) => {
  const [currentImageData, setCurrentImageData] = useState<string>(imageDataUrl);
  const [currentSelectedHand, setCurrentSelectedHand] = useState<HandType>(hand);
  const [detectedHand, setDetectedHand] = useState<HandType | null>(null);
  const [handMismatchDismissed, setHandMismatchDismissed] = useState(false);
  const [handSwitchedNotice, setHandSwitchedNotice] = useState<string | null>(null);

  const [isCheckingQuality, setIsCheckingQuality] = useState(true);
  const [qualityResult, setQualityResult] = useState<ImageQualityResult | null>(null);
  const [compressedData, setCompressedData] = useState<{ blob: Blob; dataUrl: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentSelectedHand(hand);
  }, [hand]);

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

        // Run quality check and MediaPipe hand detection in parallel
        const [quality, compressed, mpResult] = await Promise.all([
          validatePalmImageQuality(img),
          compressPalmImage(img),
          detectHandFromImage(img).catch((err) => {
            console.warn('Preview hand detection error:', err);
            return null;
          }),
        ]);

        if (isMounted) {
          setQualityResult(quality);
          setCompressedData(compressed);
          const detected = mpResult?.handedness || quality?.detectedHand;
          if (detected) {
            setDetectedHand(detected);
          }
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
      onProceed(
        compressedData.blob,
        compressedData.dataUrl,
        qualityResult,
        detectedHand || currentSelectedHand
      );
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
  const hasMismatch =
    detectedHand !== null &&
    detectedHand !== currentSelectedHand &&
    !handMismatchDismissed;

  return (
    <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Does this look clear?
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Make sure your major palm lines and creases are clearly visible.
        </p>
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
          border: hasMismatch ? '2px solid #EF4444' : '1.5px solid var(--border-medium)',
          boxShadow: hasMismatch ? '0 0 20px rgba(239, 68, 68, 0.25)' : 'var(--shadow-lg)',
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
            <Badge variant="subtle">Checking photo...</Badge>
          ) : hasMismatch ? (
            <Badge variant="outline" style={{ background: 'rgba(239, 68, 68, 0.35)', color: '#FCA5A5', border: '1.5px solid rgba(239, 68, 68, 0.8)', fontWeight: 800 }}>
              Wrong Palm Detected
            </Badge>
          ) : qualityResult?.isValid ? (
            <Badge variant="emerald" icon={<CheckCircle2 size={13} />}>
              Clear View
            </Badge>
          ) : isHandMissing ? (
            <Badge variant="outline" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
              Palm Not Detected
            </Badge>
          ) : (
            <Badge variant="outline" style={{ background: 'rgba(245, 158, 11, 0.25)', color: 'var(--accent-amber)' }}>
              Check Lighting
            </Badge>
          )}
        </div>

        {/* Hand indicator pill */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          {hasMismatch ? (
            <Badge
              variant="outline"
              style={{
                background: 'rgba(239, 68, 68, 0.4)',
                color: '#FECACA',
                border: '1.5px solid rgba(239, 68, 68, 0.8)',
                fontWeight: 800,
                backdropFilter: 'blur(8px)',
              }}
            >
              ⚠️ Scanned {detectedHand === 'right' ? 'Right' : 'Left'} Palm (Selected: {currentSelectedHand === 'right' ? 'Right' : 'Left'})
            </Badge>
          ) : (
            <Badge variant="subtle">
              {currentSelectedHand === 'right' ? 'Right Palm' : 'Left Palm'}
            </Badge>
          )}
        </div>
      </div>

      {/* Quality Details / Warnings Box */}
      <div style={{ marginTop: '16px', flex: 1 }}>
        {/* Hand Switched Success Pill */}
        {handSwitchedNotice && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: 'var(--accent-emerald)',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{handSwitchedNotice}</span>
          </div>
        )}

        {/* Strict Hand Mismatch Warning Card */}
        {hasMismatch && (
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1.5px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 4px 18px rgba(239, 68, 68, 0.15)',
              marginBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px' }}>🛑</span>
              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#F87171' }}>
                Wrong Palm Detected!
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.45, margin: '0 0 8px 0' }}>
              You selected <strong>{currentSelectedHand === 'right' ? 'Right Palm' : 'Left Palm'}</strong>, but your photo shows your <strong>{detectedHand === 'right' ? 'Right Palm' : 'Left Palm'}</strong>.
            </p>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              To ensure your palm lines match your astrological reading, please switch to your scanned palm or retake the photo.
            </p>
          </div>
        )}

        {isCheckingQuality ? (
          <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <Sparkles size={18} className="animate-spin" style={{ margin: '0 auto 8px', color: 'var(--accent-lavender)' }} />
            <span>Checking line clarity and palm orientation...</span>
          </div>
        ) : hasMismatch ? (
          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-amber)',
              fontSize: '12.5px',
              fontWeight: 600,
            }}
          >
            <Sparkles size={15} style={{ flexShrink: 0 }} />
            <span>Switch to {detectedHand === 'right' ? 'Right' : 'Left'} Palm below to unlock analysis</span>
          </div>
        ) : qualityResult && !qualityResult.isValid ? (
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              We need a clearer view of your palm.
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
              {isHandMissing
                ? 'Make sure your entire open palm is facing the camera with fingers spread slightly.'
                : 'Try moving into brighter light and holding the camera steady so your palm lines are sharp.'}
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--accent-emerald)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={16} />
            <span>Palm and major creases clearly visible</span>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
        {hasMismatch ? (
          <>
            {/* Primary Action when Wrong Palm: Switch & Proceed */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                if (detectedHand) {
                  setCurrentSelectedHand(detectedHand);
                  onSelectHand?.(detectedHand);
                  setHandSwitchedNotice(
                    `✓ Switched to ${detectedHand === 'right' ? 'Right' : 'Left'} Palm!`
                  );
                }
              }}
              style={{
                backgroundColor: '#10B981',
                borderColor: '#059669',
                fontWeight: 800,
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
              }}
              leftIcon={<CheckCircle2 size={18} />}
            >
              SWITCH TO {detectedHand === 'right' ? 'RIGHT' : 'LEFT'} PALM & PROCEED
            </Button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Button
                variant="outline"
                fullWidth
                onClick={onRetake}
                leftIcon={<RefreshCw size={16} />}
              >
                RETAKE PHOTO
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload size={16} />}
              >
                USE ANOTHER
              </Button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setHandMismatchDismissed(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                Proceed as {currentSelectedHand === 'right' ? 'Right' : 'Left'} Palm anyway (mirrored selfie)
              </button>
            </div>
          </>
        ) : qualityResult?.isValid ? (
          <>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleProceed}
              disabled={!compressedData}
              rightIcon={<ArrowRight size={18} />}
            >
              ANALYZE MY {currentSelectedHand === 'right' ? 'RIGHT' : 'LEFT'} PALM
            </Button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Button
                variant="outline"
                fullWidth
                onClick={onRetake}
                leftIcon={<RefreshCw size={16} />}
              >
                RETAKE
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload size={16} />}
              >
                USE ANOTHER PHOTO
              </Button>
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Button
              variant="primary"
              fullWidth
              onClick={onRetake}
              leftIcon={<RefreshCw size={16} />}
            >
              RETAKE
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<Upload size={16} />}
            >
              USE ANOTHER PHOTO
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
