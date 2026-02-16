import { getDb } from '../connection.js';

export interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: number;
}

export function createUser(username: string, passwordHash: string): UserRow {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)'
  );
  const result = stmt.run(username, passwordHash);
  return findUserById(result.lastInsertRowid as number)!;
}

export function findUserByUsername(username: string): UserRow | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username) as UserRow | undefined;
}

export function findUserById(id: number): UserRow | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as UserRow | undefined;
}
