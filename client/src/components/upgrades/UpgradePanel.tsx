import React, { useMemo, useState } from 'react';
import { useGameStore, selectBestCreditROIUpgrade } from '../../store';
import { UPGRADE_DEFINITIONS, ERA_DEFINITIONS, Era } from '@foundation/shared';
import type { UpgradeState, ResourceKey } from '@foundation/shared';
import { UpgradeCard } from './UpgradeCard';

interface EraUpgradeGroup {
  era: Era;
  name: string;
  available: UpgradeState[];
  purchased: UpgradeState[];
}

export function UpgradePanel() {
  const upgrades = useGameStore((s) => s.upgrades);
  const buildings = useGameStore((s) => s.buildings);
  const currentEra = useGameStore((s) => s.currentEra);
  const resources = useGameStore((s) => s.resources);
  const bestValueKey = useGameStore(selectBestCreditROIUpgrade);
  const [showAll, setShowAll] = useState(false);

  const eraGroups = useMemo<EraUpgradeGroup[]>(() => {
    function totalCost(upgradeKey: string): number {
      const def = UPGRADE_DEFINITIONS[upgradeKey];
      if (!def) return 0;
      return Object.values(def.cost).reduce((sum, v) => sum + (v ?? 0), 0);
    }

    const byCost = (a: UpgradeState, b: UpgradeState) =>
      totalCost(a.upgradeKey) - totalCost(b.upgradeKey);

    const groups = new Map<Era, { available: UpgradeState[]; purchased: UpgradeState[] }>();

    for (const upgrade of upgrades) {
      const def = UPGRADE_DEFINITIONS[upgrade.upgradeKey];
      if (!def) continue;

      const era = def.era;
      if (!groups.has(era)) {
        groups.set(era, { available: [], purchased: [] });
      }
      const group = groups.get(era)!;
      if (upgrade.isPurchased) {
        group.purchased.push(upgrade);
      } else {
        group.available.push(upgrade);
      }
    }

    const result: EraUpgradeGroup[] = [];
    for (let e = 0 as Era; e <= currentEra; e = (e + 1) as Era) {
      const eraDef = ERA_DEFINITIONS[e];
      const group = groups.get(e);
      if (group && (group.available.length > 0 || group.purchased.length > 0)) {
        group.available.sort(byCost);
        group.purchased.sort(byCost);
        result.push({
          era: e,
          name: eraDef.name,
          available: group.available,
          purchased: group.purchased,
        });
      }
    }

    return result;
  }, [upgrades, currentEra]);

  const totalAvailable = eraGroups.reduce((sum, g) => sum + g.available.length, 0);
  const totalPurchased = eraGroups.reduce((sum, g) => sum + g.purchased.length, 0);

  // Filter available upgrades by affordability and prerequisites unless showAll is on
  const filteredGroups = useMemo(() => {
    if (showAll) return eraGroups;
    const purchasedKeys = new Set(upgrades.filter((u) => u.isPurchased).map((u) => u.upgradeKey));
    return eraGroups.map((group) => ({
      ...group,
      available: group.available.filter((u) => {
        const def = UPGRADE_DEFINITIONS[u.upgradeKey];
        if (!def) return false;
        // Check affordability
        const affordable = Object.entries(def.cost).every(
          ([key, amount]) => amount === undefined || (resources[key as ResourceKey] ?? 0) >= amount,
        );
        if (!affordable) return false;
        // Check prerequisite upgrades
        if (def.prerequisites?.some((p) => !purchasedKeys.has(p))) return false;
        // Check required building
        if (def.requiredBuilding) {
          const b = buildings.find((b) => b.buildingKey === def.requiredBuilding!.key);
          if (!b || b.count < def.requiredBuilding.count) return false;
        }
        return true;
      }),
    })).filter((g) => g.available.length > 0 || g.purchased.length > 0);
  }, [eraGroups, showAll, resources, upgrades, buildings]);

  const hiddenCount = showAll
    ? 0
    : totalAvailable - filteredGroups.reduce((sum, g) => sum + g.available.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Upgrades
        </h2>
        <span className="text-xs text-[var(--era-text)]/40">
          {totalPurchased} purchased / {totalAvailable + totalPurchased} total
        </span>
      </div>

      {/* Show all toggle */}
      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        className="flex items-center gap-2 text-xs text-[var(--era-text)]/60 hover:text-[var(--era-text)] transition-colors"
      >
        <span
          className={[
            'relative inline-flex h-4 w-7 shrink-0 rounded-full border transition-colors',
            showAll
              ? 'bg-[var(--era-accent)]/30 border-[var(--era-accent)]'
              : 'bg-[var(--era-surface)]/50 border-[var(--era-primary)]/30',
          ].join(' ')}
        >
          <span
            className={[
              'absolute top-0.5 h-2.5 w-2.5 rounded-full transition-all',
              showAll
                ? 'left-3.5 bg-[var(--era-accent)]'
                : 'left-0.5 bg-[var(--era-text)]/40',
            ].join(' ')}
          />
        </span>
        Show unaffordable upgrades{!showAll && hiddenCount > 0 ? ` (${hiddenCount} hidden)` : ''}
      </button>

      {/* Available upgrades grouped by era */}
      {filteredGroups.every((g) => g.available.length === 0) && totalPurchased === 0 ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="text-lg">No upgrades available yet.</p>
          <p className="text-sm mt-2">Build more to unlock upgrades!</p>
        </div>
      ) : (
        <>
          {filteredGroups
            .filter((g) => g.available.length > 0)
            .map((group) => {
              const eraDef = ERA_DEFINITIONS[group.era];
              return (
                <section key={group.era}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      className="text-sm font-semibold tracking-wide uppercase"
                      style={{ color: eraDef.themeColors.primary }}
                    >
                      Era {group.era}: {group.name}
                    </h3>
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: `${eraDef.themeColors.primary}30` }}
                    />
                  </div>
                  <div className="grid gap-3">
                    {group.available.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.upgradeKey}
                        upgradeState={upgrade}
                        isBestValue={upgrade.upgradeKey === bestValueKey}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

          {/* Purchased upgrades grouped by era, at the bottom */}
          {filteredGroups.some((g) => g.purchased.length > 0) && (
            <>
              <div className="flex items-center gap-3 mt-2">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--era-text)]/30">
                  Purchased
                </h3>
                <div className="flex-1 h-px bg-[var(--era-text)]/10" />
              </div>

              {filteredGroups
                .filter((g) => g.purchased.length > 0)
                .map((group) => {
                  const eraDef = ERA_DEFINITIONS[group.era];
                  return (
                    <section key={`purchased-${group.era}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <h3
                          className="text-xs font-semibold tracking-wide uppercase"
                          style={{ color: `${eraDef.themeColors.primary}80` }}
                        >
                          Era {group.era}: {group.name}
                        </h3>
                        <div
                          className="flex-1 h-px"
                          style={{ backgroundColor: `${eraDef.themeColors.primary}20` }}
                        />
                      </div>
                      <div className="grid gap-3">
                        {group.purchased.map((upgrade) => (
                          <UpgradeCard
                            key={upgrade.upgradeKey}
                            upgradeState={upgrade}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
}
