import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import gameRouter from './routes/game.js';
import heroesRouter from './routes/heroes.js';
import activitiesRouter from './routes/activities.js';
import inventoryRouter from './routes/inventory.js';
import adminRouter from './routes/admin.js';
import leaderboardRouter from './routes/leaderboard.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? [process.env.ALLOWED_ORIGIN]
  : ['http://localhost:5173', 'http://10.254.0.212:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Mount route handlers
// Routes already define their full paths (e.g. /api/auth/login)
app.use(authRouter);
app.use(gameRouter);
app.use(heroesRouter);
app.use(activitiesRouter);
app.use(inventoryRouter);
app.use(adminRouter);
app.use(leaderboardRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
