import { create } from 'zustand';
import type { RecoveryState } from '@frontend/entities/auth/shared/model/recovery-store.model';

export const useRecoveryStore = create<RecoveryState>((set) => ({
  email: '',
  code: '',
  setEmail: (email) => set({ email }),
  setCode: (code) => set({ code }),
  clear: () =>
    set({
      email: '',
      code: '',
    }),
}));
