import React from 'react';

export interface BadgeProps {
  variant?: 'gold' | 'cyan' | 'emerald' | 'subtle' | 'outline';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  icon,
  className = '',
  style,
}) => {
  const getBadgeStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'gold':
        return {
          background: 'rgba(245, 158, 11, 0.12)',
          color: 'var(--accent-gold-light)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        };
      case 'cyan':
        return {
          background: 'rgba(56, 189, 248, 0.12)',
          color: 'var(--accent-cyan)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
        };
      case 'emerald':
        return {
          background: 'rgba(16, 185, 129, 0.12)',
          color: 'var(--accent-emerald)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-medium)',
        };
      case 'subtle':
      default:
        return {
          background: 'rgba(255, 255, 255, 0.06)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        userSelect: 'none',
        ...getBadgeStyle(),
        ...style,
      }}
      className={className}
    >
      {icon && <span style={{ display: 'inline-flex', fontSize: '13px' }}>{icon}</span>}
      {children}
    </span>
  );
};
