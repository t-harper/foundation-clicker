import React, { useState, useCallback } from 'react';
import { login, register } from '@desktop/api';
import { NicknamePicker } from '@desktop/components/common/NicknamePicker';

type AuthMode = 'login' | 'register';

export function MobileLoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNicknamePicker, setShowNicknamePicker] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState('');

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
          onSuccess();
        } else {
          const result = await register(username.trim(), password);
          if (result.nickname === null) {
            setRegisteredUsername(result.username);
            setShowNicknamePicker(true);
            return;
          }
          onSuccess();
        }
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
    <div className="mobile-vh flex flex-col items-center justify-center bg-[#0d0b08] text-[#f5e6d3] px-5 safe-top safe-bottom">
      {/* Simplified background */}
      <div className="starfield-mobile" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display font-bold tracking-wider text-[#c9952e] mb-1">
            FOUNDATION
          </h1>
          <p className="text-xs text-[#d4a574]/70 tracking-widest uppercase">
            The Seldon Plan Awaits
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-[#1a1612] border border-[#c9952e]/30 rounded-lg p-6 modal-scifi"
          style={{ boxShadow: '0 0 15px rgba(201,149,46,0.25), 0 0 40px rgba(201,149,46,0.1)' }}
        >
          {showNicknamePicker ? (
            <NicknamePicker
              defaultNickname={registeredUsername}
              onComplete={() => onSuccess()}
            />
          ) : (
            <>
              <h2 className="text-lg font-semibold text-[#c9952e] mb-5 text-center">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded bg-red-900/40 border border-red-600/50 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[#d4a574] mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="w-full px-3 py-3 bg-[#2a2420] border border-[#c9952e]/30 rounded-md text-[#f5e6d3] placeholder-[#d4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c9952e] focus:border-transparent text-base"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#d4a574] mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full px-3 py-3 bg-[#2a2420] border border-[#c9952e]/30 rounded-md text-[#f5e6d3] placeholder-[#d4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c9952e] focus:border-transparent text-base"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#c9952e] text-[#1a1612] rounded-md font-semibold text-base touch-action-manipulation disabled:opacity-50 active:opacity-80 transition-opacity"
                >
                  {loading
                    ? 'Please wait...'
                    : mode === 'login'
                      ? 'Enter the Vault'
                      : 'Join the Foundation'}
                </button>
              </form>

              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-[#c9952e]/70 active:text-[#c9952e] transition-colors underline underline-offset-2 touch-action-manipulation"
                >
                  {mode === 'login'
                    ? "Don't have an account? Register"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-[#d4a574]/40">
          "Violence is the last refuge of the incompetent." — Salvor Hardin
        </p>
      </div>
    </div>
  );
}
