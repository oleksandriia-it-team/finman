'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupLogin } from './shared/login-form';
import { useRouter } from 'next/navigation';
import './shared/styles.scss';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input/fin-controlled-input';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { LoginIllustration } from './shared/login-illustration';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';

export default function LoginPage() {
  const router = useRouter();
  const { methods, submit } = useSetupLogin(() => {
    router.push('/profile');
  });

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row bg-white">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <FormProvider {...methods}>
          <form
            className="w-full max-w-[22.5rem] flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <UiFieldSet>
              <UiFieldLegend
                size="xl"
                className="text-center"
              >
                Увійдіть в свій акаунт
              </UiFieldLegend>

              <UiFieldGroup>
                <FinControlledInput
                  name="login"
                  label="Логін*"
                  id="login"
                  placeholder="Введіть email або пароль"
                />

                <div className="relative">
                  <FinControlledInput
                    name="password"
                    label="Пароль*"
                    id="password"
                    placeholder="Введіть пароль"
                    type="password"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 text-xs text-blue-500 hover:underline"
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
                  Увійти
                </UiButton>

                <div className="relative ">
                  <div className="absolute inset-0 flex items-center">
                    <UiSeparator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white text-muted-foreground">АБО</span>
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
      </div>

      <div className="hidden sm:flex flex-1 items-center justify-center bg-[#E0F2FE] p-12">
        <div className="w-full max-w-lg h-full flex items-center justify-center">
          <LoginIllustration className="w-full h-auto max-h-[37.5rem] transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
