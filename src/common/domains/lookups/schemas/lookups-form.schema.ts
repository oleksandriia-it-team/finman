import { z } from 'zod';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';

const RequiredFieldMessage = "Обов'язкове поле";
const EmptyUpdateMessage = 'Не передано дані для оновлення';

const hasAtLeastOneDefinedField = (data: Record<string, unknown>) =>
  Object.values(data).some((value) => value !== undefined);

export const CurrencyFormSchema = z.object({
  name: z.string().trim().min(1, RequiredFieldMessage),
  code: z.string().trim().length(3, 'Код повинен містити рівно 3 символи'),
  symbol: z.string().trim().min(1, RequiredFieldMessage),
});

export type CurrencyFormData = z.infer<typeof CurrencyFormSchema>;

export const UpdateCurrencySchema = CurrencyFormSchema.partial().refine(hasAtLeastOneDefinedField, {
  message: EmptyUpdateMessage,
});

export type UpdateCurrencyData = z.infer<typeof UpdateCurrencySchema>;

export const CountryFormSchema = z.object({
  countryUkName: z.string().trim().min(1, RequiredFieldMessage),
  countryName: z.string().trim().min(1, RequiredFieldMessage),
  localeName: z.string().trim().min(1, RequiredFieldMessage),
});

export type CountryFormData = z.infer<typeof CountryFormSchema>;

export const UpdateCountrySchema = CountryFormSchema.refine(hasAtLeastOneDefinedField, {
  message: EmptyUpdateMessage,
});

export type UpdateCountryData = z.infer<typeof UpdateCountrySchema>;

export const UpdateErrorLogSchema = z.object({
  status: z.nativeEnum(ErrorLogStatus, { message: 'Статус є обовʼязковим' }),
});

export type UpdateErrorLogData = z.infer<typeof UpdateErrorLogSchema>;
