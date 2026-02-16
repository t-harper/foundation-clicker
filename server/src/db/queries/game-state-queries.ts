import { getDb } from '../connection.js';

export interface GameStateRow {
  user_id: number;
  credits: number;
  knowledge: number;
  influence: number;
  nuclear_tech: number;
  raw_materials: number;
  click_value: number;
  current_era: number;
  seldon_points: number;
  total_seldon_points: number;
  prestige_count: number;
  prestige_multiplier: number;
  last_tick_at: number | null;
  total_play_time: number;
  total_clicks: number;
  lifetime_credits: number;
}

export function createGameState(userId: number): GameStateRow {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO game_state (user_id, last_tick_at) VALUES (?, ?)'
  );
  const now = Math.floor(Date.now() / 1000);
  stmt.run(userId, now);
  return getGameState(userId)!;
}

export function getGameState(userId: number): GameStateRow | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM game_state WHERE user_id = ?');
  return stmt.get(userId) as GameStateRow | undefined;
}

export function updateGameState(
  userId: number,
  data: Partial<Omit<GameStateRow, 'user_id'>>
): void {
  const db = getDb();
  const columns = Object.keys(data);
  if (columns.length === 0) return;

  const setClause = columns.map((col) => `${col} = @${col}`).join(', ');
  const stmt = db.prepare(
    `UPDATE game_state SET ${setClause} WHERE user_id = @user_id`
  );
  stmt.run({ ...data, user_id: userId });
}

export function updateResources(
  userId: number,
  resources: {
    credits?: number;
    knowledge?: number;
    influence?: number;
    nuclear_tech?: number;
    raw_materials?: number;
  }
): void {
  const db = getDb();
  const columns = Object.keys(resources).filter(
    (k) => resources[k as keyof typeof resources] !== undefined
  );
  if (columns.length === 0) return;

  const setClause = columns.map((col) => `${col} = @${col}`).join(', ');
  const stmt = db.prepare(
    `UPDATE game_state SET ${setClause} WHERE user_id = @user_id`
  );
  stmt.run({ ...resources, user_id: userId });
}
