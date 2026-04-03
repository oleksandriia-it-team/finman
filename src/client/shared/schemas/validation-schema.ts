import { object, string } from 'zod';

export const userSchema = object({
  userName: string()
    .trim()
    .min(1, "Ім'я користувача обов'язкове")
    .min(3, "Ім'я користувача має містити щонайменше 3 символи")
    .max(20, "Ім'я користувача не може перевищувати 20 символів"),
  language: string().nonempty('Будь ласка, оберіть мову'),
  preferableLocale: string().nonempty('Будь ласка, оберіть бажаний формат дат'),
});
