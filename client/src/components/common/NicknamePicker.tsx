import React, { useState } from 'react';
import { setNickname as setNicknameApi } from '../../api/auth';
import { Button } from './Button';

export interface NicknamePickerProps {
  defaultNickname: string;
  onComplete: (nickname: string) => void;
}

export function NicknamePicker({ defaultNickname, onComplete }: NicknamePickerProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const value = nickname.trim() || defaultNickname;
    setError(null);
    setLoading(true);
    try {
      await setNicknameApi(value);
      onComplete(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set nickname');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await setNicknameApi(defaultNickname);
      onComplete(defaultNickname);
    } catch {
      onComplete(defaultNickname);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-[#c9952e] mb-2">Choose a Display Name</h2>
      <p className="text-sm text-[#d4a574]/70 mb-6">
        This name will be shown on leaderboards. You can change it later in settings.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-900/40 border border-red-600/50 text-red-300 text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder={defaultNickname}
        maxLength={20}
        className="w-full px-3 py-2.5 bg-[#2a2420] border border-[#c9952e]/30 rounded-md text-[#f5e6d3] placeholder-[#d4a574]/40 focus:outline-none focus:ring-2 focus:ring-[#c9952e] focus:border-transparent mb-4"
      />

      <Button
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full mb-3"
        onClick={handleSubmit}
      >
        Set Display Name
      </Button>

      <button
        type="button"
        onClick={handleSkip}
        disabled={loading}
        className="text-sm text-[#c9952e]/70 hover:text-[#c9952e] transition-colors underline underline-offset-2"
      >
        Skip (use username)
      </button>
    </div>
  );
}
