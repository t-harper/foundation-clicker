import { useEffect, useRef, useState } from 'react';
import { tick, processTradeShips } from '@foundation/shared';
import { useGameStore, selectGameState } from '../store/index.js';

/**
 * Main game loop hook using requestAnimationFrame.
 * Calculates delta time each frame, runs the shared tick() engine,
 * and updates store resources + play time.
 */
export function useGameEngine(): { isRunning: boolean } {
  const [isRunning, setIsRunning] = useState(false);
  const lastTimestampRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const collectedShipIds = useRef<Set<string>>(new Set());
  const isLoaded = useGameStore((s) => s.isLoaded);

  useEffect(() => {
    if (!isLoaded) return;

    const loop = (timestamp: number) => {
      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
        setIsRunning(true);
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const deltaMs = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      const deltaSeconds = deltaMs / 1000;

      // Read fresh state inside the callback to avoid stale closures
      const state = useGameStore.getState();
      const gameState = selectGameState(state);

      let newResources = tick(gameState, deltaSeconds);

      // Process completed trade ships (optimistic client-side docking + rewards)
      const tradeResult = processTradeShips({ ...gameState, resources: newResources }, Date.now());
      if (tradeResult.anyChanged) {
        // Only apply rewards for ships we haven't already collected locally
        const newlyCollected = tradeResult.updatedShips.filter(
          (s, i) => gameState.ships[i]?.status === 'trading' && s.status === 'docked' && !collectedShipIds.current.has(s.id)
        );
        if (newlyCollected.length > 0) {
          for (const ship of newlyCollected) {
            collectedShipIds.current.add(ship.id);
          }
          newResources = tradeResult.resources;
        }
        state.setShips(tradeResult.updatedShips);
      }

      // Clear collected IDs for ships that the server has already reset (no longer trading)
      for (const id of collectedShipIds.current) {
        const ship = gameState.ships.find((s) => s.id === id);
        if (!ship || ship.status === 'docked') {
          collectedShipIds.current.delete(id);
        }
      }

      state.setResources(newResources);
      state.incrementPlayTime(deltaSeconds);
      state.setLastTickAt(Math.floor(Date.now() / 1000));

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      lastTimestampRef.current = 0;
      setIsRunning(false);
    };
  }, [isLoaded]);

  return { isRunning };
}
