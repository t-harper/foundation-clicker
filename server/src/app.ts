import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import gameRouter from './routes/game.js';
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

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
