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
 * Derives the 4 principal Shastra palm lines dynamically from the 21 MediaPipe skeletal landmarks
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

  // Determine handedness: for a palmar view (palm facing camera):
  // If thumb is to the left of the pinky, it's typically a right hand.
  const isRight = thumbMcp.x < pinkyMcp.x;
  const handedness = isRight ? 'right' : 'left';

  // Define the base width of the palm across the wrist heel:
  // Radial side: toward thumb base (thenar eminence)
  const wristRadial = lerp(wrist, thumbCmc, 0.55);
  // Ulnar side: toward hypothenar eminence (outer wrist below pinky)
  const knuckleTransVector = {
    x: pinkyMcp.x - indexMcp.x,
    y: pinkyMcp.y - indexMcp.y,
  };
  const wristUlnar = {
    x: wrist.x + knuckleTransVector.x * 0.35,
    y: wrist.y + knuckleTransVector.y * 0.35,
  };

  // Anatomical quadrilateral palm interpolator:
  // uLong: 0 = wrist base, 1 = knuckle arch (distal palm boundary)
  // uTrans: 0 = index knuckle (radial), 1 = pinky knuckle (ulnar)
  const getPalmPoint = (uLong: number, uTrans: number): Point2D => {
    // Knuckle position along the upper arch
    let knucklePt: Point2D;
    if (uTrans <= 0.33) {
      knucklePt = lerp(indexMcp, middleMcp, uTrans / 0.33);
    } else if (uTrans <= 0.66) {
      knucklePt = lerp(middleMcp, ringMcp, (uTrans - 0.33) / 0.33);
    } else {
      knucklePt = lerp(ringMcp, pinkyMcp, Math.min(1.0, (uTrans - 0.66) / 0.34));
    }

    // Wrist base position along the lower heel
    const basePt = lerp(wristRadial, wristUlnar, uTrans);

    return lerp(basePt, knucklePt, uLong);
  };

  // 1. Heart Line (Hridaya Rekha) — Distal transverse crease
  // Starts on the ulnar percussion edge below pinky, curves across upper palm toward index knuckle
  const heartLine: Point2D[] = [
    getPalmPoint(0.72, 1.0),
    getPalmPoint(0.68, 0.70),
    getPalmPoint(0.65, 0.40),
    getPalmPoint(0.72, 0.18),
    getPalmPoint(0.80, 0.08),
  ];

  // 2. Head Line (Matru Rekha) — Proximal transverse crease
  // Starts at radial edge between index & thumb, traverses diagonally across mid-palm
  const headLine: Point2D[] = [
    getPalmPoint(0.64, 0.04),
    getPalmPoint(0.55, 0.28),
    getPalmPoint(0.48, 0.58),
    getPalmPoint(0.42, 0.88),
  ];

  // 3. Life Line (Ayur Rekha) — Thenar crease
  // Arcs smoothly around the Mount of Venus (thumb base) towards the wrist
  const lifeLine: Point2D[] = [
    getPalmPoint(0.64, 0.05),
    getPalmPoint(0.50, 0.18),
    getPalmPoint(0.34, 0.22),
    getPalmPoint(0.18, 0.15),
    getPalmPoint(0.06, 0.05),
  ];

  // 4. Fate Line (Karma Rekha) — Vertical median crease
  // Ascends vertically from wrist up the palm center toward Mount of Saturn (middle knuckle)
  const fateLine: Point2D[] = [
    getPalmPoint(0.10, 0.48),
    getPalmPoint(0.35, 0.46),
    getPalmPoint(0.58, 0.42),
    getPalmPoint(0.78, 0.38),
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
 * Detects hand landmarks from an image element (HTMLImageElement) or ImageBitmap
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

    return {
      landmarks: derived.landmarks,
      handedness: derived.handedness,
      confidence,
      creases: derived.creases,
      svgPaths: derived.svgPaths,
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
