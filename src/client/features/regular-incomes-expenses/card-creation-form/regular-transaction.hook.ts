import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';
import { useRegularTransactionStore } from '@frontend/shared/services/regular-cards-store/use-regular-transaction.store';

type CreatePaymentDto = Omit<RegularTransactionRecord, 'id' | 'softDeleted' | 'date'>;

export function useRegularTransactions() {
  const store = useRegularTransactionStore();

  const payments = store.payments.filter((p) => !p.softDeleted);

  const handleCreate = (dto: CreatePaymentDto): RegularTransactionRecord => {
    return store.create(dto);
  };

  const handleDelete = (id: string): void => {
    store.softDelete(id);
  };

  const handleUpdate = (payment: RegularTransactionRecord): RegularTransactionRecord => {
    return store.update(payment);
  };

  return { payments, handleCreate, handleDelete, handleUpdate };
}
