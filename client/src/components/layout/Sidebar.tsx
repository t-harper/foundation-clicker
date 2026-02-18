import React from 'react';
import { useGameStore } from '../../store';
import type { ActiveTab } from '../../store';
import {
  BuildingsIcon,
  ColonyMapIcon,
  UpgradesIcon,
  ShipsIcon,
  AchievementsIcon,
  EventsIcon,
  PrestigeIcon,
  EncyclopediaIcon,
  ResearchIcon,
  LeaderboardIcon,
  StatsIcon,
  AdminIcon,
} from '../../assets/svg/icons';

interface SidebarTab {
  key: ActiveTab;
  label: string;
  icon: React.ReactNode;
}

const SIDEBAR_TABS: SidebarTab[] = [
  { key: 'buildings', label: 'Buildings', icon: <BuildingsIcon className="w-5 h-5" /> },
  { key: 'colonyMap', label: 'Colony Map', icon: <ColonyMapIcon className="w-5 h-5" /> },
  { key: 'upgrades', label: 'Upgrades', icon: <UpgradesIcon className="w-5 h-5" /> },
  { key: 'ships', label: 'Ships', icon: <ShipsIcon className="w-5 h-5" /> },
  { key: 'research', label: 'Research', icon: <ResearchIcon className="w-5 h-5" /> },
  { key: 'achievements', label: 'Achievements', icon: <AchievementsIcon className="w-5 h-5" /> },
  { key: 'events', label: 'Events', icon: <EventsIcon className="w-5 h-5" /> },
  { key: 'prestige', label: 'Prestige', icon: <PrestigeIcon className="w-5 h-5" /> },
  { key: 'encyclopedia', label: 'Encyclopedia', icon: <EncyclopediaIcon className="w-5 h-5" /> },
  { key: 'leaderboard', label: 'Leaderboard', icon: <LeaderboardIcon className="w-5 h-5" /> },
  { key: 'stats', label: 'Stats', icon: <StatsIcon className="w-5 h-5" /> },
];

export function Sidebar() {
  const activeTab = useGameStore((s) => s.activeTab);
  const setActiveTab = useGameStore((s) => s.setActiveTab);
  const isAdmin = useGameStore((s) => s.isAdmin);

  return (
    <nav className="flex flex-col w-56 shrink-0 border-r border-[var(--era-surface)] bg-[var(--era-bg)]/80">
      <div className="flex flex-col gap-1 p-3">
        {SIDEBAR_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              data-tutorial={`sidebar-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium',
                'transition-all duration-150',
                'focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)] focus:ring-inset',
                isActive
                  ? 'bg-[var(--era-accent)]/15 text-[var(--era-accent)] border-l-2 border-[var(--era-accent)] sidebar-glow-active'
                  : 'text-[var(--era-text)]/60 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)]/50 border-l-2 border-transparent',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-2 border-t border-[var(--era-surface)]/30" />
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium',
                'transition-all duration-150',
                'focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)] focus:ring-inset',
                activeTab === 'admin'
                  ? 'bg-red-500/15 text-red-400 border-l-2 border-red-400 sidebar-glow-active'
                  : 'text-red-400/60 hover:text-red-400 hover:bg-red-500/10 border-l-2 border-transparent',
              ].join(' ')}
              aria-current={activeTab === 'admin' ? 'page' : undefined}
            >
              <span className="shrink-0"><AdminIcon className="w-5 h-5" /></span>
              <span>Admin</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
