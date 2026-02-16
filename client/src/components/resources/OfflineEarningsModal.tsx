import React from 'react';
import type { Resources, ResourceKey } from '@foundation/shared';
import { Modal, Button, NumberDisplay } from '../common';
import { formatDuration } from '../../utils/format';
import {
  CreditsIcon,
  KnowledgeIcon,
  InfluenceIcon,
  NuclearTechIcon,
  RawMaterialsIcon,
  TimeIcon,
} from '../../assets/svg/icons';

export interface OfflineEarningsModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnings: Resources | null;
  offlineSeconds: number;
}

interface ResourceDisplayConfig {
  key: ResourceKey;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
}

const RESOURCE_DISPLAY: ResourceDisplayConfig[] = [
  {
    key: 'credits',
    label: 'Credits',
    icon: <CreditsIcon className="w-5 h-5" />,
    colorClass: 'text-yellow-400',
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: <KnowledgeIcon className="w-5 h-5" />,
    colorClass: 'text-blue-400',
  },
  {
    key: 'influence',
    label: 'Influence',
    icon: <InfluenceIcon className="w-5 h-5" />,
    colorClass: 'text-purple-400',
  },
  {
    key: 'nuclearTech',
    label: 'Nuclear Tech',
    icon: <NuclearTechIcon className="w-5 h-5" />,
    colorClass: 'text-green-400',
  },
  {
    key: 'rawMaterials',
    label: 'Materials',
    icon: <RawMaterialsIcon className="w-5 h-5" />,
    colorClass: 'text-amber-600',
  },
];

export function OfflineEarningsModal({
  isOpen,
  onClose,
  earnings,
  offlineSeconds,
}: OfflineEarningsModalProps) {
  if (!earnings) return null;

  const earnedResources = RESOURCE_DISPLAY.filter(
    (config) => earnings[config.key] > 0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back, Foundation" size="md">
      {/* Time away */}
      <div className="flex items-center gap-2 mb-5 text-[var(--era-text)]/70">
        <TimeIcon className="w-4 h-4 text-[var(--era-primary)]" />
        <span className="text-sm">
          You were away for <span className="font-semibold text-[var(--era-text)]">{formatDuration(offlineSeconds)}</span>
        </span>
      </div>

      {/* Earnings list */}
      {earnedResources.length > 0 ? (
        <div className="flex flex-col gap-2 mb-5">
          <h3 className="text-xs uppercase tracking-wide text-[var(--era-text)]/50 font-semibold mb-1">
            Resources Earned
          </h3>
          {earnedResources.map((config) => (
            <div
              key={config.key}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-[var(--era-surface)]/50"
            >
              <div className="flex items-center gap-2">
                <span className={config.colorClass}>{config.icon}</span>
                <span className="text-sm text-[var(--era-text)]">{config.label}</span>
              </div>
              <NumberDisplay
                value={earnings[config.key]}
                format="short"
                prefix="+"
                className={`text-sm font-semibold ${config.colorClass}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--era-text)]/50 mb-5">
          No resources were produced while you were away.
        </p>
      )}

      {/* Note about offline rate */}
      <p className="text-xs text-[var(--era-text)]/40 mb-5">
        Offline production runs at 50% efficiency, capped at 24 hours.
      </p>

      {/* Collect button */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onClose}>
          Collect
        </Button>
      </div>
    </Modal>
  );
}
