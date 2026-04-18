import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type RegisterDto, RegisterSchema } from '@common/domains/auth/schema/register.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupportLanguages } from '@common/enums/support-languages.enum';

export function useSetupRegistration(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: RegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, RegisterDto>('/api/auth/register', data),
    {
      successMessage: 'Реєстрація успішна! Тепер ви можете увійти.',
      onSuccess: (result) => {
        if (result.status === 200) {
          onSuccessAction();
        }
      },
    },
  );

  const methods = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      locale: '',
      currencyCode: '',
      language: SupportLanguages.Ukrainian,
    } as RegisterDto,
  });

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return {
    methods,
    submit,
    isLoading: isPending,
  };
}
