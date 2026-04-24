import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { regularEntryService } from '@frontend/features/regular-entry/regular-entry.service';

export type CreateRegularEntryDto = Omit<RegularEntry, DefaultColumnKeys>;

export function useRegularTransactions() {
  const stripDefaultColumns = (dto: object): CreateRegularEntryDto => {
    const { id, softDeleted, createdAt, updatedAt, ...clean } = dto as RegularEntry;
    return clean as CreateRegularEntryDto;
  };

  const getPayments = (from: number, to: number): Promise<RegularEntry[]> => {
    return regularEntryService.getItems(from, to).then((result) => result ?? []);
  };

  const getTotalCount = (): Promise<number> => {
    return regularEntryService.getTotalCount().then((count) => count ?? 0);
  };

  const handleCreate = (dto: CreateRegularEntryDto): Promise<number> => {
    const clean = stripDefaultColumns(dto);

    const newId = Date.now();

    const payload = {
      ...clean,
      id: newId,
      softDeleted: 0,
      createdAt: new Date(),
    };

    return regularEntryService.createItem(payload as unknown as CreateRegularEntryDto);
  };

  const handleDelete = (id: number): Promise<true> => {
    return regularEntryService.deleteItem(id);
  };

  const handleUpdate = (id: number, dto: CreateRegularEntryDto): Promise<true> => {
    return regularEntryService.updateItem(id, stripDefaultColumns(dto));
  };

  return { getPayments, getTotalCount, handleCreate, handleDelete, handleUpdate };
}
