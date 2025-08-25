'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './validation-schema';
import { authServiceProvider } from '../../../../../data-access/auth-service/auth.service';
import { useInject } from '../../../../../shared/contexts/use-inject.context';
import { RegistrationFormProps } from './registration-form-props';
import { UserInformation } from '../../../../../data-access/auth-service/models/user-infomation.model';

/**
 * RegistrationForm
 *
 * Component that handles user registration in the app.
 * Uses `react-hook-form` with Yup for validation and integrates with `AuthService` via `useInject`.
 * Upon successful submission, calls the `onSuccessAction` callback with the user data.
 *
 * @param {RegistrationFormProps} props - Component props.
 * @param {(data: UserInformation) => void} props.onSuccessAction - Callback function to execute after successful registration.
 *
 * @returns An object containing:
 * - `methods` - Form methods from `useForm` for use with `FormProvider`.
 * - `submit` - Submit handler function to be passed to buttons or forms.
 *
 * @example
 * const { methods, submit } = RegistrationForm({
 *   onSuccessAction: (userData) => console.log(userData)
 * });
 *
 * <FormProvider {...methods}>
 *   <Form />
 *   <button onClick={submit}>Submit</button>
 * </FormProvider>
 */

export default function RegistrationForm({ onSuccessAction }: RegistrationFormProps) {

  const Auth = useInject(authServiceProvider, true);


  const methods = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      preferableLocale: '',
      language: '',
    },
  });

  //TODO make error catch
  const submit = methods.handleSubmit((data) => {
    if (!data) {
      console.log('error', data);
      return;
    }

    const user: UserInformation = {
      userName: data.userName,
      preferableLocale: data.preferableLocale,
      language: data.language,
    };

    Auth.logIn(user);
    console.log(Auth.getUser());
    onSuccessAction(data);
  });

  return { methods, submit };
}