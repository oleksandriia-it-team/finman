import { useRegularTransactionStore } from '@frontend/shared/services/regular-cards-store/use-regular-transaction.store';
import type { RegularEntry } from '@common/records/regular-entry.record';

type CreatePaymentDto = Omit<RegularEntry, 'id' | 'softDeleted' | 'date'>;

export function useRegularTransactions() {
  const store = useRegularTransactionStore();

  const payments = store.payments.filter((p) => !p.softDeleted);

  const handleCreate = (dto: CreatePaymentDto): RegularEntry => {
    return store.create(dto);
  };

  const handleDelete = (id: string): void => {
    store.softDelete(id);
  };

  const handleUpdate = (payment: RegularEntry): RegularEntry => {
    return store.update(payment);
  };

  return { payments, handleCreate, handleDelete, handleUpdate };
}
