import React, { useState, useEffect, useCallback } from 'react';
import type { ShipState, ShipType, TradeRouteState } from '@foundation/shared';
import { SHIP_DEFINITIONS, TRADE_ROUTE_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '../../store';
import { sendShip, recallShip } from '../../api';
import { Button } from '../common';
import { SHIP_ART_MAP } from '../../assets/svg/ships';
import { formatDuration } from '../../utils/format';

interface ShipCardProps {
  ship: ShipState;
}

const STATUS_COLORS: Record<string, string> = {
  docked: 'text-green-400 bg-green-400/10',
  trading: 'text-blue-400 bg-blue-400/10',
  exploring: 'text-purple-400 bg-purple-400/10',
  returning: 'text-amber-400 bg-amber-400/10',
};

export function ShipCard({ ship }: ShipCardProps) {
  const shipDef = SHIP_DEFINITIONS[ship.shipType];
  const tradeRoutes = useGameStore((s) => s.tradeRoutes);
  const updateShip = useGameStore((s) => s.updateShip);
  const addNotification = useGameStore((s) => s.addNotification);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const ArtComponent = SHIP_ART_MAP[ship.shipType];

  // Countdown timer for ships on routes
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

  // Get the route this ship is on
  const activeRouteDef = ship.tradeRouteId
    ? TRADE_ROUTE_DEFINITIONS[ship.tradeRouteId]
    : null;

  // Available trade routes for sending
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

  return (
    <div className="holo-card neon-border-hover flex items-start gap-4 p-4 rounded-lg border border-[var(--era-primary)]/20 bg-[var(--era-surface)]/30">
      {/* Ship art */}
      <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-md bg-[var(--era-bg)]/60 border border-[var(--era-primary)]/10">
        <ArtComponent size={40} className="text-[var(--era-primary)]" />
      </div>

      {/* Ship info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-[var(--era-text)] truncate">
            {ship.name}
          </h3>
          <span className="text-[11px] text-[var(--era-text)]/50">
            ({shipDef.name})
          </span>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${STATUS_COLORS[ship.status] ?? 'text-[var(--era-text)]/50'}`}
          >
            {ship.status}
          </span>
        </div>

        {/* Active route info */}
        {ship.status === 'trading' && activeRouteDef && (
          <div className="mb-2">
            <p className="text-xs text-[var(--era-text)]/60">
              Route: <span className="text-[var(--era-accent)]">{activeRouteDef.name}</span>
            </p>
            <p className="text-xs text-[var(--era-text)]/50 tabular-nums">
              Returns in: <span className="text-[var(--era-primary)] font-semibold">{formatDuration(timeRemaining)}</span>
            </p>
          </div>
        )}

        {/* Docked: send on route */}
        {ship.status === 'docked' && (
          <div className="flex items-center gap-2 mt-2">
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs bg-[var(--era-bg)] border border-[var(--era-primary)]/30 rounded-md text-[var(--era-text)] focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]"
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

        {/* Trading: recall button */}
        {(ship.status === 'trading' || ship.status === 'exploring') && (
          <Button
            variant="secondary"
            size="sm"
            loading={loading}
            onClick={handleRecall}
            className="mt-2"
          >
            Recall Ship
          </Button>
        )}
      </div>
    </div>
  );
}
