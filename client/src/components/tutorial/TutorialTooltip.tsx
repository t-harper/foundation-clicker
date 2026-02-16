import React from 'react';
import { SeldonHologram } from '../../assets/svg/backgrounds/SeldonHologram';
import type { TutorialStep } from './tutorial-steps';

interface TutorialTooltipProps {
  step: TutorialStep;
  totalSpotlightSteps: number;
  onAcknowledge: () => void;
  onSkip: () => void;
}

export function TutorialTooltip({
  step,
  totalSpotlightSteps,
  onAcknowledge,
  onSkip,
}: TutorialTooltipProps) {
  return (
    <div className="tutorial-tooltip">
      <div className="flex gap-3">
        {/* Seldon hologram */}
        <div className="shrink-0 w-20 h-20 flex items-center justify-center">
          <SeldonHologram className="w-20 h-full" animated />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-blue-300 mb-1">
            {step.title}
          </h3>
          <p className="text-xs text-blue-100/80 leading-relaxed">
            {step.message}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-blue-500/20">
        <span className="text-[10px] text-blue-400/50">
          {step.id + 1} of {totalSpotlightSteps}
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSkip}
            className="text-[10px] text-blue-400/40 hover:text-blue-400/70 transition-colors"
          >
            Skip tutorial
          </button>

          {step.advanceMode === 'acknowledge' && (
            <button
              type="button"
              onClick={onAcknowledge}
              className="px-3 py-1 text-xs font-semibold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
            >
              {step.acknowledgeLabel ?? 'Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
