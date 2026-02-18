import React, { useEffect, useState } from 'react';
import { useGameStore } from '@desktop/store';
import type { ActiveEffect } from '@foundation/shared';
import { EVENT_DEFINITIONS } from '@foundation/shared';

function formatTimeRemaining(expiresAt: number): string {
  const remaining = Math.max(0, expiresAt - Math.floor(Date.now() / 1000));
  if (remaining >= 60) {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  return `${remaining}s`;
}

function effectLabel(effect: ActiveEffect): string {
  const resource = effect.resource ? ` ${effect.resource}` : '';
  switch (effect.effectType) {
    case 'productionBuff':
    case 'productionDebuff':
      return `${resource} x${effect.multiplier}`;
    case 'globalProductionBuff':
    case 'globalProductionDebuff':
      return `All x${effect.multiplier}`;
    case 'clickBuff':
    case 'clickDebuff':
      return `Click x${effect.multiplier}`;
    default:
      return '';
  }
}

function isBuff(effect: ActiveEffect): boolean {
  return effect.effectType === 'productionBuff' ||
    effect.effectType === 'globalProductionBuff' ||
    effect.effectType === 'clickBuff';
}

function EffectPill({ effect }: { effect: ActiveEffect }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeRemaining(effect.expiresAt));
  const remaining = effect.expiresAt - Math.floor(Date.now() / 1000);
  const isExpiring = remaining <= 10;
  const buff = isBuff(effect);
  const [showDetail, setShowDetail] = useState(false);
  const eventDef = EVENT_DEFINITIONS[effect.eventKey];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(effect.expiresAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [effect.expiresAt]);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setShowDetail(!showDetail)}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-opacity touch-action-manipulation ${
          isExpiring ? 'animate-pulse opacity-60' : ''
        } ${
          buff
            ? 'bg-green-500/15 text-green-400 border border-green-500/30'
            : 'bg-red-500/15 text-red-400 border border-red-500/30'
        }`}
      >
        <span>{buff ? '\u25B2' : '\u25BC'}</span>
        <span>{effectLabel(effect)}</span>
        <span className="text-[var(--era-text)]/40">{timeLeft}</span>
      </button>

      {showDetail && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDetail(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 bg-[var(--era-bg)] border border-[var(--era-accent)]/30 rounded-md p-2.5 shadow-lg min-w-[160px]">
            <div className="flex flex-col gap-0.5 text-xs">
              <span className="font-semibold text-[var(--era-primary)]">{eventDef?.name ?? effect.eventKey}</span>
              <span className="text-[var(--era-text)]/70">{effectLabel(effect)}</span>
              <span className="text-[var(--era-text)]/70">Expires in {timeLeft}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function MobileActiveEffectsBar() {
  const activeEffects = useGameStore((s) => s.activeEffects);
  const now = Math.floor(Date.now() / 1000);
  const visibleEffects = activeEffects.filter((e) => e.expiresAt > now);

  if (visibleEffects.length === 0) return null;

  return (
    <div className="flex items-center gap-1 px-2 py-1 overflow-x-auto scrollbar-none">
      {visibleEffects.map((effect) => (
        <EffectPill key={effect.id} effect={effect} />
      ))}
    </div>
  );
}
