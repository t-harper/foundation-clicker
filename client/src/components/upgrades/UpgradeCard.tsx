import React, { useState, useCallback } from 'react';
import type { UpgradeState, UpgradeDefinition, UpgradeEffect, ResourceKey, Resources } from '@foundation/shared';
import { UPGRADE_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '../../store';
import { buyUpgrade } from '../../api';
import { Button } from '../common';
import { formatNumber } from '../../utils/format';

interface UpgradeCardProps {
  upgradeState: UpgradeState;
  isBestValue?: boolean;
}

function canAffordUpgrade(
  cost: Partial<Record<ResourceKey, number>>,
  resources: Resources,
): boolean {
  for (const [key, amount] of Object.entries(cost)) {
    if (amount !== undefined && (resources[key as ResourceKey] ?? 0) < amount) {
      return false;
    }
  }
  return true;
}

function hasPrerequisites(
  definition: UpgradeDefinition,
  upgrades: UpgradeState[],
  buildings: Array<{ buildingKey: string; count: number }>,
): boolean {
  // Check prerequisite upgrades
  if (definition.prerequisites) {
    for (const prereq of definition.prerequisites) {
      const upgradeState = upgrades.find((u) => u.upgradeKey === prereq);
      if (!upgradeState?.isPurchased) return false;
    }
  }
  // Check required building
  if (definition.requiredBuilding) {
    const buildingState = buildings.find(
      (b) => b.buildingKey === definition.requiredBuilding!.key,
    );
    if (!buildingState || buildingState.count < definition.requiredBuilding.count) {
      return false;
    }
  }
  return true;
}

function formatEffect(effect: UpgradeEffect): string {
  switch (effect.type) {
    case 'clickMultiplier':
      return `Click value x${effect.multiplier}`;
    case 'clickPerBuilding':
      return `+${effect.creditsPerBuilding} click value per ${effect.building}`;
    case 'clickBuildingScale':
      return `+${effect.multiplierPerBuilding}x click multiplier per ${effect.building}`;
    case 'clickTotalBuildingScale':
      return `+${effect.multiplierPerBuilding}x click multiplier per building`;
    case 'clickResourceYield':
      return `Clicks yield ${Math.round(effect.fraction * 100)}% of credit value as ${effect.resource}`;
    case 'buildingMultiplier':
      return `${effect.building} production x${effect.multiplier}`;
    case 'resourceMultiplier':
      return `${effect.resource} production x${effect.multiplier}`;
    case 'globalMultiplier':
      return `All production x${effect.multiplier}`;
    case 'unlockFeature':
      return `Unlocks: ${effect.feature}`;
  }
}

export function UpgradeCard({ upgradeState, isBestValue = false }: UpgradeCardProps) {
  const definition = UPGRADE_DEFINITIONS[upgradeState.upgradeKey];
  const resources = useGameStore((s) => s.resources);
  const upgrades = useGameStore((s) => s.upgrades);
  const buildings = useGameStore((s) => s.buildings);
  const setResources = useGameStore((s) => s.setResources);
  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);
  const addNotification = useGameStore((s) => s.addNotification);
  const [loading, setLoading] = useState(false);

  if (!definition) return null;

  const isPurchased = upgradeState.isPurchased;
  const affordable = canAffordUpgrade(definition.cost, resources);
  const prereqsMet = hasPrerequisites(definition, upgrades, buildings);
  const canBuy = !isPurchased && affordable && prereqsMet;

  const handleBuy = useCallback(async () => {
    if (!canBuy || loading) return;
    setLoading(true);
    try {
      const result = await buyUpgrade(upgradeState.upgradeKey);
      setResources(result.resources);
      purchaseUpgrade(result.upgrade.upgradeKey);
      addNotification({
        message: `Purchased upgrade: ${definition.name}`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy upgrade';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [
    canBuy,
    loading,
    upgradeState.upgradeKey,
    definition.name,
    setResources,
    purchaseUpgrade,
    addNotification,
  ]);

  return (
    <div
      className={[
        'p-4 rounded-lg border transition-colors',
        isPurchased
          ? 'border-[var(--era-primary)]/10 bg-[var(--era-surface)]/10 opacity-60'
          : isBestValue
            ? 'holo-card neon-border-hover neon-border-best-value border-[var(--era-accent)]/40 bg-[var(--era-surface)]/40 hover:bg-[var(--era-surface)]/50'
            : 'holo-card neon-border-hover border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30 hover:bg-[var(--era-surface)]/50',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {definition.name}
            </h3>
            {isPurchased && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Purchased
              </span>
            )}
            {isBestValue && !isPurchased && (
              <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--era-accent)]/20 text-[var(--era-accent)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                BEST ROI
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--era-text)]/50 mt-1">
            {definition.description}
          </p>
        </div>
      </div>

      {/* Effects */}
      <ul className="mb-3 space-y-0.5">
        {definition.effects.map((effect, idx) => (
          <li key={idx} className="text-xs text-[var(--era-accent)] flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[var(--era-accent)] shrink-0" />
            {formatEffect(effect)}
          </li>
        ))}
      </ul>

      {/* Prerequisites hint (if not met) */}
      {!isPurchased && !prereqsMet && (
        <p className="text-[11px] text-amber-400/70 mb-2">
          Prerequisites not met
          {definition.requiredBuilding && (
            <span>
              {' '}
              (Need {definition.requiredBuilding.count}x {definition.requiredBuilding.key})
            </span>
          )}
          {definition.prerequisites && definition.prerequisites.length > 0 && (
            <span>
              {' '}
              (Requires: {definition.prerequisites.join(', ')})
            </span>
          )}
        </p>
      )}

      {/* Cost and buy */}
      {!isPurchased && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {Object.entries(definition.cost).map(([key, val]) => {
              const hasEnough = (resources[key as ResourceKey] ?? 0) >= (val ?? 0);
              return (
                <span
                  key={key}
                  className={`text-xs tabular-nums ${hasEnough ? 'text-[var(--era-text)]/60' : 'text-red-400'}`}
                >
                  {formatNumber(val ?? 0, 'short')} {key}
                </span>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="sm"
            disabled={!canBuy}
            loading={loading}
            onClick={handleBuy}
            className="shrink-0"
          >
            Buy
          </Button>
        </div>
      )}
    </div>
  );
}
