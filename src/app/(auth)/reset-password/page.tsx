'use client';

import { AuthLayout } from '@frontend/entities/auth/auth-template';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { FormProvider } from 'react-hook-form';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useSetupResetPassword } from './shared/reset-password.form';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();

  const { methods, submit, isLoading } = useSetupResetPassword(() => {
    router.push('/auth/login');
  });

  return (
    <AuthLayout
      imageSrc="/pictures/recovery-picture.png"
      rightSideTitle="Створіть новий пароль"
      rightSideDescription="Використовуйте комбінацію символів, літер та цифр для максимального захисту."
    >
      <div className="flex flex-col w-full h-full min-h-[inherit]">
        <div className="flex items-center gap-x-1.5 mb-8">
          <UiGraphic
            src="/logo/logo.jpg"
            size={36}
            alt="Finman Logo"
          />
          <span className="text-2xl text-foreground tracking-tighter font-bold uppercase">Finman</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-normal text-foreground leading-tight">Встановлення пароля</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Будь ласка, введіть новий пароль для вашого облікового запису.
              </p>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={submit}
                className="w-full flex flex-col gap-3"
              >
                <UiFieldSet disabled={isLoading}>
                  <UiFieldGroup className="flex flex-col gap-5">
                    {/* Приховані поля, щоб React Hook Form бачила дані зі стору */}
                    <input
                      type="hidden"
                      {...methods.register('email')}
                    />
                    <input
                      type="hidden"
                      {...methods.register('code')}
                    />

                    <FinControlledPassword
                      name="password"
                      label="Новий пароль*"
                      placeholder="Введіть новий пароль"
                    />

                    <FinControlledPassword
                      name="passwordConfirm"
                      label="Підтвердження пароля*"
                      placeholder="Повторіть новий пароль"
                    />

                    <div className="flex flex-col gap-3 pt-2">
                      <UiButton
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={!methods.formState.isValid || isLoading}
                      >
                        {isLoading ? 'Оновлення...' : 'Змінити пароль'}
                      </UiButton>

                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
                        onClick={() => router.push('/auth/login')}
                      >
                        Скасувати
                      </button>
                    </div>
                  </UiFieldGroup>
                </UiFieldSet>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
