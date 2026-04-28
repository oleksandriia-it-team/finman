'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupLogin } from './shared/login-form';
import { useRouter } from 'next/navigation';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { AuthLayout } from '@frontend/entities/auth/auth-template';

export default function LoginPage() {
  const refreshUser = useUserInformation((state) => state.refresh);
  const router = useRouter();
  const { methods, submit, isLoading } = useSetupLogin(() => {
    refreshUser();
    router.push('/profile');
  });

  return (
    <AuthLayout imageSrc={'/pictures/login-picture.png'}>
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <UiFieldSet disabled={isLoading}>
            <UiFieldLegend
              size="xl"
              className="text-center flex flex-col items-center gap-1 mb-10"
            >
              <div className="flex items-center gap-1">
                <LogoSvg
                  width={48}
                  height={48}
                />
                <span className="text-3xl text-foreground tracking-tighter">FINMAN</span>
              </div>
              <span className="text-lg font-semibold text-foreground block">Увійдіть в свій акаунт</span>
            </UiFieldLegend>

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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <UiSeparator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-muted-foreground">АБО</span>
                </div>
              </div>

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
          </UiFieldSet>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
