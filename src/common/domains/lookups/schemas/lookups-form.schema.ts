import { z } from 'zod';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';

export interface LookupsFormValidationMessages {
  required: string;
  currencyCodeLength: string;
  emptyUpdate: string;
  statusRequired: string;
}

export const DEFAULT_LOOKUPS_FORM_MESSAGES: LookupsFormValidationMessages = {
  required: 'admin.lookupsValidation.required',
  currencyCodeLength: 'admin.lookupsValidation.currencyCodeLength',
  emptyUpdate: 'admin.lookupsValidation.emptyUpdate',
  statusRequired: 'admin.lookupsValidation.statusRequired',
};

const hasAtLeastOneDefinedField = (data: Record<string, unknown>) =>
  Object.values(data).some((value) => value !== undefined);

export function createCurrencyFormSchema(messages: LookupsFormValidationMessages = DEFAULT_LOOKUPS_FORM_MESSAGES) {
  return z.object({
    name: z.string().trim().min(1, messages.required),
    code: z.string().trim().length(3, messages.currencyCodeLength),
    symbol: z.string().trim().min(1, messages.required),
  });
}

export function createCountryFormSchema(messages: LookupsFormValidationMessages = DEFAULT_LOOKUPS_FORM_MESSAGES) {
  return z.object({
    countryUkName: z.string().trim().min(1, messages.required),
    countryName: z.string().trim().min(1, messages.required),
    localeName: z.string().trim().min(1, messages.required),
  });
}

// Backward-compatible exports with English defaults (also used server-side)
export const CurrencyFormSchema = createCurrencyFormSchema();
export type CurrencyFormData = z.infer<typeof CurrencyFormSchema>;

export const UpdateCurrencySchema = CurrencyFormSchema.partial().refine(hasAtLeastOneDefinedField, {
  message: DEFAULT_LOOKUPS_FORM_MESSAGES.emptyUpdate,
});
export type UpdateCurrencyData = z.infer<typeof UpdateCurrencySchema>;

export const CountryFormSchema = createCountryFormSchema();
export type CountryFormData = z.infer<typeof CountryFormSchema>;

export const UpdateCountrySchema = CountryFormSchema.refine(hasAtLeastOneDefinedField, {
  message: DEFAULT_LOOKUPS_FORM_MESSAGES.emptyUpdate,
});
export type UpdateCountryData = z.infer<typeof UpdateCountrySchema>;

export const UpdateErrorLogSchema = z.object({
  status: z.enum(Object.values(ErrorLogStatus), { message: DEFAULT_LOOKUPS_FORM_MESSAGES.statusRequired }),
});
export type UpdateErrorLogData = z.infer<typeof UpdateErrorLogSchema>;
