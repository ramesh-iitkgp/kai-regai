import React from 'react';
import { AlertCircle, RefreshCw, Upload } from 'lucide-react';
import { Button } from './Button';

export interface ErrorAlertProps {
  title?: string;
  message: string;
  reasons?: string[];
  onRetry?: () => void;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  retryLabel?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "We couldn't get a clear enough view of your palm",
  message,
  reasons = [],
  onRetry,
  onSecondaryAction,
  secondaryActionLabel = 'Upload a Photo Instead',
  retryLabel = 'Try Again',
}) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        textAlign: 'left',
        margin: '16px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#F87171',
            borderRadius: '50%',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AlertCircle size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {title}
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {message}
          </p>
        </div>
      </div>

      {reasons.length > 0 && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold-light)', marginBottom: '6px' }}>
            Tips to improve capture:
          </div>
          <ul style={{ paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
            {reasons.map((r, i) => (
              <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        {onRetry && (
          <Button
            variant="primary"
            fullWidth
            onClick={onRetry}
            leftIcon={<RefreshCw size={16} />}
          >
            {retryLabel}
          </Button>
        )}
        {onSecondaryAction && (
          <Button
            variant="outline"
            fullWidth
            onClick={onSecondaryAction}
            leftIcon={<Upload size={16} />}
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
