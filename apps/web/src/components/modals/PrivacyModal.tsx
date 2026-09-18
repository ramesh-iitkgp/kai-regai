import React from 'react';
import { Modal } from '../ui/Modal';
import { ShieldCheck, Lock, Trash2, Key } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy & Data Protection">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <ShieldCheck size={20} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '2px' }}>
              Your Palm Photo is Never Shared or Sold
            </strong>
            We treat palm photographs with strict confidentiality and security.
          </div>
        </div>

        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={15} color="var(--accent-cyan)" /> Ephemeral & Scoped Processing
          </strong>
          <p style={{ marginTop: '2px' }}>
            Your photo is uploaded over 256-bit TLS encrypted channels and processed exclusively for line landmark detection and reading synthesis.
          </p>
        </div>

        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={15} color="var(--accent-gold-light)" /> Immediate User Purge Rights
          </strong>
          <p style={{ marginTop: '2px' }}>
            Once your reading is generated, you can delete your uploaded photograph at any time with a single tap. Images that are not purged automatically expire.
          </p>
        </div>

        <div>
          <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Key size={15} color="var(--accent-indigo)" /> No Biometric Profiling
          </strong>
          <p style={{ marginTop: '2px' }}>
            We do not extract fingerprint ridge minutiae or perform personal identity recognition. Analysis is purely structural line curvature and mount prominence.
          </p>
        </div>

        <Button variant="primary" fullWidth onClick={onClose} style={{ marginTop: '8px' }}>
          Got It
        </Button>
      </div>
    </Modal>
  );
};
