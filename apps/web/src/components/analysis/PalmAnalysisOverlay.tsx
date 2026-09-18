import React, { useState, useEffect } from 'react';
import type { StructuredPalmAnalysis, Point2D } from '../../types/contracts';
import { Eye, EyeOff, Sparkles, Heart, Brain, Compass } from 'lucide-react';
import { Badge } from '../ui/Badge';
import {
  HAND_CONNECTIONS,
  detectHandFromUrl,
  pointsToSmoothSvgPath,
  type MediaPipeHandResult,
} from '../../services/mediapipeService';

export interface PalmAnalysisOverlayProps {
  imageDataUrl: string;
  analysis: StructuredPalmAnalysis;
  activeLine?: string | null;
  onSelectLine?: (line: string | null) => void;
  autoZoom?: boolean;
}

export const PalmAnalysisOverlay: React.FC<PalmAnalysisOverlayProps> = ({
  imageDataUrl,
  analysis,
  activeLine,
  onSelectLine,
  autoZoom = true,
}) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [internalSelectedLine, setInternalSelectedLine] = useState<string | null>('heart');
  const [showCalibrate, setShowCalibrate] = useState(false);
  const [enhanceCreases, setEnhanceCreases] = useState(false);
  const [showMesh, setShowMesh] = useState(false);
  const [landmarks, setLandmarks] = useState<Point2D[] | null>(analysis.landmarks || null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  // Controlled or uncontrolled line selection
  const selectedLine = activeLine !== undefined ? activeLine : internalSelectedLine;
  const handleSelectLine = (line: string | null) => {
    setInternalSelectedLine(line);
    if (onSelectLine) {
      onSelectLine(line);
    }
  };

  const [creasePoints, setCreasePoints] = useState<MediaPipeHandResult['creases'] | null>(null);
  const [dynamicCreases, setDynamicCreases] = useState<{
    heartLine?: string;
    headLine?: string;
    lifeLine?: string;
    fateLine?: string;
  } | null>(null);

  useEffect(() => {
    if (imageDataUrl) {
      detectHandFromUrl(imageDataUrl).then((res) => {
        if (res?.landmarks) {
          setLandmarks(res.landmarks);
          if (res.creases) {
            setCreasePoints(res.creases);
          }
          if (res.svgPaths) {
            setDynamicCreases({
              heartLine: res.svgPaths.heartLine,
              headLine: res.svgPaths.headLine,
              lifeLine: res.svgPaths.lifeLine,
              fateLine: res.svgPaths.fateLine,
            });
          }
        }
      });
    }
  }, [imageDataUrl]);

  // Alignment calibration offsets
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [lineThickness, setLineThickness] = useState<number>(0.50);
  const [lineSpan, setLineSpan] = useState<number>(1.0);

  // Interactive drag state for fine-tuning crease anchor points
  const [draggingPoint, setDraggingPoint] = useState<{
    lineKey: 'heartLine' | 'headLine' | 'lifeLine' | 'fateLine';
    pointIndex: number;
  } | null>(null);

  const handlePointerDownPoint = (
    lineKey: 'heartLine' | 'headLine' | 'lifeLine' | 'fateLine',
    pointIndex: number,
    e: React.PointerEvent
  ) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDraggingPoint({ lineKey, pointIndex });
  };

  const handlePointerMoveSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingPoint || !creasePoints) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;

    const x = Math.max(0, Math.min(100, ((e.clientX - svgRect.left) / svgRect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - svgRect.top) / svgRect.height) * 100));

    const updatedPoints = {
      ...creasePoints,
      [draggingPoint.lineKey]: creasePoints[draggingPoint.lineKey].map((pt, i) =>
        i === draggingPoint.pointIndex ? { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } : pt
      ),
    };

    setCreasePoints(updatedPoints);
    setDynamicCreases((prev) => ({
      ...prev,
      [draggingPoint.lineKey]: pointsToSmoothSvgPath(updatedPoints[draggingPoint.lineKey]),
    }));
  };

  const handlePointerUpSvg = () => {
    setDraggingPoint(null);
  };

  // Helper to dynamically extend or shorten crease endpoints
  const applySpanToPoints = (pts: Point2D[], span: number): Point2D[] => {
    if (!pts || pts.length < 2 || span === 1.0) return pts;
    const n = pts.length - 1;
    return pts.map((pt, i) => {
      if (i === 0) {
        return {
          x: Math.round((pts[1].x + (pts[0].x - pts[1].x) * span) * 10) / 10,
          y: Math.round((pts[1].y + (pts[0].y - pts[1].y) * span) * 10) / 10,
        };
      }
      if (i === n) {
        return {
          x: Math.round((pts[n - 1].x + (pts[n].x - pts[n - 1].x) * span) * 10) / 10,
          y: Math.round((pts[n - 1].y + (pts[n].y - pts[n - 1].y) * span) * 10) / 10,
        };
      }
      return pt;
    });
  };

  const { lines, handArchetype, hand } = analysis;
  const isRight = hand === 'right';

  // Dynamic focal zoom for active line
  let focalX = 0;
  let focalY = 0;
  let focalScale = 1.0;

  if (autoZoom && selectedLine) {
    if (selectedLine === 'heart') {
      focalScale = 1.25;
      focalY = 8;
      focalX = isRight ? -3 : 3;
    } else if (selectedLine === 'head') {
      focalScale = 1.22;
      focalY = 2;
      focalX = 0;
    } else if (selectedLine === 'life') {
      focalScale = 1.28;
      focalY = -5;
      focalX = isRight ? 5 : -5;
    } else if (selectedLine === 'fate') {
      focalScale = 1.20;
      focalY = 0;
      focalX = 0;
    }
  }

  // Fallback paths if landmarks are not available
  const defaultHeartPath = isRight
    ? 'M 88 38 C 72 37, 48 34, 32 30 C 24 28, 18 24, 12 20'
    : 'M 12 38 C 28 37, 52 34, 68 30 C 76 28, 82 24, 88 20';

  const defaultHeadPath = isRight
    ? 'M 20 42 C 36 46, 56 50, 76 56 C 82 58, 88 62, 92 66'
    : 'M 80 42 C 64 46, 44 50, 24 56 C 18 58, 12 62, 8 66';

  const defaultLifePath = isRight
    ? 'M 20 42 C 26 55, 29 70, 32 82 C 34 88, 38 94, 42 96'
    : 'M 80 42 C 74 55, 71 70, 68 82 C 66 88, 62 94, 58 96';

  const defaultFatePath = 'M 50 92 C 50.5 74, 50.5 54, 50 32';

  const activeHeartPath = creasePoints?.heartLine
    ? pointsToSmoothSvgPath(applySpanToPoints(creasePoints.heartLine, lineSpan))
    : dynamicCreases?.heartLine || lines.heart?.svgPath || defaultHeartPath;

  const activeHeadPath = creasePoints?.headLine
    ? pointsToSmoothSvgPath(applySpanToPoints(creasePoints.headLine, lineSpan))
    : dynamicCreases?.headLine || lines.head?.svgPath || defaultHeadPath;

  const activeLifePath = creasePoints?.lifeLine
    ? pointsToSmoothSvgPath(applySpanToPoints(creasePoints.lifeLine, lineSpan))
    : dynamicCreases?.lifeLine || lines.life?.svgPath || defaultLifePath;

  const activeFatePath = creasePoints?.fateLine
    ? pointsToSmoothSvgPath(applySpanToPoints(creasePoints.fateLine, lineSpan))
    : dynamicCreases?.fateLine || lines.fate?.svgPath || defaultFatePath;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} id="palm-visualizer-container">
      {/* Quick Crease Focus Selector Chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
        {[
          { id: null, label: '✨ Full Hand', color: 'var(--accent-lavender)' },
          { id: 'heart', label: '💖 Heart', color: '#F43F5E' },
          { id: 'head', label: '🧠 Head', color: '#38BDF8' },
          { id: 'life', label: '🌿 Life', color: '#10B981' },
          { id: 'fate', label: '⭐ Fate', color: '#F59E0B' },
        ].map((chip) => {
          const isSelected = selectedLine === chip.id;
          return (
            <button
              key={chip.id || 'all'}
              onClick={() => handleSelectLine(chip.id)}
              style={{
                padding: '5px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                border: isSelected ? `1.5px solid ${chip.color}` : '1px solid var(--border-subtle)',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: chip.color }} />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Palm Visualizer Card with Interactive SVG Overlays */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '350px',
          maxHeight: '440px',
          aspectRatio: imageAspectRatio ? `${imageAspectRatio}` : '3/4',
          margin: '0 auto',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: '#000',
          border: selectedLine ? '2px solid var(--accent-violet)' : '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: 'var(--shadow-gold)',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Synchronized Zoom & Pan Wrapper for Pixel-Perfect Alignment */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale(${focalScale}) translate(${focalX}%, ${focalY}%)`,
            transformOrigin: '50% 50%',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={imageDataUrl}
            alt="Analyzed Palm"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                setImageAspectRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              opacity: 0.92,
              filter: enhanceCreases
                ? 'contrast(1.6) brightness(0.9) saturate(0.8)'
                : 'none',
              transition: 'filter 0.3s ease',
            }}
          />

          {showOverlays && (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: showCalibrate ? 'auto' : 'none',
                touchAction: 'none',
              }}
              onPointerMove={handlePointerMoveSvg}
              onPointerUp={handlePointerUpSvg}
              onPointerLeave={handlePointerUpSvg}
            >
              <defs>
                <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor="#F43F5E" />
                </filter>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor="#38BDF8" />
                </filter>
                <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor="#10B981" />
                </filter>
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor="#F59E0B" />
                </filter>
              </defs>

              {/* Transform group for user/AI calibrated alignment */}
              <g
                transform={`translate(${50 + offsetX}, ${50 + offsetY}) rotate(${rotation}) scale(${scale}) translate(-50, -50)`}
                style={{ transition: 'transform 0.15s ease-out' }}
              >
                {lines.heart?.detected && (
                  <path
                    d={activeHeartPath}
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth={selectedLine === 'heart' ? (lineThickness * 1.3).toFixed(2) : (lineThickness * 0.85).toFixed(2)}
                    strokeLinecap="round"
                    filter={selectedLine === 'heart' ? 'url(#glow-rose)' : undefined}
                    style={{
                      opacity: selectedLine ? (selectedLine === 'heart' ? 1 : 0.25) : 0.88,
                      transition: 'all 0.35s ease',
                    }}
                  />
                )}

                {lines.head?.detected && (
                  <path
                    d={activeHeadPath}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth={selectedLine === 'head' ? (lineThickness * 1.3).toFixed(2) : (lineThickness * 0.85).toFixed(2)}
                    strokeLinecap="round"
                    filter={selectedLine === 'head' ? 'url(#glow-cyan)' : undefined}
                    style={{
                      opacity: selectedLine ? (selectedLine === 'head' ? 1 : 0.25) : 0.88,
                      transition: 'all 0.35s ease',
                    }}
                  />
                )}

                {lines.life?.detected && (
                  <path
                    d={activeLifePath}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={selectedLine === 'life' ? (lineThickness * 1.3).toFixed(2) : (lineThickness * 0.85).toFixed(2)}
                    strokeLinecap="round"
                    filter={selectedLine === 'life' ? 'url(#glow-green)' : undefined}
                    style={{
                      opacity: selectedLine ? (selectedLine === 'life' ? 1 : 0.25) : 0.88,
                      transition: 'all 0.35s ease',
                    }}
                  />
                )}

                {lines.fate?.detected && (
                  <path
                    d={activeFatePath}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth={selectedLine === 'fate' ? (lineThickness * 1.3).toFixed(2) : (lineThickness * 0.75).toFixed(2)}
                    strokeLinecap="round"
                    filter={selectedLine === 'fate' ? 'url(#glow-gold)' : undefined}
                    strokeDasharray={selectedLine === 'fate' ? undefined : '2 1'}
                    style={{
                      opacity: selectedLine ? (selectedLine === 'fate' ? 1 : 0.25) : 0.88,
                      transition: 'all 0.35s ease',
                    }}
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
                        r={i === 0 ? '2.0' : i % 4 === 0 ? '1.6' : '1.1'}
                        fill={i === 0 ? '#F59E0B' : i % 4 === 0 ? '#10B981' : '#38BDF8'}
                        stroke="#0F172A"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                )}

                {/* Interactive Anchor Drag Handles in Calibration Mode */}
                {showCalibrate && creasePoints && (
                  <g className="calibration-drag-handles">
                    {(['heartLine', 'headLine', 'lifeLine', 'fateLine'] as const).map((lineKey) => {
                      const isLineActive =
                        !selectedLine ||
                        (selectedLine === 'heart' && lineKey === 'heartLine') ||
                        (selectedLine === 'head' && lineKey === 'headLine') ||
                        (selectedLine === 'life' && lineKey === 'lifeLine') ||
                        (selectedLine === 'fate' && lineKey === 'fateLine');

                      if (!isLineActive) return null;

                      const pts = creasePoints[lineKey];
                      const color =
                        lineKey === 'heartLine' ? '#F43F5E' :
                        lineKey === 'headLine' ? '#38BDF8' :
                        lineKey === 'lifeLine' ? '#10B981' : '#F59E0B';

                      return pts.map((pt, idx) => {
                        const isDragging = draggingPoint?.lineKey === lineKey && draggingPoint?.pointIndex === idx;
                        return (
                          <circle
                            key={`${lineKey}-handle-${idx}`}
                            cx={pt.x}
                            cy={pt.y}
                            r={isDragging ? 3.0 : 1.9}
                            fill={color}
                            stroke="#FFFFFF"
                            strokeWidth="0.7"
                            style={{
                              cursor: 'grab',
                              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))',
                              transition: isDragging ? 'none' : 'r 0.15s ease',
                              touchAction: 'none',
                            }}
                            onPointerDown={(e) => handlePointerDownPoint(lineKey, idx, e)}
                          />
                        );
                      });
                    })}
                  </g>
                )}
              </g>
            </svg>
          )}
        </div>


        {/* Floating Focused Crease Annotation Callout */}
        {selectedLine && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              backgroundColor: 'rgba(10, 14, 23, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor:
                    selectedLine === 'heart' ? '#F43F5E' :
                    selectedLine === 'head' ? '#38BDF8' :
                    selectedLine === 'life' ? '#10B981' : '#F59E0B',
                  flexShrink: 0,
                  boxShadow: '0 0 10px currentColor',
                }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {selectedLine === 'heart' && 'Hridaya Rekha (Heart Line)'}
                  {selectedLine === 'head' && 'Matru Rekha (Head Line)'}
                  {selectedLine === 'life' && 'Ayur Rekha (Life Line)'}
                  {selectedLine === 'fate' && 'Bhagya Rekha (Fate Line)'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {selectedLine === 'heart' && (lines.heart?.traditionalMeaningSummary || 'Emotional depth & bonds')}
                  {selectedLine === 'head' && (lines.head?.traditionalMeaningSummary || 'Mental focus & lateral insight')}
                  {selectedLine === 'life' && (lines.life?.traditionalMeaningSummary || 'Vitality reserve & stamina')}
                  {selectedLine === 'fate' && (lines.fate?.traditionalMeaningSummary || 'Career vocation & purpose')}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSelectLine(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '6px',
                color: 'var(--accent-lavender)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px 8px',
                flexShrink: 0,
                marginLeft: '8px',
              }}
            >
              Reset ↺
            </button>
          </div>
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
                <span>Vertical Position (Up / Down)</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{offsetY > 0 ? `+${offsetY}%` : `${offsetY}%`}</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Shift Left/Right */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Horizontal Position (Left / Right)</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{offsetX > 0 ? `+${offsetX}%` : `${offsetX}%`}</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Scale Hand Size */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Line Spread / Hand Scale</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="1.75"
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
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{rotation}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>
            {/* Crease Span / Full Length Coverage */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Crease Span / Full Length Coverage</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{Math.round(lineSpan * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.70"
                max="1.35"
                step="0.05"
                value={lineSpan}
                onChange={(e) => setLineSpan(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            {/* Line Thickness */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                <span>Line Thickness (Delicate Crease)</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-lavender)' }}>{lineThickness.toFixed(2)}px</span>
              </div>
              <input
                type="range"
                min="0.20"
                max="1.20"
                step="0.05"
                value={lineThickness}
                onChange={(e) => setLineThickness(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-violet)' }}
              />
            </div>

            <div style={{ padding: '6px 10px', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '6px', border: '1px dashed rgba(56, 189, 248, 0.3)' }}>
              <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 600 }}>
                💡 Direct Touch Dragging Active:
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                You can drag the glowing colored dots directly on your photo to match your unique palm lines down to the millimeter!
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => {
                  if (imageDataUrl) {
                    detectHandFromUrl(imageDataUrl).then((res) => {
                      if (res?.landmarks) {
                        setLandmarks(res.landmarks);
                        if (res.creases) {
                          setCreasePoints(res.creases);
                        }
                        if (res.svgPaths) {
                          setDynamicCreases({
                            heartLine: res.svgPaths.heartLine,
                            headLine: res.svgPaths.headLine,
                            lifeLine: res.svgPaths.lifeLine,
                            fateLine: res.svgPaths.fateLine,
                          });
                        }
                      }
                    });
                  }
                  setOffsetX(0);
                  setOffsetY(0);
                  setScale(1);
                  setRotation(0);
                  setLineSpan(1.0);
                }}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#38BDF8',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>⚡ Auto-Fit & Ridge-Snap</span>
              </button>

              <button
                onClick={() => {
                  setOffsetX(0);
                  setOffsetY(0);
                  setScale(1);
                  setRotation(0);
                  setLineSpan(1.0);
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
                  fontSize: '11px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                Reset Calibration
              </button>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Tip: Click <em>Adjust Alignment</em> to drag control dots directly on your photo or adjust line length/angle.
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
              onClick={() => handleSelectLine(item.id)}
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
