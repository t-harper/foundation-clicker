import { useCallback, useEffect, useRef } from 'react';
import { EVENT_CHECK_INTERVAL } from '@foundation/shared';
import { checkEvents } from '../api/events';
import { useGameStore } from '../store/index';

const CLEANUP_INTERVAL = 5000;

/**
 * Polls the server for new events and cleans up expired active effects.
 */
export function useEventChecker(): void {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pollForEvent = useCallback(async () => {
    const state = useGameStore.getState();
    if (!state.isLoaded || state.showEventModal) return;

    try {
      const response = await checkEvents();
      if (response.event) {
        useGameStore.getState().showEvent(response.event.eventKey);
      }
    } catch (err) {
      console.error('Event check failed:', err);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Poll for events
    checkIntervalRef.current = setInterval(() => {
      void pollForEvent();
    }, EVENT_CHECK_INTERVAL);

    // Clean up expired effects
    cleanupIntervalRef.current = setInterval(() => {
      useGameStore.getState().removeExpiredEffects();
    }, CLEANUP_INTERVAL);

    return () => {
      if (checkIntervalRef.current !== null) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      if (cleanupIntervalRef.current !== null) {
        clearInterval(cleanupIntervalRef.current);
        cleanupIntervalRef.current = null;
      }
    };
  }, [isLoaded, pollForEvent]);
}
