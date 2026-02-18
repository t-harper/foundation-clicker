import React, { useState } from 'react';
import { useGameStore, selectProductionRates, selectBestCreditROITarget } from '@desktop/store';
import type { ActiveTab } from '@desktop/store';
import { useShallow } from 'zustand/react/shallow';
import type { ResourceKey, ActiveEffect } from '@foundation/shared';
import { BUILDING_DEFINITIONS, UPGRADE_DEFINITIONS } from '@foundation/shared';
import { NumberDisplay } from '@desktop/components/common';
import { formatResource } from '@desktop/utils/format';
import {
  CreditsIcon,
  KnowledgeIcon,
  InfluenceIcon,
  NuclearTechIcon,
  RawMaterialsIcon,
} from '@desktop/assets/svg/icons';

interface ResourceConfig {
  key: ResourceKey;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  colorClass: string;
}

const RESOURCE_CONFIGS: ResourceConfig[] = [
  { key: 'credits', label: 'Credits', shortLabel: 'Cred', icon: <CreditsIcon className="w-3.5 h-3.5" />, colorClass: 'text-yellow-400' },
  { key: 'knowledge', label: 'Knowledge', shortLabel: 'Know', icon: <KnowledgeIcon className="w-3.5 h-3.5" />, colorClass: 'text-blue-400' },
  { key: 'influence', label: 'Influence', shortLabel: 'Infl', icon: <InfluenceIcon className="w-3.5 h-3.5" />, colorClass: 'text-purple-400' },
  { key: 'nuclearTech', label: 'Nuclear Tech', shortLabel: 'Nuc', icon: <NuclearTechIcon className="w-3.5 h-3.5" />, colorClass: 'text-green-400' },
  { key: 'rawMaterials', label: 'Materials', shortLabel: 'Mat', icon: <RawMaterialsIcon className="w-3.5 h-3.5" />, colorClass: 'text-amber-600' },
];

function getResourceBuffStatus(
  resource: ResourceKey,
  effects: ActiveEffect[]
): 'buff' | 'debuff' | null {
  const now = Math.floor(Date.now() / 1000);
  let hasBuff = false;
  let hasDebuff = false;
  for (const e of effects) {
    if (e.expiresAt <= now) continue;
    if (
      (e.effectType === 'productionBuff' && e.resource === resource) ||
      e.effectType === 'globalProductionBuff'
    ) hasBuff = true;
    if (
      (e.effectType === 'productionDebuff' && e.resource === resource) ||
      e.effectType === 'globalProductionDebuff'
    ) hasDebuff = true;
  }
  if (hasBuff) return 'buff';
  if (hasDebuff) return 'debuff';
  return null;
}

function ResourceChip({ config }: { config: ResourceConfig }) {
  const value = useGameStore((s) => s.resources[config.key]);
  const rate = useGameStore((s) => selectProductionRates(s)[config.key]);
  const activeEffects = useGameStore((s) => s.activeEffects);
  const buffStatus = getResourceBuffStatus(config.key, activeEffects);
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="relative shrink-0" data-tutorial={config.key === 'credits' ? 'resource-credits' : undefined}>
      <button
        type="button"
        onClick={() => setShowPopover(!showPopover)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--era-surface)]/50 neon-border-subtle touch-action-manipulation ${
          buffStatus === 'buff' ? 'ring-1 ring-green-500/30' : ''
        }${buffStatus === 'debuff' ? 'ring-1 ring-red-500/30' : ''}`}
      >
        <span className={config.colorClass}>{config.icon}</span>
        <div className="flex flex-col leading-none">
          <NumberDisplay
            value={value}
            format="short"
            animate
            className={`text-xs font-semibold resource-glow ${config.colorClass}`}
          />
          {rate > 0 && (
            <span className={`text-[9px] ${
              buffStatus === 'buff' ? 'text-green-400' :
              buffStatus === 'debuff' ? 'text-red-400' :
              'text-[var(--era-text)]/40'
            }`}>
              +{formatResource(rate)}/s
            </span>
          )}
        </div>
      </button>

      {/* Tap popover */}
      {showPopover && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowPopover(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 bg-[var(--era-bg)] border border-[var(--era-accent)]/30 rounded-md p-2.5 shadow-lg min-w-[140px]">
            <div className="flex flex-col gap-0.5 text-xs">
              <span className="font-semibold text-[var(--era-primary)]">{config.label}</span>
              <span className="text-[var(--era-text)]/70">Current: {formatResource(value)}</span>
              <span className="text-[var(--era-text)]/70">Rate: {formatResource(rate)}/s</span>
              {buffStatus === 'buff' && <span className="text-green-400">Boosted by active effect</span>}
              {buffStatus === 'debuff' && <span className="text-red-400">Reduced by active effect</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MobileBestROIButton() {
  const target = useGameStore(useShallow(selectBestCreditROITarget));
  const setActiveTab = useGameStore((s) => s.setActiveTab);

  if (!target) return null;

  const handleClick = () => {
    setActiveTab(target.tab as ActiveTab);
    requestAnimationFrame(() => {
      const prefix = target.tab === 'buildings' ? 'building' : 'upgrade';
      const el = document.querySelector(`[data-tutorial="${prefix}-${target.key}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md bg-[var(--era-accent)]/15 border border-[var(--era-accent)]/30 active:bg-[var(--era-accent)]/25 transition-colors text-[var(--era-accent)] touch-action-manipulation"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-[10px] font-semibold whitespace-nowrap">ROI</span>
    </button>
  );
}

export function MobileResourceBar() {
  return (
    <div data-tutorial="resource-bar" className="flex items-center gap-1.5 px-2 py-1.5 overflow-x-auto scrollbar-none">
      {RESOURCE_CONFIGS.map((config) => (
        <ResourceChip key={config.key} config={config} />
      ))}
      <MobileBestROIButton />
    </div>
  );
}
