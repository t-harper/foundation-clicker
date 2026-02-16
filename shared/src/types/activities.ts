import { Era } from './eras.js';
import { Resources } from './resources.js';
import { HeroKey } from './heroes.js';

export type ActivityKey = string;

export type ActivityType = 'research' | 'mission';

export interface ItemReward {
  itemKey: string;
  quantity: number;
}

export interface ActivityDefinition {
  key: ActivityKey;
  name: string;
  description: string;
  era: Era;
  type: ActivityType;
  cost: Partial<Resources>;
  durationSeconds: number;
  rewards: ItemReward[];
  repeatable: boolean;
  maxCompletions: number | null;
}

export interface ActiveActivity {
  activityKey: ActivityKey;
  heroKey: HeroKey;
  startedAt: number;
  completesAt: number;
}

export interface ActivityState {
  activityKey: ActivityKey;
  timesCompleted: number;
}
