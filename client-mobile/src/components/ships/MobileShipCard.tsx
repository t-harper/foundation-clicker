import React, { useState, useEffect, useCallback } from 'react';
import type { ShipState } from '@foundation/shared';
import { SHIP_DEFINITIONS, TRADE_ROUTE_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '@desktop/store';
import { sendShip, recallShip } from '@desktop/api';
import { SHIP_ART_MAP } from '@desktop/assets/svg/ships';
import { formatDuration } from '@desktop/utils/format';
import { Button } from '@desktop/components/common';

interface MobileShipCardProps {
  ship: ShipState;
}

const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  docked: { text: 'text-green-400', bg: 'bg-green-400/10' },
  trading: { text: 'text-blue-400', bg: 'bg-blue-400/10' },
  exploring: { text: 'text-purple-400', bg: 'bg-purple-400/10' },
  returning: { text: 'text-amber-400', bg: 'bg-amber-400/10' },
};

export function MobileShipCard({ ship }: MobileShipCardProps) {
  const shipDef = SHIP_DEFINITIONS[ship.shipType];
  const tradeRoutes = useGameStore((s) => s.tradeRoutes);
  const updateShip = useGameStore((s) => s.updateShip);
  const addNotification = useGameStore((s) => s.addNotification);

  const [selectedRoute, setSelectedRoute] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const ArtComponent = SHIP_ART_MAP[ship.shipType];
  const statusStyle = STATUS_COLORS[ship.status] ?? { text: 'text-[var(--era-text)]/50', bg: '' };

  // Countdown timer for ships on active routes
  useEffect(() => {
    if (!ship.returnsAt) {
      setTimeRemaining(0);
      return;
    }

    const update = () => {
      const remaining = Math.max(0, Math.floor((ship.returnsAt! - Date.now()) / 1000));
      setTimeRemaining(remaining);
    };
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [ship.returnsAt]);

  const activeRouteDef = ship.tradeRouteId
    ? TRADE_ROUTE_DEFINITIONS[ship.tradeRouteId]
    : null;

  // Available trade routes for this ship type
  const availableRoutes = tradeRoutes.filter((r) => {
    if (!r.isUnlocked) return false;
    const routeDef = TRADE_ROUTE_DEFINITIONS[r.routeKey];
    if (!routeDef) return false;
    return routeDef.requiredShipType === ship.shipType;
  });

  const handleSend = useCallback(async () => {
    if (!selectedRoute || loading) return;
    setLoading(true);
    try {
      const updatedShip = await sendShip(ship.id, selectedRoute);
      updateShip(updatedShip);
      setSelectedRoute('');
      const routeDef = TRADE_ROUTE_DEFINITIONS[selectedRoute];
      addNotification({
        message: `${ship.name} sent on ${routeDef?.name ?? selectedRoute}`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send ship';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [selectedRoute, loading, ship.id, ship.name, updateShip, addNotification]);

  const handleRecall = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const updatedShip = await recallShip(ship.id);
      updateShip(updatedShip);
      addNotification({
        message: `${ship.name} recalled to dock`,
        type: 'info',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to recall ship';
      addNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [loading, ship.id, ship.name, updateShip, addNotification]);

  // Progress fraction for active route
  const routeProgress =
    ship.status === 'trading' && ship.departedAt && ship.returnsAt
      ? Math.min(1, Math.max(0, 1 - (ship.returnsAt - Date.now()) / (ship.returnsAt - ship.departedAt)))
      : 0;

  return (
    <div className="w-full rounded-lg border border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30 overflow-hidden">
      {/* Top row: art, name, status */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-[var(--era-bg)]/60 border border-[var(--era-primary)]/10">
          <ArtComponent size={36} className="text-[var(--era-primary)]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-[var(--era-text)] truncate">
              {ship.name}
            </h4>
            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusStyle.text} ${statusStyle.bg}`}>
              {ship.status}
            </span>
          </div>
          <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5">
            {shipDef.name}
          </p>
        </div>
      </div>

      {/* Active route info with countdown and progress bar */}
      {ship.status === 'trading' && activeRouteDef && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[var(--era-text)]/60">
              Route: <span className="text-[var(--era-accent)]">{activeRouteDef.name}</span>
            </span>
            <span className="text-[var(--era-primary)] font-semibold tabular-nums">
              {formatDuration(timeRemaining)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-[var(--era-bg)]/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--era-accent)] transition-all duration-1000"
              style={{ width: `${routeProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Docked: route selector and send button */}
      {ship.status === 'docked' && availableRoutes.length > 0 && (
        <div className="flex items-center gap-2 px-4 pb-3">
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="flex-1 h-10 px-3 text-xs bg-[var(--era-bg)] border border-[var(--era-primary)]/30 rounded-md text-[var(--era-text)] focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)] touch-action-manipulation"
          >
            <option value="">Select route...</option>
            {availableRoutes.map((route) => {
              const routeDef = TRADE_ROUTE_DEFINITIONS[route.routeKey];
              return (
                <option key={route.routeKey} value={route.routeKey}>
                  {routeDef?.name ?? route.routeKey} ({formatDuration(routeDef?.duration ?? 0)})
                </option>
              );
            })}
          </select>
          <Button
            variant="primary"
            size="sm"
            disabled={!selectedRoute}
            loading={loading}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      )}

      {/* Trading/exploring: recall button */}
      {(ship.status === 'trading' || ship.status === 'exploring') && (
        <div className="px-4 pb-3">
          <button
            type="button"
            disabled={loading}
            onClick={handleRecall}
            className="w-full h-10 rounded-md text-xs font-medium border border-[var(--era-primary)]/30 bg-[var(--era-surface)]/50 text-[var(--era-text)]/70 active:bg-[var(--era-surface)] disabled:opacity-40 transition-colors touch-action-manipulation"
          >
            {loading ? 'Recalling...' : 'Recall Ship'}
          </button>
        </div>
      )}
    </div>
  );
}
