import type { SupportLanguages } from '@common/enums/support-languages.enum';

const Language = {
  English: 'en',
  Ukrainian: 'uk',
} as const;

export const LanguageToLocale: Record<SupportLanguages, string> = {
  [Language.English]: 'en-US',
  [Language.Ukrainian]: 'uk-UA',
} as const;

export const DefaultLocale = 'uk-UA';
export const DefaultCurrency = 'UAH';
