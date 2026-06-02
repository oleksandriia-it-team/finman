'use client';

import { AuthLayout } from '@frontend/entities/auth/auth-template';
import { LoginEnterPasswordForm } from '@frontend/features/login/enter-password-form';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { FormProvider } from 'react-hook-form';
import { useLoginStore } from '@frontend/features/login/hooks/login-store-hook';
import { useSetupLogin } from '@frontend/features/login/hooks/login-hook';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';
import { LoginEnterCodeForm } from '@frontend/features/login/enter-code-form';

export default function LoginPage() {
  const { methods, step } = useLoginStore();
  const { submit, isLoading } = useSetupLogin();

  return (
    <div className="size-full bg-background">
      <AuthLayout imageSrc={'/pictures/login-picture.png'}>
        <FormProvider {...methods}>
          <form
            className="w-full flex flex-col gap-6 "
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
                <span className="text-lg font-semibold text-foreground block">
                  {step === LoginStep.Password ? 'Увійдіть в свій акаунт' : 'Введіть код із додатка-автентифікатора'}
                </span>
              </UiFieldLegend>

              {step === LoginStep.Password && <LoginEnterPasswordForm />}
              {step === LoginStep.TwoFactor && <LoginEnterCodeForm />}
            </UiFieldSet>
          </form>
        </FormProvider>
      </AuthLayout>
    </div>
  );
}
