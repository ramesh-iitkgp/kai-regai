import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import type { FullPalmReading } from '../../types/contracts';
import { Button } from '../ui/Button';
import { Copy, Check, MessageCircle, Download, FileText, Sparkles, User } from 'lucide-react';

export interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reading: FullPalmReading;
  name?: string;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  reading,
  name,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const siteUrl = window.location.origin;
  const displayName = name?.trim() || 'Palm 1';

  // Comprehensive Structured Summary for WhatsApp
  const promotionalShareText = `✋ *Kai RegAI Palm Analysis for ${displayName}!*

✨ *Archetype:* ${reading.archetype}
🌟 *Key Traits:* ${reading.summaryBadges.join(' • ')}

📖 *Key Palm Insights:*
${reading.sections.slice(0, 3).map(s => `• *${s.title}:* ${s.keyObservation}`).join('\n')}

🔮 *Discover your personal palm reading:*
Instant traditional palmistry reading synthesized by AI in 30 seconds for just ₹10!
🔗 ${siteUrl}

#KaiRegAI #Palmistry #SamudrikaShastra`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(promotionalShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to draw canvas card
  const generateCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const width = 800;
    const height = 1040;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // 1. Deep Midnight Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#070913');
    bgGrad.addColorStop(0.4, '#0B0F22');
    bgGrad.addColorStop(1, '#15102A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Violet Ambient Center Glow
    const radialGlow = ctx.createRadialGradient(width / 2, 420, 50, width / 2, 420, 420);
    radialGlow.addColorStop(0, 'rgba(124, 58, 237, 0.22)');
    radialGlow.addColorStop(0.6, 'rgba(99, 102, 241, 0.08)');
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Double Violet & Lavender Border
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = 'rgba(196, 181, 253, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, width - 84, height - 84);

    // Corner Ornaments
    const cornerSize = 24;
    ctx.fillStyle = '#A78BFA';
    ctx.fillRect(26, 26, cornerSize, 4);
    ctx.fillRect(26, 26, 4, cornerSize);
    ctx.fillRect(width - 26 - cornerSize, 26, cornerSize, 4);
    ctx.fillRect(width - 30, 26, 4, cornerSize);
    ctx.fillRect(26, height - 30, cornerSize, 4);
    ctx.fillRect(26, height - 26 - cornerSize, 4, cornerSize);
    ctx.fillRect(width - 26 - cornerSize, height - 30, cornerSize, 4);
    ctx.fillRect(width - 30, height - 26 - cornerSize, 4, cornerSize);

    // 4. Header Branding
    ctx.textAlign = 'center';
    ctx.fillStyle = '#DDD6FE';
    ctx.font = 'bold 34px -apple-system, sans-serif';
    ctx.fillText('கை  KAI REGAI', width / 2, 105);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 15px -apple-system, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('AI-POWERED TRADITIONAL PALMISTRY', width / 2, 138);

    // Decorative Divider
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.beginPath();
    ctx.moveTo(200, 165);
    ctx.lineTo(width - 200, 165);
    ctx.stroke();

    // 5. User Profile Name Badge
    ctx.fillStyle = 'rgba(124, 58, 237, 0.2)';
    ctx.strokeStyle = 'rgba(196, 181, 253, 0.5)';
    ctx.lineWidth = 1.5;
    const nameLabel = `Reading for: ${displayName}`;
    ctx.font = 'bold 18px -apple-system, sans-serif';
    const nameWidth = ctx.measureText(nameLabel).width;
    ctx.beginPath();
    ctx.roundRect(width / 2 - nameWidth / 2 - 20, 190, nameWidth + 40, 36, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(nameLabel, width / 2, 214);

    // 6. Palm Silhouette Icon
    ctx.font = '64px sans-serif';
    ctx.fillText('✋', width / 2, 305);

    // 7. Archetype Title
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillText(reading.archetype, width / 2, 365);

    // 8. Trait Badges
    const badgeY = 430;
    const badges = reading.summaryBadges;
    const totalBadgesWidth = badges.length * 140;
    let startX = (width - totalBadgesWidth) / 2 + 70;
    badges.forEach((b) => {
      ctx.fillStyle = 'rgba(124, 58, 237, 0.18)';
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
      ctx.lineWidth = 1.5;
      const textWidth = ctx.measureText(b).width;
      ctx.beginPath();
      ctx.roundRect(startX - textWidth / 2 - 14, badgeY - 24, textWidth + 28, 36, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#C4B5FD';
      ctx.font = '600 15px -apple-system, sans-serif';
      ctx.fillText(b, startX, badgeY);
      startX += textWidth + 38;
    });

    // 9. Grounded Insight Excerpt
    ctx.fillStyle = '#CBD5E1';
    ctx.font = 'italic 18px -apple-system, serif';
    const quote = `"${reading.archetypeDescription.slice(0, 180)}..."`;
    const words = quote.split(' ');
    let line = '';
    let textY = 540;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 620 && i > 0) {
        ctx.fillText(line, width / 2, textY);
        line = words[i] + ' ';
        textY += 32;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, textY);

    // 10. Call to Action Footer Box
    const footerBoxY = 780;
    ctx.fillStyle = 'rgba(11, 15, 31, 0.95)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(70, footerBoxY, width - 140, 150, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#C4B5FD';
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.fillText('✨ Discover What Your Palm Reveals', width / 2, footerBoxY + 45);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillText('Read Your Palm For ₹10', width / 2, footerBoxY + 90);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 15px -apple-system, sans-serif';
    ctx.fillText('Instant 30s Scan • 100% Private • kairegai.ai', width / 2, footerBoxY + 124);

    return canvas;
  };

  // Generate real downloadable high-res PNG image card
  const handleDownloadImage = async () => {
    setIsGeneratingImage(true);
    try {
      const canvas = generateCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `KaiRegAI_${displayName.replace(/\s+/g, '_')}_Reading.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // WhatsApp sharing with native file attachment or automatic download fallback
  const handleWhatsAppShare = async () => {
    try {
      const canvas = generateCanvas();
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

      // Check for native mobile file sharing support (iOS Safari / Android Chrome)
      if (blob && navigator.canShare && typeof navigator.share === 'function') {
        const file = new File([blob], `KaiRegAI_${displayName.replace(/\s+/g, '_')}_Palm_Report.png`, {
          type: 'image/png',
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Kai RegAI Palm Reading for ${displayName}`,
            text: promotionalShareText,
            files: [file],
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Native Web Share API unavailable or cancelled:', err);
    }

    // Desktop / Web Fallback:
    // 1. Auto-download the high-res PNG card to user's device
    handleDownloadImage();

    // 2. Copy the full report text to clipboard
    navigator.clipboard.writeText(promotionalShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    // 3. Display clear guidance banner
    setShareNotice('✨ Report image saved to Downloads! Paste text or attach the downloaded report in WhatsApp.');

    // 4. Open WhatsApp
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(promotionalShareText)}`;
    window.open(url, '_blank');
  };

  // Generate complete, detailed printable/PDF Palmistry Report with all sections
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
          <p><strong>Observed Palm Feature:</strong> ${sec.keyObservation}</p>
          <p><strong>Traditional Shastra Meaning:</strong> ${sec.traditionalInterpretation}</p>
          <div class="advice-box">
            <strong>Reflective Guidance:</strong> ${sec.reflectiveAdvice}
          </div>
          ${sec.sources && sec.sources.length > 0 ? `
            <div class="citation-box">
              <strong>Classical Sources:</strong>
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
            @page { size: A4 portrait; margin: 14mm; }
            * { box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #111827;
              background: #ffffff;
              line-height: 1.5;
              padding: 10px;
            }
            .header-bar {
              border-bottom: 3px solid #7C3AED;
              padding-bottom: 12px;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .logo-title { font-size: 26px; font-weight: 800; color: #6D28D9; letter-spacing: 0.05em; }
            .subtitle { font-size: 13px; color: #4B5563; font-weight: 500; }
            .meta-grid { text-align: right; font-size: 12px; color: #4B5563; }
            .meta-grid strong { color: #111827; }
            .archetype-banner {
              background: #F5F3FF;
              border-left: 5px solid #7C3AED;
              border-radius: 8px;
              padding: 16px 20px;
              margin-bottom: 24px;
            }
            .archetype-title { font-size: 22px; font-weight: 800; color: #4C1D95; margin: 0 0 6px; }
            .archetype-desc { font-size: 13px; color: #374151; margin: 0 0 10px; line-height: 1.5; }
            .badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
            .badge-tag { background: #DDD6FE; color: #4C1D95; padding: 4px 10px; border-radius: 14px; font-size: 11px; font-weight: 700; }
            .report-section {
              margin-bottom: 18px;
              padding: 14px 16px;
              border: 1px solid #E5E7EB;
              border-radius: 8px;
              background: #FAFAFA;
              page-break-inside: avoid;
            }
            .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; border-bottom: 1px solid #E5E7EB; padding-bottom: 6px; }
            .section-title { font-size: 16px; font-weight: 700; color: #1F2937; margin: 0; }
            .tagline { font-size: 12px; color: #6B7280; font-style: italic; }
            .section-body p { margin: 6px 0; font-size: 13px; color: #374151; }
            .advice-box { background: #ECFDF5; border-left: 3px solid #10B981; padding: 8px 12px; border-radius: 4px; margin: 8px 0; font-size: 12.5px; color: #065F46; }
            .citation-box { font-size: 11px; color: #6D28D9; font-style: italic; margin-top: 6px; }
            .footer-disclaimer {
              margin-top: 30px;
              border-top: 1px solid #E5E7EB;
              padding-top: 12px;
              font-size: 11px;
              color: #6B7280;
              text-align: center;
              line-height: 1.4;
            }
            @media print {
              body { padding: 0; background: transparent; }
            }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <div class="logo-title">கை KAI REGAI</div>
              <div class="subtitle">Official AI Palmistry Reflection Report</div>
            </div>
            <div class="meta-grid">
              <div><strong>Name:</strong> ${displayName}</div>
              <div><strong>Hand:</strong> ${reading.hand === 'right' ? 'Right Palm (Active Karma)' : 'Left Palm (Innate Potential)'}</div>
              <div><strong>Date:</strong> ${new Date(reading.generatedAt || Date.now()).toLocaleDateString()}</div>
              <div><strong>Reading ID:</strong> ${reading.readingId || 'KR-' + Date.now().toString(36).toUpperCase()}</div>
            </div>
          </div>

          <div class="archetype-banner">
            <div class="archetype-title">Archetype: ${reading.archetype}</div>
            <div class="archetype-desc">${reading.archetypeDescription}</div>
            <div class="badge-row">
              ${reading.summaryBadges.map(b => `<span class="badge-tag">${b}</span>`).join('')}
            </div>
          </div>

          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; color: #6B7280; margin-bottom: 12px;">
            Detailed Dimensional Analysis
          </h3>

          ${sectionsHtml}

          <div class="footer-disclaimer">
            <p><strong>Traditional Shastra Ethics:</strong> ${reading.traditionalDisclaimer || 'This palmistry report is created for personal self-reflection based on historical texts including Brihat Samhita and Samudrika Shastra. It does not make deterministic predictions.'}</p>
            <p style="margin-top: 4px; font-weight: 600;">Generated by Kai RegAI • kairegai.ai</p>
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
    <Modal isOpen={isOpen} onClose={onClose} title={`Share Card: ${displayName}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Visual Share Card Box */}
        <div
          id="kai-share-card"
          style={{
            background: 'linear-gradient(135deg, #0B0F22 0%, #111827 50%, #1E172E 100%)',
            border: '2px solid rgba(124, 58, 237, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Hand Motif */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '140px',
              opacity: 0.04,
              pointerEvents: 'none',
            }}
          >
            ✋
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>கை</span>
            <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.08em', color: 'var(--accent-lavender)' }}>
              KAI REGAI • PALMISTRY
            </span>
          </div>

          {/* User Name Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(124, 58, 237, 0.15)', border: '1px solid var(--border-active)', padding: '3px 12px', borderRadius: '14px', marginBottom: '10px' }}>
            <User size={13} color="var(--accent-lavender)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
              {displayName}
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 12px' }}>
            {reading.archetype}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', margin: '10px 0 14px' }}>
            {reading.summaryBadges.map((badge: string, idx: number) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(124, 58, 237, 0.14)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--accent-lavender-warm)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto 16px', lineHeight: 1.4 }}>
            "{reading.archetypeDescription.slice(0, 130)}..."
          </p>

          {/* Promotional Banner inside card */}
          <div
            style={{
              backgroundColor: 'rgba(10, 13, 26, 0.7)',
              border: '1px solid rgba(124, 58, 237, 0.35)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-lavender)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={13} />
              <span>Discover what your palm reveals for ₹10</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
              Scan in 30 seconds at kairegai.ai
            </div>
          </div>
        </div>

        {/* Share Notice Banner (Guides Desktop Users on File Attachment) */}
        {shareNotice && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--accent-emerald)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleWhatsAppShare}
            leftIcon={<MessageCircle size={18} />}
          >
            Share on WhatsApp (with Report Card)
          </Button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Button
              variant="secondary"
              fullWidth
              onClick={handleDownloadFullReportPDF}
              leftIcon={<FileText size={16} />}
            >
              Full Report (PDF)
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleDownloadImage}
              isLoading={isGeneratingImage}
              leftIcon={<Download size={16} />}
            >
              Card (PNG)
            </Button>
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleCopyLink}
            leftIcon={copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Share Text & Link'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
