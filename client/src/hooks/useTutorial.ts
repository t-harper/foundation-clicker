import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store';
import { TUTORIAL_STEPS } from '../components/tutorial/tutorial-steps';
import { UPGRADE_DEFINITIONS } from '@foundation/shared';

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
    currentEra,
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
      currentEra: s.currentEra,
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
        if (activeTab === 'upgrades') {
          // Grant enough credits to buy the tutorial upgrade (Improved Tools)
          const { resources, setResources } = useGameStore.getState();
          const upgradeCost = UPGRADE_DEFINITIONS['improvedTools']?.cost.credits ?? 100;
          if (resources.credits < upgradeCost) {
            setResources({ ...resources, credits: upgradeCost });
          }
          advanceTutorial();
        }
        break;
      case 6: // Buy an Upgrade: improvedTools isPurchased
        {
          const upgrade = upgrades.find((u) => u.upgradeKey === 'improvedTools');
          if (upgrade?.isPurchased) advanceTutorial();
        }
        break;
      case 8: // Meet Hari Seldon: activeTab === 'research'
        if (activeTab === 'research') advanceTutorial();
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

  // Milestone notifications (steps 11-14)
  useEffect(() => {
    if (isDismissed) return;
    // Allow milestones even after active tutorial steps are done

    const { addNotification, fireMilestone } = useGameStore.getState();

    // Step 14: approaching prestige (500M lifetime credits)
    if (!firedMilestones.includes(14) && lifetimeCredits >= 500_000_000) {
      fireMilestone(14);
      addNotification({
        message: TUTORIAL_STEPS[14].message,
        type: 'info',
      });
    }

    // Step 15: prestige available (1B lifetime credits)
    if (!firedMilestones.includes(15) && lifetimeCredits >= 1_000_000_000) {
      fireMilestone(15);
      addNotification({
        message: TUTORIAL_STEPS[15].message,
        type: 'info',
      });
    }

    // Step 16: first era change (prestige done)
    if (!firedMilestones.includes(16) && prestigeCount >= 1) {
      fireMilestone(16);
      addNotification({
        message: TUTORIAL_STEPS[16].message,
        type: 'success',
      });
    }

    // Step 17: build your fleet (reached trading expansion era)
    if (!firedMilestones.includes(17) && currentEra >= 1) {
      fireMilestone(17);
      addNotification({
        message: TUTORIAL_STEPS[17].message,
        type: 'info',
      });
    }
  }, [lifetimeCredits, prestigeCount, currentEra, firedMilestones, isDismissed]);
}
