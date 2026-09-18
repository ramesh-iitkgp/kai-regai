import React from 'react';
import { Modal } from '../ui/Modal';
import { Info } from 'lucide-react';
import { Button } from '../ui/Button';

export interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Traditional Palmistry Notice">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <div
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <Info size={20} color="var(--accent-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--accent-gold-light)', display: 'block', marginBottom: '2px' }}>
              Cultural & Entertainment Purpose
            </strong>
            Palmistry (Hastha Rekha / Samudrika Shastra) is an ancient cultural practice that associates hand topography with personality tendencies.
          </div>
        </div>

        <p>
          <strong>No Scientific Prediction:</strong> Palmistry has not been scientifically established as a method of predicting future occurrences. We do not make deterministic claims such as "you will marry at 28" or "you will acquire great riches."
        </p>

        <p>
          <strong>No Professional Advice:</strong> This application does NOT provide medical, psychological, legal, or financial counseling. Never make high-stakes life or financial decisions based on an AI palm reading.
        </p>

        <p>
          <strong>Interpretive Language:</strong> All insights are framed as traditional associations (e.g. <em>"traditional palmistry associates this curvature with..."</em>) to foster positive self-reflection and personal curiosity.
        </p>

        <Button variant="primary" fullWidth onClick={onClose} style={{ marginTop: '8px' }}>
          I Understand & Agree
        </Button>
      </div>
    </Modal>
  );
};
