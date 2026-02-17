import React from 'react';
import { useGameStore } from '@desktop/store';
import { ERA_DEFINITIONS } from '@foundation/shared';
import { SettingsIcon, SaveIcon } from '@desktop/assets/svg/icons';

export function MobileHeader() {
  const currentEra = useGameStore((s) => s.currentEra);
  const isSaving = useGameStore((s) => s.isSaving);
  const toggleSettings = useGameStore((s) => s.toggleSettings);
  const isImpersonating = useGameStore((s) => s.isImpersonating);
  const stopImpersonation = useGameStore((s) => s.stopImpersonation);
  const eraDef = ERA_DEFINITIONS[currentEra];

  return (
    <>
      {isImpersonating && (
        <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold safe-top">
          <span>Impersonating user</span>
          <button
            type="button"
            onClick={stopImpersonation}
            className="px-2 py-0.5 rounded bg-white/20 active:bg-white/30 text-[10px] font-bold uppercase tracking-wide touch-action-manipulation"
          >
            Return
          </button>
        </div>
      )}
      <header className={`flex items-center justify-between px-3 py-2 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/95 ${!isImpersonating ? 'safe-top' : ''}`}>
        {/* Left: Era badge */}
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-[var(--era-primary)]/40 bg-[var(--era-primary)]/10 text-[var(--era-primary)]">
          {eraDef.name}
        </span>

        {/* Center: Title */}
        <h1 className="text-base font-display font-bold tracking-wider text-[var(--era-accent)]">
          FOUNDATION
        </h1>

        {/* Right: Save + settings */}
        <div className="flex items-center gap-2">
          <div
            className={`transition-opacity duration-300 ${isSaving ? 'opacity-100' : 'opacity-0'}`}
            aria-live="polite"
          >
            <SaveIcon className="w-4 h-4 text-[var(--era-primary)] animate-spin" />
          </div>
          <button
            type="button"
            onClick={toggleSettings}
            className="p-2 -mr-1 rounded-md text-[var(--era-text)]/60 active:text-[var(--era-text)] active:bg-[var(--era-surface)] transition-colors touch-action-manipulation"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
}
