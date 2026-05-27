import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useGetOperationsForAttach } from './hooks/get-operations-for-attach.hook';
import { useGetAttachedOperation } from './hooks/get-attached-operation.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { TrackingOperationAttachedOperationListModal } from '@frontend/features/tracking-operation/attach/attach-operations-list-modal';

export function TrackingOperationAttachedOperationLabel() {
  const { state, errorMessage } = useGetOperationsForAttach();

  const attachedOperation = useGetAttachedOperation();

  if (state === PromiseState.Loading) {
    return <FinLoaderShort withoutMinWidth />;
  }

  if (state === PromiseState.Error && !!errorMessage) {
    return null;
  }

  return (
    <>
      {
        <TrackingOperationAttachedOperationListModal
          trigger={
            !attachedOperation ? (
              <UiButton
                variant="primary"
                isOutlined
              >
                <UiSvgIcon name="lightning-charge-fill" />
                Заповнити з плану
              </UiButton>
            ) : (
              <UiButton
                variant="primary"
                isOutlined
              >
                <UiSvgIcon
                  name="paperclip"
                  className="rotate-45"
                />

                {attachedOperation!.title}
              </UiButton>
            )
          }
        />
      }
    </>
  );
}
