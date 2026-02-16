import React, { useState } from 'react';
import { UserListTab } from './UserListTab';
import { UserDetailTab } from './UserDetailTab';

export function AdminPanel() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string>('');

  const handleSelectUser = (userId: number, username: string) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedUserId(null);
    setSelectedUsername('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-display font-semibold text-red-400">
          Admin Console
        </h2>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
          Admin
        </span>
      </div>

      {view === 'list' && (
        <UserListTab onSelectUser={handleSelectUser} />
      )}
      {view === 'detail' && selectedUserId !== null && (
        <UserDetailTab
          userId={selectedUserId}
          username={selectedUsername}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
