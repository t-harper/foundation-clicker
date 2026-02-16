import { getDb } from './connection.js';

interface Migration {
  id: string;
  up: string;
}

const migrations: Migration[] = [];

export function registerMigration(id: string, up: string): void {
  migrations.push({ id, up });
}

export function runMigrations(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      applied_at INTEGER DEFAULT (unixepoch())
    )
  `);

  const applied = new Set(
    db.prepare('SELECT id FROM _migrations').all().map((row: any) => row.id)
  );

  const sorted = [...migrations].sort((a, b) => a.id.localeCompare(b.id));

  for (const migration of sorted) {
    if (!applied.has(migration.id)) {
      db.transaction(() => {
        db.exec(migration.up);
        db.prepare('INSERT INTO _migrations (id) VALUES (?)').run(migration.id);
      })();
      console.log(`Applied migration: ${migration.id}`);
    }
  }
}
