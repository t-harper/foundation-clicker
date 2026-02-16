import React, { useMemo } from 'react';
import { useGameStore, selectBestCreditROIUpgrade } from '../../store';
import { UPGRADE_DEFINITIONS, ERA_DEFINITIONS, Era } from '@foundation/shared';
import type { UpgradeState } from '@foundation/shared';
import { UpgradeCard } from './UpgradeCard';

interface EraUpgradeGroup {
  era: Era;
  name: string;
  available: UpgradeState[];
  purchased: UpgradeState[];
}

export function UpgradePanel() {
  const upgrades = useGameStore((s) => s.upgrades);
  const currentEra = useGameStore((s) => s.currentEra);
  const bestValueKey = useGameStore(selectBestCreditROIUpgrade);


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

      {/* Era groups */}
      {eraGroups.length === 0 ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="text-lg">No upgrades available yet.</p>
          <p className="text-sm mt-2">Build more to unlock upgrades!</p>
        </div>
      ) : (
        eraGroups.map((group) => {
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
                {/* Available upgrades first */}
                {group.available.map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.upgradeKey}
                    upgradeState={upgrade}
                    isBestValue={upgrade.upgradeKey === bestValueKey}
                  />
                ))}
                {/* Then purchased upgrades */}
                {group.purchased.map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.upgradeKey}
                    upgradeState={upgrade}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
