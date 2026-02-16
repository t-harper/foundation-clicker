import { useEffect, useRef, useState } from 'react';
import { tick } from '@foundation/shared';
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

      const newResources = tick(gameState, deltaSeconds);

      state.setResources(newResources);
      state.incrementPlayTime(deltaSeconds);
      state.setLastTickAt(Date.now());

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
