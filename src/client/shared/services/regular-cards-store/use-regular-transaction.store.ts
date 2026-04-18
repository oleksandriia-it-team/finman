import { create } from 'zustand';
import { mockRegularTransactions } from '@frontend/shared/services/regular-cards-store/mock-card-data';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import type { RegularEntry } from '@common/records/regular-entry.record';

const RegularTransactionsKey = 'regular-transactions-storage';

type CreatePaymentDto = Omit<RegularEntry, 'id' | 'softDeleted' | 'date'>;

interface RegularTransactionStoreState {
  payments: RegularEntry[];
  create: (dto: CreatePaymentDto) => RegularEntry;
  softDelete: (id: string) => void;
  update: (payment: RegularEntry) => RegularEntry;
}

const getRegularTransactions = (): RegularEntry[] => {
  const stored = localStorageService.getItem<RegularEntry[]>(RegularTransactionsKey);

  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return mockRegularTransactions;
  }

  return stored.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));
};

export const useRegularTransactionStore = create<RegularTransactionStoreState>((set) => ({
  payments: getRegularTransactions(),

  create: (dto) => {
    let newPayment: RegularEntry;

    set((state) => {
      newPayment = {
        ...dto,
        id: Number(crypto.randomUUID()),
        softDeleted: 0,
        createdAt: new Date(),
      };
      const updatedPayments = [...state.payments, newPayment];

      localStorageService.setItem(RegularTransactionsKey, updatedPayments);
      return { payments: updatedPayments };
    });

    return newPayment!;
  },

  softDelete: (id) =>
    set((state) => {
      const updatedPayments = state.payments.map((p) => (p.id === id ? { ...p, softDeleted: true } : p));

      localStorageService.setItem(RegularTransactionsKey, updatedPayments);
      return { payments: updatedPayments };
    }),

  update: (payment) => {
    set((state) => {
      const updatedPayments = state.payments.map((p) => (p.id === payment.id ? payment : p));

      localStorageService.setItem(RegularTransactionsKey, updatedPayments);
      return { payments: updatedPayments };
    });

    return payment;
  },
}));
