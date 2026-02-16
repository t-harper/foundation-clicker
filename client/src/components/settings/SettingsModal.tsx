import React, { useState, useCallback, useEffect } from 'react';
import { useGameStore, selectGameStats, selectGameState } from '../../store';
import { resetGame, saveGame, loadGame, getStats } from '../../api';
import type { GameStats } from '@foundation/shared';
import { Modal, Button } from '../common';
import { formatNumber, formatDuration } from '../../utils/format';

interface SettingsModalProps {
  isOpen: boolean;
}

export function SettingsModal({ isOpen }: SettingsModalProps) {
  const toggleSettings = useGameStore((s) => s.toggleSettings);
  const setGameState = useGameStore((s) => s.setGameState);
  const addNotification = useGameStore((s) => s.addNotification);
  const setIsSaving = useGameStore((s) => s.setIsSaving);

  const [stats, setStats] = useState<GameStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);

  // Load stats when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const load = async () => {
      setLoadingStats(true);
      try {
        const result = await getStats();
        setStats(result);
      } catch {
        // Fall back to local stats
        const localStats = selectGameStats(useGameStore.getState());
        setStats(localStats);
      } finally {
        setLoadingStats(false);
      }
    };
    load();
  }, [isOpen]);

  const handleManualSave = useCallback(async () => {
    setSaving(true);
    setIsSaving(true);
    try {
      const state = useGameStore.getState();
      await saveGame({
        resources: state.resources,
        lastTickAt: state.lastTickAt,
        totalPlayTime: state.totalPlayTime,
        totalClicks: state.totalClicks,
        lifetimeCredits: state.lifetimeCredits,
      });
      addNotification({ message: 'Game saved successfully!', type: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Save failed';
      addNotification({ message, type: 'error' });
    } finally {
      setSaving(false);
      setIsSaving(false);
    }
  }, [setIsSaving, addNotification]);

  const handleResetGame = useCallback(async () => {
    if (resetting) return;
    setResetting(true);
    try {
      await resetGame();
      // Reload game state from server
      const gameData = await loadGame();
      setGameState(gameData.gameState);
      setShowResetConfirm(false);
      toggleSettings();
      addNotification({
        message: 'Game has been reset. The Foundation begins anew.',
        type: 'info',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Reset failed';
      addNotification({ message, type: 'error' });
    } finally {
      setResetting(false);
    }
  }, [resetting, setGameState, toggleSettings, addNotification]);

  const handleExportSave = useCallback(() => {
    try {
      const gameState = selectGameState(useGameStore.getState());
      const exportData = JSON.stringify(gameState, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `foundation-save-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      addNotification({ message: 'Save data exported.', type: 'success' });
    } catch (err) {
      addNotification({ message: 'Failed to export save data.', type: 'error' });
    }
  }, [addNotification]);

  const handleImportSave = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setImporting(true);
      try {
        const text = await file.text();
        const importedState = JSON.parse(text);

        // Validate basic structure
        if (!importedState.resources || importedState.clickValue === undefined) {
          throw new Error('Invalid save file format');
        }

        setGameState(importedState);
        addNotification({ message: 'Save data imported successfully!', type: 'success' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Invalid save file';
        addNotification({ message: `Import failed: ${message}`, type: 'error' });
      } finally {
        setImporting(false);
      }
    };
    input.click();
  }, [setGameState, addNotification]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={toggleSettings}
        title="Settings"
        size="md"
      >
        <div className="space-y-6">
          {/* Game Stats */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Game Statistics
            </h3>
            {loadingStats ? (
              <p className="text-sm text-[var(--era-text)]/40">Loading stats...</p>
            ) : stats ? (
              <div className="grid grid-cols-2 gap-3">
                <StatItem label="Total Play Time" value={formatDuration(stats.totalPlayTime)} />
                <StatItem label="Total Clicks" value={formatNumber(stats.totalClicks, 'full')} />
                <StatItem label="Lifetime Credits" value={formatNumber(stats.lifetimeCredits, 'short')} />
                <StatItem label="Total Buildings" value={String(stats.totalBuildings)} />
                <StatItem label="Upgrades Purchased" value={String(stats.totalUpgrades)} />
                <StatItem label="Ships Built" value={String(stats.totalShips)} />
                <StatItem label="Achievements" value={String(stats.totalAchievements)} />
                <StatItem label="Prestige Count" value={String(stats.prestigeCount)} />
              </div>
            ) : (
              <p className="text-sm text-[var(--era-text)]/40">Unable to load stats.</p>
            )}
          </section>

          {/* Save / Export / Import */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Save Data
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="sm"
                loading={saving}
                onClick={handleManualSave}
              >
                Save Now
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportSave}
              >
                Export Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                loading={importing}
                onClick={handleImportSave}
              >
                Import Save
              </Button>
            </div>
          </section>

          {/* Danger zone */}
          <section>
            <h3 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
              Danger Zone
            </h3>
            <p className="text-xs text-[var(--era-text)]/50 mb-3">
              Resetting the game will permanently erase all progress, including prestige data.
              This cannot be undone.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset Game
            </Button>
          </section>
        </div>
      </Modal>

      {/* Reset confirmation modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Confirm Reset"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--era-text)]/70">
            Are you absolutely sure you want to reset the game? This will:
          </p>
          <ul className="text-sm text-[var(--era-text)]/60 space-y-1 ml-4 list-disc">
            <li>Delete all resources, buildings, and upgrades</li>
            <li>Delete all ships and trade routes</li>
            <li>Delete all Seldon Points and prestige progress</li>
            <li>Delete all achievements</li>
          </ul>
          <p className="text-xs text-red-400">
            This action is irreversible.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              loading={resetting}
              onClick={handleResetGame}
            >
              Delete Everything
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-md bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/10">
      <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
        {label}
      </span>
      <span className="text-sm font-semibold text-[var(--era-text)] tabular-nums">
        {value}
      </span>
    </div>
  );
}
