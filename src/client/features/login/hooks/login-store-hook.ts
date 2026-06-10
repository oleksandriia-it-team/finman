'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { buildLoginSchema, type LoginDto } from '@common/domains/auth/schema/login.schema';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';
import { useState, useMemo } from 'react';
import constate from 'constate';
import { useTranslations } from 'next-intl';
import { UserRequirements } from '@common/constants/user-requirements.constant';

function useLoginStoreLogic() {
  const [step, setStep] = useState<LoginStep>(LoginStep.Password);
  const tLV = useTranslations('auth.login.validation');
  const tCV = useTranslations('auth.code.validation');

  const schema = useMemo(
    () =>
      buildLoginSchema(step === LoginStep.TwoFactor, {
        loginRequired: tLV('loginRequired'),
        loginMaxLength: tLV('loginMaxLength', { max: UserRequirements.MaxLoginLength }),
        emailInvalidFormat: tLV('emailInvalidFormat'),
        usernameMinLength: tLV('usernameMinLength', { min: UserRequirements.MinNameLength }),
        loginInvalidChars: tLV('loginInvalidChars'),
        passwordRequired: tLV('passwordRequired'),
        passwordMinLength: tLV('passwordMinLength', { min: UserRequirements.MinPasswordLength }),
        passwordMaxLength: tLV('passwordMaxLength', { max: UserRequirements.MaxPasswordLength }),
        passwordLatinOnly: tLV('passwordLatinOnly'),
        codeMessages: {
          required: tCV('required'),
          length: tCV('length'),
          numeric: tCV('numeric'),
        },
      }),
    [step, tLV, tCV],
  );

  const methods = useForm<LoginDto>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
      code: '',
    },
  });

  return { methods, step, setStep };
}

export const [LoginStoreProvider, useLoginStore] = constate(useLoginStoreLogic);
