import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { Check, Search } from 'lucide-react';

export interface LanguageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = availableLanguages.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.id.toLowerCase().includes(q)
    );
  });

  const handleSelect = (langId: string) => {
    setLanguage(langId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose Your Language / भाषा चुनें">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={16}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search language / भाषा खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        {/* Languages List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            maxHeight: '380px',
            overflowY: 'auto',
            paddingRight: '2px',
          }}
        >
          {filtered.map((lang) => {
            const isSelected = currentLanguage.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: isSelected ? 'var(--accent-gold-light)' : 'var(--text-primary)' }}>
                    {lang.nativeName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {lang.name}
                  </div>
                </div>

                {isSelected && (
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#080B11',
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            You can change your language at any time without losing your palm scan or reading.
          </p>
        </div>
      </div>
    </Modal>
  );
};
