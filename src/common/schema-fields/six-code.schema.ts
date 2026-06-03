import { z } from 'zod';

export interface SixCodeMessages {
  required: string;
  length: string;
  numeric: string;
}

const DEFAULT_SIX_CODE_MESSAGES: SixCodeMessages = {
  required: 'Code is required',
  length: 'Code must be 6 digits',
  numeric: 'Code must be numeric',
};

export function buildSixCodeSchema(messages: SixCodeMessages = DEFAULT_SIX_CODE_MESSAGES) {
  return z
    .string({ error: messages.required })
    .min(6, { error: messages.length })
    .max(6, { error: messages.length })
    .regex(/^\d+$/, messages.numeric);
}

// Backward-compatible export with English defaults
export const SixCodeSchema = buildSixCodeSchema();
