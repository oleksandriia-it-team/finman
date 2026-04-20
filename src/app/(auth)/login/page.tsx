'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupLogin } from './shared/login-form';
import { useRouter } from 'next/navigation';
import './shared/login-form.scss';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';

export default function LoginPage() {
  const router = useRouter();
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
            <UiFieldSet disabled={isLoading}>
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
                    //TODO remove disabled state and implement forgot password functionality
                    disabled={true}
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
                >
                  Зареєструватися зараз
                </UiButton>
              </UiFieldGroup>
            </UiFieldSet>
          </form>
        </FormProvider>
      </div>

      <div className="svg-icon-container flex flex-1 items-center justify-center bg-aqua-muted p-12">
        <div className="size-full max-w-lg flex items-center justify-center">
          <UiGraphic
            src="/pictures/login-picture.png"
            width="100%"
            height="37.5rem"
          />
        </div>
      </div>
    </div>
  );
}
