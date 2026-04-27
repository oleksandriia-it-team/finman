'use client';

import { useRouter } from 'next/navigation';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { FormProvider } from 'react-hook-form';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledOtp } from '@frontend/components/controlled-fields/fin-controlled-otp';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { AuthLayout } from '@frontend/entities/auth/auth-template';
import { useSetupConfirmCode } from './shared/confirm-code-form';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';

export default function ConfirmCodePage() {
  const router = useRouter();
  const email = useRecoveryStore((state) => state.email);

  const { methods, submit, isLoading } = useSetupConfirmCode(() => {
    router.push('/auth/reset-password');
  });

  return (
    <AuthLayout
      imageSrc="/pictures/recovery-picture.png"
      rightSideTitle="FinMan — безпека понад усе"
      rightSideDescription="Ми використовуємо двофакторну перевірку, щоб ваші фінансові дані залишалися під надійним замком."
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
              <h1 className="text-2xl font-normal text-foreground leading-tight">Підтвердження коду</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ми надіслали 6-значний код на{' '}
                <span className="font-medium text-foreground italic">{email || 'вашу пошту'}</span>.
              </p>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={submit}
                className="w-full flex flex-col gap-3"
              >
                <UiFieldSet disabled={isLoading}>
                  <UiFieldGroup className="flex flex-col gap-8">
                    <FinControlledOtp
                      name="code"
                      label="Введіть код підтвердження*"
                      description={
                        <>
                          <UiSvgIcon
                            name="info-circle"
                            size="xs"
                          />
                          Код дійсний протягом 5 хвилин
                        </>
                      }
                    />

                    <div className="flex flex-col gap-3">
                      <UiButton
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={!methods.formState.isValid || isLoading}
                      >
                        {isLoading ? 'Перевірка...' : 'Підтвердити'}
                      </UiButton>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 text-sm text-primary font-medium hover:underline"
                        onClick={() => router.push('/auth/forgot-password')}
                      >
                        <UiSvgIcon
                          name="arrow-left"
                          size="sm"
                        />
                        Змінити пошту
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
