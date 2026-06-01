import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from '@frontend/shared/hooks/debounce/debounce.hook';
import { searchItem } from '@common/utils/search-item.util';
import type { TrackingOperationFormData } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { useAttachState } from '@frontend/features/tracking-operation/attach/hooks/attach-state.context';

export function useAttachOperationsList() {
  const { operations, search } = useAttachState();
  const { watch, setValue } = useFormContext<TrackingOperationFormData>();

  const debouncedSearch = useDebounce(search.trim());

  const attachedPlannedMonthEntryId = watch('attachedPlannedMonthEntryId');
  const attachedPlannedRegEntryId = watch('attachedPlannedRegEntryId');
  const category = watch('category');

  const monthItems = useMemo(() => {
    const onSelect = (id: number) => {
      setValue('attachedPlannedRegEntryId', null);
      setValue('attachedPlannedMonthEntryId', id);
    };

    return operations.month
      .filter(
        (entry) =>
          category === entry.category &&
          entry.selected &&
          (searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch)),
      )
      .map((entry) => ({ entry, onSelect, isSelected: attachedPlannedMonthEntryId === entry.id }));
  }, [attachedPlannedMonthEntryId, category, debouncedSearch, operations.month, setValue]);

  const regItems = useMemo(() => {
    const onSelect = (id: number) => {
      setValue('attachedPlannedMonthEntryId', null);
      setValue('attachedPlannedRegEntryId', id);
    };

    return operations.regular
      .filter(
        (entry) =>
          category === entry.category &&
          (searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch)),
      )
      .map((entry) => ({ entry, onSelect, isSelected: attachedPlannedRegEntryId === entry.id }));
  }, [attachedPlannedRegEntryId, category, debouncedSearch, operations.regular, setValue]);

  return { items: [...regItems, ...monthItems], debouncedSearch };
}
