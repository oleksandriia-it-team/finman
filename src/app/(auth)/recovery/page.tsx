'use client';

import { AuthLayout } from '@frontend/entities/auth/auth-template';
import { useSetupForgotPassword } from './shared/recovery-form';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useTranslations } from 'next-intl';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const t = useTranslations('auth.recovery');

  const { methods, submit, isLoading } = useSetupForgotPassword(() => {
    router.push('/confirm-code');
  });

  return (
    <AuthLayout
      imageSrc="/pictures/recovery-picture.png"
      rightSideTitle={t('rightSideTitle')}
      rightSideDescription={t('rightSideDescription')}
      rightSideClassName="bg-primary-muted"
      rightSideImageClassName="max-h-[25rem]"
    >
      <div className="flex flex-col w-full h-full min-h-[inherit]">
        <div className="flex items-center gap-x-1.5">
          <UiGraphic
            src="/logo/logo.jpg"
            size={36}
            priority
            alt="Finman Logo"
          />
          <span className="text-2xl text-foreground tracking-tighter font-bold uppercase">Finman</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-normal text-foreground leading-tight">{t('title')}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('description')}</p>
            </div>

            <FormProvider {...methods}>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <UiFieldSet disabled={isLoading}>
                  <UiFieldGroup className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <FinControlledInput
                        name="email"
                        label={t('emailLabel')}
                        placeholder={t('emailPlaceholder')}
                        type="email"
                        description={
                          <>
                            <UiSvgIcon
                              name="info-circle"
                              size="xs"
                            />
                            {t('emailDescription')}
                          </>
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2.5 mt-2">
                      <UiButton
                        type="submit"
                        className="w-full"
                        variant="primary"
                        size="sm"
                        disabled={!methods.formState.isValid || isLoading}
                      >
                        {isLoading ? t('submitLoading') : t('submit')}
                      </UiButton>

                      <div className="relative my-1">
                        <UiSeparatorWithLabel label={t('or')} />
                      </div>

                      <button
                        type="button"
                        className="w-full text-sm text-primary font-medium hover:underline text-center flex items-center justify-center gap-2"
                        onClick={() => router.push('/login')}
                      >
                        <UiSvgIcon
                          name="arrow-left"
                          size="sm"
                        />
                        {t('backToLogin')}
                      </button>
                    </div>
                  </UiFieldGroup>
                </UiFieldSet>
              </form>
            </FormProvider>
          </div>
        </div>

        <p className="text-sm text-center text-muted-foreground pb-1">
          {t('noAccount')}{' '}
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={() => router.push('/signup')}
          >
            {t('signupCta')}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
