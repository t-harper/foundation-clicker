import React, { useState, useMemo } from 'react';
import { EVENT_DEFINITIONS, EVENT_CHAIN_DEFINITIONS } from '@foundation/shared';
import type { EventEffect, EventChainDefinition } from '@foundation/shared';
import { useGameStore } from '../../store';
import { chooseEvent } from '../../api/events';
import { Modal } from '../common';
import { formatResource } from '../../utils/format';

function effectDescription(effect: EventEffect): string {
  switch (effect.type) {
    case 'resourceGrant':
      return `+${formatResource(effect.amount)} ${effect.resource}`;
    case 'resourceLoss':
      return `-${formatResource(effect.amount)} ${effect.resource}`;
    case 'resourcePercentGrant':
      return `+${effect.percent}% ${effect.resource}`;
    case 'resourcePercentLoss':
      return `-${effect.percent}% ${effect.resource}`;
    case 'productionBuff':
      return `${effect.resource} production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'productionDebuff':
      return `${effect.resource} production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'globalProductionBuff':
      return `All production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'globalProductionDebuff':
      return `All production x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'clickBuff':
      return `Click value x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    case 'clickDebuff':
      return `Click value x${effect.multiplier} for ${Math.floor(effect.durationSeconds / 60)}m`;
    default:
      return '';
  }
}

function isPositiveEffect(effect: EventEffect): boolean {
  switch (effect.type) {
    case 'resourceGrant':
    case 'resourcePercentGrant':
    case 'productionBuff':
    case 'globalProductionBuff':
    case 'clickBuff':
      return true;
    default:
      return false;
  }
}

// No-op: events cannot be dismissed without a choice
const noop = () => {};

/** Look up which chronicle chain (if any) an event belongs to, plus its 1-based step index */
function findChainInfo(eventKey: string): { chain: EventChainDefinition; step: number } | null {
  for (const chain of EVENT_CHAIN_DEFINITIONS) {
    const idx = chain.eventKeys.indexOf(eventKey);
    if (idx !== -1) return { chain, step: idx + 1 };
  }
  return null;
}

export function EventModal() {
  const pendingEvent = useGameStore((s) => s.pendingEvent);
  const showEventModal = useGameStore((s) => s.showEventModal);
  const hideEventModal = useGameStore((s) => s.hideEventModal);
  const setResources = useGameStore((s) => s.setResources);
  const addActiveEffects = useGameStore((s) => s.addActiveEffects);
  const addEventHistoryEntry = useGameStore((s) => s.addEventHistoryEntry);
  const addNotification = useGameStore((s) => s.addNotification);
  const eventHistory = useGameStore((s) => s.eventHistory);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chainInfo = useMemo(
    () => (pendingEvent ? findChainInfo(pendingEvent) : null),
    [pendingEvent],
  );

  // How many events in this chain the player has already completed (before this one)
  const chainCompleted = useMemo(() => {
    if (!chainInfo) return 0;
    const done = new Set(eventHistory.map((e) => e.eventKey));
    return chainInfo.chain.eventKeys.filter((k) => done.has(k)).length;
  }, [chainInfo, eventHistory]);

  if (!showEventModal || !pendingEvent) return null;

  const def = EVENT_DEFINITIONS[pendingEvent];
  if (!def) {
    hideEventModal();
    return null;
  }

  const handleChoice = async (choiceIndex: number) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await chooseEvent({
        eventKey: pendingEvent,
        choiceIndex,
      });

      setResources(response.resources);
      if (response.newEffects.length > 0) {
        addActiveEffects(response.newEffects);
      }

      addEventHistoryEntry({
        eventKey: pendingEvent,
        choiceIndex,
        firedAt: Math.floor(Date.now() / 1000),
      });

      addNotification({
        message: `${def.name}: ${def.choices[choiceIndex].label}`,
        type: 'success',
      });

      hideEventModal();
    } catch (err) {
      console.error('Failed to choose event:', err);
      addNotification({
        message: 'Failed to process event choice',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={showEventModal}
      onClose={noop}
      size="lg"
    >
      <div className="space-y-4">
        {/* Chronicle chain indicator */}
        {chainInfo && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--era-accent)]/10 border border-[var(--era-accent)]/20">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--era-accent)]">
              Main Story
            </span>
            <span className="text-[var(--era-accent)]/40">|</span>
            <span className="text-xs text-[var(--era-accent)]/70 font-medium">
              {chainInfo.chain.name}
            </span>
            <span className="ml-auto text-xs tabular-nums font-semibold text-[var(--era-accent)]">
              {chainInfo.step}/{chainInfo.chain.eventKeys.length}
            </span>
          </div>
        )}

        {/* Title (rendered manually — no X button) */}
        <h2 className="text-lg font-display font-semibold text-[var(--era-primary)]">
          {def.name}
        </h2>

        {/* Narrative text */}
        <p className="text-[var(--era-text)]/80 text-sm leading-relaxed">
          {def.description}
        </p>

        {/* Choices */}
        <div className="space-y-3">
          {def.choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              disabled={isSubmitting}
              onClick={() => void handleChoice(i)}
              className="w-full text-left p-3 rounded-lg border border-[var(--era-surface)] hover:border-[var(--era-accent)]/50 hover:bg-[var(--era-surface)]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="font-semibold text-[var(--era-primary)] text-sm mb-1">
                {choice.label}
              </div>
              <div className="text-[var(--era-text)]/60 text-xs mb-2">
                {choice.description}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {choice.effects.map((effect, j) => (
                  <span
                    key={j}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isPositiveEffect(effect)
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}
                  >
                    {effectDescription(effect)}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
