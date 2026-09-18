import React from 'react';
import { Home, BookOpen, Sparkles, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type NavTab = 'home' | 'reading' | 'ask' | 'profile';

export interface BottomNavProps {
  activeTab: NavTab;
  hasReading: boolean;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  hasReading,
  onSelectTab,
}) => {
  const { t } = useLanguage();

  const navItems = [
    {
      id: 'home' as NavTab,
      label: t('nav.home', 'Home'),
      icon: Home,
    },
    {
      id: 'reading' as NavTab,
      label: t('nav.reading', 'My Reading'),
      icon: BookOpen,
      badge: hasReading,
    },
    {
      id: 'ask' as NavTab,
      label: t('nav.askKai', 'Ask Kai'),
      icon: Sparkles,
    },
    {
      id: 'profile' as NavTab,
      label: t('nav.profile', 'Profile'),
      icon: User,
    },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '8px',
        paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '6px 0',
                cursor: 'pointer',
                color: isActive ? 'var(--accent-lavender-warm)' : 'var(--text-muted)',
                position: 'relative',
                transition: 'color var(--transition-fast)',
              }}
              className="touch-target"
            >
              <div style={{ position: 'relative' }}>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  color={isActive ? 'var(--accent-lavender)' : 'var(--text-muted)'}
                />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-3px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-emerald)',
                      boxShadow: '0 0 6px var(--accent-emerald)',
                    }}
                  />
                )}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {item.label}
              </span>

              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    width: '20px',
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--accent-violet)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
