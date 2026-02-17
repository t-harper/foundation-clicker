import React from 'react';
import { useGameStore } from '@desktop/store';
import { ERA_DEFINITIONS } from '@foundation/shared';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileResourceBar } from '../resources/MobileResourceBar';
import { MobileActiveEffectsBar } from '../events/MobileActiveEffectsBar';
import { MobileBuildingPanel } from '../buildings';
import { MobileUpgradePanel } from '../upgrades';
import { MobileShipPanel } from '../ships';
import { MobileAchievementPanel } from '../achievements';
import { MobilePrestigePanel } from '../prestige';
import { MobileEncyclopediaPanel } from '../encyclopedia';
import { MobileColonyMapPanel } from '../colony-map';
import { MobileResearchPanel } from '../research';
import { MobileEventModal } from '../events';
import { MobileEventHistoryPanel } from '../events';
import { MobileClickTarget } from '../resources/MobileClickTarget';
import { FloatingClickButton } from '../resources/FloatingClickButton';
import { MobileOfflineSheet } from '../resources/MobileOfflineSheet';
import { MobileSettingsModal } from '../settings';
import { NotificationArea } from '@desktop/components/common';
import { AdminPanel } from '@desktop/components/admin';

function ActivePanel() {
  const activeTab = useGameStore((s) => s.activeTab) as string;

  switch (activeTab) {
    case 'buildings':
      return <MobileBuildingPanel />;
    case 'colonyMap':
      return <MobileColonyMapPanel />;
    case 'upgrades':
      return <MobileUpgradePanel />;
    case 'ships':
      return <MobileShipPanel />;
    case 'achievements':
      return <MobileAchievementPanel />;
    case 'events':
      return <MobileEventHistoryPanel />;
    case 'prestige':
      return <MobilePrestigePanel />;
    case 'research':
      return <MobileResearchPanel />;
    case 'encyclopedia':
      return <MobileEncyclopediaPanel />;
    case 'admin':
      return <AdminPanel />;
    case 'vault':
      return <MobileClickTarget />;
    default:
      return <MobileBuildingPanel />;
  }
}

export function MobileGameLayout() {
  const currentEra = useGameStore((s) => s.currentEra);
  const activeTab = useGameStore((s) => s.activeTab) as string;
  const showSettings = useGameStore((s) => s.showSettings);
  const notifications = useGameStore((s) => s.notifications);
  const removeNotification = useGameStore((s) => s.removeNotification);
  const showOfflineModal = useGameStore((s) => s.showOfflineModal);
  const eraDef = ERA_DEFINITIONS[currentEra];

  return (
    <div
      data-era={currentEra}
      className="mobile-vh flex flex-col overflow-hidden select-none-deep"
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
      {/* Background */}
      <div className="starfield-mobile" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <MobileHeader />
        <MobileResourceBar />
        <MobileActiveEffectsBar />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto scroll-momentum px-3 py-3">
          <ActivePanel />
        </main>

        {/* FAB click button (hidden on vault tab) */}
        {activeTab !== 'vault' && <FloatingClickButton />}

        {/* Bottom nav */}
        <MobileBottomNav />
      </div>

      {/* Overlays */}
      <MobileSettingsModal isOpen={showSettings} />
      <MobileEventModal />
      {showOfflineModal && <MobileOfflineSheet />}
      <NotificationArea
        notifications={notifications}
        onDismiss={removeNotification}
      />
    </div>
  );
}
