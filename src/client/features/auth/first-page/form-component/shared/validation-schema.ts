import { object, string } from 'zod';

export const userSchema = object({
  userName: string()
    .min(3, 'Your username must be at least 3 characters')
    .max(20, 'Your username must be no longer than 20 characters')
    .nonempty('Username is required'),
  language: string().nonempty('Please choose a language'),
  preferableLocale: string().nonempty('Please choose a preferable locale'),
});
