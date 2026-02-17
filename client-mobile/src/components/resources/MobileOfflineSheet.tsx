import React from 'react';
import { useGameStore } from '@desktop/store';
import { BottomSheet } from '../common/BottomSheet';

export function MobileOfflineSheet() {
  const hideOfflineModal = useGameStore((s) => s.hideOfflineModal);
  const offlineEarnings = useGameStore((s) => s.offlineEarnings);
  const offlineSeconds = useGameStore((s) => s.offlineSeconds);

  return (
    <BottomSheet isOpen={true} onClose={hideOfflineModal} title="Welcome Back!">
      <div className="px-4 pb-4 text-center">
        <p className="text-[var(--era-text)]/70 text-sm mb-3">
          You were away for {Math.floor(offlineSeconds / 60)} minutes.
        </p>
        {offlineEarnings && (
          <p className="text-[var(--era-text)] text-sm mb-4">
            You earned {offlineEarnings.credits.toFixed(0)} credits while offline.
          </p>
        )}
        <button
          type="button"
          onClick={hideOfflineModal}
          className="w-full py-3 bg-[var(--era-accent)] text-[var(--era-bg)] rounded-md font-semibold text-sm touch-action-manipulation active:opacity-80 transition-opacity"
        >
          Collect
        </button>
      </div>
    </BottomSheet>
  );
}
