import { object, string } from 'yup';

export const userSchema = object({
  userName: string()
    .required('Username is required')
    .min(3, 'Your username must be at least 3 characters')
    .max(20, 'Your username must be no longer than 20 characters'),
  language: string().required('Please choose a language'),
  preferableLocale: string().required('Please choose a preferable locale'),
});
