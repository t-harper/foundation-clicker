import React, { useEffect, useState } from 'react';
import { loadGame, getMe } from '../api';
import { useGameStore } from '../store';
import { useGameEngine, useTutorial, useWebSocketSync } from '../hooks';
import { GameLayout } from '../components/layout';

export function GamePage() {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const setGameState = useGameStore((s) => s.setGameState);
  const showOfflineEarnings = useGameStore((s) => s.showOfflineEarnings);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Start the game engine, WebSocket sync, and tutorial
  useGameEngine();
  useWebSocketSync();
  useTutorial();

  // Load game state on mount
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const response = await loadGame();

        if (cancelled) return;

        setGameState(response.gameState);

        // Check admin status
        try {
          const me = await getMe();
          if (me.user?.isAdmin) {
            useGameStore.getState().setIsAdmin(true);
          }
        } catch {
          // Non-critical — continue without admin
        }

        // Re-show pending event if player hasn't responded yet
        if (response.pendingEventKey) {
          useGameStore.getState().showEvent(response.pendingEventKey);
        }

        // Show offline earnings modal if applicable
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

  // Loading state
  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0b08] text-[#f5e6d3]">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Failed to Load Game
          </h1>
          <p className="text-[#d4a574]/70 mb-6">{loadError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#c9952e] text-[#1a1612] rounded-md font-semibold hover:bg-[#d4a574] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0b08] text-[#f5e6d3]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#c9952e] mb-4">
            FOUNDATION
          </h1>
          <p className="text-[#d4a574]/70 animate-pulse">
            Loading the Seldon Plan...
          </p>
        </div>
      </div>
    );
  }

  return <GameLayout />;
}
