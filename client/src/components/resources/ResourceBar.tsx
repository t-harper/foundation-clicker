import React from 'react';
import { useGameStore, selectProductionRates, selectBestCreditROITarget } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import type { BuildingKey, UpgradeKey } from '@foundation/shared';
import { BUILDING_DEFINITIONS, UPGRADE_DEFINITIONS } from '@foundation/shared';
import type { ResourceKey, ActiveEffect } from '@foundation/shared';
import { NumberDisplay, Tooltip } from '../common';
import { formatResource } from '../../utils/format';
import {
  CreditsIcon,
  KnowledgeIcon,
  InfluenceIcon,
  NuclearTechIcon,
  RawMaterialsIcon,
} from '../../assets/svg/icons';

interface ResourceConfig {
  key: ResourceKey;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
}

const RESOURCE_CONFIGS: ResourceConfig[] = [
  {
    key: 'credits',
    label: 'Credits',
    icon: <CreditsIcon className="w-4 h-4" />,
    colorClass: 'text-yellow-400',
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: <KnowledgeIcon className="w-4 h-4" />,
    colorClass: 'text-blue-400',
  },
  {
    key: 'influence',
    label: 'Influence',
    icon: <InfluenceIcon className="w-4 h-4" />,
    colorClass: 'text-purple-400',
  },
  {
    key: 'nuclearTech',
    label: 'Nuclear Tech',
    icon: <NuclearTechIcon className="w-4 h-4" />,
    colorClass: 'text-green-400',
  },
  {
    key: 'rawMaterials',
    label: 'Materials',
    icon: <RawMaterialsIcon className="w-4 h-4" />,
    colorClass: 'text-amber-600',
  },
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
    ) {
      hasBuff = true;
    }
    if (
      (e.effectType === 'productionDebuff' && e.resource === resource) ||
      e.effectType === 'globalProductionDebuff'
    ) {
      hasDebuff = true;
    }
  }
  if (hasBuff && hasDebuff) return 'buff'; // net positive visual
  if (hasBuff) return 'buff';
  if (hasDebuff) return 'debuff';
  return null;
}

function ResourceItem({ config }: { config: ResourceConfig }) {
  const value = useGameStore((s) => s.resources[config.key]);
  const rate = useGameStore((s) => selectProductionRates(s)[config.key]);
  const activeEffects = useGameStore((s) => s.activeEffects);
  const buffStatus = getResourceBuffStatus(config.key, activeEffects);

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{config.label}</span>
          <span>Current: {formatResource(value)}</span>
          <span>Rate: {formatResource(rate)}/s</span>
          {buffStatus === 'buff' && <span className="text-green-400">Boosted by active effect</span>}
          {buffStatus === 'debuff' && <span className="text-red-400">Reduced by active effect</span>}
        </div>
      }
      position="bottom"
    >
      <div data-tutorial={config.key === 'credits' ? 'resource-credits' : undefined} className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--era-surface)]/50 hover:bg-[var(--era-surface)] transition-colors cursor-default neon-border-subtle ${
        buffStatus === 'buff' ? 'ring-1 ring-green-500/30' : ''
      }${buffStatus === 'debuff' ? 'ring-1 ring-red-500/30' : ''}`}>
        <span className={config.colorClass}>{config.icon}</span>
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] text-[var(--era-text)]/50 uppercase tracking-wide">
            {config.label}
          </span>
          <div className="flex items-baseline gap-1.5">
            <NumberDisplay
              value={value}
              format="short"
              animate
              className={`text-sm font-semibold resource-glow ${config.colorClass}`}
            />
            {rate > 0 && (
              <span className={`text-[10px] ${
                buffStatus === 'buff' ? 'text-green-400' :
                buffStatus === 'debuff' ? 'text-red-400' :
                'text-[var(--era-text)]/40'
              }`}>
                +{formatResource(rate)}/s
              </span>
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

function BestROIButton() {
  const target = useGameStore(useShallow(selectBestCreditROITarget));
  const setActiveTab = useGameStore((s) => s.setActiveTab);

  if (!target) return null;

  const label = target.tab === 'buildings'
    ? BUILDING_DEFINITIONS[target.key as BuildingKey]?.name
    : UPGRADE_DEFINITIONS[target.key as UpgradeKey]?.name;

  const handleClick = () => {
    setActiveTab(target.tab);
    requestAnimationFrame(() => {
      const prefix = target.tab === 'buildings' ? 'building' : 'upgrade';
      const el = document.querySelector(`[data-tutorial="${prefix}-${target.key}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <Tooltip content="Jump to the best credits-per-second investment" position="bottom">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--era-accent)]/15 border border-[var(--era-accent)]/30 hover:bg-[var(--era-accent)]/25 transition-colors text-[var(--era-accent)] text-xs font-semibold whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Best ROI: {label}
      </button>
    </Tooltip>
  );
}

export function ResourceBar() {
  return (
    <div data-tutorial="resource-bar" className="flex items-center gap-2 px-5 py-2 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/90 overflow-x-auto">
      {RESOURCE_CONFIGS.map((config) => (
        <ResourceItem key={config.key} config={config} />
      ))}
      <BestROIButton />
    </div>
  );
}
