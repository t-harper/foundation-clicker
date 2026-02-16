import React, { useState, useCallback } from 'react';
import { login, register } from '../api';
import { Button } from '../components/common';

type AuthMode = 'login' | 'register';

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!username.trim() || !password.trim()) {
        setError('Username and password are required.');
        return;
      }

      setLoading(true);
      try {
        if (mode === 'login') {
          await login(username.trim(), password);
        } else {
          await register(username.trim(), password);
        }
        onSuccess();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [mode, username, password, onSuccess],
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b08] text-[#f5e6d3] px-4">
      <div className="starfield" aria-hidden="true">
        <div className="star-layer" />
      </div>
      <div className="tech-grid" aria-hidden="true" style={{
        '--era-primary': '#d4a574',
      } as React.CSSProperties} />
      <div className="scanlines" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        {/* Title section */}
        <div className="text-center mb-8">
          <h1
            className="glitch-text text-5xl font-display font-bold tracking-wider text-[#c9952e] mb-2"
            data-text="FOUNDATION"
          >
            FOUNDATION
          </h1>
          <p className="text-sm text-[#d4a574]/70 tracking-widest uppercase">
            The Seldon Plan Awaits
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-[#1a1612] border border-[#c9952e]/30 rounded-lg p-8 modal-scifi"
          style={{ boxShadow: '0 0 15px rgba(201,149,46,0.25), 0 0 40px rgba(201,149,46,0.1), inset 0 1px 0 rgba(201,149,46,0.15)' }}
        >
          <h2 className="text-xl font-semibold text-[#c9952e] mb-6 text-center">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/40 border border-red-600/50 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#d4a574] mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-3 py-2.5 bg-[#2a2420] border border-[#c9952e]/30 rounded-md text-[#f5e6d3] placeholder-[#d4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c9952e] focus:border-transparent focus:shadow-[0_0_10px_rgba(201,149,46,0.3)] transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#d4a574] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full px-3 py-2.5 bg-[#2a2420] border border-[#c9952e]/30 rounded-md text-[#f5e6d3] placeholder-[#d4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c9952e] focus:border-transparent focus:shadow-[0_0_10px_rgba(201,149,46,0.3)] transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              onClick={() => {
                const form = document.querySelector('form');
                if (form) form.requestSubmit();
              }}
            >
              {mode === 'login' ? 'Enter the Vault' : 'Join the Foundation'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-[#c9952e]/70 hover:text-[#c9952e] transition-colors underline underline-offset-2"
            >
              {mode === 'login'
                ? "Don't have an account? Register"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#d4a574]/40">
          "Violence is the last refuge of the incompetent." — Salvor Hardin
        </p>
      </div>
    </div>
  );
}
