import React from 'react';

export interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export function TabGroup({ tabs, activeTab, onTabChange, className = '' }: TabGroupProps) {
  return (
    <div
      className={`flex gap-1 border-b border-[var(--era-surface)] ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.key)}
            className={[
              'relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium',
              'transition-colors duration-150 rounded-t-md',
              'focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)] focus:ring-inset',
              isActive
                ? 'text-[var(--era-accent)] bg-[var(--era-surface)]/50'
                : 'text-[var(--era-text)]/60 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)]/30',
            ].join(' ')}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {/* Active indicator bar */}
            {isActive && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--era-accent)] rounded-t" />
            )}
          </button>
        );
      })}
    </div>
  );
}
