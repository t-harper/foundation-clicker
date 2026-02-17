import React, { useState, useCallback, useMemo } from 'react';
import { useGameStore } from '@desktop/store';
import type { ShipType, ResourceKey } from '@foundation/shared';
import { SHIP_DEFINITIONS, ALL_SHIP_TYPES } from '@foundation/shared';
import { buildShip } from '@desktop/api';
import { formatNumber, formatDuration } from '@desktop/utils/format';
import { MobileShipCard } from './MobileShipCard';
import { MobileTradeRouteManager } from './MobileTradeRouteManager';

type AccordionSection = 'builder' | 'fleet' | 'routes';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 text-[var(--era-text)]/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function MobileShipPanel() {
  const ships = useGameStore((s) => s.ships);
  const resources = useGameStore((s) => s.resources);
  const currentEra = useGameStore((s) => s.currentEra);
  const addShip = useGameStore((s) => s.addShip);
  const setResources = useGameStore((s) => s.setResources);
  const addNotification = useGameStore((s) => s.addNotification);

  const [selectedType, setSelectedType] = useState<ShipType>('freeTrader');
  const [shipName, setShipName] = useState('');
  const [building, setBuilding] = useState(false);
  const [openSections, setOpenSections] = useState<Set<AccordionSection>>(
    new Set(['builder', 'fleet']),
  );

  const toggleSection = useCallback((section: AccordionSection) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  }, []);

  const availableShipTypes = useMemo(
    () => ALL_SHIP_TYPES.filter((type) => SHIP_DEFINITIONS[type].era <= currentEra),
    [currentEra],
  );

  const selectedDef = SHIP_DEFINITIONS[selectedType];

  const canAffordShip = useMemo(() => {
    return Object.entries(selectedDef.buildCost).every(
      ([key, cost]) => cost !== undefined && (resources[key as ResourceKey] ?? 0) >= cost,
    );
  }, [selectedDef, resources]);

  const dockedShips = useMemo(
    () => ships.filter((s) => s.status === 'docked'),
    [ships],
  );
  const activeShips = useMemo(
    () => ships.filter((s) => s.status !== 'docked'),
    [ships],
  );

  const handleBuild = useCallback(async () => {
    if (!canAffordShip || building) return;
    setBuilding(true);
    try {
      const newShip = await buildShip(selectedType, shipName.trim());
      addShip(newShip);
      // Deduct cost locally
      const newResources = { ...resources };
      for (const [key, cost] of Object.entries(selectedDef.buildCost)) {
        if (cost !== undefined) {
          newResources[key as ResourceKey] = (newResources[key as ResourceKey] ?? 0) - cost;
        }
      }
      setResources(newResources);
      addNotification({
        message: `Built ${selectedDef.name}: ${newShip.name}`,
        type: 'success',
      });
      setShipName('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to build ship';
      addNotification({ message, type: 'error' });
    } finally {
      setBuilding(false);
    }
  }, [
    canAffordShip,
    building,
    shipName,
    selectedType,
    selectedDef,
    resources,
    addShip,
    setResources,
    addNotification,
  ]);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
          Fleet Management
        </h2>
        <p className="text-xs text-[var(--era-text)]/50 mt-0.5">
          Build ships and send them on trade routes.
        </p>
      </div>

      {/* Fleet overview stats */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-none">
        <div className="shrink-0 flex-1 px-3 py-2 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
            Total
          </span>
          <span className="text-lg font-bold text-[var(--era-primary)] tabular-nums">
            {ships.length}
          </span>
        </div>
        <div className="shrink-0 flex-1 px-3 py-2 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
            Docked
          </span>
          <span className="text-lg font-bold text-green-400 tabular-nums">
            {dockedShips.length}
          </span>
        </div>
        <div className="shrink-0 flex-1 px-3 py-2 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
            On Routes
          </span>
          <span className="text-lg font-bold text-blue-400 tabular-nums">
            {activeShips.length}
          </span>
        </div>
      </div>

      {/* Accordion: Ship Builder */}
      <div className="border-t border-[var(--era-surface)]">
        <button
          type="button"
          onClick={() => toggleSection('builder')}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--era-surface)]/20 transition-colors touch-action-manipulation"
        >
          <span className="text-sm font-display font-semibold text-[var(--era-primary)]">
            Ship Builder
          </span>
          <ChevronIcon open={openSections.has('builder')} />
        </button>

        {openSections.has('builder') && (
          <div className="px-4 pb-4">
            {availableShipTypes.length === 0 ? (
              <p className="text-xs text-[var(--era-text)]/40 py-2">
                Reach the Trading Expansion era to build ships.
              </p>
            ) : (
              <div className="space-y-3">
                {/* Ship type selection - horizontal scroll */}
                <div>
                  <label className="block text-[11px] text-[var(--era-text)]/50 mb-1.5">
                    Ship Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableShipTypes.map((type) => {
                      const def = SHIP_DEFINITIONS[type];
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={[
                            'px-3 py-2 rounded-md text-xs font-medium border transition-colors touch-action-manipulation',
                            isSelected
                              ? 'bg-[var(--era-accent)]/15 border-[var(--era-accent)] text-[var(--era-accent)]'
                              : 'bg-[var(--era-surface)]/50 border-[var(--era-primary)]/20 text-[var(--era-text)]/60 active:text-[var(--era-text)] active:bg-[var(--era-surface)]',
                          ].join(' ')}
                        >
                          {def.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected ship details */}
                <div className="p-3 rounded-md bg-[var(--era-bg)]/50 border border-[var(--era-primary)]/10 text-xs space-y-1.5">
                  <p className="text-[var(--era-text)]/60 leading-relaxed">
                    {selectedDef.description}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[var(--era-text)]/40">
                    <span>
                      Build Time: <span className="text-[var(--era-primary)]">{formatDuration(selectedDef.buildTime)}</span>
                    </span>
                    <span>
                      Cargo: <span className="text-[var(--era-primary)]">{selectedDef.cargoCapacity}</span>
                    </span>
                    <span>
                      Speed: <span className="text-[var(--era-primary)]">{selectedDef.speed}x</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                    <span className="text-[var(--era-text)]/40">Cost:</span>
                    {Object.entries(selectedDef.buildCost).map(([key, cost]) => {
                      const hasEnough = (resources[key as ResourceKey] ?? 0) >= (cost ?? 0);
                      return (
                        <span
                          key={key}
                          className={`tabular-nums ${hasEnough ? 'text-[var(--era-text)]/60' : 'text-red-400'}`}
                        >
                          {formatNumber(cost ?? 0, 'short')} {key}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Name input */}
                <input
                  type="text"
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value)}
                  placeholder="Name your ship (optional)..."
                  maxLength={30}
                  className="w-full h-12 px-3 text-sm bg-[var(--era-bg)] border border-[var(--era-primary)]/30 rounded-md text-[var(--era-text)] placeholder-[var(--era-text)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]"
                />

                {/* Build button */}
                <button
                  type="button"
                  disabled={!canAffordShip || building}
                  onClick={handleBuild}
                  className="w-full h-12 rounded-md text-sm font-semibold bg-[var(--era-accent)]/15 border border-[var(--era-accent)]/40 text-[var(--era-accent)] active:bg-[var(--era-accent)]/25 disabled:opacity-40 disabled:active:bg-[var(--era-accent)]/15 transition-colors touch-action-manipulation"
                >
                  {building ? 'Building...' : 'Build Ship'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accordion: Fleet */}
      <div className="border-t border-[var(--era-surface)]">
        <button
          type="button"
          onClick={() => toggleSection('fleet')}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--era-surface)]/20 transition-colors touch-action-manipulation"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-display font-semibold text-[var(--era-primary)]">
              Your Fleet
            </span>
            {ships.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--era-accent)]/15 text-[var(--era-accent)]">
                {ships.length}
              </span>
            )}
          </div>
          <ChevronIcon open={openSections.has('fleet')} />
        </button>

        {openSections.has('fleet') && (
          <div className="px-4 pb-4">
            {ships.length === 0 ? (
              <p className="text-xs text-[var(--era-text)]/40 py-2">
                No ships built yet. Use the Ship Builder above to construct your first vessel.
              </p>
            ) : (
              <div className="space-y-3">
                {ships.map((ship) => (
                  <MobileShipCard key={ship.id} ship={ship} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accordion: Trade Routes */}
      <div className="border-t border-[var(--era-surface)]">
        <button
          type="button"
          onClick={() => toggleSection('routes')}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--era-surface)]/20 transition-colors touch-action-manipulation"
        >
          <span className="text-sm font-display font-semibold text-[var(--era-primary)]">
            Trade Routes
          </span>
          <ChevronIcon open={openSections.has('routes')} />
        </button>

        {openSections.has('routes') && (
          <div className="px-4 pb-4">
            <MobileTradeRouteManager />
          </div>
        )}
      </div>
    </div>
  );
}
