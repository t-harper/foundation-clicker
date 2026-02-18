import React, { useState, useCallback } from 'react';
import type {
  BuildingKey,
  BuildingState,
  BuildingDefinition,
  ResourceKey,
  Resources,
} from '@foundation/shared';
import {
  BUILDING_DEFINITIONS,
  calcBulkCost,
  calcMaxAffordableBuilding,
  calcBuildingUnitRates,
} from '@foundation/shared';
import { useGameStore, selectGameState } from '@desktop/store';
import type { BuyAmount } from '@desktop/store';
import { buyBuilding } from '@desktop/api';
import { BUILDING_ART_MAP } from '@desktop/assets/svg/buildings';
import { formatNumber, formatResource } from '@desktop/utils/format';

interface MobileBuildingCardProps {
  buildingState: BuildingState;
  isBestROI?: boolean;
}

function getBuildingLevel(count: number): 1 | 2 | 3 {
  if (count >= 50) return 3;
  if (count >= 10) return 2;
  return 1;
}

function getEffectiveAmount(
  buyAmount: BuyAmount,
  buildingKey: BuildingKey,
  owned: number,
  resources: Resources,
): number {
  if (buyAmount === 'max') {
    return Math.max(1, calcMaxAffordableBuilding(buildingKey, owned, resources));
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

function canAffordCost(
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

export function MobileBuildingCard({ buildingState, isBestROI = false }: MobileBuildingCardProps) {
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
    buildingState.buildingKey,
    buildingState.count,
    resources,
  );
  const totalCost = getTotalCost(definition, buildingState.count, effectiveAmount);
  const affordable = canAffordCost(totalCost, resources);

  const productionRates = calcBuildingUnitRates(
    buildingState.buildingKey,
    selectGameState(useGameStore.getState()),
  );

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

  // Build the cost display string (compact, one line)
  const costEntries = Object.entries(totalCost);

  return (
    <div
      data-tutorial={`building-${buildingState.buildingKey}`}
      className={[
        'relative w-full rounded-lg border p-3 transition-colors',
        isBestROI
          ? 'border-[var(--era-accent)]/40 bg-[var(--era-surface)]/40 neon-border-best-value'
          : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30 neon-border-subtle',
      ].join(' ')}
    >
      {/* Best ROI badge */}
      {isBestROI && (
        <div className="absolute -top-2 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--era-accent)] text-[var(--era-bg)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          BEST ROI
        </div>
      )}

      {/* Top row: Art + Name/Info + Count */}
      <div className="flex items-center gap-3">
        {/* Building art */}
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-[var(--era-bg)]/60 border border-[var(--era-primary)]/10">
          <ArtComponent size={48} level={level} className="text-[var(--era-primary)]" />
        </div>

        {/* Name + production */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--era-text)] truncate">
              {definition.name}
            </span>
            {level > 1 && (
              <span className="shrink-0 px-1 py-0.5 rounded text-[9px] font-medium bg-[var(--era-primary)]/15 text-[var(--era-primary)]">
                Lv.{level}
              </span>
            )}
          </div>

          {/* Production rates (compact, one line) */}
          <div className="flex flex-wrap gap-x-2 mt-0.5">
            {productionRates.map((prod) => (
              <span
                key={prod.resource}
                className="text-[10px] text-[var(--era-text)]/60"
              >
                <span className="text-[var(--era-accent)]">
                  +{formatResource(prod.amount)}
                </span>{' '}
                {prod.resource}/s
              </span>
            ))}
          </div>
        </div>

        {/* Count badge */}
        <div className="shrink-0 flex flex-col items-center">
          <span className="text-lg font-bold text-[var(--era-accent)] tabular-nums leading-none">
            {buildingState.count}
          </span>
          <span className="text-[9px] text-[var(--era-text)]/40 mt-0.5">owned</span>
        </div>
      </div>

      {/* Buy button (full-width, 44px height for touch) */}
      <button
        type="button"
        onClick={handleBuy}
        disabled={!affordable || loading}
        className={[
          'w-full h-11 mt-3 rounded-md flex items-center justify-center gap-2',
          'text-sm font-semibold',
          'touch-action-manipulation select-none',
          'transition-colors duration-100',
          'active:scale-[0.98] transition-transform',
          affordable && !loading
            ? 'bg-[var(--era-accent)] text-[var(--era-bg)] active:bg-[var(--era-primary)]'
            : 'bg-[var(--era-surface)]/50 text-[var(--era-text)]/30 cursor-not-allowed',
        ].join(' ')}
      >
        {loading ? (
          <span className="text-xs">Building...</span>
        ) : (
          <>
            <span>
              Buy {buyAmount === 'max' ? effectiveAmount : buyAmount}
            </span>
            <span className="text-xs opacity-80">
              ({costEntries.map(([key, val], i) => {
                const hasEnough = (resources[key as ResourceKey] ?? 0) >= (val ?? 0);
                return (
                  <span key={key} className={hasEnough ? '' : 'text-red-300'}>
                    {i > 0 ? ', ' : ''}
                    {formatNumber(val ?? 0, 'short')} {key}
                  </span>
                );
              })})
            </span>
          </>
        )}
      </button>
    </div>
  );
}
