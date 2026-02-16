import React, { useState, useCallback } from 'react';
import type { BuildingKey, BuildingState, BuildingDefinition, ResourceKey, Resources } from '@foundation/shared';
import { BUILDING_DEFINITIONS, calcBulkCost, calcMaxAffordable, calcBuildingUnitRates } from '@foundation/shared';
import { useGameStore, selectGameState } from '../../store';
import type { BuyAmount } from '../../store';
import { buyBuilding } from '../../api';
import { Button, Tooltip } from '../common';
import { BUILDING_ART_MAP } from '../../assets/svg/buildings';
import { formatNumber, formatResource } from '../../utils/format';

interface BuildingCardProps {
  buildingState: BuildingState;
  isBestValue?: boolean;
}

function getBuildingLevel(count: number): 1 | 2 | 3 {
  if (count >= 50) return 3;
  if (count >= 10) return 2;
  return 1;
}

function getEffectiveAmount(
  buyAmount: BuyAmount,
  definition: BuildingDefinition,
  owned: number,
  resources: Resources,
): number {
  if (buyAmount === 'max') {
    // For max, compute based on the primary cost (credits)
    const primaryKey = Object.keys(definition.baseCost)[0] as ResourceKey;
    const baseCost = definition.baseCost[primaryKey] ?? 0;
    const budget = resources[primaryKey] ?? 0;
    return Math.max(1, calcMaxAffordable(baseCost, owned, budget));
  }
  return buyAmount;
}

function getTotalCost(
  definition: BuildingDefinition,
  owned: number,
  amount: number,
): Partial<Record<ResourceKey, number>> {
  const totalCost: Partial<Record<ResourceKey, number>> = {};
  for (const [key, baseCost] of Object.entries(definition.baseCost)) {
    if (baseCost !== undefined) {
      totalCost[key as ResourceKey] = calcBulkCost(baseCost, owned, amount);
    }
  }
  return totalCost;
}

function canAfford(
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

export function BuildingCard({ buildingState, isBestValue = false }: BuildingCardProps) {
  const definition = BUILDING_DEFINITIONS[buildingState.buildingKey];
  const resources = useGameStore((s) => s.resources);
  const buyAmount = useGameStore((s) => s.buyAmount);
  const setResources = useGameStore((s) => s.setResources);
  const updateBuilding = useGameStore((s) => s.updateBuilding);
  const addNotification = useGameStore((s) => s.addNotification);
  const [loading, setLoading] = useState(false);

  const ArtComponent = BUILDING_ART_MAP[buildingState.buildingKey];
  const level = getBuildingLevel(buildingState.count);

  const effectiveAmount = getEffectiveAmount(
    buyAmount,
    definition,
    buildingState.count,
    resources,
  );
  const totalCost = getTotalCost(definition, buildingState.count, effectiveAmount);
  const affordable = canAfford(totalCost, resources);

  const handleBuy = useCallback(async () => {
    if (!affordable || loading) return;
    setLoading(true);
    try {
      const result = await buyBuilding(buildingState.buildingKey, effectiveAmount);
      setResources(result.resources);
      updateBuilding(result.building.buildingKey, result.building.count);
      addNotification({
        message: `Built ${effectiveAmount} ${definition.name}${effectiveAmount > 1 ? 's' : ''}`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy building';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [
    affordable,
    loading,
    buildingState.buildingKey,
    effectiveAmount,
    definition.name,
    setResources,
    updateBuilding,
    addNotification,
  ]);

  if (!buildingState.isUnlocked) return null;

  return (
    <div data-tutorial={`building-${buildingState.buildingKey}`} className={[
      'holo-card neon-border-hover flex items-start gap-4 p-4 rounded-lg border transition-colors',
      isBestValue
        ? 'border-[var(--era-accent)]/40 bg-[var(--era-surface)]/40 neon-border-best-value'
        : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30',
      'hover:bg-[var(--era-surface)]/50',
    ].join(' ')}>
      {/* Building art */}
      <div className="shrink-0 w-16 h-16 flex items-center justify-center rounded-md bg-[var(--era-bg)]/60 border border-[var(--era-primary)]/10">
        <ArtComponent size={48} level={level} className="text-[var(--era-primary)]" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-[var(--era-text)] truncate">
            {definition.name}
          </h3>
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--era-accent)]/15 text-[var(--era-accent)] tabular-nums">
            x{buildingState.count}
          </span>
          {level > 1 && (
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--era-primary)]/15 text-[var(--era-primary)]">
              Lv.{level}
            </span>
          )}
          {isBestValue && (
            <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--era-accent)]/20 text-[var(--era-accent)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              BEST ROI
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--era-text)]/50 mb-2 line-clamp-2">
          {definition.description}
        </p>

        {/* Production rates (with all multipliers applied) */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
          {calcBuildingUnitRates(buildingState.buildingKey, selectGameState(useGameStore.getState())).map((prod) => (
            <span
              key={prod.resource}
              className="text-[11px] text-[var(--era-text)]/60"
            >
              <span className="text-[var(--era-accent)]">+{formatResource(prod.amount)}</span>{' '}
              {prod.resource}/s
            </span>
          ))}
        </div>

        {/* Cost and buy button */}
        <div className="flex items-center gap-3">
          <Tooltip
            content={
              <div className="flex flex-col gap-0.5">
                {Object.entries(totalCost).map(([key, val]) => (
                  <span key={key}>
                    {key}: {formatNumber(val ?? 0, 'short')}
                  </span>
                ))}
              </div>
            }
            position="top"
          >
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              {Object.entries(totalCost).map(([key, val]) => {
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
          </Tooltip>

          <Button
            variant="primary"
            size="sm"
            disabled={!affordable}
            loading={loading}
            onClick={handleBuy}
            className="shrink-0 ml-auto"
          >
            Buy {buyAmount === 'max' ? effectiveAmount : buyAmount}
          </Button>
        </div>
      </div>
    </div>
  );
}
