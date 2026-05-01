import { type DefaultTableColumns } from '@common/models/default-table-columns.model';
import { type LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { useRef, useState } from 'react';
import { useLookupSelection } from './use-lookup-selection.hook';

const PAGE_SIZE = 20;

type DeleteMutation = {
  mutateAsync: (id: number) => Promise<unknown>;
};

type LookupMutations = {
  deleteMutation: DeleteMutation;
};

interface UseAdminLookupOptions<T extends DefaultTableColumns> {
  lookupType: LookupsTypeEnum;
  queryKey: string[];
  useMutations: () => LookupMutations;
  getDeleteName: (item: T) => string;
  singleDeleteDescription: (name: string) => string;
}

export function useAdminLookup<T extends DefaultTableColumns>({
  lookupType,
  queryKey,
  useMutations,
  getDeleteName,
  singleDeleteDescription,
}: UseAdminLookupOptions<T>) {
  const selection = useLookupSelection();
  const { showToast } = useGlobalToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const singleDeleteTriggerRef = useRef<HTMLButtonElement>(null);
  const bulkDeleteTriggerRef = useRef<HTMLButtonElement>(null);

  const pagination = usePaginationResource<T, object>({
    queryKey,
    pageSize: PAGE_SIZE,
    getOptionsFn: async (page) =>
      (await lookupsService.getItems(lookupType, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {})) as unknown as T[],
    getTotalCountFn: () => lookupsService.getTotalCount(lookupType, {}),
  });

  const { deleteMutation } = useMutations();

  const openCreateForm = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (item: T) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const requestSingleDelete = (item: T) => {
    setItemToDelete(item);
    singleDeleteTriggerRef.current?.click();
  };

  const requestBulkDelete = () => {
    if (selection.hasSelection) {
      bulkDeleteTriggerRef.current?.click();
    }
  };

  const confirmSingleDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteMutation.mutateAsync(itemToDelete.id);
      selection.deselect(itemToDelete.id);
      showToast({ title: 'Успішно', description: 'Запис видалено', variant: 'default' });
    } catch {
      return;
    } finally {
      setItemToDelete(null);
      pagination.reload();
    }
  };

  const confirmBulkDelete = async () => {
    const results = await Promise.allSettled(
      Array.from(selection.selected).map((id) => deleteMutation.mutateAsync(id)),
    );
    const hasFailed = results.some((result) => result.status === 'rejected');

    showToast(
      hasFailed
        ? { title: 'Помилка', description: 'Деякі записи не вдалось видалити', variant: 'destructive' }
        : { title: 'Успішно', description: 'Вибрані записи видалено', variant: 'default' },
    );

    selection.clearSelection();
    pagination.reload();
  };

  return {
    ...pagination,
    pageSize: PAGE_SIZE,
    selection,
    isFormOpen,
    setIsFormOpen,
    editingItem,
    openCreateForm,
    openEditForm,
    itemToDelete,
    singleDeleteTriggerRef,
    bulkDeleteTriggerRef,
    requestSingleDelete,
    requestBulkDelete,
    confirmSingleDelete,
    confirmBulkDelete,
    singleDeleteDescription: itemToDelete ? singleDeleteDescription(getDeleteName(itemToDelete)) : '',
  };
}
