import React from 'react';
import { useGameStore } from '../../store';
import { ERA_DEFINITIONS } from '@foundation/shared';
import { SettingsIcon, SaveIcon } from '../../assets/svg/icons';

export function Header() {
  const currentEra = useGameStore((s) => s.currentEra);
  const isSaving = useGameStore((s) => s.isSaving);
  const toggleSettings = useGameStore((s) => s.toggleSettings);
  const isImpersonating = useGameStore((s) => s.isImpersonating);
  const stopImpersonation = useGameStore((s) => s.stopImpersonation);
  const eraDef = ERA_DEFINITIONS[currentEra];

  return (
    <>
      {isImpersonating && (
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold">
          <span>Impersonating user</span>
          <button
            type="button"
            onClick={stopImpersonation}
            className="px-3 py-0.5 rounded bg-white/20 hover:bg-white/30 transition-colors text-xs font-bold uppercase tracking-wide"
          >
            Return to Admin
          </button>
        </div>
      )}
      <header className="flex items-center justify-between px-5 py-3 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/95 backdrop-blur-sm">
        {/* Left: title */}
        <div className="flex items-center gap-4">
          <h1
            className="glitch-text text-2xl font-display font-bold tracking-wider text-[var(--era-accent)]"
            data-text="FOUNDATION CLICKER"
          >
            FOUNDATION CLICKER
          </h1>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border border-[var(--era-primary)]/40 bg-[var(--era-primary)]/10 text-[var(--era-primary)]"
          >
            {eraDef.name}
          </span>
        </div>

        {/* Right: save indicator + settings */}
        <div className="flex items-center gap-3">
          {/* Save indicator */}
          <div
            className={`flex items-center gap-1.5 text-xs transition-opacity duration-300 ${
              isSaving ? 'opacity-100' : 'opacity-0'
            }`}
            aria-live="polite"
          >
            <SaveIcon className="w-4 h-4 text-[var(--era-primary)] animate-spin" />
            <span className="text-[var(--era-text)]/60">Saving...</span>
          </div>

          {/* Settings button */}
          <button
            type="button"
            onClick={toggleSettings}
            className="p-2 rounded-md text-[var(--era-text)]/60 hover:text-[var(--era-text)] hover:bg-[var(--era-surface)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--era-accent)]"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
}
