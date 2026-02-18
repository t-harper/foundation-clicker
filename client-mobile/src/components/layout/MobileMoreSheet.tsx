import React from 'react';
import { useGameStore } from '@desktop/store';
import type { ActiveTab } from '@desktop/store';
import { BottomSheet } from '../common/BottomSheet';
import {
  ShipsIcon,
  AchievementsIcon,
  EventsIcon,
  PrestigeIcon,
  EncyclopediaIcon,
  ColonyMapIcon,
  LeaderboardIcon,
  StatsIcon,
  AdminIcon,
} from '@desktop/assets/svg/icons';

interface MoreSheetTab {
  key: ActiveTab;
  label: string;
  icon: React.ReactNode;
}

const MORE_TABS: MoreSheetTab[] = [
  { key: 'ships', label: 'Ships', icon: <ShipsIcon className="w-5 h-5" /> },
  { key: 'achievements', label: 'Achievements', icon: <AchievementsIcon className="w-5 h-5" /> },
  { key: 'events', label: 'Events', icon: <EventsIcon className="w-5 h-5" /> },
  { key: 'prestige', label: 'Prestige', icon: <PrestigeIcon className="w-5 h-5" /> },
  { key: 'encyclopedia', label: 'Encyclopedia', icon: <EncyclopediaIcon className="w-5 h-5" /> },
  { key: 'colonyMap', label: 'Colony Map', icon: <ColonyMapIcon className="w-5 h-5" /> },
  { key: 'leaderboard', label: 'Leaderboard', icon: <LeaderboardIcon className="w-5 h-5" /> },
  { key: 'stats', label: 'Stats', icon: <StatsIcon className="w-5 h-5" /> },
];

export function MobileMoreSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const setActiveTab = useGameStore((s) => s.setActiveTab);
  const isAdmin = useGameStore((s) => s.isAdmin);

  const handleSelect = (key: ActiveTab) => {
    setActiveTab(key);
    onClose();
  };

  const handleSwitchDesktop = () => {
    document.cookie = 'fg-view=desktop;path=/;max-age=31536000';
    window.location.reload();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {MORE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleSelect(tab.key)}
            className="flex items-center gap-3 px-4 py-3 text-left active:bg-[var(--era-surface)]/50 transition-colors touch-action-manipulation"
          >
            <span className="text-[var(--era-primary)]">{tab.icon}</span>
            <span className="text-sm font-medium text-[var(--era-text)]">{tab.label}</span>
          </button>
        ))}

        {isAdmin && (
          <>
            <div className="border-t border-[var(--era-surface)]/30 my-1" />
            <button
              type="button"
              onClick={() => handleSelect('admin')}
              className="flex items-center gap-3 px-4 py-3 text-left active:bg-red-500/10 transition-colors touch-action-manipulation"
            >
              <span className="text-red-400"><AdminIcon className="w-5 h-5" /></span>
              <span className="text-sm font-medium text-red-400">Admin</span>
            </button>
          </>
        )}

        <div className="border-t border-[var(--era-surface)]/30 my-1" />
        <button
          type="button"
          onClick={handleSwitchDesktop}
          className="flex items-center justify-center gap-2 px-4 py-3 text-left active:bg-[var(--era-surface)]/50 transition-colors touch-action-manipulation"
        >
          <span className="text-xs text-[var(--era-text)]/50">Switch to Desktop View</span>
        </button>
      </div>
    </BottomSheet>
  );
}
