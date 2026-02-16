import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useGameStore } from '../../store';
import { TUTORIAL_STEPS } from './tutorial-steps';
import { TutorialTooltip } from './TutorialTooltip';

const SPOTLIGHT_PADDING = 8;
const TOOLTIP_GAP = 12;
const TOTAL_SPOTLIGHT_STEPS = TUTORIAL_STEPS.filter((s) => s.type === 'spotlight').length;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getTooltipPosition(
  targetRect: Rect | null,
  placement: string | undefined,
): React.CSSProperties {
  if (!targetRect) {
    // No target — center the tooltip
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const padded = {
    top: targetRect.top - SPOTLIGHT_PADDING,
    left: targetRect.left - SPOTLIGHT_PADDING,
    width: targetRect.width + SPOTLIGHT_PADDING * 2,
    height: targetRect.height + SPOTLIGHT_PADDING * 2,
  };

  switch (placement) {
    case 'bottom':
      return {
        top: padded.top + padded.height + TOOLTIP_GAP,
        left: padded.left + padded.width / 2,
        transform: 'translateX(-50%)',
      };
    case 'top':
      return {
        bottom: window.innerHeight - padded.top + TOOLTIP_GAP,
        left: padded.left + padded.width / 2,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: padded.top + padded.height / 2,
        right: window.innerWidth - padded.left + TOOLTIP_GAP,
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        top: padded.top + padded.height / 2,
        left: padded.left + padded.width + TOOLTIP_GAP,
        transform: 'translateY(-50%)',
      };
    default:
      return {
        top: padded.top + padded.height + TOOLTIP_GAP,
        left: padded.left + padded.width / 2,
        transform: 'translateX(-50%)',
      };
  }
}

export function TutorialOverlay() {
  const tutorialStep = useGameStore((s) => s.tutorialStep);
  const isComplete = useGameStore((s) => s.isComplete);
  const isDismissed = useGameStore((s) => s.isDismissed);
  const acknowledgeStep = useGameStore((s) => s.acknowledgeStep);
  const skipTutorial = useGameStore((s) => s.skipTutorial);
  const addNotification = useGameStore((s) => s.addNotification);

  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number>(0);

  const step = TUTORIAL_STEPS[tutorialStep];

  // Only render for spotlight steps that aren't complete/dismissed
  const isSpotlightActive = step && step.type === 'spotlight' && !isComplete && !isDismissed;

  const measureTarget = useCallback(() => {
    if (!isSpotlightActive || !step?.target) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(`[data-tutorial="${step.target}"]`);
    if (!el) {
      setTargetRect(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    setTargetRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, [isSpotlightActive, step?.target]);

  // Measure on step change and set up observers
  useEffect(() => {
    if (!isSpotlightActive) {
      setTargetRect(null);
      return;
    }

    // Initial measure (with a small delay for DOM to settle after tab navigation)
    const timeout = setTimeout(measureTarget, 50);

    // ResizeObserver for target element changes
    const target = step?.target
      ? document.querySelector(`[data-tutorial="${step.target}"]`)
      : null;

    if (target) {
      observerRef.current = new ResizeObserver(measureTarget);
      observerRef.current.observe(target);
    }

    // Scroll and resize listeners
    const handleReposition = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measureTarget);
    };

    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isSpotlightActive, step?.target, measureTarget]);

  const handleSkip = useCallback(() => {
    skipTutorial();
    addNotification({
      message: 'Tutorial skipped. Check the Encyclopedia for help anytime.',
      type: 'info',
    });
  }, [skipTutorial, addNotification]);

  const handleAcknowledge = useCallback(() => {
    if (step) {
      acknowledgeStep(step.id);
    }
  }, [step, acknowledgeStep]);

  if (!isSpotlightActive || !step) return null;

  const spotlightStyle: React.CSSProperties = targetRect
    ? {
        top: targetRect.top - SPOTLIGHT_PADDING,
        left: targetRect.left - SPOTLIGHT_PADDING,
        width: targetRect.width + SPOTLIGHT_PADDING * 2,
        height: targetRect.height + SPOTLIGHT_PADDING * 2,
      }
    : { display: 'none' };

  const tooltipStyle = getTooltipPosition(targetRect, step.placement);

  return (
    <>
      {/* Spotlight cutout */}
      <div className="tutorial-spotlight" style={spotlightStyle} />

      {/* Tooltip */}
      <div className="tutorial-tooltip" style={tooltipStyle}>
        <TutorialTooltip
          step={step}
          totalSpotlightSteps={TOTAL_SPOTLIGHT_STEPS}
          onAcknowledge={handleAcknowledge}
          onSkip={handleSkip}
        />
      </div>
    </>
  );
}
