import type { AuthResponse } from '@foundation/shared';
import { apiClient } from './client.js';

const TOKEN_KEY = 'foundation_token';

export async function register(username: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', {
    username,
    password,
  });
  localStorage.setItem(TOKEN_KEY, response.token);
  return response;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', {
    username,
    password,
  });
  localStorage.setItem(TOKEN_KEY, response.token);
  return response;
}

export async function getMe(): Promise<{ user: { id: number; username: string; isAdmin: boolean } }> {
  return apiClient.get<{ user: { id: number; username: string; isAdmin: boolean } }>('/auth/me');
}
