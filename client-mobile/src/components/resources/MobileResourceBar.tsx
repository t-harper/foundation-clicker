import React, { useState } from 'react';
import { useGameStore, selectProductionRates } from '@desktop/store';
import type { ResourceKey, ActiveEffect } from '@foundation/shared';
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
    <div className="relative shrink-0">
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

export function MobileResourceBar() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/90 overflow-x-auto scrollbar-none">
      {RESOURCE_CONFIGS.map((config) => (
        <ResourceChip key={config.key} config={config} />
      ))}
    </div>
  );
}
