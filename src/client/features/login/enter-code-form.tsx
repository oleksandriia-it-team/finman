import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { FinControlledOtp } from '@frontend/components/controlled-fields/fin-controlled-otp';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';
import { useLoginStore } from '@frontend/features/login/hooks/login-store-hook';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';
import { useTranslations } from 'next-intl';

export function LoginEnterCodeForm() {
  const { isLoading } = useSetupLogin();
  const { setStep, methods } = useLoginStore();
  const t = useTranslations('auth.confirmCode');

  return (
    <UiFieldGroup>
      <FinControlledOtp
        label={t('codeLabel')}
        name="code"
      />

      <UiButton
        type="submit"
        className="w-full"
        variant="primary"
        size="sm"
      >
        {isLoading && <UiSpinner className="size-4" />}
        {isLoading ? t('submitLoading') : t('submit')}
      </UiButton>

      <UiSeparatorWithLabel
        label={t('or')}
        className="my-4"
      />

      <UiButton
        type="button"
        className="w-full"
        variant="primary"
        size="sm"
        isOutlined
        onClick={() => {
          methods.reset();
          setStep(LoginStep.Password);
        }}
      >
        {t('changeEmail')}
      </UiButton>
    </UiFieldGroup>
  );
}
