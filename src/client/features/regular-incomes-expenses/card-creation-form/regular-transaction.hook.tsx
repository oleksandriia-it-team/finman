import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { regularEntryService } from '@frontend/features/regular-incomes-expenses/regular-entry.service';
import constate from 'constate';

export type CreateRegularEntryDto = Omit<RegularEntry, DefaultColumnKeys>;

function useRegularTransactionsLogic() {
  const getPayments = (from: number, to: number): Promise<RegularEntry[]> => {
    return regularEntryService.getItems(from, to).then((result) => {
      return result;
    });
  };

  const getTotalCount = (): Promise<number> => {
    return regularEntryService.getTotalCount().then((count) => count ?? 0);
  };

  const handleCreate = (dto: CreateRegularEntryDto): Promise<number> => {
    return regularEntryService.createItem(dto);
  };

  const handleDelete = (id: number): Promise<true> => {
    return regularEntryService.deleteItem(id);
  };

  const handleUpdate = (id: number, dto: CreateRegularEntryDto): Promise<true> => {
    return regularEntryService.updateItem(id, dto);
  };

  const getById = (id: number): Promise<RegularEntry | null> => {
    return regularEntryService.getItemById(id);
  };

  return { getPayments, getTotalCount, handleCreate, handleDelete, handleUpdate, getById };
}

export const [RegularIncomesExpensesProvider, useRegularTransactions] = constate(useRegularTransactionsLogic);
