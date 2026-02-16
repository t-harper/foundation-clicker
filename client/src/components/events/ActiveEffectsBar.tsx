import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store';
import type { ActiveEffect } from '@foundation/shared';
import { Tooltip } from '../common';
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
      return `${resource} x${effect.multiplier}`;
    case 'productionDebuff':
      return `${resource} x${effect.multiplier}`;
    case 'globalProductionBuff':
      return `All x${effect.multiplier}`;
    case 'globalProductionDebuff':
      return `All x${effect.multiplier}`;
    case 'clickBuff':
      return `Click x${effect.multiplier}`;
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
  const eventDef = EVENT_DEFINITIONS[effect.eventKey];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(effect.expiresAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [effect.expiresAt]);

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">{eventDef?.name ?? effect.eventKey}</span>
          <span>{effectLabel(effect)}</span>
          <span>Expires in {timeLeft}</span>
        </div>
      }
      position="bottom"
    >
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-opacity ${
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
      </div>
    </Tooltip>
  );
}

export function ActiveEffectsBar() {
  const activeEffects = useGameStore((s) => s.activeEffects);
  const now = Math.floor(Date.now() / 1000);
  const visibleEffects = activeEffects.filter((e) => e.expiresAt > now);

  if (visibleEffects.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-5 py-1 border-b border-[var(--era-surface)] bg-[var(--era-bg)]/80 overflow-x-auto">
      {visibleEffects.map((effect) => (
        <EffectPill key={effect.id} effect={effect} />
      ))}
    </div>
  );
}
