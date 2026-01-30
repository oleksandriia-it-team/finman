export function getPreferredLocale(): string | undefined {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.languages) {
    return window.navigator.languages[0];
  }
  return undefined;
}

export const defaultLocale = getPreferredLocale() || 'en-US';
