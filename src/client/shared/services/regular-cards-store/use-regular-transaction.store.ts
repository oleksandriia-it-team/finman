import { create } from 'zustand';
import { mockRegularTransactions } from '@frontend/shared/services/regular-cards-store/mock-card-data';
import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';

const RegularTransactionsKey = 'regular-transactions-storage';

type CreatePaymentDto = Omit<RegularTransactionRecord, 'id' | 'softDeleted' | 'date'>;

interface RegularTransactionStoreState {
  payments: RegularTransactionRecord[];
  create: (dto: CreatePaymentDto) => RegularTransactionRecord;
  softDelete: (id: string) => void;
  update: (payment: RegularTransactionRecord) => RegularTransactionRecord;
}

const getRegularTransactions = (): RegularTransactionRecord[] => {
  const stored = localStorageService.getItem<RegularTransactionRecord[]>(RegularTransactionsKey);

  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return mockRegularTransactions;
  }

  return stored.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));
};

export const useRegularTransactionStore = create<RegularTransactionStoreState>((set) => ({
  payments: getRegularTransactions(),

  create: (dto) => {
    let newPayment: RegularTransactionRecord; // Declare outside to return it

    set((state) => {
      newPayment = {
        ...dto,
        id: crypto.randomUUID(),
        softDeleted: false,
        date: new Date(),
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
