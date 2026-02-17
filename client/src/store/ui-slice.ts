import type { StateCreator } from 'zustand';
import type { Resources } from '@foundation/shared';
import type { StoreState } from './index.js';

export type ActiveTab =
  | 'buildings'
  | 'colonyMap'
  | 'upgrades'
  | 'ships'
  | 'achievements'
  | 'events'
  | 'encyclopedia'
  | 'prestige'
  | 'research'
  | 'admin';

export type BuyAmount = 1 | 10 | 50 | 100 | 'max';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface UISlice {
  // State
  activeTab: ActiveTab;
  buyAmount: BuyAmount;
  showSettings: boolean;
  showOfflineModal: boolean;
  offlineEarnings: Resources | null;
  offlineSeconds: number;
  notifications: Notification[];
  isSaving: boolean;
  isAdmin: boolean;
  isImpersonating: boolean;
  originalAdminToken: string | null;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  setBuyAmount: (amount: BuyAmount) => void;
  toggleSettings: () => void;
  showOfflineEarnings: (earnings: Resources, seconds: number) => void;
  hideOfflineModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setIsSaving: (saving: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  startImpersonation: (originalToken: string) => void;
  stopImpersonation: () => void;
}

let notificationCounter = 0;

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (set) => ({
  // Initial state
  activeTab: 'buildings',
  buyAmount: 1,
  showSettings: false,
  showOfflineModal: false,
  offlineEarnings: null,
  offlineSeconds: 0,
  notifications: [],
  isSaving: false,
  isAdmin: false,
  isImpersonating: !!localStorage.getItem('foundation_admin_token'),
  originalAdminToken: localStorage.getItem('foundation_admin_token'),

  // Actions
  setActiveTab: (tab) =>
    set({ activeTab: tab }),

  setBuyAmount: (amount) =>
    set({ buyAmount: amount }),

  toggleSettings: () =>
    set((state) => ({ showSettings: !state.showSettings })),

  showOfflineEarnings: (earnings, seconds) =>
    set({
      showOfflineModal: true,
      offlineEarnings: earnings,
      offlineSeconds: seconds,
    }),

  hideOfflineModal: () =>
    set({
      showOfflineModal: false,
      offlineEarnings: null,
      offlineSeconds: 0,
    }),

  addNotification: (notification) => {
    const id = `notification-${++notificationCounter}-${Date.now()}`;
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setIsSaving: (saving) =>
    set({ isSaving: saving }),

  setIsAdmin: (isAdmin) =>
    set({ isAdmin }),

  startImpersonation: (originalToken) => {
    localStorage.setItem('foundation_admin_token', originalToken);
    set({ isImpersonating: true, originalAdminToken: originalToken });
  },

  stopImpersonation: () => {
    const token = localStorage.getItem('foundation_admin_token');
    if (token) {
      localStorage.setItem('foundation_token', token);
      localStorage.removeItem('foundation_admin_token');
    }
    set({ isImpersonating: false, originalAdminToken: null });
    window.location.reload();
  },
});
