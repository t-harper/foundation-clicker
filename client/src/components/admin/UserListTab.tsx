import React, { useState, useEffect } from 'react';
import type { AdminUserSummary, Era } from '@foundation/shared';
import { ERA_DEFINITIONS } from '@foundation/shared';
import { useGameStore } from '../../store';
import {
  getAdminUsers,
  impersonateUser,
  deleteAdminUser,
  forcePasswordChange,
} from '../../api/admin';

interface UserListTabProps {
  onSelectUser: (userId: number, username: string) => void;
}

export function UserListTab({ onSelectUser }: UserListTabProps) {
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordModal, setPasswordModal] = useState<{ userId: number; username: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const startImpersonation = useGameStore((s) => s.startImpersonation);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await getAdminUsers();
      setUsers(res.users);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadUsers(); }, []);

  const handleImpersonate = async (userId: number) => {
    try {
      const currentToken = localStorage.getItem('foundation_token');
      if (!currentToken) return;
      const result = await impersonateUser(userId);
      startImpersonation(currentToken);
      localStorage.setItem('foundation_token', result.token);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impersonation failed');
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteAdminUser(userId);
      setDeleteConfirm(null);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordModal) return;
    try {
      await forcePasswordChange(passwordModal.userId, newPassword);
      setPasswordModal(null);
      setNewPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password change failed');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-[var(--era-text)]/40">
        <p className="animate-pulse">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
          <button type="button" onClick={() => setError(null)} className="ml-2 underline">dismiss</button>
        </div>
      )}

      <div className="text-sm text-[var(--era-text)]/50">
        {users.length} user{users.length !== 1 ? 's' : ''} registered
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--era-surface)]/30">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--era-surface)]/30 bg-[var(--era-surface)]/10">
              <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">ID</th>
              <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Username</th>
              <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Era</th>
              <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Prestiges</th>
              <th className="text-left px-3 py-2 font-medium text-[var(--era-text)]/60">Admin</th>
              <th className="text-right px-3 py-2 font-medium text-[var(--era-text)]/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[var(--era-surface)]/10 hover:bg-[var(--era-surface)]/10">
                <td className="px-3 py-2 text-[var(--era-text)]/40 font-mono text-xs">{user.id}</td>
                <td className="px-3 py-2 font-medium">{user.username}</td>
                <td className="px-3 py-2 text-[var(--era-text)]/60">
                  {ERA_DEFINITIONS[user.currentEra as Era]?.name ?? `Era ${user.currentEra}`}
                </td>
                <td className="px-3 py-2 text-[var(--era-text)]/60">{user.prestigeCount}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    user.isAdmin
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-[var(--era-surface)]/30 text-[var(--era-text)]/40'
                  }`}>
                    {user.isAdmin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onSelectUser(user.id, user.username)}
                      className="px-2 py-1 rounded text-xs bg-[var(--era-accent)]/10 text-[var(--era-accent)] hover:bg-[var(--era-accent)]/20 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleImpersonate(user.id)}
                      className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      Impersonate
                    </button>
                    <button
                      type="button"
                      onClick={() => setPasswordModal({ userId: user.id, username: user.username })}
                      className="px-2 py-1 rounded text-xs bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                    >
                      Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(user.id)}
                      className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Password change modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setPasswordModal(null)}>
          <div className="bg-[var(--era-bg)] border border-[var(--era-surface)] rounded-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Change Password: {passwordModal.username}</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 6 chars)"
              className="w-full px-3 py-2 rounded bg-white border border-[var(--era-surface)] text-black placeholder-gray-400 mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setPasswordModal(null)} className="px-3 py-1.5 rounded text-sm text-[var(--era-text)]/60 hover:bg-[var(--era-surface)]/30">Cancel</button>
              <button type="button" onClick={handlePasswordChange} className="px-3 py-1.5 rounded text-sm bg-[var(--era-accent)] text-[var(--era-bg)] font-semibold hover:opacity-90">Change</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[var(--era-bg)] border border-red-500/30 rounded-lg p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Delete User</h3>
            <p className="text-sm text-[var(--era-text)]/60 mb-4">
              This will permanently delete user #{deleteConfirm} and all their data. This cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 rounded text-sm text-[var(--era-text)]/60 hover:bg-[var(--era-surface)]/30">Cancel</button>
              <button type="button" onClick={() => handleDelete(deleteConfirm)} className="px-3 py-1.5 rounded text-sm bg-red-500 text-white font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
