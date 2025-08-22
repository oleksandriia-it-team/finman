'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './validation-schema';
import { UserInformation } from '../../../../../data-access/auth-service/models/user-infomation.model';
import { AuthService } from '../../../../../data-access/auth-service/auth.service';
import { LocalStorageService } from '../../../../../data-access/local-storage/local-storage.service';

export default function RegistrationForm(onSuccess: (data: UserInformation) => void) {


  const localStorageService = new LocalStorageService();
  const authService = new AuthService(localStorageService);


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

    authService.logIn(user);
    console.log(authService.getUser());
    onSuccess(data);
  });

  return { methods, submit };
}