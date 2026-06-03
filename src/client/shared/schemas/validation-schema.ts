import z, { object, string } from 'zod';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { SupportLanguages } from '@common/enums/support-languages.enum';

export const userSchema = object({
  name: string()
    .trim()
    .min(1, 'Username is required')
    .min(UserRequirements.MinNameLength, `Username must be at least ${UserRequirements.MinNameLength} characters`)
    .max(UserRequirements.MaxLoginLength, `Username cannot exceed ${UserRequirements.MaxLoginLength} characters`),
  language: z.enum(Object.values(SupportLanguages), 'Please select a language'),
  locale: string('Please select a date format').min(1, 'Please select a date format'),
  currencyCode: string('Please select a currency').min(1, 'Please select a currency'),
});
