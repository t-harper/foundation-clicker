import React, { useState } from 'react';
import { useGameStore } from '@desktop/store';
import type { ActiveTab } from '@desktop/store';
import {
  BuildingsIcon,
  UpgradesIcon,
  ClickIcon,
  ResearchIcon,
} from '@desktop/assets/svg/icons';
import { MoreIcon } from '../../assets/svg/icons/MoreIcon';
import { MobileMoreSheet } from './MobileMoreSheet';

interface NavTab {
  key: ActiveTab | 'vault' | 'more';
  label: string;
  icon: React.ReactNode;
}

const NAV_TABS: NavTab[] = [
  { key: 'buildings', label: 'Build', icon: <BuildingsIcon className="w-5 h-5" /> },
  { key: 'upgrades', label: 'Upgr', icon: <UpgradesIcon className="w-5 h-5" /> },
  { key: 'vault', label: 'Vault', icon: <ClickIcon className="w-6 h-6" /> },
  { key: 'research', label: 'Rsrch', icon: <ResearchIcon className="w-5 h-5" /> },
  { key: 'more', label: 'More', icon: <MoreIcon className="w-5 h-5" /> },
];

export function MobileBottomNav() {
  const activeTab = useGameStore((s) => s.activeTab);
  const setActiveTab = useGameStore((s) => s.setActiveTab);
  const [showMore, setShowMore] = useState(false);

  const handleTabPress = (key: string) => {
    if (key === 'more') {
      setShowMore(true);
    } else {
      setActiveTab(key as ActiveTab);
    }
  };

  return (
    <>
      <nav className="flex items-end justify-around border-t border-[var(--era-surface)] bg-[var(--era-bg)]/95 safe-bottom">
        {NAV_TABS.map((tab) => {
          const isVault = tab.key === 'vault';
          const isActive = activeTab === tab.key;

          if (isVault) {
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabPress(tab.key)}
                className="relative flex flex-col items-center -mt-3 touch-action-manipulation"
                aria-label="Vault"
              >
                <div
                  className={[
                    'w-14 h-14 rounded-full flex items-center justify-center',
                    'bg-gradient-to-br from-[var(--era-accent)] via-[var(--era-primary)] to-[var(--era-accent)]',
                    'border-4 border-[var(--era-bg)]',
                    'shadow-[0_0_12px_color-mix(in_srgb,var(--era-accent)_30%,transparent)]',
                    isActive ? 'scale-110' : '',
                    'transition-transform duration-150',
                  ].join(' ')}
                >
                  <span className="text-[var(--era-bg)]">{tab.icon}</span>
                </div>
                <span className={`text-[10px] mt-0.5 ${isActive ? 'text-[var(--era-accent)]' : 'text-[var(--era-text)]/50'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabPress(tab.key)}
              className={[
                'flex flex-col items-center py-2 px-3 min-w-[56px] touch-action-manipulation',
                isActive ? 'border-t-2 border-[var(--era-accent)]' : 'border-t-2 border-transparent',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={isActive ? 'text-[var(--era-accent)]' : 'text-[var(--era-text)]/50'}>
                {tab.icon}
              </span>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-[var(--era-accent)] font-medium' : 'text-[var(--era-text)]/50'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      <MobileMoreSheet isOpen={showMore} onClose={() => setShowMore(false)} />
    </>
  );
}
