import type { AttachOperationsListModalProps } from '@frontend/features/tracking-operation/attach/props/attach-operations-list-modal.props';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useAttachState } from '@frontend/features/tracking-operation/attach/hooks/attach-state.context';
import { SelectTransactionCard } from '@frontend/entities/operations/select-transaction-card/select-transaction-card';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { useAttachOperationsList } from '@frontend/features/tracking-operation/attach/hooks/use-attach-operations-list.hook';

export function TrackingOperationAttachedOperationListModal({ trigger }: AttachOperationsListModalProps) {
  const { search, setSearch, clearAttached } = useAttachState();
  const { items, debouncedSearch } = useAttachOperationsList();

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
          {(items.length > 0 || !!debouncedSearch) && (
            <UiInput
              onChange={(value) => setSearch(value ?? '')}
              value={search}
              placeholder="Пошук операції"
            />
          )}

          <div className="flex flex-col gap-2 overflow-auto">
            {items.length === 0 && (
              <UiDescription
                size="xs"
                className="py-4 text-center"
              >
                {!!debouncedSearch
                  ? 'Не знайдено'
                  : 'Не знайдено. Можливо бюджетного плану на обрану дату не існує, або немає за обраною категорією та типом'}
              </UiDescription>
            )}

            {items.map((props) => (
              <SelectTransactionCard
                key={`${props.entry.id}-${props.entry.title}-${props.entry.description}`}
                {...props}
              />
            ))}
          </div>
        </div>

        <UiSeparator />

        {items.length !== 0 && (
          <UiModalFooter className="!justify-between">
            <UiButton
              variant="destructive"
              onClick={clearAttached}
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
