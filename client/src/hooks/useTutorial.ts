import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store';
import { TUTORIAL_STEPS } from '../components/tutorial/tutorial-steps';

/**
 * Reactive hook that drives tutorial progression.
 * Subscribes to relevant store fields and evaluates the current step's
 * auto-advance condition or fires milestone notifications.
 */
export function useTutorial() {
  const {
    totalClicks,
    lifetimeCredits,
    prestigeCount,
    activeTab,
    buildings,
    upgrades,
    isLoaded,
    tutorialStep,
    isComplete,
    isDismissed,
    firedMilestones,
  } = useGameStore(
    useShallow((s) => ({
      totalClicks: s.totalClicks,
      lifetimeCredits: s.lifetimeCredits,
      prestigeCount: s.prestigeCount,
      activeTab: s.activeTab,
      buildings: s.buildings,
      upgrades: s.upgrades,
      isLoaded: s.isLoaded,
      tutorialStep: s.tutorialStep,
      isComplete: s.isComplete,
      isDismissed: s.isDismissed,
      firedMilestones: s.firedMilestones,
    })),
  );

  const initRef = useRef(false);

  // Initialize tutorial on first load
  useEffect(() => {
    if (!isLoaded || initRef.current) return;
    initRef.current = true;

    const state = useGameStore.getState();
    const hasBuildings = state.buildings.some((b) => b.count > 0);
    const isNewPlayer = state.totalClicks === 0 && !hasBuildings;
    state.initTutorial(isNewPlayer);
  }, [isLoaded]);

  // Auto-navigate to required tab for spotlight steps
  useEffect(() => {
    if (isComplete || isDismissed) return;

    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step || step.type !== 'spotlight') return;

    if (step.requiredTab && activeTab !== step.requiredTab) {
      useGameStore.getState().setActiveTab(step.requiredTab);
    }
  }, [tutorialStep, isComplete, isDismissed, activeTab]);

  // Auto-advance logic for spotlight steps
  useEffect(() => {
    if (isComplete || isDismissed) return;

    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step || step.type !== 'spotlight' || step.advanceMode !== 'auto') return;

    const { advanceTutorial } = useGameStore.getState();

    switch (step.id) {
      case 0: // Welcome: totalClicks >= 1
        if (totalClicks >= 1) advanceTutorial();
        break;
      case 2: // Build a Shelter: survivalShelter count >= 1
        {
          const shelter = buildings.find((b) => b.buildingKey === 'survivalShelter');
          if (shelter && shelter.count >= 1) advanceTutorial();
        }
        break;
      case 4: // Unlock New Buildings: survivalShelter count >= 3
        {
          const shelter = buildings.find((b) => b.buildingKey === 'survivalShelter');
          if (shelter && shelter.count >= 3) advanceTutorial();
        }
        break;
      case 5: // Discover Upgrades: activeTab === 'upgrades'
        if (activeTab === 'upgrades') advanceTutorial();
        break;
      case 6: // Buy an Upgrade: improvedTools isPurchased
        {
          const upgrade = upgrades.find((u) => u.upgradeKey === 'improvedTools');
          if (upgrade?.isPurchased) advanceTutorial();
        }
        break;
    }
  }, [
    tutorialStep,
    isComplete,
    isDismissed,
    totalClicks,
    buildings,
    upgrades,
    activeTab,
  ]);

  // Milestone notifications (steps 8-10)
  useEffect(() => {
    if (isDismissed) return;
    // Allow milestones even after active tutorial steps are done

    const { addNotification, fireMilestone } = useGameStore.getState();

    // Step 8: approaching prestige (500M lifetime credits)
    if (!firedMilestones.includes(8) && lifetimeCredits >= 500_000_000) {
      fireMilestone(8);
      addNotification({
        message: TUTORIAL_STEPS[8].message,
        type: 'info',
      });
    }

    // Step 9: prestige available (1B lifetime credits)
    if (!firedMilestones.includes(9) && lifetimeCredits >= 1_000_000_000) {
      fireMilestone(9);
      addNotification({
        message: TUTORIAL_STEPS[9].message,
        type: 'info',
      });
    }

    // Step 10: first era change (prestige done)
    if (!firedMilestones.includes(10) && prestigeCount >= 1) {
      fireMilestone(10);
      addNotification({
        message: TUTORIAL_STEPS[10].message,
        type: 'success',
      });
    }
  }, [lifetimeCredits, prestigeCount, firedMilestones, isDismissed]);
}
