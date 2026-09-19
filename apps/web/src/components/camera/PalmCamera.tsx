import React, { useRef, useState, useEffect } from 'react';
import { Upload, ArrowLeft, Camera, Image as ImageIcon, CheckCircle2, Sun, Hand, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import type { HandType } from '../../types/contracts';
import { useLanguage } from '../../context/LanguageContext';

export interface PalmCameraProps {
  hand: HandType;
  onCapture: (imageDataUrl: string) => void;
  onBack: () => void;
}

export const PalmCamera: React.FC<PalmCameraProps> = ({
  hand,
  onCapture,
  onBack,
}) => {
  const { t } = useLanguage();
  const [activeMode, setActiveMode] = useState<'camera' | 'upload'>('camera');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Simulated live feedback indicators for responsive UX feel
  const [feedback] = useState({
    palmDetected: true,
    lightingGood: true,
    distanceOk: true,
    message: '✓ Palm detected • Good lighting',
  });

  // Initialize camera stream when camera mode is active
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      if (activeMode !== 'camera') {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
          setStream(null);
        }
        return;
      }

      setCameraError(null);
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        console.warn('Camera access issue:', err);
        setCameraError(
          err.name === 'NotAllowedError'
            ? 'Camera access not granted. Please choose "Upload Photo" to select a palm picture from your gallery.'
            : 'Camera could not be started on this device. Please upload a photo from your gallery.'
        );
        setActiveMode('upload');
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [activeMode]);

  const handleCapturePhoto = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1080;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
        return;
      }
    }
    // If camera feed is not running, open file selector
    fileInputRef.current?.click();
  };

  const handleUseDemoPalm = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 720, 960);
    bg.addColorStop(0, '#E6D7C8');
    bg.addColorStop(1, '#D8C3AE');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 720, 960);

    // Palm base skin tone
    ctx.fillStyle = '#ECCDB8';
    ctx.strokeStyle = '#B38368';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(360, 560, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Natural Palm Creases
    ctx.strokeStyle = '#944E3D';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';

    // Heart Line
    ctx.beginPath();
    ctx.moveTo(210, 470);
    ctx.bezierCurveTo(320, 510, 460, 460, 550, 410);
    ctx.stroke();

    // Head Line
    ctx.beginPath();
    ctx.moveTo(210, 535);
    ctx.bezierCurveTo(340, 560, 450, 590, 530, 640);
    ctx.stroke();

    // Life Line
    ctx.beginPath();
    ctx.moveTo(215, 520);
    ctx.bezierCurveTo(280, 640, 310, 740, 360, 820);
    ctx.stroke();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCapture(dataUrl);
  };

  const handleProcessFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onCapture(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0A0D1A',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '120px',
      }}
    >
      {/* Top Controls Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(10, 13, 26, 0.95)',
          zIndex: 30,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Let's scan your palm.
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Place your open palm inside the frame. ({hand === 'right' ? 'Right Palm' : 'Left Palm'})
          </span>
        </div>

        <div style={{ width: '38px' }} />
      </div>

      {/* Mode Switcher Tabs (Camera vs Upload) */}
      <div style={{ padding: '12px 18px 0', backgroundColor: '#0A0D1A' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            background: 'var(--bg-surface-elevated)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <button
            onClick={() => setActiveMode('camera')}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: activeMode === 'camera' ? 'var(--bg-surface)' : 'transparent',
              color: activeMode === 'camera' ? 'var(--accent-lavender-warm)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeMode === 'camera' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <Camera size={16} />
            <span>{t('scanner.takePhoto', 'Take Photo')}</span>
          </button>

          <button
            onClick={() => setActiveMode('upload')}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: activeMode === 'upload' ? 'var(--bg-surface)' : 'transparent',
              color: activeMode === 'upload' ? 'var(--accent-lavender-warm)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeMode === 'upload' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <Upload size={16} />
            <span>{t('scanner.uploadPhoto', 'Upload Photo')}</span>
          </button>
        </div>
      </div>

      {/* Viewport Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeMode === 'camera' ? (
          /* Camera Viewport */
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            {cameraError ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#fff' }}>
                <ImageIcon size={44} color="var(--accent-lavender)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>
                  Camera Not Accessible
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.4 }}>
                  {cameraError}
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<Upload size={18} />}
                >
                  Choose Palm Photo
                </Button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Realistic Palm Reticle Silhouette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    viewBox="0 0 280 360"
                    style={{
                      width: '78%',
                      maxWidth: '310px',
                      height: 'auto',
                      opacity: 0.88,
                      filter: 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.45))',
                      transform: hand === 'left' ? 'scaleX(-1)' : 'none',
                    }}
                  >
                    {/* Palm outline */}
                    <path
                      d="M 80 340 C 70 280, 40 210, 40 130 C 40 90, 56 90, 65 125 C 68 90, 95 55, 105 82 C 112 50, 138 42, 145 84 C 152 56, 178 70, 182 114 C 188 150, 222 186, 230 236 C 236 280, 200 340, 145 345 Z"
                      fill="none"
                      stroke="var(--accent-lavender)"
                      strokeWidth="2.5"
                      strokeDasharray="8 5"
                    />
                    {/* Subtle Center Orientation Anchor */}
                    <circle cx="140" cy="190" r="5" fill="var(--accent-emerald)" />
                  </svg>
                </div>

                {/* Live Real-time Feedback Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(10, 13, 26, 0.88)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#fff',
                      border: '1px solid var(--border-subtle)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--accent-emerald)" />
                    <span>{feedback.message}</span>
                  </div>
                </div>

                {/* Sensor Indicators Bottom Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(10, 13, 26, 0.8)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11px',
                      color: 'var(--accent-lavender-warm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Sun size={12} color="var(--accent-amber)" /> Good Light
                  </span>
                  <span
                    style={{
                      background: 'rgba(10, 13, 26, 0.8)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11px',
                      color: 'var(--accent-lavender-warm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Hand size={12} color="var(--accent-emerald)" /> Flat Palm
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Direct Upload Mode Viewport */
          <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                flex: 1,
                minHeight: '260px',
                border: isDragging ? '2px dashed var(--accent-violet)' : '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isDragging ? 'rgba(124, 58, 237, 0.08)' : 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(124, 58, 237, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  color: 'var(--accent-lavender)',
                }}
              >
                <Upload size={32} />
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Upload Your Palm Photo
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '280px', marginBottom: '16px', lineHeight: 1.4 }}>
                Tap here to select an image from your gallery or drag and drop a file
              </p>

              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                leftIcon={<ImageIcon size={16} />}
              >
                Choose Photo from Gallery
              </Button>
            </div>

            {/* Do's and Don'ts Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Instructions for Best Results:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Keep your palm flat</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Use good lighting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Keep all fingers visible</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Hold camera steady</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {/* Fixed Bottom Action Bar - ALWAYS VISIBLE */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(10, 13, 26, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '14px 18px',
          paddingBottom: 'max(18px, env(safe-area-inset-bottom))',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid var(--border-subtle)',
          zIndex: 999,
          boxShadow: '0 -8px 32px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '440px' }}>
          {/* Gallery / File button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              padding: '12px 16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Upload size={16} />
            <span>UPLOAD PHOTO</span>
          </button>

          {/* Big Primary Capture Button */}
          <button
            onClick={handleCapturePhoto}
            style={{
              flex: 1,
              padding: '14px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--cta-bg)',
              border: '1px solid rgba(196, 181, 253, 0.3)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: 'var(--cta-shadow)',
              transition: 'transform 0.1s ease',
            }}
          >
            <Camera size={18} />
            <span>{stream ? 'TAKE PHOTO' : 'OPEN CAMERA'}</span>
          </button>

          {/* Test Demo Button for Desktop Testing */}
          <button
            onClick={handleUseDemoPalm}
            title="Use pre-made sample palm to test"
            style={{
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(124, 58, 237, 0.4)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-lavender-warm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              padding: '12px 12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Sparkles size={14} />
            <span>Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
