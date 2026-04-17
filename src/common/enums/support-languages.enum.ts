export const SupportLanguages = {
  Ukrainian: 'uk',
  English: 'en',
};

export type SupportLanguages = (typeof SupportLanguages)[keyof typeof SupportLanguages];
