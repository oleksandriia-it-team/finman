'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { buildLoginSchema, type LoginDto } from '@common/domains/auth/schema/login.schema';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';
import { useState } from 'react';
import constate from 'constate';

function useLoginStoreLogic() {
  const [step, setStep] = useState<LoginStep>(LoginStep.Password);

  const methods = useForm<LoginDto>({
    resolver: zodResolver(buildLoginSchema(step === LoginStep.TwoFactor)),
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
