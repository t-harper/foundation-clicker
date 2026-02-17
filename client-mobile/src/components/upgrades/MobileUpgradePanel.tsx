import React, { useMemo, useState, useCallback } from 'react';
import { useGameStore, selectBestCreditROIUpgrade } from '@desktop/store';
import { UPGRADE_DEFINITIONS, ERA_DEFINITIONS } from '@foundation/shared';
import type { UpgradeState, ResourceKey, Era } from '@foundation/shared';
import { MobileUpgradeCard } from './MobileUpgradeCard';

interface CategorizedUpgrade {
  state: UpgradeState;
  canAfford: boolean;
  prereqsMet: boolean;
}

export function MobileUpgradePanel() {
  const upgrades = useGameStore((s) => s.upgrades);
  const buildings = useGameStore((s) => s.buildings);
  const currentEra = useGameStore((s) => s.currentEra);
  const resources = useGameStore((s) => s.resources);
  const bestValueKey = useGameStore(selectBestCreditROIUpgrade);
  const [showUnaffordable, setShowUnaffordable] = useState(false);
  const [showPurchased, setShowPurchased] = useState(false);

  // Memoize the purchased keys set
  const purchasedKeys = useMemo(
    () => new Set(upgrades.filter((u) => u.isPurchased).map((u) => u.upgradeKey)),
    [upgrades],
  );

  // Categorize all upgrades
  const { available, purchasedByEra, totalPurchased, hiddenCount } = useMemo(() => {
    const avail: CategorizedUpgrade[] = [];
    const purchMap = new Map<Era, UpgradeState[]>();
    let hidden = 0;

    function totalCost(key: string): number {
      const def = UPGRADE_DEFINITIONS[key];
      return def ? Object.values(def.cost).reduce((s, v) => s + (v ?? 0), 0) : 0;
    }

    for (const upgrade of upgrades) {
      const def = UPGRADE_DEFINITIONS[upgrade.upgradeKey];
      if (!def) continue;
      if (def.era > currentEra) continue;

      if (upgrade.isPurchased) {
        const list = purchMap.get(def.era) ?? [];
        list.push(upgrade);
        purchMap.set(def.era, list);
        continue;
      }

      // Check prerequisites
      let prereqsMet = true;
      if (def.prerequisites?.some((p) => !purchasedKeys.has(p))) {
        prereqsMet = false;
      }
      if (def.requiredBuilding) {
        const b = buildings.find((b) => b.buildingKey === def.requiredBuilding!.key);
        if (!b || b.count < def.requiredBuilding.count) {
          prereqsMet = false;
        }
      }

      // Check affordability
      const canAfford = prereqsMet && Object.entries(def.cost).every(
        ([key, amount]) => amount === undefined || (resources[key as ResourceKey] ?? 0) >= amount,
      );

      if (!canAfford && !prereqsMet && !showUnaffordable) {
        hidden++;
        continue;
      }
      if (!canAfford && prereqsMet && !showUnaffordable) {
        hidden++;
        continue;
      }

      avail.push({ state: upgrade, canAfford, prereqsMet });
    }

    // Sort: affordable first, then by total cost ascending
    avail.sort((a, b) => {
      if (a.canAfford !== b.canAfford) return a.canAfford ? -1 : 1;
      return totalCost(a.state.upgradeKey) - totalCost(b.state.upgradeKey);
    });

    // Sort purchased within each era by cost
    const purchasedEraGroups: { era: Era; upgrades: UpgradeState[] }[] = [];
    let purchTotal = 0;
    for (let e = 0 as Era; e <= currentEra; e = (e + 1) as Era) {
      const list = purchMap.get(e);
      if (list && list.length > 0) {
        list.sort((a, b) => totalCost(a.upgradeKey) - totalCost(b.upgradeKey));
        purchasedEraGroups.push({ era: e, upgrades: list });
        purchTotal += list.length;
      }
    }

    return { available: avail, purchasedByEra: purchasedEraGroups, totalPurchased: purchTotal, hiddenCount: hidden };
  }, [upgrades, buildings, currentEra, resources, purchasedKeys, showUnaffordable]);

  const handleBuy = useCallback(() => {
    // No-op callback; state updates happen inside MobileUpgradeCard via the store
  }, []);

  const affordableCount = available.filter((u) => u.canAfford).length;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-display font-semibold text-[var(--era-primary)]">
          Upgrades
        </h2>
        <span className="text-[11px] text-[var(--era-text)]/40">
          {totalPurchased}/{upgrades.filter((u) => UPGRADE_DEFINITIONS[u.upgradeKey]?.era !== undefined && UPGRADE_DEFINITIONS[u.upgradeKey]!.era <= currentEra).length}
        </span>
      </div>

      {/* Toggle unaffordable */}
      <button
        type="button"
        onClick={() => setShowUnaffordable((v) => !v)}
        className="flex items-center gap-2 text-xs text-[var(--era-text)]/60 active:text-[var(--era-text)] transition-colors touch-action-manipulation px-1"
      >
        <span
          className={[
            'relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors',
            showUnaffordable
              ? 'bg-[var(--era-accent)]/30 border-[var(--era-accent)]'
              : 'bg-[var(--era-surface)]/50 border-[var(--era-primary)]/30',
          ].join(' ')}
        >
          <span
            className={[
              'absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all',
              showUnaffordable
                ? 'left-[18px] bg-[var(--era-accent)]'
                : 'left-0.5 bg-[var(--era-text)]/40',
            ].join(' ')}
          />
        </span>
        <span>
          Show unaffordable
          {!showUnaffordable && hiddenCount > 0 && (
            <span className="text-[var(--era-text)]/30"> ({hiddenCount} hidden)</span>
          )}
        </span>
      </button>

      {/* Available section */}
      {available.length > 0 ? (
        <section>
          <div className="flex items-center gap-2 mb-2 px-1">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-[var(--era-primary)]">
              Available
            </h3>
            {affordableCount > 0 && (
              <span className="text-[10px] text-[var(--era-accent)] bg-[var(--era-accent)]/15 px-1.5 py-0.5 rounded-full font-semibold">
                {affordableCount} affordable
              </span>
            )}
            <div className="flex-1 h-px bg-[var(--era-primary)]/15" />
          </div>
          <div className="flex flex-col gap-2">
            {available.map(({ state: upgrade, canAfford }) => {
              const def = UPGRADE_DEFINITIONS[upgrade.upgradeKey];
              if (!def) return null;
              return (
                <MobileUpgradeCard
                  key={upgrade.upgradeKey}
                  upgradeState={upgrade}
                  definition={def}
                  canAfford={canAfford}
                  isBestROI={upgrade.upgradeKey === bestValueKey}
                  onBuy={handleBuy}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <div className="text-center py-8 text-[var(--era-text)]/40">
          <p className="text-sm">No upgrades available yet.</p>
          <p className="text-xs mt-1">Build more to unlock upgrades!</p>
        </div>
      )}

      {/* Purchased section (collapsible, grouped by era) */}
      {totalPurchased > 0 && (
        <section>
          <button
            type="button"
            onClick={() => setShowPurchased((v) => !v)}
            className="flex items-center gap-2 w-full px-1 mb-2 touch-action-manipulation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3.5 h-3.5 text-[var(--era-text)]/40 transition-transform ${showPurchased ? 'rotate-90' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-[var(--era-text)]/50">
              Purchased
            </h3>
            <span className="text-[10px] text-[var(--era-text)]/30">
              ({totalPurchased})
            </span>
            <div className="flex-1 h-px bg-[var(--era-primary)]/10" />
          </button>

          {showPurchased && (
            <div className="flex flex-col gap-3">
              {purchasedByEra.map(({ era, upgrades: eraUpgrades }) => {
                const eraDef = ERA_DEFINITIONS[era];
                return (
                  <div key={`purchased-era-${era}`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <h4 className="text-[10px] font-semibold tracking-wide uppercase text-[var(--era-text)]/40">
                        Era {era}: {eraDef.name}
                      </h4>
                      <div className="flex-1 h-px bg-[var(--era-primary)]/10" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {eraUpgrades.map((upgrade) => {
                        const def = UPGRADE_DEFINITIONS[upgrade.upgradeKey];
                        if (!def) return null;
                        return (
                          <MobileUpgradeCard
                            key={upgrade.upgradeKey}
                            upgradeState={upgrade}
                            definition={def}
                            canAfford={false}
                            onBuy={handleBuy}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
