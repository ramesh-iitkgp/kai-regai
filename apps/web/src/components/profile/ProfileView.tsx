import React, { useState, useEffect } from 'react';
import {
  Globe,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  Trash2,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Share2,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ReadingHistoryService, type StoredReadingItem } from '../../services/ReadingHistoryService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { FullPalmReading } from '../../types/contracts';

export interface ProfileViewProps {
  onOpenLanguage: () => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
  onSelectSavedReading: (reading: FullPalmReading, thumbnailUrl?: string) => void;
  onStartNewScan: () => void;
  onOpenShareCard?: (reading: FullPalmReading, name: string, thumbnailUrl?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenLanguage,
  onOpenPrivacy,
  onOpenDisclaimer,
  onSelectSavedReading,
  onStartNewScan,
  onOpenShareCard,
}) => {
  const { currentLanguage, formatDate } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [history, setHistory] = useState<StoredReadingItem[]>([]);
  const [editingScanId, setEditingScanId] = useState<string | null>(null);
  const [editNameText, setEditNameText] = useState('');

  useEffect(() => {
    setHistory(ReadingHistoryService.getHistory());
  }, []);

  const handleStartRename = (e: React.MouseEvent, scanId: string, currentName: string) => {
    e.stopPropagation();
    setEditingScanId(scanId);
    setEditNameText(currentName);
  };

  const handleSaveRename = (e: React.MouseEvent, scanId: string) => {
    e.stopPropagation();
    if (editNameText.trim()) {
      ReadingHistoryService.renameReading(scanId, editNameText.trim());
      setHistory(ReadingHistoryService.getHistory());
    }
    setEditingScanId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingScanId(null);
  };

  const handleDeleteReading = (scanId: string) => {
    if (confirm('Permanently remove this reading and cached palm image?')) {
      ReadingHistoryService.deleteReading(scanId);
      setHistory(ReadingHistoryService.getHistory());
    }
  };

  return (
    <div
      style={{
        padding: '24px 20px',
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        paddingBottom: '100px',
      }}
    >
      {/* Top Profile Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(99, 102, 241, 0.1) 100%)',
            border: '1px solid var(--border-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}
        >
          <span style={{ fontSize: '28px' }}>✋</span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
          My Kai Profile
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Private, device-grounded self-discovery
        </span>
      </div>

      {/* Quick Stats / New Scan Prompt */}
      <Card variant="elevated" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--accent-lavender)', fontWeight: 700, textTransform: 'uppercase' }}>
              Saved Readings
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {history.length}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onStartNewScan}
            leftIcon={<Sparkles size={14} />}
          >
            New Scan
          </Button>
        </div>
      </Card>

      {/* READING HISTORY SECTION */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Reading History
          </h3>
          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all reading history?')) {
                  ReadingHistoryService.clearHistory();
                  setHistory([]);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-rose)',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          /* Beautiful Empty State */
          <div
            style={{
              padding: '32px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-medium)',
            }}
          >
            <BookOpen size={32} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No readings yet
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '260px', margin: '0 auto 16px', lineHeight: 1.4 }}>
              Your completed palm readings will safely appear here for instant review.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onStartNewScan}
              leftIcon={<Sparkles size={14} />}
            >
              Scan My Palm
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((item) => (
              <div
                key={item.scanId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  onClick={() => onSelectSavedReading(item.reading, item.thumbnailUrl)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      flexShrink: 0,
                    }}
                  >
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt="Palm"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        ✋
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    {editingScanId === item.scanId ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editNameText}
                          onChange={(e) => setEditNameText(e.target.value)}
                          maxLength={30}
                          autoFocus
                          style={{
                            padding: '3px 8px',
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
                          onClick={(e) => handleSaveRename(e, item.scanId)}
                          title="Save name"
                          style={{ background: 'transparent', border: 'none', color: 'var(--accent-emerald)', cursor: 'pointer', padding: '2px' }}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={handleCancelRename}
                          title="Cancel"
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {item.name || 'Palm 1'}
                        </h4>
                        <button
                          onClick={(e) => handleStartRename(e, item.scanId, item.name || 'Palm 1')}
                          title="Rename palm"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-lavender)',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          <Edit2 size={13} />
                        </button>
                      </div>
                    )}

                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-lavender-warm)' }}>
                      {item.archetype}
                    </div>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={11} /> {formatDate(item.date)} • {item.hand === 'right' ? 'Right' : 'Left'} Hand
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {onOpenShareCard && (
                    <button
                      onClick={() => onOpenShareCard(item.reading, item.name || 'Palm 1', item.thumbnailUrl)}
                      title="Share / Download Reading Card"
                      style={{
                        background: 'rgba(124, 58, 237, 0.12)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--accent-lavender)',
                        padding: '8px 10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteReading(item.scanId)}
                    title="Delete reading"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      padding: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SETTINGS & PREFERENCES */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
          Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Language Switch Card */}
          <button
            onClick={onOpenLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} color="var(--accent-lavender)" />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Language</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-lavender-warm)' }}>
                {currentLanguage.nativeName}
              </span>
              <ArrowRight size={14} color="var(--text-muted)" />
            </div>
          </button>

          {/* Theme Toggle Card */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {theme === 'dark' ? (
                <Moon size={18} color="var(--accent-lavender)" />
              ) : (
                <Sun size={18} color="var(--accent-amber)" />
              )}
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Theme Mode</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Badge variant="subtle">{theme === 'dark' ? 'Dark' : 'Light'}</Badge>
            </div>
          </button>
        </div>
      </div>

      {/* LEGAL, PRIVACY & ABOUT */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
          About & Trust
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onOpenPrivacy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} color="var(--accent-emerald)" />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Privacy & Data Retention</span>
            </div>
            <ArrowRight size={14} color="var(--text-muted)" />
          </button>

          <button
            onClick={onOpenDisclaimer}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={18} color="var(--accent-amber)" />
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Traditional Palmistry Notice</span>
            </div>
            <ArrowRight size={14} color="var(--text-muted)" />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--text-muted)' }}>
          Kai RegAI v1.2.0 • Classical Chiromancy & Samudrika Shastra
        </div>
      </div>
    </div>
  );
};
