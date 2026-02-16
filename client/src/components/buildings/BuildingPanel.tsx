import React, { useMemo } from 'react';
import { useGameStore, selectBestCreditROIBuilding } from '../../store';
import { BUILDING_DEFINITIONS, ERA_DEFINITIONS, Era, ALL_BUILDING_KEYS } from '@foundation/shared';
import type { BuildingState } from '@foundation/shared';
import { BuyAmountSelector } from './BuyAmountSelector';
import { BuildingCard } from './BuildingCard';

interface EraGroup {
  era: Era;
  name: string;
  buildings: BuildingState[];
}

export function BuildingPanel() {
  const buildings = useGameStore((s) => s.buildings);
  const currentEra = useGameStore((s) => s.currentEra);
  const setActiveTab = useGameStore((s) => s.setActiveTab);
  const bestValueKey = useGameStore(selectBestCreditROIBuilding);

  const eraGroups = useMemo<EraGroup[]>(() => {
    const groups = new Map<Era, BuildingState[]>();

    for (const building of buildings) {
      const def = BUILDING_DEFINITIONS[building.buildingKey];
      if (!def) continue;
      if (!building.isUnlocked) continue;

      const era = def.era;
      if (!groups.has(era)) {
        groups.set(era, []);
      }
      groups.get(era)!.push(building);
    }

    const result: EraGroup[] = [];
    for (let e = 0 as Era; e <= currentEra; e = (e + 1) as Era) {
      const eraDef = ERA_DEFINITIONS[e];
      const eraBuildings = groups.get(e) ?? [];
      if (eraBuildings.length > 0) {
        result.push({
          era: e,
          name: eraDef.name,
          buildings: eraBuildings,
        });
      }
    }

    return result;
  }, [buildings, currentEra]);

  const allCurrentEraUnlocked = useMemo(() => {
    if (currentEra >= Era.GalacticReunification) return false;
    const eraBuildingKeys = ALL_BUILDING_KEYS.filter(
      (key) => BUILDING_DEFINITIONS[key].era === currentEra
    );
    return eraBuildingKeys.every((key) => {
      const state = buildings.find((b) => b.buildingKey === key);
      return state?.isUnlocked === true;
    });
  }, [buildings, currentEra]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Buildings
        </h2>
        <BuyAmountSelector />
      </div>

      {/* Prestige banner */}
      {allCurrentEraUnlocked && (
        <div className="rounded-lg border border-[var(--era-primary)]/30 bg-[var(--era-primary)]/10 p-4">
          <p className="text-sm text-[var(--era-text)]">
            All <strong>{ERA_DEFINITIONS[currentEra].name}</strong> buildings unlocked!
            Trigger a Seldon Crisis to advance to{' '}
            <strong>{ERA_DEFINITIONS[(currentEra + 1) as Era].name}</strong> and unlock new
            buildings.
          </p>
          <button
            className="mt-2 text-sm font-medium text-[var(--era-primary)] hover:underline"
            onClick={() => setActiveTab('prestige')}
          >
            Go to Prestige
          </button>
        </div>
      )}

      {/* Era groups */}
      {eraGroups.length === 0 ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="text-lg">No buildings available yet.</p>
          <p className="text-sm mt-2">Start clicking the Vault to earn credits!</p>
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
                {group.buildings.map((building) => (
                  <BuildingCard
                    key={building.buildingKey}
                    buildingState={building}
                    isBestValue={building.buildingKey === bestValueKey}
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
