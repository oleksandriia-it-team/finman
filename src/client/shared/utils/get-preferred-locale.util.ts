export function getPreferredLocale(): string | undefined {
  if (typeof window !== 'undefined' && window.navigator.languages?.length) {
    return window.navigator.languages[0];
  }
  return undefined;
}

export const defaultLocale = getPreferredLocale() || 'en-US';
