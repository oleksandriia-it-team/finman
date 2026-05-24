import { useGetSetup2FAData } from './hooks/get-setup-2fa-data.hook';
import { useConfirm2FASetup } from './hooks/confirm-2fa-setup.hook';
import { getFirstAppError } from '@common/utils/get-first-app-error.util';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinErrorShort } from '@frontend/components/error/fin-error-short';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { totpConfirmSchema } from '@common/domains/totp/totp-confirm.schema';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { ShowQrCodeTwoFactorSetupQRCode } from './show-qr-code';
import { ShowSuccessTwoFactorSetup } from './show-success';
import { type ReactNode, useState } from 'react';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { isErrorWithout400 } from '@frontend/shared/utils/is-error-without-400';
import { isSuccessOr400Error } from '@frontend/shared/utils/is-success-or-400-error';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

export function TwoFactorSetupModal({ trigger }: { trigger: ReactNode }) {
  const refresh = useUserInformation((state) => state.refresh);

  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(totpConfirmSchema),
    defaultValues: {
      code: '',
    },
  });

  const { state: setupState, data: setupData, error: setupDataError } = useGetSetup2FAData(!open);

  const { state: confirmMutateState, data: confirmMutateResult, error: confirmError, mutate } = useConfirm2FASetup();

  const safeError = getFirstAppError(setupDataError, confirmError);

  const state = useCombineStates(setupState, confirmMutateState);

  const disabled = state === PromiseState.Loading || isErrorWithout400(state, safeError);

  return (
    <UiModal
      open={open}
      onOpenChange={(open) => {
        if (!open && confirmMutateResult) {
          refresh();
        }

        setOpen(open);
      }}
    >
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>

      <UiModalContent className="flex flex-col gap-6 justify-center">
        <UiModalHeader>
          <UiModalTitle>Підключіть автентифікатор</UiModalTitle>
        </UiModalHeader>

        {state === PromiseState.Loading && <FinLoaderShort />}

        {safeError && isErrorWithout400(state, safeError) && <FinErrorShort {...safeError} />}

        {state === PromiseState.Success && !!confirmMutateResult && <ShowSuccessTwoFactorSetup />}

        {isSuccessOr400Error(state, safeError) && setupData && !confirmMutateResult && (
          <FormProvider {...form}>
            <form
              id="2fa-setup"
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                mutate(form.getValues().code!);
              }}
            >
              <ShowQrCodeTwoFactorSetupQRCode data={setupData} />
            </form>
          </FormProvider>
        )}

        <UiModalFooter>
          {!!confirmMutateResult && (
            <UiModalClose asChild>
              <UiButton
                disabled={disabled}
                variant="primary"
              >
                Закрити
              </UiButton>
            </UiModalClose>
          )}

          {!confirmMutateResult && (
            <>
              <UiModalClose asChild>
                <UiButton disabled={disabled}>Скасувати</UiButton>
              </UiModalClose>

              <UiButton
                disabled={disabled}
                form="2fa-setup"
                variant="primary"
                type="submit"
              >
                Підтвердити та увімкнути
              </UiButton>
            </>
          )}
        </UiModalFooter>
      </UiModalContent>
    </UiModal>
  );
}
