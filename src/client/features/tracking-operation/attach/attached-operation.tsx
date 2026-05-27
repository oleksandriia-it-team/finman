import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { useFormContext } from 'react-hook-form';
import { useGetOperationsForAttach } from './hooks/get-operations-for-attach.hook';
import { useGetAttachedOperation } from './hooks/get-attached-operation.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { TrackingOperationAttachedOperationListModal } from '@frontend/features/tracking-operation/attach/attach-operations-list-modal';

export function TrackingOperationAttachedOperationLabel() {
  const { resetField } = useFormContext();

  const { state, errorMessage } = useGetOperationsForAttach();

  const attachedOperation = useGetAttachedOperation();

  if (state === PromiseState.Loading) {
    return <FinLoaderShort />;
  }

  if (state === PromiseState.Error && !!errorMessage) {
    return null;
  }

  return (
    <>
      {!attachedOperation && (
        <TrackingOperationAttachedOperationListModal
          trigger={
            <UiButton
              variant="primary-muted"
              isOutlined
            >
              <UiSvgIcon name="lightning-charge-fill" />
              Заповнити з плану
            </UiButton>
          }
        />
      )}
      {!!attachedOperation && (
        <UiButton
          variant="primary-muted"
          isOutlined
          asChild
        >
          <div>
            <UiSvgIcon
              name="paperclip"
              className="rotate-45"
            />

            {attachedOperation!.title}

            <UiIconButton
              icon="x-circle"
              variant="destructive-muted"
              onClick={() => {
                resetField('attachedPlannedRegEntryId');
                resetField('attachedPlannedMonthEntryId');
              }}
            />
          </div>
        </UiButton>
      )}
    </>
  );
}
