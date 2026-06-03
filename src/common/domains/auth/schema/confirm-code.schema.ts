import { z } from 'zod';
import { type SixCodeMessages, buildSixCodeSchema } from '@common/schema-fields/six-code.schema';

export function createConfirmCodeSchema(messages?: SixCodeMessages) {
  return z.object({
    code: buildSixCodeSchema(messages),
  });
}

// Backward-compatible export with English defaults
export const ConfirmCodeSchema = createConfirmCodeSchema();
export type ConfirmCodeDto = z.infer<typeof ConfirmCodeSchema>;
