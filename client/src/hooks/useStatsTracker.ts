import { useEffect, useRef } from 'react';
import { useGameStore } from '../store';
import { selectProductionRates } from '../store/selectors';
import type { StatsSnapshot } from '../store/stats-slice';

const SNAPSHOT_INTERVAL_MS = 30_000;

export function useStatsTracker(): void {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    useGameStore.getState().loadStatsHistory();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const record = () => {
      const state = useGameStore.getState();
      const rates = selectProductionRates(state);
      const snapshot: StatsSnapshot = {
        timestamp: Math.floor(Date.now() / 1000),
        productionRates: { ...rates },
        resourceTotals: { ...state.resources },
        era: state.currentEra,
      };
      state.addStatsSnapshot(snapshot);
    };

    record();
    intervalRef.current = setInterval(record, SNAPSHOT_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoaded]);
}
