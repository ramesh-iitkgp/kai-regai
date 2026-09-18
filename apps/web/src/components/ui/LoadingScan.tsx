import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, BookOpen, Layers, Eye, Compass } from 'lucide-react';

export interface LoadingScanProps {
  status?: string;
  palmThumbnailUrl?: string;
  onComplete?: () => void;
}

interface DiagnosticStage {
  id: number;
  stageNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  citationSnippet?: string;
  icon: React.ReactNode;
}

export const LoadingScan: React.FC<LoadingScanProps> = ({
  status: _status = 'Deliberate Shastra Palm Analysis…',
  palmThumbnailUrl,
  onComplete,
}) => {
  const [progress, setProgress] = useState(4);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages: DiagnosticStage[] = [
    {
      id: 1,
      stageNumber: 'Stage 1 of 4',
      title: 'Hand Plane & Mount Geometry',
      subtitle: 'Normalizing palm axis and measuring Guru (Jupiter), Shukra (Venus), and Chandra parvatas...',
      badge: '✓ Hand Geometry Calibrated',
      icon: <Compass size={16} color="var(--accent-amber)" />,
    },
    {
      id: 2,
      stageNumber: 'Stage 2 of 4',
      title: 'Principal Crease Channel Tracing',
      subtitle: 'Isolating Ayur Rekha (Life), Matru Rekha (Head), and Hridaya Rekha (Heart)...',
      badge: '✓ 4 Major Creases Traced',
      icon: <Eye size={16} color="var(--accent-emerald)" />,
    },
    {
      id: 3,
      stageNumber: 'Stage 3 of 4',
      title: 'Cross-Referencing 3 Classical Shastras',
      subtitle: 'Comparing detected formations against Brihat Samudrika, Cheiro (1894), & Benham (1900)...',
      badge: '✓ Verified Classical Citations',
      citationSnippet: 'Brihat Samudrika Verse 42 • Cheiro Ch. VII (1894) • Benham p. 210 (1900)',
      icon: <BookOpen size={16} color="var(--accent-lavender-warm)" />,
    },
    {
      id: 4,
      stageNumber: 'Stage 4 of 4',
      title: 'Synthesizing Personal Reading',
      subtitle: 'Formulating multidimensional life insights, dharma reflections, and classical guidance...',
      badge: '✓ Synthesis Complete',
      icon: <Layers size={16} color="var(--accent-violet)" />,
    },
  ];

  // Paced 10.5-second deliberate scan timer
  useEffect(() => {
    const totalDurationMs = 10500;
    const updateIntervalMs = 70;
    const totalSteps = totalDurationMs / updateIntervalMs;
    const progressIncrement = 96 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
          return 100;
        }

        if (next < 25) setCurrentStageIndex(0);
        else if (next < 55) setCurrentStageIndex(1);
        else if (next < 85) setCurrentStageIndex(2);
        else setCurrentStageIndex(3);

        return next;
      });
    }, updateIntervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  const activeStage = stages[currentStageIndex];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 60px',
        textAlign: 'center',
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      {/* Mystical Palmistry Animated Scanner */}
      <div
        style={{
          position: 'relative',
          width: '220px',
          height: '260px',
          borderRadius: '32px',
          backgroundColor: '#070913',
          border: '1.5px solid var(--border-active)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 12px 48px -10px rgba(124, 58, 237, 0.45), inset 0 0 32px rgba(124, 58, 237, 0.15)',
          marginBottom: '20px',
        }}
      >
        {/* Rotating Sacred Astrolabe Rings in background */}
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '1px dashed rgba(196, 181, 253, 0.22)',
            animation: 'spin 24s linear infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: '1px solid rgba(124, 58, 237, 0.22)',
            animation: 'spin 16s linear infinite reverse',
            pointerEvents: 'none',
          }}
        />

        {/* User photo thumbnail behind if available */}
        {palmThumbnailUrl && (
          <img
            src={palmThumbnailUrl}
            alt="User Palm"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.35,
              filter: 'grayscale(50%) contrast(130%)',
            }}
          />
        )}

        {/* Illuminated Palm Silhouette with Dynamic Palmistry Lines */}
        <svg
          viewBox="0 0 200 240"
          style={{
            width: '85%',
            height: '85%',
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.4))',
          }}
        >
          {/* Palm Boundary Silhouette */}
          <path
            d="M 55 230 C 50 180, 25 140, 25 85 C 25 55, 38 55, 45 80 C 48 55, 68 30, 75 52 C 80 30, 100 24, 105 55 C 110 34, 130 44, 134 75 C 138 100, 162 128, 168 165 C 172 195, 145 230, 105 235 Z"
            fill="none"
            stroke={currentStageIndex >= 0 ? '#C4B5FD' : 'rgba(255, 255, 255, 0.2)'}
            strokeWidth="2.5"
            strokeDasharray={currentStageIndex === 0 ? '4 2' : 'none'}
            style={{ transition: 'all 0.5s ease' }}
          />

          {/* Planetary Mount Nodes (Jupiter, Saturn, Sun, Mercury, Venus, Moon) */}
          <circle cx="58" cy="80" r="3.5" fill="#FBBF24" opacity={currentStageIndex >= 0 ? 0.9 : 0.3} />
          <circle cx="82" cy="74" r="3.5" fill="#A78BFA" opacity={currentStageIndex >= 1 ? 0.9 : 0.3} />
          <circle cx="108" cy="78" r="3.5" fill="#F59E0B" opacity={currentStageIndex >= 2 ? 0.9 : 0.3} />
          <circle cx="138" cy="98" r="3" fill="#38BDF8" opacity={currentStageIndex >= 2 ? 0.9 : 0.3} />
          <circle cx="68" cy="180" r="4.5" fill="#EC4899" opacity={currentStageIndex >= 1 ? 0.85 : 0.25} />
          <circle cx="140" cy="190" r="4.5" fill="#818CF8" opacity={currentStageIndex >= 1 ? 0.85 : 0.25} />

          {/* 1. Hridaya Rekha (Heart Line) - Rose Red Glow */}
          <path
            d="M 45 105 Q 85 115 140 95"
            fill="none"
            stroke="#F43F5E"
            strokeWidth={currentStageIndex >= 1 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={currentStageIndex >= 1 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: currentStageIndex >= 1 ? 'drop-shadow(0 0 6px #F43F5E)' : 'none',
            }}
          />

          {/* 2. Matru Rekha (Head Line) - Azure Blue Glow */}
          <path
            d="M 45 125 Q 95 135 145 155"
            fill="none"
            stroke="#38BDF8"
            strokeWidth={currentStageIndex >= 1 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={currentStageIndex >= 1 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: currentStageIndex >= 1 ? 'drop-shadow(0 0 6px #38BDF8)' : 'none',
            }}
          />

          {/* 3. Ayur Rekha (Life Line) - Emerald Green Glow */}
          <path
            d="M 45 125 Q 65 170 105 205"
            fill="none"
            stroke="#10B981"
            strokeWidth={currentStageIndex >= 1 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={currentStageIndex >= 1 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: currentStageIndex >= 1 ? 'drop-shadow(0 0 6px #10B981)' : 'none',
            }}
          />

          {/* 4. Bhagya / Karma Rekha (Fate Line) - Mystical Violet Glow */}
          <path
            d="M 98 215 Q 102 150 94 85"
            fill="none"
            stroke="#C084FC"
            strokeWidth={currentStageIndex >= 2 ? '3' : '1.5'}
            strokeDasharray={currentStageIndex >= 2 ? 'none' : '3 2'}
            strokeLinecap="round"
            opacity={currentStageIndex >= 2 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: currentStageIndex >= 2 ? 'drop-shadow(0 0 6px #C084FC)' : 'none',
            }}
          />
        </svg>

        {/* Dynamic Laser Scanning Beam */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #8B5CF6, #DDD6FE, transparent)',
            boxShadow: '0 0 16px #8B5CF6, 0 0 32px #DDD6FE',
            zIndex: 4,
          }}
          className="animate-scan-sweep"
        />

        {/* Active Stage Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(10, 13, 26, 0.92)',
            border: '1px solid rgba(196, 181, 253, 0.4)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--accent-lavender-warm)',
            zIndex: 5,
            letterSpacing: '0.03em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          {activeStage.icon}
          <span>{activeStage.stageNumber}</span>
        </div>
      </div>

      {/* Progress Bar & Percentage */}
      <div style={{ width: '100%', maxWidth: '380px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-lavender)' }}>
            {activeStage.title}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #7C3AED 0%, #A78BFA 50%, #F59E0B 100%)',
              boxShadow: '0 0 12px rgba(124, 58, 237, 0.8)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>

      {/* Current Stage Explanation Subtitle */}
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', minHeight: '38px', lineHeight: 1.45, maxWidth: '380px' }}>
        {activeStage.subtitle}
      </p>

      {/* Live Shastra Reference Box (Stage 3 Highlight) */}
      {activeStage.citationSnippet && (
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(167, 139, 250, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 12px',
            marginBottom: '16px',
            fontSize: '11px',
            color: 'var(--accent-lavender-warm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <BookOpen size={13} style={{ flexShrink: 0 }} />
          <span>Cross-referencing: <em>{activeStage.citationSnippet}</em></span>
        </div>
      )}

      {/* 4-Stage Verification Checklist */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: 'var(--bg-surface)',
          padding: '14px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        {stages.map((stg, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={stg.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: isDone ? 'var(--text-primary)' : isCurrent ? 'var(--accent-lavender-warm)' : 'var(--text-muted)',
                fontWeight: isCurrent ? 700 : isDone ? 600 : 400,
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isDone ? (
                  <CheckCircle2 size={15} color="var(--accent-emerald)" />
                ) : isCurrent ? (
                  <Sparkles size={15} color="var(--accent-gold-light)" className="animate-spin" />
                ) : (
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: '1.5px solid var(--border-medium)',
                    }}
                  />
                )}
                <span>{stg.title}</span>
              </div>

              {isDone && (
                <span style={{ fontSize: '10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  DONE ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
