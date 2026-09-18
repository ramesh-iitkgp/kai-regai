import React, { useState } from 'react';
import { Heart, Brain, Compass, Sparkles } from 'lucide-react';

interface LineDemoInfo {
  id: 'heart' | 'head' | 'life' | 'fate';
  name: string;
  traditionalName: string;
  color: string;
  shortDesc: string;
  icon: React.ReactNode;
}

const LINES: LineDemoInfo[] = [
  {
    id: 'heart',
    name: 'Heart Line',
    traditionalName: 'Hridaya Rekha',
    color: '#F43F5E',
    shortDesc: 'Traditional indicator of emotional expressiveness, empathy, and connection style.',
    icon: <Heart size={14} color="#F43F5E" />,
  },
  {
    id: 'head',
    name: 'Head Line',
    traditionalName: 'Mati Rekha',
    color: '#38BDF8',
    shortDesc: 'Reflects cognitive approach, creative vs analytical thinking, and mental focus.',
    icon: <Brain size={14} color="#38BDF8" />,
  },
  {
    id: 'life',
    name: 'Life Line',
    traditionalName: 'Ayush Rekha',
    color: '#10B981',
    shortDesc: 'Traditional representation of physical vitality, energy flow, and resilience.',
    icon: <Compass size={14} color="#10B981" />,
  },
  {
    id: 'fate',
    name: 'Fate Line',
    traditionalName: 'Bhagya Rekha',
    color: '#F59E0B',
    shortDesc: 'Indicates sense of vocation, clarity of path, and self-directed ambition.',
    icon: <Sparkles size={14} color="#F59E0B" />,
  },
];

export const PalmLineDemo: React.FC = () => {
  const [activeLine, setActiveLine] = useState<'heart' | 'head' | 'life' | 'fate'>('heart');

  const selected = LINES.find((l) => l.id === activeLine)!;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '20px 16px',
        margin: '20px 0',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent-gold-light)',
            fontWeight: 700,
          }}
        >
          Interactive Feature Map
        </span>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
          What Our AI Traces
        </h3>
      </div>

      {/* SVG Palm Line Schematic */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '280px',
          height: '240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 200 240"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 0 16px rgba(15, 21, 35, 0.9))',
          }}
        >
          {/* Subtle Stylized Hand Contour */}
          <path
            d="M 60 220 C 50 180, 30 140, 30 90 C 30 60, 42 60, 48 85 C 50 60, 68 35, 75 55 C 80 30, 98 25, 103 55 C 108 35, 125 45, 128 75 C 132 100, 155 125, 160 160 C 165 190, 140 220, 100 225 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Life Line (Green) */}
          <path
            d="M 68 115 C 62 135, 60 160, 75 195"
            fill="none"
            stroke={activeLine === 'life' ? '#10B981' : 'rgba(16, 185, 129, 0.35)'}
            strokeWidth={activeLine === 'life' ? '4' : '2'}
            strokeLinecap="round"
            style={{
              transition: 'all 0.3s ease',
              filter: activeLine === 'life' ? 'drop-shadow(0 0 8px #10B981)' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveLine('life')}
          />

          {/* Head Line (Cyan) */}
          <path
            d="M 68 115 C 90 125, 115 138, 145 150"
            fill="none"
            stroke={activeLine === 'head' ? '#38BDF8' : 'rgba(56, 189, 248, 0.35)'}
            strokeWidth={activeLine === 'head' ? '4' : '2'}
            strokeLinecap="round"
            style={{
              transition: 'all 0.3s ease',
              filter: activeLine === 'head' ? 'drop-shadow(0 0 8px #38BDF8)' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveLine('head')}
          />

          {/* Heart Line (Rose) */}
          <path
            d="M 148 110 C 120 102, 95 98, 80 88"
            fill="none"
            stroke={activeLine === 'heart' ? '#F43F5E' : 'rgba(244, 63, 94, 0.35)'}
            strokeWidth={activeLine === 'heart' ? '4' : '2'}
            strokeLinecap="round"
            style={{
              transition: 'all 0.3s ease',
              filter: activeLine === 'heart' ? 'drop-shadow(0 0 8px #F43F5E)' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveLine('heart')}
          />

          {/* Fate Line (Gold) */}
          <path
            d="M 98 200 C 100 160, 102 125, 104 88"
            fill="none"
            stroke={activeLine === 'fate' ? '#F59E0B' : 'rgba(245, 158, 11, 0.35)'}
            strokeWidth={activeLine === 'fate' ? '4' : '2'}
            strokeLinecap="round"
            style={{
              transition: 'all 0.3s ease',
              filter: activeLine === 'fate' ? 'drop-shadow(0 0 8px #F59E0B)' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => setActiveLine('fate')}
          />
        </svg>
      </div>

      {/* Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', margin: '12px 0' }}>
        {LINES.map((line) => (
          <button
            key={line.id}
            onClick={() => setActiveLine(line.id)}
            style={{
              background: activeLine === line.id ? 'var(--bg-surface-elevated)' : 'transparent',
              border: activeLine === line.id ? `1px solid ${line.color}` : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 4px',
              fontSize: '11px',
              fontWeight: 600,
              color: activeLine === line.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
            }}
          >
            {line.icon}
            <span>{line.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected Line Card */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderLeft: `3px solid ${selected.color}`,
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selected.name}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {selected.traditionalName}
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {selected.shortDesc}
        </p>
      </div>
    </div>
  );
};
