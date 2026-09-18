import { HandLandmarker, FilesetResolver, type Landmark } from '@mediapipe/tasks-vision';
import type { Point2D } from '../types/contracts';

let landmarkerPromise: Promise<HandLandmarker> | null = null;

// Initialize MediaPipe HandLandmarker singleton
export async function getHandLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      return await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'IMAGE',
        numHands: 1,
      });
    })();
  }
  return landmarkerPromise;
}

export interface MediaPipeHandResult {
  landmarks: Point2D[]; // 21 normalized landmarks (0 to 100)
  handedness: 'left' | 'right';
  confidence: number;
  creases: {
    heartLine: Point2D[];
    headLine: Point2D[];
    lifeLine: Point2D[];
    fateLine: Point2D[];
  };
  svgPaths: {
    heartLine: string;
    headLine: string;
    lifeLine: string;
    fateLine: string;
    palmOutline: string;
  };
}

/**
 * Standard MediaPipe Hand Connections (Pairs of landmark indices)
 */
export const HAND_CONNECTIONS: [number, number][] = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm Knuckle Cross-bars
  [5, 9], [9, 13], [13, 17],
];

/**
 * Converts an array of 2D points into a smooth SVG path using Catmull-Rom to cubic Bezier
 */
export function pointsToSmoothSvgPath(pts: Point2D[]): string {
  if (!pts || pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  if (pts.length === 2) {
    return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`;
  }

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Linear interpolation helper between two points
 */
function lerp(a: Point2D, b: Point2D, t: number): Point2D {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

/**
 * Derives the 4 principal Shastra palm lines dynamically from the 21 MediaPipe skeletal landmarks.
 * Accurately spans the full length of each crease from true anatomical origin to true anatomical termination.
 */
export function deriveCreasesFromLandmarks(rawLms: Landmark[]): {
  landmarks: Point2D[];
  handedness: 'left' | 'right';
  creases: MediaPipeHandResult['creases'];
  svgPaths: MediaPipeHandResult['svgPaths'];
} {
  // Convert 0..1 to 0..100 percentage coordinates
  const lm: Point2D[] = rawLms.map((p) => ({
    x: Math.round(p.x * 1000) / 10,
    y: Math.round(p.y * 1000) / 10,
  }));

  const wrist = lm[0];
  const thumbCmc = lm[1];
  const thumbMcp = lm[2];
  const indexMcp = lm[5];
  const middleMcp = lm[9];
  const ringMcp = lm[13];
  const pinkyMcp = lm[17];

  // Determine handedness: palmar view (palm facing camera)
  // If thumb is to the left of pinky, it's typically a right hand (or unmirrored)
  const isRight = thumbMcp.x < pinkyMcp.x;
  const handedness = isRight ? 'right' : 'left';

  // Across knuckles vector (index knuckle to pinky knuckle):
  const vecKnuckles = {
    x: pinkyMcp.x - indexMcp.x,
    y: pinkyMcp.y - indexMcp.y,
  };
  const knuckleDist = Math.hypot(vecKnuckles.x, vecKnuckles.y) || 1;
  const uUlnar = { x: vecKnuckles.x / knuckleDist, y: vecKnuckles.y / knuckleDist };
  // Outer skin percussion (ulnar border below pinky extends beyond skeletal knuckle)
  const ulnarSkin = {
    x: uUlnar.x * knuckleDist * 0.18,
    y: uUlnar.y * knuckleDist * 0.18,
  };

  // Palm base width across wrist heel
  const wristRadial = lerp(wrist, thumbCmc, 0.65);
  const wristUlnar = {
    x: wrist.x + uUlnar.x * knuckleDist * 0.50,
    y: wrist.y + uUlnar.y * knuckleDist * 0.50,
  };


  // 1. Heart Line (Hridaya Rekha) — Distal transverse crease
  // Covers the whole width: starts on outer ulnar percussion edge, traverses below pinky, ring, middle,
  // and terminates in the interdigital space under index/middle.
  const heartPercussionEdge: Point2D = {
    x: Math.round((lerp(pinkyMcp, wristUlnar, 0.28).x + ulnarSkin.x * 1.25) * 10) / 10,
    y: Math.round((lerp(pinkyMcp, wristUlnar, 0.28).y + ulnarSkin.y * 1.25) * 10) / 10,
  };

  const heartLine: Point2D[] = [
    heartPercussionEdge,
    lerp(pinkyMcp, wristUlnar, 0.24),
    lerp(ringMcp, lerp(wristRadial, wristUlnar, 0.70), 0.28),
    lerp(middleMcp, lerp(wristRadial, wristUlnar, 0.45), 0.32),
    lerp(lerp(indexMcp, middleMcp, 0.48), wrist, 0.22),
    lerp(lerp(indexMcp, middleMcp, 0.42), wrist, 0.12),
  ];

  // 2. Head Line (Matru Rekha) — Proximal transverse crease
  // Runs in upper-mid palm, starting under index knuckle base and traversing across toward mid-percussion
  const headOrigin: Point2D = {
    x: Math.round(lerp(indexMcp, wristRadial, 0.24).x * 10) / 10,
    y: Math.round(lerp(indexMcp, wristRadial, 0.24).y * 10) / 10,
  };

  const headPercussionEdge: Point2D = {
    x: Math.round((lerp(pinkyMcp, wristUlnar, 0.46).x + ulnarSkin.x * 0.40) * 10) / 10,
    y: Math.round((lerp(pinkyMcp, wristUlnar, 0.46).y + ulnarSkin.y * 0.40) * 10) / 10,
  };

  const headLine: Point2D[] = [
    headOrigin,
    lerp(lerp(indexMcp, middleMcp, 0.30), lerp(wristRadial, wristUlnar, 0.30), 0.32),
    lerp(middleMcp, lerp(wristRadial, wristUlnar, 0.48), 0.38),
    lerp(ringMcp, lerp(wristRadial, wristUlnar, 0.72), 0.44),
    headPercussionEdge,
  ];

  // 3. Life Line (Ayur Rekha) — Thenar crease
  // Starts beside the head line and cleanly contours around Mount of Venus (thenar eminence) on the palm
  const lifeLine: Point2D[] = [
    headOrigin,
    lerp(lerp(indexMcp, middleMcp, 0.08), wristRadial, 0.38),
    lerp(lerp(indexMcp, middleMcp, 0.16), wristRadial, 0.54),
    lerp(lerp(indexMcp, middleMcp, 0.12), wristRadial, 0.72),
    lerp(lerp(indexMcp, middleMcp, 0.06), wristRadial, 0.88),
    wristRadial,
  ];

  // 4. Fate Line (Karma Rekha) — Vertical median crease
  // Ascends vertically from wrist up the palm center toward Mount of Saturn (middle knuckle)
  const fateLine: Point2D[] = [
    lerp(wrist, middleMcp, 0.12),
    lerp(wrist, middleMcp, 0.34),
    lerp(wrist, middleMcp, 0.56),
    lerp(wrist, middleMcp, 0.78),
  ];

  // 5. Palm Boundary Outline (Wrist -> Thumb -> Index -> Pinky -> Wrist)
  const palmOutlinePts = [wrist, thumbCmc, thumbMcp, indexMcp, middleMcp, ringMcp, pinkyMcp, wrist];
  const palmOutline = palmOutlinePts.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '') + ' Z';

  return {
    landmarks: lm,
    handedness,
    creases: {
      heartLine,
      headLine,
      lifeLine,
      fateLine,
    },
    svgPaths: {
      heartLine: pointsToSmoothSvgPath(heartLine),
      headLine: pointsToSmoothSvgPath(headLine),
      lifeLine: pointsToSmoothSvgPath(lifeLine),
      fateLine: pointsToSmoothSvgPath(fateLine),
      palmOutline,
    },
  };
}

/**
 * Pixel-level adaptive ridge snapping:
 * Samples perpendicular luminance profiles across the image to snap control points
 * directly into the real shadow valleys of the skin creases.
 */
export function snapPointsToCreaseValleys(
  imageSource: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
  points: Point2D[],
  searchRadiusPercent = 1.6
): Point2D[] {
  if (typeof document === 'undefined' || !points || points.length < 2) {
    return points;
  }

  try {
    const width =
      'videoWidth' in imageSource && (imageSource as any).videoWidth
        ? (imageSource as any).videoWidth
        : 'naturalWidth' in imageSource && (imageSource as any).naturalWidth
        ? (imageSource as any).naturalWidth
        : imageSource.width || 600;
    const height =
      'videoHeight' in imageSource && (imageSource as any).videoHeight
        ? (imageSource as any).videoHeight
        : 'naturalHeight' in imageSource && (imageSource as any).naturalHeight
        ? (imageSource as any).naturalHeight
        : imageSource.height || 800;

    if (!width || !height) return points;

    // Use a fast downsampled canvas for smooth luminance profile extraction
    const sampleW = Math.min(width, 480);
    const sampleH = Math.round((height / width) * sampleW);

    const canvas = document.createElement('canvas');
    canvas.width = sampleW;
    canvas.height = sampleH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return points;

    ctx.drawImage(imageSource as CanvasImageSource, 0, 0, sampleW, sampleH);
    const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
    const data = imgData.data;

    const getLuminance = (px: number, py: number): number => {
      const ix = Math.max(0, Math.min(sampleW - 1, Math.round(px)));
      const iy = Math.max(0, Math.min(sampleH - 1, Math.round(py)));
      const idx = (iy * sampleW + ix) * 4;
      return 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    };

    const snapped: Point2D[] = points.map((pt, i) => {
      const isEndpoint = i === 0 || i === points.length - 1;
      const stepRadius = isEndpoint ? searchRadiusPercent * 0.4 : searchRadiusPercent;

      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy);
      if (len < 0.001) return { ...pt };

      // Perpendicular normal vector in normalized coordinates
      const nx = -dy / len;
      const ny = dx / len;

      let minLum = Infinity;
      let bestOffset = 0;
      let baseLum = 0;

      const samples = 11;
      for (let s = -Math.floor(samples / 2); s <= Math.floor(samples / 2); s++) {
        const offsetPercent = (s / (samples / 2)) * stepRadius;
        const testX = pt.x + nx * offsetPercent;
        const testY = pt.y + ny * offsetPercent;

        const px = (testX / 100) * sampleW;
        const py = (testY / 100) * sampleH;
        const lum = getLuminance(px, py);

        if (s === 0) baseLum = lum;
        if (lum < minLum) {
          minLum = lum;
          bestOffset = offsetPercent;
        }
      }

      // Only snap if there is a distinct valley (crease groove darker than skin)
      if (baseLum - minLum >= 6) {
        return {
          x: Math.round((pt.x + nx * bestOffset) * 10) / 10,
          y: Math.round((pt.y + ny * bestOffset) * 10) / 10,
        };
      }
      return { ...pt };
    });

    // Gentle 3-point smoothing
    return snapped.map((pt, i) => {
      if (i === 0 || i === snapped.length - 1) return pt;
      return {
        x: Math.round((snapped[i - 1].x * 0.2 + pt.x * 0.6 + snapped[i + 1].x * 0.2) * 10) / 10,
        y: Math.round((snapped[i - 1].y * 0.2 + pt.y * 0.6 + snapped[i + 1].y * 0.2) * 10) / 10,
      };
    });
  } catch {
    return points;
  }
}

/**
 * Detects hand landmarks from an image element (HTMLImageElement) or ImageBitmap
 * and snaps creases directly onto visible palm skin lines.
 */
export async function detectHandFromImage(
  imageSource: HTMLImageElement | HTMLCanvasElement | ImageBitmap
): Promise<MediaPipeHandResult | null> {
  try {
    const landmarker = await getHandLandmarker();
    const result = landmarker.detect(imageSource);

    if (!result.landmarks || result.landmarks.length === 0) {
      return null;
    }

    const rawLms = result.landmarks[0];
    const derived = deriveCreasesFromLandmarks(rawLms);
    const confidence = result.handedness?.[0]?.[0]?.score || 0.95;

    // Apply active ridge snapping using pixel contrast from the image
    const snappedHeart = snapPointsToCreaseValleys(imageSource, derived.creases.heartLine);
    const snappedHead = snapPointsToCreaseValleys(imageSource, derived.creases.headLine);
    const snappedLife = snapPointsToCreaseValleys(imageSource, derived.creases.lifeLine);
    const snappedFate = snapPointsToCreaseValleys(imageSource, derived.creases.fateLine);

    return {
      landmarks: derived.landmarks,
      handedness: derived.handedness,
      confidence,
      creases: {
        heartLine: snappedHeart,
        headLine: snappedHead,
        lifeLine: snappedLife,
        fateLine: snappedFate,
      },
      svgPaths: {
        heartLine: pointsToSmoothSvgPath(snappedHeart),
        headLine: pointsToSmoothSvgPath(snappedHead),
        lifeLine: pointsToSmoothSvgPath(snappedLife),
        fateLine: pointsToSmoothSvgPath(snappedFate),
        palmOutline: derived.svgPaths.palmOutline,
      },
    };
  } catch (error) {
    console.warn('MediaPipe hand detection encountered an error:', error);
    return null;
  }
}

/**
 * Helper to process a base64 or blob URL through an HTMLImageElement
 */
export async function detectHandFromUrl(imageUrl: string): Promise<MediaPipeHandResult | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const res = await detectHandFromImage(img);
        resolve(res);
      } catch (err) {
        console.warn('Failed detecting hand from URL:', err);
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
}

