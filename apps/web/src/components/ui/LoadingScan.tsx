import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export interface LoadingScanProps {
  status?: string;
  customSteps?: string[];
  palmThumbnailUrl?: string;
}

export const LoadingScan: React.FC<LoadingScanProps> = ({
  status = 'Reading your palm…',
  customSteps,
  palmThumbnailUrl,
}) => {
  const defaultSteps = [
    'Looking at your palm...',
    'Finding the major lines...',
    'Mapping your palm...',
    'Preparing your interpretation...',
  ];

  const steps = customSteps || defaultSteps;
  const [completedIndex, setCompletedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Current active line indicator
  const activeLine =
    completedIndex === 0
      ? 'Looking at your palm...'
      : completedIndex === 1
      ? 'Finding the major lines...'
      : completedIndex === 2
      ? 'Mapping your palm...'
      : 'Preparing your interpretation...';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 20px',
        textAlign: 'center',
        maxWidth: '440px',
        margin: '0 auto',
      }}
    >
      {/* Mystical Palmistry Animated Scanner */}
      <div
        style={{
          position: 'relative',
          width: '210px',
          height: '250px',
          borderRadius: '32px',
          backgroundColor: 'var(--bg-surface)',
          border: '1.5px solid var(--border-active)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 12px 40px -10px rgba(124, 58, 237, 0.4), inset 0 0 24px rgba(124, 58, 237, 0.1)',
          marginBottom: '24px',
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
            border: '1px solid rgba(124, 58, 237, 0.18)',
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
              opacity: 0.28,
              filter: 'grayscale(60%) contrast(120%)',
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
            stroke={completedIndex >= 0 ? '#C4B5FD' : 'rgba(255, 255, 255, 0.2)'}
            strokeWidth="2.5"
            strokeDasharray={completedIndex === 0 ? '4 2' : 'none'}
            style={{ transition: 'all 0.5s ease' }}
          />

          {/* Planetary Mount Nodes (Jupiter, Saturn, Sun, Mercury, Venus, Moon) */}
          <circle cx="58" cy="80" r="3.5" fill="#FBBF24" opacity={completedIndex >= 1 ? 0.9 : 0.3} />
          <circle cx="82" cy="74" r="3.5" fill="#A78BFA" opacity={completedIndex >= 2 ? 0.9 : 0.3} />
          <circle cx="108" cy="78" r="3.5" fill="#F59E0B" opacity={completedIndex >= 3 ? 0.9 : 0.3} />
          <circle cx="138" cy="98" r="3" fill="#38BDF8" opacity={completedIndex >= 3 ? 0.9 : 0.3} />
          <circle cx="68" cy="180" r="4.5" fill="#EC4899" opacity={completedIndex >= 2 ? 0.85 : 0.25} />
          <circle cx="140" cy="190" r="4.5" fill="#818CF8" opacity={completedIndex >= 2 ? 0.85 : 0.25} />

          {/* 1. Hridaya Rekha (Heart Line) - Rose Red Glow */}
          <path
            d="M 45 105 Q 85 115 140 95"
            fill="none"
            stroke="#F43F5E"
            strokeWidth={completedIndex >= 1 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={completedIndex >= 1 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: completedIndex >= 1 ? 'drop-shadow(0 0 6px #F43F5E)' : 'none',
            }}
          />

          {/* 2. Shiro Rekha (Head Line) - Azure Blue Glow */}
          <path
            d="M 45 125 Q 95 135 145 155"
            fill="none"
            stroke="#38BDF8"
            strokeWidth={completedIndex >= 2 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={completedIndex >= 2 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: completedIndex >= 2 ? 'drop-shadow(0 0 6px #38BDF8)' : 'none',
            }}
          />

          {/* 3. Ayur Rekha (Life Line) - Emerald Green Glow */}
          <path
            d="M 45 125 Q 65 170 105 205"
            fill="none"
            stroke="#10B981"
            strokeWidth={completedIndex >= 3 ? '3.5' : '1.5'}
            strokeLinecap="round"
            opacity={completedIndex >= 3 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: completedIndex >= 3 ? 'drop-shadow(0 0 6px #10B981)' : 'none',
            }}
          />

          {/* 4. Bhagya Rekha (Fate Line) - Mystical Violet Glow */}
          <path
            d="M 98 215 Q 102 150 94 85"
            fill="none"
            stroke="#C084FC"
            strokeWidth={completedIndex >= 4 ? '3' : '1.5'}
            strokeDasharray={completedIndex >= 4 ? 'none' : '3 2'}
            strokeLinecap="round"
            opacity={completedIndex >= 4 ? 1 : 0.25}
            style={{
              transition: 'all 0.6s ease',
              filter: completedIndex >= 4 ? 'drop-shadow(0 0 6px #C084FC)' : 'none',
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

        {/* Active Line Detection Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            padding: '3px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(10, 13, 26, 0.9)',
            border: '1px solid rgba(196, 181, 253, 0.4)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--accent-lavender-warm)',
            zIndex: 5,
            letterSpacing: '0.04em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {activeLine}
        </div>
      </div>

      {/* Main Status Heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lavender)', marginBottom: '6px' }}>
        <Sparkles size={18} className="animate-spin" />
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {status}
        </h2>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Perception engine tracing traditional palmistry crease landmarks
      </p>

      {/* Step by Step Progress Indicators */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: 'var(--bg-surface)',
          padding: '16px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {steps.map((stepText, idx) => {
          const isDone = idx <= completedIndex;
          const isCurrent = idx === completedIndex;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isDone ? 600 : 400,
                transition: 'all var(--transition-normal)',
              }}
            >
              {isDone ? (
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
              ) : (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--border-medium)',
                  }}
                />
              )}
              <span style={{ color: isCurrent ? 'var(--accent-lavender-warm)' : undefined }}>
                {stepText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
