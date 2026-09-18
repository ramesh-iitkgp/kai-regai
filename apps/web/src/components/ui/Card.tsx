import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'gold' | 'glass';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const getCardStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'gold':
        return {
          background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(15, 21, 35, 0.95) 100%)',
          border: '1px solid var(--border-active)',
          boxShadow: 'var(--shadow-gold)',
        };
      case 'elevated':
        return {
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
        };
      case 'glass':
        return {
          background: 'var(--bg-surface-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-subtle)',
        };
      default:
        return {
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        };
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        transition: 'transform var(--transition-normal), border-color var(--transition-normal)',
        cursor: interactive ? 'pointer' : 'default',
        ...getCardStyle(),
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};
