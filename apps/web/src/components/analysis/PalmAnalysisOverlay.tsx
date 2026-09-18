import React, { useState, useEffect } from 'react';
import type { StructuredPalmAnalysis, Point2D } from '../../types/contracts';
import { Eye, EyeOff, Sparkles, Heart, Brain, Compass } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HAND_CONNECTIONS, detectHandFromUrl } from '../../services/mediapipeService';

export interface PalmAnalysisOverlayProps {
  imageDataUrl: string;
  analysis: StructuredPalmAnalysis;
}

export const PalmAnalysisOverlay: React.FC<PalmAnalysisOverlayProps> = ({
  imageDataUrl,
  analysis,
}) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [selectedLine, setSelectedLine] = useState<string | null>('heart');
  const [showCalibrate, setShowCalibrate] = useState(false);
  const [enhanceCreases, setEnhanceCreases] = useState(false);
  const [showMesh, setShowMesh] = useState(false);
  const [landmarks, setLandmarks] = useState<Point2D[] | null>(analysis.landmarks || null);

  useEffect(() => {
    if (!landmarks && imageDataUrl) {
      detectHandFromUrl(imageDataUrl).then((res) => {
        if (res?.landmarks) {
          setLandmarks(res.landmarks);
        }
      });
    }
  }, [imageDataUrl, landmarks]);

  // Alignment calibration offsets
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const { lines, handArchetype, hand } = analysis;
  const isRight = hand === 'right';

  // Anatomically accurate, organic palmistry paths
  const defaultHeartPath = isRight
    ? 'M 80 38 C 65 37, 48 35, 34 32 C 27 30, 22 27, 18 24'
    : 'M 20 38 C 35 37, 52 35, 66 32 C 73 30, 78 27, 82 24';

  const defaultHeadPath = isRight
    ? 'M 24 43 C 38 47, 56 51, 74 58 C 79 60, 83 63, 86 66'
    : 'M 76 43 C 62 47, 44 51, 26 58 C 21 60, 17 63, 14 66';

  const defaultLifePath = isRight
    ? 'M 24 43 C 21 56, 24 70, 34 82 C 40 90, 46 94, 50 96'
    : 'M 76 43 C 79 56, 76 70, 66 82 C 60 90, 54 94, 50 96';

  const defaultFatePath = 'M 50 92 C 51 74, 51 54, 50 34';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Palm Visualizer Card with Interactive SVG Overlays */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          height: '380px',
          margin: '0 auto',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: '#000',
          border: '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: 'var(--shadow-gold)',
        }}
      >
        <img
          src={imageDataUrl}
          alt="Analyzed Palm"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9,
            filter: enhanceCreases
              ? 'contrast(1.6) brightness(0.9) saturate(0.8)'
              : 'none',
            transition: 'filter 0.3s ease',
          }}
        />

        {showOverlays && (
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#F43F5E" />
              </filter>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#38BDF8" />
              </filter>
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#10B981" />
              </filter>
              <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#F59E0B" />
              </filter>
            </defs>

            {/* Transform group for user/AI calibrated alignment */}
            <g
              transform={`translate(${50 + offsetX}, ${50 + offsetY}) rotate(${rotation}) scale(${scale}) translate(-50, -50)`}
              style={{ transition: 'transform 0.15s ease-out' }}
            >
              {lines.heart?.detected && (
                <path
                  d={lines.heart.svgPath || defaultHeartPath}
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth={selectedLine === 'heart' ? '2.8' : '1.8'}
                  strokeLinecap="round"
                  filter="url(#glow-rose)"
                  style={{ transition: 'all 0.3s ease' }}
                />
              )}

              {lines.head?.detected && (
                <path
                  d={lines.head.svgPath || defaultHeadPath}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth={selectedLine === 'head' ? '2.8' : '1.8'}
                  strokeLinecap="round"
                  filter="url(#glow-cyan)"
                  style={{ transition: 'all 0.3s ease' }}
                />
              )}

              {lines.life?.detected && (
                <path
                  d={lines.life.svgPath || defaultLifePath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={selectedLine === 'life' ? '2.8' : '1.8'}
                  strokeLinecap="round"
                  filter="url(#glow-green)"
                  style={{ transition: 'all 0.3s ease' }}
                />
              )}

              {lines.fate?.detected && (
                <path
                  d={lines.fate.svgPath || defaultFatePath}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth={selectedLine === 'fate' ? '2.6' : '1.6'}
                  strokeLinecap="round"
                  filter="url(#glow-gold)"
                  strokeDasharray="2 1"
                  style={{ transition: 'all 0.3s ease' }}
                />
              )}

              {/* MediaPipe Skeletal 21 Landmarks Mesh */}
              {showMesh && landmarks && landmarks.length >= 21 && (
                <g className="mediapipe-mesh">
                  {/* Bone Connections */}
                  {HAND_CONNECTIONS.map(([idxA, idxB], i) => {
                    const pA = landmarks[idxA];
                    const pB = landmarks[idxB];
                    if (!pA || !pB) return null;
                    return (
                      <line
                        key={`bone-${i}`}
                        x1={pA.x}
                        y1={pA.y}
                        x2={pB.x}
                        y2={pB.y}
                        stroke="#38BDF8"
                        strokeWidth="0.8"
                        strokeOpacity="0.75"
                      />
                    );
                  })}
                  {/* 21 Joint Nodes */}
                  {landmarks.map((pt, i) => (
                    <circle
                      key={`joint-${i}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={i === 0 ? '2.2' : i % 4 === 0 ? '1.8' : '1.2'}
                      fill={i === 0 ? '#F59E0B' : i % 4 === 0 ? '#10B981' : '#38BDF8'}
                      stroke="#0F172A"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              )}
            </g>
          </svg>
        )}

        {/* Top Control Pills */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
          {landmarks && (
            <button
              onClick={() => setShowMesh(!showMesh)}
              title="Toggle MediaPipe 21-joint skeletal mesh"
              style={{
                background: showMesh ? 'rgba(56, 189, 248, 0.9)' : 'rgba(8, 11, 17, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 8px',
                color: showMesh ? '#020617' : '#38BDF8',
                fontWeight: showMesh ? 700 : 500,
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {showMesh ? '🦴 21 Joints On' : '🤖 MediaPipe'}
            </button>
          )}

          <button
            onClick={() => setEnhanceCreases(!enhanceCreases)}
            title="Enhance palm crease contrast"
            style={{
              background: enhanceCreases ? 'rgba(124, 58, 237, 0.85)' : 'rgba(8, 11, 17, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 8px',
              color: '#fff',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            {enhanceCreases ? '✨ Creases Boosted' : '🔍 Crease Filter'}
          </button>

          <button
            onClick={() => setShowOverlays(!showOverlays)}
            style={{
              background: 'rgba(8, 11, 17, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 8px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            {showOverlays ? <EyeOff size={12} /> : <Eye size={12} />}
            <span>{showOverlays ? 'Hide' : 'Show'}</span>
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant="gold" icon={<Sparkles size={12} />}>
            {handArchetype}
          </Badge>
          {landmarks && (
            <span
              style={{
                fontSize: '10px',
                padding: '3px 8px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '999px',
                color: '#38BDF8',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              ⚡ MediaPipe 21 Landmarks
            </span>
          )}
        </div>
      </div>

      {/* Real-Time Line Calibration Accordion */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
            🎯 Calibrate & Match Lines to Hand
          </div>
          <button
            onClick={() => setShowCalibrate(!showCalibrate)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-lavender)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {showCalibrate ? 'Close Sliders' : 'Adjust Alignment'}
          </button>
        </div>

        {showCalibrate ? (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
              Adjust sliders to align the detected lines over your photo's exact palm creases:
            </p>

            {/* Shift Up/Down */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Vertical Position (Up/Down)</span>
                <span>{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Shift Left/Right */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Horizontal Position (Left/Right)</span>
                <span>{offsetX}px</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Scale Hand Size */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Line Spread / Hand Size</span>
                <span>{scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.35"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Hand Tilt */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Tilt Angle</span>
                <span>{rotation}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            <button
              onClick={() => {
                setOffsetX(0);
                setOffsetY(0);
                setScale(1);
                setRotation(0);
              }}
              style={{
                alignSelf: 'flex-end',
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '11px',
                padding: '4px 10px',
                cursor: 'pointer',
              }}
            >
              Reset Alignment
            </button>
          </div>
        ) : (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tip: Click <em>Adjust Alignment</em> to scale or rotate the lines to match your hand's angle.
          </div>
        )}
      </div>

      {/* Feature Detection Transparency Checklist */}
      <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Detected Palm Anatomy
          </h4>
          <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            ✓ Verified by AI
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            {
              id: 'heart',
              name: 'Heart Line (Hridaya)',
              color: '#F43F5E',
              feature: lines.heart,
              icon: <Heart size={14} color="#F43F5E" />,
            },
            {
              id: 'head',
              name: 'Head Line (Mati)',
              color: '#38BDF8',
              feature: lines.head,
              icon: <Brain size={14} color="#38BDF8" />,
            },
            {
              id: 'life',
              name: 'Life Line (Ayush)',
              color: '#10B981',
              feature: lines.life,
              icon: <Compass size={14} color="#10B981" />,
            },
            {
              id: 'fate',
              name: 'Fate Line (Bhagya)',
              color: '#F59E0B',
              feature: lines.fate,
              icon: <Sparkles size={14} color="#F59E0B" />,
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedLine(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: selectedLine === item.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: selectedLine === item.id ? `1px solid ${item.color}` : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.icon}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.feature?.detected
                      ? `${item.feature.length} • ${item.feature.curvature}`
                      : 'Faint / Insufficient evidence'}
                  </div>
                </div>
              </div>

              <div>
                {item.feature?.detected ? (
                  <Badge variant="subtle" style={{ color: item.color, borderColor: item.color }}>
                    {Math.round((item.feature.confidence || 0.8) * 100)}% Match
                  </Badge>
                ) : (
                  <Badge variant="outline">Partially visible</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
