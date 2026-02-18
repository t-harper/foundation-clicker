import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { createUser, findUserByUsername, findUserById, updateUserNickname } from '../db/queries/user-queries.js';
import { createGameState } from '../db/queries/game-state-queries.js';
import { unlockHero } from '../db/queries/hero-queries.js';
import {
  ValidationError,
  AuthenticationError,
} from '../middleware/error-handler.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'foundation-dev-secret-key';
const BCRYPT_ROUNDS = 10;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

interface AuthResult {
  token: string;
  userId: number;
  username: string;
  nickname: string | null;
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

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  let user;
  try {
    user = await createUser(trimmedUsername, passwordHash);
  } catch (err: any) {
    // TransactWriteItems fails if username reservation already exists
    if (err.name === 'TransactionCanceledException') {
      throw new ValidationError('Username is already taken');
    }
    throw err;
  }

  // Initialize game state and grant starter hero (no bulk init needed - sparse model)
  await createGameState(user.id);
  await unlockHero(user.id, 'hariSeldon', Math.floor(Date.now() / 1000));

  const token = generateToken(user.id, user.username);

  return {
    token,
    userId: user.id,
    username: user.username,
    nickname: null,
  };
}

export async function login(
  username: string,
  password: string
): Promise<AuthResult> {
  if (!username || !password) {
    throw new ValidationError('Username and password are required');
  }

  const user = await findUserByUsername(username.trim());
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
    userId: user.id,
    username: user.username,
    nickname: user.nickname ?? user.username,
  };
}

const NICKNAME_REGEX = /^[a-zA-Z0-9 \-]+$/;

export async function setNickname(userId: number, nickname: string): Promise<string> {
  if (!nickname || typeof nickname !== 'string') {
    throw new ValidationError('Nickname is required');
  }
  const trimmed = nickname.trim();
  if (trimmed.length < 2 || trimmed.length > 20) {
    throw new ValidationError('Nickname must be between 2 and 20 characters');
  }
  if (!NICKNAME_REGEX.test(trimmed)) {
    throw new ValidationError('Nickname can only contain letters, numbers, spaces, and hyphens');
  }
  await updateUserNickname(userId, trimmed);
  return trimmed;
}
