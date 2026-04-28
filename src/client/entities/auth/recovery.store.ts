import { create } from 'zustand';
import type { RecoveryState } from '@frontend/entities/auth/shared/model/recovery-store.model';

export const useRecoveryStore = create<RecoveryState>((set) => ({
  email: '',
  code: '',
  isNavigating: false,
  setEmail: (email) => set({ email, isNavigating: true }),
  setCode: (code) => set({ code, isNavigating: true }),
  setNavigating: (value) => set({ isNavigating: value }),
  clear: () =>
    set({
      email: '',
      code: '',
      isNavigating: true,
    }),
}));
