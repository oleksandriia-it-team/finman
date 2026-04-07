'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupLogin } from './shared/login-form';
import { useRouter } from 'next/navigation';
import './shared/login-form.scss';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input/fin-controlled-input';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { LoginIllustration } from './shared/login-illustration';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { useState } from 'react';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { methods, submit, isLoading } = useSetupLogin(() => {
    router.push('/profile');
  });

  return (
    <div className="min-h-screen w-full flex flex-row bg-primary-foreground">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <FormProvider {...methods}>
          <form
            className="w-full max-w-[20rem] flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <UiFieldSet>
              <UiFieldLegend
                size="xl"
                className="text-center flex flex-col items-center gap-1 mb-10"
              >
                <div className="flex items-center gap-1">
                  <UiGraphic
                    src="/logo/finman-icon.svg"
                    size={48}
                    priority
                    alt="Finman Logo"
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
                  placeholder="Введіть email або пароль"
                  disabled={isLoading}
                />

                <div className="relative">
                  <FinControlledInput
                    name="password"
                    label="Пароль*"
                    id="password"
                    placeholder="Введіть пароль"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 text-xs text-primary hover:underline"
                  >
                    Забули пароль?
                  </button>
                  <UiIconButton
                    icon={showPassword ? 'eye-slash' : 'eye'}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    size="sm"
                    variant="muted"
                    className="absolute right-2 top-8 text-foreground"
                    title={showPassword ? 'Приховати' : 'Показати'}
                  />
                </div>

                <UiButton
                  type="submit"
                  className="w-full"
                  variant="primary"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading && <UiSpinner className="w-4 h-4" />}
                  {isLoading ? 'Входимо...' : 'Увійти'}
                </UiButton>

                <div className="relative ">
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
                  disabled={isLoading}
                >
                  Зареєструватися зараз
                </UiButton>
              </UiFieldGroup>
            </UiFieldSet>
          </form>
        </FormProvider>
      </div>

      <div className="svg-div flex flex-1 items-center justify-center bg-background p-12">
        <div className="w-full max-w-lg h-full flex items-center justify-center">
          <UiGraphic
            src={LoginIllustration}
            width="100%"
            height="37.5rem"
          />
        </div>
      </div>
    </div>
  );
}
