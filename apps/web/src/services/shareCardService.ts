import type { FullPalmReading, PalmCrunchPillar, AuspiciousSignals } from '../types/contracts';

export interface ShareReportCardOptions {
  reading: FullPalmReading;
  displayName: string;
  imageDataUrl?: string;
  siteUrl?: string;
}

export interface ShareResult {
  success: boolean;
  method: 'native' | 'whatsapp_web';
  message: string;
}

/**
 * High-impact promotional WhatsApp formatted message
 */
export function getPromotionalShareText(
  reading: FullPalmReading,
  displayName: string,
  siteUrl = 'https://kairegai.com'
): string {
  const defaultPillars: PalmCrunchPillar[] = [
    {
      id: 'wealth',
      traditionalName: 'Dhana & Bhagya (धन एवं भाग्य)',
      englishName: 'Career & Wealth',
      score: 92,
      ratingLabel: 'Very Favorable (उत्तम)',
      verdict: 'Strong self-earned wealth. Career surges post-28 with lasting stability.',
      keyIndicator: 'Fate line ascending towards Saturn Mount',
      color: '#F59E0B',
    },
    {
      id: 'love',
      traditionalName: 'Hridaya & Vivaha (विवाह एवं सम्बंध)',
      englishName: 'Love & Family',
      score: 88,
      ratingLabel: 'Harmonious (मधुर)',
      verdict: 'Deep emotional fidelity and devotion. Mutual respect in family life.',
      keyIndicator: 'Curving Heart line culminating at Jupiter Mount',
      color: '#F43F5E',
    },
    {
      id: 'mind',
      traditionalName: 'Buddhi & Viveka (बुद्धि एवं विवेक)',
      englishName: 'Mind & Decision',
      score: 86,
      ratingLabel: 'Strategic (तीक्ष्ण)',
      verdict: 'Sharp analytical instincts. Calm composure under high pressure.',
      keyIndicator: 'Long Head line with balanced Moon Mount slope',
      color: '#38BDF8',
    },
    {
      id: 'health',
      traditionalName: 'Ayur & Swasthya (आयु एवं स्वास्थ्य)',
      englishName: 'Health & Vitality',
      score: 90,
      ratingLabel: 'Robust (दीर्घायु)',
      verdict: 'High natural stamina reserves. Resilient physical recovery.',
      keyIndicator: 'Unbroken generous arc around Venus Mount',
      color: '#10B981',
    },
  ];

  const pillars = reading.crunchPillars && reading.crunchPillars.length > 0
    ? reading.crunchPillars
    : defaultPillars;

  const signals: AuspiciousSignals = reading.auspiciousSignals || {
    specialYog: 'Gajakesari Influence & Trishul Mark',
    specialYogMeaning: 'Leadership prestige and moral standing through disciplined effort.',
    luckyDay: 'Thursday (गुरुवार)',
    auspiciousColor: 'Royal Gold & Deep Saffron',
    luckyGemstone: 'Yellow Sapphire (पुखराज) or Natural Pearl',
    guidingMantra: 'Righteous diligence creates lasting fortune (कर्मण्येवाधिकारस्ते).',
  };

  return `✋ *KAI REGAI (हस्तरेखा) Palmistry Report for ${displayName}*
✨ *Archetype:* ${reading.archetype}

📊 *THE MAIN CRUNCH (मुख्य सार):*
💰 *Career & Wealth (धन एवं भाग्य):* ${pillars[0]?.score}% (${pillars[0]?.ratingLabel})
↳ ${pillars[0]?.verdict}

❤️ *Love & Family (विवाह एवं सम्बंध):* ${pillars[1]?.score}% (${pillars[1]?.ratingLabel})
↳ ${pillars[1]?.verdict}

🧠 *Mind & Decisions (बुद्धि एवं विवेक):* ${pillars[2]?.score}% (${pillars[2]?.ratingLabel})
↳ ${pillars[2]?.verdict}

🌿 *Health & Vitality (आयु एवं स्वास्थ्य):* ${pillars[3]?.score}% (${pillars[3]?.ratingLabel})
↳ ${pillars[3]?.verdict}

🌟 *Special Yog:* ${signals.specialYog}
📅 *Lucky Day:* ${signals.luckyDay} | 🎨 *Lucky Color:* ${signals.auspiciousColor}

━━━━━━━━━━━━━━━━━━━━━━━━
🔮 *Discover what your palm reveals:*
Scan your palm with AI in 30 seconds for just ₹10!
👉 ${siteUrl}
━━━━━━━━━━━━━━━━━━━━━━━━
#KaiRegAI #Palmistry #SamudrikaShastra #Hastarekha`;
}

/**
 * Generates an ultra-crisp, publication-ready 920x1400 Canvas Report Card
 */
export async function generateShareCardCanvas(
  reading: FullPalmReading,
  displayName: string,
  imageDataUrl?: string,
  siteUrl = 'https://kairegai.com'
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const width = 920;
  const height = 1400;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const defaultPillars: PalmCrunchPillar[] = [
    {
      id: 'wealth',
      traditionalName: 'Dhana & Bhagya (धन एवं भाग्य)',
      englishName: 'Career & Wealth',
      score: 92,
      ratingLabel: 'Very Favorable (उत्तम)',
      verdict: 'Strong self-earned wealth. Career surges post-28 with lasting stability.',
      keyIndicator: 'Fate line ascending towards Saturn Mount',
      color: '#F59E0B',
    },
    {
      id: 'love',
      traditionalName: 'Hridaya & Vivaha (विवाह एवं सम्बंध)',
      englishName: 'Love & Family',
      score: 88,
      ratingLabel: 'Harmonious (मधुर)',
      verdict: 'Deep emotional fidelity and devotion. Mutual respect in family life.',
      keyIndicator: 'Curving Heart line culminating at Jupiter Mount',
      color: '#F43F5E',
    },
    {
      id: 'mind',
      traditionalName: 'Buddhi & Viveka (बुद्धि एवं विवेक)',
      englishName: 'Mind & Decision',
      score: 86,
      ratingLabel: 'Strategic (तीक्ष्ण)',
      verdict: 'Sharp analytical instincts. Calm composure under high pressure.',
      keyIndicator: 'Long Head line with balanced Moon Mount slope',
      color: '#38BDF8',
    },
    {
      id: 'health',
      traditionalName: 'Ayur & Swasthya (आयु एवं स्वास्थ्य)',
      englishName: 'Health & Vitality',
      score: 90,
      ratingLabel: 'Robust (दीर्घायु)',
      verdict: 'High natural stamina reserves. Resilient physical recovery.',
      keyIndicator: 'Unbroken generous arc around Venus Mount',
      color: '#10B981',
    },
  ];

  const pillars = reading.crunchPillars && reading.crunchPillars.length > 0
    ? reading.crunchPillars
    : defaultPillars;

  const signals: AuspiciousSignals = reading.auspiciousSignals || {
    specialYog: 'Gajakesari Influence & Trishul Mark',
    specialYogMeaning: 'Leadership prestige and moral standing through disciplined effort.',
    luckyDay: 'Thursday (गुरुवार)',
    auspiciousColor: 'Royal Gold & Deep Saffron',
    luckyGemstone: 'Yellow Sapphire (पुखराज) or Natural Pearl',
    guidingMantra: 'Righteous diligence creates lasting fortune (कर्मण्येवाधिकारस्ते).',
  };

  // 1. Deep Royal Midnight Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#060813');
  bgGrad.addColorStop(0.3, '#0B0F24');
  bgGrad.addColorStop(0.7, '#111736');
  bgGrad.addColorStop(1, '#1A122E');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Auspicious Golden Ambient Radial Light at Center
  const centerGlow = ctx.createRadialGradient(width / 2, 400, 40, width / 2, 400, 450);
  centerGlow.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
  centerGlow.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
  centerGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. Ornate Double Golden Border
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // 4. Header: Brand Logo & Vedic Sanctum Emblem
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 32px -apple-system, sans-serif';
  ctx.fillText('⚡ KAI REGAI (கை ரேகை)', width / 2, 85);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px -apple-system, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('ANCIENT SAMUDRIKA SHASTRA • RIGOROUS AI PALMISTRY', width / 2, 118);

  // 5. User Profile Badge Ribbon
  ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
  ctx.lineWidth = 1.5;
  const ribbonText = `Palm Reading for: ${displayName} • ${reading.hand === 'right' ? 'Right Palm' : 'Left Palm'}`;
  ctx.font = 'bold 15px -apple-system, sans-serif';
  const ribbonWidth = ctx.measureText(ribbonText).width;
  ctx.beginPath();
  ctx.roundRect(width / 2 - ribbonWidth / 2 - 18, 154, ribbonWidth + 36, 32, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(ribbonText, width / 2, 176);

  // 6. User Analyzed Palm Photo Avatar
  if (imageDataUrl) {
    try {
      const palmImg = new Image();
      palmImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve) => {
        palmImg.onload = () => resolve();
        palmImg.onerror = () => resolve();
        palmImg.src = imageDataUrl;
      });

      const avatarX = width / 2;
      const avatarY = 240;
      const avatarRadius = 42;

      ctx.save();
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 16;
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(palmImg, avatarX - avatarRadius, avatarY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
      ctx.restore();
    } catch (err) {
      console.warn('Canvas palm avatar render skipped:', err);
    }
  }

  // 7. Archetype & Vedic Classification Banner
  const archetypeY = imageDataUrl ? 322 : 236;
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText(reading.archetype, width / 2, archetypeY);

  // Trait Badges Row
  const badgeY = archetypeY + 36;
  const badges = reading.summaryBadges.slice(0, 4);
  const badgeSpacing = 190;
  const startBadgeX = (width - badges.length * badgeSpacing) / 2 + badgeSpacing / 2;

  badges.forEach((b: string, idx: number) => {
    const bx = startBadgeX + idx * badgeSpacing;
    ctx.fillStyle = 'rgba(124, 58, 237, 0.25)';
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.45)';
    ctx.lineWidth = 1;
    const bw = ctx.measureText(b).width;
    ctx.beginPath();
    ctx.roundRect(bx - bw / 2 - 12, badgeY - 18, bw + 24, 28, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#C4B5FD';
    ctx.font = '600 13px -apple-system, sans-serif';
    ctx.fillText(b, bx, badgeY);
  });

  // 8. Section Header: THE MAIN CRUNCH
  const crunchHeaderY = badgeY + 48;
  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 16px -apple-system, sans-serif';
  ctx.fillText('✦  THE MAIN CRUNCH (प्रमुख जीवन निष्कर्ष)  ✦', width / 2, crunchHeaderY);

  // 9. 4 Main Crunch Pillar Cards (2x2 Grid)
  const cardW = 390;
  const cardH = 140;
  const startGridX = 55;
  const startGridY = crunchHeaderY + 22;
  const gapX = 30;
  const gapY = 16;

  pillars.slice(0, 4).forEach((pillar: PalmCrunchPillar, idx: number) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = startGridX + col * (cardW + gapX);
    const cy = startGridY + row * (cardH + gapY);

    ctx.fillStyle = 'rgba(17, 24, 53, 0.85)';
    ctx.strokeStyle = pillar.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cardW, cardH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = pillar.color;
    ctx.font = 'bold 16px -apple-system, sans-serif';
    ctx.fillText(pillar.englishName, cx + 18, cy + 30);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(cx + cardW - 100, cy + 12, 84, 26, 13);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px -apple-system, sans-serif';
    ctx.fillText(`⭐ ${pillar.score}%`, cx + cardW - 58, cy + 29);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 12px -apple-system, sans-serif';
    ctx.fillText(pillar.traditionalName, cx + 18, cy + 54);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 13px -apple-system, sans-serif';
    const verdictWords = pillar.verdict.split(' ');
    let lineText = '';
    let textY = cy + 78;
    for (let i = 0; i < verdictWords.length; i++) {
      const testLine = lineText + verdictWords[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 36 && i > 0) {
        ctx.fillText(lineText, cx + 18, textY);
        lineText = verdictWords[i] + ' ';
        textY += 19;
      } else {
        lineText = testLine;
      }
    }
    ctx.fillText(lineText, cx + 18, textY);
  });

  // 10. Auspicious Sign & Shubh Yog Ribbon Box
  const yogY = startGridY + cardH * 2 + gapY + 18;
  ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(55, yogY, width - 110, 142, 16);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 16px -apple-system, sans-serif';
  ctx.fillText(`✨ ${signals.specialYog}`, width / 2, yogY + 34);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 13px -apple-system, sans-serif';
  ctx.fillText(`"${signals.specialYogMeaning}"`, width / 2, yogY + 60);

  ctx.fillStyle = '#FBBF24';
  ctx.font = '600 13px -apple-system, sans-serif';
  const guidances = [
    `📅 Day: ${signals.luckyDay}`,
    `🎨 Color: ${signals.auspiciousColor}`,
    `💎 Gem: ${signals.luckyGemstone}`,
  ];
  ctx.fillText(guidances.join('   •   '), width / 2, yogY + 90);

  ctx.fillStyle = '#A78BFA';
  ctx.font = 'italic 12px -apple-system, serif';
  ctx.fillText(`Mantra / Advice: ${signals.guidingMantra}`, width / 2, yogY + 118);

  // 11. Classical Grounding Stamp
  ctx.textAlign = 'center';
  ctx.fillStyle = '#DDD6FE';
  ctx.font = 'bold 12.5px -apple-system, sans-serif';
  ctx.fillText('⚖️ Verified Classical Alignment: Brihat Samudrika • Cheiro (1894) • Benham (1900)', width / 2, yogY + 166);

  // 12. Promotion Footer
  const promoY = yogY + 188;
  const promoH = 220;
  ctx.fillStyle = 'rgba(8, 11, 26, 0.96)';
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(55, promoY, width - 110, promoH, 18);
  ctx.fill();
  ctx.stroke();

  const boxGlow = ctx.createLinearGradient(0, promoY, 0, promoY + 50);
  boxGlow.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
  boxGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = boxGlow;
  ctx.beginPath();
  ctx.roundRect(55, promoY, width - 110, 50, 18);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 20px -apple-system, sans-serif';
  ctx.fillText('✦  DISCOVER THE STORY IN YOUR HANDS  ✦', width / 2, promoY + 42);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText('Instant AI Palm Reading for ₹10', width / 2, promoY + 84);

  ctx.fillStyle = '#C4B5FD';
  ctx.font = '600 14px -apple-system, sans-serif';
  ctx.fillText('Instant 30s Scan • 100% Private • Grounded in Classical Samudrika Shastra', width / 2, promoY + 114);

  // URL Button Graphic
  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(90, promoY + 134, width - 180, 46, 23);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 17px -apple-system, monospace';
  ctx.fillText(`👉  ${siteUrl}`, width / 2, promoY + 163);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 11.5px -apple-system, sans-serif';
  ctx.fillText('No Subscription • Works on any smartphone • Scan now at link above', width / 2, promoY + 200);

  return canvas;
}

/**
 * 1-Click WhatsApp Share:
 * On mobile, uses Web Share API with the generated report card image and text.
 * On desktop, triggers image download + copies text + opens WhatsApp Web directly.
 */
export async function shareReportCardToWhatsApp({
  reading,
  displayName,
  imageDataUrl,
  siteUrl = 'https://kairegai.com',
}: ShareReportCardOptions): Promise<ShareResult> {
  const shareText = getPromotionalShareText(reading, displayName, siteUrl);

  try {
    const canvas = await generateShareCardCanvas(reading, displayName, imageDataUrl, siteUrl);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

    // Try native Web Share API (Mobile WhatsApp with attached image)
    if (blob && navigator.canShare && typeof navigator.share === 'function') {
      const file = new File([blob], `KaiRegAI_${displayName.replace(/\s+/g, '_')}_Report.png`, {
        type: 'image/png',
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Kai RegAI Palm Report for ${displayName}`,
          text: shareText,
          files: [file],
        });
        return {
          success: true,
          method: 'native',
          message: 'Report Card shared directly to WhatsApp!',
        };
      }
    }
  } catch (err: any) {
    // If user cancelled or dismissed, return cleanly
    if (err?.name === 'AbortError') {
      return { success: false, method: 'native', message: 'Share cancelled.' };
    }
    console.warn('Native share failed, falling back to WhatsApp Web/API:', err);
  }

  // Fallback for Desktop / Browsers without file sharing:
  // 1. Auto-download PNG image card
  try {
    const canvas = await generateShareCardCanvas(reading, displayName, imageDataUrl, siteUrl);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `KaiRegAI_Report_Card_${displayName.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  } catch (e) {
    console.warn('Failed auto-downloading PNG image:', e);
  }

  // 2. Copy summary to clipboard
  try {
    await navigator.clipboard.writeText(shareText);
  } catch {
    // Clipboard permission might be denied
  }

  // 3. Open WhatsApp directly in 1 click
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(whatsappUrl, '_blank');

  return {
    success: true,
    method: 'whatsapp_web',
    message: 'Report Card image downloaded & WhatsApp opened with summary!',
  };
}
