import React, { useState, useEffect } from 'react';
import type { FullPalmReading, StructuredPalmAnalysis, ReadingCardSection, PalmCrunchPillar, AuspiciousSignals } from '../../types/contracts';
import { PalmAnalysisOverlay } from '../analysis/PalmAnalysisOverlay';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
  Heart,
  Brain,
  Briefcase,
  Coins,
  Sparkles,
  Compass,
  ChevronDown,
  ChevronUp,
  Share2,
  RotateCcw,
  BookOpen,
  MessageCircle,
  Edit2,
  Check,
  X,
  User,
  Star,
  Copy
} from 'lucide-react';
import { SourceCitationModal } from '../modals/SourceCitationModal';
import { useLanguage } from '../../context/LanguageContext';
import { ReadingHistoryService } from '../../services/ReadingHistoryService';
import { PROMOTIONAL_APP_URL } from './ShareCardModal';

export interface ReadingResultViewProps {
  reading: FullPalmReading;
  analysis: StructuredPalmAnalysis;
  imageDataUrl: string;
  userName?: string;
  onRename?: (newName: string) => void;
  onShare: () => void;
  onReset: () => void;
  onPurgePhoto?: () => void;
  onOpenAskKai?: () => void;
}

type ActiveTab = 'crunch' | 'palm' | 'shastra';

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  reading,
  analysis,
  imageDataUrl,
  userName = 'Palm Seeker',
  onRename,
  onShare,
  onReset,
  onPurgePhoto,
  onOpenAskKai,
}) => {
  const { currentLanguage, t, formatDate } = useLanguage();
  const [currentName, setCurrentName] = useState(userName);
  const [isRenaming, setIsRenaming] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [activeTab, setActiveTab] = useState<ActiveTab>('crunch');
  const [expandedSection, setExpandedSection] = useState<string | null>('love');
  const [selectedCitationSection, setSelectedCitationSection] = useState<ReadingCardSection | null>(null);
  const [highlightedLine, setHighlightedLine] = useState<string | null>('heart');
  const [copiedLink, setCopiedLink] = useState(false);

  // Automatically record to local reading history upon generation
  useEffect(() => {
    ReadingHistoryService.saveReading(reading, imageDataUrl, currentLanguage.id, currentName);
  }, [reading, imageDataUrl, currentLanguage.id, currentName]);

  const toggleSection = (id: string) => {
    const isCurrentlyExpanded = expandedSection === id;
    setExpandedSection(isCurrentlyExpanded ? null : id);
    if (!isCurrentlyExpanded) {
      if (id === 'love') setHighlightedLine('heart');
      else if (id === 'mind') setHighlightedLine('head');
      else if (id === 'vitality') setHighlightedLine('life');
      else if (id === 'career') setHighlightedLine('fate');
      else setHighlightedLine(null);
    }
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart size={18} color="#F43F5E" />;
      case 'brain':
        return <Brain size={18} color="#38BDF8" />;
      case 'briefcase':
        return <Briefcase size={18} color="#8B5CF6" />;
      case 'coins':
        return <Coins size={18} color="#10B981" />;
      case 'sparkles':
        return <Sparkles size={18} color="#FBBF24" />;
      case 'compass':
      default:
        return <Compass size={18} color="#6366F1" />;
    }
  };

  // Fallback crunch pillars for Indian context
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
      englishName: 'Mind & Decisions',
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
      ratingLabel: 'Robust (दीर्घायु योग)',
      verdict: 'High natural stamina reserves. Resilient physical recovery.',
      keyIndicator: 'Unbroken generous arc around Venus Mount',
      color: '#10B981',
    },
  ];

  const pillars = reading.crunchPillars && reading.crunchPillars.length > 0
    ? reading.crunchPillars
    : defaultPillars;

  const defaultSignals: AuspiciousSignals = {
    specialYog: 'Gajakesari Influence & Trishul Mark on Saturn',
    specialYogMeaning: 'Indicates leadership respect, compounding wealth through disciplined efforts, and moral standing.',
    luckyDay: 'Thursday (गुरुवार)',
    auspiciousColor: 'Royal Gold & Deep Saffron',
    luckyGemstone: 'Yellow Sapphire (पुखराज) or Natural Pearl',
    guidingMantra: 'Righteous diligence creates lasting fortune (कर्मण्येवाधिकारस्ते).',
  };

  const signals = reading.auspiciousSignals || defaultSignals;

  const handleCopyPromoLink = () => {
    navigator.clipboard.writeText(PROMOTIONAL_APP_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      style={{
        padding: '20px 16px',
        maxWidth: '540px',
        margin: '0 auto',
        minHeight: '100vh',
        paddingBottom: '120px',
      }}
    >
      {/* Top Auspicious Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', padding: '3px 12px', borderRadius: '14px', marginBottom: '6px' }}>
          <span style={{ fontSize: '13px' }}>✋</span>
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', color: '#FBBF24' }}>
            हस्तरेखा • SAMUDRIKA SHASTRA SYNTHESIS
          </span>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginTop: '2px',
          }}
        >
          {t('reading.title', 'Your Palm Reading')}
        </h1>

        {/* Profile Name & Rename Control */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '6px 0', backgroundColor: 'rgba(124, 58, 237, 0.12)', border: '1px solid var(--border-subtle)', padding: '3px 14px', borderRadius: '16px' }}>
          {isRenaming ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={30}
                autoFocus
                style={{
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--accent-lavender)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  outline: 'none',
                  width: '130px',
                }}
              />
              <button
                onClick={() => {
                  const newN = nameInput.trim() || 'Palm Seeker';
                  ReadingHistoryService.renameReading(reading.scanId, newN);
                  setCurrentName(newN);
                  onRename?.(newN);
                  setIsRenaming(false);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-emerald)', cursor: 'pointer', padding: '2px' }}
                title="Save name"
              >
                <Check size={15} />
              </button>
              <button
                onClick={() => setIsRenaming(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                title="Cancel"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={13} color="var(--accent-lavender)" />
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Reading for: <span style={{ color: '#FDE68A' }}>{currentName}</span>
              </span>
              <button
                onClick={() => { setNameInput(currentName); setIsRenaming(true); }}
                title="Rename reading"
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-lavender)', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
        </div>

        <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>
          {reading.hand === 'right' ? 'Right Palm (Active Karma / कर्म)' : 'Left Palm (Innate Potential / प्रारब्ध)'} • {formatDate(reading.generatedAt)}
        </p>
      </div>

      {/* Segmented View Switcher: Crunch vs Palm Map vs Shastra */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1.1fr',
          gap: '4px',
          backgroundColor: 'var(--bg-surface)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-medium)',
          marginBottom: '18px',
        }}
      >
        <button
          onClick={() => setActiveTab('crunch')}
          style={{
            padding: '8px 6px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s ease',
            backgroundColor: activeTab === 'crunch' ? '#F59E0B' : 'transparent',
            color: activeTab === 'crunch' ? '#000000' : 'var(--text-secondary)',
            boxShadow: activeTab === 'crunch' ? '0 2px 8px rgba(245, 158, 11, 0.4)' : 'none',
          }}
        >
          <Star size={14} />
          <span>The Crunch (सार)</span>
        </button>

        <button
          onClick={() => setActiveTab('palm')}
          style={{
            padding: '8px 6px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s ease',
            backgroundColor: activeTab === 'palm' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'palm' ? '#FFFFFF' : 'var(--text-secondary)',
            boxShadow: activeTab === 'palm' ? 'var(--cta-shadow)' : 'none',
          }}
        >
          <span>✋ Palm Map</span>
        </button>

        <button
          onClick={() => setActiveTab('shastra')}
          style={{
            padding: '8px 6px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: 'all 0.2s ease',
            backgroundColor: activeTab === 'shastra' ? 'var(--bg-surface-elevated)' : 'transparent',
            color: activeTab === 'shastra' ? 'var(--accent-lavender-warm)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'shastra' ? '2px solid var(--accent-lavender)' : 'none',
          }}
        >
          <BookOpen size={13} />
          <span>Shastra (विस्तृत)</span>
        </button>
      </div>

      {/* TAB 1: THE MAIN CRUNCH (DEFAULT & OPTIMIZED FOR LIMITED, HIGH-IMPACT INFORMATION) */}
      {activeTab === 'crunch' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Hand Archetype Hero Card */}
          <Card
            variant="elevated"
            style={{
              padding: '16px',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(17, 22, 43, 0.95) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FBBF24', fontWeight: 800 }}>
                HASTAREKHA ARCHETYPE
              </span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#FDE68A', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                ⭐ Auspicious Pattern
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px' }}>
              {reading.archetype}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 12px' }}>
              {reading.archetypeDescription}
            </p>

            {/* Quick Trait Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {reading.summaryBadges.map((badge: string, idx: number) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#DDD6FE',
                    backgroundColor: 'rgba(124, 58, 237, 0.18)',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </Card>

          {/* Section Header: 4 Core Pillars */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FBBF24' }}>
              ✦ 4 CORE PILLARS • मुख्य जीवन सार ✦
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Concise verdict
            </span>
          </div>

          {/* 4 Crunch Pillar Cards (2x2 Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: `1.5px solid ${pillar.color}`,
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: `0 4px 14px ${pillar.color}15`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: pillar.color, margin: 0 }}>
                      {pillar.englishName}
                    </h4>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        backgroundColor: `${pillar.color}33`,
                        padding: '1px 6px',
                        borderRadius: '6px',
                      }}
                    >
                      {pillar.score}%
                    </span>
                  </div>

                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                    {pillar.traditionalName}
                  </div>

                  <p style={{ fontSize: '11.5px', color: 'var(--text-primary)', lineHeight: 1.4, margin: '0 0 6px', fontWeight: 500 }}>
                    {pillar.verdict}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>Indicator:</strong> {pillar.keyIndicator}
                </div>
              </div>
            ))}
          </div>

          {/* Auspicious Yog & Guidance Box */}
          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '12px',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
              <Sparkles size={15} />
              <span>{signals.specialYog}</span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.4 }}>
              {signals.specialYogMeaning}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', borderTop: '1px solid rgba(245, 158, 11, 0.2)', paddingTop: '8px' }}>
              <div>
                <span style={{ color: '#FBBF24', fontWeight: 700 }}>📅 Shubh Din: </span>
                <span style={{ color: 'var(--text-primary)' }}>{signals.luckyDay}</span>
              </div>
              <div>
                <span style={{ color: '#FBBF24', fontWeight: 700 }}>🎨 Shubh Rang: </span>
                <span style={{ color: 'var(--text-primary)' }}>{signals.auspiciousColor}</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#FBBF24', fontWeight: 700 }}>💎 Gem/Metal: </span>
                <span style={{ color: 'var(--text-primary)' }}>{signals.luckyGemstone}</span>
              </div>
            </div>

            <div style={{ marginTop: '10px', backgroundColor: 'rgba(124, 58, 237, 0.15)', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', color: '#DDD6FE', fontStyle: 'italic' }}>
              <strong>Vedic Reflection:</strong> {signals.guidingMantra}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onShare}
              leftIcon={<Share2 size={18} />}
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#FFFFFF',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                fontWeight: 800,
                fontSize: '15px',
              }}
            >
              Share Report Card on WhatsApp
            </Button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
              {onOpenAskKai && (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={onOpenAskKai}
                  leftIcon={<MessageCircle size={16} />}
                >
                  Ask Kai AI
                </Button>
              )}

              <Button
                variant="outline"
                fullWidth
                onClick={onReset}
                leftIcon={<RotateCcw size={15} />}
              >
                New Scan
              </Button>
            </div>
          </div>

          {/* HIGH-PROMINENCE APPLICATION URL PROMOTION BANNER AT BOTTOM */}
          <div
            style={{
              marginTop: '12px',
              backgroundColor: 'rgba(11, 16, 38, 0.95)',
              border: '1.5px solid #F59E0B',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#FBBF24', letterSpacing: '0.05em' }}>
              ✦ RECOMMEND KAI REGAI TO FRIENDS & FAMILY ✦
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Anyone can scan their palm in 30 seconds for just ₹10:
            </div>
            
            <div
              onClick={handleCopyPromoLink}
              style={{
                marginTop: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px dashed #F59E0B',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              title="Click to copy link"
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#FDE68A', wordBreak: 'break-all' }}>
                {PROMOTIONAL_APP_URL}
              </span>
              {copiedLink ? <Check size={14} color="#10B981" /> : <Copy size={14} color="#F59E0B" />}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
              {copiedLink ? '✓ Link copied to clipboard!' : 'Tap link above to copy and share'}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: INTERACTIVE PALM MAP */}
      {activeTab === 'palm' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-lavender)' }}>
              Interactive Palm Map
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Tap line to highlight
            </span>
          </div>

          {/* Line Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {[
              { id: 'heart', label: 'Heart Line', color: '#F43F5E' },
              { id: 'head', label: 'Head Line', color: '#38BDF8' },
              { id: 'life', label: 'Life Line', color: '#10B981' },
              { id: 'fate', label: 'Fate Line', color: '#F59E0B' },
            ].map((chip) => {
              const isSelected = highlightedLine === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setHighlightedLine(isSelected ? null : chip.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? `1.5px solid ${chip.color}` : '1px solid var(--border-subtle)',
                    backgroundColor: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: chip.color }} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          <PalmAnalysisOverlay imageDataUrl={imageDataUrl} analysis={analysis} />

          <div style={{ marginTop: '14px' }}>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setActiveTab('crunch')}
              leftIcon={<Star size={16} />}
            >
              Back to Main Crunch Summary
            </Button>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSICAL SHASTRA DETAILS */}
      {activeTab === 'shastra' && (
        <div>
          <div style={{ marginBottom: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Classical Samudrika Shastra Observations
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Deep line dimensional analysis with classical Sanskrit citations
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {reading.sections.map((section: ReadingCardSection) => {
              const isExpanded = expandedSection === section.id;
              return (
                <div
                  key={section.id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: isExpanded ? '1.5px solid var(--border-active)' : '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--bg-surface-elevated)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getSectionIcon(section.iconName)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                          {section.title}
                        </h4>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {section.tagline}
                        </span>
                      </div>
                    </div>

                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div
                      style={{
                        padding: '0 14px 14px',
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '12px',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                      }}
                    >
                      <div
                        style={{
                          padding: '8px 10px',
                          backgroundColor: 'var(--bg-surface-elevated)',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: '8px',
                          fontSize: '11.5px',
                        }}
                      >
                        <strong style={{ color: 'var(--accent-lavender)', display: 'block', marginBottom: '2px' }}>
                          Observed Line Trait:
                        </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{section.keyObservation}</span>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                          Classical Meaning:
                        </strong>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{section.traditionalInterpretation}</p>
                      </div>

                      <div
                        style={{
                          backgroundColor: 'rgba(99, 102, 241, 0.08)',
                          borderLeft: '3px solid var(--accent-indigo)',
                          padding: '8px 10px',
                          borderRadius: '4px',
                          marginBottom: '10px',
                        }}
                      >
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'block', fontSize: '11.5px' }}>
                          Vedic Self-Reflection:
                        </span>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '11.5px', margin: 0 }}>
                          {section.reflectiveAdvice}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCitationSection(section);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          background: 'transparent',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--accent-lavender-warm)',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <BookOpen size={12} />
                        <span>View Source Citations (Brihat Samhita)</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => setActiveTab('crunch')}
            leftIcon={<Star size={16} />}
          >
            Back to Main Crunch Summary
          </Button>
        </div>
      )}

      {/* Cultural Disclaimer */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          {reading.traditionalDisclaimer}
        </p>
      </div>

      {/* Purge Photo Safety Button */}
      {onPurgePhoto && (
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <button
            onClick={onPurgePhoto}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '11px',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            Purge palm photograph from device cache
          </button>
        </div>
      )}

      {/* Source Citation Modal */}
      {selectedCitationSection && (
        <SourceCitationModal
          isOpen={!!selectedCitationSection}
          onClose={() => setSelectedCitationSection(null)}
          sectionTitle={selectedCitationSection.title}
          keyObservation={selectedCitationSection.keyObservation}
          traditionalInterpretation={selectedCitationSection.traditionalInterpretation}
          sources={selectedCitationSection.sources}
          divergenceNote={selectedCitationSection.divergenceNote}
        />
      )}
    </div>
  );
};
