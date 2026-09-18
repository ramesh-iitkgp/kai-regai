import React, { useState, useEffect } from 'react';
import type { FullPalmReading, StructuredPalmAnalysis, ReadingCardSection } from '../../types/contracts';
import { PalmAnalysisOverlay } from '../analysis/PalmAnalysisOverlay';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
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
  User
} from 'lucide-react';
import { SourceCitationModal } from '../modals/SourceCitationModal';
import { useLanguage } from '../../context/LanguageContext';
import { ReadingHistoryService } from '../../services/ReadingHistoryService';

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

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  reading,
  analysis,
  imageDataUrl,
  userName = 'Palm 1',
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
  const [expandedSection, setExpandedSection] = useState<string | null>('love');
  const [selectedCitationSection, setSelectedCitationSection] = useState<ReadingCardSection | null>(null);
  const [highlightedLine, setHighlightedLine] = useState<string | null>('heart');

  // Automatically record to local reading history upon generation
  useEffect(() => {
    ReadingHistoryService.saveReading(reading, imageDataUrl, currentLanguage.id, currentName);
  }, [reading.readingId, currentName]);

  const toggleSection = (id: string) => {
    const isCurrentlyExpanded = expandedSection === id;
    setExpandedSection(isCurrentlyExpanded ? null : id);
    if (!isCurrentlyExpanded) {
      // Correlate line highlight with active section
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
        return <Sparkles size={18} color="#C4B5FD" />;
      case 'compass':
      default:
        return <Compass size={18} color="#6366F1" />;
    }
  };

  return (
    <div
      style={{
        padding: '24px 20px',
        maxWidth: '560px',
        margin: '0 auto',
        minHeight: '100vh',
        paddingBottom: '120px',
      }}
    >
      {/* Top Title Banner */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Badge variant="subtle" icon={<Sparkles size={12} />}>
          {t('reading.badge', 'Verified Samudrika Synthesis')}
        </Badge>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginTop: '6px',
          }}
        >
          {t('reading.title', 'Your Palm Reading')}
        </h1>

        {/* Profile Name & Rename Control */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '8px 0 6px', backgroundColor: 'rgba(124, 58, 237, 0.12)', border: '1px solid var(--border-subtle)', padding: '4px 14px', borderRadius: '16px' }}>
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
                  fontSize: '13px',
                  fontWeight: 700,
                  outline: 'none',
                  width: '130px',
                }}
              />
              <button
                onClick={() => {
                  const newN = nameInput.trim() || 'Palm 1';
                  ReadingHistoryService.renameReading(reading.scanId, newN);
                  setCurrentName(newN);
                  onRename?.(newN);
                  setIsRenaming(false);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-emerald)', cursor: 'pointer', padding: '2px' }}
                title="Save name"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => setIsRenaming(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={13} color="var(--accent-lavender)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Reading for: <span style={{ color: 'var(--accent-lavender-warm)' }}>{currentName}</span>
              </span>
              <button
                onClick={() => { setNameInput(currentName); setIsRenaming(true); }}
                title="Rename reading"
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-lavender)', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
              >
                <Edit2 size={13} />
              </button>
            </div>
          )}
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          {reading.hand === 'right' ? t('reading.rightHandLabel', 'Right Palm (Active Path)') : t('reading.leftHandLabel', 'Left Palm (Innate Potential)')} • {formatDate(reading.generatedAt)}
        </p>
      </div>

      {/* Interactive Palm Visualizer (Tapping line highlights feature) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-lavender)' }}>
            Interactive Palm Map
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Tap line to highlight
          </span>
        </div>

        {/* Feature Selector Chips */}
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
                onClick={() => {
                  setHighlightedLine(isSelected ? null : chip.id);
                  if (chip.id === 'heart') setExpandedSection('love');
                  if (chip.id === 'head') setExpandedSection('mind');
                  if (chip.id === 'life') setExpandedSection('vitality');
                  if (chip.id === 'fate') setExpandedSection('career');
                }}
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

        {/* Embedded Palm Analysis Overlay */}
        <PalmAnalysisOverlay imageDataUrl={imageDataUrl} analysis={analysis} />
      </div>

      {/* Hand Archetype Hero Card */}
      <Card variant="elevated" style={{ padding: '20px', marginBottom: '20px', border: '1px solid var(--border-active)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-lavender)', fontWeight: 700 }}>
            {t('reading.archetypeLabel', 'Palm Archetype')}
          </span>
          <Badge variant="subtle">{reading.archetype}</Badge>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '14px' }}>
          {reading.archetypeDescription}
        </p>

        {/* Character Trait Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {reading.summaryBadges.map((badge: string, idx: number) => (
            <span
              key={idx}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent-lavender-warm)',
                backgroundColor: 'rgba(124, 58, 237, 0.12)',
                border: '1px solid var(--border-subtle)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </Card>

      {/* Reading Sections with Progressive Disclosure */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
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
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '16px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
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
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {section.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {section.tagline}
                    </span>
                  </div>
                </div>

                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isExpanded && (
                <div
                  style={{
                    padding: '0 16px 16px',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '14px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                  }}
                >
                  {/* Physical Observation */}
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '10px',
                      fontSize: '12px',
                    }}
                  >
                    <strong style={{ color: 'var(--accent-lavender)', display: 'block', marginBottom: '2px' }}>
                      Physical Palm Observation:
                    </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{section.keyObservation}</span>
                  </div>

                  {/* Traditional Interpretation */}
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '3px' }}>
                      Traditional Palmistry Perspective:
                    </strong>
                    <p style={{ color: 'var(--text-secondary)' }}>{section.traditionalInterpretation}</p>
                  </div>

                  {/* Reflective Prompt */}
                  <div
                    style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      borderLeft: '3px solid var(--accent-indigo)',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'block', fontSize: '12px' }}>
                      Self-Reflection Prompt:
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: 0 }}>
                      {section.reflectiveAdvice}
                    </p>
                  </div>

                  {/* Why Am I Seeing This? */}
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
                      padding: '8px 12px',
                      background: 'transparent',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--accent-lavender-warm)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <BookOpen size={13} />
                    <span>{t('reading.whySeeingThisBtn', 'Why am I seeing this? (View Sources)')}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons: Ask Kai & Share */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {onOpenAskKai && (
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onOpenAskKai}
            leftIcon={<MessageCircle size={18} />}
          >
            Ask Kai About Your Palm
          </Button>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onShare}
          leftIcon={<Share2 size={18} />}
        >
          {t('reading.shareBtn', 'Share Reading Card')}
        </Button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <Button
            variant="outline"
            fullWidth
            onClick={onReset}
            leftIcon={<RotateCcw size={16} />}
          >
            {t('reading.newScanBtn', 'New Scan')}
          </Button>

          {onPurgePhoto && (
            <Button
              variant="outline"
              fullWidth
              onClick={onPurgePhoto}
            >
              {t('reading.purgeBtn', 'Purge Photo')}
            </Button>
          )}
        </div>
      </div>

      {/* Mandatory Cultural Disclaimer */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
          {reading.traditionalDisclaimer}
        </p>
      </div>

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
