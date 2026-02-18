import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore, selectGameState } from '../../store';
import type { PrestigePreview, PrestigeHistoryEntry } from '@foundation/shared';
import { ERA_SELDON_THRESHOLDS, ERA_DEFINITIONS, ERA_UNLOCK_THRESHOLDS, Era } from '@foundation/shared';
import { previewPrestige, triggerPrestige, getPrestigeHistory, replayEra } from '../../api';
import { Button, Modal, NumberDisplay } from '../common';
import { PrestigeIcon, StarIcon } from '../../assets/svg/icons';
import { formatNumber, formatTimeAgo } from '../../utils/format';
import { ChainProgressSection } from './ChainProgressSection';

export function PrestigePanel() {
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
  const [showReplayConfirm, setShowReplayConfirm] = useState(false);
  const [replayTargetEra, setReplayTargetEra] = useState<number | null>(null);
  const [loadingReplay, setLoadingReplay] = useState(false);

  // Load preview and history on mount
  useEffect(() => {
    const loadPreview = async () => {
      setLoadingPreview(true);
      try {
        const result = await previewPrestige();
        setPreview(result);
      } catch {
        // Silently fail, will show 0
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
      const message = err instanceof Error ? err.message : 'Failed to trigger prestige';
      addNotification({ message, type: 'error' });
    } finally {
      setLoadingPrestige(false);
    }
  }, [loadingPrestige, setGameState, addNotification]);

  const handleReplayEra = useCallback(async () => {
    if (loadingReplay || replayTargetEra === null) return;
    setLoadingReplay(true);
    try {
      const result = await replayEra(replayTargetEra);
      setGameState(result.gameState);
      setShowReplayConfirm(false);
      setReplayTargetEra(null);
      addNotification({
        message: `Switched to ${ERA_DEFINITIONS[replayTargetEra as Era].name}!`,
        type: 'success',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to replay era';
      addNotification({ message, type: 'error' });
    } finally {
      setLoadingReplay(false);
    }
  }, [loadingReplay, replayTargetEra, setGameState, addNotification]);

  const unlockedEras = ([0, 1, 2, 3] as Era[]).filter((era) => {
    if (era === currentEra) return false;
    const threshold = ERA_UNLOCK_THRESHOLDS[era];
    if (threshold.prestigeCount && prestigeCount < threshold.prestigeCount) return false;
    if (threshold.seldonPoints && totalSeldonPoints < threshold.seldonPoints) return false;
    return true;
  });

  const canPrestige = preview !== null && preview.seldonPointsEarned > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-display font-semibold text-[var(--era-primary)]">
          Seldon Crisis (Prestige)
        </h2>
        <p className="text-sm text-[var(--era-text)]/50 mt-1">
          Trigger a Seldon Crisis to reset your progress and earn Seldon Points, which permanently boost all production.
        </p>
      </div>

      {/* Current stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <PrestigeIcon className="w-6 h-6 mx-auto mb-2 text-[var(--era-accent)]" />
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block">
            Seldon Points
          </span>
          <NumberDisplay
            value={seldonPoints}
            format="short"
            animate
            className="text-2xl font-bold text-[var(--era-accent)]"
          />
        </div>

        <div className="p-4 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <StarIcon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block">
            Total SP Earned
          </span>
          <NumberDisplay
            value={totalSeldonPoints}
            format="short"
            animate
            className="text-2xl font-bold text-yellow-400"
          />
        </div>

        <div className="p-4 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block mb-2">
            Prestige Count
          </span>
          <span className="text-2xl font-bold text-[var(--era-primary)] tabular-nums">
            {prestigeCount}
          </span>
        </div>

        <div className="p-4 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/15 text-center">
          <span className="text-xs text-[var(--era-text)]/40 uppercase tracking-wide block mb-2">
            Production Multiplier
          </span>
          <span className="text-2xl font-bold text-green-400 tabular-nums">
            {prestigeMultiplier.toFixed(2)}x
          </span>
        </div>
      </div>

      {/* Era Chronicles */}
      <ChainProgressSection />

      {/* Preview section */}
      <div className="p-5 rounded-lg border border-[var(--era-accent)]/30 bg-[var(--era-accent)]/5">
        <h3 className="text-lg font-display font-semibold text-[var(--era-accent)] mb-3">
          Preview Seldon Crisis
        </h3>

        {loadingPreview ? (
          <p className="text-sm text-[var(--era-text)]/40">Calculating...</p>
        ) : preview ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-[var(--era-text)]/40 block">
                  Seldon Points to Earn
                </span>
                <span className="text-xl font-bold text-[var(--era-accent)] tabular-nums">
                  +{formatNumber(preview.seldonPointsEarned, 'short')}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--era-text)]/40 block">
                  New Total SP
                </span>
                <span className="text-xl font-bold text-[var(--era-primary)] tabular-nums">
                  {formatNumber(preview.newTotal, 'short')}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--era-text)]/40 block">
                  New Multiplier
                </span>
                <span className="text-xl font-bold text-green-400 tabular-nums">
                  {preview.newMultiplier.toFixed(2)}x
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--era-text)]/40 block">
                  Current Credits
                </span>
                <span className="text-xl font-bold text-yellow-400 tabular-nums">
                  {formatNumber(preview.currentCredits, 'short')}
                </span>
              </div>
            </div>

            {preview.seldonPointsEarned === 0 && (
              <p className="text-sm text-amber-400/70">
                You need at least {formatNumber(ERA_SELDON_THRESHOLDS[currentEra] ?? ERA_SELDON_THRESHOLDS[ERA_SELDON_THRESHOLDS.length - 1], 'short')} lifetime credits to earn Seldon Points.
                Current: {formatNumber(lifetimeCredits, 'short')}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-[var(--era-text)]/40">Unable to load preview.</p>
        )}

        <Button
          variant="danger"
          size="lg"
          className="w-full mt-4"
          disabled={!canPrestige}
          onClick={() => setShowConfirm(true)}
        >
          Trigger Seldon Crisis
        </Button>
      </div>

      {/* Era Replay */}
      {unlockedEras.length > 0 && (
        <div className="p-5 rounded-lg border border-red-500/20 bg-red-500/5">
          <h3 className="text-lg font-display font-semibold text-red-400 mb-2">
            Replay Previous Era
          </h3>
          <p className="text-sm text-[var(--era-text)]/50 mb-4">
            Reset all progress and switch to a previously unlocked era. No Seldon Points are earned.
          </p>
          <div className="flex flex-wrap gap-2">
            {unlockedEras.map((era) => (
              <Button
                key={era}
                variant="danger"
                size="md"
                onClick={() => {
                  setReplayTargetEra(era);
                  setShowReplayConfirm(true);
                }}
              >
                {ERA_DEFINITIONS[era].name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Prestige history */}
      <div>
        <h3 className="text-lg font-display font-semibold text-[var(--era-primary)] mb-3">
          Crisis History
        </h3>
        {loadingHistory ? (
          <p className="text-sm text-[var(--era-text)]/40">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-[var(--era-text)]/40">
            No Seldon Crises yet. Grow your Foundation to trigger your first crisis.
          </p>
        ) : (
          <div className="space-y-2">
            {history.map((entry) => (
              <div
                key={entry.prestigeNumber}
                className="flex items-center justify-between p-3 rounded-md bg-[var(--era-surface)]/20 border border-[var(--era-primary)]/10"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--era-accent)]/15 text-[var(--era-accent)] text-sm font-bold tabular-nums">
                    #{entry.prestigeNumber}
                  </span>
                  <div>
                    <p className="text-sm text-[var(--era-text)]">
                      +{formatNumber(entry.seldonPointsEarned, 'short')} SP
                    </p>
                    <p className="text-[11px] text-[var(--era-text)]/40">
                      Era {entry.eraAtReset} | {formatNumber(entry.creditsAtReset, 'short')} credits
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[var(--era-text)]/30">
                  {formatTimeAgo(entry.triggeredAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seldon Crisis confirmation modal */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Seldon Crisis"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--era-text)]/70">
            Triggering a Seldon Crisis will:
          </p>
          <ul className="text-sm text-[var(--era-text)]/60 space-y-1 ml-4 list-disc">
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
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              loading={loadingPrestige}
              onClick={handleTriggerPrestige}
            >
              Confirm Crisis
            </Button>
          </div>
        </div>
      </Modal>

      {/* Era Replay confirmation modal */}
      <Modal
        isOpen={showReplayConfirm}
        onClose={() => { setShowReplayConfirm(false); setReplayTargetEra(null); }}
        title="Confirm Era Replay"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--era-text)]/70">
            Replaying <span className="font-semibold text-[var(--era-primary)]">{replayTargetEra !== null ? ERA_DEFINITIONS[replayTargetEra as Era].name : ''}</span> will:
          </p>
          <ul className="text-sm text-[var(--era-text)]/60 space-y-1 ml-4 list-disc">
            <li>Reset all resources to zero</li>
            <li>Reset all buildings, upgrades, ships, and trade routes</li>
            <li>Clear all active effects and missions</li>
            <li>Switch to {replayTargetEra !== null ? ERA_DEFINITIONS[replayTargetEra as Era].name : ''}</li>
          </ul>
          <p className="text-xs text-amber-400/70">
            No Seldon Points will be earned. This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => { setShowReplayConfirm(false); setReplayTargetEra(null); }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              loading={loadingReplay}
              onClick={handleReplayEra}
            >
              Confirm Replay
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
