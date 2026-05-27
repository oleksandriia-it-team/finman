import type { AttachOperationsListModalProps } from '@frontend/features/tracking-operation/attach/props/attach-operations-list-modal.props';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useGetOperationsForAttach } from '@frontend/features/tracking-operation/attach/hooks/get-operations-for-attach.hook';
import { useMemo, useState } from 'react';
import { useDebounce } from '@frontend/shared/hooks/debounce/debounce.hook';
import { SelectTransactionCard } from '@frontend/entities/operations/select-transaction-card/select-transaction-card';
import { useFormContext } from 'react-hook-form';
import { searchItem } from '@common/utils/search-item.util';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiInput } from '@frontend/ui/ui-input/ui-input';
import type { TrackingOperationFormData } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

export function TrackingOperationAttachedOperationListModal({ trigger }: AttachOperationsListModalProps) {
  const [search, setSearch] = useState('');
  const { operations } = useGetOperationsForAttach();
  const debouncedSearch = useDebounce(search.trim());
  const { setValue, watch, subscribe } = useFormContext<TrackingOperationFormData>();

  const attachedPlannedMonthEntryId = watch('attachedPlannedMonthEntryId');
  const attachedPlannedRegEntryId = watch('attachedPlannedRegEntryId');
  const category = watch('category');

  subscribe({
    name: ['category', 'date'],
    callback: () => {
      setSearch('');
    },
  });

  const monthOpWithAllProps = useMemo(() => {
    const onMonthOpSelect = (id: number) => {
      setValue('attachedPlannedRegEntryId', null);
      setValue('attachedPlannedMonthEntryId', id);
    };

    return operations.month
      .filter(
        (entry) =>
          category === entry.category &&
          (searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch)),
      )
      .map((entry) => ({ entry, onSelect: onMonthOpSelect, isSelected: attachedPlannedMonthEntryId === entry.id }));
  }, [attachedPlannedMonthEntryId, category, debouncedSearch, operations.month, setValue]);

  const regOpWithAllProps = useMemo(() => {
    const onRegOpSelect = (id: number) => {
      setValue('attachedPlannedMonthEntryId', null);
      setValue('attachedPlannedRegEntryId', id);
    };

    return operations.regular
      .filter(
        (entry) =>
          category === entry.category &&
          (searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch)),
      )
      .map((entry) => ({ entry, onSelect: onRegOpSelect, isSelected: attachedPlannedRegEntryId === entry.id }));
  }, [attachedPlannedRegEntryId, category, debouncedSearch, operations.regular, setValue]);

  const allOpWithProps = useMemo(
    () => [...regOpWithAllProps, ...monthOpWithAllProps],
    [monthOpWithAllProps, regOpWithAllProps],
  );

  return (
    <UiModal>
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>
      <UiModalContent>
        <UiModalHeader>
          <UiModalTitle className="flex gap-2">
            <UiSvgIcon
              name="lightning-charge-fill"
              className="!text-primary"
            />
            Прикріпити заплановану операцію з бюджетного плану
          </UiModalTitle>
        </UiModalHeader>

        <div className="flex flex-col gap-2">
          {(allOpWithProps.length > 0 || !!debouncedSearch) && (
            <UiInput
              onChange={(value) => setSearch(value ?? '')}
              value={search}
              placeholder="Пошук операції"
            />
          )}

          <div className="flex flex-col gap-2 overflow-auto">
            {allOpWithProps.length === 0 && (
              <UiDescription
                size="xs"
                className="py-4 text-center"
              >
                {!!debouncedSearch
                  ? 'Не знайдено'
                  : 'Не знайдено. Можливо бюджетного плану на обрану дату не існує, або немає за обраною категорією та типом'}
              </UiDescription>
            )}

            {allOpWithProps.map((props) => (
              <SelectTransactionCard
                key={`${props.entry.id}-${props.entry.title}-${props.entry.description}`}
                {...props}
              />
            ))}
          </div>
        </div>

        <UiSeparator />

        {allOpWithProps.length !== 0 && (
          <UiModalFooter className="!justify-between">
            <UiButton
              variant="destructive"
              onClick={() => {
                setValue('attachedPlannedRegEntryId', null);
                setValue('attachedPlannedMonthEntryId', null);
              }}
            >
              Очистити
            </UiButton>

            <UiModalClose asChild>
              <UiButton variant="primary">Застосувати</UiButton>
            </UiModalClose>
          </UiModalFooter>
        )}
      </UiModalContent>
    </UiModal>
  );
}
