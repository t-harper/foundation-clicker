import { getDb } from '../connection.js';
import { initializeBuildings } from './building-queries.js';
import { initializeUpgrades } from './upgrade-queries.js';
import { initializeTradeRoutes } from './trade-route-queries.js';
import { initializeAchievements } from './achievement-queries.js';

export interface PrestigeHistoryRow {
  id: number;
  user_id: number;
  prestige_number: number;
  credits_at_reset: number;
  seldon_points_earned: number;
  era_at_reset: number;
  triggered_at: number;
}

export function getPrestigeHistory(userId: number): PrestigeHistoryRow[] {
  const db = getDb();
  const stmt = db.prepare(
    'SELECT * FROM prestige_history WHERE user_id = ? ORDER BY prestige_number ASC'
  );
  return stmt.all(userId) as PrestigeHistoryRow[];
}

export function addPrestigeEntry(
  userId: number,
  data: {
    prestigeNumber: number;
    creditsAtReset: number;
    seldonPointsEarned: number;
    eraAtReset: number;
  }
): void {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const stmt = db.prepare(`
    INSERT INTO prestige_history (user_id, prestige_number, credits_at_reset, seldon_points_earned, era_at_reset, triggered_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    userId,
    data.prestigeNumber,
    data.creditsAtReset,
    data.seldonPointsEarned,
    data.eraAtReset,
    now
  );
}

export function resetForPrestige(
  userId: number,
  seldonPointsEarned: number
): void {
  const db = getDb();

  db.transaction(() => {
    // Delete user's buildings, upgrades, ships, trade routes
    db.prepare('DELETE FROM buildings WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM upgrades WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM ships WHERE user_id = ?').run(userId);
    db.prepare('DELETE FROM trade_routes WHERE user_id = ?').run(userId);

    // Reset game_state resources to 0, increment prestige_count, update seldon_points
    const now = Math.floor(Date.now() / 1000);
    db.prepare(`
      UPDATE game_state SET
        credits = 0,
        knowledge = 0,
        influence = 0,
        nuclear_tech = 0,
        raw_materials = 0,
        click_value = 1,
        current_era = 0,
        seldon_points = seldon_points + @seldon_points_earned,
        total_seldon_points = total_seldon_points + @seldon_points_earned,
        prestige_count = prestige_count + 1,
        prestige_multiplier = 1 + (total_seldon_points + @seldon_points_earned) * 0.01,
        last_tick_at = @now
      WHERE user_id = @user_id
    `).run({
      seldon_points_earned: seldonPointsEarned,
      now,
      user_id: userId,
    });

    // Re-initialize buildings, upgrades, trade routes
    initializeBuildings(userId);
    initializeUpgrades(userId);
    initializeTradeRoutes(userId);
    // Achievements persist across prestiges, so we don't re-initialize them
  })();
}
