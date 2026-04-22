export const SupportLanguages = {
  Ukrainian: 'uk',
  English: 'en',
} as const;

export type SupportLanguages = (typeof SupportLanguages)[keyof typeof SupportLanguages];
