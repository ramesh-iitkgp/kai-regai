import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import type { FullPalmReading, PalmCrunchPillar, AuspiciousSignals } from '../../types/contracts';
import { Button } from '../ui/Button';
import { Copy, Check, MessageCircle, Download, FileText, Sparkles, User } from 'lucide-react';

export interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reading: FullPalmReading;
  name?: string;
}

export const PROMOTIONAL_APP_URL = 'https://ais-pre-apghasc56pzeie2d6fbpgp-752669983581.asia-east1.run.app';

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  reading,
  name,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const displayName = name?.trim() || 'Palm Seeker';
  const siteUrl = PROMOTIONAL_APP_URL || window.location.origin;

  // Fallback crunch pillars if not present in reading
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

  const defaultSignals: AuspiciousSignals = {
    specialYog: 'Gajakesari Influence & Trishul Mark',
    specialYogMeaning: 'Leadership prestige and moral standing through disciplined effort.',
    luckyDay: 'Thursday (गुरुवार)',
    auspiciousColor: 'Royal Gold & Deep Saffron',
    luckyGemstone: 'Yellow Sapphire (पुखराज) or Natural Pearl',
    guidingMantra: 'Righteous diligence creates lasting fortune (कर्मण्येवाधिकारस्ते).',
  };

  const signals = reading.auspiciousSignals || defaultSignals;

  // Indian Customer WhatsApp Share Text: High impact, bite-sized, promo link at bottom
  const promotionalShareText = `✋ *KAI REGAI (हस्तरेखा) Palmistry Report for ${displayName}*
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(promotionalShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Ultra-crisp, publication-ready Canvas Report Card Generator (920 x 1320)
  const generateCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const width = 920;
    const height = 1320;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // 1. Deep Royal Midnight Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060813');
    bgGrad.addColorStop(0.3, '#0B0F24');
    bgGrad.addColorStop(0.7, '#111736');
    bgGrad.addColorStop(1, '#1A122E');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Auspicious Golden Ambient Radial Light at Center
    const centerGlow = ctx.createRadialGradient(width / 2, 380, 40, width / 2, 380, 450);
    centerGlow.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
    centerGlow.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
    centerGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Royal Double Border with Golden Accents
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    ctx.strokeStyle = 'rgba(196, 181, 253, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(38, 38, width - 76, height - 76);

    // Traditional Sacred Corner Ornaments
    const corner = 28;
    ctx.fillStyle = '#F59E0B';
    // Top-left
    ctx.fillRect(24, 24, corner, 5);
    ctx.fillRect(24, 24, 5, corner);
    // Top-right
    ctx.fillRect(width - 24 - corner, 24, corner, 5);
    ctx.fillRect(width - 29, 24, 5, corner);
    // Bottom-left
    ctx.fillRect(24, height - 29, corner, 5);
    ctx.fillRect(24, height - 24 - corner, 5, corner);
    // Bottom-right
    ctx.fillRect(width - 24 - corner, height - 29, corner, 5);
    ctx.fillRect(width - 29, height - 24 - corner, 5, corner);

    // 4. Header Branding
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillText('✋  KAI REGAI  •  हस्तरेखा', width / 2, 95);

    ctx.fillStyle = '#DDD6FE';
    ctx.font = '700 13px -apple-system, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('OFFICIAL AI SAMUDRIKA SHASTRA REPORT CARD', width / 2, 126);

    // Decorative Golden Knot Divider
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(180, 146);
    ctx.lineTo(width - 180, 146);
    ctx.stroke();

    // 5. User Profile Badge Ribbon
    ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    const ribbonText = `Palm Reading for: ${displayName} • ${reading.hand === 'right' ? 'Right Palm (Active Karma)' : 'Left Palm (Innate Potential)'}`;
    ctx.font = 'bold 16px -apple-system, sans-serif';
    const ribbonWidth = ctx.measureText(ribbonText).width;
    ctx.beginPath();
    ctx.roundRect(width / 2 - ribbonWidth / 2 - 20, 166, ribbonWidth + 40, 36, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(ribbonText, width / 2, 190);

    // 6. Archetype & Vedic Classification Banner
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillText(reading.archetype, width / 2, 246);

    // Trait Badges Row
    const badgeY = 285;
    const badges = reading.summaryBadges.slice(0, 4);
    const badgeSpacing = 190;
    const startBadgeX = (width - (badges.length * badgeSpacing)) / 2 + badgeSpacing / 2;

    badges.forEach((b, idx) => {
      const bx = startBadgeX + (idx * badgeSpacing);
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

    // 7. Section Header: THE MAIN CRUNCH (प्रमुख निष्कर्ष)
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 16px -apple-system, sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.fillText('✦  THE MAIN CRUNCH (प्रमुख जीवन निष्कर्ष)  ✦', width / 2, 345);

    // 8. 4 Main Crunch Pillar Cards (2x2 Grid)
    const cardW = 390;
    const cardH = 145;
    const startGridX = 55;
    const startGridY = 370;
    const gapX = 30;
    const gapY = 20;

    pillars.slice(0, 4).forEach((pillar, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cx = startGridX + col * (cardW + gapX);
      const cy = startGridY + row * (cardH + gapY);

      // Card Background
      ctx.fillStyle = 'rgba(17, 24, 53, 0.85)';
      ctx.strokeStyle = pillar.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 14);
      ctx.fill();
      ctx.stroke();

      // Card Header: Title & Score
      ctx.textAlign = 'left';
      ctx.fillStyle = pillar.color;
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText(pillar.englishName, cx + 18, cy + 32);

      // Score Pill
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(cx + cardW - 100, cy + 14, 84, 26, 13);
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px -apple-system, sans-serif';
      ctx.fillText(`⭐ ${pillar.score}%`, cx + cardW - 58, cy + 31);

      // Traditional Sanskrit Subtitle
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = '600 12px -apple-system, sans-serif';
      ctx.fillText(pillar.traditionalName, cx + 18, cy + 56);

      // 1-line Crunch Verdict
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '500 13px -apple-system, sans-serif';
      const verdictWords = pillar.verdict.split(' ');
      let lineText = '';
      let textY = cy + 82;
      for (let i = 0; i < verdictWords.length; i++) {
        const testLine = lineText + verdictWords[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > (cardW - 36) && i > 0) {
          ctx.fillText(lineText, cx + 18, textY);
          lineText = verdictWords[i] + ' ';
          textY += 20;
        } else {
          lineText = testLine;
        }
      }
      ctx.fillText(lineText, cx + 18, textY);
    });

    // 9. Auspicious Sign & Shubh Yog Ribbon Box
    const yogY = 725;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(55, yogY, width - 110, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 16px -apple-system, sans-serif';
    ctx.fillText(`✨ ${signals.specialYog}`, width / 2, yogY + 36);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 13px -apple-system, sans-serif';
    ctx.fillText(`"${signals.specialYogMeaning}"`, width / 2, yogY + 64);

    // Auspicious Signals Grid inside box
    ctx.fillStyle = '#FBBF24';
    ctx.font = '600 13px -apple-system, sans-serif';
    const guidances = [
      `📅 Day: ${signals.luckyDay}`,
      `🎨 Color: ${signals.auspiciousColor}`,
      `💎 Gem: ${signals.luckyGemstone}`,
    ];
    ctx.fillText(guidances.join('   •   '), width / 2, yogY + 98);

    ctx.fillStyle = '#A78BFA';
    ctx.font = 'italic 12px -apple-system, serif';
    ctx.fillText(`Mantra / Advice: ${signals.guidingMantra}`, width / 2, yogY + 128);

    // 10. Quote / Cultural Excerpt
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'italic 13px -apple-system, serif';
    ctx.fillText(
      '"Samudrika Shastra reflects personal tendencies; righteous karma and wisdom shape destiny."',
      width / 2,
      910
    );

    // 11. HIGH-PROMINENCE APPLICATION URL PROMOTION FOOTER
    // (Requested: "while sharing, at the bottom it should promote the application URL")
    const promoY = 945;
    const promoH = 295;
    ctx.fillStyle = 'rgba(8, 11, 26, 0.96)';
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(55, promoY, width - 110, promoH, 18);
    ctx.fill();
    ctx.stroke();

    // Golden Accent Top Glow in Promo Box
    const boxGlow = ctx.createLinearGradient(0, promoY, 0, promoY + 60);
    boxGlow.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
    boxGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = boxGlow;
    ctx.beginPath();
    ctx.roundRect(55, promoY, width - 110, 60, 18);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('✦  DISCOVER THE STORY IN YOUR HANDS  ✦', width / 2, promoY + 48);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px -apple-system, sans-serif';
    ctx.fillText('Instant AI Palm Reading for ₹10', width / 2, promoY + 95);

    ctx.fillStyle = '#C4B5FD';
    ctx.font = '600 15px -apple-system, sans-serif';
    ctx.fillText('Instant 30s Scan • 100% Private • Grounded in Classical Samudrika Shastra', width / 2, promoY + 130);

    // URL Button Graphic
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(90, promoY + 155, width - 180, 52, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FDE68A';
    ctx.font = 'bold 18px -apple-system, monospace';
    ctx.fillText(`👉  ${siteUrl}`, width / 2, promoY + 188);

    // Trust Badges
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 12px -apple-system, sans-serif';
    ctx.fillText('No Subscription • Works on any smartphone • Scan now at link above', width / 2, promoY + 242);
    ctx.fillText('KAI REGAI • Empowering self-reflection through traditional palmistry', width / 2, promoY + 266);

    return canvas;
  };

  // Download high-res PNG
  const handleDownloadImage = async () => {
    setIsGeneratingImage(true);
    try {
      const canvas = generateCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `KaiRegAI_Report_Card_${displayName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // WhatsApp sharing with image file on mobile or auto-download + text fallback on desktop
  const handleWhatsAppShare = async () => {
    try {
      const canvas = generateCanvas();
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (blob && navigator.canShare && typeof navigator.share === 'function') {
        const file = new File([blob], `KaiRegAI_${displayName.replace(/\s+/g, '_')}_Report.png`, {
          type: 'image/png',
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Kai RegAI Palm Report for ${displayName}`,
            text: promotionalShareText,
            files: [file],
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Native share failed or dismissed, falling back:', err);
    }

    // Fallback: download PNG card, copy formatted text, open WhatsApp
    handleDownloadImage();
    navigator.clipboard.writeText(promotionalShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    setShareNotice('✨ Report Card downloaded! Image & formatted summary are ready to send on WhatsApp.');
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(promotionalShareText)}`;
    window.open(url, '_blank');
  };

  // Generate printable PDF report
  const handleDownloadFullReportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const sectionsHtml = reading.sections.map((sec) => `
      <div class="report-section">
        <div class="section-header">
          <h3 class="section-title">${sec.title}</h3>
          <span class="tagline">${sec.tagline || ''}</span>
        </div>
        <div class="section-body">
          <p><strong>Physical Palm Observation:</strong> ${sec.keyObservation}</p>
          <p><strong>Classical Shastra Interpretation:</strong> ${sec.traditionalInterpretation}</p>
          <div class="advice-box">
            <strong>Vedic Reflection:</strong> ${sec.reflectiveAdvice}
          </div>
          ${sec.sources && sec.sources.length > 0 ? `
            <div class="citation-box">
              <strong>Source Reference:</strong>
              ${sec.sources.map(s => `<span>${s.author ? s.author + ' - ' : ''}<em>${s.sourceTitle}</em> (${s.reference})</span>`).join(' • ')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Kai RegAI Palmistry Report - ${displayName}</title>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            * { box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #0F172A;
              background: #FFFFFF;
              line-height: 1.5;
              padding: 12px;
            }
            .header-bar {
              border-bottom: 3px solid #D97706;
              padding-bottom: 12px;
              margin-bottom: 16px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .logo-title { font-size: 24px; font-weight: 800; color: #B45309; }
            .subtitle { font-size: 12px; color: #4B5563; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
            .meta-grid { text-align: right; font-size: 12px; color: #4B5563; }
            
            /* Crunch Box */
            .crunch-box {
              background: #FFFBEB;
              border: 2px solid #F59E0B;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 20px;
            }
            .crunch-title { font-size: 16px; font-weight: 800; color: #92400E; margin-bottom: 12px; text-align: center; }
            .crunch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .crunch-item { background: #FFFFFF; border: 1px solid #FDE68A; border-radius: 6px; padding: 10px; }
            .crunch-name { font-weight: 700; font-size: 13px; color: #1E293B; display: flex; justify-content: space-between; }
            .crunch-verdict { font-size: 12px; color: #475569; margin-top: 4px; }
            
            .yog-banner { background: #F5F3FF; border-left: 4px solid #7C3AED; padding: 10px 14px; border-radius: 4px; margin-bottom: 18px; font-size: 12px; }
            
            .report-section {
              margin-bottom: 14px;
              padding: 12px;
              border: 1px solid #E2E8F0;
              border-radius: 6px;
              background: #F8FAFC;
              page-break-inside: avoid;
            }
            .section-header { display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 6px; }
            .section-title { font-size: 14px; font-weight: 700; color: #0F172A; margin: 0; }
            .section-body p { margin: 4px 0; font-size: 12.5px; }
            .advice-box { background: #ECFDF5; border-left: 3px solid #10B981; padding: 6px 10px; font-size: 12px; color: #065F46; margin: 6px 0; }
            .citation-box { font-size: 11px; color: #6D28D9; font-style: italic; }

            .promo-footer {
              margin-top: 24px;
              border: 2px dashed #F59E0B;
              background: #FFFDF5;
              border-radius: 8px;
              padding: 12px;
              text-align: center;
              font-size: 12px;
            }
            .promo-url { font-size: 15px; font-weight: 800; color: #D97706; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <div class="logo-title">✋ KAI REGAI (हस्तरेखा)</div>
              <div class="subtitle">Certified AI Samudrika Shastra Report</div>
            </div>
            <div class="meta-grid">
              <div><strong>Name:</strong> ${displayName}</div>
              <div><strong>Hand:</strong> ${reading.hand === 'right' ? 'Right (Active Karma)' : 'Left (Innate Potential)'}</div>
              <div><strong>Date:</strong> ${new Date(reading.generatedAt || Date.now()).toLocaleDateString()}</div>
            </div>
          </div>

          <div class="crunch-box">
            <div class="crunch-title">✦ THE MAIN CRUNCH (प्रमुख जीवन सार) ✦</div>
            <div class="crunch-grid">
              ${pillars.map(p => `
                <div class="crunch-item">
                  <div class="crunch-name">
                    <span>${p.englishName}</span>
                    <span style="color: #D97706;">⭐ ${p.score}%</span>
                  </div>
                  <div style="font-size: 11px; color: #64748B;">${p.traditionalName}</div>
                  <div class="crunch-verdict">${p.verdict}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="yog-banner">
            <strong>Special Yog:</strong> ${signals.specialYog} • <strong>Day:</strong> ${signals.luckyDay} • <strong>Color:</strong> ${signals.auspiciousColor}<br/>
            <strong>Vedic Reflection:</strong> ${signals.guidingMantra}
          </div>

          <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B; margin: 16px 0 8px;">
            Detailed Classical Shastra Analysis
          </h4>
          ${sectionsHtml}

          <div class="promo-footer">
            <div style="font-weight: 700; color: #92400E;">✦ SCAN YOUR PALM & GET YOUR INSTANT READING ✦</div>
            <div>Get your personalized 30-second AI palmistry reading for ₹10 at:</div>
            <div class="promo-url">${siteUrl}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 450);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Report Card: ${displayName}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Interactive Preview of the Report Card */}
        <div
          id="kai-share-card"
          style={{
            background: 'linear-gradient(135deg, #070914 0%, #0F142A 50%, #1A122E 100%)',
            border: '2px solid #F59E0B',
            borderRadius: 'var(--radius-md)',
            padding: '18px 16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '18px' }}>✋</span>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.06em', color: '#FBBF24' }}>
              KAI REGAI • हस्तरेखा
            </span>
          </div>

          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-lavender-warm)', marginBottom: '8px' }}>
            AI SAMUDRIKA SHASTRA REPORT CARD
          </div>

          {/* User Name Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 10px', borderRadius: '12px', marginBottom: '10px' }}>
            <User size={12} color="#F59E0B" />
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#FFFFFF' }}>
              {displayName}
            </span>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            {reading.archetype}
          </h3>

          {/* The Main Crunch (4 Pillars Grid) */}
          <div style={{ textAlign: 'left', margin: '10px 0 12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FBBF24', textAlign: 'center', letterSpacing: '0.05em', marginBottom: '8px' }}>
              ✦ THE MAIN CRUNCH (मुख्य सार) ✦
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {pillars.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    border: `1px solid ${p.color}`,
                    borderRadius: '8px',
                    padding: '8px 10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: p.color }}>{p.englishName}</span>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#FFF' }}>⭐ {p.score}%</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.35 }}>
                    {p.verdict}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auspicious Yog Strip */}
          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '11px',
              color: '#FDE68A',
              marginBottom: '12px',
            }}
          >
            ✨ <strong>Special Yog:</strong> {signals.specialYog} • <strong>Day:</strong> {signals.luckyDay}
          </div>

          {/* HIGH-PROMINENCE APPLICATION URL PROMOTION FOOTER */}
          <div
            style={{
              backgroundColor: 'rgba(8, 11, 26, 0.95)',
              border: '1.5px solid #F59E0B',
              borderRadius: '8px',
              padding: '10px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <Sparkles size={12} />
              <span>SCAN YOUR PALM FOR ₹10</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', marginTop: '3px' }}>
              Instant 30s Reading at:
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#FDE68A', marginTop: '2px', wordBreak: 'break-all' }}>
              {siteUrl}
            </div>
          </div>
        </div>

        {/* Share Notice Banner */}
        {shareNotice && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--accent-emerald)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              fontSize: '12px',
              color: '#A7F3D0',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            {shareNotice}
          </div>
        )}

        {/* Share Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleWhatsAppShare}
            leftIcon={<MessageCircle size={18} />}
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 800,
            }}
          >
            Share Report Card on WhatsApp
          </Button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Button
              variant="secondary"
              fullWidth
              onClick={handleDownloadImage}
              isLoading={isGeneratingImage}
              leftIcon={<Download size={15} />}
            >
              Card (PNG)
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleDownloadFullReportPDF}
              leftIcon={<FileText size={15} />}
            >
              Full Report (PDF)
            </Button>
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleCopyLink}
            leftIcon={copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
          >
            {copied ? 'Copied with Promo URL!' : 'Copy Summary & App Link'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
