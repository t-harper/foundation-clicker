import React from 'react';
import { useGameStore, selectProductionRates } from '../../store';
import type { ResourceKey } from '@foundation/shared';
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

function ResourceItem({ config }: { config: ResourceConfig }) {
  const value = useGameStore((s) => s.resources[config.key]);
  const rate = useGameStore((s) => selectProductionRates(s)[config.key]);

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{config.label}</span>
          <span>Current: {formatResource(value)}</span>
          <span>Rate: {formatResource(rate)}/s</span>
        </div>
      }
      position="bottom"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--era-surface)]/50 hover:bg-[var(--era-surface)] transition-colors cursor-default neon-border-subtle">
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
              <span className="text-[10px] text-[var(--era-text)]/40">
                +{formatResource(rate)}/s
              </span>
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

export function ResourceBar() {
  return (
    <div className="flex items-center gap-2 px-5 py-2 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/90 overflow-x-auto">
      {RESOURCE_CONFIGS.map((config) => (
        <ResourceItem key={config.key} config={config} />
      ))}
    </div>
  );
}
