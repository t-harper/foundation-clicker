import React, { useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../../store';
import type { ShipType, ResourceKey } from '@foundation/shared';
import { SHIP_DEFINITIONS, ALL_SHIP_TYPES } from '@foundation/shared';
import { buildShip } from '../../api';
import { Button } from '../common';
import { formatNumber, formatDuration } from '../../utils/format';
import { ShipCard } from './ShipCard';
import { TradeRouteManager } from './TradeRouteManager';

export function ShipPanel() {
  const ships = useGameStore((s) => s.ships);
  const resources = useGameStore((s) => s.resources);
  const currentEra = useGameStore((s) => s.currentEra);
  const addShip = useGameStore((s) => s.addShip);
  const setResources = useGameStore((s) => s.setResources);
  const addNotification = useGameStore((s) => s.addNotification);

  const [selectedType, setSelectedType] = useState<ShipType>('freeTrader');
  const [shipName, setShipName] = useState('');
  const [building, setBuilding] = useState(false);

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Fleet Management
        </h2>
        <p className="text-sm text-[var(--era-text)]/50 mt-1">
          Build ships and send them on trade routes to earn resources.
        </p>
      </div>

      {/* Fleet overview */}
      <div className="flex gap-4">
        <div className="px-4 py-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15">
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block">
            Total Ships
          </span>
          <span className="text-2xl font-bold text-[var(--era-primary)] tabular-nums">
            {ships.length}
          </span>
        </div>
        <div className="px-4 py-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15">
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block">
            Docked
          </span>
          <span className="text-2xl font-bold text-green-400 tabular-nums">
            {dockedShips.length}
          </span>
        </div>
        <div className="px-4 py-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15">
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block">
            On Routes
          </span>
          <span className="text-2xl font-bold text-blue-400 tabular-nums">
            {activeShips.length}
          </span>
        </div>
      </div>

      {/* Ship builder */}
      <div className="p-5 rounded-lg border border-[var(--era-primary)]/20 bg-[var(--era-surface)]/20">
        <h3 className="text-lg font-display font-semibold text-[var(--era-primary)] mb-4">
          Ship Builder
        </h3>

        {availableShipTypes.length === 0 ? (
          <p className="text-sm text-[var(--era-text)]/40">
            Reach the Trading Expansion era to build ships.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Ship type selection */}
            <div>
              <label className="block text-xs text-[var(--era-text)]/50 mb-1.5">
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
                        'px-3 py-2 rounded-md text-xs font-medium transition-all border',
                        'focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]',
                        isSelected
                          ? 'bg-[var(--era-accent)]/15 border-[var(--era-accent)] text-[var(--era-accent)]'
                          : 'bg-[var(--era-surface)]/50 border-[var(--era-primary)]/20 text-[var(--era-text)]/60 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)]',
                      ].join(' ')}
                    >
                      {def.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected ship details */}
            <div className="p-3 rounded-md bg-[var(--era-bg)]/50 border border-[var(--era-primary)]/10 text-xs space-y-1">
              <p className="text-[var(--era-text)]/60">{selectedDef.description}</p>
              <p className="text-[var(--era-text)]/40">
                Build Time: <span className="text-[var(--era-primary)]">{formatDuration(selectedDef.buildTime)}</span>
                {' | '}
                Cargo: <span className="text-[var(--era-primary)]">{selectedDef.cargoCapacity}</span>
                {' | '}
                Speed: <span className="text-[var(--era-primary)]">{selectedDef.speed}x</span>
              </p>
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

            {/* Name input and build button */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={shipName}
                onChange={(e) => setShipName(e.target.value)}
                placeholder="Name your ship (optional)..."
                maxLength={30}
                className="flex-1 px-3 py-2 text-sm bg-[var(--era-bg)] border border-[var(--era-primary)]/30 rounded-md text-[var(--era-text)] placeholder-[var(--era-text)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]"
              />
              <Button
                variant="primary"
                size="md"
                disabled={!canAffordShip}
                loading={building}
                onClick={handleBuild}
              >
                Build Ship
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Ship list */}
      {ships.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-display font-semibold text-[var(--era-primary)]">
            Your Fleet
          </h3>
          <div className="grid gap-3">
            {ships.map((ship) => (
              <ShipCard key={ship.id} ship={ship} />
            ))}
          </div>
        </div>
      )}

      {/* Trade routes */}
      <TradeRouteManager />
    </div>
  );
}
