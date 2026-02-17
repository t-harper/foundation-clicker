import React, { useEffect, useState } from 'react';
import { loadGame, getMe } from '@desktop/api';
import { useGameStore } from '@desktop/store';
import { useGameEngine, useWebSocketSync, useTutorial } from '@desktop/hooks';
import { MobileGameLayout } from '../components/layout';

export function MobileGamePage() {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const setGameState = useGameStore((s) => s.setGameState);
  const showOfflineEarnings = useGameStore((s) => s.showOfflineEarnings);
  const [loadError, setLoadError] = useState<string | null>(null);

  useGameEngine();
  useWebSocketSync();
  useTutorial();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const response = await loadGame();

        if (cancelled) return;

        setGameState(response.gameState);

        try {
          const me = await getMe();
          if (me.user?.isAdmin) {
            useGameStore.getState().setIsAdmin(true);
          }
        } catch {
          // Non-critical
        }

        if (response.pendingEventKey) {
          useGameStore.getState().showEvent(response.pendingEventKey);
        }

        if (response.offlineEarnings && response.offlineSeconds > 0) {
          showOfflineEarnings(response.offlineEarnings, response.offlineSeconds);
        }
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : 'Failed to load game';
        setLoadError(message);
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [setGameState, showOfflineEarnings]);

  if (loadError) {
    return (
      <div className="mobile-vh flex items-center justify-center bg-[#0d0b08] text-[#f5e6d3] px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-bold text-red-400 mb-3">
            Failed to Load Game
          </h1>
          <p className="text-[#d4a574]/70 mb-5 text-sm">{loadError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-3 bg-[#c9952e] text-[#1a1612] rounded-md font-semibold text-sm touch-action-manipulation"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="mobile-vh flex items-center justify-center bg-[#0d0b08] text-[#f5e6d3]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#c9952e] mb-3 font-display">
            FOUNDATION
          </h1>
          <p className="text-[#d4a574]/70 animate-pulse text-sm">
            Loading the Seldon Plan...
          </p>
        </div>
      </div>
    );
  }

  return <MobileGameLayout />;
}
