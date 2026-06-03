import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useAttachState } from './hooks/attach-state.context';
import { useGetAttachedOperation } from './hooks/get-attached-operation.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { TrackingOperationAttachedOperationListModal } from '@frontend/features/tracking-operation/attach/attach-operations-list-modal';
import { useTranslations } from 'next-intl';

export function TrackingOperationAttachedOperationLabel() {
  const t = useTranslations('tracking.attach');
  const { state, errorMessage } = useAttachState();

  const attachedOperation = useGetAttachedOperation();

  if (state === PromiseState.Loading) {
    return (
      <FinLoaderShort
        withoutDefaultWidth
        className="px-4"
      />
    );
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
                {t('fillFromPlan')}
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
