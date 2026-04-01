import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginDto, LoginSchema } from '@common/domains/auth/schema/login.schema';

export function useSetupLogin(onSuccessAction: () => void) {
  // 1. Налаштовуємо методи форми
  const methods = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const submit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === 200) {
        document.cookie = `token=${result.data.token}; path=/; max-age=86400`;

        onSuccessAction();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });

  return { methods, submit };
}
