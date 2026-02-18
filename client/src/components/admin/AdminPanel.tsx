import React, { useState } from 'react';
import { UserListTab } from './UserListTab';
import { UserDetailTab } from './UserDetailTab';
import { DashboardTab } from './DashboardTab';

type AdminTab = 'dashboard' | 'users';

export function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('dashboard');
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

      <div className="flex gap-1 bg-white/5 rounded-lg p-1 w-fit">
        {(['dashboard', 'users'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); if (t === 'users') setView('list'); }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              tab === t
                ? 'bg-red-500/20 text-red-400 font-medium'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            {t === 'dashboard' ? 'Dashboard' : 'Users'}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && <DashboardTab />}

      {tab === 'users' && view === 'list' && (
        <UserListTab onSelectUser={handleSelectUser} />
      )}
      {tab === 'users' && view === 'detail' && selectedUserId !== null && (
        <UserDetailTab
          userId={selectedUserId}
          username={selectedUsername}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
