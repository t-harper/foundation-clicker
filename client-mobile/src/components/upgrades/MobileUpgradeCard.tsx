import React, { useState, useCallback } from 'react';
import type { UpgradeState, UpgradeDefinition, UpgradeEffect, ResourceKey, Resources } from '@foundation/shared';
import { UPGRADE_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '@desktop/store';
import { buyUpgrade } from '@desktop/api';
import { formatNumber } from '@desktop/utils/format';

interface MobileUpgradeCardProps {
  upgradeState: UpgradeState;
  definition: UpgradeDefinition;
  canAfford: boolean;
  isBestROI?: boolean;
  onBuy: (upgradeKey: string) => void;
}

function formatEffect(effect: UpgradeEffect): string {
  switch (effect.type) {
    case 'clickMultiplier':
      return `Click value x${effect.multiplier}`;
    case 'clickPerBuilding':
      return `+${effect.creditsPerBuilding} click per ${effect.building}`;
    case 'clickBuildingScale':
      return `+${effect.multiplierPerBuilding}x click per ${effect.building}`;
    case 'clickTotalBuildingScale':
      return `+${effect.multiplierPerBuilding}x click per building`;
    case 'clickResourceYield':
      return `Clicks yield ${Math.round(effect.fraction * 100)}% as ${effect.resource}`;
    case 'buildingMultiplier':
      return `${effect.building} x${effect.multiplier}`;
    case 'resourceMultiplier':
      return `${effect.resource} x${effect.multiplier}`;
    case 'globalMultiplier':
      return `All production x${effect.multiplier}`;
    case 'unlockFeature':
      return `Unlocks: ${effect.feature}`;
  }
}

export function MobileUpgradeCard({
  upgradeState,
  definition,
  canAfford,
  isBestROI = false,
  onBuy,
}: MobileUpgradeCardProps) {
  const resources = useGameStore((s) => s.resources);
  const [loading, setLoading] = useState(false);
  const setResources = useGameStore((s) => s.setResources);
  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);
  const addNotification = useGameStore((s) => s.addNotification);

  const isPurchased = upgradeState.isPurchased;

  const handleBuy = useCallback(async () => {
    if (isPurchased || !canAfford || loading) return;
    setLoading(true);
    try {
      const result = await buyUpgrade(upgradeState.upgradeKey);
      setResources(result.resources);
      purchaseUpgrade(result.upgrade.upgradeKey);
      addNotification({
        message: `Purchased: ${definition.name}`,
        type: 'success',
      });
      onBuy(upgradeState.upgradeKey);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy upgrade';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [
    isPurchased,
    canAfford,
    loading,
    upgradeState.upgradeKey,
    definition.name,
    setResources,
    purchaseUpgrade,
    addNotification,
    onBuy,
  ]);

  if (isPurchased) {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--era-surface)]/10 border border-[var(--era-primary)]/10 opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[var(--era-text)]/60 truncate">
            {definition.name}
          </p>
          <p className="text-[10px] text-[var(--era-accent)]/50 truncate">
            {definition.effects.map(formatEffect).join(', ')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-tutorial={`upgrade-${upgradeState.upgradeKey}`}
      className={[
        'rounded-lg border transition-colors',
        isBestROI
          ? 'border-[var(--era-accent)]/40 bg-[var(--era-surface)]/40'
          : 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30',
      ].join(' ')}
    >
      {/* Header row with name, badge, and buy button */}
      <div className="flex items-start gap-2 px-3 pt-3 pb-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {definition.name}
            </h3>
            {isBestROI && (
              <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[var(--era-accent)]/20 text-[var(--era-accent)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                ROI
              </span>
            )}
          </div>
          <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5 line-clamp-2">
            {definition.description}
          </p>
        </div>

        {/* Buy button */}
        <button
          type="button"
          disabled={!canAfford || loading}
          onClick={handleBuy}
          className={[
            'shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold transition-all touch-action-manipulation',
            canAfford && !loading
              ? 'bg-[var(--era-accent)] text-[var(--era-bg)] active:brightness-90'
              : 'bg-[var(--era-surface)]/50 text-[var(--era-text)]/30 cursor-not-allowed',
          ].join(' ')}
        >
          {loading ? (
            <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            'Buy'
          )}
        </button>
      </div>

      {/* Effects */}
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 px-3 pb-1.5">
        {definition.effects.map((effect, idx) => (
          <span key={idx} className="text-[10px] text-[var(--era-accent)] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[var(--era-accent)] shrink-0" />
            {formatEffect(effect)}
          </span>
        ))}
      </div>

      {/* Cost row */}
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 px-3 pb-2.5 border-t border-[var(--era-primary)]/10 pt-1.5 mt-0.5">
        {Object.entries(definition.cost).map(([key, val]) => {
          const hasEnough = (resources[key as ResourceKey] ?? 0) >= (val ?? 0);
          return (
            <span
              key={key}
              className={`text-[11px] tabular-nums ${hasEnough ? 'text-[var(--era-text)]/60' : 'text-red-400'}`}
            >
              {formatNumber(val ?? 0, 'short')} {key}
            </span>
          );
        })}
      </div>
    </div>
  );
}
