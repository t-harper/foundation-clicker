import React, { useState, useCallback, useEffect } from 'react';
import { useGameStore, selectGameStats, selectGameState } from '@desktop/store';
import { resetGame, getStats, setNickname as setNicknameApi } from '@desktop/api';
import { wsManager } from '@desktop/ws';
import type { GameStats } from '@foundation/shared';
import { MobileModal } from '@/components/common/MobileModal';
import { Button } from '@desktop/components/common';
import { formatNumber, formatDuration } from '@desktop/utils/format';

interface MobileSettingsModalProps {
  isOpen: boolean;
}

export function MobileSettingsModal({ isOpen }: MobileSettingsModalProps) {
  const toggleSettings = useGameStore((s) => s.toggleSettings);
  const setGameState = useGameStore((s) => s.setGameState);
  const addNotification = useGameStore((s) => s.addNotification);
  const setIsSaving = useGameStore((s) => s.setIsSaving);
  const nickname = useGameStore((s) => s.nickname);

  const [stats, setStats] = useState<GameStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState('');

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
      wsManager.fire({
        type: 'saveState',
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
      const result = await resetGame();
      setGameState(result.gameState);
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
    } catch {
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

  const handleSwitchToDesktop = useCallback(() => {
    document.cookie = 'fg-view=desktop; path=/; max-age=31536000';
    window.location.reload();
  }, []);

  return (
    <>
      <MobileModal isOpen={isOpen && !showResetConfirm} onClose={toggleSettings} title="Settings">
        <div className="space-y-6">
          {/* Game Stats */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Game Statistics
            </h3>
            {loadingStats ? (
              <p className="text-sm text-[var(--era-text)]/40 animate-pulse">Loading stats...</p>
            ) : stats ? (
              <div className="grid grid-cols-2 gap-2">
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

          {/* Save Data */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Save Data
            </h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                loading={saving}
                onClick={handleManualSave}
                className="w-full"
              >
                Save Now
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportSave}
                  className="flex-1"
                >
                  Export Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  loading={importing}
                  onClick={handleImportSave}
                  className="flex-1"
                >
                  Import Save
                </Button>
              </div>
            </div>
          </section>

          {/* Switch to Desktop */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Display
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSwitchToDesktop}
              className="w-full"
            >
              Switch to Desktop View
            </Button>
          </section>

          {/* Account */}
          <section>
            <h3 className="text-sm font-semibold text-[var(--era-primary)] mb-3 uppercase tracking-wide">
              Account
            </h3>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">Display Name</span>
                <span className="text-sm font-semibold text-[var(--era-text)]">{nickname || 'Not set'}</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => { setEditingNickname(true); setNewNickname(nickname); }}>
                Change
              </Button>
            </div>
            {editingNickname && (
              <div className="flex gap-2 mb-3">
                <input
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  maxLength={20}
                  className="flex-1 px-2 py-1.5 bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/20 rounded text-sm text-[var(--era-text)]"
                />
                <Button variant="primary" size="sm" onClick={async () => {
                  try {
                    const result = await setNicknameApi(newNickname);
                    useGameStore.getState().setNickname(result.nickname);
                    setEditingNickname(false);
                    addNotification({ message: 'Display name updated!', type: 'success' });
                  } catch (err) {
                    addNotification({ message: err instanceof Error ? err.message : 'Failed', type: 'error' });
                  }
                }}>Save</Button>
                <Button variant="secondary" size="sm" onClick={() => setEditingNickname(false)}>Cancel</Button>
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                localStorage.removeItem('foundation_token');
                window.location.href = '/login';
              }}
              className="w-full"
            >
              Log Out
            </Button>
          </section>

          {/* Danger Zone */}
          <section>
            <h3 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
              Danger Zone
            </h3>
            <p className="text-xs text-[var(--era-text)]/50 mb-3 leading-relaxed">
              Resetting the game will permanently erase all progress, including prestige data.
              This cannot be undone.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowResetConfirm(true)}
              className="w-full"
            >
              Reset Game
            </Button>
          </section>
        </div>
      </MobileModal>

      {/* Reset confirmation modal */}
      <MobileModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Confirm Reset"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--era-text)]/70">
            Are you absolutely sure you want to reset the game? This will:
          </p>
          <ul className="text-sm text-[var(--era-text)]/60 space-y-1.5 ml-4 list-disc">
            <li>Delete all resources, buildings, and upgrades</li>
            <li>Delete all ships and trade routes</li>
            <li>Delete all Seldon Points and prestige progress</li>
            <li>Delete all achievements</li>
          </ul>
          <p className="text-xs text-red-400 font-medium">
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
      </MobileModal>
    </>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-[var(--era-surface)]/30 border border-[var(--era-primary)]/10">
      <span className="text-[10px] text-[var(--era-text)]/40 uppercase tracking-wide block">
        {label}
      </span>
      <span className="text-sm font-semibold text-[var(--era-text)] tabular-nums">
        {value}
      </span>
    </div>
  );
}
