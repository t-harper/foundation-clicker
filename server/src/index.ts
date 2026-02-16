import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';
import { runMigrations } from './db/index.js';
import { setupWebSocketSync } from './ws/sync.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

async function main() {
  await runMigrations();

  const httpServer = createServer(app);
  setupWebSocketSync(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Foundation Game server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
