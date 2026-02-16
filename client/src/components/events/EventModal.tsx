import React, { useState } from 'react';
import { EVENT_DEFINITIONS } from '@foundation/shared';
import type { EventEffect } from '@foundation/shared';
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

export function EventModal() {
  const pendingEvent = useGameStore((s) => s.pendingEvent);
  const showEventModal = useGameStore((s) => s.showEventModal);
  const hideEventModal = useGameStore((s) => s.hideEventModal);
  const setResources = useGameStore((s) => s.setResources);
  const addActiveEffects = useGameStore((s) => s.addActiveEffects);
  const addNotification = useGameStore((s) => s.addNotification);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
