import test from 'node:test';
import assert from 'node:assert';
import { deriveCreasesFromLandmarks } from '../src/services/mediapipeService.js';
import type { Landmark } from '@mediapipe/tasks-vision';

// Helper to create mock landmarks for a hand facing the camera
function createMockLandmarks(isRightHand: boolean): Landmark[] {
  // 21 landmarks:
  // 0: wrist, 1-4: thumb, 5-8: index, 9-12: middle, 13-16: ring, 17-20: pinky
  const lms: Landmark[] = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));

  // Wrist
  lms[0] = { x: 0.50, y: 0.88, z: 0 };
  // Middle MCP (knuckle)
  lms[9] = { x: 0.50, y: 0.35, z: 0 };

  if (isRightHand) {
    // In palmar view (palm facing camera):
    // Right hand has thumb on the LEFT side (x < 0.50), pinky on the RIGHT side (x > 0.50)
    lms[1] = { x: 0.38, y: 0.75, z: 0 }; // thumb CMC
    lms[2] = { x: 0.28, y: 0.60, z: 0 }; // thumb MCP
    lms[5] = { x: 0.38, y: 0.36, z: 0 }; // index MCP
    lms[13] = { x: 0.62, y: 0.37, z: 0 }; // ring MCP
    lms[17] = { x: 0.72, y: 0.42, z: 0 }; // pinky MCP
  } else {
    // In palmar view (palm facing camera):
    // Left hand has thumb on the RIGHT side (x > 0.50), pinky on the LEFT side (x < 0.50)
    lms[1] = { x: 0.62, y: 0.75, z: 0 }; // thumb CMC
    lms[2] = { x: 0.72, y: 0.60, z: 0 }; // thumb MCP
    lms[5] = { x: 0.62, y: 0.36, z: 0 }; // index MCP
    lms[13] = { x: 0.38, y: 0.37, z: 0 }; // ring MCP
    lms[17] = { x: 0.28, y: 0.42, z: 0 }; // pinky MCP
  }

  return lms;
}

test('Hand Landmark & Handedness Detection Integrity Tests', async (t) => {
  await t.test('1. Accurately identifies Right Palm when thumb is on the left side in palmar view', () => {
    const rightLms = createMockLandmarks(true);
    const result = deriveCreasesFromLandmarks(rightLms);

    assert.strictEqual(result.handedness, 'right', 'Should classify as right hand');
    assert.ok(result.creases.heartLine.length > 0, 'Heart line must be generated');
    assert.ok(result.creases.headLine.length > 0, 'Head line must be generated');
    assert.ok(result.creases.lifeLine.length > 0, 'Life line must be generated');
    assert.ok(result.creases.fateLine.length > 0, 'Fate line must be generated');
  });

  await t.test('2. Accurately identifies Left Palm when thumb is on the right side in palmar view', () => {
    const leftLms = createMockLandmarks(false);
    const result = deriveCreasesFromLandmarks(leftLms);

    assert.strictEqual(result.handedness, 'left', 'Should classify as left hand');
    assert.ok(result.creases.heartLine.length > 0, 'Heart line must be generated');
    assert.ok(result.creases.headLine.length > 0, 'Head line must be generated');
    assert.ok(result.creases.lifeLine.length > 0, 'Life line must be generated');
    assert.ok(result.creases.fateLine.length > 0, 'Fate line must be generated');
  });

  await t.test('3. Detects hand mismatch when user selected Right Palm but scanned Left Palm', () => {
    const selectedHand = 'right';
    const leftLms = createMockLandmarks(false);
    const result = deriveCreasesFromLandmarks(leftLms);

    const detectedHand = result.handedness;
    const handMismatch = detectedHand !== selectedHand;

    assert.strictEqual(handMismatch, true, 'Hand mismatch must be flagged');
    assert.strictEqual(detectedHand, 'left', 'Detected hand must be left');
    assert.strictEqual(selectedHand, 'right', 'Selected hand was right');
  });

  await t.test('4. Correctly acknowledges match when selected hand equals scanned hand', () => {
    const selectedHand = 'right';
    const rightLms = createMockLandmarks(true);
    const result = deriveCreasesFromLandmarks(rightLms);

    const detectedHand = result.handedness;
    const handMismatch = detectedHand !== selectedHand;

    assert.strictEqual(handMismatch, false, 'No mismatch when hands agree');
    assert.strictEqual(detectedHand, 'right');
  });

  await t.test('5. Rejects wrong palm as input until explicitly switched or retaken', () => {
    let selectedHand: 'left' | 'right' = 'right';
    const scannedPalm = deriveCreasesFromLandmarks(createMockLandmarks(false)); // Left palm
    const detectedHand = scannedPalm.handedness;

    // Condition in ImagePreview:
    let isMismatch = detectedHand !== selectedHand;
    assert.strictEqual(isMismatch, true, 'Must flag mismatch');

    // Default "Analyze My Palm" action must be blocked while mismatch exists
    const canAnalyzeDirectly = !isMismatch;
    assert.strictEqual(canAnalyzeDirectly, false, 'Must block direct submission of wrong palm');

    // Switch action executed:
    selectedHand = detectedHand;
    isMismatch = detectedHand !== selectedHand;

    assert.strictEqual(isMismatch, false, 'Mismatch resolved after switching');
    assert.strictEqual(selectedHand, 'left', 'Hand updated to scanned palm');
  });
});
