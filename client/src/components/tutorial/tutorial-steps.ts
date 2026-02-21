import type { ActiveTab } from '../../store';

export type TutorialStepType = 'spotlight' | 'milestone';
export type AdvanceMode = 'auto' | 'acknowledge';

export interface TutorialStep {
  id: number;
  title: string;
  message: string;
  type: TutorialStepType;
  /** data-tutorial attribute value on the target element (for spotlight positioning) */
  target?: string;
  /** Which tab to auto-navigate to before showing this step */
  requiredTab?: ActiveTab;
  advanceMode: AdvanceMode;
  /** Label for the acknowledge button (only for acknowledge steps) */
  acknowledgeLabel?: string;
  /** Tooltip placement relative to target */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 0,
    title: 'Welcome to Terminus',
    message:
      'I am Hari Seldon. I have foreseen what is to come \u2014 the fall of the Galactic Empire and thirty thousand years of darkness. But there is hope. Here, on Terminus, you will build the Foundation. Click the Vault to begin generating credits.',
    type: 'spotlight',
    target: 'click-target',
    advanceMode: 'auto',
    placement: 'right',
  },
  {
    id: 1,
    title: 'Your Resources',
    message:
      'Good. You can see your credits accumulating here. Each resource type shows its current total and production rate. Keep clicking \u2014 you\u2019ll need credits to construct your first building.',
    type: 'spotlight',
    target: 'resource-bar',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'Continue',
    placement: 'bottom',
  },
  {
    id: 2,
    title: 'Build a Shelter',
    message:
      'Now, construct a Survival Shelter. Buildings generate resources passively \u2014 even when you are not clicking. Open the Buildings tab if you haven\u2019t already.',
    type: 'spotlight',
    target: 'building-survivalShelter',
    requiredTab: 'buildings',
    advanceMode: 'auto',
    placement: 'left',
  },
  {
    id: 3,
    title: 'Passive Income',
    message:
      'Excellent. Notice the +/s rate next to your credits \u2014 that is passive income from your Shelter. The Foundation must be self-sustaining. Buy more buildings to increase it.',
    type: 'spotlight',
    target: 'resource-credits',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'Continue',
    placement: 'bottom',
  },
  {
    id: 4,
    title: 'Unlock New Buildings',
    message:
      'Each building type unlocks when you own enough of the previous one. Build 3 Survival Shelters to unlock new structures for the colony.',
    type: 'spotlight',
    target: 'building-survivalShelter',
    requiredTab: 'buildings',
    advanceMode: 'auto',
    placement: 'left',
  },
  {
    id: 5,
    title: 'Discover Upgrades',
    message:
      'New buildings are available. Now, explore Upgrades \u2014 permanent enhancements to your production and clicking power. Every credit spent on upgrades pays for itself many times over.',
    type: 'spotlight',
    target: 'sidebar-upgrades',
    advanceMode: 'auto',
    placement: 'right',
  },
  {
    id: 6,
    title: 'Buy an Upgrade',
    message:
      'Purchase \u201CImproved Tools\u201D to boost your click value. Upgrades are one-time investments with powerful, lasting effects. This is the Foundation\u2019s way \u2014 technology as power.',
    type: 'spotlight',
    target: 'upgrade-improvedTools',
    requiredTab: 'upgrades',
    advanceMode: 'auto',
    placement: 'left',
  },
  {
    id: 7,
    title: 'The Path Forward',
    message:
      'You are on the right path. Continue building, upgrading, and expanding. When you have accumulated enough lifetime credits, the first Seldon Crisis will become available on the Prestige tab. It will reset your progress \u2014 but grant permanent Seldon Points that multiply all future production. That is how the Foundation endures.',
    type: 'spotlight',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'I understand',
    placement: 'bottom',
  },
  {
    id: 8,
    title: 'Meet Hari Seldon',
    message:
      'Seldon: I have assigned my finest student as your advisor. Navigate to the Research tab to meet your hero and begin research activities.',
    type: 'spotlight',
    target: 'sidebar-research',
    advanceMode: 'auto',
    placement: 'right',
  },
  {
    id: 9,
    title: 'Try a Research Project',
    message:
      'Research projects earn permanent artifacts that boost your production. Find \u201CCalibrate the Vault\u201D in the Projects list, select Hari Seldon as your hero, and start it. It only takes 5 seconds \u2014 then collect your reward.',
    type: 'spotlight',
    target: 'activity-vaultCalibration',
    requiredTab: 'research',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'I\u2019ll try it',
    placement: 'bottom',
  },
  {
    id: 10,
    title: 'Try a Mission',
    message:
      'Missions work the same way but are found on the Missions sub-tab. Try \u201CTerminus Perimeter Scan\u201D \u2014 another quick 5-second activity. You\u2019ll earn an Encyclopedia Volume, a different artifact from the one you just got. Assign a hero, start it, wait, and collect.',
    type: 'spotlight',
    target: 'activity-terminusPatrol',
    requiredTab: 'research',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'Got it',
    placement: 'bottom',
  },
  {
    id: 11,
    title: 'Check Your Inventory',
    message:
      'Your earned artifacts live in the Inventory tab. Artifacts give permanent passive bonuses that stack with quantity \u2014 the Prime Radiant boosts global production by 5%, while the Encyclopedia Volume adds 2%. Consumables are single-use timed buffs. Check your collection here anytime.',
    type: 'spotlight',
    target: 'research-inventory-tab',
    requiredTab: 'research',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'Got it',
    placement: 'bottom',
  },
  {
    id: 12,
    title: 'Heroes & Activities',
    message:
      'Heroes speed up research and mission activities. Hari Seldon is your starter hero \u2014 assign him to activities to complete them faster. As you progress, story events will unlock new heroes with even stronger abilities.',
    type: 'spotlight',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'Continue',
    placement: 'bottom',
  },
  {
    id: 13,
    title: 'Story Events',
    message:
      'Random story events will appear as you build the Foundation. Each presents choices with different rewards and consequences. Some rare events unlock powerful hidden heroes \u2014 the legends of the Foundation saga.',
    type: 'spotlight',
    advanceMode: 'acknowledge',
    acknowledgeLabel: 'I understand',
    placement: 'bottom',
  },
  {
    id: 14,
    title: 'Approaching Prestige',
    message:
      'Seldon: You are halfway to your first Seldon Crisis. The Plan proceeds as I have foreseen.',
    type: 'milestone',
    advanceMode: 'auto',
  },
  {
    id: 15,
    title: 'Prestige Available',
    message:
      'Seldon: The first Seldon Crisis is now available. Open the Prestige tab to advance the Foundation.',
    type: 'milestone',
    advanceMode: 'auto',
  },
  {
    id: 16,
    title: 'First Era Change',
    message:
      'Seldon: The Foundation enters the Trading Expansion era. My work here is done \u2014 but the Plan continues.',
    type: 'milestone',
    advanceMode: 'auto',
  },
  {
    id: 17,
    title: 'Build Your Fleet',
    message:
      'Seldon: The Trading Expansion era brings ships and trade routes. Build your fleet to earn resources from across the galaxy.',
    type: 'milestone',
    advanceMode: 'auto',
  },
];
