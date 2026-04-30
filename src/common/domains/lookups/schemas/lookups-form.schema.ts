import { z } from 'zod';

export const CurrencyFormSchema = z.object({
  name: z.string().min(1, "Обов'язкове поле"),
  code: z.string().length(3, 'Код повинен містити рівно 3 символи'),
  symbol: z.string().min(1, "Обов'язкове поле"),
});

export type CurrencyFormData = z.infer<typeof CurrencyFormSchema>;

export const UpdateCurrencySchema = CurrencyFormSchema.partial().extend({
  softDeleted: z.union([z.literal(0), z.literal(1)]).optional(),
});

export type UpdateCurrencyData = z.infer<typeof UpdateCurrencySchema>;

export const CountryFormSchema = z.object({
  countryName: z.string().min(1, "Обов'язкове поле"),
  localeName: z.string().min(1, "Обов'язкове поле"),
});

export type CountryFormData = z.infer<typeof CountryFormSchema>;

export const UpdateCountrySchema = CountryFormSchema.partial().extend({
  softDeleted: z.union([z.literal(0), z.literal(1)]).optional(),
});

export type UpdateCountryData = z.infer<typeof UpdateCountrySchema>;
