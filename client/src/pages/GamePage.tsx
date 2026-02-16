import React, { useEffect, useState } from 'react';
import { loadGame } from '../api';
import { useGameStore } from '../store';
import { useGameEngine, useTutorial, useWebSocketSync } from '../hooks';
import { GameLayout } from '../components/layout';
import { EventModal } from '../components/events';
import { TutorialOverlay } from '../components/tutorial';

export function GamePage() {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const setGameState = useGameStore((s) => s.setGameState);
  const showOfflineEarnings = useGameStore((s) => s.showOfflineEarnings);
  const showOfflineModal = useGameStore((s) => s.showOfflineModal);
  const hideOfflineModal = useGameStore((s) => s.hideOfflineModal);
  const offlineEarnings = useGameStore((s) => s.offlineEarnings);
  const offlineSeconds = useGameStore((s) => s.offlineSeconds);
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

  return (
    <>
      <GameLayout />
      <EventModal />
      <TutorialOverlay />

      {/* Offline earnings placeholder */}
      {showOfflineModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={hideOfflineModal}
        >
          <div
            className="bg-[#1a1612] border border-[#c9952e]/30 rounded-lg p-6 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#c9952e] mb-2">
              Welcome Back!
            </h2>
            <p className="text-[#d4a574]/70 text-sm mb-4">
              You were away for {Math.floor(offlineSeconds / 60)} minutes.
            </p>
            {offlineEarnings && (
              <p className="text-[#f5e6d3] text-sm mb-4">
                You earned {offlineEarnings.credits.toFixed(0)} credits while
                offline.
              </p>
            )}
            <button
              type="button"
              onClick={hideOfflineModal}
              className="px-4 py-2 bg-[#c9952e] text-[#1a1612] rounded-md font-semibold hover:bg-[#d4a574] transition-colors"
            >
              Collect
            </button>
          </div>
        </div>
      )}
    </>
  );
}
