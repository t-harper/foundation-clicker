import { useCallback, useEffect, useRef } from 'react';
import { AUTO_SAVE_INTERVAL } from '@foundation/shared';
import { saveGame } from '../api/game.js';
import { useGameStore } from '../store/index.js';

/**
 * Auto-save hook that persists game state to the server at a regular interval.
 * Also exposes a `saveNow` function for manual saves.
 */
export function useAutoSave(): { saveNow: () => Promise<void>; isSaving: boolean } {
  const isSaving = useGameStore((s) => s.isSaving);
  const isLoaded = useGameStore((s) => s.isLoaded);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const saveNow = useCallback(async () => {
    const state = useGameStore.getState();
    if (!state.isLoaded) return;

    state.setIsSaving(true);
    try {
      await saveGame({
        resources: state.resources,
        lastTickAt: state.lastTickAt,
        totalPlayTime: state.totalPlayTime,
        totalClicks: state.totalClicks,
        lifetimeCredits: state.lifetimeCredits,
      });
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      useGameStore.getState().setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    intervalRef.current = setInterval(() => {
      void saveNow();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoaded, saveNow]);

  return { saveNow, isSaving };
}
