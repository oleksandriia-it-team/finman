import z, { object, string } from 'zod';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { SupportLanguages } from '@common/enums/support-languages.enum';

export const userSchema = object({
  name: string()
    .trim()
    .min(1, "Ім'я користувача обов'язкове")
    .min(UserRequirements.MinNameLength, "Ім'я користувача має містити щонайменше 3 символи")
    .max(UserRequirements.MaxLoginLength, "Ім'я користувача не може перевищувати 20 символів"),
  language: z.enum(Object.values(SupportLanguages), 'Будь ласка, оберіть мову'),
  locale: string('Будь ласка, оберіть бажаний формат дат').min(1, 'Будь ласка, оберіть бажаний формат дат'),
  currencyCode: string('Будь ласка, оберіть валюту').min(1, 'Будь ласка, оберіть валюту'),
});
