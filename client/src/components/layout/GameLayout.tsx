import React from 'react';
import { useGameStore } from '../../store';
import { ERA_DEFINITIONS } from '@foundation/shared';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ResourceBar } from '../resources/ResourceBar';
import { ClickTarget } from '../resources/ClickTarget';
import { BuildingPanel } from '../buildings/BuildingPanel';
import { UpgradePanel } from '../upgrades/UpgradePanel';
import { ShipPanel } from '../ships/ShipPanel';
import { AchievementPanel } from '../achievements/AchievementPanel';
import { PrestigePanel } from '../prestige/PrestigePanel';
import { EncyclopediaPanel } from '../encyclopedia/EncyclopediaPanel';
import { ColonyMapPanel } from '../colony-map';
import { SettingsModal } from '../settings/SettingsModal';
import { NotificationArea } from '../common';
import { ActiveEffectsBar } from '../events';

function ActivePanel() {
  const activeTab = useGameStore((s) => s.activeTab);

  switch (activeTab) {
    case 'buildings':
      return <BuildingPanel />;
    case 'colonyMap':
      return <ColonyMapPanel />;
    case 'upgrades':
      return <UpgradePanel />;
    case 'ships':
      return <ShipPanel />;
    case 'achievements':
      return <AchievementPanel />;
    case 'prestige':
      return <PrestigePanel />;
    case 'encyclopedia':
      return <EncyclopediaPanel />;
    default:
      return <BuildingPanel />;
  }
}

export function GameLayout() {
  const currentEra = useGameStore((s) => s.currentEra);
  const showSettings = useGameStore((s) => s.showSettings);
  const notifications = useGameStore((s) => s.notifications);
  const removeNotification = useGameStore((s) => s.removeNotification);
  const eraDef = ERA_DEFINITIONS[currentEra];

  return (
    <div
      data-era={currentEra}
      className="h-screen flex flex-col overflow-hidden"
      style={{
        '--era-primary': eraDef.themeColors.primary,
        '--era-secondary': eraDef.themeColors.secondary,
        '--era-accent': eraDef.themeColors.accent,
        '--era-bg': eraDef.themeColors.bg,
        '--era-surface': eraDef.themeColors.surface,
        '--era-text': eraDef.themeColors.text,
        backgroundColor: eraDef.themeColors.bg,
        color: eraDef.themeColors.text,
      } as React.CSSProperties}
    >
      {/* Background effects */}
      <div className="starfield" aria-hidden="true">
        <div className="star-layer" />
      </div>
      <div className="tech-grid" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Content (above overlays) */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Top header */}
        <Header />

        {/* Resource bar */}
        <ResourceBar />

        {/* Active buffs/debuffs */}
        <ActiveEffectsBar />

        {/* Main area: sidebar + content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex flex-1 overflow-hidden">
            {/* Click target column */}
            <div className="w-72 shrink-0 border-r border-[var(--era-surface)] flex flex-col items-center justify-center p-4">
              <ClickTarget />
            </div>

            {/* Active panel */}
            <div className="flex-1 overflow-y-auto p-6">
              <ActivePanel />
            </div>
          </main>
        </div>

        {/* Settings modal */}
        <SettingsModal isOpen={showSettings} />

        {/* Notifications */}
        <NotificationArea
          notifications={notifications}
          onDismiss={removeNotification}
        />
      </div>
    </div>
  );
}
