import { randomUUID } from 'crypto';
import {
  EVENT_DEFINITIONS,
  EVENT_BASE_CHANCE,
  ActiveEffect,
  EventHistoryEntry,
  ResourceKey,
  Resources,
} from '@foundation/shared';
import { areAllConditionsMet } from '@foundation/shared';
import {
  getEventHistory,
  getLastEventFiredAt,
  hasEventFired,
  insertEventHistory,
  getActiveEffects,
  insertActiveEffect,
  getPendingEvent,
  setPendingEvent,
  clearPendingEvent,
} from '../db/queries/event-queries.js';
import { buildGameState, projectResources } from './game-state.js';
import { updateGameState } from '../db/queries/game-state-queries.js';
import { unlockHero } from './hero.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import type { CheckEventsResponse, ChooseEventResponse } from '@foundation/shared';

function activeEffectRowToModel(row: ReturnType<typeof getActiveEffects> extends Promise<(infer T)[]> ? T : never): ActiveEffect {
  return {
    id: row.id,
    eventKey: row.event_key,
    choiceIndex: row.choice_index,
    effectType: row.effect_type as ActiveEffect['effectType'],
    resource: row.resource as ResourceKey | undefined,
    multiplier: row.multiplier,
    startedAt: row.started_at,
    expiresAt: row.expires_at,
  };
}

export async function getUserActiveEffects(userId: number): Promise<ActiveEffect[]> {
  const rows = await getActiveEffects(userId);
  return rows.map(activeEffectRowToModel);
}

export async function getUserEventHistory(userId: number): Promise<EventHistoryEntry[]> {
  const rows = await getEventHistory(userId);
  return rows.map((r) => ({
    eventKey: r.event_key,
    choiceIndex: r.choice_index,
    firedAt: r.fired_at,
  }));
}

export async function checkForEvent(userId: number): Promise<CheckEventsResponse> {
  const pending = await getPendingEvent(userId);
  if (pending) {
    return { event: { eventKey: pending } };
  }

  const state = await buildGameState(userId);
  const now = Math.floor(Date.now() / 1000);

  const eligible: { key: string; weight: number }[] = [];

  for (const [key, def] of Object.entries(EVENT_DEFINITIONS)) {
    if (state.currentEra < def.era) continue;

    if (!def.repeatable && await hasEventFired(userId, key)) continue;

    if (def.repeatable && def.cooldownSeconds > 0) {
      const lastFired = await getLastEventFiredAt(userId, key);
      if (lastFired !== null && now - lastFired < def.cooldownSeconds) continue;
    }

    if (!areAllConditionsMet(def.conditions, state)) continue;

    eligible.push({ key, weight: def.weight });
  }

  if (eligible.length === 0) {
    return { event: null };
  }

  if (Math.random() > EVENT_BASE_CHANCE) {
    return { event: null };
  }

  const totalWeight = eligible.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  let selectedKey = eligible[eligible.length - 1].key;
  for (const entry of eligible) {
    roll -= entry.weight;
    if (roll <= 0) {
      selectedKey = entry.key;
      break;
    }
  }

  await setPendingEvent(userId, selectedKey);

  return { event: { eventKey: selectedKey } };
}

export async function handleEventChoice(
  userId: number,
  eventKey: string,
  choiceIndex: number
): Promise<ChooseEventResponse> {
  const pending = await getPendingEvent(userId);
  if (!pending || pending !== eventKey) {
    throw new ValidationError('No matching pending event');
  }

  const def = EVENT_DEFINITIONS[eventKey];
  if (!def) {
    throw new NotFoundError(`Event not found: ${eventKey}`);
  }

  if (choiceIndex < 0 || choiceIndex >= def.choices.length) {
    throw new ValidationError(`Invalid choice index: ${choiceIndex}`);
  }

  const state = await buildGameState(userId);
  const projected = projectResources(state);
  const now = Math.floor(Date.now() / 1000);
  const choice = def.choices[choiceIndex];

  const resources = { ...projected.resources };

  for (const effect of choice.effects) {
    switch (effect.type) {
      case 'resourceGrant':
        resources[effect.resource] += effect.amount;
        break;
      case 'resourceLoss':
        resources[effect.resource] = Math.max(0, resources[effect.resource] - effect.amount);
        break;
      case 'resourcePercentGrant':
        resources[effect.resource] += resources[effect.resource] * (effect.percent / 100);
        break;
      case 'resourcePercentLoss':
        resources[effect.resource] *= 1 - effect.percent / 100;
        resources[effect.resource] = Math.max(0, resources[effect.resource]);
        break;
    }
  }

  await updateGameState(userId, {
    credits: resources.credits,
    knowledge: resources.knowledge,
    influence: resources.influence,
    nuclear_tech: resources.nuclearTech,
    raw_materials: resources.rawMaterials,
    last_tick_at: projected.lastTickAt,
    lifetime_credits: projected.lifetimeCredits +
      Math.max(0, resources.credits - projected.resources.credits),
  });

  await insertEventHistory(userId, eventKey, choiceIndex, now);
  await clearPendingEvent(userId);

  const newEffects: ActiveEffect[] = [];
  for (const effect of choice.effects) {
    if (
      effect.type === 'productionBuff' ||
      effect.type === 'productionDebuff' ||
      effect.type === 'globalProductionBuff' ||
      effect.type === 'globalProductionDebuff' ||
      effect.type === 'clickBuff' ||
      effect.type === 'clickDebuff'
    ) {
      const id = randomUUID();
      const resource = 'resource' in effect ? effect.resource : null;
      const expiresAt = now + effect.durationSeconds;

      await insertActiveEffect(
        id,
        userId,
        eventKey,
        choiceIndex,
        effect.type,
        resource ?? null,
        effect.multiplier,
        now,
        expiresAt
      );

      newEffects.push({
        id,
        eventKey,
        choiceIndex,
        effectType: effect.type,
        resource: resource as ResourceKey | undefined,
        multiplier: effect.multiplier,
        startedAt: now,
        expiresAt,
      });
    }
  }

  if (def.heroReward) {
    await unlockHero(userId, def.heroReward);
  }

  return { resources, newEffects };
}
