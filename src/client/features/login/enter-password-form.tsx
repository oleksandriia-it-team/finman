import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { useRouter } from 'next/navigation';
import { LatinInputPattern } from '@common/constants/latin-pattern.constant';
import { useTranslations } from 'next-intl';

export function LoginEnterPasswordForm() {
  const router = useRouter();
  const { isLoading } = useSetupLogin();
  const t = useTranslations('auth.login');

  return (
    <UiFieldGroup>
      <FinControlledInput
        name="login"
        label={t('loginLabel')}
        id="login"
        placeholder={t('loginPlaceholder')}
        pattern={LatinInputPattern}
      />

      <div className="relative">
        <FinControlledPassword
          name="password"
          label={t('passwordLabel')}
          id="password"
          placeholder={t('passwordPlaceholder')}
        />
        <button
          type="button"
          onClick={() => router.push('/recovery')}
          className="absolute right-0 top-0 text-xs text-primary hover:underline"
        >
          {t('forgotPassword')}
        </button>
      </div>

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
        onClick={() => router.push('/signup')}
      >
        {t('signupCta')}
      </UiButton>
    </UiFieldGroup>
  );
}
