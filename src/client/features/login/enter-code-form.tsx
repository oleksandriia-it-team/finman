import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { FinControlledOtp } from '@frontend/components/controlled-fields/fin-controlled-otp';

export function LoginEnterCodeForm() {
  const { isLoading } = useSetupLogin();

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
    </UiFieldGroup>
  );
}
