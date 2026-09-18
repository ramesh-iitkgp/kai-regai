import test from 'node:test';
import assert from 'node:assert';
import { TRANSLATIONS } from '../src/locales/translations.js';
import { SUPPORTED_LANGUAGES, getAllLanguages } from '../src/types/LanguageRegistry.js';

test('Web App Translation & Localization Integrity Tests', async (t) => {
  const languageList = getAllLanguages();

  await t.test('1. Every registered language has a translation dictionary defined', () => {
    for (const lang of languageList) {
      assert.ok(
        TRANSLATIONS[lang.id],
        `Missing translation dictionary for registered language: ${lang.id} (${lang.name})`
      );
    }
  });

  await t.test('2. All translation dictionaries contain required non-empty keys', () => {
    const requiredSections = [
      'nav',
      'hero',
      'handSelect',
      'scanner',
      'preview',
      'loading',
      'overlay',
      'payment',
      'reading',
      'modal',
    ] as const;

    for (const lang of languageList) {
      const dict = TRANSLATIONS[lang.id];
      assert.ok(dict, `Dictionary missing for ${lang.id}`);

      for (const section of requiredSections) {
        assert.ok((dict as any)[section], `Section ${section} missing in ${lang.id}`);
      }

      // Check specific critical keys
      assert.ok(dict.hero.badge.length > 0, `hero.badge empty in ${lang.id}`);
      assert.ok(dict.hero.cta.length > 0, `hero.cta empty in ${lang.id}`);
      assert.ok(dict.handSelect.title.length > 0, `handSelect.title empty in ${lang.id}`);
      assert.ok(dict.reading.disclaimer.length > 0, `reading.disclaimer empty in ${lang.id}`);
      assert.ok(dict.payment.title.length > 0, `payment.title empty in ${lang.id}`);
    }
  });

  await t.test('3. Currency & Locale formatting tests', () => {
    const en = SUPPORTED_LANGUAGES['en'];
    const hi = SUPPORTED_LANGUAGES['hi'];
    const ta = SUPPORTED_LANGUAGES['ta'];

    assert.strictEqual(en.currencySymbol, '₹');
    assert.strictEqual(hi.currencySymbol, '₹');
    assert.strictEqual(ta.currencySymbol, '₹');
  });

  await t.test('4. Native script display validation', () => {
    assert.strictEqual(SUPPORTED_LANGUAGES['hi'].nativeName, 'हिन्दी');
    assert.strictEqual(SUPPORTED_LANGUAGES['ta'].nativeName, 'தமிழ்');
    assert.strictEqual(SUPPORTED_LANGUAGES['te'].nativeName, 'తెలుగు');
    assert.strictEqual(SUPPORTED_LANGUAGES['bn'].nativeName, 'বাংলা');
    assert.strictEqual(SUPPORTED_LANGUAGES['mr'].nativeName, 'मराठी');
    assert.strictEqual(SUPPORTED_LANGUAGES['gu'].nativeName, 'ગુજરાતી');
    assert.strictEqual(SUPPORTED_LANGUAGES['kn'].nativeName, 'ಕನ್ನಡ');
    assert.strictEqual(SUPPORTED_LANGUAGES['ml'].nativeName, 'മലയാളം');
    assert.strictEqual(SUPPORTED_LANGUAGES['pa'].nativeName, 'ਪੰਜਾਬੀ');
    assert.strictEqual(SUPPORTED_LANGUAGES['or'].nativeName, 'ଓଡ଼ିଆ');
    assert.strictEqual(SUPPORTED_LANGUAGES['as'].nativeName, 'অসমীয়া');
  });
});
