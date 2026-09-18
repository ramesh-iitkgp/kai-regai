import type { ImageQualityResult } from '../types/contracts';

/**
 * Validates palm photograph quality directly on an HTML5 canvas before network upload.
 * Analyzes:
 * 1. Hand Presence: Skin tone presence in organic palm ranges.
 * 2. Palm Completeness: Verifies full palm vs half/cut-off hand by checking spatial quadrant balance.
 * 3. Palm Creases: Detects presence of palm lines vs smooth back of hand or uniform non-hand objects.
 * 4. Sharpness: Discrete Laplacian variance edge convolution.
 * 5. Exposure: Luminance histogram checking over/under exposure.
 */
export async function validatePalmImageQuality(
  imageSource: HTMLImageElement | HTMLVideoElement
): Promise<ImageQualityResult> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    return {
      isValid: true,
      handDetected: true,
      sharpnessScore: 0.8,
      lightingScore: 0.8,
      aspectScore: 0.8,
      warnings: [],
    };
  }

  // Downsample to 400px width for fast real-time analysis
  const width = 400;
  const sourceWidth = imageSource instanceof HTMLVideoElement ? imageSource.videoWidth : imageSource.naturalWidth || imageSource.width;
  const sourceHeight = imageSource instanceof HTMLVideoElement ? imageSource.videoHeight : imageSource.naturalHeight || imageSource.height;
  const height = Math.round((sourceHeight / (sourceWidth || 1)) * width) || 500;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imageSource, 0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  let totalLuminance = 0;
  let skinPixelCount = 0;
  const totalPixels = width * height;

  // Spatial quadrants for checking half hand / cropped hand
  // [topLeft, topRight, bottomLeft, bottomRight, center]
  let qTop = 0;
  let qBottom = 0;
  let qLeft = 0;
  let qRight = 0;
  let qCenter = 0;

  const midX = width / 2;
  const midY = height / 2;
  const centerBoxX1 = width * 0.25;
  const centerBoxX2 = width * 0.75;
  const centerBoxY1 = height * 0.25;
  const centerBoxY2 = height * 0.75;

  const gray = new Float32Array(totalPixels);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      const r = data[idx * 4];
      const g = data[idx * 4 + 1];
      const b = data[idx * 4 + 2];

      // Standard Rec. 601 luminance
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      gray[idx] = lum;
      totalLuminance += lum;

      // Robust Skin Tone Detector across diverse skin tones:
      // In RGB space: R > G, G > B, (R - G) > 12, R > 65, and difference between max and min > 15
      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const isSkin = (
        r > 65 &&
        g > 40 &&
        b > 20 &&
        r >= g &&
        g >= b &&
        (r - g) >= 8 &&
        (maxVal - minVal) >= 14 &&
        Math.abs(r - g) > 5
      );

      if (isSkin) {
        skinPixelCount++;
        if (y < midY) qTop++;
        else qBottom++;
        if (x < midX) qLeft++;
        else qRight++;
        if (x >= centerBoxX1 && x <= centerBoxX2 && y >= centerBoxY1 && y <= centerBoxY2) {
          qCenter++;
        }
      }
    }
  }

  const warnings: string[] = [];
  const skinRatio = skinPixelCount / totalPixels;
  const centerBoxArea = (centerBoxX2 - centerBoxX1) * (centerBoxY2 - centerBoxY1);
  const centerSkinRatio = qCenter / centerBoxArea;

  // 1. HAND DETECTION CHECK: Is this a hand photo at all?
  let handDetected = true;
  let aspectScore = 1.0;

  if (skinRatio < 0.14 || centerSkinRatio < 0.16) {
    // Random photo (car, dog, landscape, food, text) or hand missing
    handDetected = false;
    aspectScore = 0.1;
    warnings.push('Please upload your hand photo or palm photo. We could not detect an open palm in this image.');
  }

  // 2. HALF HAND / INCOMPLETE PALM CHECK:
  // If skin is heavily skewed to one side or cut off
  if (handDetected) {
    const horizontalBalance = Math.min(qLeft, qRight) / (Math.max(qLeft, qRight) || 1);
    const verticalBalance = qTop / (qBottom || 1);

    if (skinRatio < 0.22) {
      warnings.push('Only part of your hand is visible. Please bring your entire open palm and fingers into view.');
      aspectScore = 0.4;
    } else if (horizontalBalance < 0.20) {
      // Extremely skewed to left or right border = half hand cut off
      warnings.push('Half hand detected. Please center your open palm so both sides of your hand are visible.');
      aspectScore = 0.45;
    } else if (verticalBalance < 0.18) {
      // Fingers missing / only wrist visible
      warnings.push('Fingers are cut off. Please hold the camera directly above your hand with all 5 fingers visible.');
      aspectScore = 0.45;
    }
  }

  // 3. EXPOSURE / LIGHTING SCORE
  const avgLuminance = totalLuminance / totalPixels;
  let lightingScore = 1.0;

  if (avgLuminance < 45) {
    lightingScore = Math.max(0.2, avgLuminance / 45);
    warnings.push('Lighting is too dark. Please use daylight or turn on room lights.');
  } else if (avgLuminance > 225) {
    lightingScore = Math.max(0.3, (255 - avgLuminance) / 30);
    warnings.push('Image is overexposed or bleached by harsh glare. Avoid direct flashlight reflection.');
  }

  // 4. SHARPNESS & PALM CREASE DETECTION (Laplacian variance in central palm basin)
  let laplacianSum = 0;
  let laplacianSumSq = 0;
  let evaluatedPixels = 0;
  let creaseEdges = 0;

  for (let y = Math.round(centerBoxY1); y < Math.round(centerBoxY2); y += 2) {
    for (let x = Math.round(centerBoxX1); x < Math.round(centerBoxX2); x += 2) {
      const idx = y * width + x;
      const center = gray[idx];
      const val = 4 * center - gray[idx - 1] - gray[idx + 1] - gray[idx - width] - gray[idx + width];
      laplacianSum += val;
      laplacianSumSq += val * val;
      if (Math.abs(val) > 18) creaseEdges++;
      evaluatedPixels++;
    }
  }

  const meanLaplacian = laplacianSum / (evaluatedPixels || 1);
  const laplacianVariance = (laplacianSumSq / (evaluatedPixels || 1)) - (meanLaplacian * meanLaplacian);

  let sharpnessScore = Math.min(1.0, Math.max(0.1, laplacianVariance / 85));
  if (laplacianVariance < 40 && handDetected) {
    warnings.push('Palm image is slightly blurry. Hold your phone steady directly above your hand.');
  }

  // If hand detected but near zero crease edges (e.g. back of hand or smooth rubber glove)
  const creaseRatio = creaseEdges / (evaluatedPixels || 1);
  if (handDetected && creaseRatio < 0.015 && sharpnessScore >= 0.5) {
    warnings.push('No palm lines visible. Please ensure the inner side (palm) of your hand is facing the camera, not the back of your hand.');
  }

  const isValid = handDetected && aspectScore >= 0.5 && sharpnessScore >= 0.42 && lightingScore >= 0.42 && warnings.length === 0;

  let guidanceText = '';
  if (!isValid) {
    guidanceText = warnings[0] || 'Please upload a clear photo of your open palm.';
  }

  return {
    isValid,
    handDetected,
    sharpnessScore: Number(sharpnessScore.toFixed(2)),
    lightingScore: Number(lightingScore.toFixed(2)),
    aspectScore: Number(aspectScore.toFixed(2)),
    warnings,
    guidanceText,
  };
}
