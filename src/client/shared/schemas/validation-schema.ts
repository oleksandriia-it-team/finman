import { array, int, object, string } from 'zod';

export const userSchema = object({
  userName: string()
    .trim()
    .min(1, "Ім'я користувача обов'язкове")
    .min(3, "Ім'я користувача має містити щонайменше 3 символи")
    .max(20, "Ім'я користувача не може перевищувати 20 символів"),
  language: string('Будь ласка, оберіть мову').nonempty('Будь ласка, оберіть мову'),
  preferableLocale: string('Будь ласка, оберіть бажаний формат дат').nonempty('Будь ласка, оберіть бажаний формат дат'),
  preferableLocales: array(int()).min(1, 'Будь ласка, оберіть бажаний формат дат'),
});
