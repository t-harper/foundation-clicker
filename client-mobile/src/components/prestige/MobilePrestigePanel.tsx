import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '@desktop/store';
import type { PrestigePreview, PrestigeHistoryEntry } from '@foundation/shared';
import { ERA_SELDON_THRESHOLDS } from '@foundation/shared';
import { previewPrestige, triggerPrestige, getPrestigeHistory } from '@desktop/api';
import { NumberDisplay } from '@desktop/components/common';
import { PrestigeIcon, StarIcon } from '@desktop/assets/svg/icons';
import { formatNumber, formatTimeAgo } from '@desktop/utils/format';
import { MobileModal } from '@/components/common/MobileModal';
import { MobileChainProgress } from './MobileChainProgress';

export function MobilePrestigePanel() {
  const seldonPoints = useGameStore((s) => s.seldonPoints);
  const totalSeldonPoints = useGameStore((s) => s.totalSeldonPoints);
  const prestigeCount = useGameStore((s) => s.prestigeCount);
  const prestigeMultiplier = useGameStore((s) => s.prestigeMultiplier);
  const setGameState = useGameStore((s) => s.setGameState);
  const addNotification = useGameStore((s) => s.addNotification);
  const lifetimeCredits = useGameStore((s) => s.lifetimeCredits);
  const currentEra = useGameStore((s) => s.currentEra);

  const [preview, setPreview] = useState<PrestigePreview | null>(null);
  const [history, setHistory] = useState<PrestigeHistoryEntry[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingPrestige, setLoadingPrestige] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load preview and history on mount
  useEffect(() => {
    const loadPreview = async () => {
      setLoadingPreview(true);
      try {
        const result = await previewPrestige();
        setPreview(result);
      } catch {
        // Silently fail
      } finally {
        setLoadingPreview(false);
      }
    };

    const loadHistory = async () => {
      setLoadingHistory(true);
      try {
        const result = await getPrestigeHistory();
        setHistory(result);
      } catch {
        // Silently fail
      } finally {
        setLoadingHistory(false);
      }
    };

    loadPreview();
    loadHistory();
  }, [prestigeCount]);

  const handleTriggerPrestige = useCallback(async () => {
    if (loadingPrestige) return;
    setLoadingPrestige(true);
    try {
      const result = await triggerPrestige();
      setGameState(result.gameState);

      setShowConfirm(false);
      addNotification({
        message: `Seldon Crisis resolved! Earned ${formatNumber(result.seldonPointsEarned, 'short')} Seldon Points.`,
        type: 'success',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to trigger prestige';
      addNotification({ message, type: 'error' });
    } finally {
      setLoadingPrestige(false);
    }
  }, [loadingPrestige, setGameState, addNotification]);

  const canPrestige = preview !== null && preview.seldonPointsEarned > 0;

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-display font-semibold text-[var(--era-primary)]">
          Seldon Crisis (Prestige)
        </h2>
        <p className="text-[11px] text-[var(--era-text)]/50 mt-0.5">
          Trigger a Seldon Crisis to reset progress and earn Seldon Points for
          permanent production boosts.
        </p>
      </div>

      {/* Stats 2x2 grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <PrestigeIcon className="w-5 h-5 mx-auto mb-1.5 text-[var(--era-accent)]" />
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
            Seldon Points
          </span>
          <NumberDisplay
            value={seldonPoints}
            format="short"
            animate
            className="text-lg font-bold text-[var(--era-accent)]"
          />
        </div>

        <div className="p-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <StarIcon className="w-5 h-5 mx-auto mb-1.5 text-yellow-400" />
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
            Total SP Earned
          </span>
          <NumberDisplay
            value={totalSeldonPoints}
            format="short"
            animate
            className="text-lg font-bold text-yellow-400"
          />
        </div>

        <div className="p-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block mb-1.5">
            Prestige Count
          </span>
          <span className="text-lg font-bold text-[var(--era-primary)] tabular-nums">
            {prestigeCount}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block mb-1.5">
            Production Mult
          </span>
          <span className="text-lg font-bold text-green-400 tabular-nums">
            {prestigeMultiplier.toFixed(2)}x
          </span>
        </div>
      </div>

      {/* Era Chronicles */}
      <MobileChainProgress />

      {/* Preview section */}
      <div className="p-4 rounded-lg border border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5">
        <h3 className="text-sm font-display font-semibold text-[var(--era-accent)] mb-2">
          Preview Seldon Crisis
        </h3>

        {loadingPreview ? (
          <p className="text-[11px] text-[var(--era-text)]/40">
            Calculating...
          </p>
        ) : preview ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-[var(--era-text)]/40 block">
                  SP to Earn
                </span>
                <span className="text-base font-bold text-[var(--era-accent)] tabular-nums">
                  +{formatNumber(preview.seldonPointsEarned, 'short')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--era-text)]/40 block">
                  New Total SP
                </span>
                <span className="text-base font-bold text-[var(--era-primary)] tabular-nums">
                  {formatNumber(preview.newTotal, 'short')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--era-text)]/40 block">
                  New Multiplier
                </span>
                <span className="text-base font-bold text-green-400 tabular-nums">
                  {preview.newMultiplier.toFixed(2)}x
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--era-text)]/40 block">
                  Current Credits
                </span>
                <span className="text-base font-bold text-yellow-400 tabular-nums">
                  {formatNumber(preview.currentCredits, 'short')}
                </span>
              </div>
            </div>

            {preview.seldonPointsEarned === 0 && (
              <p className="text-[11px] text-amber-400/70">
                Need{' '}
                {formatNumber(
                  ERA_SELDON_THRESHOLDS[currentEra] ??
                    ERA_SELDON_THRESHOLDS[ERA_SELDON_THRESHOLDS.length - 1],
                  'short',
                )}{' '}
                lifetime credits for SP. Current:{' '}
                {formatNumber(lifetimeCredits, 'short')}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-[var(--era-text)]/40">
            Unable to load preview.
          </p>
        )}

        <button
          type="button"
          disabled={!canPrestige}
          onClick={() => setShowConfirm(true)}
          className="w-full mt-3 py-3 rounded-lg text-sm font-semibold bg-red-600 text-white active:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors touch-action-manipulation"
        >
          Trigger Seldon Crisis
        </button>
      </div>

      {/* Prestige history */}
      <div>
        <h3 className="text-sm font-display font-semibold text-[var(--era-primary)] mb-2">
          Crisis History
        </h3>
        {loadingHistory ? (
          <p className="text-[11px] text-[var(--era-text)]/40">
            Loading history...
          </p>
        ) : history.length === 0 ? (
          <p className="text-[11px] text-[var(--era-text)]/40">
            No Seldon Crises yet. Grow your Foundation to trigger your first
            crisis.
          </p>
        ) : (
          <div className="space-y-1.5">
            {history.map((entry) => (
              <div
                key={entry.prestigeNumber}
                className="flex items-center justify-between p-2.5 rounded-md bg-[var(--era-surface)]/20 border border-[var(--era-primary)]/10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--era-accent)]/15 text-[var(--era-accent)] text-xs font-bold tabular-nums">
                    #{entry.prestigeNumber}
                  </span>
                  <div>
                    <p className="text-xs text-[var(--era-text)]">
                      +{formatNumber(entry.seldonPointsEarned, 'short')} SP
                    </p>
                    <p className="text-[10px] text-[var(--era-text)]/40">
                      Era {entry.eraAtReset} |{' '}
                      {formatNumber(entry.creditsAtReset, 'short')} credits
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-[var(--era-text)]/30">
                  {formatTimeAgo(entry.triggeredAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation modal (two-stage) */}
      <MobileModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Seldon Crisis"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--era-text)]/70">
            Triggering a Seldon Crisis will:
          </p>
          <ul className="text-sm text-[var(--era-text)]/60 space-y-1.5 ml-4 list-disc">
            <li>Reset all your resources to zero</li>
            <li>Reset all buildings and upgrades</li>
            <li>Reset all ships and trade routes</li>
            <li>
              Grant you{' '}
              <span className="text-[var(--era-accent)] font-semibold">
                +{formatNumber(preview?.seldonPointsEarned ?? 0, 'short')}
              </span>{' '}
              Seldon Points
            </li>
            <li>
              New multiplier:{' '}
              <span className="text-green-400 font-semibold">
                {preview?.newMultiplier.toFixed(2) ?? '?'}x
              </span>
            </li>
          </ul>
          <p className="text-xs text-amber-400/70">
            This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-3 rounded-lg text-sm font-semibold border border-[var(--era-surface)] text-[var(--era-text)]/70 active:bg-[var(--era-surface)]/30 transition-colors touch-action-manipulation"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loadingPrestige}
              onClick={handleTriggerPrestige}
              className="flex-1 py-3 rounded-lg text-sm font-semibold bg-red-600 text-white active:bg-red-700 disabled:opacity-50 transition-colors touch-action-manipulation"
            >
              {loadingPrestige ? 'Processing...' : 'Confirm Crisis'}
            </button>
          </div>
        </div>
      </MobileModal>
    </div>
  );
}
