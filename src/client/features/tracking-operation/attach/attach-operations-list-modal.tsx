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

export function TrackingOperationAttachedOperationListModal({ trigger }: AttachOperationsListModalProps) {
  const [search, setSearch] = useState('');
  const { operations } = useGetOperationsForAttach();
  const debouncedSearch = useDebounce(search);
  const { setValue, watch, resetField } = useFormContext();

  const attachedPlannedMonthEntryId = watch('attachedPlannedMonthEntryId') as number | undefined | null;
  const attachedPlannedRegEntryId = watch('attachedPlannedRegEntryId') as number | undefined | null;

  const monthOpWithAllProps = useMemo(() => {
    const onMonthOpSelect = (id: number) => {
      setValue('attachedPlannedMonthEntryId', id);
    };

    return operations.month
      .filter(
        (entry) => searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch),
      )
      .map((entry) => ({ entry, onSelect: onMonthOpSelect, isSelected: attachedPlannedMonthEntryId === entry.id }));
  }, [attachedPlannedMonthEntryId, debouncedSearch, operations.month, setValue]);

  const regOpWithAllProps = useMemo(() => {
    const onRegOpSelect = (id: number) => {
      setValue('attachedPlannedRegEntryId', id);
    };

    return operations.regular
      .filter(
        (entry) => searchItem(entry.title, debouncedSearch) || searchItem(entry.description ?? '', debouncedSearch),
      )
      .map((entry) => ({ entry, onSelect: onRegOpSelect, isSelected: attachedPlannedRegEntryId === entry.id }));
  }, [attachedPlannedRegEntryId, debouncedSearch, operations.regular, setValue]);

  const allOpWithProps = useMemo(() => [...regOpWithAllProps, ...monthOpWithAllProps], []);

  return (
    <UiModal>
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>
      <UiModalContent>
        <UiModalHeader>
          <UiModalTitle>
            <UiSvgIcon
              name="lightning-charge-fill"
              className="text-primary-muted-foreground"
            />
            Прикріпити заплановану операцію з бюджетного плану
          </UiModalTitle>
        </UiModalHeader>

        <div className="flex flex-col gap-1">
          <UiInput
            onChange={(value) => setSearch(value ?? '')}
            value={search}
            placeholder="Пошук операції"
          />

          <div className="flex flex-col gap-2 overflow-auto">
            {allOpWithProps.map((props) => (
              <SelectTransactionCard
                key={`${props.entry.id}-${props.entry.title}-${props.entry.description}`}
                {...props}
              />
            ))}
          </div>
        </div>

        <UiSeparator />

        <UiModalFooter className="!justify-between">
          <UiButton
            variant="destructive"
            onClick={() => {
              resetField('attachedPlannedRegEntryId');
              resetField('attachedPlannedMonthEntryId');
            }}
          >
            Очистити
          </UiButton>

          <UiModalClose asChild>
            <UiButton variant="primary">Застосувати</UiButton>
          </UiModalClose>
        </UiModalFooter>
      </UiModalContent>
    </UiModal>
  );
}
