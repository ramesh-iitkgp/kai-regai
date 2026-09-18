import test from 'node:test';
import assert from 'node:assert';
import { MultilingualReadingService } from '../src/services/ai/MultilingualReadingService.js';
import { getAllLanguages, getLanguage, detectSuggestedLanguage } from '../src/types/LanguageRegistry.js';
import { StructuredPalmAnalysis } from '../src/types/contracts.js';

test('Multilingual Reading & Language Registry Tests', async (t) => {
  const mockAnalysis: StructuredPalmAnalysis = {
    scanId: 'scan_multilingual_test',
    hand: 'right',
    imageQualityScore: 0.94,
    lines: {
      life: {
        name: 'Life Line',
        detected: true,
        confidence: 0.95,
        length: 'long',
        curvature: 'deep_arc',
        continuity: 'continuous',
        traditionalMeaningSummary: 'Robust vitality and resilience',
      },
      head: {
        name: 'Head Line',
        detected: true,
        confidence: 0.92,
        length: 'long',
        curvature: 'gentle',
        continuity: 'continuous',
        traditionalMeaningSummary: 'Imaginative and conceptual focus',
      },
      heart: {
        name: 'Heart Line',
        detected: true,
        confidence: 0.93,
        length: 'long',
        curvature: 'moderate',
        continuity: 'continuous',
        traditionalMeaningSummary: 'Idealistic devotion and family honor',
      },
    },
    mounts: [
      { name: 'Jupiter', prominence: 'prominent', traditionalAttribute: 'Dignity and mentorship' },
      { name: 'Venus', prominence: 'prominent', traditionalAttribute: 'Generosity and warmth' },
    ],
    handArchetype: 'Fire Hand',
    detectedTags: ['Long Heart Line', 'Curved Head Line', 'Prominent Jupiter'],
  };

  await t.test('1. Language Registry includes all 12 target Indian languages with native scripts', () => {
    const languages = getAllLanguages();
    assert.strictEqual(languages.length, 12);

    const ids = languages.map((l) => l.id);
    assert.ok(ids.includes('en'));
    assert.ok(ids.includes('hi'));
    assert.ok(ids.includes('ta'));
    assert.ok(ids.includes('te'));
    assert.ok(ids.includes('bn'));
    assert.ok(ids.includes('mr'));
    assert.ok(ids.includes('gu'));
    assert.ok(ids.includes('kn'));
    assert.ok(ids.includes('ml'));
    assert.ok(ids.includes('pa'));
    assert.ok(ids.includes('or'));
    assert.ok(ids.includes('as'));

    // Check authentic script representations
    assert.strictEqual(getLanguage('hi').nativeName, 'हिन्दी');
    assert.strictEqual(getLanguage('ta').nativeName, 'தமிழ்');
    assert.strictEqual(getLanguage('te').nativeName, 'తెలుగు');
    assert.strictEqual(getLanguage('bn').nativeName, 'বাংলা');
  });

  await t.test('2. Suggested language detection from browser preferences', () => {
    const suggestedTa = detectSuggestedLanguage(['ta-IN', 'en-US']);
    assert.strictEqual(suggestedTa.id, 'ta');

    const suggestedHi = detectSuggestedLanguage(['hi-IN', 'en-GB']);
    assert.strictEqual(suggestedHi.id, 'hi');

    const suggestedEnFallback = detectSuggestedLanguage(['fr-FR', 'es-ES']);
    assert.strictEqual(suggestedEnFallback.id, 'en');
  });

  await t.test('3. English Canonical Reading generation preserves classical sources', async () => {
    const readingEn = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'en');
    assert.strictEqual(readingEn.hand, 'right');
    assert.ok(readingEn.archetype.includes('Strategic Builder'));
    assert.strictEqual(readingEn.sections.length, 5);

    const loveSection = readingEn.sections.find((s) => s.id === 'love');
    assert.ok(loveSection);
    assert.ok(loveSection.sources && loveSection.sources.length > 0);
    assert.ok(loveSection.keyObservation.includes('Jupiter'));
  });

  await t.test('4. Hindi (हिन्दी) Reading is culturally authentic and retains underlying citations', async () => {
    const readingHi = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'hi');
    assert.ok(readingHi.archetype.includes('रणनीतिक निर्माता'));
    assert.ok(readingHi.traditionalDisclaimer.includes('सामुद्रिक शास्त्र'));

    const loveHi = readingHi.sections.find((s) => s.id === 'love');
    assert.ok(loveHi);
    assert.strictEqual(loveHi.title, 'प्रेम एवं भावनात्मक स्वभाव');
    assert.ok(loveHi.keyObservation.includes('बृहस्पति'));
    // Crucial: Grounded source citations are preserved intact
    assert.ok(loveHi.sources && loveHi.sources.length > 0);
    assert.ok(['CHEIRO_SYSTEM', 'HINDU_SAMUDRIKA'].includes(loveHi.sources[0].tradition));
  });

  await t.test('5. Tamil (தமிழ்) Reading is authentic and culturally resonant', async () => {
    const readingTa = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'ta');
    assert.ok(readingTa.archetype.includes('செயல்முறை சிற்பி'));
    assert.ok(readingTa.traditionalDisclaimer.includes('சாமுத்திரிகா சாஸ்திரத்தின்'));

    const loveTa = readingTa.sections.find((s) => s.id === 'love');
    assert.ok(loveTa);
    assert.strictEqual(loveTa.title, 'அன்பு மற்றும் உணர்வு நிலை');
    assert.ok(loveTa.traditionalInterpretation.includes('குரு மேட்டை'));
    assert.ok(loveTa.sources && loveTa.sources.length > 0);
  });

  await t.test('6. Telugu (తెలుగు) Reading is authentic and culturally resonant', async () => {
    const readingTe = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'te');
    assert.ok(readingTe.archetype.includes('వ్యూహాత్మక కర్త'));
    assert.ok(readingTe.traditionalDisclaimer.includes('సాముద్రిక సూత్రాలపై'));

    const loveTe = readingTe.sections.find((s) => s.id === 'love');
    assert.ok(loveTe);
    assert.strictEqual(loveTe.title, 'ప్రేమ & భావోద్వేగ స్వభావం');
    assert.ok(loveTe.sources && loveTe.sources.length > 0);
  });

  await t.test('7. Bengali (বাংলা) Reading is authentic and culturally resonant', async () => {
    const readingBn = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'bn');
    assert.ok(readingBn.archetype.includes('কৌশলী রূপকার'));
    assert.ok(readingBn.traditionalDisclaimer.includes('সমুদ্রিক শাস্ত্রীয়'));

    const loveBn = readingBn.sections.find((s) => s.id === 'love');
    assert.ok(loveBn);
    assert.strictEqual(loveBn.title, 'প্রেম ও আবেগীয় প্রবণতা');
    assert.ok(loveBn.sources && loveBn.sources.length > 0);
  });

  await t.test('8. Seamless Fallback: Unsupported language falls back safely to English', async () => {
    const readingFallback = await MultilingualReadingService.generateReading('scan_001', mockAnalysis, 'xyz_unknown');
    assert.ok(readingFallback.archetype.includes('Strategic Builder'));
  });
});
