import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { FinControlledOtp } from '@frontend/components/controlled-fields/fin-controlled-otp';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';
import { useLoginStore } from '@frontend/features/login/hooks/login-store-hook';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';

export function LoginEnterCodeForm() {
  const { isLoading } = useSetupLogin();
  const { setStep, methods } = useLoginStore();

  return (
    <UiFieldGroup>
      <FinControlledOtp
        label="Введіть код"
        name="code"
      />

      <UiButton
        type="submit"
        className="w-full"
        variant="primary"
        size="sm"
      >
        {isLoading && <UiSpinner className="size-4" />}
        {isLoading ? 'Входимо...' : 'Увійти'}
      </UiButton>

      <UiSeparatorWithLabel
        label={'або'}
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
        Повернутися назад
      </UiButton>
    </UiFieldGroup>
  );
}
