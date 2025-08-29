'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './validation-schema';
import { userInformationServiceProvider } from '../../../../../data-access/auth-service/user-information.service';
import { useInject } from '../../../../../shared/contexts/use-inject.context';
import { UserInformation } from '../../../../../data-access/auth-service/models/user-infomation.model';

/**
 * Sets up and manages a user registration form with validation using `react-hook-form` and Yup.
 * Automatically logs in the user via `AuthService` upon successful submission and invokes a callback.
 *
 * @param {function(UserInformation): void} onSuccessAction - Callback function to be called after successful registration.
 * @returns {{
 *   methods: UseFormReturn<UserInformation>, // Form methods for use with FormProvider
 *   submit: () => void // Function to trigger form submission
 * }}
 *
 * @example
 * const { methods, submit } = RegistrationForm((userData) => {
 *   console.log('Registered user:', userData);
 * });
 *
 * <FormProvider {...methods}>
 *   <Form />
 *   <button onClick={submit}>Submit</button>
 * </FormProvider>
 */


export function useSetupRegistration(onSuccessAction: (data: UserInformation) => void) {


  const authService = useInject(userInformationServiceProvider, true);


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

    authService.setUserInformation(user);
    console.log(authService.getAllUserInformation());
    onSuccessAction(data);
  });

  return { methods, submit };
}