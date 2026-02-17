import React, { useMemo, useState, useCallback } from 'react';
import type { ResourceKey } from '@foundation/shared';
import {
  BUILDING_DEFINITIONS,
  ERA_DEFINITIONS,
  Era,
  ALL_BUILDING_KEYS,
} from '@foundation/shared';
import type { BuildingState } from '@foundation/shared';
import {
  useGameStore,
  selectBestCreditROIBuilding,
  selectClickValue,
  selectClickResourceYields,
} from '@desktop/store';
import { click } from '@desktop/api';
import { ClickIcon } from '@desktop/assets/svg/icons';
import { formatNumber } from '@desktop/utils/format';
import { useShallow } from 'zustand/react/shallow';
import { MobileBuyBar } from './MobileBuyBar';
import { MobileBuildingCard } from './MobileBuildingCard';

interface EraGroup {
  era: Era;
  name: string;
  buildings: BuildingState[];
}

function InlineClickSection() {
  const addClick = useGameStore((s) => s.addClick);
  const setResources = useGameStore((s) => s.setResources);
  const clickValue = useGameStore(selectClickValue);
  const bonusYields = useGameStore(useShallow(selectClickResourceYields));
  const addNotification = useGameStore((s) => s.addNotification);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = useCallback(async () => {
    const hasBonusYields = Object.keys(bonusYields).length > 0;
    addClick(clickValue, hasBonusYields ? bonusYields : undefined);

    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 150);

    try {
      const result = await click(1);
      const currentResources = { ...useGameStore.getState().resources };
      currentResources.credits = result.newCredits;
      if (result.bonusResources) {
        for (const [resource, amount] of Object.entries(result.bonusResources)) {
          if (amount !== undefined) {
            currentResources[resource as ResourceKey] = Math.max(
              currentResources[resource as ResourceKey],
              amount,
            );
          }
        }
      }
      setResources(currentResources);
    } catch {
      addNotification({
        message: 'Click sync failed.',
        type: 'warning',
      });
    }
  }, [addClick, clickValue, bonusYields, setResources, addNotification]);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15">
      <button
        type="button"
        onClick={handleClick}
        className={[
          'shrink-0 w-[80px] h-[80px] rounded-full',
          'bg-gradient-to-br from-[var(--era-accent)] via-[var(--era-primary)] to-[var(--era-accent)]',
          'border-3 border-[var(--era-accent)]/60',
          'shadow-[0_0_10px_color-mix(in_srgb,var(--era-accent)_25%,transparent)]',
          'flex items-center justify-center',
          'touch-action-manipulation select-none',
          'active:scale-90 transition-transform duration-150',
          isPulsing ? 'scale-90' : 'scale-100',
        ].join(' ')}
        aria-label={`Tap to earn ${formatNumber(clickValue, 'short')} credits`}
      >
        <div className="flex flex-col items-center gap-0.5">
          <ClickIcon className="w-6 h-6 text-[var(--era-bg)]" />
          <span className="text-xs font-bold text-[var(--era-bg)] tabular-nums leading-none">
            +{formatNumber(clickValue, 'short')}
          </span>
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-display font-semibold text-[var(--era-primary)]">
          The Vault
        </p>
        <p className="text-[10px] text-[var(--era-text)]/50 mt-0.5">
          Tap to generate credits
        </p>
        <p className="text-xs text-[var(--era-accent)] font-semibold mt-1">
          +{formatNumber(clickValue, 'short')} credits/tap
        </p>
      </div>
    </div>
  );
}

export function MobileBuildingPanel() {
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
      (key) => BUILDING_DEFINITIONS[key].era === currentEra,
    );
    return eraBuildingKeys.every((key) => {
      const state = buildings.find((b) => b.buildingKey === key);
      return state?.isUnlocked === true;
    });
  }, [buildings, currentEra]);

  return (
    <div className="flex flex-col gap-4">
      {/* Sticky buy amount bar */}
      <MobileBuyBar />

      {/* Inline click section */}
      <InlineClickSection />

      {/* Prestige banner */}
      {allCurrentEraUnlocked && (
        <div className="rounded-lg border border-[var(--era-primary)]/30 bg-[var(--era-primary)]/10 p-3">
          <p className="text-xs text-[var(--era-text)]">
            All <strong>{ERA_DEFINITIONS[currentEra].name}</strong> buildings unlocked!
            Trigger a Seldon Crisis to advance to{' '}
            <strong>{ERA_DEFINITIONS[(currentEra + 1) as Era].name}</strong>.
          </p>
          <button
            type="button"
            className="mt-2 text-xs font-medium text-[var(--era-primary)] active:opacity-70 touch-action-manipulation"
            onClick={() => setActiveTab('prestige')}
          >
            Go to Prestige
          </button>
        </div>
      )}

      {/* Era groups */}
      {eraGroups.length === 0 ? (
        <div className="text-center py-12 text-[var(--era-text)]/40">
          <p className="text-base">No buildings available yet.</p>
          <p className="text-xs mt-2">Start tapping the Vault to earn credits!</p>
        </div>
      ) : (
        eraGroups.map((group) => {
          const eraDef = ERA_DEFINITIONS[group.era];
          return (
            <section key={group.era}>
              {/* Era header */}
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: eraDef.themeColors.primary }}
                >
                  Era {group.era}: {group.name}
                </h3>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: `${eraDef.themeColors.primary}30` }}
                />
              </div>

              {/* Building cards */}
              <div className="flex flex-col gap-3">
                {group.buildings.map((building) => (
                  <MobileBuildingCard
                    key={building.buildingKey}
                    buildingState={building}
                    isBestROI={building.buildingKey === bestValueKey}
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
