import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { createUser, findUserByUsername } from '../db/queries/user-queries.js';
import { createGameState } from '../db/queries/game-state-queries.js';
import { initializeBuildings } from '../db/queries/building-queries.js';
import { initializeUpgrades } from '../db/queries/upgrade-queries.js';
import { initializeTradeRoutes } from '../db/queries/trade-route-queries.js';
import { initializeAchievements } from '../db/queries/achievement-queries.js';
import {
  ValidationError,
  AuthenticationError,
} from '../middleware/error-handler.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'foundation-dev-secret-key';
const BCRYPT_ROUNDS = 10;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

interface UserInfo {
  id: number;
  username: string;
}

interface AuthResult {
  token: string;
  user: UserInfo;
}

function validateRegistrationInput(username: string, password: string): void {
  if (!username || typeof username !== 'string') {
    throw new ValidationError('Username is required');
  }

  if (!password || typeof password !== 'string') {
    throw new ValidationError('Password is required');
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
    throw new ValidationError(
      'Username must be between 3 and 20 characters'
    );
  }

  if (!USERNAME_REGEX.test(trimmedUsername)) {
    throw new ValidationError(
      'Username must contain only alphanumeric characters'
    );
  }

  if (password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters');
  }
}

export function generateToken(userId: number, username: string): string {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });
}

export async function register(
  username: string,
  password: string
): Promise<AuthResult> {
  validateRegistrationInput(username, password);

  const trimmedUsername = username.trim();

  const existingUser = findUserByUsername(trimmedUsername);
  if (existingUser) {
    throw new ValidationError('Username is already taken');
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = createUser(trimmedUsername, passwordHash);

  // Initialize all game state for the new user
  createGameState(user.id);
  initializeBuildings(user.id);
  initializeUpgrades(user.id);
  initializeTradeRoutes(user.id);
  initializeAchievements(user.id);

  const token = generateToken(user.id, user.username);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

export async function login(
  username: string,
  password: string
): Promise<AuthResult> {
  if (!username || !password) {
    throw new ValidationError('Username and password are required');
  }

  const user = findUserByUsername(username.trim());
  if (!user) {
    throw new AuthenticationError('Invalid username or password');
  }

  const passwordValid = await bcrypt.compare(password, user.password_hash);
  if (!passwordValid) {
    throw new AuthenticationError('Invalid username or password');
  }

  const token = generateToken(user.id, user.username);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}
