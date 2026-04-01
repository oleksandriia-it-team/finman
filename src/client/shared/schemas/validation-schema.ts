import { object, string } from 'zod';

export const userSchema = object({
  userName: string()
    .trim()
    .min(1, 'Username is required')
    .min(3, 'Your username must be at least 3 characters')
    .max(20, 'Your username must be no longer than 20 characters'),
  language: string().nonempty('Please choose a language'),
  preferableLocale: string().nonempty('Please choose a preferable locale'),
});
