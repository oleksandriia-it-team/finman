import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { useRouter } from 'next/navigation';

export function LoginEnterPasswordForm() {
  const router = useRouter();
  const { isLoading } = useSetupLogin();

  return (
    <UiFieldGroup>
      <FinControlledInput
        name="login"
        label="Логін*"
        id="login"
        placeholder="Введіть email або логін"
        disabled={isLoading}
      />

      <div className="relative">
        <FinControlledPassword
          name="password"
          label="Пароль*"
          id="password"
          placeholder="Введіть пароль"
        />
        <button
          type="button"
          onClick={() => router.push('/recovery')}
          className="absolute right-0 top-0 text-xs text-primary hover:underline"
        >
          Забули пароль?
        </button>
      </div>

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
        onClick={() => router.push('/signup')}
      >
        Зареєструватися зараз
      </UiButton>
    </UiFieldGroup>
  );
}
