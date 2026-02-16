import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import gameRouter from './routes/game.js';
import buildingsRouter from './routes/buildings.js';
import upgradesRouter from './routes/upgrades.js';
import shipsRouter from './routes/ships.js';
import tradeRouter from './routes/trade.js';
import prestigeRouter from './routes/prestige.js';
import achievementsRouter from './routes/achievements.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://10.254.0.212:5173'],
  credentials: true,
}));

app.use(express.json());

// Mount route handlers
// Routes already define their full paths (e.g. /api/auth/login)
app.use(authRouter);
app.use(gameRouter);
app.use(buildingsRouter);
app.use(upgradesRouter);
app.use(shipsRouter);
app.use(tradeRouter);
app.use(prestigeRouter);
app.use(achievementsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
