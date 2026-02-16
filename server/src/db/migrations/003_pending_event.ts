import { registerMigration } from '../migrate.js';

const up = `
  CREATE TABLE IF NOT EXISTS pending_event (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    event_key TEXT NOT NULL
  );
`;

registerMigration('003_pending_event', up);

export default up;
