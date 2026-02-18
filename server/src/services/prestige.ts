import {
  PrestigePreview,
  PrestigeHistoryEntry,
  Era,
  ERA_UNLOCK_THRESHOLDS,
  ERA_DEFINITIONS,
} from '@foundation/shared';
import {
  calcSeldonPoints,
  calcPrestigeMultiplier,
} from '@foundation/shared';
import { calcCurrentEra } from '@foundation/shared';
import {
  getPrestigeHistory,
  addPrestigeEntry,
  resetForPrestige,
  resetForEraSwitch,
} from '../db/queries/prestige-queries.js';
import { getGameState, updateGameState } from '../db/queries/game-state-queries.js';
import {
  ValidationError,
  NotFoundError,
} from '../middleware/error-handler.js';
import { buildGameState } from './game-state.js';
import type { PrestigeResponse, ReplayEraResponse } from '@foundation/shared';

export async function previewPrestige(userId: number): Promise<PrestigePreview> {
  const state = await buildGameState(userId);

  const seldonPointsEarned = calcSeldonPoints(state.lifetimeCredits, state.currentEra);
  const newTotal = state.prestige.totalSeldonPoints + seldonPointsEarned;
  const newMultiplier = calcPrestigeMultiplier(newTotal);

  return {
    seldonPointsEarned,
    newTotal,
    newMultiplier,
    currentCredits: state.resources.credits,
  };
}

export async function triggerPrestige(userId: number): Promise<PrestigeResponse> {
  const state = await buildGameState(userId);

  const seldonPointsEarned = calcSeldonPoints(state.lifetimeCredits, state.currentEra);
  if (seldonPointsEarned <= 0) {
    throw new ValidationError(
      'You need at least 1 billion lifetime credits to earn Seldon Points'
    );
  }

  const newPrestigeCount = state.prestige.prestigeCount + 1;
  const newSeldonPoints = state.prestige.seldonPoints + seldonPointsEarned;
  const newTotalSP = state.prestige.totalSeldonPoints + seldonPointsEarned;
  const newMultiplier = calcPrestigeMultiplier(newTotalSP);

  await addPrestigeEntry(userId, {
    prestigeNumber: newPrestigeCount,
    creditsAtReset: state.resources.credits,
    seldonPointsEarned,
    eraAtReset: state.currentEra,
  });

  await resetForPrestige(userId, {
    seldonPoints: newSeldonPoints,
    totalSeldonPoints: newTotalSP,
    prestigeCount: newPrestigeCount,
    prestigeMultiplier: newMultiplier,
  });

  const updatedRow = await getGameState(userId);
  if (!updatedRow) {
    throw new NotFoundError('Game state not found after prestige');
  }

  const newTotalSeldonPoints = updatedRow.total_seldon_points;
  const newEra = calcCurrentEra(updatedRow.prestige_count, newTotalSeldonPoints, state.currentEra);

  await updateGameState(userId, { current_era: newEra });

  return {
    seldonPointsEarned,
    newPrestige: {
      seldonPoints: updatedRow.seldon_points,
      totalSeldonPoints: newTotalSeldonPoints,
      prestigeCount: updatedRow.prestige_count,
      prestigeMultiplier: updatedRow.prestige_multiplier,
    },
    newEra,
  };
}

export async function getPrestigeHistoryForUser(
  userId: number
): Promise<PrestigeHistoryEntry[]> {
  const rows = await getPrestigeHistory(userId);
  return rows.map((r) => ({
    prestigeNumber: r.prestige_number,
    creditsAtReset: r.credits_at_reset,
    seldonPointsEarned: r.seldon_points_earned,
    eraAtReset: r.era_at_reset,
    triggeredAt: r.triggered_at,
  }));
}

export async function replayEra(userId: number, targetEra: number): Promise<ReplayEraResponse> {
  const state = await buildGameState(userId);

  if (!(targetEra in ERA_DEFINITIONS)) {
    throw new ValidationError(`Invalid era: ${targetEra}`);
  }

  if (targetEra === state.currentEra) {
    throw new ValidationError('Cannot replay the era you are currently in');
  }

  const threshold = ERA_UNLOCK_THRESHOLDS[targetEra as Era];
  if (threshold.prestigeCount && state.prestige.prestigeCount < threshold.prestigeCount) {
    throw new ValidationError(`You have not unlocked this era yet`);
  }
  if (threshold.seldonPoints && state.prestige.totalSeldonPoints < threshold.seldonPoints) {
    throw new ValidationError(`You have not unlocked this era yet`);
  }

  await resetForEraSwitch(userId, targetEra, {
    seldonPoints: state.prestige.seldonPoints,
    totalSeldonPoints: state.prestige.totalSeldonPoints,
    prestigeCount: state.prestige.prestigeCount,
    prestigeMultiplier: state.prestige.prestigeMultiplier,
  });

  return { newEra: targetEra };
}
