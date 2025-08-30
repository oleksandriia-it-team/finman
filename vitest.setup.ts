import { vi, afterEach, expect } from 'vitest';

afterEach(() => {
  const { assertionCalls } = expect.getState();

  if (assertionCalls === 0) {
    throw new Error('Test did not contain any assertions (expect)');
  }

  vi.clearAllMocks();
});