import React, { useState, useCallback } from 'react';
import { useGameStore } from '../../store';
import type { ResourceKey } from '@foundation/shared';
import { TRADE_ROUTE_DEFINITIONS, SHIP_DEFINITIONS, ERA_DEFINITIONS } from '@foundation/shared';
import { unlockTradeRoute, sendShip } from '../../api';
import { Button, Tooltip } from '../common';
import { formatNumber, formatDuration, formatResource } from '../../utils/format';

export function TradeRouteManager() {
  const tradeRoutes = useGameStore((s) => s.tradeRoutes);
  const ships = useGameStore((s) => s.ships);
  const resources = useGameStore((s) => s.resources);
  const setResources = useGameStore((s) => s.setResources);
  const unlockTradeRouteStore = useGameStore((s) => s.unlockTradeRoute);
  const updateShip = useGameStore((s) => s.updateShip);
  const addNotification = useGameStore((s) => s.addNotification);

  const [loadingRoutes, setLoadingRoutes] = useState<Set<string>>(new Set());
  const [sendingShips, setSendingShips] = useState<Record<string, string>>({});

  const handleUnlock = useCallback(
    async (routeKey: string) => {
      setLoadingRoutes((prev) => new Set([...prev, routeKey]));
      try {
        await unlockTradeRoute(routeKey);
        unlockTradeRouteStore(routeKey);
        const routeDef = TRADE_ROUTE_DEFINITIONS[routeKey];
        // Deduct cost from local resources
        if (routeDef) {
          const newResources = { ...resources };
          for (const [key, cost] of Object.entries(routeDef.unlockCost)) {
            if (cost !== undefined) {
              newResources[key as ResourceKey] = (newResources[key as ResourceKey] ?? 0) - cost;
            }
          }
          setResources(newResources);
        }
        addNotification({
          message: `Unlocked trade route: ${routeDef?.name ?? routeKey}`,
          type: 'success',
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to unlock route';
        addNotification({ message, type: 'error' });
      } finally {
        setLoadingRoutes((prev) => {
          const next = new Set(prev);
          next.delete(routeKey);
          return next;
        });
      }
    },
    [resources, setResources, unlockTradeRouteStore, addNotification],
  );

  const handleSendShip = useCallback(
    async (routeKey: string) => {
      const shipId = sendingShips[routeKey];
      if (!shipId) return;

      setLoadingRoutes((prev) => new Set([...prev, routeKey]));
      try {
        const updatedShip = await sendShip(shipId, routeKey);
        updateShip(updatedShip);
        setSendingShips((prev) => {
          const next = { ...prev };
          delete next[routeKey];
          return next;
        });
        const routeDef = TRADE_ROUTE_DEFINITIONS[routeKey];
        addNotification({
          message: `Ship sent on ${routeDef?.name ?? routeKey}`,
          type: 'success',
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send ship';
        addNotification({ message, type: 'error' });
      } finally {
        setLoadingRoutes((prev) => {
          const next = new Set(prev);
          next.delete(routeKey);
          return next;
        });
      }
    },
    [sendingShips, updateShip, addNotification],
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display font-semibold text-[var(--era-primary)]">
        Trade Routes
      </h3>

      {tradeRoutes.length === 0 ? (
        <p className="text-sm text-[var(--era-text)]/40">
          No trade routes discovered yet. Reach the Trading Expansion era to unlock routes.
        </p>
      ) : (
        <div className="grid gap-3">
          {tradeRoutes.map((route) => {
            const def = TRADE_ROUTE_DEFINITIONS[route.routeKey];
            if (!def) return null;

            const eraDef = ERA_DEFINITIONS[def.era];
            const isLoading = loadingRoutes.has(route.routeKey);

            // Check if unlock cost is affordable
            const canAffordUnlock = Object.entries(def.unlockCost).every(
              ([key, cost]) => cost !== undefined && (resources[key as ResourceKey] ?? 0) >= cost,
            );

            // Get docked ships of the required type
            const dockedShips = ships.filter(
              (s) => s.status === 'docked' && s.shipType === def.requiredShipType,
            );

            const requiredShipDef = SHIP_DEFINITIONS[def.requiredShipType];

            return (
              <div
                key={route.routeKey}
                className={[
                  'p-4 rounded-lg border transition-colors',
                  route.isUnlocked
                    ? 'border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30'
                    : 'border-[var(--era-primary)]/10 bg-[var(--era-surface)]/15',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[var(--era-text)]">
                        {def.name}
                      </h4>
                      {route.isUnlocked ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-500/15 text-green-400">
                          Unlocked
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-500/15 text-red-400">
                          Locked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--era-text)]/50 mt-1">
                      {def.description}
                    </p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                    style={{
                      color: eraDef.themeColors.primary,
                      backgroundColor: `${eraDef.themeColors.primary}15`,
                    }}
                  >
                    Era {def.era}
                  </span>
                </div>

                {/* Duration and rewards */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs">
                  <span className="text-[var(--era-text)]/50">
                    Duration: <span className="text-[var(--era-primary)]">{formatDuration(def.duration)}</span>
                  </span>
                  <span className="text-[var(--era-text)]/50">
                    Ship: <span className="text-[var(--era-primary)]">{requiredShipDef.name}</span>
                  </span>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                  {Object.entries(def.reward).map(([key, amount]) =>
                    amount ? (
                      <span key={key} className="text-[11px] text-[var(--era-accent)]">
                        +{formatResource(amount)} {key}
                      </span>
                    ) : null,
                  )}
                </div>

                {/* Unlock button or send ship */}
                {!route.isUnlocked ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      {Object.entries(def.unlockCost).map(([key, val]) => {
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
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!canAffordUnlock}
                      loading={isLoading}
                      onClick={() => handleUnlock(route.routeKey)}
                    >
                      Unlock
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <select
                      value={sendingShips[route.routeKey] ?? ''}
                      onChange={(e) =>
                        setSendingShips((prev) => ({
                          ...prev,
                          [route.routeKey]: e.target.value,
                        }))
                      }
                      className="flex-1 px-2 py-1.5 text-xs bg-[var(--era-bg)] border border-[var(--era-primary)]/30 rounded-md text-[var(--era-text)] focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]"
                    >
                      <option value="">
                        {dockedShips.length === 0
                          ? `No docked ${requiredShipDef.name}s`
                          : 'Select a ship...'}
                      </option>
                      {dockedShips.map((ship) => (
                        <option key={ship.id} value={ship.id}>
                          {ship.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!sendingShips[route.routeKey]}
                      loading={isLoading}
                      onClick={() => handleSendShip(route.routeKey)}
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
